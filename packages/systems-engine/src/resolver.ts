import type { PlacedRoom, RoomConnection } from '@uniphimedia/shared-types'
import { getRoomCandidates, oppositeFace } from './snap'

function kindsCompatible(a: string, b: string): boolean {
  const compatible: Record<string, string[]> = {
    door: ['door', 'opening'],
    opening: ['door', 'opening'],
    window: ['window'],
    stair: ['stair'],
    hvac_duct: ['hvac_duct'],
    plumbing_stack: ['plumbing_stack'],
    electrical_panel: ['electrical_panel'],
  }
  return compatible[a]?.includes(b) ?? false
}

export function resolveConnections(rooms: PlacedRoom[]): RoomConnection[] {
  const connections: RoomConnection[] = []

  for (let i = 0; i < rooms.length; i++) {
    for (let j = i + 1; j < rooms.length; j++) {
      const roomA = rooms[i]
      const roomB = rooms[j]
      if (roomA.level !== roomB.level) continue

      const candidatesA = getRoomCandidates(roomA)
      const candidatesB = getRoomCandidates(roomB)

      for (const ca of candidatesA) {
        for (const cb of candidatesB) {
          if (oppositeFace(ca.face) !== cb.face) continue
          if (!kindsCompatible(ca.kind, cb.kind)) continue

          const dx = cb.worldPos.x - ca.worldPos.x
          const dy = cb.worldPos.y - ca.worldPos.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0.5) continue

          const id = `${roomA.id}:${ca.connectorId}->${roomB.id}:${cb.connectorId}`
          connections.push({
            id,
            roomAId: roomA.id,
            connectorAId: ca.connectorId,
            roomBId: roomB.id,
            connectorBId: cb.connectorId,
            validated: true,
            issues: [],
          })
        }
      }
    }
  }

  return connections
}
