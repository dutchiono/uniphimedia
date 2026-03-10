import * as THREE from 'three'
import type { PlacedRoom, RoomModule, Connector } from '@uniphimedia/shared-types'

// ─── Constants ────────────────────────────────────────────────────────────────
export const WALL_T = 0.2          // wall thickness in metres
export const GRID_TO_M = 0.5       // 1 grid unit = 0.5 m
const SLAB_H = 0.05                // floor/ceiling slab thickness
const ROOF_H = 0.12               // roof slab thickness
const ROOF_OVERHANG = WALL_T       // roof extends past exterior face

// ─── Types ───────────────────────────────────────────────────────────────────
export interface RoomShellThree {
  group: THREE.Group
  dispose(): void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse '#RRGGBB' hex into a THREE integer color */
function hexToInt(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

/** Scale a hex color by a brightness factor (0..2) */
function scaleHex(hex: string, factor: number): number {
  const h = hex.replace('#', '')
  const r = Math.min(255, Math.round(parseInt(h.slice(0, 2), 16) * factor))
  const g = Math.min(255, Math.round(parseInt(h.slice(2, 4), 16) * factor))
  const b = Math.min(255, Math.round(parseInt(h.slice(4, 6), 16) * factor))
  return (r << 16) | (g << 8) | b
}

/**
 * Build a wall panel using THREE.ExtrudeGeometry with Shape holes.
 *
 * The wall panel lies in the XY plane:
 *   X: 0 → wallLength  (along wall face)
 *   Y: 0 → wallHeight
 *   Z: 0 → WALL_T      (thickness, via extrude)
 *
 * Openings are cut as holes in the Shape:
 *   - doors:   from Y=0, full height
 *   - windows: centred vertically in wall
 *
 * The caller is responsible for positioning/rotating the returned Mesh.
 */
function buildWallPanel(
  wallLength: number,
  wallHeight: number,
  openings: Connector[],
): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(wallLength, 0)
  shape.lineTo(wallLength, wallHeight)
  shape.lineTo(0, wallHeight)
  shape.closePath()

  for (const conn of openings) {
    const cw = conn.widthMeters
    const ch = conn.heightMeters
    const cx = conn.offsetFraction * wallLength   // left edge along wall

    // doors touch the floor (y=0), windows have a sill
    const sillY = conn.kind === 'window'
      ? Math.max(0.1, (wallHeight - ch) * 0.5)
      : 0

    const hole = new THREE.Path()
    hole.moveTo(cx, sillY)
    hole.lineTo(cx + cw, sillY)
    hole.lineTo(cx + cw, sillY + ch)
    hole.lineTo(cx, sillY + ch)
    hole.closePath()
    shape.holes.push(hole)
  }

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: WALL_T,
    bevelEnabled: false,
  })
  return geo
}

// ─── Main Builder ─────────────────────────────────────────────────────────────

/**
 * buildRoomShellThree
 *
 * Replaces the old BoxGeometry room mesh with real architectural geometry:
 *   - 4 thick walls (south / north / west / east), each WALL_T metres thick
 *   - Door openings via Shape holes for connectors with kind = 'door' | 'opening'
 *   - Window openings via Shape holes for connectors with kind = 'window'
 *   - Floor slab (thin BoxGeometry)
 *   - Flat roof slab (BoxGeometry with WALL_T overhang)
 *
 * Returns a THREE.Group. Caller must call scene.add(group).
 *
 * Performance notes (mobile-friendly):
 *   - ExtrudeGeometry only for walls; floor/roof use BoxGeometry
 *   - No bevel, no subdivision
 *   - DoubleSide walls, shadow casting minimal
 *
 * Coordinate convention:
 *   Y = up, 1 unit = 1 m
 *
 * @param room       PlacedRoom from the design store
 * @param mod        RoomModule (provides connectors)
 * @param floorY     World Y of the room's floor (level.floorHeightMeters)
 * @param color      Hex color string for base diffuse color
 * @param scene      THREE.Scene (NOT auto-added — caller calls scene.add(group))
 */
