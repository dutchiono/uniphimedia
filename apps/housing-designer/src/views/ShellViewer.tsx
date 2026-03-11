import { useEffect, useRef, useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
import { buildPartitionBabylon, buildRoomShellBabylon, disposeRoomShell, GRID_TO_M } from '../geometry/buildRoomShellBabylon'
import { applyPBRMaterials } from '../renderer/PBRMaterialManager'
import { setupShadows, addMeshToShadows, setupSSAO } from '../renderer/ShadowManager'
import { enterWalkthrough, exitWalkthrough } from './WalkthroughCamera.babylon'
import ModeFrame from '../components/ModeFrame'

const NODE_COLORS: Record<string, string> = {
  hvac_supply: '#FB923C', hvac_return: '#FDBA74', hvac_handler: '#F97316',
  plumbing_drain: '#38BDF8', plumbing_supply: '#0EA5E9', plumbing_vent: '#BAE6FD',
  electrical_outlet: '#FCD34D', electrical_switch: '#FDE68A', electrical_panel: '#F59E0B',
  gas_line: '#86EFAC',
}

function toggleButton(active: boolean, accent: string): React.CSSProperties {
  return {
    padding: '8px 12px',
    borderRadius: 10,
    border: active ? `1px solid ${accent}` : '1px solid #CBD5E1',
    background: active ? accent : '#FFFFFF',
    color: active ? '#FFFFFF' : '#111827',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 700,
  }
}

function actionButton(): React.CSSProperties {
  return {
    padding: '8px 10px',
    borderRadius: 10,
    border: '1px solid #CBD5E1',
    background: '#FFFFFF',
    color: '#111827',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 700,
  }
}

export default function ShellViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<BABYLON.Scene | null>(null)
  const orbitCameraRef = useRef<BABYLON.ArcRotateCamera | null>(null)
  const walkthroughCameraRef = useRef<BABYLON.UniversalCamera | null>(null)
  const meshMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  const partitionMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  const overlayMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  const matCacheRef = useRef<Map<string, BABYLON.PBRMetallicRoughnessMaterial>>(new Map())
  const shadowGenRef = useRef<BABYLON.ShadowGenerator | null>(null)

  const {
    rooms,
    partitions,
    levels,
    globalMaterials,
    selectedPartitionId,
    showSystemsOverlay,
    setShowSystemsOverlay,
    setLevelVisibility,
  } = useDesignStore()

  const [ready, setReady] = useState(false)
  const [cutawayMode, setCutawayMode] = useState(false)
  const [walkthroughActive, setWalkthroughActive] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(40)

  useEffect(() => {
    const canvas = canvasRef.current!
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
    const scene = new BABYLON.Scene(engine)
    sceneRef.current = scene
    scene.collisionsEnabled = true
    scene.clearColor = new BABYLON.Color4(0.96, 0.96, 0.97, 1)

    const orbitCamera = new BABYLON.ArcRotateCamera('cam', -Math.PI / 4, Math.PI / 3.5, 40, BABYLON.Vector3.Zero(), scene)
    orbitCamera.attachControl(canvas, true)
    orbitCamera.lowerRadiusLimit = 4
    orbitCamera.upperRadiusLimit = 200
    orbitCamera.wheelDeltaPercentage = 0.02
    orbitCamera.panningSensibility = 80
    orbitCameraRef.current = orbitCamera
    setZoomLevel(Math.round(orbitCamera.radius))

    const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)
    hemi.intensity = 0.6
    hemi.diffuse = new BABYLON.Color3(1, 0.97, 0.93)

    const dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(-1, -2, -1), scene)
    dir.intensity = 0.8
    dir.position = new BABYLON.Vector3(20, 40, 20)

    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene)
    const gMat = new BABYLON.StandardMaterial('gMat', scene)
    gMat.diffuseColor = new BABYLON.Color3(0.92, 0.92, 0.94)
    ground.material = gMat
    ground.receiveShadows = true
    ground.checkCollisions = true

    const shadowGen = setupShadows(scene, dir, [])
    shadowGenRef.current = shadowGen

    setupSSAO(scene, orbitCamera)

    engine.runRenderLoop(() => {
      if (orbitCameraRef.current && scene.activeCamera === orbitCameraRef.current) {
        setZoomLevel(Math.round(orbitCameraRef.current.radius))
      }
      scene.render()
    })

    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)
    setReady(true)

    return () => {
      if (walkthroughCameraRef.current && orbitCameraRef.current) {
        exitWalkthrough(scene, canvas, orbitCameraRef.current, walkthroughCameraRef.current)
      }
      window.removeEventListener('resize', onResize)
      engine.dispose()
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !ready) return

    const shadowGen = shadowGenRef.current
    const currentIds = new Set(rooms.map(r => r.id))
    for (const [id, meshes] of meshMapRef.current) {
      if (!currentIds.has(id)) {
        disposeRoomShell(meshes)
        meshMapRef.current.delete(id)
        overlayMapRef.current.get(id)?.forEach(m => m.dispose())
        overlayMapRef.current.delete(id)
      }
    }

    const currentPartitionIds = new Set(partitions.map(p => p.id))
    for (const [id, meshes] of partitionMapRef.current) {
      if (!currentPartitionIds.has(id)) {
        disposeRoomShell(meshes)
        partitionMapRef.current.delete(id)
      }
    }

    const maxLevel = rooms.length > 0 ? Math.max(...rooms.map(r => r.level)) : 0

    for (const room of rooms) {
      const mod = getRoomModule(room.moduleType)
      const level = levels.find(l => l.index === room.level)
      if (!mod || !level?.visible) {
        meshMapRef.current.get(room.id)?.forEach(m => m.setEnabled(false))
        overlayMapRef.current.get(room.id)?.forEach(m => m.setEnabled(false))
        continue
      }

      const floorY = level.floorHeightMeters
      const existingMeshes = meshMapRef.current.get(room.id)
      if (existingMeshes) {
        disposeRoomShell(existingMeshes)
        meshMapRef.current.delete(room.id)
      }

      const shellMeshes = buildRoomShellBabylon(room, mod, floorY, mod.color, scene)
      for (const m of shellMeshes) {
        m.checkCollisions = !m.name.startsWith('roof_') && !m.name.startsWith('dome_shell_')
      }

      applyPBRMaterials(scene, room, rooms, shellMeshes, globalMaterials, matCacheRef.current)
      shellMeshes.forEach(m => m.setEnabled(true))
      meshMapRef.current.set(room.id, shellMeshes)

      if (shadowGen) {
        for (const mesh of shellMeshes) addMeshToShadows(shadowGen, mesh)
      }

      const existingOverlay = overlayMapRef.current.get(room.id) ?? []
      existingOverlay.forEach(m => m.dispose())
      const spheres: BABYLON.Mesh[] = []
      if (showSystemsOverlay) {
        const wx = room.gridX * GRID_TO_M
        const wz = room.gridY * GRID_TO_M
        for (const node of mod.systemNodes ?? []) {
          const sphere = BABYLON.MeshBuilder.CreateSphere(`node-${room.id}-${node.id}`, { diameter: 0.25 }, scene)
          sphere.position = new BABYLON.Vector3(
            wx + node.positionLocal.x,
            floorY + node.positionLocal.z,
            wz + node.positionLocal.y,
          )
          const mat = new BABYLON.StandardMaterial(`sys-mat-${node.id}`, scene)
          const hex = (NODE_COLORS[node.kind] ?? '#9CA3AF').replace('#', '')
          mat.diffuseColor = new BABYLON.Color3(
            parseInt(hex.slice(0, 2), 16) / 255,
            parseInt(hex.slice(2, 4), 16) / 255,
            parseInt(hex.slice(4, 6), 16) / 255,
          )
          mat.emissiveColor = mat.diffuseColor.scale(0.4)
          sphere.material = mat
          spheres.push(sphere)
        }
      }
      overlayMapRef.current.set(room.id, spheres)
    }

    for (const partition of partitions) {
      const room = rooms.find(item => item.id === partition.roomId)
      const level = levels.find(item => item.index === partition.level)
      if (!room || !level?.visible) continue
      const existing = partitionMapRef.current.get(partition.id)
      if (existing) disposeRoomShell(existing)
      const meshes = buildPartitionBabylon(partition, room, level.floorHeightMeters, scene)
      for (const mesh of meshes) {
        const mat = mesh.material as BABYLON.StandardMaterial | null
        if (mat) {
          mat.emissiveColor = partition.id === selectedPartitionId ? new BABYLON.Color3(0.95, 0.6, 0.1) : BABYLON.Color3.Black()
          mat.alpha = partition.id === selectedPartitionId ? 1 : 0.96
        }
      }
      partitionMapRef.current.set(partition.id, meshes)
    }
  }, [rooms, partitions, levels, globalMaterials, showSystemsOverlay, selectedPartitionId, ready])

  useEffect(() => {
    for (const meshes of meshMapRef.current.values()) {
      for (const mesh of meshes) {
        const isRoofLike = mesh.name.startsWith('roof_') || mesh.name.startsWith('dome_shell_')
        if (isRoofLike) {
          mesh.setEnabled(!(cutawayMode || walkthroughActive))
          continue
        }
        if (mesh.material && 'alpha' in mesh.material) {
          (mesh.material as BABYLON.Material & { alpha?: number }).alpha = walkthroughActive ? 0.82 : 0.92
        }
      }
    }
  }, [cutawayMode, walkthroughActive, rooms, partitions])

  const toggleWalkthrough = () => {
    const scene = sceneRef.current
    const canvas = canvasRef.current
    const orbitCamera = orbitCameraRef.current
    if (!scene || !canvas || !orbitCamera) return
    if (!walkthroughActive) {
      walkthroughCameraRef.current = enterWalkthrough(scene, canvas, orbitCamera)
      setWalkthroughActive(true)
      setCutawayMode(true)
    } else if (walkthroughCameraRef.current) {
      exitWalkthrough(scene, canvas, orbitCamera, walkthroughCameraRef.current)
      walkthroughCameraRef.current = null
      setWalkthroughActive(false)
    }
  }

  const adjustZoom = (delta: number) => {
    const camera = orbitCameraRef.current
    if (!camera || walkthroughActive) return
    const next = BABYLON.Scalar.Clamp(camera.radius + delta, camera.lowerRadiusLimit ?? 4, camera.upperRadiusLimit ?? 200)
    camera.radius = next
    setZoomLevel(Math.round(next))
  }

  const resetView = () => {
    const camera = orbitCameraRef.current
    if (!camera) return
    camera.target = BABYLON.Vector3.Zero()
    camera.alpha = -Math.PI / 4
    camera.beta = Math.PI / 3.5
    camera.radius = 40
    setZoomLevel(40)
  }

  const toolbar = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {levels.map(l => (
        <button key={l.index} onClick={() => setLevelVisibility(l.index, !l.visible)} style={toggleButton(l.visible, '#2563EB')}>
          {l.visible ? 'Hide' : 'Show'} {l.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button onClick={() => setCutawayMode(v => !v)} style={toggleButton(cutawayMode, '#059669')}>Cutaway</button>
      <button onClick={toggleWalkthrough} style={toggleButton(walkthroughActive, '#4338CA')}>Walkthrough</button>
      <button onClick={() => setShowSystemsOverlay(!showSystemsOverlay)} style={toggleButton(showSystemsOverlay, '#EA580C')}>Systems</button>
      <button onClick={() => adjustZoom(-4)} style={actionButton()} disabled={walkthroughActive}>Zoom In</button>
      <button onClick={() => adjustZoom(4)} style={actionButton()} disabled={walkthroughActive}>Zoom Out</button>
      <button onClick={resetView} style={actionButton()}>Reset View</button>
    </div>
  )

  const status = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <span style={{ padding: '6px 10px', borderRadius: 999, background: '#E2E8F0', color: '#334155', fontSize: 12, fontWeight: 700 }}>Zoom {zoomLevel}</span>
      <span style={{ padding: '6px 10px', borderRadius: 999, background: '#CCFBF1', color: '#115E59', fontSize: 12, fontWeight: 700 }}>{partitions.length} dividers</span>
      <span style={{ padding: '6px 10px', borderRadius: 999, background: cutawayMode ? '#D1FAE5' : '#F1F5F9', color: cutawayMode ? '#065F46' : '#64748B', fontSize: 12, fontWeight: 700 }}>Cutaway {cutawayMode ? 'On' : 'Off'}</span>
      <span style={{ padding: '6px 10px', borderRadius: 999, background: walkthroughActive ? '#E0E7FF' : '#F1F5F9', color: walkthroughActive ? '#3730A3' : '#64748B', fontSize: 12, fontWeight: 700 }}>Walkthrough {walkthroughActive ? 'On' : 'Off'}</span>
      <span style={{ padding: '6px 10px', borderRadius: 999, background: showSystemsOverlay ? '#FFEDD5' : '#F1F5F9', color: showSystemsOverlay ? '#9A3412' : '#64748B', fontSize: 12, fontWeight: 700 }}>Systems {showSystemsOverlay ? 'On' : 'Off'}</span>
    </div>
  )

  const main = (
    <div style={{ flex: 1, position: 'relative', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', outline: 'none' }} />
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(15,23,42,0.84)', color: '#F8FAFC', borderRadius: 12, padding: '12px 14px', fontSize: 12, maxWidth: 320 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Navigation</div>
        <div>Left drag to orbit. Right drag to pan. Wheel or Zoom buttons to move in and out.</div>
        {walkthroughActive && <div style={{ marginTop: 6 }}>Walkthrough: WASD to move, mouse to look, Esc to release pointer lock.</div>}
      </div>
      {(cutawayMode || walkthroughActive) && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.94)', color: '#0F172A', borderRadius: 12, padding: '12px 14px', fontSize: 12, maxWidth: 300 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>{walkthroughActive ? 'Interior Walkthrough' : 'Cutaway View'}</div>
          <div>{walkthroughActive ? 'Roof shells are hidden and collision stays active so you can move through shell interiors and divider layouts.' : 'Roof shells are hidden so interior dividers and shell volume are readable.'}</div>
        </div>
      )}
      {rooms.length === 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#334155' }}>No shells yet</div>
          <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Add rooms in Floor Plan to generate shells here.</div>
        </div>
      )}
    </div>
  )

  const right = (
    <div style={{ padding: 16, overflowY: 'auto' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Review Aids</div>
      <div style={{ fontSize: 12, color: '#475569', marginBottom: 16 }}>Dividers now render as interior walls in shell view, with centered door cutouts when configured.</div>
      {showSystemsOverlay ? (
        Object.entries(NODE_COLORS).map(([kind, color]) => (
          <div key={kind} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12, color: '#475569' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            {kind.replace(/_/g, ' ')}
          </div>
        ))
      ) : (
        <div style={{ color: '#64748B', fontSize: 13 }}>Enable Systems to inspect node overlays and legend data while reviewing the shell.</div>
      )}
    </div>
  )

  return (
    <ModeFrame
      title="3D Shell"
      description="Review shell massing, zoom into rooms, and inspect interior divider layout in cutaway or walkthrough mode."
      toolbar={toolbar}
      status={status}
      main={main}
      right={right}
    />
  )
}
