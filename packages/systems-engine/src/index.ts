/**
 * @uniphimedia/systems-engine
 *
 * Snap resolver and system merging logic.
 * When two room connectors overlap, this engine merges their system nodes.
 */

import type { Connector, SystemNode } from '@uniphimedia/shared-types'

export interface SnapResult {
  snapped: boolean
  connector1: Connector
  connector2: Connector
  mergedSystems?: SystemNode[]
}

/**
 * Check if two connectors can snap together.
 * Wall connectors must have opposite sides (north <-> south, east <-> west).
 * Floor/ceiling connectors can snap to their counterparts.
 */
export function canSnap(c1: Connector, c2: Connector): boolean {
  if (c1.type === 'wall' && c2.type === 'wall') {
    const opposites: Record<string, string> = {
      north: 'south',
      south: 'north',
      east: 'west',
      west: 'east',
    }
    return c1.side && c2.side && opposites[c1.side] === c2.side
  }
  if (c1.type === 'floor' && c2.type === 'ceiling') return true
  if (c1.type === 'ceiling' && c2.type === 'floor') return true
  return false
}

/**
 * Merge system nodes from two connectors.
 * Deduplicates by systemType and creates unified routing.
 */
export function mergeSystems(c1: Connector, c2: Connector): SystemNode[] {
  const allNodes = [...c1.systemNodes, ...c2.systemNodes]
  const merged: Record<string, SystemNode> = {}

  for (const node of allNodes) {
    const key = node.systemType
    if (!merged[key]) {
      merged[key] = { ...node, id: `${c1.id}-${c2.id}-${key}` }
    }
  }

  return Object.values(merged)
}

/**
 * Attempt to snap two connectors together.
 */
export function snapConnectors(c1: Connector, c2: Connector): SnapResult {
  if (!canSnap(c1, c2)) {
    return { snapped: false, connector1: c1, connector2: c2 }
  }

  const mergedSystems = mergeSystems(c1, c2)
  return {
    snapped: true,
    connector1: c1,
    connector2: c2,
    mergedSystems,
  }
}