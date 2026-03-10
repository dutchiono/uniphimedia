import * as BABYLON from '@babylonjs/core'
import { getMaterial } from '@uniphimedia/materials-library'
import type { PlacedRoom, MaterialSlotKey } from '@uniphimedia/shared-types'

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToColor3(hex: string): BABYLON.Color3 {
  const h = hex.replace('#', '')
  return new BABYLON.Color3(
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  )
}

function makePBRMat(
  scene: BABYLON.Scene,
  matId: string,
): BABYLON.PBRMetallicRoughnessMaterial {
  const catalog = getMaterial(matId)
  const mat = new BABYLON.PBRMetallicRoughnessMaterial(`pbr-${matId}`, scene)
  if (catalog) {
    mat.baseColor = hexToColor3(catalog.albedo)
    mat.metallic = catalog.metallic
    mat.roughness = catalog.roughness
    if (catalog.albedoMapUrl) {
      const tex = new BABYLON.Texture(catalog.albedoMapUrl, scene)
      tex.uScale = 1 / catalog.tilingMeters
      tex.vScale = 1 / catalog.tilingMeters
      mat.baseTexture = tex
    }
    if (catalog.normalMapUrl) {
      const norm = new BABYLON.Texture(catalog.normalMapUrl, scene)
      norm.uScale = 1 / catalog.tilingMeters
      norm.vScale = 1 / catalog.tilingMeters
      mat.normalTexture = norm
    }
    if (catalog.roughnessMapUrl) {
      const rough = new BABYLON.Texture(catalog.roughnessMapUrl, scene)
      mat.metallicRoughnessTexture = rough
    }
  }
  return mat
}

function makeFallbackMat(
  scene: BABYLON.Scene,
  slot: string,
): BABYLON.PBRMetallicRoughnessMaterial {
  const mat = new BABYLON.PBRMetallicRoughnessMaterial(`fallback-${slot}`, scene)
  mat.baseColor = new BABYLON.Color3(0.8, 0.8, 0.82)
  mat.roughness = 0.9
  mat.metallic = 0.0
  return mat
}

// ── Exterior face detection ───────────────────────────────────────────────────

export function isExteriorFace(
  room: PlacedRoom,
  face: 'n' | 's' | 'e' | 'w',
  rooms: PlacedRoom[],
): boolean {
  switch (face) {
    case 'n':
      return !rooms.some(
        r =>
          r.id !== room.id &&
          r.level === room.level &&
          r.gridY + r.gridH === room.gridY &&
          r.gridX < room.gridX + room.gridW &&
          r.gridX + r.gridW > room.gridX,
      )
    case 's':
      return !rooms.some(
        r =>
          r.id !== room.id &&
          r.level === room.level &&
          r.gridY === room.gridY + room.gridH &&
          r.gridX < room.gridX + room.gridW &&
          r.gridX + r.gridW > room.gridX,
      )
    case 'e':
      return !rooms.some(
        r =>
          r.id !== room.id &&
          r.level === room.level &&
          r.gridX === room.gridX + room.gridW &&
          r.gridY < room.gridY + room.gridH &&
          r.gridY + r.gridH > room.gridY,
      )
    case 'w':
      return !rooms.some(
        r =>
          r.id !== room.id &&
          r.level === room.level &&
          r.gridX + r.gridW === room.gridX &&
          r.gridY < room.gridY + room.gridH &&
          r.gridY + r.gridH > room.gridY,
      )
  }
}

// ── Slot resolver ─────────────────────────────────────────────────────────────

/**
 * Resolve the correct MaterialSlotKey for a named mesh face.
 *
 * Mesh naming convention produced by buildRoomShellBabylon:
 *   `{roomId}_wall_{n|s|e|w}`  — wall face
 *   `{roomId}_floor`           — floor slab
 *   `{roomId}_roof`            — roof/ceiling slab
 *   `{roomId}_trim_{*}`        — trim pieces
 */
function slotForMeshName(
  name: string,
  room: PlacedRoom,
  rooms: PlacedRoom[],
): MaterialSlotKey {
  if (name.includes('_roof'))  return 'roofing'
  if (name.includes('_floor')) return 'floor'
  if (name.includes('_trim'))  return 'trim'
  if (name.includes('_wall_')) {
    const face = name.split('_wall_')[1] as 'n' | 's' | 'e' | 'w'
    if (isExteriorFace(room, face, rooms)) return 'exterior_siding'
    return 'interior_wall'
  }
  return 'interior_wall'
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Apply PBRMetallicRoughnessMaterial to every mesh in meshMap, resolving the
 * correct catalog entry per surface slot (exterior_siding, roofing, floor,
 * interior_wall, trim).  Materials are cached in matCache so identical catalog
 * IDs reuse the same BABYLON material object.
 *
 * @param scene       Active Babylon scene
 * @param room        The PlacedRoom this mesh set belongs to
 * @param allRooms    Full room list (needed for exterior-face detection)
 * @param meshes      Array of meshes produced by buildRoomShellBabylon for this room
 * @param globalMats  Map of slot -> catalog matId from the design store
 * @param matCache    Shared PBR material cache (keyed by catalog matId)
 */
export function applyPBRMaterials(
  scene: BABYLON.Scene,
  room: PlacedRoom,
  allRooms: PlacedRoom[],
  meshes: BABYLON.Mesh[],
  globalMats: Record<MaterialSlotKey, string>,
  matCache: Map<string, BABYLON.PBRMetallicRoughnessMaterial>,
): void {
  for (const mesh of meshes) {
    const slot = slotForMeshName(mesh.name, room, allRooms)
    // Use room-level override if present, else fall back to global slot assignment
    const matId =
      (room.materialOverrides as Record<string, string> | undefined)?.[slot] ??
      globalMats[slot]

    if (!matId) {
      mesh.material = makeFallbackMat(scene, slot)
      continue
    }

    let mat = matCache.get(matId)
    if (!mat) {
      mat = makePBRMat(scene, matId)
      matCache.set(matId, mat)
    }
    mesh.material = mat
  }
}
