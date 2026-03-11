import { useRef, useEffect, useCallback, useState } from 'react'
import { useDesignStore, useUndo, useRedo, useCanUndo, useCanRedo } from '../store/useDesignStore'
import { getRoomModule, ROOM_GROUPS } from '@uniphimedia/room-modules'
import { findSnap } from '@uniphimedia/systems-engine'
import type { InteriorPartition, PlacedRoom } from '@uniphimedia/shared-types'
import ModeFrame from '../components/ModeFrame'

const GRID = 40
const GRID_COLS = 40
const GRID_ROWS = 30
const GRID_M = 0.5
const HANDLE_R = 7

function toGrid(px: number) { return Math.floor(px / GRID) }
function toPx(g: number) { return g * GRID }
function metersToPx(m: number) { return (m / GRID_M) * GRID }
function pxToMeters(px: number) { return (px / GRID) * GRID_M }
function degToRad(deg: number) { return (deg * Math.PI) / 180 }
function snapMeters(value: number) { return Math.round(value / 0.25) * 0.25 }
function snapAngle(value: number) { return Math.round(value / 15) * 15 }

function roomColor(room: PlacedRoom, selected: boolean, hovered: boolean): string {
  const mod = getRoomModule(room.moduleType)
  if (selected) return '#2563EB'
  if (hovered) return mod.color + 'DD'
  return mod.color
}

function isCircularRoom(moduleType: string): boolean { return getRoomModule(moduleType).footprint === 'circle' }

function traceRoomShape(ctx: CanvasRenderingContext2D, moduleType: string, w: number, h: number) {
  if (isCircularRoom(moduleType)) {
    ctx.ellipse(w / 2, h / 2, Math.max(4, w / 2 - 2), Math.max(4, h / 2 - 2), 0, 0, Math.PI * 2)
    return
  }
  ctx.roundRect(1, 1, w - 2, h - 2, 4)
}

function traceGhostShape(ctx: CanvasRenderingContext2D, moduleType: string, x: number, y: number, w: number, h: number) {
  if (isCircularRoom(moduleType)) {
    ctx.ellipse(x + w / 2, y + h / 2, Math.max(4, w / 2 - 2), Math.max(4, h / 2 - 2), 0, 0, Math.PI * 2)
    return
  }
  ctx.roundRect(x, y, w, h, 4)
}

function pointInRoom(room: PlacedRoom, gx: number, gy: number): boolean {
  if (!isCircularRoom(room.moduleType)) return gx >= room.gridX && gx < room.gridX + room.gridW && gy >= room.gridY && gy < room.gridY + room.gridH
  const centerX = room.gridX + room.gridW / 2
  const centerY = room.gridY + room.gridH / 2
  const nx = (gx + 0.5 - centerX) / (room.gridW / 2)
  const ny = (gy + 0.5 - centerY) / (room.gridH / 2)
  return nx * nx + ny * ny <= 1
}

