import React from 'react'

/**
 * FloorPlanEditor — 2D top-down room drag/snap/level editor.
 *
 * Rooms are represented as draggable tiles on a grid.
 * Each tile exposes 4 wall connectors (N/S/E/W) + floor/ceiling.
 * When two connectors overlap, the snap engine fires and merges
 * the rooms' systems nodes at that wall boundary.
 *
 * TODO: implement canvas-based drag/drop grid
 * TODO: integrate @uniphimedia/room-modules tile registry
 * TODO: integrate @uniphimedia/systems-engine snap resolver
 */
export function FloorPlanEditor() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <aside style={{
        width: 220, background: '#161616', borderRight: '1px solid #2a2a2a',
        padding: 16, overflowY: 'auto'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#888', textTransform: 'uppercase' }}>
          Room Modules
        </h3>
        {[
          'Bedroom', 'Master Bedroom', 'Bathroom', 'Master Bath',
          'Kitchen', 'Living Room', 'Dining Room', 'Hallway',
          'Stairwell', 'Garage', 'Laundry', 'Office', 'Closet'
        ].map(room => (
          <div key={room} draggable style={{
            padding: '8px 10px', marginBottom: 6, borderRadius: 4,
            background: '#222', border: '1px solid #333', cursor: 'grab',
            fontSize: 13
          }}>
            {room}
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, position: 'relative', background: '#1e1e1e' }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#444', fontSize: 14
        }}>
          Drag rooms from the panel onto the canvas to begin designing.
          <br />Grid snap + connector system coming in next iteration.
        </div>
      </main>
      <aside style={{
        width: 200, background: '#161616', borderLeft: '1px solid #2a2a2a',
        padding: 16
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#888', textTransform: 'uppercase' }}>
          Levels
        </h3>
        {['Level 1 (Ground)', 'Level 2', 'Basement'].map(lvl => (
          <div key={lvl} style={{
            padding: '6px 10px', marginBottom: 6, borderRadius: 4,
            background: '#222', border: '1px solid #333', fontSize: 13
          }}>
            {lvl}
          </div>
        ))}
        <button style={{
          marginTop: 8, width: '100%', padding: '6px 0',
          background: '#2a2a2a', border: '1px dashed #444',
          color: '#888', borderRadius: 4, cursor: 'pointer', fontSize: 12
        }}>
          + Add Level
        </button>
      </aside>
    </div>
  )
}