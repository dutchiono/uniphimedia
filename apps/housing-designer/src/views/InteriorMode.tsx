import { useState } from 'react'
import { useDesignStore } from '../store/useDesignStore'
import { getRoomModule } from '@uniphimedia/room-modules'
import { MATERIALS, getMaterialsByCategory, MATERIAL_CATEGORIES, CATEGORY_LABELS } from '@uniphimedia/materials-library'
import type { MaterialCategory, MaterialSlotKey, PBRMaterial } from '@uniphimedia/shared-types'
import ModeFrame from '../components/ModeFrame'

const CATEGORY_SLOTS: Record<MaterialCategory, MaterialSlotKey[]> = {
  exterior_siding: ['exterior', 'wall_n', 'wall_s', 'wall_e', 'wall_w'],
  roofing: ['roof'],
  flooring: ['floor'],
  interior_wall: ['wall_n', 'wall_s', 'wall_e', 'wall_w', 'ceiling'],
  trim: ['trim'],
  kitchen: ['cabinet', 'countertop', 'floor'],
  bathroom: ['fixture', 'wall_n', 'wall_s', 'floor'],
}

function PBRBar({ label, value, color }: { label: string; value: number; color: string }) {
  return <div style={{ marginBottom: 4 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}><span>{label}</span><span>{value.toFixed(2)}</span></div><div style={{ height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}><div style={{ width: `${value * 100}%`, height: '100%', background: color, borderRadius: 2 }} /></div></div>
}

function MaterialSwatch({ material, applied, onClick }: { material: PBRMaterial; applied: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} title={material.description} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', border: applied ? '2px solid #2563EB' : '2px solid transparent', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: '#FFFFFF', boxShadow: applied ? '0 0 0 1px #93C5FD' : '0 1px 3px rgba(0,0,0,0.08)', padding: 0, position: 'relative' }}>
      <div style={{ height: 52, background: material.albedo, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
      <div style={{ padding: '6px 8px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#111827', marginBottom: 3, lineHeight: 1.2 }}>{material.name}</div>
        <PBRBar label="R" value={material.roughness} color="#6B7280" />
        <PBRBar label="M" value={material.metallic} color="#F59E0B" />
      </div>
      {applied && <div style={{ position: 'absolute', top: 4, left: 4, background: '#22C55E', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>OK</div>}
    </button>
  )
}

export default function InteriorMode() {
  const { rooms, selectedRoomId, globalMaterials, setRoomMaterial, setGlobalMaterial, selectRoom, activeLevel } = useDesignStore()
  const [activeCategory, setActiveCategory] = useState<MaterialCategory>('flooring')
  const [activeSlot, setActiveSlot] = useState<MaterialSlotKey>('floor')
  const [applyMode, setApplyMode] = useState<'room' | 'global'>('room')
  const [searchQuery, setSearchQuery] = useState('')

  const selectedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null
  const levelRooms = rooms.filter(r => r.level === activeLevel)
  const categoryMaterials = getMaterialsByCategory(activeCategory).filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  const slots = CATEGORY_SLOTS[activeCategory] ?? []

  function applyMaterial(materialId: string) {
    if (applyMode === 'global') {
      for (const slot of slots) setGlobalMaterial(slot, materialId)
    } else if (selectedRoom) {
      for (const slot of slots) setRoomMaterial(selectedRoom.id, slot, materialId)
    }
  }

  function isApplied(materialId: string): boolean {
    if (applyMode === 'global') return slots.some(s => globalMaterials[s] === materialId)
    if (!selectedRoom) return false
    return slots.some(s => selectedRoom.materialSlots[s] === materialId)
  }

  function getAppliedMaterial(slot: MaterialSlotKey): PBRMaterial | null {
    const id = applyMode === 'global' ? globalMaterials[slot] : selectedRoom?.materialSlots[slot] ?? null
    return id ? MATERIALS.find(m => m.id === id) ?? null : null
  }

  const left = (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}><div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Apply To</div></div>
      <button onClick={() => { setApplyMode('global'); selectRoom(null) }} style={{ padding: '10px 14px', textAlign: 'left', border: 'none', cursor: 'pointer', background: applyMode === 'global' ? '#EFF6FF' : 'transparent', borderLeft: applyMode === 'global' ? '3px solid #2563EB' : '3px solid transparent', fontSize: 13, fontWeight: applyMode === 'global' ? 700 : 500, color: applyMode === 'global' ? '#2563EB' : '#374151' }}>All Rooms</button>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {levelRooms.map(room => {
          const mod = getRoomModule(room.moduleType)
          const active = applyMode === 'room' && room.id === selectedRoomId
          return <button key={room.id} onClick={() => { selectRoom(room.id); setApplyMode('room') }} style={{ width: '100%', textAlign: 'left', padding: '9px 14px', border: 'none', cursor: 'pointer', background: active ? '#EFF6FF' : 'transparent', borderLeft: active ? '3px solid #2563EB' : '3px solid transparent', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: mod.color, flexShrink: 0 }} /><span style={{ fontSize: 12, color: '#374151' }}>{mod.label}</span></button>
        })}
      </div>
    </div>
  )

  const toolbar = (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {MATERIAL_CATEGORIES.map(cat => <button key={cat} onClick={() => { setActiveCategory(cat); if (CATEGORY_SLOTS[cat]?.length) setActiveSlot(CATEGORY_SLOTS[cat][0]) }} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1', background: activeCategory === cat ? '#2563EB' : '#FFFFFF', color: activeCategory === cat ? '#FFFFFF' : '#475569', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>{CATEGORY_LABELS[cat]}</button>)}
    </div>
  )

  const status = (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <input placeholder="Search materials" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ minWidth: 220, padding: '8px 10px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 13 }} />
      {slots.map(slot => <button key={slot} onClick={() => setActiveSlot(slot)} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #CBD5E1', background: slot === activeSlot ? '#EFF6FF' : '#FFFFFF', color: slot === activeSlot ? '#2563EB' : '#64748B', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{slot}</button>)}
    </div>
  )

  const main = (
    <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
      {categoryMaterials.length === 0 && <div style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 32 }}>No materials found</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
        {categoryMaterials.map(mat => <MaterialSwatch key={mat.id} material={mat} applied={isApplied(mat.id)} onClick={() => applyMaterial(mat.id)} />)}
      </div>
    </div>
  )

  const right = (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}><div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{applyMode === 'global' ? 'Global Finishes' : selectedRoom ? getRoomModule(selectedRoom.moduleType).label + ' Finishes' : 'No Room Selected'}</div></div>
      <div style={{ overflowY: 'auto', flex: 1, padding: 12 }}>
        {(['floor','ceiling','wall_n','wall_s','wall_e','wall_w','exterior','roof','trim','cabinet','countertop','fixture'] as MaterialSlotKey[]).map(slot => {
          const mat = getAppliedMaterial(slot)
          if (!mat) return null
          return <div key={slot} style={{ marginBottom: 10 }}><div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{slot}</div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 28, height: 28, borderRadius: 4, background: mat.albedo, flexShrink: 0, border: '1px solid #E5E7EB' }} /><div><div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{mat.name}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>R:{mat.roughness.toFixed(2)} M:{mat.metallic.toFixed(2)}</div></div></div></div>
        })}
      </div>
    </div>
  )

  return <ModeFrame title="Interior" description="Apply finish systems consistently across shells and room interiors using one material workflow." left={left} toolbar={toolbar} status={status} main={main} right={right} />
}
