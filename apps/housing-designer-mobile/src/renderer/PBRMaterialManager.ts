import * as THREE from 'three'
import { getMaterial } from '@uniphimedia/materials-library'
import type { PlacedRoom, MaterialSlotKey } from '@uniphimedia/shared-types'

// -- Helpers ------------------------------------------------------------------

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

// -- Exterior face detection --------------------------------------------------

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

// -- Main export --------------------------------------------------------------

/**
 * Replace the mesh material with an array of 6 MeshStandardMaterials
 * (one per BoxGeometry face group).
 *
 * Three.js BoxGeometry group order:
 *   0: +x = wall_e    1: -x = wall_w
 *   2: +y = roof (top-level) | ceiling
 *   3: -y = floor
 *   4: +z = wall_s    5: -z = wall_n
 *
 * Exterior-facing walls (no adjacent room) use the 'exterior' slot.
 */
export function applyPBRMaterials(
  mesh: THREE.Mesh,
  room: PlacedRoom,
  globalMaterials: Record<string, string>,
  isTopLevel: boolean,
  allRooms: PlacedRoom[],
  matCache: Map<string, THREE.MeshStandardMaterial>,
): void {
  // BoxGeometry group order: [+x, -x, +y, -y, +z, -z]
  const faceSlots: MaterialSlotKey[] = [
    isExteriorFace(room, 'e', allRooms) ? 'exterior' : 'wall_e',  // 0: +x
    isExteriorFace(room, 'w', allRooms) ? 'exterior' : 'wall_w',  // 1: -x
    isTopLevel ? 'roof' : 'ceiling',                               // 2: +y
    'floor',                                                       // 3: -y
    isExteriorFace(room, 's', allRooms) ? 'exterior' : 'wall_s',  // 4: +z
    isExteriorFace(room, 'n', allRooms) ? 'exterior' : 'wall_n',  // 5: -z
  ]

  const materials: THREE.MeshStandardMaterial[] = faceSlots.map(slot => {
    const matId = (room.materialSlots as Record<string, string>)[slot] ?? globalMaterials[slot]
    if (matId) {
      if (!matCache.has(matId)) {
        matCache.set(matId, makeStandardMat(matId))
      }
      return matCache.get(matId)!
    }
    return makeFallbackMat()
  })

  mesh.material = materials
}

/**
 * Add uv2 attribute to a BoxGeometry so aoMap works correctly.
 */
export function addUV2(geometry: THREE.BoxGeometry): void {
  if (!geometry.attributes.uv2) {
    geometry.setAttribute('uv2', geometry.attributes.uv.clone())
  }
}
