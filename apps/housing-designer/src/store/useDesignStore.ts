import { create } from 'zustand'
import { temporal } from 'zundo'
import { v4 as uuid } from 'uuid'
import type {
  PlacedRoom, RoomConnection, DesignLevel, Design,
  MaterialSlotKey, ValidationResult, SyncState, Rotation
} from '@uniphimedia/shared-types'
import { getRoomModule } from '@uniphimedia/room-modules'
import { validateDesign } from '@uniphimedia/systems-engine'

// ─── Default material slots ───────────────────────────────────────────────────
const emptySlots = (): Record<MaterialSlotKey, string | null> => ({
  floor: null, ceiling: null,
  wall_n: null, wall_s: null, wall_e: null, wall_w: null,
  exterior: null, roof: null, trim: null,
  cabinet: null, countertop: null, fixture: null,
})

// ─── State shape ──────────────────────────────────────────────────────────────
export interface DesignState {
  // Design data
  designId: string
  designName: string
  levels: DesignLevel[]
  rooms: PlacedRoom[]
  connections: RoomConnection[]
  globalMaterials: Record<MaterialSlotKey, string | null>

  // UI state
  activeLevel: number
  selectedRoomId: string | null
  activeView: 'floor' | 'shell' | 'interior'
  showSystemsOverlay: boolean

  // Validation
  validation: ValidationResult | null

  // Sync
  sync: SyncState

  // ── Actions ────────────────────────────────────────────────────────────────

  // Room CRUD
  addRoom: (moduleType: string, gridX: number, gridY: number) => string
  moveRoom: (id: string, gridX: number, gridY: number) => void
  rotateRoom: (id: string) => void
  resizeRoom: (id: string, gridW: number, gridH: number) => void
  deleteRoom: (id: string) => void
  selectRoom: (id: string | null) => void
  lockRoom: (id: string, locked: boolean) => void

  // Levels
  addLevel: () => void
  removeLevel: (index: number) => void
  setLevelVisibility: (index: number, visible: boolean) => void
  setActiveLevel: (index: number) => void

  // Connections
  addConnection: (roomAId: string, connectorAId: string, roomBId: string, connectorBId: string) => void
  removeConnection: (id: string) => void

  // Materials
  setRoomMaterial: (roomId: string, slot: MaterialSlotKey, materialId: string | null) => void
  setGlobalMaterial: (slot: MaterialSlotKey, materialId: string | null) => void

  // View
  setActiveView: (view: 'floor' | 'shell' | 'interior') => void
  setShowSystemsOverlay: (show: boolean) => void

  // Validation
  runValidation: () => void

  // Design I/O
  exportDesign: () => Design
  importDesign: (design: Design) => void
  resetDesign: () => void
  setDesignName: (name: string) => void
}

// ─── Default levels ───────────────────────────────────────────────────────────
const defaultLevels = (): DesignLevel[] => [
  { index: 0, label: 'Ground Floor', floorHeightMeters: 0, visible: true },
]

