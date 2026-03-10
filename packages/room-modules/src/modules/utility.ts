import type { RoomModule } from '@uniphimedia/shared-types';

export const utility_standard: RoomModule = {
  id: 'utility_standard',
  name: 'Utility / Laundry',
  category: 'utility',
  variant: 'standard',
  dimensions: { width: 2.0, depth: 2.5, height: 2.4 },
  gridSize: { x: 4, y: 5 },
  connectors: [
    { id: 'util_north_door', face: 'north', position: 0.5, type: 'door', openingWidth: 0.8, openingHeight: 2.1, systems: ['electrical-120v'], required: true },
    { id: 'util_south',      face: 'south', position: 0.5, type: 'wall', systems: ['plumbing-supply', 'plumbing-drain'], required: false },
    { id: 'util_east',       face: 'east',  position: 0.5, type: 'wall', systems: ['electrical-240v'], required: false },
    { id: 'util_west',       face: 'west',  position: 0.5, type: 'wall', systems: [], required: false },
    { id: 'util_floor',      face: 'floor', position: 0.5, type: 'open', systems: ['plumbing-drain', 'structural'], required: false },
    { id: 'util_ceil',       face: 'ceiling', position: 0.5, type: 'open', systems: ['hvac-return', 'electrical-120v', 'plumbing-vent'], required: false },
  ],
  systemsNodes: [
    { id: 'util_washer',  type: 'plumbing-fixture',  localPosition: { x: 0.3, y: 0.0, z: 0.1  }, channels: ['plumbing-supply', 'plumbing-drain', 'electrical-120v'], label: 'Washer', gpm: 2.0, watts: 500 },
    { id: 'util_dryer',   type: 'electrical-outlet', localPosition: { x: 0.7, y: 0.0, z: 0.1  }, channels: ['electrical-240v'], label: 'Dryer 240V', watts: 5600 },
    { id: 'util_hose',    type: 'plumbing-fixture',  localPosition: { x: 0.5, y: 0.0, z: 0.9  }, channels: ['plumbing-supply', 'plumbing-drain'], label: 'Utility Sink', gpm: 2.5 },
    { id: 'util_wh',      type: 'water-heater',      localPosition: { x: 0.9, y: 0.0, z: 0.5  }, channels: ['plumbing-supply', 'electrical-240v'], label: 'Water Heater', watts: 4500 },
    { id: 'util_hvac_ret',type: 'hvac-return-grille', localPosition: { x: 0.5, y: 0.9, z: 0.5 }, channels: ['hvac-return'], label: 'Return Grille', cfm: 80 },
    { id: 'util_light',   type: 'electrical-fixture', localPosition: { x: 0.5, y: 1.0, z: 0.5 }, channels: ['electrical-120v'], label: 'Ceiling Light', watts: 60 },
  ],
  planColor: '#e0e8d0',
  icon: 'washer',
  minCount: 0,
  repeatable: false,
  notes: 'Utility / laundry room. Requires plumbing stack access and exterior or mechanical room venting.',
};