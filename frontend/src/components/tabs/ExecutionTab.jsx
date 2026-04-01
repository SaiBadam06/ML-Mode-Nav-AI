export default function ExecutionTab({ data }) {
  if (!data) return null

  const hardwareColor = data.hardware?.tier.toLowerCase().includes('gpu') ? 'var(--purple)' : 'var(--cyan)'
  const getSuitabilityColor = (s) => s.toLowerCase().includes('good') || s.toLowerCase().includes('best') ? 'var(--green)' : 'var(--pink)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hardware Section */}
      <div className="card glass-hover" style={{ border: `1px solid ${hardwareColor}55`, background: `${hardwareColor}11` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ fontSize: '24px' }}>🖥️</div>
          <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: hardwareColor }}>Recommended Hardware: {data.hardware?.tier}</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.hardware?.reasoning}</p>
      </div>

      <div className="grid-2">
        {/* Platforms Section */}
        <div className="card">
          <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '16px' }}>☁️ Platform Suitability</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(data.platforms || []).map((p, i) => (
              <div key={i} style={{ paddingBottom: i !== data.platforms.length - 1 ? '16px' : '0', borderBottom: i !== data.platforms.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.name}</div>
                  <div className="badge" style={{ color: getSuitabilityColor(p.suitability), border: `1px solid ${getSuitabilityColor(p.suitability)}55`, background: `${getSuitabilityColor(p.suitability)}22` }}>
                    {p.suitability}
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {p.reasoning}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="card">
          <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '16px' }}>✅ Execution Best Practices</h2>
          <ul className="step-list">
            {(data.best_practices || []).map((bp, i) => (
              <li key={i} style={{ fontSize: '0.9rem', lineHeight: 1.5, padding: '10px 0' }}>{bp}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}
