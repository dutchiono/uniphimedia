import * as BABYLON from '@babylonjs/core'
import { getMaterial } from '@uniphimedia/materials-library'
import type { PlacedRoom, MaterialSlotKey } from '@uniphimedia/shared-types'

// ── Helpers ────────────────────────────────────────────────────────────────

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

// ── Exterior face detection ────────────────────────────────────────────────

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

// ── Main export ────────────────────────────────────────────────────────────

/**
 * Apply a Babylon.js MultiMaterial of 6 PBRMetallicRoughnessMaterials
 * (one per box face) to the given room mesh.
 *
 * Face order for BABYLON.MeshBuilder.CreateBox:
 *   0: z+  = wall_s   1: z-  = wall_n
 *   2: x+  = wall_e   3: x-  = wall_w
 *   4: top = roof (top-level) | ceiling
 *   5: bottom = floor
 *
 * Exterior-facing walls (no adjacent room) use the 'exterior' slot.
 */
export function applyPBRMaterials(
  mesh: BABYLON.Mesh,
  room: PlacedRoom,
  globalMaterials: Record<string, string>,
  isTopLevel: boolean,
  allRooms: PlacedRoom[],
  scene: BABYLON.Scene,
  matCache: Map<string, BABYLON.PBRMetallicRoughnessMaterial>,
): void {
  // Determine per-face slot, honouring exterior detection
  const faceSlots: MaterialSlotKey[] = [
    isExteriorFace(room, 's', allRooms) ? 'exterior' : 'wall_s',  // face 0
    isExteriorFace(room, 'n', allRooms) ? 'exterior' : 'wall_n',  // face 1
    isExteriorFace(room, 'e', allRooms) ? 'exterior' : 'wall_e',  // face 2
    isExteriorFace(room, 'w', allRooms) ? 'exterior' : 'wall_w',  // face 3
    isTopLevel ? 'roof' : 'ceiling',                               // face 4
    'floor',                                                       // face 5
  ]

  // Dispose previous MultiMaterial if any
  if (mesh.material && mesh.material instanceof BABYLON.MultiMaterial) {
    mesh.material.dispose(false, false)
  }

  const multiMat = new BABYLON.MultiMaterial(`multi-${room.id}`, scene)

  for (const slot of faceSlots) {
    const matId = (room.materialSlots as Record<string, string>)[slot] ?? globalMaterials[slot]
    if (matId) {
      if (!matCache.has(matId)) {
        matCache.set(matId, makePBRMat(scene, matId))
      }
      multiMat.subMaterials.push(matCache.get(matId)!)
    } else {
      multiMat.subMaterials.push(makeFallbackMat(scene, slot))
    }
  }

  mesh.material = multiMat
  mesh.subMeshes = []

  // Re-create 6 SubMesh entries (one per face) so MultiMaterial works
  // Babylon CreateBox produces 6 faces x 2 triangles each = 12 tris, 36 indices
  const totalVertices = mesh.getTotalVertices()
  const indicesPerFace = 6 // 2 triangles * 3 indices
  for (let i = 0; i < 6; i++) {
    new BABYLON.SubMesh(i, 0, totalVertices, i * indicesPerFace, indicesPerFace, mesh)
  }
}
