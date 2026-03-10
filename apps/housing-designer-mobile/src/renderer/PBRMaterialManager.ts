import * as THREE from 'three'
import { getMaterial } from '@uniphimedia/materials-library'
import type { PlacedRoom, MaterialSlotKey } from '@uniphimedia/shared-types'

// -- Helpers ---------------------------------------------------------------------------

function makeStandardMat(
  matId: string,
): THREE.MeshStandardMaterial {
  const catalog = getMaterial(matId)
  const mat = new THREE.MeshStandardMaterial()
  mat.name = `pbr-${matId}`
  if (catalog) {
    mat.color = new THREE.Color(catalog.albedo)
    mat.metalness = catalog.metallic
    mat.roughness = catalog.roughness

    const loader = new THREE.TextureLoader()

    if (catalog.albedoMapUrl) {
      loader.load(catalog.albedoMapUrl, (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(1 / catalog.tilingMeters, 1 / catalog.tilingMeters)
        mat.map = tex
        mat.needsUpdate = true
      })
    }
    if (catalog.normalMapUrl) {
      loader.load(catalog.normalMapUrl, (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(1 / catalog.tilingMeters, 1 / catalog.tilingMeters)
        mat.normalMap = tex
        mat.needsUpdate = true
      })
    }
    if (catalog.roughnessMapUrl) {
      loader.load(catalog.roughnessMapUrl, (tex) => {
        mat.roughnessMap = tex
        mat.metalnessMap = tex
        mat.needsUpdate = true
      })
    }
    if (catalog.aoMapUrl) {
      loader.load(catalog.aoMapUrl, (tex) => {
        mat.aoMap = tex
        mat.needsUpdate = true
      })
    }
  }
  return mat
}

function makeFallbackMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.9,
    metalness: 0.0,
  })
}

// -- Exterior face detection -----------------------------------------------------------

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

// -- Slot resolver ---------------------------------------------------------------------

/**
 * Resolve the correct MaterialSlotKey for a named Three.js mesh.
 *
 * Mesh naming convention produced by buildRoomShellThree:
 *   `{roomId}_wall_{n|s|e|w}`  -- wall face
 *   `{roomId}_floor`           -- floor slab
 *   `{roomId}_roof`            -- roof/ceiling slab
 *   `{roomId}_trim_{*}`        -- trim pieces
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

// -- Public API ------------------------------------------------------------------------

/**
 * Apply MeshStandardMaterial to every mesh in the provided array, resolving the
 * correct catalog entry per surface slot (exterior_siding, roofing, floor,
 * interior_wall, trim).  Materials are cached in matCache so identical catalog
 * IDs reuse the same Three.js material object.
 *
 * Shadow casting/receiving must be enabled separately via ShadowManager.enableShadows()
 * or addMeshToShadows() -- MeshStandardMaterial supports PCFSoft shadow maps natively.
 *
 * @param room        The PlacedRoom this mesh set belongs to
 * @param allRooms    Full room list (needed for exterior-face detection)
 * @param meshes      Array of Three.js meshes for this room
 * @param globalMats  Map of slot -> catalog matId from the design store
 * @param matCache    Shared material cache (keyed by catalog matId)
 */
export function applyPBRMaterials(
  room: PlacedRoom,
  allRooms: PlacedRoom[],
  meshes: THREE.Mesh[],
  globalMats: Record<MaterialSlotKey, string>,
  matCache: Map<string, THREE.MeshStandardMaterial>,
): void {
  for (const mesh of meshes) {
    const slot = slotForMeshName(mesh.name, room, allRooms)
    const matId =
      (room.materialOverrides as Record<string, string> | undefined)?.[slot] ??
      globalMats[slot]

    if (!matId) {
      mesh.material = makeFallbackMat()
      continue
    }

    let mat = matCache.get(matId)
    if (!mat) {
      mat = makeStandardMat(matId)
      matCache.set(matId, mat)
    }
    mesh.material = mat
  }
}