export function buildRoomShellThree(
  room: PlacedRoom,
  mod: RoomModule,
  floorY: number,
  color: string,
  scene: THREE.Scene,
): THREE.Group {
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const roomH = room.dims.z

  const ox = room.gridX * GRID_TO_M
  const oy = floorY
  const oz = room.gridY * GRID_TO_M

  // Materials
  const wallMat = new THREE.MeshLambertMaterial({
    color: hexToInt(color),
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  })
  const floorMat = new THREE.MeshLambertMaterial({
    color: scaleHex(color, 0.8),
    transparent: true,
    opacity: 0.95,
  })
  const roofMat = new THREE.MeshLambertMaterial({
    color: scaleHex(color, 0.7),
    transparent: true,
    opacity: 0.88,
  })

  // Partition connectors by face
  const byFace: Record<string, Connector[]> = {
    north: [], south: [], east: [], west: []
  }
  for (const conn of mod.connectors) {
    if (
      (conn.kind === 'door' || conn.kind === 'opening' || conn.kind === 'window') &&
      (conn.face === 'north' || conn.face === 'south' ||
       conn.face === 'east'  || conn.face === 'west')
    ) {
      byFace[conn.face].push(conn)
    }
  }

  const group = new THREE.Group()
  group.name = `roomShell_${room.id}`

  function addWall(
    name: string,
    wallLength: number,
    openings: Connector[],
    posX: number,
    posY: number,
    posZ: number,
    rotY: number,
  ) {
    const geo = buildWallPanel(wallLength, roomH, openings)
    const mesh = new THREE.Mesh(geo, wallMat)
    mesh.name = name
    mesh.position.set(posX, posY, posZ)
    mesh.rotation.y = rotY
    mesh.castShadow = false
    mesh.receiveShadow = false
    group.add(mesh)
  }

  // South wall: shape left-edge at (ox, oy, oz), extrudes toward +Z
  addWall(`wall_s_${room.id}`, roomW, byFace.south, ox, oy, oz, 0)

  // North wall: rotY=PI so wall face points inward
  addWall(`wall_n_${room.id}`, roomW, byFace.north, ox + roomW, oy, oz + roomD, Math.PI)

  // West wall: rotY=PI/2
  addWall(`wall_w_${room.id}`, roomD, byFace.west, ox, oy, oz + roomD, Math.PI / 2)

  // East wall: rotY=-PI/2
  addWall(`wall_e_${room.id}`, roomD, byFace.east, ox + roomW, oy, oz, -Math.PI / 2)

  // ── Floor slab ─────────────────────────────────────────────────────────────
  {
    const geo = new THREE.BoxGeometry(roomW, SLAB_H, roomD)
    const mesh = new THREE.Mesh(geo, floorMat)
    mesh.name = `floor_${room.id}`
    mesh.position.set(ox + roomW / 2, oy + SLAB_H / 2, oz + roomD / 2)
    mesh.receiveShadow = true
    mesh.castShadow = false
    group.add(mesh)
  }

  // ── Roof slab ──────────────────────────────────────────────────────────────
  {
    const roofW = roomW + ROOF_OVERHANG * 2
    const roofD = roomD + ROOF_OVERHANG * 2
    const geo = new THREE.BoxGeometry(roofW, ROOF_H, roofD)
    const mesh = new THREE.Mesh(geo, roofMat)
    mesh.name = `roof_${room.id}`
    mesh.position.set(ox + roomW / 2, oy + roomH + ROOF_H / 2, oz + roomD / 2)
    mesh.castShadow = true
    mesh.receiveShadow = false
    group.add(mesh)
  }

  return group
}

/**
 * disposeRoomShellThree — removes group from scene and frees all GPU resources.
 */
export function disposeRoomShellThree(
  group: THREE.Group,
  scene: THREE.Scene,
): void {
  scene.remove(group)
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose()
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose())
      } else {
        obj.material.dispose()
      }
    }
  })
}
