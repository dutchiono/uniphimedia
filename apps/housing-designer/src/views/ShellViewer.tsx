import { useEffect, useRef, useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
import { buildRoomShellBabylon, disposeRoomShell, GRID_TO_M } from '../geometry/buildRoomShellBabylon'
import { applyPBRMaterials, isExteriorFace } from '../renderer/PBRMaterialManager'
import { setupShadows, addMeshToShadows, setupSSAO } from '../renderer/ShadowManager'

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
  // meshMapRef holds an array of meshes per room (walls + floor + roof)
  const meshMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  const overlayMapRef = useRef<Map<string, BABYLON.Mesh[]>>(new Map())
  // Shared PBR material cache -- keyed by catalog matId
  const matCacheRef = useRef<Map<string, BABYLON.PBRMetallicRoughnessMaterial>>(new Map())
  // Shadow generator ref -- set once during init, reused for incremental rooms
  const shadowGenRef = useRef<BABYLON.ShadowGenerator | null>(null)

  const {
    rooms, levels, globalMaterials,
    showSystemsOverlay, setShowSystemsOverlay,
    setLevelVisibility,
  } = useDesignStore()

  const [ready, setReady] = useState(false)

  // -- Init Babylon ---------------------------------------------------------------------
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

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene)
    const gMat = new BABYLON.StandardMaterial('gMat', scene)
    gMat.diffuseColor = new BABYLON.Color3(0.92, 0.92, 0.94)
    ground.material = gMat
    ground.receiveShadows = true

    // -- Shadows (ShadowGenerator on directional light) --
    const shadowGen = setupShadows(scene, dir, [])
    shadowGenRef.current = shadowGen

    // -- SSAO (screen-space ambient occlusion) --
    setupSSAO(scene, camera)

    // Render loop
    engine.runRenderLoop(() => scene.render())
    window.addEventListener('resize', () => engine.resize())

    setReady(true)
    return () => {
      engine.stopRenderLoop()
      scene.dispose()
      engine.dispose()
      window.removeEventListener('resize', () => engine.resize())
    }
  }, [])

  // -- Sync rooms to meshes -------------------------------------------------------------
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !ready) return

    const shadowGen = shadowGenRef.current
    const meshMap   = meshMapRef.current
    const matCache  = matCacheRef.current
    const currentIds = new Set(rooms.map(r => r.id))

    // Remove deleted rooms
    for (const [id, meshes] of meshMap) {
      if (!currentIds.has(id)) {
        disposeRoomShell(meshes)
        meshMap.delete(id)
      }
    }

    // Add / update rooms
    for (const room of rooms) {
      if (meshMap.has(room.id)) {
        // Reapply materials in case globalMaterials or overrides changed
        const meshes = meshMap.get(room.id)!
        applyPBRMaterials(scene, room, rooms, meshes, globalMaterials, matCache)
        continue
      }

      const mod = getRoomModule(room.moduleId)
      if (!mod) continue

      const meshes = buildRoomShellBabylon(room, mod, scene)
      meshMap.set(room.id, meshes)

      // Apply PBR materials across all 5 slots
      applyPBRMaterials(scene, room, rooms, meshes, globalMaterials, matCache)

      // Register meshes with shadow generator
      if (shadowGen) {
        for (const mesh of meshes) addMeshToShadows(shadowGen, mesh)
      }
    }
  }, [rooms, globalMaterials, ready])

  // -- Systems overlay ------------------------------------------------------------------
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !ready) return

    // Dispose existing overlays
    for (const [, meshes] of overlayMapRef.current) {
      for (const m of meshes) m.dispose()
    }
    overlayMapRef.current.clear()

    if (!showSystemsOverlay) return

    for (const room of rooms) {
      const mod = getRoomModule(room.moduleId)
      if (!mod?.systemNodes) continue
      const overlays: BABYLON.Mesh[] = []
      for (const node of mod.systemNodes) {
        const color = NODE_COLORS[node.type] ?? '#ffffff'
        const sphere = BABYLON.MeshBuilder.CreateSphere(
          `sys-${room.id}-${node.type}`,
          { diameter: 0.25 * GRID_TO_M },
          scene,
        )
        sphere.position = new BABYLON.Vector3(
          (room.gridX + node.offsetX) * GRID_TO_M,
          (node.offsetZ ?? 1.2) * GRID_TO_M,
          (room.gridY + node.offsetY) * GRID_TO_M,
        )
        const mat = new BABYLON.StandardMaterial(`sys-mat-${node.type}`, scene)
        const h = color.replace('#', '')
        mat.emissiveColor = new BABYLON.Color3(
          parseInt(h.slice(0, 2), 16) / 255,
          parseInt(h.slice(2, 4), 16) / 255,
          parseInt(h.slice(4, 6), 16) / 255,
        )
        sphere.material = mat
        overlays.push(sphere)
      }
      overlayMapRef.current.set(room.id, overlays)
    }
  }, [showSystemsOverlay, rooms, ready])

  // -- Level visibility -----------------------------------------------------------------
  useEffect(() => {
    const meshMap = meshMapRef.current
    for (const room of rooms) {
      const level = levels.find(l => l.id === room.level)
      const meshes = meshMap.get(room.id) ?? []
      for (const mesh of meshes) {
        mesh.isVisible = level?.visible ?? true
      }
    }
  }, [levels, rooms, ready])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        touch-action="none"
      />
      <button
        onClick={() => setShowSystemsOverlay(!showSystemsOverlay)}
        style={{
          position: 'absolute', top: 12, right: 12,
          padding: '6px 12px', borderRadius: 6,
          background: showSystemsOverlay ? '#1d4ed8' : '#ffffff',
          color: showSystemsOverlay ? '#ffffff' : '#1d4ed8',
          border: '1.5px solid #1d4ed8', cursor: 'pointer', fontWeight: 600,
        }}
      >
        {showSystemsOverlay ? 'Hide Systems' : 'Show Systems'}
      </button>
    </div>
  )
}
