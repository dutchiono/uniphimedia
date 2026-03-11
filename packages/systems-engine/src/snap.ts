import type { PlacedRoom, SnapCandidate, SnapResult, ConnectorFace, Vec2 } from '@uniphimedia/shared-types'
import { getRoomModule } from '@uniphimedia/room-modules'

const GRID_SIZE = 0.5
const SNAP_THRESHOLD = 1.2

export function oppositeFace(face: ConnectorFace): ConnectorFace {
  return { north: 'south', south: 'north', east: 'west', west: 'east', floor: 'ceiling', ceiling: 'floor' }[face] as ConnectorFace
}

export function connectorWorldPos(room: PlacedRoom, connectorId: string): Vec2 | null {
  const mod = getRoomModule(room.moduleType)
  const conn = mod.connectors.find(c => c.id === connectorId)
  if (!conn) return null

  const x0 = room.gridX * GRID_SIZE
  const y0 = room.gridY * GRID_SIZE
  const w = room.gridW * GRID_SIZE
  const h = room.gridH * GRID_SIZE
  const circular = mod.footprint === 'circle'

  let fx: number
  let fy: number
  const off = conn.offsetFraction
  switch (conn.face) {
    case 'north':
      fx = x0 + off * w
      fy = circular ? y0 + h / 2 - Math.sqrt(Math.max(0, 1 - Math.pow((fx - (x0 + w / 2)) / (w / 2), 2))) * (h / 2) : y0
      break
    case 'south':
      fx = x0 + off * w
      fy = circular ? y0 + h / 2 + Math.sqrt(Math.max(0, 1 - Math.pow((fx - (x0 + w / 2)) / (w / 2), 2))) * (h / 2) : y0 + h
      break
    case 'east':
      fy = y0 + off * h
      fx = circular ? x0 + w / 2 + Math.sqrt(Math.max(0, 1 - Math.pow((fy - (y0 + h / 2)) / (h / 2), 2))) * (w / 2) : x0 + w
      break
    case 'west':
      fy = y0 + off * h
      fx = circular ? x0 + w / 2 - Math.sqrt(Math.max(0, 1 - Math.pow((fy - (y0 + h / 2)) / (h / 2), 2))) * (w / 2) : x0
      break
    default:
      fx = x0 + 0.5 * w
      fy = y0 + 0.5 * h
      break
  }

  const cx = x0 + w / 2
  const cy = y0 + h / 2
  const rad = (room.rotation * Math.PI) / 180
  const dx = fx - cx
  const dy = fy - cy
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  }
}

function rotatedFace(face: ConnectorFace, rotation: number): ConnectorFace {
  const faces: ConnectorFace[] = ['north', 'east', 'south', 'west']
  const idx = faces.indexOf(face)
  if (idx === -1) return face
  return faces[(idx + rotation / 90) % 4]
}

export function getRoomCandidates(room: PlacedRoom): SnapCandidate[] {
  const mod = getRoomModule(room.moduleType)
  return mod.connectors
    .filter(c => c.face !== 'floor' && c.face !== 'ceiling')
    .map(c => {
      const worldPos = connectorWorldPos(room, c.id)
      if (!worldPos) return null
      return {
        roomId: room.id,
        connectorId: c.id,
        worldPos,
        face: rotatedFace(c.face, room.rotation),
        kind: c.kind,
      } as SnapCandidate
    })
    .filter(Boolean) as SnapCandidate[]
}

export function findSnap(
  draggedRoom: PlacedRoom,
  placedRooms: PlacedRoom[],
  threshold = SNAP_THRESHOLD
): SnapResult | null {
  const dragCandidates = getRoomCandidates(draggedRoom)
  let best: SnapResult | null = null

  for (const placed of placedRooms) {
    if (placed.id === draggedRoom.id) continue
    if (placed.level !== draggedRoom.level) continue
    const placedCandidates = getRoomCandidates(placed)

    for (const ca of dragCandidates) {
      for (const cb of placedCandidates) {
        if (oppositeFace(ca.face) !== cb.face) continue
        if (!kindsCompatible(ca.kind, cb.kind)) continue

        const dx = cb.worldPos.x - ca.worldPos.x
        const dy = cb.worldPos.y - ca.worldPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > threshold) continue

        if (!best || dist < best.score) {
          best = {
            matched: true,
            candidateA: ca,
            candidateB: cb,
            snapDelta: { x: dx, y: dy },
            score: dist,
          }
        }
      }
    }
  }
  return best
}

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
