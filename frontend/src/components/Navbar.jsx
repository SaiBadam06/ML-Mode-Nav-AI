import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/" onClick={e => { e.preventDefault(); navigate('/') }}>
        <div className="navbar-logo">🧭</div>
        <span className="navbar-name">ModelNavigator AI</span>
      </a>
      <div className="navbar-links">
        <button className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>Home</button>
        <button className={`navbar-link ${location.pathname === '/analyze' ? 'active' : ''}`} onClick={() => navigate('/analyze')}>Analyze</button>
        {location.pathname === '/dashboard' && (
          <button className="navbar-link active">Dashboard</button>
        )}
        <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }} onClick={() => navigate('/analyze')}>
          Try It →
        </button>
      </div>
    </nav>
  )
}
