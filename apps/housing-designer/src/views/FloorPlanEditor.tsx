import { useRef, useEffect, useCallback, useState } from 'react'
import { useDesignStore, useUndo, useRedo, useCanUndo, useCanRedo } from '../store/useDesignStore'
import { getRoomModule, getAllRoomTypes, ROOM_GROUPS } from '@uniphimedia/room-modules'
import { findSnap } from '@uniphimedia/systems-engine'
import type { PlacedRoom } from '@uniphimedia/shared-types'

const GRID = 40        // px per grid unit (0.5m)
const GRID_COLS = 40
const GRID_ROWS = 30

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toGrid(px: number) { return Math.floor(px / GRID) }
function toPx(g: number) { return g * GRID }

function roomColor(room: PlacedRoom, selected: boolean, hovered: boolean): string {
  const mod = getRoomModule(room.moduleType)
  if (selected) return '#3B82F6'
  if (hovered) return mod.color + 'DD'
  return mod.color
}

// ─── FloorPlanEditor ──────────────────────────────────────────────────────────
export default function FloorPlanEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    rooms, connections, levels, activeLevel,
    selectedRoomId, validation,
    addRoom, moveRoom, rotateRoom, deleteRoom, selectRoom,
    setActiveLevel, addLevel,
  } = useDesignStore()
  const undo = useUndo()
  const redo = useRedo()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number } | null>(null)
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null)
  const [snapResult, setSnapResult] = useState<ReturnType<typeof findSnap>>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [placingType, setPlacingType] = useState<string | null>(null)
  const [roomPanelOpen, setRoomPanelOpen] = useState(false)

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Grid
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= GRID_COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * GRID, 0); ctx.lineTo(x * GRID, GRID_ROWS * GRID); ctx.stroke()
    }
    for (let y = 0; y <= GRID_ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * GRID); ctx.lineTo(GRID_COLS * GRID, y * GRID); ctx.stroke()
    }

    // Rooms on active level
    const levelRooms = rooms.filter(r => r.level === activeLevel)
    for (const room of levelRooms) {
      const mod = getRoomModule(room.moduleType)
      const x = toPx(room.gridX), y = toPx(room.gridY)
      const w = toPx(room.gridW), h = toPx(room.gridH)
      const selected = room.id === selectedRoomId
      const hovered = room.id === hoveredId

      // Room fill
      ctx.save()
      ctx.translate(x + w / 2, y + h / 2)
      ctx.rotate((room.rotation * Math.PI) / 180)
      ctx.translate(-(w / 2), -(h / 2))

      ctx.fillStyle = roomColor(room, selected, hovered)
      ctx.strokeStyle = selected ? '#1D4ED8' : '#9CA3AF'
      ctx.lineWidth = selected ? 2.5 : 1
      ctx.beginPath()
      ctx.roundRect(1, 1, w - 2, h - 2, 4)
      ctx.fill()
      ctx.stroke()

      // Label
      ctx.fillStyle = selected ? '#fff' : '#1F2937'
      ctx.font = `bold ${Math.min(12, w / 4)}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(mod.label, w / 2, h / 2 - 6)

      // Dims
      ctx.font = `${Math.min(10, w / 5)}px Inter, sans-serif`
      ctx.fillStyle = selected ? '#BFDBFE' : '#6B7280'
      ctx.fillText(`${mod.defaultDims.x}m × ${mod.defaultDims.y}m`, w / 2, h / 2 + 8)

      // Connector dots
      for (const conn of mod.connectors) {
        if (conn.face === 'floor' || conn.face === 'ceiling') continue
        const off = conn.offsetFraction
        let cx = 0, cy = 0
        switch (conn.face) {
          case 'north': cx = off * w; cy = 0; break
          case 'south': cx = off * w; cy = h; break
          case 'east':  cx = w; cy = off * h; break
          case 'west':  cx = 0; cy = off * h; break
        }
        const kindColor: Record<string, string> = {
          door: '#22C55E', opening: '#86EFAC', window: '#60A5FA',
          stair: '#A78BFA', hvac_duct: '#FB923C',
          plumbing_stack: '#38BDF8', electrical_panel: '#FCD34D',
        }
        ctx.beginPath()
        ctx.arc(cx, cy, 4, 0, Math.PI * 2)
        ctx.fillStyle = kindColor[conn.kind] ?? '#9CA3AF'
        ctx.fill()
      }

      // Lock icon
      if (room.locked) {
        ctx.font = '12px sans-serif'
        ctx.fillText('🔒', w - 10, 12)
      }

      ctx.restore()
    }

    // Ghost preview while dragging
    if (dragging && ghostPos) {
      const room = rooms.find(r => r.id === dragging.id)
      if (room) {
        const mod = getRoomModule(room.moduleType)
        ctx.globalAlpha = 0.4
        ctx.fillStyle = snapResult ? '#22C55E' : mod.color
        ctx.strokeStyle = snapResult ? '#16A34A' : '#6B7280'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.roundRect(
          toPx(ghostPos.x), toPx(ghostPos.y),
          toPx(room.gridW), toPx(room.gridH), 4
        )
        ctx.fill()
        ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      }
    }

    // Ghost while placing new room
    if (placingType && ghostPos) {
      const mod = getRoomModule(placingType)
      ctx.globalAlpha = 0.5
      ctx.fillStyle = mod.color
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.roundRect(toPx(ghostPos.x), toPx(ghostPos.y), toPx(mod.gridW), toPx(mod.gridH), 4)
      ctx.fill()
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1
    }

    // Validation error overlays
    if (validation) {
      for (const issue of validation.issues) {
        if (issue.severity !== 'error') continue
        for (const roomId of issue.affectedRoomIds) {
          const room = rooms.find(r => r.id === roomId)
          if (!room || room.level !== activeLevel) continue
          ctx.strokeStyle = '#EF4444'
          ctx.lineWidth = 3
          ctx.setLineDash([6, 3])
          ctx.beginPath()
          ctx.rect(toPx(room.gridX), toPx(room.gridY), toPx(room.gridW), toPx(room.gridH))
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
    }
  }, [rooms, activeLevel, selectedRoomId, hoveredId, dragging, ghostPos, snapResult, placingType, validation])

  useEffect(() => { draw() }, [draw])

  // ── Pointer events ────────────────────────────────────────────────────────
  const getRoomAt = (gx: number, gy: number): PlacedRoom | null => {
    return rooms
      .filter(r => r.level === activeLevel)
      .find(r => gx >= r.gridX && gx < r.gridX + r.gridW && gy >= r.gridY && gy < r.gridY + r.gridH)
      ?? null
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const gx = toGrid(e.clientX - rect.left)
    const gy = toGrid(e.clientY - rect.top)

    if (placingType) {
      addRoom(placingType, gx, gy)
      setPlacingType(null)
      setGhostPos(null)
      return
    }

    const room = getRoomAt(gx, gy)
    if (room) {
      selectRoom(room.id)
      setDragging({ id: room.id, offX: gx - room.gridX, offY: gy - room.gridY })
    } else {
      selectRoom(null)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const gx = toGrid(e.clientX - rect.left)
    const gy = toGrid(e.clientY - rect.top)

    if (dragging) {
      const newX = Math.max(0, Math.min(GRID_COLS - 1, gx - dragging.offX))
      const newY = Math.max(0, Math.min(GRID_ROWS - 1, gy - dragging.offY))
      setGhostPos({ x: newX, y: newY })

      // Check snap
      const draggedRoom = rooms.find(r => r.id === dragging.id)
      if (draggedRoom) {
        const ghost = { ...draggedRoom, gridX: newX, gridY: newY }
        const snap = findSnap(ghost, rooms)
        setSnapResult(snap)
      }
      return
    }

    if (placingType) {
      setGhostPos({ x: gx, y: gy })
      return
    }

    const room = getRoomAt(gx, gy)
    setHoveredId(room?.id ?? null)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const gx = toGrid(e.clientX - rect.left)
    const gy = toGrid(e.clientY - rect.top)
    const room = rooms.find(r => r.id === dragging.id)

    if (room) {
      let newX = Math.max(0, gx - dragging.offX)
      let newY = Math.max(0, gy - dragging.offY)

      // Apply snap delta
      if (snapResult?.matched) {
        const GRID_M = 0.5
        newX += Math.round(snapResult.snapDelta.x / GRID_M)
        newY += Math.round(snapResult.snapDelta.y / GRID_M)
      }
      moveRoom(dragging.id, newX, newY)
    }
    setDragging(null)
    setGhostPos(null)
    setSnapResult(null)
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedRoomId) deleteRoom(selectedRoomId)
    }
    if (e.key === 'r' || e.key === 'R') {
      if (selectedRoomId) rotateRoom(selectedRoomId)
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.shiftKey ? redo() : undo()
    }
    if (e.key === 'Escape') {
      setPlacingType(null)
      setGhostPos(null)
    }
  }, [selectedRoomId, deleteRoom, rotateRoom, undo, redo])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  // ─── Render ───────────────────────────────────────────────────────────────
  const activeRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null
  const errorCount = validation?.issues.filter(i => i.severity === 'error').length ?? 0
  const warnCount  = validation?.issues.filter(i => i.severity === 'warning').length ?? 0

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* Left panel — room palette */}
      <div style={{ width: 200, background: '#F9FAFB', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rooms</div>
        </div>
        {Object.entries(ROOM_GROUPS).map(([group, types]) => (
          <div key={group}>
            <div style={{ padding: '8px 16px', fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group}</div>
            {types.map(type => {
              const mod = getRoomModule(type)
              return (
                <button
                  key={type}
                  onClick={() => setPlacingType(placingType === type ? null : type)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '8px 16px',
                    background: placingType === type ? '#EFF6FF' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    borderLeft: placingType === type ? '3px solid #3B82F6' : '3px solid transparent',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ width: 12, height: 12, borderRadius: 2, background: mod.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#374151' }}>{mod.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{ height: 44, background: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}>
          <button onClick={() => undo()} disabled={!canUndo} style={toolBtn(canUndo)}>Undo</button>
          <button onClick={() => redo()} disabled={!canRedo} style={toolBtn(canRedo)}>Redo</button>
          <div style={{ width: 1, height: 20, background: '#E5E7EB', margin: '0 4px' }} />
          {activeRoom && (
            <>
              <button onClick={() => rotateRoom(activeRoom.id)} style={toolBtn(true)}>Rotate R</button>
              <button onClick={() => deleteRoom(activeRoom.id)} style={{ ...toolBtn(true), color: '#EF4444' }}>Delete</button>
            </>
          )}
          <div style={{ flex: 1 }} />
          {/* Validation badge */}
          {errorCount > 0 && <span style={{ background: '#FEE2E2', color: '#DC2626', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{errorCount} error{errorCount > 1 ? 's' : ''}</span>}
          {warnCount > 0  && <span style={{ background: '#FEF9C3', color: '#CA8A04', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{warnCount} warn{warnCount > 1 ? 's' : ''}</span>}
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
          <canvas
            ref={canvasRef}
            width={GRID_COLS * GRID}
            height={GRID_ROWS * GRID}
            style={{ cursor: placingType ? 'crosshair' : dragging ? 'grabbing' : 'default', display: 'block' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => { setHoveredId(null); setGhostPos(null) }}
          />
        </div>

        {/* Level tabs */}
        <div style={{ height: 40, background: '#F9FAFB', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 4, padding: '0 12px' }}>
          {levels.map(l => (
            <button
              key={l.index}
              onClick={() => setActiveLevel(l.index)}
              style={{
                padding: '4px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
                background: l.index === activeLevel ? '#3B82F6' : '#E5E7EB',
                color: l.index === activeLevel ? '#fff' : '#374151',
                fontWeight: l.index === activeLevel ? 600 : 400,
              }}
            >{l.label}</button>
          ))}
          <button
            onClick={addLevel}
            style={{ padding: '4px 10px', borderRadius: 6, border: '1px dashed #D1D5DB', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#6B7280' }}
          >+ Floor</button>
        </div>
      </div>

      {/* Right panel — selected room details */}
      {activeRoom && (
        <div style={{ width: 220, background: '#F9FAFB', borderLeft: '1px solid #E5E7EB', padding: 16, overflowY: 'auto' }}>
          {(() => {
            const mod = getRoomModule(activeRoom.moduleType)
            return (
              <>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>{mod.label}</div>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
                  {mod.defaultDims.x}m × {mod.defaultDims.y}m × {mod.defaultDims.z}m<br />
                  Grid: {activeRoom.gridW} × {activeRoom.gridH} | Rot: {activeRoom.rotation}°<br />
                  Level: {activeRoom.level}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 }}>Connectors</div>
                {mod.connectors.map(c => (
                  <div key={c.id} style={{ fontSize: 11, color: '#374151', padding: '3px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{c.face}</span>
                    <span style={{ color: '#6B7280' }}>{c.kind}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 8, marginTop: 12 }}>Systems</div>
                {mod.systemNodes.map(n => (
                  <div key={n.id} style={{ fontSize: 11, color: '#374151', padding: '3px 0', borderBottom: '1px solid #F3F4F6' }}>
                    {n.kind}{n.load ? ` (${n.load}${n.kind.includes('electrical') ? 'A' : n.kind.includes('hvac') ? 'BTU' : 'GPM'})` : ''}
                  </div>
                ))}
                {/* Validation issues for this room */}
                {validation?.issues.filter(i => i.affectedRoomIds.includes(activeRoom.id)).map((issue, i) => (
                  <div key={i} style={{
                    marginTop: 8, padding: '6px 8px', borderRadius: 4, fontSize: 11,
                    background: issue.severity === 'error' ? '#FEE2E2' : issue.severity === 'warning' ? '#FEF9C3' : '#EFF6FF',
                    color: issue.severity === 'error' ? '#DC2626' : issue.severity === 'warning' ? '#92400E' : '#1D4ED8',
                  }}>{issue.message}</div>
                ))}
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}

function toolBtn(enabled: boolean): React.CSSProperties {
  return {
    padding: '4px 12px', borderRadius: 6, border: '1px solid #E5E7EB',
    background: enabled ? '#fff' : '#F9FAFB', cursor: enabled ? 'pointer' : 'not-allowed',
    fontSize: 13, color: enabled ? '#374151' : '#D1D5DB', fontWeight: 500,
  }
}