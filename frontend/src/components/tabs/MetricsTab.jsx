const METRIC_COLORS = ['var(--purple)', 'var(--cyan)', 'var(--green)', 'var(--yellow)', 'var(--pink)']

export default function MetricsTab({ data }) {
  if (!data) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>📏 Evaluation Metrics</h2>
          <div className="badge badge-cyan">{data.metrics?.length || 0} metrics</div>
        </div>
        <div className="grid-auto">
          {(data.metrics || []).map((m, i) => (
            <div key={m.name} className="card glass-hover">
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: `${METRIC_COLORS[i % METRIC_COLORS.length]}22`,
                border: `1px solid ${METRIC_COLORS[i % METRIC_COLORS.length]}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, marginBottom: 12,
              }}>
                📐
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>{m.name}</h3>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: METRIC_COLORS[i % METRIC_COLORS.length],
                background: `${METRIC_COLORS[i % METRIC_COLORS.length]}11`,
                border: `1px solid ${METRIC_COLORS[i % METRIC_COLORS.length]}22`,
                padding: '6px 10px',
                borderRadius: 6,
                marginBottom: 10,
              }}>
                {m.formula}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{m.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visualization suggestions */}
      {data.visualizations?.length > 0 && (
        <div className="card">
          <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '16px' }}>📈 Recommended Visualizations</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.visualizations.map((v, i) => (
              <div key={v} className="chip" style={{ cursor: 'default', background: `${METRIC_COLORS[i % METRIC_COLORS.length]}11`, borderColor: `${METRIC_COLORS[i % METRIC_COLORS.length]}44`, color: METRIC_COLORS[i % METRIC_COLORS.length] }}>
                📊 {v}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
