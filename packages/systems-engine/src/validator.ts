import type {
  PlacedRoom, RoomConnection, ValidationResult, ValidationIssue, ValidationCode, ValidationSeverity
} from '@uniphimedia/shared-types'
import { getRoomModule } from '@uniphimedia/room-modules'

function issue(
  code: ValidationCode, severity: ValidationSeverity, message: string,
  roomIds: string[] = [], connectorIds: string[] = []
): ValidationIssue {
  return { code, severity, message, affectedRoomIds: roomIds, affectedConnectorIds: connectorIds }
}

/** Check rooms don't overlap on the same level */
function checkOverlaps(rooms: PlacedRoom[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  for (let i = 0; i < rooms.length; i++) {
    for (let j = i + 1; j < rooms.length; j++) {
      const a = rooms[i], b = rooms[j]
      if (a.level !== b.level) continue
      const overlapX = a.gridX < b.gridX + b.gridW && a.gridX + a.gridW > b.gridX
      const overlapY = a.gridY < b.gridY + b.gridH && a.gridY + a.gridH > b.gridY
      if (overlapX && overlapY) {
        issues.push(issue('OVERLAP', 'error',
          `Room "${a.moduleType}" overlaps with "${b.moduleType}" on level ${a.level}`,
          [a.id, b.id]))
      }
    }
  }
  return issues
}

/** Check room meets minimum size */
function checkMinSizes(rooms: PlacedRoom[]): ValidationIssue[] {
  return rooms.flatMap(r => {
    const mod = getRoomModule(r.moduleType)
    const issues: ValidationIssue[] = []
    if (r.dims.x < mod.minDims.x || r.dims.y < mod.minDims.y) {
      issues.push(issue('ROOM_TOO_SMALL', 'warning',
        `${mod.label} is smaller than minimum (${mod.minDims.x}m x ${mod.minDims.y}m)`, [r.id]))
    }
    return issues
  })
}

/** Every level must have at least one egress (exterior door) */
function checkEgress(rooms: PlacedRoom[], connections: RoomConnection[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const levels = [...new Set(rooms.map(r => r.level))]
  for (const lvl of levels) {
    const levelRooms = rooms.filter(r => r.level === lvl)
    const connectedIds = new Set(connections.flatMap(c => [c.connectorAId, c.connectorBId]))
    // A room has egress if it has a required door connector that is NOT connected (= goes to exterior)
    const hasEgress = levelRooms.some(r => {
      const mod = getRoomModule(r.moduleType)
      return mod.connectors.some(c => c.kind === 'door' && !connectedIds.has(c.id))
    })
    if (!hasEgress) {
      issues.push(issue('MISSING_EGRESS', 'error',
        `Level ${lvl} has no exterior egress door`, levelRooms.map(r => r.id)))
    }
  }
  return issues
}

/** Rooms with plumbing must have a vent path */
function checkPlumbingVents(rooms: PlacedRoom[]): ValidationIssue[] {
  return rooms.flatMap(r => {
    const mod = getRoomModule(r.moduleType)
    const hasDrain = mod.systemNodes.some(n => n.kind === 'plumbing_drain')
    const hasVent = mod.systemNodes.some(n => n.kind === 'plumbing_vent')
    if (hasDrain && !hasVent) {
      return [issue('PLUMBING_NO_VENT', 'error',
        `${mod.label} has drain but no plumbing vent node`, [r.id])]
    }
    return []
  })
}

/** Check electrical circuit load per level */
function checkElectricalLoad(rooms: PlacedRoom[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const levels = [...new Set(rooms.map(r => r.level))]
  for (const lvl of levels) {
    const levelRooms = rooms.filter(r => r.level === lvl)
    const totalLoad = levelRooms.reduce((sum, r) => {
      const mod = getRoomModule(r.moduleType)
      return sum + mod.systemNodes
        .filter(n => n.kind === 'electrical_outlet' || n.kind === 'electrical_switch')
        .reduce((s, n) => s + (n.load ?? 0), 0)
    }, 0)
    if (totalLoad > 200) { // 200A main panel limit
      issues.push(issue('ELECTRICAL_OVERLOAD', 'warning',
        `Level ${lvl} estimated load ${totalLoad}A exceeds 200A panel capacity`,
        levelRooms.map(r => r.id)))
    }
  }
  return issues
}

/** Required connectors must be connected */
function checkRequiredConnectors(rooms: PlacedRoom[], connections: RoomConnection[]): ValidationIssue[] {
  const connectedSet = new Set(connections.flatMap(c => [c.connectorAId, c.connectorBId]))
  return rooms.flatMap(r => {
    const mod = getRoomModule(r.moduleType)
    return mod.connectors
      .filter(c => c.required && !connectedSet.has(c.id))
      .map(c => issue('CONNECTOR_MISMATCH', 'info',
        `${mod.label} required connector "${c.id}" (${c.kind}) is unconnected`, [r.id], [c.id]))
  })
}

export function validateDesign(
  rooms: PlacedRoom[],
  connections: RoomConnection[]
): ValidationResult {
  const issues: ValidationIssue[] = [
    ...checkOverlaps(rooms),
    ...checkMinSizes(rooms),
    ...checkEgress(rooms, connections),
    ...checkPlumbingVents(rooms),
    ...checkElectricalLoad(rooms),
    ...checkRequiredConnectors(rooms, connections),
  ]
  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    checkedAt: new Date().toISOString(),
  }
}