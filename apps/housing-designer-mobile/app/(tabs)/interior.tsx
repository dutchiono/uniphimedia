import React, { useState } from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useDesignStore } from '../../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import { MATERIALS, getMaterialsByCategory, MATERIAL_CATEGORIES, CATEGORY_LABELS } from '@uniphimedia/materials-library'
import type { MaterialCategory, MaterialSlotKey, PBRMaterial } from '@uniphimedia/shared-types'

const CATEGORY_SLOTS: Record<MaterialCategory, MaterialSlotKey[]> = {
  exterior_siding: ['exterior', 'wall_n', 'wall_s', 'wall_e', 'wall_w'],
  roofing: ['roof'],
  flooring: ['floor'],
  interior_wall: ['wall_n', 'wall_s', 'wall_e', 'wall_w', 'ceiling'],
  trim: ['trim'],
  kitchen: ['cabinet', 'countertop', 'floor'],
  bathroom: ['fixture', 'wall_n', 'wall_s', 'floor'],
}

function PBRRow({ label, value, trackColor }: { label: string; value: number; trackColor: string }) {
  return (
    <View style={{ marginBottom: 3 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 9, color: '#9CA3AF' }}>{label}</Text>
        <Text style={{ fontSize: 9, color: '#9CA3AF' }}>{value.toFixed(2)}</Text>
      </View>
      <View style={{ height: 3, backgroundColor: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
        <View style={{ width: `${value * 100}%`, height: '100%', backgroundColor: trackColor, borderRadius: 2 }} />
      </View>
    </View>
  )
}

function SwatchCard({ material, applied, onPress }: { material: PBRMaterial; applied: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.swatch, applied && s.swatchApplied]} activeOpacity={0.7}>
      <View style={[s.swatchColor, { backgroundColor: material.albedo }]}>
        {material.metallic > 0.5 && (
          <View style={s.metallicDot} />
        )}
        {applied && (
          <View style={s.appliedBadge}>
            <Text style={{ color: '#fff', fontSize: 9, fontWeight: '700' }}>✓</Text>
          </View>
        )}
      </View>
      <View style={s.swatchInfo}>
        <Text style={s.swatchName} numberOfLines={2}>{material.name}</Text>
        <PBRRow label="R" value={material.roughness} trackColor="#6B7280" />
        <PBRRow label="M" value={material.metallic} trackColor="#F59E0B" />
      </View>
    </TouchableOpacity>
  )
}

export default function InteriorScreen() {
  const { rooms, selectedRoomId, globalMaterials, activeLevel, setRoomMaterial, setGlobalMaterial, selectRoom } = useDesignStore()
  const [activeCategory, setActiveCategory] = useState<MaterialCategory>('flooring')
  const [applyMode, setApplyMode] = useState<'room' | 'global'>('room')
  const [search, setSearch] = useState('')

  const selectedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null
  const levelRooms = rooms.filter(r => r.level === activeLevel)
  const slots = CATEGORY_SLOTS[activeCategory] ?? []

  const filteredMaterials = getMaterialsByCategory(activeCategory).filter(m =>
    !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  function applyMaterial(id: string) {
    if (applyMode === 'global') {
      slots.forEach(slot => setGlobalMaterial(slot, id))
    } else if (selectedRoom) {
      slots.forEach(slot => setRoomMaterial(selectedRoom.id, slot, id))
    }
  }

  function isApplied(id: string) {
    if (applyMode === 'global') return slots.some(s => globalMaterials[s] === id)
    if (!selectedRoom) return false
    return slots.some(s => selectedRoom.materialSlots[s] === id)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>

      {/* Category tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catBar}>
        {MATERIAL_CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)}
            style={[s.catTab, activeCategory === cat && s.catTabActive]}>
            <Text style={[s.catTabText, activeCategory === cat && s.catTabTextActive]}>
              {CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ flex: 1, flexDirection: 'row' }}>

        {/* Left: Room selector */}
        <View style={s.roomSidebar}>
          <TouchableOpacity
            onPress={() => { setApplyMode('global'); selectRoom(null) }}
            style={[s.roomItem, applyMode === 'global' && s.roomItemActive]}
          >
            <Text style={[s.roomItemText, applyMode === 'global' && s.roomItemTextActive]} numberOfLines={2}>
              All Rooms
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {levelRooms.map(room => {
              const mod = getRoomModule(room.moduleType)
              const active = applyMode === 'room' && room.id === selectedRoomId
              return (
                <TouchableOpacity key={room.id}
                  onPress={() => { selectRoom(room.id); setApplyMode('room') }}
                  style={[s.roomItem, active && s.roomItemActive]}
                >
                  <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: mod.color, marginBottom: 3 }} />
                  <Text style={[s.roomItemText, active && s.roomItemTextActive]} numberOfLines={2}>
                    {mod.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Right: Material grid */}
        <View style={{ flex: 1 }}>
          {/* Search */}
          <View style={s.searchBar}>
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={s.searchInput}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* No selection hint */}
          {applyMode === 'room' && !selectedRoom && (
            <View style={s.hint}>
              <Text style={s.hintText}>Select a room on the left to apply materials</Text>
            </View>
          )}

          <FlatList
            data={filteredMaterials}
            keyExtractor={m => m.id}
            numColumns={2}
            contentContainerStyle={{ padding: 10, gap: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <SwatchCard
                material={item}
                applied={isApplied(item.id)}
                onPress={() => applyMaterial(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 32 }}>No materials found</Text>
            }
          />
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  catBar: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexGrow: 0 },
  catTab: { paddingHorizontal: 14, paddingVertical: 11, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  catTabActive: { borderBottomColor: '#3B82F6' },
  catTabText: { fontSize: 13, color: '#6B7280', fontWeight: '400' },
  catTabTextActive: { color: '#2563EB', fontWeight: '600' },
  roomSidebar: { width: 72, backgroundColor: '#F3F4F6', borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  roomItem: { padding: 8, alignItems: 'center', borderLeftWidth: 3, borderLeftColor: 'transparent', minHeight: 52, justifyContent: 'center' },
  roomItemActive: { backgroundColor: '#EFF6FF', borderLeftColor: '#3B82F6' },
  roomItemText: { fontSize: 10, color: '#6B7280', textAlign: 'center', fontWeight: '400' },
  roomItemTextActive: { color: '#2563EB', fontWeight: '600' },
  searchBar: { padding: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  searchInput: { backgroundColor: '#F9FAFB', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7, fontSize: 13, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827' },
  hint: { padding: 16, alignItems: 'center' },
  hintText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
  swatch: { flex: 1, borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff', borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  swatchApplied: { borderColor: '#22C55E' },
  swatchColor: { height: 52, position: 'relative' },
  metallicDot: { position: 'absolute', top: 4, right: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.55)', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  appliedBadge: { position: 'absolute', top: 4, left: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  swatchInfo: { padding: 7 },
  swatchName: { fontSize: 11, fontWeight: '600', color: '#111827', marginBottom: 4, lineHeight: 14 },
})