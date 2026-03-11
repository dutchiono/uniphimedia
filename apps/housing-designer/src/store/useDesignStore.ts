import { create } from 'zustand'
import { temporal } from 'zundo'
import { v4 as uuid } from 'uuid'
import type {
  Connector,
  Design,
  DesignLevel,
  InteriorPartition,
  MaterialSlotKey,
  PartitionKind,
  PartitionOrientation,
  PlacedRoom,
  RoomConnection,
  Rotation,
  SyncState,
  ValidationResult,
} from '@uniphimedia/shared-types'
import { getRoomModule } from '@uniphimedia/room-modules'
import { validateDesign } from '@uniphimedia/systems-engine'

const GRID_M = 0.5

const emptySlots = (): Record<MaterialSlotKey, string | null> => ({
  floor: null, ceiling: null,
  wall_n: null, wall_s: null, wall_e: null, wall_w: null,
  exterior: null, roof: null, trim: null,
  cabinet: null, countertop: null, fixture: null,
})

const defaultLevels = (): DesignLevel[] => [
  { index: 0, label: 'Ground Floor', floorHeightMeters: 0, visible: true },
]

function cloneConnector(connector: Connector): Connector { return { ...connector } }
function baseConnectorsForRoom(room: PlacedRoom): Connector[] { return room.connectors.filter(connector => !connector.generated).map(cloneConnector) }
function rangesOverlap(a0: number, a1: number, b0: number, b1: number) { return Math.min(a1, b1) - Math.max(a0, b0) }
function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)) }
function clamp01(value: number) { return clamp(value, 0.1, 0.9) }

function roomRadius(room: PlacedRoom) {
  return Math.min(room.dims.x, room.dims.y) / 2
}

function defaultPartitionForRoom(room: PlacedRoom, kind: PartitionKind, orientation?: PartitionOrientation): InteriorPartition {
  const radius = roomRadius(room)
  if (kind === 'radial') {
    return {
      id: uuid(),
      roomId: room.id,
      level: room.level,
      kind,
      angleDeg: 0,
      startMeters: 0.6,
      endMeters: Math.max(1.2, radius - 0.3),
      thicknessMeters: 0.12,
      heightMeters: Math.min(2.4, room.dims.z),
      doorWidthMeters: 0.9,
    }
  }
  if (kind === 'ring') {
    return {
      id: uuid(),
      roomId: room.id,
      level: room.level,
      kind,
      radiusMeters: Math.max(1, radius * 0.55),
      sweepDeg: 270,
      thicknessMeters: 0.12,
      heightMeters: Math.min(2.4, room.dims.z),
      doorWidthMeters: null,
    }
  }
  return {
    id: uuid(),
    roomId: room.id,
    level: room.level,
    kind,
    orientation: orientation ?? 'vertical',
    offsetMeters: orientation === 'vertical' ? room.dims.x / 2 : room.dims.y / 2,
    thicknessMeters: 0.12,
    heightMeters: Math.min(2.4, room.dims.z),
    doorWidthMeters: 0.9,
  }
}

