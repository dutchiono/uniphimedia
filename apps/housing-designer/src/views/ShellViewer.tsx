import { useEffect, useRef, useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'

const GRID_TO_M = 0.5  // 1 grid unit = 0.5 meters

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
  const meshMapRef = useRef<Map<string, BABYLON.Mesh>>(new Map())
  const overlayMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())

  const {
    rooms, levels, globalMaterials,
    showSystemsOverlay, setShowSystemsOverlay,
    setLevelVisibility,
  } = useDesignStore()

  const [ready, setReady] = useState(false)

  // ── Init Babylon ──────────────────────────────────────────────────────────
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
    gMat.wireframe = false
    ground.material = gMat

    // Grid lines overlay
    const gridMat = new BABYLON.GridMaterial?.('gridMat', scene)
    if (gridMat) {
      gridMat.mainColor = new BABYLON.Color3(0.85, 0.85, 0.88)
      gridMat.lineColor = new BABYLON.Color3(0.75, 0.75, 0.78)
      gridMat.gridRatio = GRID_TO_M * 2
      ground.material = gridMat
    }

    engine.runRenderLoop(() => scene.render())
    window.addEventListener('resize', () => engine.resize())
    setReady(true)

    return () => {
      engine.dispose()
      window.removeEventListener('resize', () => engine.resize())
    }
  }, [])

  // ── Sync rooms → meshes ───────────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !ready) return

    const currentIds = new Set(rooms.map(r => r.id))

    // Remove meshes for deleted rooms
    for (const [id, mesh] of meshMapRef.current) {
      if (!currentIds.has(id)) {
        mesh.dispose()
        meshMapRef.current.delete(id)
        overlayMapRef.current.get(id)?.forEach(m => m.dispose())
        overlayMapRef.current.delete(id)
      }
    }

    for (const room of rooms) {
      const mod = getRoomModule(room.moduleType)
      const level = levels.find(l => l.index === room.level)
      if (!level?.visible) {
        meshMapRef.current.get(room.id)?.setEnabled(false)
        overlayMapRef.current.get(room.id)?.forEach(m => m.setEnabled(false))
        continue
      }

      const w = room.gridW * GRID_TO_M
      const d = room.gridH * GRID_TO_M
      const h = room.dims.z

      // World position: center of room, lifted to correct floor height
      const wx = room.gridX * GRID_TO_M + w / 2
      const wz = room.gridY * GRID_TO_M + d / 2
      const wy = level.floorHeightMeters + h / 2

      // Create or update mesh
      let mesh = meshMapRef.current.get(room.id)
      if (!mesh) {
        mesh = BABYLON.MeshBuilder.CreateBox(room.id, { width: w, height: h, depth: d }, scene)
        meshMapRef.current.set(room.id, mesh)
      } else {
        // Rescale if dimensions changed
        mesh.scaling = new BABYLON.Vector3(
          w / (mesh.getBoundingInfo().boundingBox.extendSize.x * 2),
          h / (mesh.getBoundingInfo().boundingBox.extendSize.y * 2),
          d / (mesh.getBoundingInfo().boundingBox.extendSize.z * 2),
        )
      }

      mesh.position = new BABYLON.Vector3(wx, wy, wz)
      mesh.rotation.y = (room.rotation * Math.PI) / 180
      mesh.setEnabled(true)

      // Material — use room color from module
      let mat = mesh.material as BABYLON.StandardMaterial
      if (!mat) {
        mat = new BABYLON.StandardMaterial(`mat-${room.id}`, scene)
        mesh.material = mat
      }
      const hex = mod.color.replace('#', '')
      const r2 = parseInt(hex.slice(0, 2), 16) / 255
      const g2 = parseInt(hex.slice(2, 4), 16) / 255
      const b2 = parseInt(hex.slice(4, 6), 16) / 255
      mat.diffuseColor = new BABYLON.Color3(r2, g2, b2)
      mat.alpha = 0.85

      // Systems overlay spheres
      const existing = overlayMapRef.current.get(room.id) ?? []
      existing.forEach(m => m.dispose())
      const spheres: BABYLON.Mesh[] = []

      if (showSystemsOverlay) {
        for (const node of mod.systemNodes) {
          const s = BABYLON.MeshBuilder.CreateSphere(`node-${room.id}-${node.id}`, { diameter: 0.25 }, scene)
          s.position = new BABYLON.Vector3(
            wx - w / 2 + node.positionLocal.x,
            level.floorHeightMeters + node.positionLocal.z,
            wz - d / 2 + node.positionLocal.y,
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

  // ── Render ────────────────────────────────────────────────────────────────
  const errorRooms = useDesignStore(s => s.validation?.issues.filter(i => i.severity === 'error').flatMap(i => i.affectedRoomIds) ?? [])

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
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏗</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>No rooms yet</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Add rooms in the Floor Plan view</div>
          </div>
        )}
      </div>
    </div>
  )
}