import React, { useCallback, useState, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback,
  Dimensions, StyleSheet, Platform,
} from 'react-native'
import { Canvas, Rect, RoundedRect, Circle, Group, Paint, Skia } from '@shopify/react-native-skia'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import { useDesignStore } from '../../store/useDesignStore'
import { getRoomModule, ROOM_GROUPS } from '@uniphimedia/room-modules'
import { findSnap } from '@uniphimedia/systems-engine'
import type { PlacedRoom } from '@uniphimedia/shared-types'

const CELL = 28          // px per grid unit
const GRID_COLS = 30
const GRID_ROWS = 24

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  }
}

export default function FloorPlanScreen() {
  const {
    rooms, levels, activeLevel,
    selectedRoomId, validation,
    addRoom, moveRoom, rotateRoom, deleteRoom, selectRoom,
    setActiveLevel, addLevel,
  } = useDesignStore()

  const [placingType, setPlacingType] = useState<string | null>(null)
  const [dragState, setDragState] = useState<{ id: string; startGridX: number; startGridY: number } | null>(null)
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null)
  const [snapActive, setSnapActive] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  const levelRooms = rooms.filter(r => r.level === activeLevel)
  const selectedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null

  const toGrid = (px: number) => Math.floor(px / CELL)

  // Long press to start drag
  const longPress = Gesture.LongPress()
    .minDuration(400)
    .onStart((e) => {
      const gx = toGrid(e.x)
      const gy = toGrid(e.y)
      const hit = levelRooms.find(r =>
        gx >= r.gridX && gx < r.gridX + r.gridW &&
        gy >= r.gridY && gy < r.gridY + r.gridH
      )
      if (hit && !hit.locked) {
        selectRoom(hit.id)
        setDragState({ id: hit.id, startGridX: gx - hit.gridX, startGridY: gy - hit.gridY })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }
    })

  // Pan to drag room
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!dragState) return
      const newX = Math.max(0, toGrid(e.x) - dragState.startGridX)
      const newY = Math.max(0, toGrid(e.y) - dragState.startGridY)
      setGhostPos({ x: newX, y: newY })
      const room = rooms.find(r => r.id === dragState.id)
      if (room) {
        const ghost = { ...room, gridX: newX, gridY: newY }
        const snap = findSnap(ghost, rooms)
        setSnapActive(!!snap?.matched)
      }
    })
    .onEnd((e) => {
      if (!dragState || !ghostPos) return
      moveRoom(dragState.id, ghostPos.x, ghostPos.y)
      setDragState(null)
      setGhostPos(null)
      setSnapActive(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    })

  // Tap to select / place
  const tap = Gesture.Tap()
    .onEnd((e) => {
      const gx = toGrid(e.x)
      const gy = toGrid(e.y)
      if (placingType) {
        addRoom(placingType, gx, gy)
        setPlacingType(null)
        setGhostPos(null)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        return
      }
      const hit = levelRooms.find(r =>
        gx >= r.gridX && gx < r.gridX + r.gridW &&
        gy >= r.gridY && gy < r.gridY + r.gridH
      )
      selectRoom(hit?.id ?? null)
    })

  const composed = Gesture.Simultaneous(longPress, Gesture.Race(pan, tap))

  const errorCount = validation?.issues.filter(i => i.severity === 'error').length ?? 0
  const warnCount  = validation?.issues.filter(i => i.severity === 'warning').length ?? 0

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ flex: 1 }}>

        {/* Validation bar */}
        {(errorCount > 0 || warnCount > 0) && (
          <View style={{ flexDirection: 'row', gap: 8, padding: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
            {errorCount > 0 && <View style={styles.badge('error')}><Text style={styles.badgeText('error')}>{errorCount} error{errorCount > 1 ? 's' : ''}</Text></View>}
            {warnCount > 0  && <View style={styles.badge('warn')}><Text style={styles.badgeText('warn')}>{warnCount} warning{warnCount > 1 ? 's' : ''}</Text></View>}
          </View>
        )}

        {/* Canvas */}
        <ScrollView horizontal style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <GestureDetector gesture={composed}>
              <Canvas style={{ width: GRID_COLS * CELL, height: GRID_ROWS * CELL }}>

                {/* Grid lines */}
                {Array.from({ length: GRID_COLS + 1 }).map((_, i) => (
                  <React.Fragment key={`vl-${i}`}>
                    <Rect x={i * CELL} y={0} width={0.5} height={GRID_ROWS * CELL}>
                      <Paint color="#E5E7EB" />
                    </Rect>
                  </React.Fragment>
                ))}
                {Array.from({ length: GRID_ROWS + 1 }).map((_, i) => (
                  <React.Fragment key={`hl-${i}`}>
                    <Rect x={0} y={i * CELL} width={GRID_COLS * CELL} height={0.5}>
                      <Paint color="#E5E7EB" />
                    </Rect>
                  </React.Fragment>
                ))}

                {/* Rooms */}
                {levelRooms.map(room => {
                  const mod = getRoomModule(room.moduleType)
                  const x = room.gridX * CELL, y = room.gridY * CELL
                  const w = room.gridW * CELL, h = room.gridH * CELL
                  const selected = room.id === selectedRoomId
                  const color = selected ? '#3B82F6' : mod.color
                  const hasError = validation?.issues.some(
                    i => i.severity === 'error' && i.affectedRoomIds.includes(room.id)
                  )
                  return (
                    <Group key={room.id} transform={[
                      { translateX: x + w / 2 }, { translateY: y + h / 2 },
                      { rotate: (room.rotation * Math.PI) / 180 },
                      { translateX: -(w / 2) }, { translateY: -(h / 2) },
                    ]}>
                      <RoundedRect x={1} y={1} width={w - 2} height={h - 2} r={4} color={color} opacity={0.85} />
                      <RoundedRect x={1} y={1} width={w - 2} height={h - 2} r={4}
                        color={hasError ? '#EF4444' : selected ? '#1D4ED8' : '#9CA3AF'}
                        style="stroke" strokeWidth={selected ? 2.5 : hasError ? 2 : 1} />
                    </Group>
                  )
                })}

                {/* Ghost while placing */}
                {placingType && ghostPos && (() => {
                  const mod = getRoomModule(placingType)
                  return (
                    <RoundedRect
                      x={ghostPos.x * CELL} y={ghostPos.y * CELL}
                      width={mod.gridW * CELL} height={mod.gridH * CELL}
                      r={4} color={mod.color} opacity={0.4}
                      style="stroke" strokeWidth={2}
                    />
                  )
                })()}

                {/* Ghost while dragging */}
                {dragState && ghostPos && (() => {
                  const room = rooms.find(r => r.id === dragState.id)
                  if (!room) return null
                  return (
                    <RoundedRect
                      x={ghostPos.x * CELL} y={ghostPos.y * CELL}
                      width={room.gridW * CELL} height={room.gridH * CELL}
                      r={4} color={snapActive ? '#22C55E' : '#6B7280'} opacity={0.35}
                      style="stroke" strokeWidth={2}
                    />
                  )
                })()}

              </Canvas>
            </GestureDetector>
          </ScrollView>
        </ScrollView>

        {/* Selected room actions */}
        {selectedRoom && (
          <View style={styles.actionBar}>
            <Text style={styles.actionLabel}>{getRoomModule(selectedRoom.moduleType).label}</Text>
            <TouchableOpacity onPress={() => rotateRoom(selectedRoom.id)} style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Rotate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteRoom(selectedRoom.id)} style={[styles.actionBtn, { borderColor: '#FCA5A5' }]}>
              <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Level tabs */}
        <View style={styles.levelBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: 12, alignItems: 'center' }}>
            {levels.map(l => (
              <TouchableOpacity key={l.index} onPress={() => setActiveLevel(l.index)}
                style={[styles.levelTab, l.index === activeLevel && styles.levelTabActive]}>
                <Text style={[styles.levelTabText, l.index === activeLevel && styles.levelTabTextActive]}>{l.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={addLevel} style={styles.addLevelBtn}>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>+ Floor</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Room palette FAB */}
        <TouchableOpacity
          onPress={() => setPanelOpen(!panelOpen)}
          style={styles.fab}
        >
          <Text style={{ color: '#fff', fontSize: 22 }}>{panelOpen ? '✕' : '+'}</Text>
        </TouchableOpacity>

        {/* Room panel */}
        {panelOpen && (
          <View style={styles.roomPanel}>
            <ScrollView>
              {Object.entries(ROOM_GROUPS).map(([group, types]) => (
                <View key={group}>
                  <Text style={styles.groupLabel}>{group.toUpperCase()}</Text>
                  {types.map(type => {
                    const mod = getRoomModule(type)
                    return (
                      <TouchableOpacity
                        key={type}
                        onPress={() => { setPlacingType(type); setPanelOpen(false); Haptics.selectionAsync() }}
                        style={[styles.roomRow, placingType === type && styles.roomRowActive]}
                      >
                        <View style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: mod.color }} />
                        <Text style={styles.roomRowLabel}>{mod.label}</Text>
                        <Text style={styles.roomRowDims}>{mod.defaultDims.x}×{mod.defaultDims.y}m</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  )
}

const styles = {
  badge: (type: 'error' | 'warn') => ({
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3,
    backgroundColor: type === 'error' ? '#FEE2E2' : '#FEF9C3',
  }),
  badgeText: (type: 'error' | 'warn') => ({
    fontSize: 12, fontWeight: '600' as const,
    color: type === 'error' ? '#DC2626' : '#CA8A04',
  }),
  actionBar: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8,
    padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  actionLabel: { flex: 1, fontSize: 14, fontWeight: '600' as const, color: '#111827' },
  actionBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  actionBtnText: { fontSize: 13, color: '#374151', fontWeight: '500' as const },
  levelBar: {
    height: 44, backgroundColor: '#F9FAFB', borderTopWidth: 1, borderTopColor: '#E5E7EB',
    justifyContent: 'center' as const,
  },
  levelTab: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, backgroundColor: '#E5E7EB',
  },
  levelTabActive: { backgroundColor: '#3B82F6' },
  levelTabText: { fontSize: 13, color: '#374151', fontWeight: '400' as const },
  levelTabTextActive: { color: '#fff', fontWeight: '600' as const },
  addLevelBtn: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6,
    borderWidth: 1, borderColor: '#D1D5DB', borderStyle: 'dashed' as const,
  },
  fab: {
    position: 'absolute' as const, right: 20, bottom: 60,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#3B82F6', alignItems: 'center' as const, justifyContent: 'center' as const,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6,
    elevation: 4,
  },
  roomPanel: {
    position: 'absolute' as const, right: 16, bottom: 120,
    width: 220, maxHeight: 360, backgroundColor: '#fff',
    borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12,
    elevation: 6, overflow: 'hidden' as const,
  },
  groupLabel: {
    paddingHorizontal: 14, paddingTop: 10, paddingBottom: 4,
    fontSize: 10, fontWeight: '700' as const, color: '#9CA3AF', letterSpacing: 0.8,
  },
  roomRow: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: 10,
    paddingHorizontal: 14, paddingVertical: 9,
    borderLeftWidth: 3, borderLeftColor: 'transparent',
  },
  roomRowActive: { backgroundColor: '#EFF6FF', borderLeftColor: '#3B82F6' },
  roomRowLabel: { flex: 1, fontSize: 13, color: '#374151' },
  roomRowDims: { fontSize: 11, color: '#9CA3AF' },
}
