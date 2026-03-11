import type { RoomModule, Connector, SystemNode } from '@uniphimedia/shared-types'

const c = (id: string, face: any, kind: any, offset: number, w: number, h: number, required = false): Connector => ({
  id, face, kind, offsetFraction: offset, widthMeters: w, heightMeters: h, required
})
const n = (id: string, kind: any, x: number, y: number, z: number, load?: number): SystemNode => ({
  id, kind, positionLocal: { x, y, z }, load
})

export const ROOM_MODULES: Record<string, RoomModule> = {

  bedroom: {
    type: 'bedroom', label: 'Bedroom', color: '#B8D4E8', icon: '🛏',
    defaultDims: { x: 3.6, y: 3.6, z: 2.7 }, minDims: { x: 2.4, y: 3.0, z: 2.4 }, maxDims: { x: 6.0, y: 6.0, z: 3.6 },
    gridW: 7, gridH: 7,
    connectors: [
      c('bed-door-s', 'south', 'door', 0.5, 0.9, 2.1, true),
      c('bed-win-n', 'north', 'window', 0.5, 1.2, 1.1),
      c('bed-win-e', 'east', 'window', 0.5, 1.2, 1.1),
      c('bed-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
      c('bed-elec-floor', 'floor', 'electrical_panel', 0.1, 0.1, 0.1),
    ],
    systemNodes: [
      n('bed-hvac-s1', 'hvac_supply', 1.8, 3.4, 0.1, 400),
      n('bed-hvac-r1', 'hvac_return', 3.4, 3.4, 2.5),
      n('bed-outlet-1', 'electrical_outlet', 0.3, 1.0, 0.4, 15),
      n('bed-outlet-2', 'electrical_outlet', 3.3, 1.0, 0.4, 15),
      n('bed-switch-1', 'electrical_switch', 0.15, 3.4, 1.1),
    ],
  },

  master_bedroom: {
    type: 'master_bedroom', label: 'Master Bedroom', color: '#8FB8D4', icon: '🛏',
    defaultDims: { x: 4.8, y: 4.8, z: 2.7 }, minDims: { x: 3.6, y: 4.2, z: 2.4 }, maxDims: { x: 7.2, y: 7.2, z: 3.6 },
    gridW: 10, gridH: 10,
    connectors: [
      c('mbed-door-s', 'south', 'door', 0.4, 0.9, 2.1, true),
      c('mbed-door-e', 'east', 'door', 0.5, 0.9, 2.1),
      c('mbed-win-n', 'north', 'window', 0.3, 1.5, 1.2),
      c('mbed-win-n2', 'north', 'window', 0.7, 1.5, 1.2),
      c('mbed-win-w', 'west', 'window', 0.5, 1.2, 1.2),
      c('mbed-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
      c('mbed-elec-floor', 'floor', 'electrical_panel', 0.1, 0.1, 0.1),
    ],
    systemNodes: [
      n('mbed-hvac-s1', 'hvac_supply', 2.4, 4.6, 0.1, 600),
      n('mbed-hvac-s2', 'hvac_supply', 4.2, 4.6, 0.1, 400),
      n('mbed-hvac-r1', 'hvac_return', 4.5, 0.2, 2.5),
      n('mbed-outlet-1', 'electrical_outlet', 0.3, 1.2, 0.4, 15),
      n('mbed-outlet-2', 'electrical_outlet', 4.5, 1.2, 0.4, 15),
      n('mbed-outlet-3', 'electrical_outlet', 0.3, 3.6, 0.4, 15),
      n('mbed-switch-1', 'electrical_switch', 0.15, 4.5, 1.1),
    ],
  },

  bathroom: {
    type: 'bathroom', label: 'Bathroom', color: '#C8E6C9', icon: '🚿',
    defaultDims: { x: 1.8, y: 2.4, z: 2.7 }, minDims: { x: 1.5, y: 2.1, z: 2.4 }, maxDims: { x: 3.0, y: 3.6, z: 3.0 },
    gridW: 4, gridH: 5,
    connectors: [
      c('bath-door-s', 'south', 'door', 0.5, 0.76, 2.0, true),
      c('bath-win-n', 'north', 'window', 0.5, 0.6, 0.6),
      c('bath-plumb-floor', 'floor', 'plumbing_stack', 0.5, 0.1, 0.1, true),
      c('bath-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.2, 0.2),
    ],
    systemNodes: [
      n('bath-drain-1', 'plumbing_drain', 0.9, 2.0, 0.0, 1.5),
      n('bath-supply-1', 'plumbing_supply', 0.5, 1.8, 0.8, 2.0),
      n('bath-vent-1', 'plumbing_vent', 0.9, 0.2, 2.5),
      n('bath-hvac-s1', 'hvac_supply', 0.9, 2.2, 0.1, 200),
      n('bath-outlet-1', 'electrical_outlet', 0.15, 1.5, 1.0, 20),
      n('bath-switch-1', 'electrical_switch', 0.15, 2.2, 1.1),
    ],
  },

  master_bathroom: {
    type: 'master_bathroom', label: 'Master Bathroom', color: '#A5D6A7', icon: '🛁',
    defaultDims: { x: 3.0, y: 3.6, z: 2.7 }, minDims: { x: 2.4, y: 3.0, z: 2.4 }, maxDims: { x: 4.8, y: 5.4, z: 3.0 },
    gridW: 6, gridH: 7,
    connectors: [
      c('mbath-door-s', 'south', 'door', 0.5, 0.9, 2.1, true),
      c('mbath-win-n', 'north', 'window', 0.5, 0.9, 0.9),
      c('mbath-win-e', 'east', 'window', 0.5, 0.6, 0.6),
      c('mbath-plumb-floor', 'floor', 'plumbing_stack', 0.4, 0.1, 0.1, true),
      c('mbath-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.25, 0.25),
    ],
    systemNodes: [
      n('mbath-drain-shower', 'plumbing_drain', 2.6, 0.6, 0.0, 2.0),
      n('mbath-drain-tub', 'plumbing_drain', 0.6, 0.6, 0.0, 3.0),
      n('mbath-drain-sink', 'plumbing_drain', 1.5, 3.2, 0.8, 1.0),
      n('mbath-supply-1', 'plumbing_supply', 0.3, 1.0, 0.9, 3.0),
      n('mbath-vent-1', 'plumbing_vent', 1.5, 0.2, 2.5),
      n('mbath-hvac-s1', 'hvac_supply', 1.5, 3.4, 0.1, 300),
      n('mbath-outlet-1', 'electrical_outlet', 0.15, 2.5, 1.0, 20),
      n('mbath-outlet-2', 'electrical_outlet', 2.8, 2.5, 1.0, 20),
      n('mbath-switch-1', 'electrical_switch', 0.15, 3.3, 1.1),
    ],
  },

  kitchen: {
    type: 'kitchen', label: 'Kitchen', color: '#FFE0B2', icon: '🍳',
    defaultDims: { x: 3.6, y: 4.2, z: 2.7 }, minDims: { x: 2.7, y: 3.0, z: 2.4 }, maxDims: { x: 6.0, y: 6.0, z: 3.6 },
    gridW: 7, gridH: 8,
    connectors: [
      c('kit-open-s', 'south', 'opening', 0.5, 2.4, 2.4, true),
      c('kit-door-e', 'east', 'door', 0.5, 0.9, 2.1),
      c('kit-win-n', 'north', 'window', 0.5, 1.2, 1.1),
      c('kit-plumb-floor', 'floor', 'plumbing_stack', 0.5, 0.1, 0.1, true),
      c('kit-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
      c('kit-gas-floor', 'floor', 'plumbing_stack', 0.3, 0.1, 0.1),
    ],
    systemNodes: [
      n('kit-drain-sink', 'plumbing_drain', 1.8, 0.3, 0.9, 2.0),
      n('kit-supply-sink', 'plumbing_supply', 1.8, 0.3, 1.1, 3.0),
      n('kit-gas-range', 'gas_line', 3.0, 0.5, 0.0),
      n('kit-vent-1', 'plumbing_vent', 1.8, 0.2, 2.5),
      n('kit-hvac-s1', 'hvac_supply', 1.8, 4.0, 0.1, 500),
      n('kit-hvac-r1', 'hvac_return', 3.4, 0.2, 2.5),
      n('kit-outlet-1', 'electrical_outlet', 0.3, 0.5, 1.0, 20),
      n('kit-outlet-2', 'electrical_outlet', 3.3, 0.5, 1.0, 20),
      n('kit-outlet-gfci', 'electrical_outlet', 1.8, 0.3, 1.2, 20),
      n('kit-switch-1', 'electrical_switch', 0.15, 4.0, 1.1),
      n('kit-panel', 'electrical_panel', 3.5, 4.0, 1.2, 40),
    ],
  },

  living_room: {
    type: 'living_room', label: 'Living Room', color: '#FFF9C4', icon: '🛋',
    defaultDims: { x: 4.8, y: 5.4, z: 2.7 }, minDims: { x: 3.6, y: 4.2, z: 2.4 }, maxDims: { x: 8.4, y: 8.4, z: 4.2 },
    gridW: 10, gridH: 11,
    connectors: [
      c('liv-door-n', 'north', 'door', 0.5, 0.9, 2.1, true),
      c('liv-open-e', 'east', 'opening', 0.5, 2.4, 2.4),
      c('liv-open-w', 'west', 'opening', 0.5, 2.4, 2.4),
      c('liv-win-s', 'south', 'window', 0.3, 1.5, 1.2),
      c('liv-win-s2', 'south', 'window', 0.7, 1.5, 1.2),
      c('liv-win-e', 'east', 'window', 0.7, 1.2, 1.2),
      c('liv-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
    ],
    systemNodes: [
      n('liv-hvac-s1', 'hvac_supply', 2.4, 5.2, 0.1, 800),
      n('liv-hvac-s2', 'hvac_supply', 0.5, 2.7, 0.1, 600),
      n('liv-hvac-r1', 'hvac_return', 4.5, 0.2, 2.5),
      n('liv-outlet-1', 'electrical_outlet', 0.3, 1.0, 0.4, 15),
      n('liv-outlet-2', 'electrical_outlet', 4.5, 1.0, 0.4, 15),
      n('liv-outlet-3', 'electrical_outlet', 2.4, 5.2, 0.4, 15),
      n('liv-outlet-4', 'electrical_outlet', 0.3, 4.0, 0.4, 15),
      n('liv-switch-1', 'electrical_switch', 0.15, 5.2, 1.1),
    ],
  },

  dining_room: {
    type: 'dining_room', label: 'Dining Room', color: '#FFCCBC', icon: '🍽',
    defaultDims: { x: 3.6, y: 3.6, z: 2.7 }, minDims: { x: 3.0, y: 3.0, z: 2.4 }, maxDims: { x: 6.0, y: 6.0, z: 3.6 },
    gridW: 7, gridH: 7,
    connectors: [
      c('din-open-n', 'north', 'opening', 0.5, 2.4, 2.4, true),
      c('din-open-w', 'west', 'opening', 0.5, 2.1, 2.4),
      c('din-win-s', 'south', 'window', 0.5, 1.5, 1.2),
      c('din-win-e', 'east', 'window', 0.5, 1.2, 1.2),
      c('din-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
    ],
    systemNodes: [
      n('din-hvac-s1', 'hvac_supply', 1.8, 3.4, 0.1, 500),
      n('din-hvac-r1', 'hvac_return', 3.4, 0.2, 2.5),
      n('din-outlet-1', 'electrical_outlet', 0.3, 1.0, 0.4, 15),
      n('din-outlet-2', 'electrical_outlet', 3.3, 1.0, 0.4, 15),
      n('din-switch-1', 'electrical_switch', 0.15, 3.4, 1.1),
    ],
  },

  hallway: {
    type: 'hallway', label: 'Hallway', color: '#E8EAF6', icon: '🚶',
    defaultDims: { x: 1.2, y: 3.6, z: 2.7 }, minDims: { x: 0.9, y: 1.8, z: 2.4 }, maxDims: { x: 2.4, y: 12.0, z: 3.0 },
    gridW: 2, gridH: 7,
    connectors: [
      c('hall-door-n', 'north', 'door', 0.5, 0.9, 2.1),
      c('hall-door-s', 'south', 'door', 0.5, 0.9, 2.1),
      c('hall-door-e', 'east', 'door', 0.5, 0.9, 2.1),
      c('hall-door-w', 'west', 'door', 0.5, 0.9, 2.1),
      c('hall-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.2, 0.2),
    ],
    systemNodes: [
      n('hall-hvac-s1', 'hvac_supply', 0.6, 1.8, 0.1, 150),
      n('hall-outlet-1', 'electrical_outlet', 0.15, 1.8, 0.4, 15),
      n('hall-switch-1', 'electrical_switch', 0.15, 3.4, 1.1),
      n('hall-switch-2', 'electrical_switch', 1.05, 0.2, 1.1),
    ],
  },

  stairwell: {
    type: 'stairwell', label: 'Stairwell', color: '#D1C4E9', icon: '🪜',
    defaultDims: { x: 2.4, y: 3.6, z: 5.4 }, minDims: { x: 2.1, y: 3.0, z: 4.8 }, maxDims: { x: 3.6, y: 5.4, z: 6.6 },
    gridW: 5, gridH: 7,
    connectors: [
      c('stair-door-n', 'north', 'door', 0.5, 0.9, 2.1, true),
      c('stair-door-s', 'south', 'door', 0.5, 0.9, 2.1),
      c('stair-floor', 'floor', 'stair', 0.5, 2.1, 0.3, true),
      c('stair-ceiling', 'ceiling', 'stair', 0.5, 2.1, 0.3, true),
      c('stair-hvac-ceil', 'ceiling', 'hvac_duct', 0.3, 0.2, 0.2),
    ],
    systemNodes: [
      n('stair-hvac-s1', 'hvac_supply', 1.2, 3.4, 0.1, 200),
      n('stair-outlet-1', 'electrical_outlet', 0.15, 1.5, 0.4, 15),
      n('stair-switch-1', 'electrical_switch', 0.15, 3.4, 1.1),
      n('stair-switch-2', 'electrical_switch', 2.25, 0.2, 3.8),
    ],
  },

  garage: {
    type: 'garage', label: 'Garage', color: '#CFD8DC', icon: '🚗',
    defaultDims: { x: 5.5, y: 6.1, z: 2.7 }, minDims: { x: 3.0, y: 5.5, z: 2.4 }, maxDims: { x: 9.0, y: 9.0, z: 3.6 },
    gridW: 11, gridH: 12,
    connectors: [
      c('gar-door-s', 'south', 'door', 0.5, 5.0, 2.4, true),
      c('gar-door-n', 'north', 'door', 0.5, 0.9, 2.1),
      c('gar-win-e', 'east', 'window', 0.5, 0.9, 0.9),
      c('gar-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
      c('gar-elec-floor', 'floor', 'electrical_panel', 0.1, 0.1, 0.1),
    ],
    systemNodes: [
      n('gar-hvac-s1', 'hvac_supply', 2.75, 5.9, 0.1, 600),
      n('gar-outlet-1', 'electrical_outlet', 0.3, 1.5, 0.4, 20),
      n('gar-outlet-2', 'electrical_outlet', 5.2, 1.5, 0.4, 20),
      n('gar-outlet-220', 'electrical_outlet', 5.2, 5.0, 1.2, 30),
      n('gar-switch-1', 'electrical_switch', 0.15, 5.9, 1.1),
      n('gar-panel', 'electrical_panel', 0.2, 5.0, 1.5, 100),
    ],
  },

  laundry: {
    type: 'laundry', label: 'Laundry', color: '#B2EBF2', icon: '🧺',
    defaultDims: { x: 2.4, y: 2.4, z: 2.7 }, minDims: { x: 1.8, y: 1.8, z: 2.4 }, maxDims: { x: 3.6, y: 3.6, z: 3.0 },
    gridW: 5, gridH: 5,
    connectors: [
      c('lau-door-s', 'south', 'door', 0.5, 0.76, 2.0, true),
      c('lau-plumb-floor', 'floor', 'plumbing_stack', 0.5, 0.1, 0.1, true),
      c('lau-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.2, 0.2),
    ],
    systemNodes: [
      n('lau-drain-1', 'plumbing_drain', 0.6, 0.3, 0.0, 5.0),
      n('lau-supply-1', 'plumbing_supply', 0.6, 0.3, 1.2, 4.0),
      n('lau-vent-1', 'plumbing_vent', 1.2, 0.2, 2.5),
      n('lau-hvac-s1', 'hvac_supply', 1.2, 2.2, 0.1, 250),
      n('lau-outlet-220', 'electrical_outlet', 0.15, 1.2, 1.0, 30),
      n('lau-outlet-gfci', 'electrical_outlet', 2.2, 1.2, 1.0, 20),
      n('lau-switch-1', 'electrical_switch', 0.15, 2.2, 1.1),
    ],
  },

  office: {
    type: 'office', label: 'Office', color: '#E8F5E9', icon: '💼',
    defaultDims: { x: 3.0, y: 3.0, z: 2.7 }, minDims: { x: 2.4, y: 2.4, z: 2.4 }, maxDims: { x: 5.4, y: 5.4, z: 3.6 },
    gridW: 6, gridH: 6,
    connectors: [
      c('off-door-s', 'south', 'door', 0.5, 0.9, 2.1, true),
      c('off-win-n', 'north', 'window', 0.5, 1.2, 1.1),
      c('off-win-e', 'east', 'window', 0.5, 1.2, 1.1),
      c('off-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.25, 0.25),
    ],
    systemNodes: [
      n('off-hvac-s1', 'hvac_supply', 1.5, 2.8, 0.1, 350),
      n('off-hvac-r1', 'hvac_return', 2.8, 0.2, 2.5),
      n('off-outlet-1', 'electrical_outlet', 0.3, 0.5, 0.4, 15),
      n('off-outlet-2', 'electrical_outlet', 2.7, 0.5, 0.4, 15),
      n('off-outlet-3', 'electrical_outlet', 0.3, 2.5, 0.4, 15),
      n('off-outlet-4', 'electrical_outlet', 2.7, 2.5, 0.4, 15),
      n('off-switch-1', 'electrical_switch', 0.15, 2.8, 1.1),
    ],
  },

  closet: {
    type: 'closet', label: 'Closet', color: '#F3E5F5', icon: '👗',
    defaultDims: { x: 1.8, y: 1.5, z: 2.7 }, minDims: { x: 0.9, y: 0.9, z: 2.4 }, maxDims: { x: 3.6, y: 3.0, z: 3.0 },
    gridW: 4, gridH: 3,
    connectors: [
      c('clo-door-s', 'south', 'door', 0.5, 0.76, 2.0, true),
      c('clo-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.15, 0.15),
    ],
    systemNodes: [
      n('clo-hvac-s1', 'hvac_supply', 0.9, 1.3, 0.1, 100),
      n('clo-outlet-1', 'electrical_outlet', 0.15, 0.75, 0.4, 15),
      n('clo-switch-1', 'electrical_switch', 0.15, 1.3, 1.1),
    ],
  },

  geodesic_dome_studio: {
    type: 'geodesic_dome_studio', label: 'Studio Dome', color: '#A7DCCF', icon: 'dome',
    defaultDims: { x: 5.0, y: 5.0, z: 2.8 }, minDims: { x: 4.0, y: 4.0, z: 2.4 }, maxDims: { x: 8.0, y: 8.0, z: 4.0 },
    gridW: 10, gridH: 10,
    connectors: [
      c('studio-dome-door-s', 'south', 'door', 0.5, 1.0, 2.1, true),
      c('studio-dome-win-e', 'east', 'window', 0.45, 1.0, 1.0),
      c('studio-dome-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.3, 0.3),
      c('studio-dome-elec-floor', 'floor', 'electrical_panel', 0.15, 0.1, 0.1),
    ],
    systemNodes: [
      n('studio-dome-hvac-s1', 'hvac_supply', 2.5, 4.0, 0.3, 500),
      n('studio-dome-hvac-r1', 'hvac_return', 2.5, 1.0, 2.2),
      n('studio-dome-outlet-1', 'electrical_outlet', 0.8, 1.5, 0.4, 20),
      n('studio-dome-outlet-2', 'electrical_outlet', 4.2, 1.5, 0.4, 20),
    ],
    footprint: 'circle',
    shellKind: 'dome',
  },

  geodesic_dome: {
    type: 'geodesic_dome', label: 'Family Dome', color: '#9BD4C7', icon: 'dome',
    defaultDims: { x: 8.0, y: 8.0, z: 4.0 }, minDims: { x: 4.0, y: 4.0, z: 2.4 }, maxDims: { x: 16.0, y: 16.0, z: 8.0 },
    gridW: 16, gridH: 16,
    connectors: [
      c('dome-door-s', 'south', 'door', 0.5, 1.2, 2.2, true),
      c('dome-win-e', 'east', 'window', 0.45, 1.4, 1.2),
      c('dome-win-w', 'west', 'window', 0.55, 1.4, 1.2),
      c('dome-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.4, 0.4),
      c('dome-elec-floor', 'floor', 'electrical_panel', 0.15, 0.1, 0.1),
    ],
    systemNodes: [
      n('dome-hvac-s1', 'hvac_supply', 4.0, 6.5, 0.4, 900),
      n('dome-hvac-r1', 'hvac_return', 4.0, 1.2, 3.3),
      n('dome-outlet-1', 'electrical_outlet', 1.0, 2.0, 0.4, 20),
      n('dome-outlet-2', 'electrical_outlet', 7.0, 2.0, 0.4, 20),
      n('dome-switch-1', 'electrical_switch', 4.0, 7.4, 1.1),
    ],
    footprint: 'circle',
    shellKind: 'dome',
  },

  geodesic_dome_great: {
    type: 'geodesic_dome_great', label: 'Great Dome', color: '#86CBB9', icon: 'dome',
    defaultDims: { x: 12.0, y: 12.0, z: 6.0 }, minDims: { x: 8.0, y: 8.0, z: 4.0 }, maxDims: { x: 20.0, y: 20.0, z: 10.0 },
    gridW: 24, gridH: 24,
    connectors: [
      c('great-dome-door-s', 'south', 'door', 0.5, 1.4, 2.4, true),
      c('great-dome-door-e', 'east', 'door', 0.5, 1.2, 2.2),
      c('great-dome-win-w', 'west', 'window', 0.45, 1.8, 1.2),
      c('great-dome-win-n', 'north', 'window', 0.5, 1.8, 1.2),
      c('great-dome-hvac-ceil', 'ceiling', 'hvac_duct', 0.5, 0.5, 0.5),
      c('great-dome-elec-floor', 'floor', 'electrical_panel', 0.12, 0.1, 0.1),
    ],
    systemNodes: [
      n('great-dome-hvac-s1', 'hvac_supply', 6.0, 10.0, 0.4, 1400),
      n('great-dome-hvac-r1', 'hvac_return', 6.0, 2.0, 4.8),
      n('great-dome-outlet-1', 'electrical_outlet', 1.2, 2.0, 0.4, 20),
      n('great-dome-outlet-2', 'electrical_outlet', 10.8, 2.0, 0.4, 20),
      n('great-dome-switch-1', 'electrical_switch', 6.0, 11.0, 1.1),
    ],
    footprint: 'circle',
    shellKind: 'dome',
  }
}

export function getRoomModule(type: string): RoomModule {
  const m = ROOM_MODULES[type]
  if (!m) throw new Error(`Unknown room type: ${type}`)
  return m
}

export function getAllRoomTypes(): string[] {
  return Object.keys(ROOM_MODULES)
}

export { ROOM_GROUPS } from './registry'
