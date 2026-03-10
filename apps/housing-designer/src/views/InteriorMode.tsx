import { useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import {
  MATERIALS, getMaterialsByCategory,
  MATERIAL_CATEGORIES, CATEGORY_LABELS,
} from '@uniphimedia/materials-library'
import type { MaterialCategory, MaterialSlotKey, PBRMaterial } from '@uniphimedia/shared-types'

// Which material slots are relevant per category
const CATEGORY_SLOTS: Record<MaterialCategory, MaterialSlotKey[]> = {
  exterior_siding: ['exterior', 'wall_n', 'wall_s', 'wall_e', 'wall_w'],
  roofing:         ['roof'],
  flooring:        ['floor'],
  interior_wall:   ['wall_n', 'wall_s', 'wall_e', 'wall_w', 'ceiling'],
  trim:            ['trim'],
  kitchen:         ['cabinet', 'countertop', 'floor'],
  bathroom:        ['fixture', 'wall_n', 'wall_s', 'floor'],
}

// PBR property bar visual
function PBRBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}>
        <span>{label}</span><span>{value.toFixed(2)}</span>
      </div>
      <div style={{ height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${value * 100}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
    </div>
  )
}

// Swatch card for a single material
function MaterialSwatch({
  material, selected, applied, onClick,
}: {
  material: PBRMaterial
  selected: boolean
  applied: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      title={material.description}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch',
        border: selected ? '2px solid #3B82F6' : '2px solid transparent',
        borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
        background: selected ? '#EFF6FF' : '#fff',
        boxShadow: selected ? '0 0 0 1px #93C5FD' : '0 1px 3px rgba(0,0,0,0.08)',
        padding: 0, transition: 'all 0.12s',
        position: 'relative',
      }}
    >
      {/* Color preview */}
      <div style={{
        height: 52, background: material.albedo,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {material.metallic > 0.5 && (
          <div style={{
            position: 'absolute', top: 4, right: 4,
            width: 14, height: 14, borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
          }} />
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '6px 8px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#111827', marginBottom: 3, lineHeight: 1.2 }}>
          {material.name}
        </div>
        <PBRBar label="R" value={material.roughness} color="#6B7280" />
        <PBRBar label="M" value={material.metallic} color="#F59E0B" />
      </div>
      {applied && (
        <div style={{
          position: 'absolute', top: 4, left: 4,
          background: '#22C55E', borderRadius: '50%',
          width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, color: '#fff', fontWeight: 700,
        }}>✓</div>
      )}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function InteriorMode() {
  const {
    rooms, selectedRoomId, globalMaterials,
    setRoomMaterial, setGlobalMaterial, selectRoom,
    activeLevel,
  } = useDesignStore()

  const [activeCategory, setActiveCategory] = useState<MaterialCategory>('flooring')
  const [activeSlot, setActiveSlot] = useState<MaterialSlotKey>('floor')
  const [applyMode, setApplyMode] = useState<'room' | 'global'>('room')
  const [searchQuery, setSearchQuery] = useState('')

  const selectedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null
  const levelRooms = rooms.filter(r => r.level === activeLevel)

  const categoryMaterials = getMaterialsByCategory(activeCategory).filter(m =>
    !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const slots = CATEGORY_SLOTS[activeCategory] ?? []

  function applyMaterial(materialId: string) {
    if (applyMode === 'global') {
      for (const slot of slots) {
        setGlobalMaterial(slot, materialId)
      }
    } else if (selectedRoom) {
      for (const slot of slots) {
        setRoomMaterial(selectedRoom.id, slot, materialId)
      }
    }
  }

  function isApplied(materialId: string): boolean {
    if (applyMode === 'global') {
      return slots.some(s => globalMaterials[s] === materialId)
    }
    if (!selectedRoom) return false
    return slots.some(s => selectedRoom.materialSlots[s] === materialId)
  }

  function getAppliedMaterial(slot: MaterialSlotKey): PBRMaterial | null {
    const id = applyMode === 'global'
      ? globalMaterials[slot]
      : selectedRoom?.materialSlots[slot] ?? null
    return id ? MATERIALS.find(m => m.id === id) ?? null : null
  }

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* Left: Room list */}
      <div style={{ width: 180, background: '#F9FAFB', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apply To</div>
        </div>

        {/* Global toggle */}
        <button
          onClick={() => { setApplyMode('global'); selectRoom(null) }}
          style={{
            padding: '10px 14px', textAlign: 'left', border: 'none', cursor: 'pointer',
            background: applyMode === 'global' ? '#EFF6FF' : 'transparent',
            borderLeft: applyMode === 'global' ? '3px solid #3B82F6' : '3px solid transparent',
            fontSize: 13, fontWeight: applyMode === 'global' ? 600 : 400,
            color: applyMode === 'global' ? '#2563EB' : '#374151',
          }}
        >All Rooms (Global)</button>

        {/* Room list */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {levelRooms.map(room => {
            const mod = getRoomModule(room.moduleType)
            const active = applyMode === 'room' && room.id === selectedRoomId
            return (
              <button
                key={room.id}
                onClick={() => { selectRoom(room.id); setApplyMode('room') }}
                style={{
                  width: '100%', textAlign: 'left', padding: '9px 14px',
                  border: 'none', cursor: 'pointer',
                  background: active ? '#EFF6FF' : 'transparent',
                  borderLeft: active ? '3px solid #3B82F6' : '3px solid transparent',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: 2, background: mod.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#374151' }}>{mod.label}</span>
              </button>
            )
          })}
          {levelRooms.length === 0 && (
            <div style={{ padding: 14, fontSize: 12, color: '#9CA3AF' }}>No rooms on this level</div>
          )}
        </div>
      </div>

      {/* Center: Material grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Category tabs */}
        <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', overflowX: 'auto', background: '#fff' }}>
          {MATERIAL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                const newSlots = CATEGORY_SLOTS[cat]
                if (newSlots?.length) setActiveSlot(newSlots[0])
              }}
              style={{
                padding: '10px 16px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                background: 'transparent', fontSize: 13,
                color: activeCategory === cat ? '#2563EB' : '#6B7280',
                fontWeight: activeCategory === cat ? 600 : 400,
                borderBottom: activeCategory === cat ? '2px solid #3B82F6' : '2px solid transparent',
              }}
            >{CATEGORY_LABELS[cat]}</button>
          ))}
        </div>

        {/* Search + slot selector */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1, minWidth: 140, padding: '6px 10px', borderRadius: 6,
              border: '1px solid #D1D5DB', fontSize: 13, outline: 'none',
            }}
          />
          {slots.map(slot => (
            <button
              key={slot}
              onClick={() => setActiveSlot(slot)}
              style={{
                padding: '4px 10px', borderRadius: 6, border: '1px solid #E5E7EB',
                background: slot === activeSlot ? '#EFF6FF' : '#fff',
                color: slot === activeSlot ? '#2563EB' : '#6B7280',
                fontSize: 11, cursor: 'pointer', fontWeight: slot === activeSlot ? 600 : 400,
              }}
            >{slot}</button>
          ))}
        </div>

        {/* Material grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {categoryMaterials.length === 0 && (
            <div style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 32 }}>No materials found</div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
            {categoryMaterials.map(mat => (
              <MaterialSwatch
                key={mat.id}
                material={mat}
                selected={false}
                applied={isApplied(mat.id)}
                onClick={() => applyMaterial(mat.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Applied materials summary */}
      <div style={{ width: 200, background: '#F9FAFB', borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {applyMode === 'global' ? 'Global Finishes' : selectedRoom ? getRoomModule(selectedRoom.moduleType).label + ' Finishes' : 'No Room Selected'}
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: 12 }}>
          {(['floor','ceiling','wall_n','wall_s','wall_e','wall_w','exterior','roof','trim','cabinet','countertop','fixture'] as MaterialSlotKey[]).map(slot => {
            const mat = getAppliedMaterial(slot)
            if (!mat) return null
            return (
              <div key={slot} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{slot}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 4, background: mat.albedo, flexShrink: 0, border: '1px solid #E5E7EB' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{mat.name}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>R:{mat.roughness.toFixed(2)} M:{mat.metallic.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )
          })}
          {applyMode === 'room' && !selectedRoom && (
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>Select a room to see its finishes</div>
          )}
        </div>
      </div>
    </div>
  )
}
