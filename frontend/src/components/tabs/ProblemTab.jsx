const TYPE_COLORS = {
  Classification: 'var(--purple)', Regression: 'var(--cyan)', Clustering: 'var(--green)',
  NLP: 'var(--yellow)', 'Computer Vision': 'var(--pink)', 'Time Series': 'var(--orange)',
}
const TYPE_ICONS = {
  Classification: '🏷️', Regression: '📈', Clustering: '🔵',
  NLP: '💬', 'Computer Vision': '👁️', 'Time Series': '⏱️',
}

export default function ProblemTab({ data }) {
  if (!data) return null
  const color = TYPE_COLORS[data.problem_type] || 'var(--purple)'
  const icon = TYPE_ICONS[data.problem_type] || '🧩'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Main classification card */}
      <div className="card" style={{ border: `1px solid ${color}44`, background: `${color}11` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: `${color}22`, border: `2px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '6px' }}>
              Problem Classification
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color, marginBottom: '8px' }}>{data.problem_type}</h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="stat-pill">🌐 <strong>{data.domain}</strong></div>
              <div className="stat-pill">🎯 Confidence: <strong>{Math.round(data.confidence * 100)}%</strong></div>
            </div>
          </div>
          {/* Confidence ring */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="8"
                strokeDasharray={`${data.confidence * 201} 201`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
              <text x="40" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
                {Math.round(data.confidence * 100)}%
              </text>
            </svg>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>confidence</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <h3 style={{ marginBottom: '12px', fontSize: '0.95rem', fontWeight: 700 }}>📋 Why This Classification?</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.summary}</p>
      </div>

      {/* Key challenges + approach */}
      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '14px', fontSize: '0.95rem', fontWeight: 700 }}>⚠️ Key Challenges</h3>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 2, fontSize: '0.9rem' }}>
            {(data.key_challenges || []).map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '14px', fontSize: '0.95rem', fontWeight: 700 }}>🎯 Suggested Approach</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>{data.suggested_approach}</p>
        </div>
      </div>
    </div>
  )
}
