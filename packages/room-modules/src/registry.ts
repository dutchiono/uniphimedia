import type { RoomModule } from '@uniphimedia/shared-types';
import { bedroom_primary } from './modules/bedroom';
import { bedroom_guest } from './modules/bedroom';
import { bathroom_full } from './modules/bathroom';
import { bathroom_half } from './modules/bathroom';
import { kitchen_standard } from './modules/kitchen';
import { living_standard } from './modules/living';
import { dining_standard } from './modules/dining';
import { hallway_standard } from './modules/hallway';
import { stairwell_standard } from './modules/stairwell';
import { garage_double } from './modules/garage';
import { utility_standard } from './modules/utility';

export interface RoomModuleRegistryEntry {
  module: RoomModule;
  group: string;
}

export const ROOM_REGISTRY: Record<string, RoomModuleRegistryEntry> = {
  bedroom_primary:   { module: bedroom_primary,   group: 'Sleeping' },
  bedroom_guest:     { module: bedroom_guest,      group: 'Sleeping' },
  bathroom_full:     { module: bathroom_full,      group: 'Bathrooms' },
  bathroom_half:     { module: bathroom_half,      group: 'Bathrooms' },
  kitchen_standard:  { module: kitchen_standard,   group: 'Living' },
  living_standard:   { module: living_standard,    group: 'Living' },
  dining_standard:   { module: dining_standard,    group: 'Living' },
  hallway_standard:  { module: hallway_standard,   group: 'Circulation' },
  stairwell_standard:{ module: stairwell_standard, group: 'Circulation' },
  garage_double:     { module: garage_double,      group: 'Service' },
  utility_standard:  { module: utility_standard,   group: 'Service' },
};

export function getRoomModule(id: string): RoomModule | undefined {
  return ROOM_REGISTRY[id]?.module;
}

export function getRoomsByCategory(category: string): RoomModule[] {
  return Object.values(ROOM_REGISTRY)
    .filter(e => e.module.category === category)
    .map(e => e.module);
}