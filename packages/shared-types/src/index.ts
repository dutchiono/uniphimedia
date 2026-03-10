// ─── Vector & Geometry Primitives ────────────────────────────────────────────

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface BoundingBox2D {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BoundingBox3D {
  min: Vec3;
  max: Vec3;
}

// ─── Snap Connectors ─────────────────────────────────────────────────────────

export type ConnectorFace = 'north' | 'south' | 'east' | 'west' | 'floor' | 'ceiling';

export type ConnectorType = 'wall' | 'corner' | 'stair' | 'open' | 'door' | 'window';

export interface SnapConnector {
  id: string;
  face: ConnectorFace;
  /** Position along the face, normalized 0..1 (0 = left/bottom, 1 = right/top) */
  position: number;
  type: ConnectorType;
  openingWidth?: number;
  openingHeight?: number;
  systems: SystemsChannel[];
  required: boolean;
}

// ─── Systems Channels ────────────────────────────────────────────────────────

export type SystemsChannel =
  | 'hvac-supply'
  | 'hvac-return'
  | 'plumbing-supply'
  | 'plumbing-drain'
  | 'plumbing-vent'
  | 'electrical-120v'
  | 'electrical-240v'
  | 'electrical-low-voltage'
  | 'structural';

export type SystemsNodeType =
  | 'hvac-unit'
  | 'hvac-duct'
  | 'hvac-register'
  | 'hvac-return-grille'
  | 'water-heater'
  | 'plumbing-stack'
  | 'plumbing-fixture'
  | 'electrical-panel'
  | 'electrical-outlet'
  | 'electrical-switch'
  | 'electrical-fixture'
  | 'structural-beam'
  | 'structural-column';

export interface SystemsNode {
  id: string;
  type: SystemsNodeType;
  localPosition: Vec3;
  channels: SystemsChannel[];
  label: string;
  watts?: number;
  cfm?: number;
  gpm?: number;
}

// ─── Room Module ─────────────────────────────────────────────────────────────

export type RoomCategory =
  | 'bedroom'
  | 'bathroom'
  | 'kitchen'
  | 'living'
  | 'dining'
  | 'hallway'
  | 'stairwell'
  | 'garage'
  | 'utility'
  | 'office'
  | 'closet'
  | 'outdoor';

export type RoomVariant = string;

export interface RoomDimensions {
  width: number;
  depth: number;
  height: number;
}

export interface RoomModule {
  id: string;
  name: string;
  category: RoomCategory;
  variant: RoomVariant;
  dimensions: RoomDimensions;
  gridSize: Vec2;
  connectors: SnapConnector[];
  systemsNodes: SystemsNode[];
  defaultInteriorSkin?: string;
  planColor: string;
  icon: string;
  minCount: number;
  repeatable: boolean;
  notes: string;
}

// ─── Placed Room ─────────────────────────────────────────────────────────────

export interface PlacedRoom {
  instanceId: string;
  moduleId: string;
  gridPosition: Vec2;
  level: number;
  rotation: 0 | 1 | 2 | 3;
  connections: RoomConnection[];
  materialOverrides: Record<string, string>;
  customLabel?: string;
}

export interface RoomConnection {
  fromConnectorId: string;
  toInstanceId: string;
  toConnectorId: string;
  valid: boolean;
  warnings: string[];
}

// ─── Level ───────────────────────────────────────────────────────────────────

export interface Level {
  index: number;
  label: string;
  floorHeight: number;
  elevation: number;
}

// ─── Materials & Finishes ────────────────────────────────────────────────────

export type FinishZone =
  | 'exterior-wall'
  | 'exterior-roof'
  | 'exterior-trim'
  | 'interior-wall'
  | 'interior-ceiling'
  | 'interior-floor'
  | 'interior-trim'
  | 'cabinetry'
  | 'countertop'
  | 'fixture'
  | 'hardware';

export type FinishCategory =
  | 'siding'
  | 'roofing'
  | 'masonry'
  | 'wood'
  | 'metal'
  | 'paint'
  | 'tile'
  | 'stone'
  | 'carpet'
  | 'hardwood'
  | 'lvp'
  | 'wallpaper'
  | 'glass'
  | 'fabric'
  | 'concrete';

export interface PBRProperties {
  albedo: string;
  metallic: number;
  roughness: number;
  normalMap?: string;
  aoMap?: string;
  tileScale: number;
  emissive?: string;
  opacity: number;
}

export interface FinishCatalogItem {
  id: string;
  name: string;
  brand?: string;
  sku?: string;
  category: FinishCategory;
  zones: FinishZone[];
  pbr: PBRProperties;
  costPerSqm?: number;
  sustainable: boolean;
  tags: string[];
}

export type TrimProfile =
  | 'flat'
  | 'ogee'
  | 'cove'
  | 'craftsman'
  | 'colonial'
  | 'modern-reveal'
  | 'shaker'
  | 'victorian'
  | 'farmhouse';

export interface TrimSet {
  id: string;
  name: string;
  profile: TrimProfile;
  baseboard: { height: number; finishId: string };
  crownMoulding?: { height: number; finishId: string };
  doorCasing: { width: number; finishId: string };
  windowCasing: { width: number; finishId: string };
}

export type CabinetStyle =
  | 'shaker'
  | 'flat-panel'
  | 'raised-panel'
  | 'inset'
  | 'open-shelf'
  | 'glass-front'
  | 'louvered';

export type HardwareFinish =
  | 'brushed-nickel'
  | 'matte-black'
  | 'polished-chrome'
  | 'satin-brass'
  | 'oil-rubbed-bronze'
  | 'antique-brass'
  | 'stainless';

export interface CabinetrySet {
  id: string;
  name: string;
  style: CabinetStyle;
  doorFinishId: string;
  carcaseFinishId: string;
  hardware: HardwareFinish;
  handleLength: number;
}

export interface MaterialSkin {
  id: string;
  name: string;
  description: string;
  targetRooms: RoomCategory[];
  finishes: Record<FinishZone, string>;
  trim: string;
  cabinetry?: string;
}

// ─── Design Document ─────────────────────────────────────────────────────────

export interface DesignDocument {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  levels: Level[];
  placedRooms: PlacedRoom[];
  activeSkinId: string;
  siteWidth: number;
  siteDepth: number;
  northRotation: number;
}

// ─── Systems Validation ──────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  id: string;
  severity: ValidationSeverity;
  channel: SystemsChannel;
  affectedRooms: string[];
  message: string;
  suggestion?: string;
}

export interface SystemsValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  totalElectricalWatts: number;
  totalHvacCfm: number;
  totalPlumbingFixtures: number;
}

// ─── IFC Export ──────────────────────────────────────────────────────────────

export interface IFCExportOptions {
  includeGeometry: boolean;
  includeSystems: boolean;
  includeMaterials: boolean;
  schema: 'IFC2X3' | 'IFC4' | 'IFC4X3';
  siteName: string;
  projectName: string;
  authorName: string;
  organizationName: string;
}