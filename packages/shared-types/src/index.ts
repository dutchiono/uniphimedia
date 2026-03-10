/**
 * @uniphimedia/shared-types
 *
 * Shared TypeScript types used across all apps and packages.
 */

// Connector types for room modules
export type ConnectorType = 'wall' | 'floor' | 'ceiling'
export type WallSide = 'north' | 'south' | 'east' | 'west'

export interface Connector {
  id: string
  type: ConnectorType
  side?: WallSide // only for wall connectors
  systemNodes: SystemNode[]
}

// System node types (HVAC, plumbing, electrical)
export type SystemType = 'hvac' | 'plumbing' | 'electrical'

export interface SystemNode {
  id: string
  systemType: SystemType
  connectorId: string
  metadata: Record<string, unknown>
}

// Room module definition
export interface RoomModule {
  id: string
  name: string
  category: string
  dimensions: {
    width: number  // feet
    depth: number  // feet
    height: number // feet
  }
  connectors: Connector[]
  defaultSystems: SystemNode[]
}

// Material library types
export interface MaterialSkin {
  id: string
  name: string
  category: 'exterior' | 'interior' | 'flooring' | 'roofing' | 'trim' | 'kitchen' | 'bath'
  subcategory?: string
  textures: {
    albedo?: string
    normal?: string
    roughness?: string
    metallic?: string
  }
  properties: {
    color?: string
    roughness?: number
    metallic?: number
  }
}

// Design state (used by housing-designer app)
export interface PlacedRoom {
  id: string
  moduleId: string
  level: number
  x: number
  z: number
  rotation: 0 | 90 | 180 | 270
}

export interface DesignProject {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  rooms: PlacedRoom[]
  appliedMaterials: Record<string, string> // roomId -> materialId
}