import type { PBRMaterial } from '@uniphimedia/shared-types'

export const MATERIALS: PBRMaterial[] = [

  // ─── Exterior Siding (6) ──────────────────────────────────────────────────
  {
    id: 'ext-cedar-natural', name: 'Cedar Natural', category: 'exterior_siding',
    albedo: '#C4956A', roughness: 0.85, metallic: 0.0, tilingMeters: 0.3,
    description: 'Horizontal cedar lap siding, natural unstained finish',
    tags: ['wood', 'natural', 'warm'],
  },
  {
    id: 'ext-cedar-grey', name: 'Cedar Weathered Grey', category: 'exterior_siding',
    albedo: '#8A8A80', roughness: 0.9, metallic: 0.0, tilingMeters: 0.3,
    description: 'Horizontal cedar lap siding, weathered grey stain',
    tags: ['wood', 'grey', 'coastal'],
  },
  {
    id: 'ext-brick-red', name: 'Brick Classic Red', category: 'exterior_siding',
    albedo: '#8B3A2A', roughness: 0.92, metallic: 0.0, tilingMeters: 0.25,
    description: 'Traditional red clay brick with white mortar joints',
    tags: ['brick', 'traditional', 'warm'],
  },
  {
    id: 'ext-hempcrete', name: 'Hempcrete Plaster', category: 'exterior_siding',
    albedo: '#C8B89A', roughness: 0.95, metallic: 0.0, tilingMeters: 1.0,
    description: 'Smooth hempcrete with natural lime plaster finish',
    tags: ['sustainable', 'natural', 'earthy'],
  },
  {
    id: 'ext-metal-zinc', name: 'Zinc Standing Seam', category: 'exterior_siding',
    albedo: '#7A8A8A', roughness: 0.45, metallic: 0.85, tilingMeters: 0.5,
    description: 'Vertical zinc standing seam metal panel cladding',
    tags: ['metal', 'modern', 'industrial'],
  },
  {
    id: 'ext-stucco-white', name: 'Stucco White', category: 'exterior_siding',
    albedo: '#F2EFE8', roughness: 0.88, metallic: 0.0, tilingMeters: 0.8,
    description: 'Smooth white stucco exterior finish',
    tags: ['stucco', 'mediterranean', 'clean'],
  },

  // ─── Roofing (4) ─────────────────────────────────────────────────────────
  {
    id: 'roof-asphalt-charcoal', name: 'Asphalt Charcoal', category: 'roofing',
    albedo: '#3A3A3A', roughness: 0.93, metallic: 0.0, tilingMeters: 0.4,
    description: 'Architectural asphalt shingle, charcoal blend',
    tags: ['asphalt', 'standard', 'dark'],
  },
  {
    id: 'roof-metal-dark', name: 'Metal Roof Dark Bronze', category: 'roofing',
    albedo: '#3D2B1F', roughness: 0.4, metallic: 0.9, tilingMeters: 0.6,
    description: 'Dark bronze standing seam metal roof panels',
    tags: ['metal', 'modern', 'durable'],
  },
  {
    id: 'roof-clay-terra', name: 'Clay Tile Terra Cotta', category: 'roofing',
    albedo: '#B5561C', roughness: 0.88, metallic: 0.0, tilingMeters: 0.35,
    description: 'Spanish-style terra cotta clay barrel tiles',
    tags: ['clay', 'mediterranean', 'warm'],
  },
  {
    id: 'roof-sedum', name: 'Sedum Green Roof', category: 'roofing',
    albedo: '#4A7A3A', roughness: 0.97, metallic: 0.0, tilingMeters: 0.5,
    description: 'Living sedum green roof system',
    tags: ['sustainable', 'green', 'living'],
  },

  // ─── Flooring (6) ─────────────────────────────────────────────────────────
  {
    id: 'floor-oak-light', name: 'White Oak Light', category: 'flooring',
    albedo: '#D4B896', roughness: 0.7, metallic: 0.0, tilingMeters: 0.15,
    description: 'Wide plank white oak hardwood, light natural finish',
    tags: ['wood', 'warm', 'natural'],
  },
  {
    id: 'floor-oak-dark', name: 'White Oak Dark', category: 'flooring',
    albedo: '#6B4C35', roughness: 0.65, metallic: 0.0, tilingMeters: 0.15,
    description: 'Wide plank white oak hardwood, dark walnut stain',
    tags: ['wood', 'dark', 'rich'],
  },
  {
    id: 'floor-concrete-pol', name: 'Polished Concrete', category: 'flooring',
    albedo: '#B0ADA8', roughness: 0.25, metallic: 0.05, tilingMeters: 1.0,
    description: 'Polished concrete with light grey aggregate',
    tags: ['concrete', 'modern', 'industrial'],
  },
  {
    id: 'floor-tile-marble', name: 'Carrara Marble', category: 'flooring',
    albedo: '#F0EDE8', roughness: 0.15, metallic: 0.0, tilingMeters: 0.6,
    description: 'Carrara white marble with grey veining, polished finish',
    tags: ['marble', 'luxury', 'white'],
  },
  {
    id: 'floor-tile-hex', name: 'Hex Cement Tile', category: 'flooring',
    albedo: '#E8E0D0', roughness: 0.82, metallic: 0.0, tilingMeters: 0.2,
    description: 'Encaustic cement hex tile, classic pattern',
    tags: ['tile', 'pattern', 'artisan'],
  },
  {
    id: 'floor-cork', name: 'Cork Natural', category: 'flooring',
    albedo: '#C8A87A', roughness: 0.9, metallic: 0.0, tilingMeters: 0.3,
    description: 'Natural cork floating floor, warm honey tone',
    tags: ['cork', 'sustainable', 'warm'],
  },

  // ─── Interior Wall (5) ────────────────────────────────────────────────────
  {
    id: 'wall-white-matte', name: 'Matte White', category: 'interior_wall',
    albedo: '#F5F4F0', roughness: 0.95, metallic: 0.0, tilingMeters: 2.0,
    description: 'Classic matte white interior paint',
    tags: ['white', 'clean', 'minimal'],
  },
  {
    id: 'wall-greige', name: 'Warm Greige', category: 'interior_wall',
    albedo: '#C8BDB0', roughness: 0.93, metallic: 0.0, tilingMeters: 2.0,
    description: 'Warm greige interior paint — versatile neutral',
    tags: ['neutral', 'warm', 'versatile'],
  },
  {
    id: 'wall-slate-blue', name: 'Slate Blue', category: 'interior_wall',
    albedo: '#6A7D8E', roughness: 0.92, metallic: 0.0, tilingMeters: 2.0,
    description: 'Muted slate blue, calming accent wall colour',
    tags: ['blue', 'calm', 'accent'],
  },
  {
    id: 'wall-lime-plaster', name: 'Lime Plaster', category: 'interior_wall',
    albedo: '#E8E0D4', roughness: 0.88, metallic: 0.0, tilingMeters: 1.0,
    description: 'Artisan lime plaster with subtle texture variation',
    tags: ['plaster', 'artisan', 'texture'],
  },
  {
    id: 'wall-shiplap', name: 'White Shiplap', category: 'interior_wall',
    albedo: '#F0EFEC', roughness: 0.82, metallic: 0.0, tilingMeters: 0.2,
    description: 'Painted white shiplap wood panelling',
    tags: ['wood', 'shiplap', 'farmhouse'],
  },

  // ─── Trim (4) ─────────────────────────────────────────────────────────────
  {
    id: 'trim-white-gloss', name: 'White Gloss Trim', category: 'trim',
    albedo: '#FAFAF8', roughness: 0.15, metallic: 0.0, tilingMeters: 0.1,
    description: 'High-gloss white paint for baseboards and casings',
    tags: ['white', 'gloss', 'classic'],
  },
  {
    id: 'trim-black-matte', name: 'Matte Black Trim', category: 'trim',
    albedo: '#1A1A1A', roughness: 0.85, metallic: 0.0, tilingMeters: 0.1,
    description: 'Matte black painted trim for bold contrast',
    tags: ['black', 'modern', 'bold'],
  },
  {
    id: 'trim-oak-natural', name: 'Oak Natural Trim', category: 'trim',
    albedo: '#C8A070', roughness: 0.7, metallic: 0.0, tilingMeters: 0.1,
    description: 'Clear-coated natural oak wood trim',
    tags: ['wood', 'natural', 'warm'],
  },
  {
    id: 'trim-dark-walnut', name: 'Dark Walnut Trim', category: 'trim',
    albedo: '#4A2F1A', roughness: 0.65, metallic: 0.0, tilingMeters: 0.1,
    description: 'Dark oiled walnut trim and millwork',
    tags: ['wood', 'dark', 'rich'],
  },

  // ─── Kitchen (8) ──────────────────────────────────────────────────────────
  {
    id: 'kit-cab-white-shaker', name: 'White Shaker Cabinet', category: 'kitchen',
    albedo: '#F2F0EC', roughness: 0.7, metallic: 0.0, tilingMeters: 0.6,
    description: 'Classic white shaker-style painted cabinet doors',
    tags: ['white', 'shaker', 'classic'],
  },
  {
    id: 'kit-cab-navy', name: 'Navy Blue Cabinet', category: 'kitchen',
    albedo: '#1E2D4A', roughness: 0.6, metallic: 0.0, tilingMeters: 0.6,
    description: 'Deep navy painted cabinet doors, satin finish',
    tags: ['navy', 'bold', 'modern'],
  },
  {
    id: 'kit-cab-oak-flat', name: 'Oak Flat Panel Cabinet', category: 'kitchen',
    albedo: '#C8A070', roughness: 0.72, metallic: 0.0, tilingMeters: 0.5,
    description: 'Flat panel white oak veneer cabinet doors',
    tags: ['oak', 'modern', 'natural'],
  },
  {
    id: 'kit-cab-black-matte', name: 'Matte Black Cabinet', category: 'kitchen',
    albedo: '#1C1C1C', roughness: 0.75, metallic: 0.0, tilingMeters: 0.6,
    description: 'Matte black painted cabinet doors',
    tags: ['black', 'dramatic', 'modern'],
  },
  {
    id: 'kit-counter-quartz-white', name: 'White Quartz Countertop', category: 'kitchen',
    albedo: '#F0EDE8', roughness: 0.12, metallic: 0.0, tilingMeters: 1.2,
    description: 'White engineered quartz with subtle veining, polished',
    tags: ['quartz', 'white', 'clean'],
  },
  {
    id: 'kit-counter-marble', name: 'Calacatta Marble Countertop', category: 'kitchen',
    albedo: '#F5F2EE', roughness: 0.1, metallic: 0.0, tilingMeters: 1.2,
    description: 'Calacatta gold marble slab countertop, polished finish',
    tags: ['marble', 'luxury', 'veined'],
  },
  {
    id: 'kit-counter-butcher', name: 'Butcher Block Countertop', category: 'kitchen',
    albedo: '#B8895A', roughness: 0.65, metallic: 0.0, tilingMeters: 0.4,
    description: 'End-grain maple butcher block countertop, oiled finish',
    tags: ['wood', 'warm', 'artisan'],
  },
  {
    id: 'kit-counter-concrete', name: 'Concrete Countertop', category: 'kitchen',
    albedo: '#A8A5A0', roughness: 0.35, metallic: 0.0, tilingMeters: 1.0,
    description: 'Cast-in-place concrete countertop, sealed and polished',
    tags: ['concrete', 'industrial', 'custom'],
  },

  // ─── Bathroom (7) ─────────────────────────────────────────────────────────
  {
    id: 'bath-tile-white-subway', name: 'White Subway Tile', category: 'bathroom',
    albedo: '#F5F4F0', roughness: 0.2, metallic: 0.0, tilingMeters: 0.075,
    description: 'Classic 3x6 white ceramic subway tile, white grout',
    tags: ['subway', 'classic', 'white'],
  },
  {
    id: 'bath-tile-zellige', name: 'Zellige Moroccan Tile', category: 'bathroom',
    albedo: '#4A7A7A', roughness: 0.35, metallic: 0.05, tilingMeters: 0.1,
    description: 'Hand-made Moroccan zellige tile in sea green, irregular glaze',
    tags: ['zellige', 'artisan', 'colourful'],
  },
  {
    id: 'bath-tile-terrazzo', name: 'Terrazzo Floor Tile', category: 'bathroom',
    albedo: '#D8D0C8', roughness: 0.18, metallic: 0.0, tilingMeters: 0.6,
    description: 'Pink and grey terrazzo large format floor tile',
    tags: ['terrazzo', 'pattern', 'retro'],
  },
  {
    id: 'bath-vanity-oak', name: 'Oak Vanity Cabinet', category: 'bathroom',
    albedo: '#C0956A', roughness: 0.7, metallic: 0.0, tilingMeters: 0.5,
    description: 'Natural oak grain vanity cabinet, matte lacquer',
    tags: ['oak', 'warm', 'natural'],
  },
  {
    id: 'bath-vanity-white', name: 'White Vanity Cabinet', category: 'bathroom',
    albedo: '#F2F0EC', roughness: 0.65, metallic: 0.0, tilingMeters: 0.5,
    description: 'Painted white vanity cabinet, satin finish',
    tags: ['white', 'clean', 'classic'],
  },
  {
    id: 'bath-fixture-chrome', name: 'Chrome Fixture', category: 'bathroom',
    albedo: '#C8CDD0', roughness: 0.05, metallic: 1.0, tilingMeters: 0.1,
    description: 'Polished chrome plumbing fixtures and hardware',
    tags: ['chrome', 'polished', 'classic'],
  },
  {
    id: 'bath-fixture-matte-black', name: 'Matte Black Fixture', category: 'bathroom',
    albedo: '#1A1A1A', roughness: 0.7, metallic: 0.9, tilingMeters: 0.1,
    description: 'Matte black plumbing fixtures and hardware',
    tags: ['black', 'modern', 'bold'],
  },
]

export function getMaterial(id: string): PBRMaterial | undefined {
  return MATERIALS.find(m => m.id === id)
}

export function getMaterialsByCategory(category: string): PBRMaterial[] {
  return MATERIALS.filter(m => m.category === category)
}

export function getMaterialsByTag(tag: string): PBRMaterial[] {
  return MATERIALS.filter(m => m.tags.includes(tag))
}

export const MATERIAL_CATEGORIES = [
  'exterior_siding', 'roofing', 'flooring',
  'interior_wall', 'trim', 'kitchen', 'bathroom',
] as const

export const CATEGORY_LABELS: Record<string, string> = {
  exterior_siding: 'Exterior Siding',
  roofing: 'Roofing',
  flooring: 'Flooring',
  interior_wall: 'Interior Wall',
  trim: 'Trim & Millwork',
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
}
