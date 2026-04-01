export default function DatasetsTab({ data }) {
  if (!data) return null
  const datasets = data.datasets || []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>📊 Recommended Datasets</h2>
        <div className="badge badge-cyan">{datasets.length} datasets</div>
      </div>
      <div className="grid-auto">
        {datasets.map((d, i) => (
          <div key={i} className="card glass-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.3 }}>{d.name}</h3>
                <div className="badge badge-yellow" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{d.size}</div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{d.description}</p>
            </div>
            {d.relevance && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 8, lineHeight: 1.5 }}>
                🎯 {d.relevance}
              </div>
            )}
            <div className="divider" style={{ margin: '0' }} />
            <a
              href={d.link}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.83rem', justifyContent: 'center' }}
            >
              🔗 View Dataset →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