function normalizePartition(room: PlacedRoom, partition: InteriorPartition): InteriorPartition {
  const radius = roomRadius(room)
  if (partition.kind === 'radial') {
    const startMeters = clamp(partition.startMeters ?? 0.6, 0.2, Math.max(0.2, radius - 0.8))
    const endMeters = clamp(partition.endMeters ?? radius - 0.3, startMeters + 0.6, Math.max(startMeters + 0.6, radius - 0.1))
    return {
      ...partition,
      angleDeg: ((partition.angleDeg ?? 0) % 360 + 360) % 360,
      startMeters,
      endMeters,
      thicknessMeters: clamp(partition.thicknessMeters, 0.08, 0.3),
      heightMeters: clamp(partition.heightMeters, 2, room.dims.z),
      doorWidthMeters: partition.doorWidthMeters == null ? null : clamp(partition.doorWidthMeters, 0.6, 2),
    }
  }
  if (partition.kind === 'ring') {
    return {
      ...partition,
      radiusMeters: clamp(partition.radiusMeters ?? radius * 0.55, 0.8, Math.max(0.8, radius - 0.2)),
      sweepDeg: clamp(partition.sweepDeg ?? 270, 45, 360),
      thicknessMeters: clamp(partition.thicknessMeters, 0.08, 0.3),
      heightMeters: clamp(partition.heightMeters, 2, room.dims.z),
      doorWidthMeters: null,
    }
  }
  const orientation = partition.orientation ?? 'vertical'
  const axisLimit = orientation === 'vertical' ? room.dims.x - 0.3 : room.dims.y - 0.3
  return {
    ...partition,
    orientation,
    offsetMeters: clamp(partition.offsetMeters ?? (orientation === 'vertical' ? room.dims.x / 2 : room.dims.y / 2), 0.3, Math.max(0.3, axisLimit)),
    thicknessMeters: clamp(partition.thicknessMeters, 0.08, 0.3),
    heightMeters: clamp(partition.heightMeters, 2, room.dims.z),
    doorWidthMeters: partition.doorWidthMeters == null ? null : clamp(partition.doorWidthMeters, 0.6, 2),
  }
}

function normalizePartitions(rooms: PlacedRoom[], partitions: InteriorPartition[]): InteriorPartition[] {
  return partitions
    .filter(partition => rooms.some(room => room.id === partition.roomId && room.level === partition.level))
    .map(partition => {
      const room = rooms.find(item => item.id === partition.roomId)
      return room ? normalizePartition(room, partition) : partition
    })
}

function autoDoorForPair(room: PlacedRoom, other: PlacedRoom): Connector[] {
  if (room.level !== other.level || room.id === other.id) return []
  const roomX0 = room.gridX
  const roomX1 = room.gridX + room.gridW
  const roomY0 = room.gridY
  const roomY1 = room.gridY + room.gridH
  const otherX0 = other.gridX
  const otherX1 = other.gridX + other.gridW
  const otherY0 = other.gridY
  const otherY1 = other.gridY + other.gridH
  const doors: Connector[] = []

  if (roomX1 === otherX0 || roomX0 === otherX1) {
    const overlap = rangesOverlap(roomY0, roomY1, otherY0, otherY1)
    if (overlap >= 2) {
      const start = Math.max(roomY0, otherY0)
      const end = Math.min(roomY1, otherY1)
      const center = (start + end) / 2
      doors.push({ id: `auto-door-${room.id}-${other.id}-${roomX1 === otherX0 ? 'east' : 'west'}`, face: roomX1 === otherX0 ? 'east' : 'west', kind: 'door', offsetFraction: clamp01((center - roomY0) / room.gridH), widthMeters: 0.9, heightMeters: 2.1, required: false, generated: true, linkedRoomId: other.id })
    }
  }

  if (roomY1 === otherY0 || roomY0 === otherY1) {
    const overlap = rangesOverlap(roomX0, roomX1, otherX0, otherX1)
    if (overlap >= 2) {
      const start = Math.max(roomX0, otherX0)
      const end = Math.min(roomX1, otherX1)
      const center = (start + end) / 2
      doors.push({ id: `auto-door-${room.id}-${other.id}-${roomY1 === otherY0 ? 'south' : 'north'}`, face: roomY1 === otherY0 ? 'south' : 'north', kind: 'door', offsetFraction: clamp01((center - roomX0) / room.gridW), widthMeters: 0.9, heightMeters: 2.1, required: false, generated: true, linkedRoomId: other.id })
    }
  }

  return doors
}

function syncRoomConnectors(rooms: PlacedRoom[]): PlacedRoom[] {
  return rooms.map(room => {
    const base = baseConnectorsForRoom(room)
    const existingGenerated = new Map(room.connectors.filter(connector => connector.generated).map(connector => [connector.id, connector]))
    const auto = rooms.flatMap(other => autoDoorForPair(room, other)).map(connector => {
      const existing = existingGenerated.get(connector.id)
      return existing ? { ...connector, widthMeters: existing.widthMeters, heightMeters: existing.heightMeters } : connector
    })
    return { ...room, connectors: [...base, ...auto] }
  })
}

