import type { FinishCatalogItem } from '@uniphimedia/shared-types'

export const FINISH_CATALOG: FinishCatalogItem[] = [
  // ── Exterior Siding ──────────────────────────────────────────────────────
  { id: 'ext-wood-cedar',    label: 'Cedar Lap Siding',      category: 'exterior-siding', roughness: 0.85, metallic: 0, swatchColor: '#8B6F47', tags: ['wood', 'natural', 'traditional'] },
  { id: 'ext-brick',         label: 'Brick',                  category: 'exterior-siding', roughness: 0.9,  metallic: 0, swatchColor: '#8B3A2A', tags: ['brick', 'traditional', 'masonry'] },
  { id: 'ext-stucco',        label: 'Stucco (White)',         category: 'exterior-siding', roughness: 0.95, metallic: 0, swatchColor: '#F2EFE8', tags: ['stucco', 'mediterranean', 'smooth'] },
  { id: 'ext-hempcrete',     label: 'Hempcrete Panel',        category: 'exterior-siding', roughness: 0.9,  metallic: 0, swatchColor: '#C8B89A', tags: ['hemp', 'sustainable', 'natural'] },
  { id: 'ext-metal-panel',   label: 'Standing Seam Metal',   category: 'exterior-siding', roughness: 0.3,  metallic: 0.9, swatchColor: '#6B7280', tags: ['metal', 'modern', 'contemporary'] },
  { id: 'ext-hardie',        label: 'Fiber Cement (HardiePlank)', category: 'exterior-siding', roughness: 0.8, metallic: 0, swatchColor: '#D1C9BE', tags: ['fiber-cement', 'low-maintenance'] },
  { id: 'ext-vinyl',         label: 'Vinyl Siding',           category: 'exterior-siding', roughness: 0.7,  metallic: 0, swatchColor: '#E8E4DC', tags: ['vinyl', 'low-cost', 'low-maintenance'] },

  // ── Roofing ────────────────────────────────────────────────────────────────
  { id: 'roof-asphalt-arch', label: 'Asphalt Shingle (Architectural)', category: 'exterior-roofing', roughness: 0.95, metallic: 0, swatchColor: '#4A4A4A', tags: ['asphalt', 'traditional'] },
  { id: 'roof-metal-standing',label: 'Standing Seam Metal Roof', category: 'exterior-roofing', roughness: 0.25, metallic: 0.95, swatchColor: '#374151', tags: ['metal', 'modern', 'durable'] },
  { id: 'roof-slate',        label: 'Natural Slate',           category: 'exterior-roofing', roughness: 0.85, metallic: 0, swatchColor: '#6B7280', tags: ['slate', 'premium', 'natural'] },
  { id: 'roof-cedar-shake',  label: 'Cedar Shake',             category: 'exterior-roofing', roughness: 0.9,  metallic: 0, swatchColor: '#92673A', tags: ['wood', 'cedar', 'natural'] },
  { id: 'roof-green',        label: 'Green / Living Roof',     category: 'exterior-roofing', roughness: 1.0,  metallic: 0, swatchColor: '#4D7C3F', tags: ['living-roof', 'sustainable'] },

  // ── Flooring ───────────────────────────────────────────────────────────────
  { id: 'floor-oak-hw',      label: 'White Oak Hardwood',     category: 'flooring', roughness: 0.5, metallic: 0, swatchColor: '#C8A87A', tags: ['hardwood', 'oak', 'natural'] },
  { id: 'floor-walnut-hw',   label: 'Walnut Hardwood',        category: 'flooring', roughness: 0.5, metallic: 0, swatchColor: '#5C3D1E', tags: ['hardwood', 'walnut', 'dark'] },
  { id: 'floor-lvp-grey',    label: 'LVP — Cool Grey',        category: 'flooring', roughness: 0.6, metallic: 0, swatchColor: '#9CA3AF', tags: ['lvp', 'waterproof', 'modern'] },
  { id: 'floor-tile-marble', label: 'Marble Tile',            category: 'flooring', roughness: 0.2, metallic: 0, swatchColor: '#F5F0EB', tags: ['tile', 'marble', 'luxury'] },
  { id: 'floor-tile-hex',    label: 'Hexagon Tile (White)',   category: 'flooring', roughness: 0.6, metallic: 0, swatchColor: '#FAFAFA', tags: ['tile', 'hex', 'bathroom'] },
  { id: 'floor-concrete',    label: 'Polished Concrete',      category: 'flooring', roughness: 0.3, metallic: 0.1, swatchColor: '#9CA3AF', tags: ['concrete', 'modern', 'industrial'] },
  { id: 'floor-carpet-neutral', label: 'Carpet — Warm Neutral', category: 'flooring', roughness: 1.0, metallic: 0, swatchColor: '#D4C5B0', tags: ['carpet', 'soft', 'bedroom'] },

  // ── Wall Paint ─────────────────────────────────────────────────────────────
  { id: 'paint-white',       label: 'Bright White',           category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#FFFFFF', tags: ['white', 'neutral', 'classic'] },
  { id: 'paint-warm-white',  label: 'Warm White',             category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#FAF6F0', tags: ['white', 'warm', 'neutral'] },
  { id: 'paint-greige',      label: 'Greige',                 category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#C9B99A', tags: ['neutral', 'greige', 'popular'] },
  { id: 'paint-sage',        label: 'Sage Green',             category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#7D9B76', tags: ['green', 'nature', 'calm'] },
  { id: 'paint-navy',        label: 'Navy Blue',              category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#1E3A5F', tags: ['blue', 'bold', 'accent'] },
  { id: 'paint-charcoal',    label: 'Charcoal',               category: 'wall-paint', roughness: 0.9, metallic: 0, swatchColor: '#374151', tags: ['dark', 'bold', 'modern'] },

  // ── Trim & Moulding ────────────────────────────────────────────────────────
  { id: 'trim-baseboard-flat',    label: 'Flat Baseboard (3.5")',     category: 'baseboard', roughness: 0.85, metallic: 0, swatchColor: '#FFFFFF', tags: ['modern', 'simple', 'flat'] },
  { id: 'trim-baseboard-colonial', label: 'Colonial Baseboard (5.5")', category: 'baseboard', roughness: 0.85, metallic: 0, swatchColor: '#FFFFFF', tags: ['traditional', 'colonial', 'classic'] },
  { id: 'trim-crown-simple',      label: 'Crown Moulding (Simple)',   category: 'crown-moulding', roughness: 0.85, metallic: 0, swatchColor: '#FFFFFF', tags: ['simple', 'modern'] },
  { id: 'trim-crown-dentil',      label: 'Crown Moulding (Dentil)',   category: 'crown-moulding', roughness: 0.85, metallic: 0, swatchColor: '#FFFFFF', tags: ['traditional', 'dentil', 'ornate'] },

  // ── Kitchen ──────────────────────────────────────────────────────────────
  { id: 'kit-cab-shaker-white',  label: 'Shaker Cabinet — White',   category: 'kitchen-cabinet', roughness: 0.8, metallic: 0, swatchColor: '#F9F9F9', tags: ['shaker', 'white', 'popular'] },
  { id: 'kit-cab-shaker-navy',   label: 'Shaker Cabinet — Navy',    category: 'kitchen-cabinet', roughness: 0.8, metallic: 0, swatchColor: '#1E3A5F', tags: ['shaker', 'navy', 'two-tone'] },
  { id: 'kit-cab-slab-walnut',   label: 'Slab Cabinet — Walnut',    category: 'kitchen-cabinet', roughness: 0.5, metallic: 0, swatchColor: '#5C3D1E', tags: ['slab', 'walnut', 'modern'] },
  { id: 'kit-counter-quartz',    label: 'Quartz Countertop (White)', category: 'kitchen-countertop', roughness: 0.2, metallic: 0, swatchColor: '#F2F0EE', tags: ['quartz', 'white', 'popular'] },
  { id: 'kit-counter-butcher',   label: 'Butcher Block',            category: 'kitchen-countertop', roughness: 0.6, metallic: 0, swatchColor: '#A0734A', tags: ['wood', 'butcher-block', 'warm'] },
  { id: 'kit-counter-marble',    label: 'Marble Slab',              category: 'kitchen-countertop', roughness: 0.15, metallic: 0, swatchColor: '#EDE9E4', tags: ['marble', 'luxury'] },

  // ── Bathroom ─────────────────────────────────────────────────────────────
  { id: 'bath-tile-subway',      label: 'Subway Tile (3x6 White)',  category: 'bath-tile', roughness: 0.15, metallic: 0, swatchColor: '#F8F8F8', tags: ['subway', 'classic', 'white'] },
  { id: 'bath-tile-zellige',     label: 'Zellige Tile',             category: 'bath-tile', roughness: 0.4,  metallic: 0.1, swatchColor: '#6BA3A3', tags: ['zellige', 'artisan', 'texture'] },
  { id: 'bath-tile-large-format',label: 'Large Format Tile (24x24)', category: 'bath-tile', roughness: 0.2, metallic: 0, swatchColor: '#D1C9BE', tags: ['modern', 'large-format', 'minimal'] },
  { id: 'bath-vanity-floating',  label: 'Floating Vanity — White',  category: 'bath-vanity', roughness: 0.7, metallic: 0, swatchColor: '#F5F5F5', tags: ['modern', 'floating', 'white'] },
  { id: 'bath-vanity-wood',      label: 'Wood Vanity — Natural Oak', category: 'bath-vanity', roughness: 0.55, metallic: 0, swatchColor: '#C8A87A', tags: ['wood', 'warm', 'natural'] },
  { id: 'bath-fixture-chrome',   label: 'Fixtures — Polished Chrome', category: 'bath-fixture', roughness: 0.05, metallic: 1.0, swatchColor: '#D1D5DB', tags: ['chrome', 'classic'] },
  { id: 'bath-fixture-matte-black', label: 'Fixtures — Matte Black', category: 'bath-fixture', roughness: 0.9, metallic: 0.8, swatchColor: '#1F2937', tags: ['matte-black', 'modern'] },
  { id: 'bath-fixture-brass',    label: 'Fixtures — Brushed Brass', category: 'bath-fixture', roughness: 0.4, metallic: 0.9, swatchColor: '#B7A26E', tags: ['brass', 'warm', 'luxury'] },
]

export function getFinishItem(id: string): FinishCatalogItem | undefined {
  return FINISH_CATALOG.find(f => f.id === id)
}

export function getFinishByCategory(category: FinishCatalogItem['category']): FinishCatalogItem[] {
  return FINISH_CATALOG.filter(f => f.category === category)
}