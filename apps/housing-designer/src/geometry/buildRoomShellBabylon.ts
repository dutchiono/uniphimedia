import * as BABYLON from '@babylonjs/core'
import { CSG } from '@babylonjs/core/Meshes/csg'
import type { Connector, InteriorPartition, PlacedRoom, RoomModule } from '@uniphimedia/shared-types'

export const WALL_T = 0.2
export const GRID_TO_M = 0.5

export interface RoomShellBabylon {
  meshes: BABYLON.Mesh[]
  dispose(): void
}

function hexToColor3(hex: string): BABYLON.Color3 {
  const h = hex.replace('#', '')
  return new BABYLON.Color3(parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255)
}

function buildWallWithOpenings(name: string, wallLength: number, wallHeight: number, openings: Connector[], scene: BABYLON.Scene): BABYLON.Mesh {
  const solid = BABYLON.MeshBuilder.CreateBox(name + '_solid', { width: wallLength, height: wallHeight, depth: WALL_T }, scene)
  if (openings.length === 0) return solid
  let csg = CSG.FromMesh(solid)
  for (const conn of openings) {
    const cutter = BABYLON.MeshBuilder.CreateBox(name + '_cut_' + conn.id, { width: conn.widthMeters, height: conn.heightMeters + 0.002, depth: WALL_T + 0.01 }, scene)
    const cx = conn.offsetFraction * wallLength
    const cy = conn.kind === 'window' ? (wallHeight - conn.heightMeters) / 2 : conn.heightMeters / 2
    cutter.position.x = -wallLength / 2 + cx + conn.widthMeters / 2
    cutter.position.y = -wallHeight / 2 + cy
    csg = csg.subtract(CSG.FromMesh(cutter))
    cutter.dispose()
  }
  const result = csg.toMesh(name, null, scene, true)
  solid.dispose()
  return result
}

function buildDomeShellBabylon(room: PlacedRoom, floorY: number, color: string, scene: BABYLON.Scene): BABYLON.Mesh[] {
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const roomH = room.dims.z
  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  const floorMat = new BABYLON.StandardMaterial(`floorMat_${room.id}`, scene)
  floorMat.diffuseColor = hexToColor3(color).scale(0.82)
  floorMat.alpha = 0.95
  const domeMat = new BABYLON.StandardMaterial(`domeMat_${room.id}`, scene)
  domeMat.diffuseColor = hexToColor3(color)
  domeMat.alpha = 0.9
  domeMat.backFaceCulling = false
  const floor = BABYLON.MeshBuilder.CreateCylinder(`floor_${room.id}`, { diameter: 1, height: 0.05, tessellation: 32 }, scene)
  floor.scaling.x = roomW
  floor.scaling.z = roomD
  floor.position.set(ox + roomW / 2, floorY + 0.025, oz + roomD / 2)
  floor.material = floorMat
  floor.freezeWorldMatrix()
  const dome = BABYLON.MeshBuilder.CreateSphere(`dome_shell_${room.id}`, { diameterX: roomW, diameterY: roomH * 2, diameterZ: roomD, segments: 24, slice: 0.5 }, scene)
  dome.position.set(ox + roomW / 2, floorY + roomH, oz + roomD / 2)
  dome.material = domeMat
  dome.freezeWorldMatrix()
  return [dome, floor]
}

function rotateAroundRoom(mesh: BABYLON.Mesh, room: PlacedRoom, floorY: number) {
  if (room.rotation === 0) return
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  const pivot = new BABYLON.Vector3(ox + roomW / 2, floorY, oz + roomD / 2)
  const angle = (room.rotation * Math.PI) / 180
  const rel = mesh.position.subtract(pivot)
  mesh.position = new BABYLON.Vector3(pivot.x + rel.x * Math.cos(angle) - rel.z * Math.sin(angle), mesh.position.y, pivot.z + rel.x * Math.sin(angle) + rel.z * Math.cos(angle))
  mesh.rotation.y += angle
}

function buildRingPartition(partition: InteriorPartition, room: PlacedRoom, floorY: number, scene: BABYLON.Scene): BABYLON.Mesh[] {
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  const radius = partition.radiusMeters ?? 1
  const sweepDeg = partition.sweepDeg ?? 360
  const segments = Math.max(6, Math.ceil(sweepDeg / 18))
  const meshes: BABYLON.Mesh[] = []
  const mat = new BABYLON.StandardMaterial(`partitionMat_${partition.id}`, scene)
  mat.diffuseColor = new BABYLON.Color3(0.72, 0.78, 0.82)
  mat.alpha = 0.96
  const startDeg = -90 - sweepDeg / 2
  const step = sweepDeg / segments
  for (let i = 0; i < segments; i++) {
    const a0 = ((startDeg + i * step) * Math.PI) / 180
    const a1 = ((startDeg + (i + 1) * step) * Math.PI) / 180
    const x0 = ox + roomW / 2 + Math.cos(a0) * radius
    const z0 = oz + roomD / 2 + Math.sin(a0) * radius
    const x1 = ox + roomW / 2 + Math.cos(a1) * radius
    const z1 = oz + roomD / 2 + Math.sin(a1) * radius
    const length = Math.hypot(x1 - x0, z1 - z0)
    const seg = BABYLON.MeshBuilder.CreateBox(`partition_${partition.id}_${i}`, { width: length, height: partition.heightMeters, depth: partition.thicknessMeters }, scene)
    seg.position.set((x0 + x1) / 2, floorY + partition.heightMeters / 2, (z0 + z1) / 2)
    seg.rotation.y = Math.atan2(z1 - z0, x1 - x0)
    seg.material = mat
    rotateAroundRoom(seg, room, floorY)
    seg.checkCollisions = true
    seg.freezeWorldMatrix()
    meshes.push(seg)
  }
  return meshes
}

