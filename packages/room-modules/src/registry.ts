import type { RoomModule } from '@uniphimedia/shared-types'

export const ROOM_REGISTRY: Record<string, RoomModule> = {
  'bedroom-standard': {
    id: 'bedroom-standard',
    label: 'Bedroom (Standard)',
    width: 3.66, depth: 4.27, height: 2.74,
    tags: ['bedroom', 'sleeping'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
      { id: 'fl', side: 'floor',   offset: 0.5, type: 'wall', open: true },
      { id: 'cl', side: 'ceiling', offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-s', type: 'hvac-supply',     x: 0.5, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-r', type: 'hvac-return',     x: 0.5, y: 1.0, z: 0.9, exitSide: 'south' },
      { id: 'elec-1', type: 'electrical-circuit', x: 0.1, y: 0.3, z: 0.5, exitSide: 'west' },
    ],
  },

  'bedroom-master': {
    id: 'bedroom-master',
    label: 'Master Bedroom',
    width: 4.88, depth: 5.49, height: 2.74,
    tags: ['bedroom', 'master', 'sleeping'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
      { id: 'fl', side: 'floor',   offset: 0.5, type: 'wall', open: true },
      { id: 'cl', side: 'ceiling', offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-s', type: 'hvac-supply',     x: 0.3, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-s2',type: 'hvac-supply',     x: 0.7, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-r', type: 'hvac-return',     x: 0.5, y: 1.0, z: 0.9, exitSide: 'south' },
      { id: 'elec-1', type: 'electrical-circuit', x: 0.1, y: 0.3, z: 0.5, exitSide: 'west' },
    ],
  },

  'bathroom-full': {
    id: 'bathroom-full',
    label: 'Full Bathroom',
    width: 2.44, depth: 3.05, height: 2.74,
    tags: ['bathroom', 'wet', 'plumbing'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-exh', type: 'hvac-exhaust',       x: 0.5, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'plumb-s',  type: 'plumbing-supply',    x: 0.2, y: 0.1, z: 0.5, exitSide: 'west' },
      { id: 'plumb-d',  type: 'plumbing-drain',     x: 0.5, y: 0.0, z: 0.5, exitSide: 'floor' },
      { id: 'plumb-v',  type: 'plumbing-vent',      x: 0.5, y: 1.0, z: 0.5, exitSide: 'ceiling' },
      { id: 'elec-1',   type: 'electrical-circuit', x: 0.9, y: 0.3, z: 0.5, exitSide: 'east' },
    ],
  },

  'bathroom-half': {
    id: 'bathroom-half',
    label: 'Half Bath (Powder Room)',
    width: 1.52, depth: 2.13, height: 2.74,
    tags: ['bathroom', 'powder', 'wet', 'plumbing'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-exh', type: 'hvac-exhaust',    x: 0.5, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'plumb-s',  type: 'plumbing-supply', x: 0.2, y: 0.1, z: 0.5, exitSide: 'west' },
      { id: 'plumb-d',  type: 'plumbing-drain',  x: 0.5, y: 0.0, z: 0.5, exitSide: 'floor' },
      { id: 'plumb-v',  type: 'plumbing-vent',   x: 0.5, y: 1.0, z: 0.5, exitSide: 'ceiling' },
    ],
  },

  'kitchen': {
    id: 'kitchen',
    label: 'Kitchen',
    width: 3.66, depth: 4.88, height: 2.74,
    tags: ['kitchen', 'wet', 'plumbing'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-s',   type: 'hvac-supply',       x: 0.5, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-exh', type: 'hvac-exhaust',       x: 0.5, y: 1.0, z: 0.5, exitSide: 'ceiling' },
      { id: 'plumb-s',  type: 'plumbing-supply',    x: 0.2, y: 0.1, z: 0.3, exitSide: 'west' },
      { id: 'plumb-d',  type: 'plumbing-drain',     x: 0.2, y: 0.0, z: 0.3, exitSide: 'floor' },
      { id: 'plumb-v',  type: 'plumbing-vent',      x: 0.2, y: 1.0, z: 0.3, exitSide: 'ceiling' },
      { id: 'elec-1',   type: 'electrical-circuit', x: 0.9, y: 0.3, z: 0.5, exitSide: 'east' },
    ],
  },

  'living-room': {
    id: 'living-room',
    label: 'Living Room',
    width: 5.49, depth: 6.10, height: 2.74,
    tags: ['living', 'gathering'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-s',  type: 'hvac-supply',        x: 0.3, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-s2', type: 'hvac-supply',        x: 0.7, y: 1.0, z: 0.1, exitSide: 'north' },
      { id: 'hvac-r',  type: 'hvac-return',        x: 0.5, y: 1.0, z: 0.9, exitSide: 'south' },
      { id: 'elec-1',  type: 'electrical-circuit', x: 0.1, y: 0.3, z: 0.5, exitSide: 'west' },
    ],
  },

  'hallway': {
    id: 'hallway',
    label: 'Hallway',
    width: 1.22, depth: 3.66, height: 2.74,
    tags: ['circulation', 'hallway'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'wall', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall', open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall', open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall', open: true },
    ],
    systemsNodes: [
      { id: 'hvac-s', type: 'hvac-supply', x: 0.5, y: 1.0, z: 0.5, exitSide: 'ceiling' },
      { id: 'elec-1', type: 'electrical-circuit', x: 0.1, y: 0.3, z: 0.5, exitSide: 'west' },
    ],
  },

  'stairwell': {
    id: 'stairwell',
    label: 'Stairwell',
    width: 2.44, depth: 3.66, height: 5.49,
    tags: ['circulation', 'stair', 'vertical'],
    connectors: [
      { id: 'n',  side: 'north',   offset: 0.5, type: 'stair', open: true },
      { id: 's',  side: 'south',   offset: 0.5, type: 'stair', open: true },
      { id: 'e',  side: 'east',    offset: 0.5, type: 'wall',  open: true },
      { id: 'w',  side: 'west',    offset: 0.5, type: 'wall',  open: true },
      { id: 'fl', side: 'floor',   offset: 0.5, type: 'stair', open: true },
      { id: 'cl', side: 'ceiling', offset: 0.5, type: 'stair', open: true },
    ],
    systemsNodes: [
      { id: 'elec-1', type: 'electrical-circuit', x: 0.1, y: 0.3, z: 0.5, exitSide: 'west' },
    ],
  },

  'garage': {
    id: 'garage',
    label: 'Garage (2-car)',
    width: 6.71, depth: 6.71, height: 2.74,
    tags: ['garage', 'utility'],
    connectors: [
      { id: 'n', side: 'north', offset: 0.5, type: 'exterior', open: true },
      { id: 's', side: 'south', offset: 0.5, type: 'wall',     open: true },
      { id: 'e', side: 'east',  offset: 0.5, type: 'wall',     open: true },
      { id: 'w', side: 'west',  offset: 0.5, type: 'wall',     open: true },
    ],
    systemsNodes: [
      { id: 'elec-1', type: 'electrical-circuit', x: 0.9, y: 0.3, z: 0.5, exitSide: 'east' },
      { id: 'elec-p', type: 'electrical-panel',   x: 0.9, y: 0.5, z: 0.9, exitSide: 'east' },
    ],
  },
}

export function getRoomModule(id: string): RoomModule | undefined {
  return ROOM_REGISTRY[id]
}