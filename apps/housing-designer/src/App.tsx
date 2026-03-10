import React, { useState } from 'react'
import { FloorPlanEditor } from './views/FloorPlanEditor'
import { ShellViewer } from './views/ShellViewer'
import { InteriorMode } from './views/InteriorMode'

type View = 'floorplan' | 'shell' | 'interior'

export default function App() {
  const [view, setView] = useState<View>('floorplan')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <nav style={{
        display: 'flex', gap: 8, padding: '8px 16px',
        background: '#111', borderBottom: '1px solid #333'
      }}>
        <span style={{ fontWeight: 700, marginRight: 16 }}>Housing Designer</span>
        {(['floorplan', 'shell', 'interior'] as View[]).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: '4px 14px', borderRadius: 4, border: 'none', cursor: 'pointer',
              background: view === v ? '#4f8ef7' : '#2a2a2a',
              color: '#fff', fontWeight: view === v ? 700 : 400
            }}
          >
            {v === 'floorplan' ? 'Floor Plan' : v === 'shell' ? '3D Shell' : 'Interior'}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, position: 'relative' }}>
        {view === 'floorplan' && <FloorPlanEditor />}
        {view === 'shell' && <ShellViewer />}
        {view === 'interior' && <InteriorMode />}
      </div>
    </div>
  )
}