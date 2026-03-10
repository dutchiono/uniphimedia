import type { PlacedRoom, Vec2, ConnectorFace } from '@uniphimedia/shared-types';
import { getRoomModule } from '@uniphimedia/room-modules';

/** Returns the opposite face for snap matching */
export function oppositeFace(face: ConnectorFace): ConnectorFace {
  const map: Record<ConnectorFace, ConnectorFace> = {
    north: 'south',
    south: 'north',
    east: 'west',
    west: 'east',
    floor: 'ceiling',
    ceiling: 'floor',
  };
  return map[face];
}

/** World-space edge position of a placed room's face (grid units) */
export function faceEdge(room: PlacedRoom, face: ConnectorFace): number {
  const mod = getRoomModule(room.moduleId);
  if (!mod) return 0;
  const { x, y } = room.gridPosition;
  const { x: gw, y: gh } = mod.gridSize;
  // Apply rotation
  const rot = room.rotation;
  if (face === 'north') return rot === 0 ? y      : rot === 1 ? x + gw : rot === 2 ? y + gh : x;
  if (face === 'south') return rot === 0 ? y + gh : rot === 1 ? x      : rot === 2 ? y      : x + gw;
  if (face === 'east')  return rot === 0 ? x + gw : rot === 1 ? y + gh : rot === 2 ? x      : y;
  if (face === 'west')  return rot === 0 ? x      : rot === 1 ? y      : rot === 2 ? x + gw : y + gh;
  return 0;
}

export interface SnapCandidate {
  fromRoom: PlacedRoom;
  fromConnectorId: string;
  toRoom: PlacedRoom;
  toConnectorId: string;
  distance: number;
  compatible: boolean;
}

/** Euclidean grid-unit distance between two room grid centers */
export function snapDistance(a: PlacedRoom, b: PlacedRoom): number {
  const modA = getRoomModule(a.moduleId);
  const modB = getRoomModule(b.moduleId);
  if (!modA || !modB) return Infinity;
  const ax = a.gridPosition.x + modA.gridSize.x / 2;
  const ay = a.gridPosition.y + modA.gridSize.y / 2;
  const bx = b.gridPosition.x + modB.gridSize.x / 2;
  const by = b.gridPosition.y + modB.gridSize.y / 2;
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

/**
 * For every connector pair between two rooms on the same level,
 * return SnapCandidates sorted by proximity.
 */
export function getSnapCandidates(
  roomA: PlacedRoom,
  roomB: PlacedRoom,
): SnapCandidate[] {
  if (roomA.level !== roomB.level) return [];
  const modA = getRoomModule(roomA.moduleId);
  const modB = getRoomModule(roomB.moduleId);
  if (!modA || !modB) return [];

  const candidates: SnapCandidate[] = [];

  for (const connA of modA.connectors) {
    const oppFace = oppositeFace(connA.face);
    for (const connB of modB.connectors) {
      if (connB.face !== oppFace) continue;
      // Check if the faces are actually adjacent (edge distance < 1 grid unit)
      const edgeA = faceEdge(roomA, connA.face);
      const edgeB = faceEdge(roomB, connB.face);
      const dist = Math.abs(edgeA - edgeB);
      if (dist > 1) continue;

      // Channel compatibility: at least one shared channel
      const sharedChannels = connA.systems.filter(c => connB.systems.includes(c));
      candidates.push({
        fromRoom: roomA,
        fromConnectorId: connA.id,
        toRoom: roomB,
        toConnectorId: connB.id,
        distance: dist,
        compatible: sharedChannels.length > 0 || (connA.systems.length === 0 && connB.systems.length === 0),
      });
    }
  }

  return candidates.sort((a, b) => a.distance - b.distance);
}
