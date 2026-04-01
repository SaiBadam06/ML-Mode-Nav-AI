export default function PreprocessingTab({ data }) {
  if (!data) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Steps */}
      <div className="card">
        <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '16px' }}>🧹 Preprocessing Steps</h2>
        <ul className="step-list">
          {(data.steps || []).map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      {/* Code */}
      {data.code && (
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px' }}>⚙️ Generated Python Pipeline Code</h2>
          <div className="code-block">
            <div className="code-block-header">
              <span>preprocessing_pipeline.py</span>
              <button
                onClick={() => navigator.clipboard.writeText(data.code)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem' }}
              >
                📋 Copy
              </button>
            </div>
            <pre>{data.code}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
