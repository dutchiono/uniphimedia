export interface Vec2 { x: number; y: number }
export interface Vec3 { x: number; y: number; z: number }
export interface BBox2D { x: number; y: number; w: number; h: number }

export type ConnectorFace = 'north' | 'south' | 'east' | 'west' | 'floor' | 'ceiling'
export type ConnectorKind = 'door' | 'opening' | 'window' | 'stair' | 'hvac_duct' | 'plumbing_stack' | 'electrical_panel'

export interface Connector {
  id: string
  face: ConnectorFace
  kind: ConnectorKind
  offsetFraction: number
  widthMeters: number
  heightMeters: number
  required: boolean
  generated?: boolean
  linkedRoomId?: string
}

export type PartitionKind = 'straight' | 'radial' | 'ring'
export type PartitionOrientation = 'vertical' | 'horizontal'

export interface InteriorPartition {
  id: string
  roomId: string
  level: number
  kind: PartitionKind
  orientation?: PartitionOrientation
  offsetMeters?: number
  angleDeg?: number
  startMeters?: number
  endMeters?: number
  radiusMeters?: number
  sweepDeg?: number
  thicknessMeters: number
  heightMeters: number
  doorWidthMeters: number | null
}

export type SystemNodeKind =
  | 'hvac_supply' | 'hvac_return' | 'hvac_handler'
  | 'plumbing_supply' | 'plumbing_drain' | 'plumbing_vent'
  | 'electrical_outlet' | 'electrical_switch' | 'electrical_panel'
  | 'gas_line'

export interface SystemNode {
  id: string
  kind: SystemNodeKind
  positionLocal: Vec3
  load?: number
}

export type RoomType =
  | 'bedroom' | 'master_bedroom'
  | 'bathroom' | 'master_bathroom'
  | 'kitchen' | 'living_room' | 'dining_room'
  | 'hallway' | 'stairwell'
  | 'garage' | 'laundry' | 'office' | 'closet'
  | 'geodesic_dome' | 'geodesic_dome_studio' | 'geodesic_dome_great'

export type RoomFootprint = 'rect' | 'circle'
export type RoomShellKind = 'rectilinear' | 'dome'

export interface RoomModule {
  type: RoomType
  label: string
  defaultDims: Vec3
  minDims: Vec3
  maxDims: Vec3
  gridW: number
  gridH: number
  connectors: Connector[]
  systemNodes: SystemNode[]
  footprint?: RoomFootprint
  shellKind?: RoomShellKind
  color: string
  icon: string
}

export type Rotation = 0 | 90 | 180 | 270

export type MaterialCategory =
  | 'exterior_siding' | 'roofing' | 'flooring'
  | 'interior_wall' | 'trim' | 'kitchen' | 'bathroom'

export type MaterialSlotKey =
  | 'floor' | 'ceiling' | 'wall_n' | 'wall_s' | 'wall_e' | 'wall_w'
  | 'exterior' | 'roof' | 'trim' | 'cabinet' | 'countertop' | 'fixture'

export interface PlacedRoom {
  id: string
  moduleType: RoomType
  gridX: number
  gridY: number
  gridW: number
  gridH: number
  level: number
  rotation: Rotation
  dims: Vec3
  connectors: Connector[]
  materialSlots: Record<MaterialSlotKey, string | null>
  customLabel?: string
  locked: boolean
}

export interface RoomConnection {
  id: string
  roomAId: string
  connectorAId: string
  roomBId: string
  connectorBId: string
  validated: boolean
  issues: ValidationIssue[]
}

export interface PBRMaterial {
  id: string
  name: string
  category: MaterialCategory
  albedo: string
  roughness: number
  metallic: number
  normalMapUrl?: string
  albedoMapUrl?: string
  roughnessMapUrl?: string
  aoMapUrl?: string
  tilingMeters: number
  description: string
  tags: string[]
}

export interface DesignLevel {
  index: number
  label: string
  floorHeightMeters: number
  visible: boolean
}

export interface Design {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  levels: DesignLevel[]
  rooms: PlacedRoom[]
  partitions: InteriorPartition[]
  connections: RoomConnection[]
  globalMaterials: Record<MaterialSlotKey, string | null>
  metadata: {
    totalSqFt: number
    totalSqM: number
    roomCount: number
    levelCount: number
  }
}

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
  snapDelta: Vec2
  score: number
}

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
