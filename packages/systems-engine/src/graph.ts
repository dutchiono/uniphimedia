import type { PlacedRoom, RoomConnection } from '@uniphimedia/shared-types'

export interface SystemGraph {
  nodes: Map<string, PlacedRoom>
  edges: Map<string, string[]>   // roomId -> connected roomIds
}

export function buildSystemGraph(rooms: PlacedRoom[], connections: RoomConnection[]): SystemGraph {
  const nodes = new Map(rooms.map(r => [r.id, r]))
  const edges = new Map<string, string[]>(rooms.map(r => [r.id, []]))

  for (const conn of connections) {
    edges.get(conn.roomAId)?.push(conn.roomBId)
    edges.get(conn.roomBId)?.push(conn.roomAId)
  }
  return { nodes, edges }
}

/** BFS — find all rooms reachable from a starting room */
export function reachableRooms(graph: SystemGraph, startId: string): string[] {
  const visited = new Set<string>()
  const queue = [startId]
  while (queue.length) {
    const id = queue.shift()!
    if (visited.has(id)) continue
    visited.add(id)
    const neighbors = graph.edges.get(id) ?? []
    queue.push(...neighbors.filter(n => !visited.has(n)))
  }
  return [...visited]
}

/** Find all connected components (groups of rooms) */
export function connectedComponents(graph: SystemGraph): string[][] {
  const unvisited = new Set(graph.nodes.keys())
  const components: string[][] = []
  while (unvisited.size) {
    const start = unvisited.values().next().value!
    const component = reachableRooms(graph, start)
    components.push(component)
    component.forEach(id => unvisited.delete(id))
  }
  return components
}

/** Check if all rooms on a level are connected (no floating islands) */
export function checkConnectivity(graph: SystemGraph, rooms: PlacedRoom[]): boolean {
  if (rooms.length === 0) return true
  const component = reachableRooms(graph, rooms[0].id)
  return component.length === rooms.length
}