function toolBtn(enabled: boolean): React.CSSProperties {
  return { padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1', background: enabled ? '#FFFFFF' : '#F8FAFC', cursor: enabled ? 'pointer' : 'not-allowed', fontSize: 13, color: enabled ? '#334155' : '#CBD5E1', fontWeight: 700 }
}

type HandleInfo = { x: number; y: number; mode: 'offset' | 'radius' | 'angle_end' }

function getPartitionHandle(room: PlacedRoom, partition: InteriorPartition): HandleInfo {
  const roomW = toPx(room.gridW)
  const roomH = toPx(room.gridH)
  const cx = roomW / 2
  const cy = roomH / 2
  if (partition.kind === 'ring') {
    return { x: cx, y: cy - metersToPx(partition.radiusMeters ?? 0), mode: 'radius' }
  }
  if (partition.kind === 'radial') {
    const angle = degToRad((partition.angleDeg ?? 0) - 90)
    const end = metersToPx(partition.endMeters ?? 1)
    return { x: cx + Math.cos(angle) * end, y: cy + Math.sin(angle) * end, mode: 'angle_end' }
  }
  const orientation = partition.orientation ?? 'vertical'
  return orientation === 'vertical'
    ? { x: metersToPx(partition.offsetMeters ?? 0), y: cy, mode: 'offset' }
    : { x: cx, y: metersToPx(partition.offsetMeters ?? 0), mode: 'offset' }
}

function drawPartition(ctx: CanvasRenderingContext2D, room: PlacedRoom, partition: InteriorPartition, selected: boolean) {
  const x = toPx(room.gridX)
  const y = toPx(room.gridY)
  const roomW = toPx(room.gridW)
  const roomH = toPx(room.gridH)
  const centerX = roomW / 2
  const centerY = roomH / 2
  const thicknessPx = Math.max(3, metersToPx(partition.thicknessMeters))
  const doorPx = partition.doorWidthMeters ? metersToPx(partition.doorWidthMeters) : 0

  ctx.save()
  ctx.translate(x + roomW / 2, y + roomH / 2)
  ctx.rotate((room.rotation * Math.PI) / 180)
  ctx.translate(-(roomW / 2), -(roomH / 2))
  ctx.strokeStyle = selected ? '#0F172A' : '#0F766E'
  ctx.lineWidth = selected ? thicknessPx + 1.5 : thicknessPx

  if (partition.kind === 'ring') {
    const radiusPx = metersToPx(partition.radiusMeters ?? 0)
    const sweep = degToRad(partition.sweepDeg ?? 360)
    const start = -Math.PI / 2 - sweep / 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radiusPx, start, start + sweep)
    ctx.stroke()
  } else if (partition.kind === 'radial') {
    const angle = degToRad((partition.angleDeg ?? 0) - 90)
    const startPx = metersToPx(partition.startMeters ?? 0.5)
    const endPx = metersToPx(partition.endMeters ?? 1)
    const sx = centerX + Math.cos(angle) * startPx
    const sy = centerY + Math.sin(angle) * startPx
    const ex = centerX + Math.cos(angle) * endPx
    const ey = centerY + Math.sin(angle) * endPx
    if (doorPx > 0) {
      const halfGap = doorPx / 2
      const midPx = (startPx + endPx) / 2
      const g0 = Math.max(startPx, midPx - halfGap)
      const g1 = Math.min(endPx, midPx + halfGap)
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(centerX + Math.cos(angle) * g0, centerY + Math.sin(angle) * g0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(centerX + Math.cos(angle) * g1, centerY + Math.sin(angle) * g1); ctx.lineTo(ex, ey); ctx.stroke()
    } else {
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke()
    }
  } else {
    const orientation = partition.orientation ?? 'vertical'
    const offsetPx = metersToPx(partition.offsetMeters ?? 0)
    if (orientation === 'vertical') {
      const start = 10, end = roomH - 10
      if (doorPx > 0) {
        const g0 = centerY - doorPx / 2, g1 = centerY + doorPx / 2
        ctx.beginPath(); ctx.moveTo(offsetPx, start); ctx.lineTo(offsetPx, g0); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(offsetPx, g1); ctx.lineTo(offsetPx, end); ctx.stroke()
      } else { ctx.beginPath(); ctx.moveTo(offsetPx, start); ctx.lineTo(offsetPx, end); ctx.stroke() }
    } else {
      const start = 10, end = roomW - 10
      if (doorPx > 0) {
        const g0 = centerX - doorPx / 2, g1 = centerX + doorPx / 2
        ctx.beginPath(); ctx.moveTo(start, offsetPx); ctx.lineTo(g0, offsetPx); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(g1, offsetPx); ctx.lineTo(end, offsetPx); ctx.stroke()
      } else { ctx.beginPath(); ctx.moveTo(start, offsetPx); ctx.lineTo(end, offsetPx); ctx.stroke() }
    }
  }

  if (selected) {
    const handle = getPartitionHandle(room, partition)
    ctx.beginPath()
    ctx.arc(handle.x, handle.y, HANDLE_R, 0, Math.PI * 2)
    ctx.fillStyle = '#F59E0B'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#FFFFFF'
    ctx.stroke()
  }

  ctx.restore()
}

export default function FloorPlanEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    rooms, partitions, levels, activeLevel,
    selectedRoomId, selectedPartitionId, validation,
    addRoom, moveRoom, rotateRoom, deleteRoom, selectRoom, selectPartition,
    setActiveLevel, addLevel, resizeRoom, setRoomDimensions, setRoomConnector,
    addPartition, updatePartition, deletePartition,
  } = useDesignStore()
  const undo = useUndo()
  const redo = useRedo()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number } | null>(null)
  const [partitionDrag, setPartitionDrag] = useState<{ partitionId: string; mode: HandleInfo['mode'] } | null>(null)
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null)
  const [snapResult, setSnapResult] = useState<ReturnType<typeof findSnap>>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [placingType, setPlacingType] = useState<string | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#E2E8F0'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= GRID_COLS; x++) { ctx.beginPath(); ctx.moveTo(x * GRID, 0); ctx.lineTo(x * GRID, GRID_ROWS * GRID); ctx.stroke() }
    for (let y = 0; y <= GRID_ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * GRID); ctx.lineTo(GRID_COLS * GRID, y * GRID); ctx.stroke() }

    const levelRooms = rooms.filter(r => r.level === activeLevel)
    for (const room of levelRooms) {
      const mod = getRoomModule(room.moduleType)
      const x = toPx(room.gridX), y = toPx(room.gridY), w = toPx(room.gridW), h = toPx(room.gridH)
      const selected = room.id === selectedRoomId
      const hovered = room.id === hoveredId
      ctx.save()
      ctx.translate(x + w / 2, y + h / 2)
      ctx.rotate((room.rotation * Math.PI) / 180)
      ctx.translate(-(w / 2), -(h / 2))
      ctx.fillStyle = roomColor(room, selected, hovered)
      ctx.strokeStyle = selected ? '#1D4ED8' : '#94A3B8'
      ctx.lineWidth = selected ? 2.5 : 1
      ctx.beginPath(); traceRoomShape(ctx, room.moduleType, w, h); ctx.fill(); ctx.stroke()
      ctx.fillStyle = selected ? '#FFFFFF' : '#0F172A'
      ctx.font = `bold ${Math.min(12, w / 4)}px Inter, sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(mod.label, w / 2, h / 2 - 6)
      ctx.font = `${Math.min(10, w / 5)}px Inter, sans-serif`
      ctx.fillStyle = selected ? '#DBEAFE' : '#64748B'
      ctx.fillText(`${room.dims.x.toFixed(1)}m x ${room.dims.y.toFixed(1)}m`, w / 2, h / 2 + 8)
      for (const conn of room.connectors) {
        if (conn.face === 'floor' || conn.face === 'ceiling') continue
        const off = conn.offsetFraction
        let cx = 0, cy = 0
        if (isCircularRoom(room.moduleType)) {
          switch (conn.face) {
            case 'north': cx = off * w; cy = h / 2 - Math.sqrt(Math.max(0, 1 - Math.pow((cx - w / 2) / (w / 2), 2))) * (h / 2); break
            case 'south': cx = off * w; cy = h / 2 + Math.sqrt(Math.max(0, 1 - Math.pow((cx - w / 2) / (w / 2), 2))) * (h / 2); break
            case 'east': cy = off * h; cx = w / 2 + Math.sqrt(Math.max(0, 1 - Math.pow((cy - h / 2) / (h / 2), 2))) * (w / 2); break
            case 'west': cy = off * h; cx = w / 2 - Math.sqrt(Math.max(0, 1 - Math.pow((cy - h / 2) / (h / 2), 2))) * (w / 2); break
          }
        } else {
          switch (conn.face) {
            case 'north': cx = off * w; cy = 0; break
            case 'south': cx = off * w; cy = h; break
            case 'east': cx = w; cy = off * h; break
            case 'west': cx = 0; cy = off * h; break
          }
        }
        const kindColor: Record<string, string> = { door: '#22C55E', opening: '#86EFAC', window: '#60A5FA', stair: '#A78BFA', hvac_duct: '#FB923C', plumbing_stack: '#38BDF8', electrical_panel: '#FCD34D' }
        ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = kindColor[conn.kind] ?? '#94A3B8'; ctx.fill()
      }
      if (room.locked) { ctx.font = '12px sans-serif'; ctx.fillText('L', w - 10, 12) }
      ctx.restore()
      for (const partition of partitions.filter(item => item.roomId === room.id && item.level === activeLevel)) {
        drawPartition(ctx, room, partition, partition.id === selectedPartitionId)
      }
    }

    if (dragging && ghostPos) {
      const room = rooms.find(r => r.id === dragging.id)
      if (room) {
        const mod = getRoomModule(room.moduleType)
        ctx.globalAlpha = 0.4
        ctx.fillStyle = snapResult ? '#22C55E' : mod.color
        ctx.strokeStyle = snapResult ? '#16A34A' : '#64748B'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.beginPath(); traceGhostShape(ctx, room.moduleType, toPx(ghostPos.x), toPx(ghostPos.y), toPx(room.gridW), toPx(room.gridH)); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1
      }
    }

    if (placingType && ghostPos) {
      const mod = getRoomModule(placingType)
      ctx.globalAlpha = 0.5
      ctx.fillStyle = mod.color
      ctx.strokeStyle = '#2563EB'
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath(); traceGhostShape(ctx, placingType, toPx(ghostPos.x), toPx(ghostPos.y), toPx(mod.gridW), toPx(mod.gridH)); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1
    }
  }, [rooms, partitions, activeLevel, selectedRoomId, selectedPartitionId, hoveredId, dragging, ghostPos, snapResult, placingType])

  useEffect(() => { draw() }, [draw])

  const getRoomAt = (gx: number, gy: number): PlacedRoom | null => rooms.filter(r => r.level === activeLevel).find(r => pointInRoom(r, gx, gy)) ?? null

  const getPartitionHandleHit = (room: PlacedRoom, partition: InteriorPartition, px: number, py: number) => {
    const handle = getPartitionHandle(room, partition)
    const roomX = toPx(room.gridX)
    const roomY = toPx(room.gridY)
    const dx = px - (roomX + handle.x)
    const dy = py - (roomY + handle.y)
    return dx * dx + dy * dy <= (HANDLE_R + 4) * (HANDLE_R + 4) ? handle.mode : null
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const gx = toGrid(px)
    const gy = toGrid(py)
    if (placingType) { addRoom(placingType, gx, gy); setPlacingType(null); setGhostPos(null); return }
    const room = getRoomAt(gx, gy)
    if (room) {
      const roomPartitions = partitions.filter(partition => partition.roomId === room.id && partition.level === activeLevel)
      for (const partition of roomPartitions) {
        const hit = getPartitionHandleHit(room, partition, px, py)
        if (hit) {
          selectRoom(room.id)
          selectPartition(partition.id)
          setPartitionDrag({ partitionId: partition.id, mode: hit })
          return
        }
      }
      selectRoom(room.id)
      const current = roomPartitions.find(partition => partition.id === selectedPartitionId)
      if (!current) selectPartition(null)
      setDragging({ id: room.id, offX: gx - room.gridX, offY: gy - room.gridY })
    } else {
      selectRoom(null)
      selectPartition(null)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const gx = toGrid(px)
    const gy = toGrid(py)

    if (partitionDrag && selectedPartitionId) {
      const partition = partitions.find(item => item.id === selectedPartitionId)
      const room = partition ? rooms.find(item => item.id === partition.roomId) : null
      if (partition && room) {
        const localX = px - toPx(room.gridX)
        const localY = py - toPx(room.gridY)
        const centerX = toPx(room.gridW) / 2
        const centerY = toPx(room.gridH) / 2
        if (partition.kind === 'ring') {
          const radius = snapMeters(pxToMeters(Math.hypot(localX - centerX, localY - centerY)))
          updatePartition(partition.id, { radiusMeters: radius })
        } else if (partition.kind === 'radial') {
          const dx = localX - centerX
          const dy = localY - centerY
          const angle = snapAngle((Math.atan2(dy, dx) * 180) / Math.PI + 90)
          const end = snapMeters(pxToMeters(Math.hypot(dx, dy)))
          updatePartition(partition.id, { angleDeg: angle, endMeters: end })
        } else {
          const orientation = partition.orientation ?? 'vertical'
          const offset = snapMeters(pxToMeters(orientation === 'vertical' ? localX : localY))
          updatePartition(partition.id, { offsetMeters: offset })
        }
      }
      return
    }

    if (dragging) {
      const newX = Math.max(0, Math.min(GRID_COLS - 1, gx - dragging.offX))
      const newY = Math.max(0, Math.min(GRID_ROWS - 1, gy - dragging.offY))
      setGhostPos({ x: newX, y: newY })
      const draggedRoom = rooms.find(r => r.id === dragging.id)
      if (draggedRoom) setSnapResult(findSnap({ ...draggedRoom, gridX: newX, gridY: newY }, rooms))
      return
    }
    if (placingType) { setGhostPos({ x: gx, y: gy }); return }
    setHoveredId(getRoomAt(gx, gy)?.id ?? null)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (partitionDrag) { setPartitionDrag(null); return }
    if (!dragging) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const gx = toGrid(e.clientX - rect.left)
    const gy = toGrid(e.clientY - rect.top)
    const room = rooms.find(r => r.id === dragging.id)
    if (room) {
      let newX = Math.max(0, gx - dragging.offX)
      let newY = Math.max(0, gy - dragging.offY)
      if (snapResult?.matched) { newX += Math.round(snapResult.snapDelta.x / GRID_M); newY += Math.round(snapResult.snapDelta.y / GRID_M) }
      moveRoom(dragging.id, newX, newY)
    }
    setDragging(null); setGhostPos(null); setSnapResult(null)
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedPartitionId) { deletePartition(selectedPartitionId); return }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedRoomId) deleteRoom(selectedRoomId)
    if ((e.key === 'r' || e.key === 'R') && selectedRoomId) rotateRoom(selectedRoomId)
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') e.shiftKey ? redo() : undo()
    if (e.key === 'Escape') { setPlacingType(null); setGhostPos(null); setPartitionDrag(null) }
  }, [selectedRoomId, selectedPartitionId, deleteRoom, deletePartition, rotateRoom, undo, redo])

  useEffect(() => { window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown) }, [onKeyDown])

  const activeRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null
  const roomPartitions = activeRoom ? partitions.filter(partition => partition.roomId === activeRoom.id) : []
  const activePartition = selectedPartitionId ? partitions.find(partition => partition.id === selectedPartitionId) ?? null : null
  const errorCount = validation?.issues.filter(i => i.severity === 'error').length ?? 0
  const warnCount = validation?.issues.filter(i => i.severity === 'warning').length ?? 0
  const circularActive = activeRoom ? isCircularRoom(activeRoom.moduleType) : false

  const leftPanel = <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}><div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}><div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shell Palette</div></div><div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>{Object.entries(ROOM_GROUPS).map(([group, types]) => <div key={group}><div style={{ padding: '10px 16px 6px', fontSize: 10, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group}</div>{types.map(type => { const mod = getRoomModule(type); const active = placingType === type; return <button key={type} onClick={() => setPlacingType(active ? null : type)} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: active ? '#EFF6FF' : 'transparent', border: 'none', borderLeft: active ? '3px solid #2563EB' : '3px solid transparent', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: mod.footprint === 'circle' ? '50%' : 3, background: mod.color, flexShrink: 0 }} /><span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: '#334155' }}>{mod.label}</span></button> })}</div>)}</div></div>

  const toolbar = <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}><button onClick={() => undo()} disabled={!canUndo} style={toolBtn(canUndo)}>Undo</button><button onClick={() => redo()} disabled={!canRedo} style={toolBtn(canRedo)}>Redo</button><button onClick={() => activeRoom && rotateRoom(activeRoom.id)} disabled={!activeRoom} style={toolBtn(Boolean(activeRoom))}>Rotate</button><button onClick={() => selectedPartitionId ? deletePartition(selectedPartitionId) : activeRoom && deleteRoom(activeRoom.id)} disabled={!activeRoom && !selectedPartitionId} style={toolBtn(Boolean(activeRoom || selectedPartitionId))}>Delete</button><div style={{ flex: 1 }} /><span style={{ fontSize: 12, color: partitionDrag ? '#D97706' : placingType ? '#2563EB' : '#64748B', fontWeight: 700 }}>{partitionDrag ? 'Dragging divider handle' : placingType ? `Placing ${getRoomModule(placingType).label}` : 'Select a shell type to place'}</span></div>

  const status = <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}><span style={{ padding: '6px 10px', borderRadius: 999, background: '#E2E8F0', color: '#334155', fontSize: 12, fontWeight: 700 }}>{rooms.filter(r => r.level === activeLevel).length} rooms on active level</span><span style={{ padding: '6px 10px', borderRadius: 999, background: '#CCFBF1', color: '#115E59', fontSize: 12, fontWeight: 700 }}>{partitions.filter(p => p.level === activeLevel).length} dividers on active level</span>{selectedPartitionId && <span style={{ padding: '6px 10px', borderRadius: 999, background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 700 }}>Divider selected</span>}<span style={{ padding: '6px 10px', borderRadius: 999, background: '#DBEAFE', color: '#1D4ED8', fontSize: 12, fontWeight: 700 }}>{levels.find(l => l.index === activeLevel)?.label ?? 'Level'}</span>{errorCount > 0 && <span style={{ padding: '6px 10px', borderRadius: 999, background: '#FEE2E2', color: '#B91C1C', fontSize: 12, fontWeight: 700 }}>{errorCount} errors</span>}{warnCount > 0 && <span style={{ padding: '6px 10px', borderRadius: 999, background: '#FEF3C7', color: '#B45309', fontSize: 12, fontWeight: 700 }}>{warnCount} warnings</span>}</div>

  const main = <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}><div style={{ flex: 1, overflow: 'auto', position: 'relative', background: '#FFFFFF' }}><canvas ref={canvasRef} width={GRID_COLS * GRID} height={GRID_ROWS * GRID} style={{ cursor: partitionDrag ? 'grabbing' : placingType ? 'crosshair' : dragging ? 'grabbing' : 'default', display: 'block', background: '#FFFFFF' }} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={() => { setHoveredId(null); setGhostPos(null); setPartitionDrag(null) }} /></div><div style={{ padding: 12, borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{levels.map(l => <button key={l.index} onClick={() => setActiveLevel(l.index)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1', background: l.index === activeLevel ? '#2563EB' : '#FFFFFF', color: l.index === activeLevel ? '#FFFFFF' : '#334155', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>{l.label}</button>)}<button onClick={addLevel} style={{ padding: '8px 12px', borderRadius: 10, border: '1px dashed #94A3B8', background: 'transparent', color: '#475569', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>Add Floor</button></div></div>

  const rightPanel = activeRoom ? (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0' }}><div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Selection</div><div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{getRoomModule(activeRoom.moduleType).label}</div></div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 12 }}>Width: {activeRoom.dims.x.toFixed(1)}m | Depth: {activeRoom.dims.y.toFixed(1)}m | Height: {activeRoom.dims.z.toFixed(1)}m<br />Grid: {activeRoom.gridW} x {activeRoom.gridH} | Rot: {activeRoom.rotation} deg<br />Level: {activeRoom.level}</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Dimensions</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <label style={{ fontSize: 11, color: '#475569' }}>Width (m)<input type="number" min={getRoomModule(activeRoom.moduleType).minDims.x} max={getRoomModule(activeRoom.moduleType).maxDims.x} step={0.5} value={activeRoom.dims.x} onChange={e => setRoomDimensions(activeRoom.id, Number(e.target.value), activeRoom.dims.y)} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label>
          <label style={{ fontSize: 11, color: '#475569' }}>Depth (m)<input type="number" min={getRoomModule(activeRoom.moduleType).minDims.y} max={getRoomModule(activeRoom.moduleType).maxDims.y} step={0.5} value={activeRoom.dims.y} onChange={e => setRoomDimensions(activeRoom.id, activeRoom.dims.x, Number(e.target.value))} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}><button onClick={() => resizeRoom(activeRoom.id, activeRoom.gridW + 1, activeRoom.gridH)} style={toolBtn(true)}>Wider</button><button onClick={() => resizeRoom(activeRoom.id, activeRoom.gridW, activeRoom.gridH + 1)} style={toolBtn(true)}>Deeper</button></div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>Interior Dividers</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <button onClick={() => addPartition(activeRoom.id, 'straight', 'vertical')} style={toolBtn(true)}>Vertical</button>
          <button onClick={() => addPartition(activeRoom.id, 'straight', 'horizontal')} style={toolBtn(true)}>Horizontal</button>
          {circularActive && <button onClick={() => addPartition(activeRoom.id, 'radial')} style={toolBtn(true)}>Radial</button>}
          {circularActive && <button onClick={() => addPartition(activeRoom.id, 'ring')} style={toolBtn(true)}>Ring</button>}
        </div>
        {roomPartitions.map(partition => <div key={partition.id} style={{ padding: '10px 0', borderBottom: '1px solid #E2E8F0', background: partition.id === selectedPartitionId ? '#FFFBEB' : 'transparent' }}><button onClick={() => selectPartition(partition.id)} style={{ border: 'none', background: 'transparent', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer' }}><div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{partition.kind}{partition.kind === 'straight' ? ` ${partition.orientation}` : ''} divider</div></button>{partition.kind === 'straight' && <label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Offset (m)<input type="number" min={0.3} step={0.1} value={partition.offsetMeters ?? 0} onChange={e => updatePartition(partition.id, { offsetMeters: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label>}{partition.kind === 'radial' && <><label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Angle (deg)<input type="number" step={15} value={partition.angleDeg ?? 0} onChange={e => updatePartition(partition.id, { angleDeg: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label><label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Start (m)<input type="number" step={0.1} value={partition.startMeters ?? 0} onChange={e => updatePartition(partition.id, { startMeters: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label><label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>End (m)<input type="number" step={0.1} value={partition.endMeters ?? 0} onChange={e => updatePartition(partition.id, { endMeters: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label></>}{partition.kind === 'ring' && <><label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Radius (m)<input type="number" step={0.1} value={partition.radiusMeters ?? 0} onChange={e => updatePartition(partition.id, { radiusMeters: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label><label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Sweep (deg)<input type="number" step={15} value={partition.sweepDeg ?? 0} onChange={e => updatePartition(partition.id, { sweepDeg: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label></>}{partition.kind !== 'ring' && <label style={{ fontSize: 11, color: '#475569', display: 'block', marginBottom: 6 }}>Door Width (m)<input type="number" min={0} step={0.1} value={partition.doorWidthMeters ?? 0} onChange={e => updatePartition(partition.id, { doorWidthMeters: Number(e.target.value) <= 0 ? null : Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }} /></label>}<button onClick={() => deletePartition(partition.id)} style={toolBtn(true)}>Remove Divider</button></div>)}
        {activePartition && <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: '#EFF6FF', color: '#1D4ED8', fontSize: 12, fontWeight: 700 }}>Drag the orange handle on canvas to edit the selected divider directly.</div>}
        <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginTop: 14, marginBottom: 8 }}>Doorways and Openings</div>
        {activeRoom.connectors.filter(c => c.kind === 'door' || c.kind === 'opening').map(c => <div key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#334155', marginBottom: 6 }}><span>{c.generated ? 'Auto ' : ''}{c.kind} on {c.face}</span><span style={{ color: '#64748B' }}>{c.linkedRoomId ? 'to adjacent room' : 'module default'}</span></div><label style={{ fontSize: 11, color: '#475569' }}>Width (m)<input type="number" min={0.4} max={4} step={0.1} value={c.widthMeters} onChange={e => setRoomConnector(activeRoom.id, c.id, { widthMeters: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#FFFFFF' }} /></label></div>)}
      </div>
    </div>
  ) : <div style={{ padding: 16, color: '#64748B', fontSize: 13 }}>Select a room to inspect dimensions, dividers, and doorways.</div>

  return <ModeFrame title="Floor Plan" description="Lay out shell modules and domes on the plan, then organize levels and dome-native dividers before moving into 3D review." left={leftPanel} toolbar={toolbar} status={status} main={main} right={rightPanel} />
}