// ─── Store ────────────────────────────────────────────────────────────────────
export const useDesignStore = create<DesignState>()(
  temporal(
    (set, get) => ({
      // ── Initial state ────────────────────────────────────────────────────
      designId: uuid(),
      designName: 'New Design',
      levels: defaultLevels(),
      rooms: [],
      connections: [],
      globalMaterials: emptySlots(),
      activeLevel: 0,
      selectedRoomId: null,
      activeView: 'floor',
      showSystemsOverlay: false,
      validation: null,
      sync: { status: 'idle', lastSyncedAt: null, pendingOps: 0, error: null },

      // ── Room CRUD ────────────────────────────────────────────────────────
      addRoom: (moduleType, gridX, gridY) => {
        const mod = getRoomModule(moduleType)
        const id = uuid()
        const room: PlacedRoom = {
          id,
          moduleType: mod.type,
          gridX, gridY,
          gridW: mod.gridW,
          gridH: mod.gridH,
          level: get().activeLevel,
          rotation: 0,
          dims: { ...mod.defaultDims },
          materialSlots: emptySlots(),
          locked: false,
        }
        set(s => ({ rooms: [...s.rooms, room] }))
        get().runValidation()
        return id
      },

      moveRoom: (id, gridX, gridY) => {
        set(s => ({
          rooms: s.rooms.map(r =>
            r.id === id && !r.locked ? { ...r, gridX, gridY } : r
          ),
        }))
        get().runValidation()
      },

      rotateRoom: (id) => {
        set(s => ({
          rooms: s.rooms.map(r => {
            if (r.id !== id || r.locked) return r
            const next: Rotation = ((r.rotation + 90) % 360) as Rotation
            // Swap gridW/gridH on 90/270 rotation
            const swap = next === 90 || next === 270
            return {
              ...r,
              rotation: next,
              gridW: swap ? r.gridH : r.gridW,
              gridH: swap ? r.gridW : r.gridH,
            }
          }),
        }))
        get().runValidation()
      },

      resizeRoom: (id, gridW, gridH) => {
        set(s => ({
          rooms: s.rooms.map(r => {
            if (r.id !== id || r.locked) return r
            const mod = getRoomModule(r.moduleType)
            const GRID = 0.5
            return {
              ...r,
              gridW, gridH,
              dims: {
                x: Math.max(mod.minDims.x, Math.min(mod.maxDims.x, gridW * GRID)),
                y: Math.max(mod.minDims.y, Math.min(mod.maxDims.y, gridH * GRID)),
                z: r.dims.z,
              },
            }
          }),
        }))
        get().runValidation()
      },

      deleteRoom: (id) => {
        set(s => ({
          rooms: s.rooms.filter(r => r.id !== id),
          connections: s.connections.filter(c => c.roomAId !== id && c.roomBId !== id),
          selectedRoomId: s.selectedRoomId === id ? null : s.selectedRoomId,
        }))
        get().runValidation()
      },

      selectRoom: (id) => set({ selectedRoomId: id }),
      lockRoom: (id, locked) => set(s => ({
        rooms: s.rooms.map(r => r.id === id ? { ...r, locked } : r),
      })),

      // ── Levels ───────────────────────────────────────────────────────────
      addLevel: () => {
        set(s => {
          const next = s.levels.length
          return {
            levels: [...s.levels, {
              index: next,
              label: next === 1 ? 'First Floor' : next === 2 ? 'Second Floor' : `Level ${next}`,
              floorHeightMeters: next * 3.0,
              visible: true,
            }],
          }
        })
      },

      removeLevel: (index) => {
        set(s => ({
          levels: s.levels.filter(l => l.index !== index),
          rooms: s.rooms.filter(r => r.level !== index),
          connections: s.connections.filter(c => {
            const ra = s.rooms.find(r => r.id === c.roomAId)
            const rb = s.rooms.find(r => r.id === c.roomBId)
            return ra?.level !== index && rb?.level !== index
          }),
          activeLevel: s.activeLevel === index ? 0 : s.activeLevel,
        }))
        get().runValidation()
      },

      setLevelVisibility: (index, visible) => {
        set(s => ({
          levels: s.levels.map(l => l.index === index ? { ...l, visible } : l),
        }))
      },

      setActiveLevel: (index) => set({ activeLevel: index }),

      // ── Connections ───────────────────────────────────────────────────────
      addConnection: (roomAId, connectorAId, roomBId, connectorBId) => {
        const conn: RoomConnection = {
          id: uuid(),
          roomAId, connectorAId, roomBId, connectorBId,
          validated: false, issues: [],
        }
        set(s => ({ connections: [...s.connections, conn] }))
        get().runValidation()
      },

      removeConnection: (id) => {
        set(s => ({ connections: s.connections.filter(c => c.id !== id) }))
        get().runValidation()
      },

      // ── Materials ─────────────────────────────────────────────────────────
      setRoomMaterial: (roomId, slot, materialId) => {
        set(s => ({
          rooms: s.rooms.map(r =>
            r.id === roomId
              ? { ...r, materialSlots: { ...r.materialSlots, [slot]: materialId } }
              : r
          ),
        }))
      },

      setGlobalMaterial: (slot, materialId) => {
        set(s => ({ globalMaterials: { ...s.globalMaterials, [slot]: materialId } }))
      },

      // ── View ──────────────────────────────────────────────────────────────
      setActiveView: (view) => set({ activeView: view }),
      setShowSystemsOverlay: (show) => set({ showSystemsOverlay: show }),

      // ── Validation ────────────────────────────────────────────────────────
      runValidation: () => {
        const { rooms, connections } = get()
        const result = validateDesign(rooms, connections)
        set({ validation: result })
      },

      // ── Design I/O ────────────────────────────────────────────────────────
      exportDesign: (): Design => {
        const s = get()
        const sqM = s.rooms.reduce((sum, r) => sum + r.dims.x * r.dims.y, 0)
        return {
          id: s.designId,
          name: s.designName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          levels: s.levels,
          rooms: s.rooms,
          connections: s.connections,
          globalMaterials: s.globalMaterials,
          metadata: {
            totalSqM: Math.round(sqM * 100) / 100,
            totalSqFt: Math.round(sqM * 10.7639 * 100) / 100,
            roomCount: s.rooms.length,
            levelCount: s.levels.length,
          },
        }
      },

      importDesign: (design) => {
        set({
          designId: design.id,
          designName: design.name,
          levels: design.levels,
          rooms: design.rooms,
          connections: design.connections,
          globalMaterials: design.globalMaterials,
          activeLevel: 0,
          selectedRoomId: null,
          validation: null,
        })
        get().runValidation()
      },

      resetDesign: () => {
        set({
          designId: uuid(),
          designName: 'New Design',
          levels: defaultLevels(),
          rooms: [],
          connections: [],
          globalMaterials: emptySlots(),
          activeLevel: 0,
          selectedRoomId: null,
          validation: null,
        })
      },

      setDesignName: (name) => set({ designName: name }),
    }),
    // zundo temporal config — only track design data, not UI state
    {
      partialize: (s) => ({
        rooms: s.rooms,
        connections: s.connections,
        levels: s.levels,
        globalMaterials: s.globalMaterials,
      }),
      limit: 50,
    }
  )
)

// ─── Undo/redo hooks ──────────────────────────────────────────────────────────
export const useUndo = () => useDesignStore.temporal.getState().undo
export const useRedo = () => useDesignStore.temporal.getState().redo
export const useCanUndo = () => useDesignStore.temporal(s => s.pastStates.length > 0)
export const useCanRedo = () => useDesignStore.temporal(s => s.futureStates.length > 0)
