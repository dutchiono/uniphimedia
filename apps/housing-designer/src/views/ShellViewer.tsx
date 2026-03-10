import { useEffect, useRef, useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
import { buildRoomShellBabylon, disposeRoomShell, GRID_TO_M } from '../geometry/buildRoomShellBabylon'

// System node colors for overlay spheres
const NODE_COLORS: Record<string, string> = {
  hvac_supply: '#FB923C', hvac_return: '#FDBA74', hvac_handler: '#F97316',
  plumbing_drain: '#38BDF8', plumbing_supply: '#0EA5E9', plumbing_vent: '#BAE6FD',
  electrical_outlet: '#FCD34D', electrical_switch: '#FDE68A', electrical_panel: '#F59E0B',
  gas_line: '#86EFAC',
}

export default function ShellViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<BABYLON.Engine | null>(null)
  const sceneRef  = useRef<BABYLON.Scene | null>(null)
  // meshMapRef now holds an array of meshes per room (walls + floor + roof)
  const meshMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  const overlayMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())

  const {
    rooms, levels, globalMaterials,
    showSystemsOverlay, setShowSystemsOverlay,
    setLevelVisibility,
  } = useDesignStore()

  const [ready, setReady] = useState(false)

  // -- Init Babylon -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current!
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
    engineRef.current = engine

    const scene = new BABYLON.Scene(engine)
    sceneRef.current = scene
    scene.clearColor = new BABYLON.Color4(0.96, 0.96, 0.97, 1)

    // Camera
    const camera = new BABYLON.ArcRotateCamera('cam', -Math.PI / 4, Math.PI / 3.5, 40, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    camera.lowerRadiusLimit = 5
    camera.upperRadiusLimit = 200
    camera.wheelDeltaPercentage = 0.01

    // Lights
    const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)
    hemi.intensity = 0.6
    hemi.diffuse = new BABYLON.Color3(1, 0.97, 0.93)
    const dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(-1, -2, -1), scene)
    dir.intensity = 0.8
    dir.position = new BABYLON.Vector3(20, 40, 20)

    // Ground grid
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene)
    const gMat = new BABYLON.StandardMaterial('gMat', scene)
    gMat.diffuseColor = new BABYLON.Color3(0.92, 0.92, 0.94)
    ground.material = gMat

    engine.runRenderLoop(() => scene.render())
    window.addEventListener('resize', () => engine.resize())
    setReady(true)

    return () => {
      engine.dispose()
      window.removeEventListener('resize', () => engine.resize())
    }
  }, [])

  // -- Sync rooms to real architectural geometry --------------------------------
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !ready) return

    const currentIds = new Set(rooms.map(r => r.id))

    // Remove geometry for deleted rooms
    for (const [id, meshes] of meshMapRef.current) {
      if (!currentIds.has(id)) {
        disposeRoomShell(meshes)
        meshMapRef.current.delete(id)
        overlayMapRef.current.get(id)?.forEach(m => m.dispose())
        overlayMapRef.current.delete(id)
      }
    }

    for (const room of rooms) {
      const mod = getRoomModule(room.moduleType)
      const level = levels.find(l => l.index === room.level)

      // Handle level visibility
      if (!level?.visible) {
        meshMapRef.current.get(room.id)?.forEach(m => m.setEnabled(false))
        overlayMapRef.current.get(room.id)?.forEach(m => m.setEnabled(false))
        continue
      }

      const floorY = level.floorHeightMeters
      const w = room.gridW * GRID_TO_M
      const d = room.gridH * GRID_TO_M

      // Always rebuild shell geometry when room changes
      const existing = meshMapRef.current.get(room.id)
      if (existing) {
        disposeRoomShell(existing)
        meshMapRef.current.delete(room.id)
      }

      // Build real architectural shell: 4 walls + floor + roof
      const meshes = buildRoomShellBabylon(
        room,
        mod,
        floorY,
        mod.color,
        scene,
      )

      // Apply room rotation around room centre in XZ plane
      const cx = room.gridX * GRID_TO_M + w / 2
      const cz = room.gridY * GRID_TO_M + d / 2
      const rotRad = (room.rotation * Math.PI) / 180
      if (rotRad !== 0) {
        for (const m of meshes) {
          m.unfreezeWorldMatrix()
          const relX = m.position.x - cx
          const relZ = m.position.z - cz
          m.position.x = cx + relX * Math.cos(rotRad) - relZ * Math.sin(rotRad)
          m.position.z = cz + relX * Math.sin(rotRad) + relZ * Math.cos(rotRad)
          m.rotation.y += rotRad
          m.freezeWorldMatrix()
        }
      }

      meshes.forEach(m => m.setEnabled(true))
      meshMapRef.current.set(room.id, meshes)

      // Systems overlay spheres
      overlayMapRef.current.get(room.id)?.forEach(m => m.dispose())
      const spheres: BABYLON.Mesh[] = []

      if (showSystemsOverlay) {
        const wx = room.gridX * GRID_TO_M
        const wz = room.gridY * GRID_TO_M
        for (const node of mod.systemNodes) {
          const s = BABYLON.MeshBuilder.CreateSphere(`node-${room.id}-${node.id}`, { diameter: 0.25 }, scene)
          s.position = new BABYLON.Vector3(
            wx + node.positionLocal.x,
            floorY + node.positionLocal.z,
            wz + node.positionLocal.y,
          )
          const sMat = new BABYLON.StandardMaterial(`smat-${node.id}`, scene)
          const hex2 = (NODE_COLORS[node.kind] ?? '#9CA3AF').replace('#', '')
          sMat.diffuseColor = new BABYLON.Color3(
            parseInt(hex2.slice(0, 2), 16) / 255,
            parseInt(hex2.slice(2, 4), 16) / 255,
            parseInt(hex2.slice(4, 6), 16) / 255,
          )
          sMat.emissiveColor = sMat.diffuseColor.scale(0.4)
          s.material = sMat
          spheres.push(s)
        }
      }
      overlayMapRef.current.set(room.id, spheres)
    }
  }, [rooms, levels, showSystemsOverlay, ready])

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* Toolbar */}
      <div style={{ height: 44, background: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>3D Shell</span>
        <div style={{ width: 1, height: 20, background: '#E5E7EB', margin: '0 4px' }} />

        {/* Level visibility toggles */}
        {levels.map(l => (
          <button
            key={l.index}
            onClick={() => setLevelVisibility(l.index, !l.visible)}
            style={{
              padding: '3px 10px', borderRadius: 6, border: '1px solid #E5E7EB',
              background: l.visible ? '#EFF6FF' : '#F9FAFB',
              color: l.visible ? '#3B82F6' : '#9CA3AF',
              fontSize: 12, cursor: 'pointer', fontWeight: l.visible ? 600 : 400,
            }}
          >{l.label}</button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Systems overlay toggle */}
        <button
          onClick={() => setShowSystemsOverlay(!showSystemsOverlay)}
          style={{
            padding: '3px 12px', borderRadius: 6, border: '1px solid #E5E7EB',
            background: showSystemsOverlay ? '#FFF7ED' : '#F9FAFB',
            color: showSystemsOverlay ? '#EA580C' : '#6B7280',
            fontSize: 12, cursor: 'pointer', fontWeight: showSystemsOverlay ? 600 : 400,
          }}
        >Systems {showSystemsOverlay ? 'ON' : 'OFF'}</button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', outline: 'none' }} />

        {/* Systems legend */}
        {showSystemsOverlay && (
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: 'rgba(255,255,255,0.92)', borderRadius: 8,
            padding: '10px 14px', boxShadow: '0 1px 8px rgba(0,0,0,0.1)',
            fontSize: 11, minWidth: 160,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#374151' }}>Systems Legend</div>
            {Object.entries(NODE_COLORS).map(([kind, color]) => (
              <div key={kind} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ color: '#6B7280' }}>{kind.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {rooms.length === 0 && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>&#x1F3D7;</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No rooms yet</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Add rooms in the Floor Plan view</div>
          </div>
        )}
      </div>
    </div>
  )
}
