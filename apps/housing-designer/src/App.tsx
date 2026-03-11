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

function stepChip(active: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
    padding: '10px 12px',
    borderRadius: 12,
    border: active ? '1px solid #0F172A' : '1px solid #CBD5E1',
    background: active ? '#0F172A' : '#FFFFFF',
    color: active ? '#FFFFFF' : '#0F172A',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13,
  }
}

function actionButton(kind: 'primary' | 'secondary'): React.CSSProperties {
  const primary = kind === 'primary'
  return {
    padding: '10px 14px',
    borderRadius: 12,
    border: primary ? '1px solid #0F172A' : '1px solid #CBD5E1',
    background: primary ? '#0F172A' : '#FFFFFF',
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
      <header style={{ background: '#0F172A', color: '#F8FAFC', borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.01em' }}>Housing Designer</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Shell-first workflow for domes, rooms, and finish systems</div>
          </div>

          <div style={{ flex: 1 }} />

          <a
            href="/website"
            style={{ color: '#E2E8F0', textDecoration: 'none', fontSize: 12, fontWeight: 700, border: '1px solid #334155', padding: '6px 10px', borderRadius: 999 }}
          >
            Website
          </a>
        </div>
      </header>

      <section style={{ padding: '12px 18px', background: '#F8FAFC', borderBottom: '1px solid #D8E0EA' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {VIEW_ORDER.map((item, index) => {
              const active = item.id === view
              return (
                <button key={item.id} onClick={() => setView(item.id)} style={stepChip(active)} title={item.description}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: active ? '#F8FAFC' : '#E2E8F0', color: active ? '#0F172A' : '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                    {index + 1}
                  </span>
                  {item.label}
                </button>
              )
            })}
          </div>

          <div style={{ flex: 1, minWidth: 200 }} />

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ padding: '8px 10px', borderRadius: 999, background: '#E2E8F0', color: '#334155', fontSize: 12, fontWeight: 700 }}>
              {summary.totalRooms} total room{summary.totalRooms === 1 ? '' : 's'}
            </span>
            <span style={{ padding: '8px 10px', borderRadius: 999, background: '#E0F2FE', color: '#0C4A6E', fontSize: 12, fontWeight: 700 }}>
              {summary.activeLevelRooms} on {summary.levelLabel}
            </span>

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

        <div style={{ marginTop: 10, fontSize: 12, color: '#64748B' }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}>{current.eyebrow}</span>
          <span style={{ marginLeft: 8, fontWeight: 700, color: '#0F172A' }}>{current.label}</span>
          <span style={{ marginLeft: 10 }}>{current.description}</span>
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
