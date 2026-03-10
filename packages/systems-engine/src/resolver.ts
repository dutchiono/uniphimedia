import type { PlacedRoom, RoomConnection } from '@uniphimedia/shared-types';
import { getSnapCandidates } from './snap';
import { getRoomModule } from '@uniphimedia/room-modules';

/**
 * Resolves all connections between all placed rooms.
 * Returns an updated list of PlacedRooms with connections filled in.
 */
export function resolveConnections(rooms: PlacedRoom[]): PlacedRoom[] {
  // Clear existing auto-resolved connections
  const cleared = rooms.map(r => ({ ...r, connections: [] as RoomConnection[] }));

  for (let i = 0; i < cleared.length; i++) {
    for (let j = i + 1; j < cleared.length; j++) {
      const roomA = cleared[i];
      const roomB = cleared[j];
      const candidates = getSnapCandidates(roomA, roomB);

      for (const cand of candidates) {
        if (cand.distance > 0.5) continue; // Only snap if truly adjacent

        const modA = getRoomModule(roomA.moduleId);
        const modB = getRoomModule(roomB.moduleId);
        const connA = modA?.connectors.find(c => c.id === cand.fromConnectorId);
        const connB = modB?.connectors.find(c => c.id === cand.toConnectorId);
        if (!connA || !connB) continue;

        const warnings: string[] = [];

        // Warn: stair connector must align vertically with a stair on the level above
        if (connA.type === 'stair' || connB.type === 'stair') {
          if (roomA.level === roomB.level) {
            warnings.push('Stair connectors should connect rooms on different levels.');
          }
        }

        // Warn: plumbing drain must ultimately route to exterior or stack
        const hasPlumbingDrain = connA.systems.includes('plumbing-drain') || connB.systems.includes('plumbing-drain');
        if (hasPlumbingDrain) {
          const bothHaveStack = connA.systems.includes('plumbing-vent') && connB.systems.includes('plumbing-vent');
          if (!bothHaveStack) {
            warnings.push('Plumbing drain connection missing vent — ensure plumbing-vent is present on one side.');
          }
        }

        const conn: RoomConnection = {
          fromConnectorId: cand.fromConnectorId,
          toInstanceId: roomB.instanceId,
          toConnectorId: cand.toConnectorId,
          valid: cand.compatible && warnings.length === 0,
          warnings,
        };

        cleared[i] = {
          ...cleared[i],
          connections: [...cleared[i].connections, conn],
        };

        // Add reverse connection on roomB
        const reverseConn: RoomConnection = {
          fromConnectorId: cand.toConnectorId,
          toInstanceId: roomA.instanceId,
          toConnectorId: cand.fromConnectorId,
          valid: conn.valid,
          warnings: conn.warnings,
        };
        cleared[j] = {
          ...cleared[j],
          connections: [...cleared[j].connections, reverseConn],
        };
      }
    }
  }

  return cleared;
}