export function buildPartitionBabylon(partition: InteriorPartition, room: PlacedRoom, floorY: number, scene: BABYLON.Scene): BABYLON.Mesh[] {
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  if (partition.kind === 'ring') return buildRingPartition(partition, room, floorY, scene)

  const mat = new BABYLON.StandardMaterial(`partitionMat_${partition.id}`, scene)
  mat.diffuseColor = new BABYLON.Color3(0.72, 0.78, 0.82)
  mat.alpha = 0.96

  let wallLength = 1
  let wall = null as BABYLON.Mesh | null

  if (partition.kind === 'radial') {
    const start = partition.startMeters ?? 0.6
    const end = partition.endMeters ?? 1.5
    const angle = ((partition.angleDeg ?? 0) - 90) * Math.PI / 180
    wallLength = Math.max(0.2, end - start)
    const openings = partition.doorWidthMeters ? [{ id: `door-${partition.id}`, face: 'south', kind: 'door', offsetFraction: 0.5 - (partition.doorWidthMeters / 2) / wallLength, widthMeters: partition.doorWidthMeters, heightMeters: 2.1, required: false } as Connector] : []
    wall = buildWallWithOpenings(`partition_${partition.id}`, wallLength, partition.heightMeters, openings, scene)
    const mid = (start + end) / 2
    wall.position.set(ox + roomW / 2 + Math.cos(angle) * mid, floorY + partition.heightMeters / 2, oz + roomD / 2 + Math.sin(angle) * mid)
    wall.rotation.y = angle
  } else {
    wallLength = (partition.orientation ?? 'vertical') === 'vertical' ? roomD : roomW
    const openings = partition.doorWidthMeters ? [{ id: `door-${partition.id}`, face: 'south', kind: 'door', offsetFraction: 0.5 - (partition.doorWidthMeters / 2) / wallLength, widthMeters: partition.doorWidthMeters, heightMeters: 2.1, required: false } as Connector] : []
    wall = buildWallWithOpenings(`partition_${partition.id}`, wallLength, partition.heightMeters, openings, scene)
    if ((partition.orientation ?? 'vertical') === 'vertical') {
      wall.position.set(ox + (partition.offsetMeters ?? roomW / 2), floorY + partition.heightMeters / 2, oz + roomD / 2)
      wall.rotation.y = Math.PI / 2
    } else {
      wall.position.set(ox + roomW / 2, floorY + partition.heightMeters / 2, oz + (partition.offsetMeters ?? roomD / 2))
    }
  }

  wall.material = mat
  rotateAroundRoom(wall, room, floorY)
  wall.checkCollisions = true
  wall.freezeWorldMatrix()
  return [wall]
}

export function buildRoomShellBabylon(room: PlacedRoom, mod: RoomModule, floorY: number, color: string, scene: BABYLON.Scene): BABYLON.Mesh[] {
  if (mod.shellKind === 'dome') return buildDomeShellBabylon(room, floorY, color, scene)
  const roomW = room.gridW * GRID_TO_M
  const roomD = room.gridH * GRID_TO_M
  const roomH = room.dims.z
  const ox = room.gridX * GRID_TO_M
  const oz = room.gridY * GRID_TO_M
  const oy = floorY
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
  const byFace: Record<string, Connector[]> = { north: [], south: [], east: [], west: [] }
  for (const conn of room.connectors) if ((conn.kind === 'door' || conn.kind === 'opening' || conn.kind === 'window') && byFace[conn.face] !== undefined) byFace[conn.face].push(conn)
  const meshes: BABYLON.Mesh[] = []
  const south = buildWallWithOpenings(`wall_s_${room.id}`, roomW, roomH, byFace.south, scene)
  south.position.set(ox + roomW / 2, oy + roomH / 2, oz); south.material = mat; south.freezeWorldMatrix(); meshes.push(south)
  const north = buildWallWithOpenings(`wall_n_${room.id}`, roomW, roomH, byFace.north, scene)
  north.position.set(ox + roomW / 2, oy + roomH / 2, oz + roomD); north.rotation.y = Math.PI; north.material = mat; north.freezeWorldMatrix(); meshes.push(north)
  const west = buildWallWithOpenings(`wall_w_${room.id}`, roomD, roomH, byFace.west, scene)
  west.position.set(ox, oy + roomH / 2, oz + roomD / 2); west.rotation.y = Math.PI / 2; west.material = mat; west.freezeWorldMatrix(); meshes.push(west)
  const east = buildWallWithOpenings(`wall_e_${room.id}`, roomD, roomH, byFace.east, scene)
  east.position.set(ox + roomW, oy + roomH / 2, oz + roomD / 2); east.rotation.y = -Math.PI / 2; east.material = mat; east.freezeWorldMatrix(); meshes.push(east)
  const floor = BABYLON.MeshBuilder.CreateBox(`floor_${room.id}`, { width: roomW, height: 0.05, depth: roomD }, scene)
  floor.position.set(ox + roomW / 2, oy + 0.025, oz + roomD / 2); floor.material = floorMat; floor.freezeWorldMatrix(); meshes.push(floor)
  const roof = BABYLON.MeshBuilder.CreateBox(`roof_${room.id}`, { width: roomW + WALL_T * 2, height: 0.12, depth: roomD + WALL_T * 2 }, scene)
  roof.position.set(ox + roomW / 2, oy + roomH + 0.06, oz + roomD / 2); roof.material = roofMat; roof.freezeWorldMatrix(); meshes.push(roof)
  return meshes
}

export function disposeRoomShell(meshes: BABYLON.Mesh[]): void { for (const mesh of meshes) { mesh.material?.dispose(); mesh.dispose() } }
