import type {
  RoomModule, SnapConnector, SystemsNode, SystemsEdge, ConnectorSide
} from '@uniphimedia/shared-types'

export interface SnapResult {
  valid: boolean
  edges: SystemsEdge[]
  warnings: string[]
}

export interface SystemsValidation {
  hvacContinuous: boolean
  plumbingReachesStack: boolean
  electricalCircuited: boolean
  warnings: string[]
}

/**
 * When two rooms snap together at a shared wall boundary,
 * this function determines how their systems nodes connect.
 *
 * Rules:
 * - HVAC supply in roomA exits through the shared wall ->
 *     connects to HVAC return or supply-continuation in roomB on the opposing side
 * - Plumbing drain must ultimately route to floor/exterior or a shared stack
 * - Plumbing vent must route upward to ceiling/exterior
 * - Electrical circuits connect through the shared wall and continue
 *
 * @param roomA     The first room module definition
 * @param connA     The connector on roomA that is snapping
 * @param roomB     The second room module definition
 * @param connB     The connector on roomB that is receiving the snap
 */
export function resolveSnap(
  roomA: RoomModule,
  connA: SnapConnector,
  roomB: RoomModule,
  connB: SnapConnector,
): SnapResult {
  const edges: SystemsEdge[] = []
  const warnings: string[] = []

  const sharedSide = connA.side
  const opposingSide = getOpposingSide(sharedSide)

  // Nodes in roomA that exit through the snapped wall
  const exitingNodes = roomA.systemsNodes.filter(n => n.exitSide === sharedSide)

  // Nodes in roomB that enter from the opposing side
  const enteringNodes = roomB.systemsNodes.filter(n => n.exitSide === opposingSide)

  for (const exitNode of exitingNodes) {
    const match = enteringNodes.find(n => compatibleSystemTypes(exitNode.type, n.type))
    if (match) {
      edges.push({ fromNodeId: exitNode.id, toNodeId: match.id, resolved: true })
    } else {
      // No matching node in roomB — system terminates at boundary
      edges.push({
        fromNodeId: exitNode.id,
        toNodeId: `${roomB.id}:unresolved`,
        resolved: false,
        notes: `No matching ${exitNode.type} node found in ${roomB.label} on ${opposingSide} side`
      })
      warnings.push(
        `${roomA.label} has a ${exitNode.type} node exiting ${sharedSide} but ` +
        `${roomB.label} has no compatible node on its ${opposingSide} side. ` +
        `A chase or continuation duct/pipe/conduit may need to be added.`
      )
    }
  }

  return { valid: warnings.length === 0, edges, warnings }
}

export function validateSystemsAtBoundary(
  rooms: Array<{ module: RoomModule; level: number }>,
): SystemsValidation {
  const warnings: string[] = []

  // Check that at least one room has an exterior plumbing vent
  const hasVent = rooms.some(r =>
    r.module.systemsNodes.some(n => n.type === 'plumbing-vent')
  )
  if (!hasVent) {
    warnings.push('No plumbing vent found in layout. All wet rooms require a vent stack to exterior.')
  }

  // Check that at least one room has an electrical panel
  const hasPanel = rooms.some(r =>
    r.module.systemsNodes.some(n => n.type === 'electrical-panel')
  )
  if (!hasPanel) {
    warnings.push('No electrical panel found. Add a utility room, garage, or panel room to your layout.')
  }

  // Check HVAC coverage: every room should have at least one supply node
  const roomsWithoutHvac = rooms.filter(r =>
    !r.module.systemsNodes.some(n => n.type === 'hvac-supply' || n.type === 'hvac-exhaust')
  )
  roomsWithoutHvac.forEach(r => {
    warnings.push(`${r.module.label} has no HVAC supply or exhaust node defined.`)
  })

  return {
    hvacContinuous: roomsWithoutHvac.length === 0,
    plumbingReachesStack: hasVent,
    electricalCircuited: hasPanel,
    warnings,
  }
}

function getOpposingSide(side: ConnectorSide): ConnectorSide {
  const map: Record<ConnectorSide, ConnectorSide> = {
    north: 'south', south: 'north',
    east: 'west',   west: 'east',
    floor: 'ceiling', ceiling: 'floor',
  }
  return map[side]
}

function compatibleSystemTypes(a: string, b: string): boolean {
  // HVAC: supply connects to return or supply continuation
  if (a.startsWith('hvac') && b.startsWith('hvac')) return true
  // Plumbing: supply-to-supply, drain-to-drain, vent-to-vent
  if (a.startsWith('plumbing') && b.startsWith('plumbing')) return a === b
  // Electrical: circuits connect to circuits
  if (a.startsWith('electrical') && b.startsWith('electrical')) return true
  return false
}