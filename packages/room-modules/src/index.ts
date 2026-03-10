/**
 * @uniphimedia/room-modules
 *
 * Registry of pre-built room modules with connectors and default systems.
 * Each module is a tile that can be dragged into the floor plan editor.
 */

import type { RoomModule, Connector, SystemNode } from '@uniphimedia/shared-types'

/**
 * Helper to create wall connectors with default system nodes.
 */
function createWallConnector(id: string, side: 'north' | 'south' | 'east' | 'west'): Connector {
  return {
    id,
    type: 'wall',
    side,
    systemNodes: [
      { id: `${id}-hvac`, systemType: 'hvac', connectorId: id, metadata: {} },
      { id: `${id}-elec`, systemType: 'electrical', connectorId: id, metadata: {} },
    ],
  }
}

function createFloorConnector(id: string): Connector {
  return {
    id,
    type: 'floor',
    systemNodes: [
      { id: `${id}-plumb`, systemType: 'plumbing', connectorId: id, metadata: {} },
    ],
  }
}

function createCeilingConnector(id: string): Connector {
  return {
    id,
    type: 'ceiling',
    systemNodes: [
      { id: `${id}-hvac`, systemType: 'hvac', connectorId: id, metadata: {} },
      { id: `${id}-elec`, systemType: 'electrical', connectorId: id, metadata: {} },
    ],
  }
}

/**
 * Standard room module catalog.
 */
export const ROOM_MODULES: Record<string, RoomModule> = {
  bedroom: {
    id: 'bedroom',
    name: 'Bedroom',
    category: 'bedroom',
    dimensions: { width: 12, depth: 10, height: 8 },
    connectors: [
      createWallConnector('bedroom-n', 'north'),
      createWallConnector('bedroom-s', 'south'),
      createWallConnector('bedroom-e', 'east'),
      createWallConnector('bedroom-w', 'west'),
      createFloorConnector('bedroom-floor'),
      createCeilingConnector('bedroom-ceil'),
    ],
    defaultSystems: [],
  },
  masterBedroom: {
    id: 'masterBedroom',
    name: 'Master Bedroom',
    category: 'bedroom',
    dimensions: { width: 16, depth: 14, height: 9 },
    connectors: [
      createWallConnector('master-n', 'north'),
      createWallConnector('master-s', 'south'),
      createWallConnector('master-e', 'east'),
      createWallConnector('master-w', 'west'),
      createFloorConnector('master-floor'),
      createCeilingConnector('master-ceil'),
    ],
    defaultSystems: [],
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom',
    category: 'bathroom',
    dimensions: { width: 8, depth: 6, height: 8 },
    connectors: [
      createWallConnector('bath-n', 'north'),
      createWallConnector('bath-s', 'south'),
      createWallConnector('bath-e', 'east'),
      createWallConnector('bath-w', 'west'),
      createFloorConnector('bath-floor'),
      createCeilingConnector('bath-ceil'),
    ],
    defaultSystems: [],
  },
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen',
    category: 'kitchen',
    dimensions: { width: 14, depth: 12, height: 8 },
    connectors: [
      createWallConnector('kitchen-n', 'north'),
      createWallConnector('kitchen-s', 'south'),
      createWallConnector('kitchen-e', 'east'),
      createWallConnector('kitchen-w', 'west'),
      createFloorConnector('kitchen-floor'),
      createCeilingConnector('kitchen-ceil'),
    ],
    defaultSystems: [],
  },
  livingRoom: {
    id: 'livingRoom',
    name: 'Living Room',
    category: 'living',
    dimensions: { width: 18, depth: 16, height: 9 },
    connectors: [
      createWallConnector('living-n', 'north'),
      createWallConnector('living-s', 'south'),
      createWallConnector('living-e', 'east'),
      createWallConnector('living-w', 'west'),
      createFloorConnector('living-floor'),
      createCeilingConnector('living-ceil'),
    ],
    defaultSystems: [],
  },
  hallway: {
    id: 'hallway',
    name: 'Hallway',
    category: 'circulation',
    dimensions: { width: 4, depth: 10, height: 8 },
    connectors: [
      createWallConnector('hall-n', 'north'),
      createWallConnector('hall-s', 'south'),
      createWallConnector('hall-e', 'east'),
      createWallConnector('hall-w', 'west'),
      createFloorConnector('hall-floor'),
      createCeilingConnector('hall-ceil'),
    ],
    defaultSystems: [],
  },
}

export function getRoomModule(id: string): RoomModule | undefined {
  return ROOM_MODULES[id]
}

export function getAllRoomModules(): RoomModule[] {
  return Object.values(ROOM_MODULES)
}