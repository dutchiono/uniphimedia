import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import * as THREE from 'three'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDesignStore } from '../../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import {
  createWalkthroughState,
  enterWalkthroughMobile,
  exitWalkthroughMobile,
  applyWalkthroughOrientation,
  onWalkthroughTouchStart,
  onWalkthroughTouchMove,
  WalkthroughState,
} from './WalkthroughCamera.mobile'

const GRID_TO_M = 0.5

const NODE_COLORS: Record<string, number> = {
  hvac_supply: 0xFB923C, hvac_return: 0xFDBA74, hvac_handler: 0xF97316,
  plumbing_drain: 0x38BDF8, plumbing_supply: 0x0EA5E9, plumbing_vent: 0xBAE6FD,
  electrical_outlet: 0xFCD34D, electrical_switch: 0xFDE68A, electrical_panel: 0xF59E0B,
  gas_line: 0x86EFAC,
}

export default function ShellScreen() {
  const { rooms, levels, showSystemsOverlay, setShowSystemsOverlay, setLevelVisibility } = useDesignStore()
  const rendererRef = useRef<Renderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const nodeMapRef = useRef<Map<string, THREE.Mesh[]>>(new Map())
  const glRef = useRef<ExpoWebGLRenderingContext | null>(null)

  // Orbit state
  const orbitRef = useRef({ theta: -0.6, phi: 1.0, radius: 35 })

  // Walkthrough state
  const [walkthroughActive, setWalkthroughActive] = useState(false)
  const walkthroughStateRef = useRef<WalkthroughState>(createWalkthroughState())

  // ── Gestures ──────────────────────────────────────────────────────────────
  // Orbit pan/pinch (active when NOT in walkthrough)
  const pan = Gesture.Pan().onUpdate((e) => {
    if (walkthroughStateRef.current.active) return
    orbitRef.current.theta -= e.velocityX * 0.001
    orbitRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, orbitRef.current.phi - e.velocityY * 0.001))
  })
  const pinch = Gesture.Pinch().onUpdate((e) => {
    if (walkthroughStateRef.current.active) return
    orbitRef.current.radius = Math.max(8, Math.min(120, orbitRef.current.radius / e.scale))
  })

  // Walkthrough touch gestures (handled via raw touch events in GL view)
  const walkthroughPan = Gesture.Pan()
    .onBegin((e) => {
      if (!walkthroughStateRef.current.active) return
      onWalkthroughTouchStart(walkthroughStateRef.current, [{ clientX: e.x, clientY: e.y }])
    })
    .onUpdate((e) => {
      if (!walkthroughStateRef.current.active || !cameraRef.current) return
      const touchCount = e.numberOfPointers
      const fakeTouch = [{ clientX: e.x, clientY: e.y }]
      if (touchCount >= 2) {
        // treat as two-finger walk
        onWalkthroughTouchMove(walkthroughStateRef.current, cameraRef.current, [fakeTouch[0], fakeTouch[0]])
      } else {
        onWalkthroughTouchMove(walkthroughStateRef.current, cameraRef.current, fakeTouch)
      }
    })

  const composed = Gesture.Simultaneous(pan, pinch, walkthroughPan)

  function onContextCreate(gl: ExpoWebGLRenderingContext) {
    glRef.current = gl
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl
    const renderer = new Renderer({ gl })
    renderer.setSize(w, h)
    renderer.setClearColor(0xF5F5F7)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500)
    cameraRef.current = camera

    // Lights
    const hemi = new THREE.HemisphereLight(0xFFF8F0, 0xE0E8F0, 0.7)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xFFFFFF, 0.8)
    dir.position.set(20, 40, 20)
    scene.add(dir)

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshLambertMaterial({ color: 0xEBEBEE })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.01
    scene.add(ground)

    // Grid helper
    const grid = new THREE.GridHelper(80, 160, 0xCCCCCC, 0xDDDDDD)
    scene.add(grid)

    const render = () => {
      requestAnimationFrame(render)
      const ws = walkthroughStateRef.current
      if (ws.active && camera) {
        // Walkthrough: apply yaw/pitch orientation, lock Y
        applyWalkthroughOrientation(camera, ws)
      } else {
        // Orbit mode
        const { theta, phi, radius } = orbitRef.current
        camera.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        )
        camera.lookAt(10, 0, 10)
      }
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    render()
  }

  // ── Toggle walkthrough ────────────────────────────────────────────────────
  function handleWalkthroughToggle() {
    const camera = cameraRef.current
    if (!camera) return
    const ws = walkthroughStateRef.current
    if (!ws.active) {
      enterWalkthroughMobile(camera, ws, 10, 10)
      setWalkthroughActive(true)
    } else {
      exitWalkthroughMobile(
        camera, ws,
        orbitRef.current.radius,
        orbitRef.current.theta,
        orbitRef.current.phi,
      )
      setWalkthroughActive(false)
    }
  }

  // ── Sync rooms ───────────────────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const currentIds = new Set(rooms.map(r => r.id))
    for (const [id, mesh] of meshMapRef.current) {
      if (!currentIds.has(id)) {
        scene.remove(mesh)
        meshMapRef.current.delete(id)
        nodeMapRef.current.get(id)?.forEach(m => scene.remove(m))
        nodeMapRef.current.delete(id)
      }
    }

    for (const room of rooms) {
      const mod = getRoomModule(room.moduleType)
      const level = levels.find(l => l.index === room.level)
      if (!level?.visible) {
        const m = meshMapRef.current.get(room.id)
        if (m) m.visible = false
        nodeMapRef.current.get(room.id)?.forEach(n => n.visible = false)
        continue
      }

      const w = room.gridW * GRID_TO_M
      const d = room.gridH * GRID_TO_M
      const h = room.dims.z
      const wx = room.gridX * GRID_TO_M + w / 2
      const wz = room.gridY * GRID_TO_M + d / 2
      const wy = level.floorHeightMeters + h / 2

      let mesh = meshMapRef.current.get(room.id)
      if (!mesh) {
        const hex = parseInt(mod.color.replace('#', ''), 16)
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, d),
          new THREE.MeshLambertMaterial({ color: hex, transparent: true, opacity: 0.82 })
        )
        scene.add(mesh)
        meshMapRef.current.set(room.id, mesh)
      }
      mesh.position.set(wx, wy, wz)
      mesh.rotation.y = (room.rotation * Math.PI) / 180
      mesh.visible = true

      // Systems nodes
      nodeMapRef.current.get(room.id)?.forEach(m => scene.remove(m))
      const spheres: THREE.Mesh[] = []
      if (showSystemsOverlay) {
        for (const node of mod.systemNodes) {
          const s = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 8),
            new THREE.MeshLambertMaterial({ color: NODE_COLORS[node.kind] ?? 0x9CA3AF })
          )
          s.position.set(
            wx - w / 2 + node.positionLocal.x,
            level.floorHeightMeters + node.positionLocal.z,
            wz - d / 2 + node.positionLocal.y,
          )
          scene.add(s)
          spheres.push(s)
        }
      }
      nodeMapRef.current.set(room.id, spheres)
    }
  }, [rooms, levels, showSystemsOverlay])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
        {/* Toolbar */}
        <View style={s.toolbar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, alignItems: 'center' }}>
            {levels.map(l => (
              <TouchableOpacity key={l.index} onPress={() => setLevelVisibility(l.index, !l.visible)}
                style={[s.levelBtn, l.visible && s.levelBtnActive]}>
                <Text style={[s.levelBtnText, l.visible && s.levelBtnTextActive]}>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={() => setShowSystemsOverlay(!showSystemsOverlay)}
            style={[s.sysBtn, showSystemsOverlay && s.sysBtnActive]}>
            <Text style={[s.sysBtnText, showSystemsOverlay && s.sysBtnTextActive]}>
              Systems {showSystemsOverlay ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>

          {/* Walk toggle */}
          <TouchableOpacity onPress={handleWalkthroughToggle}
            style={[s.walkBtn, walkthroughActive && s.walkBtnActive]}>
            <Text style={[s.walkBtnText, walkthroughActive && s.walkBtnTextActive]}>
              {walkthroughActive ? 'Exit Walk' : 'Walk'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3D View */}
        <GestureDetector gesture={composed}>
          <View style={{ flex: 1 }}>
            <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
          </View>
        </GestureDetector>

        {/* Walkthrough hint */}
        {walkthroughActive && (
          <View style={s.walkthroughHint} pointerEvents="none">
            <Text style={s.walkthroughHintText}>1 finger = look  |  2 fingers = walk  |  tap Walk to exit</Text>
          </View>
        )}

        {rooms.length === 0 && (
          <View style={s.emptyState}>
            <Text style={{ fontSize: 42 }}>&#x1F3D7;</Text>
            <Text style={s.emptyTitle}>No rooms yet</Text>
            <Text style={s.emptySubtitle}>Add rooms in the Floor Plan tab</Text>
          </View>
        )}

        {showSystemsOverlay && (
          <View style={s.legend}>
            <Text style={s.legendTitle}>Systems</Text>
            {Object.entries(NODE_COLORS).slice(0, 6).map(([kind, color]) => (
              <View key={kind} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: `#${color.toString(16).padStart(6, '0')}` }} />
                <Text style={{ fontSize: 10, color: '#6B7280' }}>{kind.replace(/_/g, ' ')}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  )
}

const s = StyleSheet.create({
  toolbar: { flexDirection: 'row', alignItems: 'center', padding: 8, gap: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  levelBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, backgroundColor: '#E5E7EB' },
  levelBtnActive: { backgroundColor: '#EFF6FF' },
  levelBtnText: { fontSize: 12, color: '#6B7280', fontWeight: '400' },
  levelBtnTextActive: { color: '#3B82F6', fontWeight: '600' },
  sysBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  sysBtnActive: { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' },
  sysBtnText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  sysBtnTextActive: { color: '#EA580C', fontWeight: '600' },
  walkBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  walkBtnActive: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' },
  walkBtnText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  walkBtnTextActive: { color: '#2563EB', fontWeight: '600' },
  walkthroughHint: { position: 'absolute', top: 56, left: 0, right: 0, alignItems: 'center' },
  walkthroughHintText: { backgroundColor: 'rgba(0,0,0,0.52)', color: '#fff', fontSize: 11, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20, overflow: 'hidden' },
  emptyState: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' } as any,
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginTop: 10 },
  emptySubtitle: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
  legend: { position: 'absolute', bottom: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.93)', borderRadius: 10, padding: 12, minWidth: 150, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  legendTitle: { fontSize: 11, fontWeight: '700', color: '#374151', marginBottom: 8 },
})
