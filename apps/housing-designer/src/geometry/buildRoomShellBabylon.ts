import * as BABYLON from '@babylonjs/core'
import { CSG } from '@babylonjs/core/Meshes/csg'
import type { PlacedRoom, RoomModule, Connector } from '@uniphimedia/shared-types'

// --- Constants ---------------------------------------------------------------
export const WALL_T = 0.2          // wall thickness in metres
export const GRID_TO_M = 0.5       // 1 grid unit = 0.5 m

// --- Types -------------------------------------------------------------------
export interface RoomShellBabylon {
  meshes: BABYLON.Mesh[]
  dispose(): void
}

// --- Helpers -----------------------------------------------------------------

/** Convert hex color string to BABYLON.Color3 */
function hexToColor3(hex: string): BABYLON.Color3 {
  const h = hex.replace('#', '')
  return new BABYLON.Color3(
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  )
}

/**
 * Build one thick wall panel using CreateBox + CSG subtraction for openings.
 * Returned mesh is centred at origin; caller positions and rotates it.
 *
 * Wall is modelled as:
 *   width  = wallLength  (along wall face)
 *   height = wallHeight  (room height)
 *   depth  = WALL_T      (wall thickness)
 *
 * Opening coord system (local to the wall solid centred at origin):
 *   X: 0 at left edge of wall face
 *   Y: 0 at floor
 *   Solid centre is at (-wallLength/2, -wallHeight/2, 0) offset from origin
 */
function buildWallWithOpenings(
  name: string,
  wallLength: number,
  wallHeight: number,
  openings: Connector[],
  scene: BABYLON.Scene,
): BABYLON.Mesh {
  const solid = BABYLON.MeshBuilder.CreateBox(name + '_solid', {
    width: wallLength,
    height: wallHeight,
    depth: WALL_T,
  }, scene)

  if (openings.length === 0) return solid

  let csg = CSG.FromMesh(solid)

  for (const conn of openings) {
    const cw = conn.widthMeters
    const ch = conn.heightMeters
    const cx = conn.offsetFraction * wallLength   // left edge of opening
    const cy = conn.kind === 'window' ? (wallHeight - ch) / 2 : ch / 2

    const cutter = BABYLON.MeshBuilder.CreateBox(name + '_cut_' + conn.id, {
      width: cw,
      height: ch + 0.002,
      depth: WALL_T + 0.01,
    }, scene)
    cutter.position.x = -wallLength / 2 + cx + cw / 2
    cutter.position.y = -wallHeight / 2 + cy
    cutter.position.z = 0

    const cutCSG = CSG.FromMesh(cutter)
    csg = csg.subtract(cutCSG)
    cutter.dispose()
  }

  const result = csg.toMesh(name, null, scene, true)
  solid.dispose()
  return result
}

// --- Main Builder ------------------------------------------------------------

/**
 * buildRoomShellBabylon
 *
 * Replaces the old CreateBox room mesh with real architectural geometry:
 *   - 4 thick walls (N/S/E/W), each WALL_T = 0.2 m thick
 *   - Door/opening cutouts via CSG (connector.kind = 'door' | 'opening')
 *   - Window cutouts via CSG (connector.kind = 'window')
 *   - Floor slab 0.05 m
 *   - Flat roof slab 0.12 m with WALL_T overhang on all sides
 *
 * All meshes returned in WORLD space. Caller disposes via disposeRoomShell().
 *
 * Coordinate convention:  Y = up, 1 unit = 1 m, origin = SW floor corner.
 *
 * @param room    PlacedRoom from design store
 * @param mod     RoomModule (provides connectors array)
 * @param floorY  World Y of floor (level.floorHeightMeters)
 * @param color   Hex color string
 * @param scene   Active Babylon.js scene
 */
