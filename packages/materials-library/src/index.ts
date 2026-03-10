/**
 * @uniphimedia/materials-library
 *
 * Catalog of PBR material skins for exterior, interior, and finishes.
 */

import type { MaterialSkin } from '@uniphimedia/shared-types'

/**
 * Placeholder material catalog.
 * In production, this would load from a database or asset CDN.
 */
export const MATERIALS: Record<string, MaterialSkin> = {
  vinylSidingWhite: {
    id: 'vinylSidingWhite',
    name: 'White Vinyl Siding',
    category: 'exterior',
    subcategory: 'siding',
    textures: {},
    properties: { color: '#f5f5f5', roughness: 0.6, metallic: 0 },
  },
  asphaltShingleGray: {
    id: 'asphaltShingleGray',
    name: 'Gray Asphalt Shingles',
    category: 'roofing',
    textures: {},
    properties: { color: '#4a4a4a', roughness: 0.8, metallic: 0 },
  },
  oakFlooring: {
    id: 'oakFlooring',
    name: 'Oak Hardwood Flooring',
    category: 'flooring',
    textures: {},
    properties: { color: '#b08968', roughness: 0.5, metallic: 0 },
  },
  paintEggshellWhite: {
    id: 'paintEggshellWhite',
    name: 'Eggshell White Paint',
    category: 'interior',
    subcategory: 'wall',
    textures: {},
    properties: { color: '#fafaf8', roughness: 0.7, metallic: 0 },
  },
  graniteCountertop: {
    id: 'graniteCountertop',
    name: 'Black Granite Countertop',
    category: 'kitchen',
    subcategory: 'countertop',
    textures: {},
    properties: { color: '#2b2b2b', roughness: 0.2, metallic: 0 },
  },
  ceramicTileWhite: {
    id: 'ceramicTileWhite',
    name: 'White Ceramic Tile',
    category: 'bath',
    subcategory: 'tile',
    textures: {},
    properties: { color: '#ffffff', roughness: 0.3, metallic: 0 },
  },
}

export function getMaterial(id: string): MaterialSkin | undefined {
  return MATERIALS[id]
}

export function getMaterialsByCategory(category: MaterialSkin['category']): MaterialSkin[] {
  return Object.values(MATERIALS).filter(m => m.category === category)
}

export function getAllMaterials(): MaterialSkin[] {
  return Object.values(MATERIALS)
}