export interface DesignState {
  designId: string
  designName: string
  levels: DesignLevel[]
  rooms: PlacedRoom[]
  partitions: InteriorPartition[]
  connections: RoomConnection[]
  globalMaterials: Record<MaterialSlotKey, string | null>
  activeLevel: number
  selectedRoomId: string | null
  selectedPartitionId: string | null
  activeView: 'floor' | 'shell' | 'interior'
  showSystemsOverlay: boolean
  validation: ValidationResult | null
  sync: SyncState
  addRoom: (moduleType: string, gridX: number, gridY: number) => string
  moveRoom: (id: string, gridX: number, gridY: number) => void
  rotateRoom: (id: string) => void
  resizeRoom: (id: string, gridW: number, gridH: number) => void
  setRoomDimensions: (id: string, widthMeters: number, depthMeters: number) => void
  setRoomConnector: (roomId: string, connectorId: string, patch: Partial<Connector>) => void
  addPartition: (roomId: string, kind: PartitionKind, orientation?: PartitionOrientation) => void
  updatePartition: (id: string, patch: Partial<InteriorPartition>) => void
  deletePartition: (id: string) => void
  deleteRoom: (id: string) => void
  selectRoom: (id: string | null) => void
  selectPartition: (id: string | null) => void
  lockRoom: (id: string, locked: boolean) => void
  addLevel: () => void
  removeLevel: (index: number) => void
  setLevelVisibility: (index: number, visible: boolean) => void
  setActiveLevel: (index: number) => void
  addConnection: (roomAId: string, connectorAId: string, roomBId: string, connectorBId: string) => void
  removeConnection: (id: string) => void
  setRoomMaterial: (roomId: string, slot: MaterialSlotKey, materialId: string | null) => void
  setGlobalMaterial: (slot: MaterialSlotKey, materialId: string | null) => void
  setActiveView: (view: 'floor' | 'shell' | 'interior') => void
  setShowSystemsOverlay: (show: boolean) => void
  runValidation: () => void
  exportDesign: () => Design
  importDesign: (design: Design) => void
  resetDesign: () => void
  setDesignName: (name: string) => void
}

