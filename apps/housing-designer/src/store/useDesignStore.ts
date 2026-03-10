import { create } from 'zustand'

export interface PlacedRoom {
  id: string
  moduleId: string
  level: number
  x: number
  z: number
  rotation: 0 | 90 | 180 | 270
}

export interface DesignState {
  rooms: PlacedRoom[]
  activeLevel: number
  addRoom: (room: PlacedRoom) => void
  removeRoom: (id: string) => void
  moveRoom: (id: string, x: number, z: number) => void
  rotateRoom: (id: string, rotation: PlacedRoom['rotation']) => void
  setActiveLevel: (level: number) => void
}

export const useDesignStore = create<DesignState>((set) => ({
  rooms: [],
  activeLevel: 1,
  addRoom: (room) => set((s) => ({ rooms: [...s.rooms, room] })),
  removeRoom: (id) => set((s) => ({ rooms: s.rooms.filter(r => r.id !== id) })),
  moveRoom: (id, x, z) => set((s) => ({
    rooms: s.rooms.map(r => r.id === id ? { ...r, x, z } : r)
  })),
  rotateRoom: (id, rotation) => set((s) => ({
    rooms: s.rooms.map(r => r.id === id ? { ...r, rotation } : r)
  })),
  setActiveLevel: (level) => set({ activeLevel: level }),
}))