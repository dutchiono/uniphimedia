import { ROOM_MODULES, getRoomModule, getAllRoomTypes } from './index'
export { ROOM_MODULES, getRoomModule, getAllRoomTypes }

export const ROOM_GROUPS = {
  sleeping: ['bedroom', 'master_bedroom', 'closet'],
  wet: ['bathroom', 'master_bathroom', 'laundry', 'kitchen'],
  living: ['living_room', 'dining_room', 'office'],
  circulation: ['hallway', 'stairwell'],
  utility: ['garage'],
  round: ['geodesic_dome_studio', 'geodesic_dome', 'geodesic_dome_great'],
} as const
