// ─── Room Module ─────────────────────────────────────────────────────────────

export type ConnectorSide = 'north' | 'south' | 'east' | 'west' | 'floor' | 'ceiling'
export type ConnectorType = 'wall' | 'corner' | 'stair' | 'exterior'

export interface SnapConnector {
  id: string
  side: ConnectorSide
  /** Offset along the wall face, 0–1 normalized */
  offset: number
  type: ConnectorType
  /** Whether this connector can accept another room snapping onto it */
  open: boolean
}

export interface RoomModule {
  id: string
  label: string
  /** Dimensions in meters */
  width: number
  depth: number
  height: number
  /** All snap connection points on this room */
  connectors: SnapConnector[]
  /** Default systems node positions (normalized 0–1 within room volume) */
  systemsNodes: SystemsNode[]
  /** Tags for filtering: e.g. ['wet', 'bedroom', 'circulation'] */
  tags: string[]
}

// ─── Systems ─────────────────────────────────────────────────────────────────

export type SystemType = 'hvac-supply' | 'hvac-return' | 'hvac-exhaust'
  | 'plumbing-supply' | 'plumbing-drain' | 'plumbing-vent'
  | 'electrical-circuit' | 'electrical-panel' | 'electrical-lowvoltage'

export interface SystemsNode {
  id: string
  type: SystemType
  /** Normalized position within room 0–1 on x/y/z */
  x: number
  y: number
  z: number
  /** Which connector wall this node exits through */
  exitSide: ConnectorSide
}

export interface SystemsEdge {
  fromNodeId: string
  toNodeId: string
  resolved: boolean
  notes?: string
}

// ─── Materials / Skins ───────────────────────────────────────────────────────

export type FinishCategory =
  | 'exterior-siding' | 'exterior-roofing' | 'exterior-trim'
  | 'window' | 'door-exterior' | 'door-interior'
  | 'flooring' | 'wall-paint' | 'wall-tile' | 'wall-paper' | 'ceiling'
  | 'baseboard' | 'crown-moulding' | 'door-casing' | 'window-casing'
  | 'kitchen-cabinet' | 'kitchen-countertop' | 'kitchen-backsplash' | 'kitchen-hardware'
  | 'bath-vanity' | 'bath-tile' | 'bath-fixture' | 'bath-hardware'
  | 'lighting-fixture' | 'hvac-register' | 'stair-railing'

export interface FinishCatalogItem {
  id: string
  label: string
  category: FinishCategory
  /** PBR texture set paths (relative to public/textures/) */
  albedo?: string
  normal?: string
  roughness?: number
  metallic?: number
  /** Hex swatch for UI */
  swatchColor?: string
  tags: string[]
}

export interface MaterialSkin {
  id: string
  label: string
  /** Map from category to chosen finish item id */
  selections: Partial<Record<FinishCategory, string>>
}

// ─── Level ───────────────────────────────────────────────────────────────────

export interface Level {
  index: number
  label: string
  /** Floor-to-ceiling height override in meters (default 2.74 = 9ft) */
  heightOverride?: number
}