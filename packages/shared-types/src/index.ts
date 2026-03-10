// ─── Primitives ───────────────────────────────────────────────────────────────

export interface Vec2 { x: number; y: number }
export interface Vec3 { x: number; y: number; z: number }
export interface BBox2D { x: number; y: number; w: number; h: number }

// ─── Connector ────────────────────────────────────────────────────────────────

export type ConnectorFace = 'north' | 'south' | 'east' | 'west' | 'floor' | 'ceiling'
export type ConnectorKind = 'door' | 'opening' | 'window' | 'stair' | 'hvac_duct' | 'plumbing_stack' | 'electrical_panel'

export interface Connector {
  id: string
  face: ConnectorFace
  kind: ConnectorKind
  offsetFraction: number   // 0..1 along the face edge
  widthMeters: number
  heightMeters: number
  required: boolean        // must be connected for a valid design
}

// ─── Systems Nodes ────────────────────────────────────────────────────────────

export type SystemNodeKind =
  | 'hvac_supply' | 'hvac_return' | 'hvac_handler'
  | 'plumbing_supply' | 'plumbing_drain' | 'plumbing_vent'
  | 'electrical_outlet' | 'electrical_switch' | 'electrical_panel'
  | 'gas_line'

export interface SystemNode {
  id: string
  kind: SystemNodeKind
  positionLocal: Vec3   // meters from room origin (0,0,0 = bottom-left-floor corner)
  load?: number         // amps for electrical, BTU for HVAC, GPM for plumbing
}

// ─── Room Module ──────────────────────────────────────────────────────────────

export type RoomType =
  | 'bedroom' | 'master_bedroom'
  | 'bathroom' | 'master_bathroom'
  | 'kitchen' | 'living_room' | 'dining_room'
  | 'hallway' | 'stairwell'
  | 'garage' | 'laundry' | 'office' | 'closet'

export interface RoomModule {
  type: RoomType
  label: string
  defaultDims: Vec3         // meters: width(x), depth(y), height(z)
  minDims: Vec3
  maxDims: Vec3
  gridW: number             // default grid columns (1 unit = 0.5m)
  gridH: number             // default grid rows
  connectors: Connector[]
  systemNodes: SystemNode[]
  color: string             // hex for floor plan tile
  icon: string              // emoji or icon key
}

// ─── Placed Room ──────────────────────────────────────────────────────────────

export type Rotation = 0 | 90 | 180 | 270

export interface PlacedRoom {
  id: string
  moduleType: RoomType
  gridX: number
  gridY: number
  gridW: number
  gridH: number
  level: number             // 0 = ground floor, 1 = first floor, etc.
  rotation: Rotation
  dims: Vec3                // actual meters (may be resized from default)
  materialSlots: Record<MaterialSlotKey, string | null>   // slotKey -> materialId
  customLabel?: string
  locked: boolean
}

// ─── Connection ───────────────────────────────────────────────────────────────

export interface RoomConnection {
  id: string
  roomAId: string
  connectorAId: string
  roomBId: string
  connectorBId: string
  validated: boolean
  issues: ValidationIssue[]
}

// ─── Materials ────────────────────────────────────────────────────────────────

export type MaterialCategory =
  | 'exterior_siding' | 'roofing' | 'flooring'
  | 'interior_wall' | 'trim' | 'kitchen' | 'bathroom'

export type MaterialSlotKey =
  | 'floor' | 'ceiling' | 'wall_n' | 'wall_s' | 'wall_e' | 'wall_w'
  | 'exterior' | 'roof' | 'trim' | 'cabinet' | 'countertop' | 'fixture'

export interface PBRMaterial {
  id: string
  name: string
  category: MaterialCategory
  albedo: string            // hex color
  roughness: number         // 0..1
  metallic: number          // 0..1
  normalMapUrl?: string
  albedoMapUrl?: string
  roughnessMapUrl?: string
  aoMapUrl?: string
  tilingMeters: number      // texture repeat per N meters
  description: string
  tags: string[]
}

// ─── Design ───────────────────────────────────────────────────────────────────

export interface DesignLevel {
  index: number
  label: string
  floorHeightMeters: number
  visible: boolean
}

export interface Design {
  id: string
  name: string
  createdAt: string         // ISO8601
  updatedAt: string
  levels: DesignLevel[]
  rooms: PlacedRoom[]
  connections: RoomConnection[]
  globalMaterials: Record<MaterialSlotKey, string | null>
  metadata: {
    totalSqFt: number
    totalSqM: number
    roomCount: number
    levelCount: number
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning' | 'info'
export type ValidationCode =
  | 'OVERLAP' | 'FLOATING_ROOM' | 'MISSING_EGRESS'
  | 'HVAC_DISCONTINUITY' | 'PLUMBING_NO_VENT' | 'ELECTRICAL_OVERLOAD'
  | 'ROOM_TOO_SMALL' | 'CONNECTOR_MISMATCH' | 'LEVEL_GAP'

export interface ValidationIssue {
  code: ValidationCode
  severity: ValidationSeverity
  message: string
  affectedRoomIds: string[]
  affectedConnectorIds: string[]
}

export interface ValidationResult {
  valid: boolean
  issues: ValidationIssue[]
  checkedAt: string
}

// ─── Snap ─────────────────────────────────────────────────────────────────────

export interface SnapCandidate {
  roomId: string
  connectorId: string
  worldPos: Vec2
  face: ConnectorFace
  kind: ConnectorKind
}

export interface SnapResult {
  matched: boolean
  candidateA: SnapCandidate
  candidateB: SnapCandidate
  snapDelta: Vec2           // how far to move the dragged room to align
  score: number             // lower = better fit
}

// ─── Sync / Store State ───────────────────────────────────────────────────────

export type SyncStatus = 'idle' | 'pending' | 'syncing' | 'error'

export interface SyncState {
  status: SyncStatus
  lastSyncedAt: string | null
  pendingOps: number
  error: string | null
}

export interface UndoSnapshot {
  rooms: PlacedRoom[]
  connections: RoomConnection[]
  timestamp: number
}