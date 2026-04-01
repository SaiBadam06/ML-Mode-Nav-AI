const PRIORITY_BADGE = {
  High: 'badge-pink',
  Medium: 'badge-yellow',
  Low: 'badge-cyan',
}

export default function ExperimentsTab({ data }) {
  if (!data) return null
  const strategies = data.strategies || []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>🔬 Experiment Strategies</h2>
        <div className="badge badge-purple">{strategies.length} strategies</div>
      </div>

      {strategies.map((s, i) => (
        <div key={i} className="card glass-hover">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{i + 1}. {s.title}</h3>
            <div className={`badge ${PRIORITY_BADGE[s.priority] || 'badge-cyan'}`} style={{ flexShrink: 0 }}>
              {s.priority} Priority
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '14px', lineHeight: 1.6 }}>{s.description}</p>
          <div className="divider" />
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Action Steps</div>
            <ul className="step-list" style={{ margin: 0 }}>
              {(s.steps || []).map((step, j) => <li key={j} style={{ padding: '8px 0', fontSize: '0.875rem' }}>{step}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
