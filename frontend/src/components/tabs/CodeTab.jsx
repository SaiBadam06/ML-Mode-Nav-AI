import { useState } from 'react'

export default function CodeTab({ data }) {
  const [copied, setCopied] = useState(false)
  
  if (!data) return null

  function handleCopy() {
    navigator.clipboard.writeText(data.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>💻 End-to-End ML Code</h2>
          <div className="badge badge-purple">Python</div>
        </div>
        <button
          className="btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.88rem' }}
          onClick={handleCopy}
        >
          {copied ? '✅ Copied!' : '📋 Copy Code'}
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="code-block-header">
          <span>🐍 ml_pipeline.py</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--green)' }}>● Ready to run</span>
        </div>
        <pre style={{
          margin: 0,
          padding: '24px',
          overflowX: 'auto',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: '#e2e8f0',
          background: '#08080f',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {(() => {
            if (!data.code) return '# Loading...'
            let code = data.code.replace(/\\n/g, '\n')
            code = code.replace(/^```[a-z]*\n?/im, '')
            code = code.replace(/```$/m, '')
            return code.trim()
          })()}
        </pre>
      </div>

      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>⚡ Dependencies: scikit-learn, pandas, numpy</span>
          <span>📁 Save as <code style={{ fontFamily: 'monospace', color: 'var(--cyan)' }}>ml_pipeline.py</code></span>
          <span>🚀 Run: <code style={{ fontFamily: 'monospace', color: 'var(--cyan)' }}>python ml_pipeline.py</code></span>
        </div>
      </div>
    </div>
  )
}
