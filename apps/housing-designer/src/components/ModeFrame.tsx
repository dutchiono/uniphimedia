import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

type ModeFrameProps = {
  title: string
  description: string
  left?: ReactNode
  right?: ReactNode
  toolbar?: ReactNode
  status?: ReactNode
  main: ReactNode
}

const panelStyle: CSSProperties = {
  background: '#F8FAFC',
  border: '1px solid #E2E8F0',
  borderRadius: 16,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
}

export default function ModeFrame({ left, right, toolbar, status, main }: ModeFrameProps) {
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const sync = () => setStacked(window.innerWidth < 1100)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const columns = stacked
    ? 'minmax(0,1fr)'
    : left
      ? (right ? '260px minmax(0,1fr) 280px' : '260px minmax(0,1fr)')
      : (right ? 'minmax(0,1fr) 280px' : 'minmax(0,1fr)')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: '#F1F5F9' }}>
      {toolbar && <div style={{ padding: '12px 18px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>{toolbar}</div>}
      {status && <div style={{ padding: '10px 18px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>{status}</div>}

      <div style={{ flex: 1, minHeight: 0, padding: stacked ? 12 : 18, display: 'grid', gridTemplateColumns: columns, gridAutoRows: stacked ? 'minmax(220px, auto)' : undefined, gap: 16, overflow: 'auto' }}>
        {left && <aside style={panelStyle}>{left}</aside>}
        <section style={{ ...panelStyle, background: '#FFFFFF', minHeight: stacked ? 420 : 0 }}>{main}</section>
        {right && <aside style={panelStyle}>{right}</aside>}
      </div>
    </div>
  )
}
