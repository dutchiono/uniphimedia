import { useMemo, useState } from 'react'
import { useDesignStore } from './store/useDesignStore'
import FloorPlanEditor from './views/FloorPlanEditor'
import ShellViewer from './views/ShellViewer'
import InteriorMode from './views/InteriorMode'

type View = 'floorplan' | 'shell' | 'interior'

type ViewConfig = {
  id: View
  label: string
  eyebrow: string
  description: string
}

const VIEW_ORDER: ViewConfig[] = [
  {
    id: 'floorplan',
    label: 'Floor Plan',
    eyebrow: 'Step 1',
    description: 'Lay out shells, domes, and interior zones on the plan grid.',
  },
  {
    id: 'shell',
    label: '3D Shell',
    eyebrow: 'Step 2',
    description: 'Review shell massing, cutaways, walkthroughs, and spatial volume.',
  },
  {
    id: 'interior',
    label: 'Interior',
    eyebrow: 'Step 3',
    description: 'Apply finish systems and interior material direction across the design.',
  },
]

function pillButton(active: boolean): React.CSSProperties {
  return {
    padding: '8px 14px',
    borderRadius: 999,
    border: active ? '1px solid #0F172A' : '1px solid #334155',
    cursor: 'pointer',
    background: active ? '#F8FAFC' : 'transparent',
    color: active ? '#0F172A' : '#CBD5E1',
    fontWeight: 700,
    fontSize: 13,
  }
}

function stepButton(active: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
    padding: '12px 14px',
    borderRadius: 16,
    border: active ? '1px solid #2563EB' : '1px solid #D8E0EA',
    background: active ? '#EFF6FF' : '#FFFFFF',
    color: '#0F172A',
    cursor: 'pointer',
    boxShadow: active ? '0 10px 24px rgba(37,99,235,0.12)' : 'none',
    flex: 1,
  }
}

function actionButton(kind: 'primary' | 'secondary'): React.CSSProperties {
  const primary = kind === 'primary'
  return {
    padding: '10px 14px',
    borderRadius: 12,
    border: primary ? '1px solid #2563EB' : '1px solid #CBD5E1',
    background: primary ? '#2563EB' : '#FFFFFF',
    color: primary ? '#FFFFFF' : '#0F172A',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13,
  }
}

export default function App() {
  const [view, setView] = useState<View>('floorplan')
  const { rooms, levels, activeLevel } = useDesignStore()

  const activeIndex = VIEW_ORDER.findIndex(v => v.id === view)
  const current = VIEW_ORDER[activeIndex]
  const previous = activeIndex > 0 ? VIEW_ORDER[activeIndex - 1] : null
  const next = activeIndex < VIEW_ORDER.length - 1 ? VIEW_ORDER[activeIndex + 1] : null

  const summary = useMemo(() => {
    const levelLabel = levels.find(level => level.index === activeLevel)?.label ?? 'Current Level'
    const activeLevelRooms = rooms.filter(room => room.level === activeLevel).length
    return {
      totalRooms: rooms.length,
      activeLevelRooms,
      levelLabel,
    }
  }, [rooms, levels, activeLevel])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#E9EEF5', color: '#0F172A' }}>
      <header style={{ background: 'linear-gradient(180deg, #0F172A 0%, #162033 100%)', color: '#F8FAFC', borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.01em' }}>Housing Designer</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Shell-first workflow for domes, rooms, and finish systems</div>
          </div>

          <div style={{ flex: 1 }} />

          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {VIEW_ORDER.map(item => (
              <button key={item.id} onClick={() => setView(item.id)} style={pillButton(item.id === view)}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section style={{ padding: '16px 18px 14px', background: '#F8FAFC', borderBottom: '1px solid #D8E0EA' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {VIEW_ORDER.map((item, index) => {
            const active = item.id === view
            const complete = index < activeIndex
            return (
              <button key={item.id} onClick={() => setView(item.id)} style={stepButton(active)}>
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: active ? '#2563EB' : complete ? '#0F766E' : '#E2E8F0',
                  color: active || complete ? '#FFFFFF' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                }}>
                  {complete ? 'OK' : index + 1}
                </div>
                <div style={{ minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.eyebrow}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 14 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{current.eyebrow}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>{current.label}</div>
            <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{current.description}</div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ padding: '8px 10px', borderRadius: 999, background: '#E2E8F0', color: '#334155', fontSize: 12, fontWeight: 700 }}>
                {summary.totalRooms} total room{summary.totalRooms === 1 ? '' : 's'}
              </span>
              <span style={{ padding: '8px 10px', borderRadius: 999, background: '#E0F2FE', color: '#0C4A6E', fontSize: 12, fontWeight: 700 }}>
                {summary.activeLevelRooms} on {summary.levelLabel}
              </span>
            </div>

            {previous && (
              <button onClick={() => setView(previous.id)} style={actionButton('secondary')}>
                Previous: {previous.label}
              </button>
            )}
            {next && (
              <button onClick={() => setView(next.id)} style={actionButton('primary')}>
                Next: {next.label}
              </button>
            )}
          </div>
        </div>
      </section>

      <main style={{ flex: 1, minHeight: 0, padding: 18 }}>
        <div style={{ height: '100%', minHeight: 0, borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(15,23,42,0.08)', border: '1px solid #D8E0EA' }}>
          {view === 'floorplan' && <FloorPlanEditor />}
          {view === 'shell' && <ShellViewer />}
          {view === 'interior' && <InteriorMode />}
        </div>
      </main>
    </div>
  )
}