export const useDesignStore = create<DesignState>()(
  temporal(
    (set, get) => ({
      designId: uuid(),
      designName: 'New Design',
      levels: defaultLevels(),
      rooms: [],
      partitions: [],
      connections: [],
      globalMaterials: emptySlots(),
      activeLevel: 0,
      selectedRoomId: null,
      selectedPartitionId: null,
      activeView: 'floor',
      showSystemsOverlay: false,
      validation: null,
      sync: { status: 'idle', lastSyncedAt: null, pendingOps: 0, error: null },

      addRoom: (moduleType, gridX, gridY) => {
        const mod = getRoomModule(moduleType)
        const room: PlacedRoom = { id: uuid(), moduleType: mod.type, gridX, gridY, gridW: mod.gridW, gridH: mod.gridH, level: get().activeLevel, rotation: 0, dims: { ...mod.defaultDims }, connectors: mod.connectors.map(cloneConnector), materialSlots: emptySlots(), locked: false }
        set(state => ({ rooms: syncRoomConnectors([...state.rooms, room]) }))
        get().runValidation()
        return room.id
      },

      moveRoom: (id, gridX, gridY) => {
        set(state => {
          const rooms = syncRoomConnectors(state.rooms.map(room => room.id === id && !room.locked ? { ...room, gridX, gridY } : room))
          return { rooms, partitions: normalizePartitions(rooms, state.partitions) }
        })
        get().runValidation()
      },

      rotateRoom: (id) => {
        set(state => {
          const rooms = syncRoomConnectors(state.rooms.map(room => {
            if (room.id !== id || room.locked) return room
            const next = ((room.rotation + 90) % 360) as Rotation
            const swap = next === 90 || next === 270
            return { ...room, rotation: next, gridW: swap ? room.gridH : room.gridW, gridH: swap ? room.gridW : room.gridH, dims: { x: swap ? room.dims.y : room.dims.x, y: swap ? room.dims.x : room.dims.y, z: room.dims.z } }
          }))
          return { rooms, partitions: normalizePartitions(rooms, state.partitions) }
        })
        get().runValidation()
      },

      resizeRoom: (id, gridW, gridH) => {
        set(state => {
          const rooms = syncRoomConnectors(state.rooms.map(room => {
            if (room.id !== id || room.locked) return room
            const mod = getRoomModule(room.moduleType)
            const nextW = Math.max(Math.ceil(mod.minDims.x / GRID_M), Math.min(Math.floor(mod.maxDims.x / GRID_M), gridW))
            const nextH = Math.max(Math.ceil(mod.minDims.y / GRID_M), Math.min(Math.floor(mod.maxDims.y / GRID_M), gridH))
            return { ...room, gridW: nextW, gridH: nextH, dims: { x: nextW * GRID_M, y: nextH * GRID_M, z: room.dims.z } }
          }))
          return { rooms, partitions: normalizePartitions(rooms, state.partitions) }
        })
        get().runValidation()
      },

      setRoomDimensions: (id, widthMeters, depthMeters) => {
        const room = get().rooms.find(item => item.id === id)
        if (!room) return
        const mod = getRoomModule(room.moduleType)
        get().resizeRoom(id, Math.round(clamp(widthMeters, mod.minDims.x, mod.maxDims.x) / GRID_M), Math.round(clamp(depthMeters, mod.minDims.y, mod.maxDims.y) / GRID_M))
      },

      setRoomConnector: (roomId, connectorId, patch) => {
        set(state => {
          const sourceRoom = state.rooms.find(room => room.id === roomId)
          const sourceConnector = sourceRoom?.connectors.find(connector => connector.id === connectorId) ?? null
          const rooms = syncRoomConnectors(state.rooms.map(room => {
            if (room.id !== roomId && room.id !== sourceConnector?.linkedRoomId) return room
            return {
              ...room,
              connectors: room.connectors.map(connector => {
                const isSource = room.id === roomId && connector.id === connectorId
                const isLinked = room.id === sourceConnector?.linkedRoomId && connector.generated && connector.linkedRoomId === roomId && connector.kind === sourceConnector?.kind
                if (!isSource && !isLinked) return connector
                return { ...connector, ...patch, widthMeters: patch.widthMeters !== undefined ? clamp(patch.widthMeters, 0.4, 4) : connector.widthMeters, offsetFraction: patch.offsetFraction !== undefined ? clamp01(patch.offsetFraction) : connector.offsetFraction }
              }),
            }
          }))
          return { rooms, partitions: normalizePartitions(rooms, state.partitions) }
        })
        get().runValidation()
      },

      addPartition: (roomId, kind, orientation) => {
        const room = get().rooms.find(item => item.id === roomId)
        if (!room) return
        set(state => ({ partitions: normalizePartitions(state.rooms, [...state.partitions, defaultPartitionForRoom(room, kind, orientation)]) }))
      },

      updatePartition: (id, patch) => set(state => ({ partitions: normalizePartitions(state.rooms, state.partitions.map(partition => partition.id === id ? { ...partition, ...patch } : partition)) })),
      deletePartition: id => set(state => ({ partitions: state.partitions.filter(partition => partition.id !== id), selectedPartitionId: state.selectedPartitionId === id ? null : state.selectedPartitionId })),

      deleteRoom: (id) => {
        set(state => {
          const rooms = syncRoomConnectors(state.rooms.filter(room => room.id !== id))
          return { rooms, partitions: normalizePartitions(rooms, state.partitions.filter(partition => partition.roomId !== id)), connections: state.connections.filter(connection => connection.roomAId !== id && connection.roomBId !== id), selectedRoomId: state.selectedRoomId === id ? null : state.selectedRoomId, selectedPartitionId: null }
        })
        get().runValidation()
      },

      selectRoom: id => set({ selectedRoomId: id, selectedPartitionId: null }),
      selectPartition: id => set({ selectedPartitionId: id }),
      lockRoom: (id, locked) => set(state => ({ rooms: state.rooms.map(room => room.id === id ? { ...room, locked } : room) })),
      addLevel: () => set(state => { const next = state.levels.length; return { levels: [...state.levels, { index: next, label: next === 1 ? 'First Floor' : next === 2 ? 'Second Floor' : `Level ${next}`, floorHeightMeters: next * 3, visible: true }] } }),
      removeLevel: index => {
        set(state => {
          const rooms = syncRoomConnectors(state.rooms.filter(room => room.level !== index))
          return { levels: state.levels.filter(level => level.index !== index), rooms, partitions: normalizePartitions(rooms, state.partitions.filter(partition => partition.level !== index)), connections: state.connections.filter(connection => { const roomA = state.rooms.find(room => room.id === connection.roomAId); const roomB = state.rooms.find(room => room.id === connection.roomBId); return roomA?.level !== index && roomB?.level !== index }), activeLevel: state.activeLevel === index ? 0 : state.activeLevel }
        })
        get().runValidation()
      },
      setLevelVisibility: (index, visible) => set(state => ({ levels: state.levels.map(level => level.index === index ? { ...level, visible } : level) })),
      setActiveLevel: index => set({ activeLevel: index }),
      addConnection: (roomAId, connectorAId, roomBId, connectorBId) => { set(state => ({ connections: [...state.connections, { id: uuid(), roomAId, connectorAId, roomBId, connectorBId, validated: false, issues: [] }] })); get().runValidation() },
      removeConnection: id => { set(state => ({ connections: state.connections.filter(connection => connection.id !== id) })); get().runValidation() },
      setRoomMaterial: (roomId, slot, materialId) => set(state => ({ rooms: state.rooms.map(room => room.id === roomId ? { ...room, materialSlots: { ...room.materialSlots, [slot]: materialId } } : room) })),
      setGlobalMaterial: (slot, materialId) => set(state => ({ globalMaterials: { ...state.globalMaterials, [slot]: materialId } })),
      setActiveView: view => set({ activeView: view }),
      setShowSystemsOverlay: show => set({ showSystemsOverlay: show }),
      runValidation: () => { const { rooms, connections } = get(); set({ validation: validateDesign(rooms, connections) }) },
      exportDesign: () => {
        const state = get()
        const sqM = state.rooms.reduce((sum, room) => sum + room.dims.x * room.dims.y, 0)
        return { id: state.designId, name: state.designName, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), levels: state.levels, rooms: state.rooms, partitions: state.partitions, connections: state.connections, globalMaterials: state.globalMaterials, metadata: { totalSqM: Math.round(sqM * 100) / 100, totalSqFt: Math.round(sqM * 10.7639 * 100) / 100, roomCount: state.rooms.length, levelCount: state.levels.length } }
      },
      importDesign: design => {
        const rooms = syncRoomConnectors(design.rooms)
        set({ designId: design.id, designName: design.name, levels: design.levels, rooms, partitions: normalizePartitions(rooms, design.partitions ?? []), connections: design.connections, globalMaterials: design.globalMaterials, activeLevel: 0, selectedRoomId: null, selectedPartitionId: null, validation: null })
        get().runValidation()
      },
      resetDesign: () => set({ designId: uuid(), designName: 'New Design', levels: defaultLevels(), rooms: [], partitions: [], connections: [], globalMaterials: emptySlots(), activeLevel: 0, selectedRoomId: null, selectedPartitionId: null, validation: null }),
      setDesignName: name => set({ designName: name }),
    }),
    { partialize: state => ({ rooms: state.rooms, partitions: state.partitions, connections: state.connections, levels: state.levels, globalMaterials: state.globalMaterials }), limit: 50 },
  ),
)

export const useUndo = () => useDesignStore.temporal.getState().undo
export const useRedo = () => useDesignStore.temporal.getState().redo
export const useCanUndo = () => useDesignStore.temporal.getState().pastStates.length > 0
export const useCanRedo = () => useDesignStore.temporal.getState().futureStates.length > 0

