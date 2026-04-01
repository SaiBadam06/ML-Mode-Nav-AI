export default function AlgorithmsTab({ data }) {
  if (!data) return null

  function AlgoCard({ algo, isTopPick }) {
    return (
      <div className="card glass-hover" style={{ 
        position: 'relative', 
        border: isTopPick ? '1px solid var(--purple)' : '1px solid var(--border)',
        marginTop: isTopPick ? '20px' : '0',
        boxShadow: isTopPick ? '0 0 20px rgba(124, 58, 237, 0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {isTopPick && (
          <div style={{ position: 'absolute', top: -14, left: 16, zIndex: 10 }}>
            <div className="badge badge-purple" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)', background: 'var(--purple)', border: '1px solid var(--purple-light)' }}>
              ⭐ Top Pick
            </div>
          </div>
        )}
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{algo.name}</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{algo.description}</p>
        </div>
        <div className="divider" />
        <div style={{ marginBottom: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', padding: '10px', background: 'rgba(124,58,237,0.06)', borderRadius: 8 }}>
          💡 {algo.why_this_model}
        </div>
        <div className="grid-2" style={{ gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>Pros</div>
            <ul className="pro-list">{(algo.pros || []).map(p => <li key={p}>{p}</li>)}</ul>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--pink)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>Cons</div>
            <ul className="con-list">{(algo.cons || []).map(c => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {data.top_pick_reason && (
        <div className="card" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid var(--border-accent)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--purple-light)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>🏆 Best Choice for Your Problem</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>{data.top_pick}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{data.top_pick_reason}</div>
        </div>
      )}

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>🌱 Beginner-Friendly Models</h2>
          <div className="badge badge-green">{data.beginner?.length || 0} models</div>
        </div>
        <div className="grid-auto">
          {(data.beginner || []).map(a => <AlgoCard key={a.name} algo={a} isTopPick={a.name === data.top_pick} />)}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>🚀 Advanced Models</h2>
          <div className="badge badge-purple">{data.advanced?.length || 0} models</div>
        </div>
        <div className="grid-auto">
          {(data.advanced || []).map(a => <AlgoCard key={a.name} algo={a} isTopPick={a.name === data.top_pick} />)}
        </div>
      </div>
    </div>
  )
}