export function buildRoomShellBabylon(
  room: PlacedRoom,
  mod: RoomModule,
  floorY: number,
  color: string,
  scene: BABYLON.Scene,
): BABYLON.Mesh[] {
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const roomH = room.dims.z

  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  const oy = floorY

  // Materials
  const mat = new BABYLON.StandardMaterial(`wallMat_${room.id}`, scene)
  mat.diffuseColor = hexToColor3(color)
  mat.backFaceCulling = false
  mat.alpha = 0.92

  const floorMat = new BABYLON.StandardMaterial(`floorMat_${room.id}`, scene)
  floorMat.diffuseColor = hexToColor3(color).scale(0.8)
  floorMat.alpha = 0.95

  const roofMat = new BABYLON.StandardMaterial(`roofMat_${room.id}`, scene)
  roofMat.diffuseColor = hexToColor3(color).scale(0.7)
  roofMat.alpha = 0.88

  // Bucket connectors by face
  const byFace: Record<string, Connector[]> = { north: [], south: [], east: [], west: [] }
  for (const conn of mod.connectors) {
    if (
      (conn.kind === 'door' || conn.kind === 'opening' || conn.kind === 'window') &&
      byFace[conn.face] !== undefined
    ) {
      byFace[conn.face].push(conn)
    }
  }

  const meshes: BABYLON.Mesh[] = []

  // South wall  (Z = oz, faces -Z outward)
  {
    const m = buildWallWithOpenings(`wall_s_${room.id}`, roomW, roomH, byFace.south, scene)
    m.position.set(ox + roomW / 2, oy + roomH / 2, oz)
    m.rotation.y = 0
    m.material = mat
    m.freezeWorldMatrix()
    meshes.push(m)
  }

  // North wall  (Z = oz + roomD, faces +Z outward, rotated PI to face inward)
  {
    const m = buildWallWithOpenings(`wall_n_${room.id}`, roomW, roomH, byFace.north, scene)
    m.position.set(ox + roomW / 2, oy + roomH / 2, oz + roomD)
    m.rotation.y = Math.PI
    m.material = mat
    m.freezeWorldMatrix()
    meshes.push(m)
  }

  // West wall   (X = ox, length = roomD)
  {
    const m = buildWallWithOpenings(`wall_w_${room.id}`, roomD, roomH, byFace.west, scene)
    m.position.set(ox, oy + roomH / 2, oz + roomD / 2)
    m.rotation.y = Math.PI / 2
    m.material = mat
    m.freezeWorldMatrix()
    meshes.push(m)
  }

  // East wall   (X = ox + roomW, length = roomD)
  {
    const m = buildWallWithOpenings(`wall_e_${room.id}`, roomD, roomH, byFace.east, scene)
    m.position.set(ox + roomW, oy + roomH / 2, oz + roomD / 2)
    m.rotation.y = -Math.PI / 2
    m.material = mat
    m.freezeWorldMatrix()
    meshes.push(m)
  }

  // Floor slab
  {
    const floor = BABYLON.MeshBuilder.CreateBox(`floor_${room.id}`, { width: roomW, height: 0.05, depth: roomD }, scene)
    floor.position.set(ox + roomW / 2, oy + 0.025, oz + roomD / 2)
    floor.material = floorMat
    floor.freezeWorldMatrix()
    meshes.push(floor)
  }

  // Flat roof slab (overhangs walls by WALL_T on each side)
  {
    const roof = BABYLON.MeshBuilder.CreateBox(`roof_${room.id}`, {
      width: roomW + WALL_T * 2,
      height: 0.12,
      depth: roomD + WALL_T * 2,
    }, scene)
    roof.position.set(ox + roomW / 2, oy + roomH + 0.06, oz + roomD / 2)
    roof.material = roofMat
    roof.freezeWorldMatrix()
    meshes.push(roof)
  }

  return meshes
}

/**
 * disposeRoomShell - disposes all meshes + their materials for a room.
 */
export function disposeRoomShell(meshes: BABYLON.Mesh[]): void {
  for (const m of meshes) {
    m.material?.dispose()
    m.dispose()
  }
}
