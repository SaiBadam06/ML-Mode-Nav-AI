import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProblemTab from '../components/tabs/ProblemTab'
import AlgorithmsTab from '../components/tabs/AlgorithmsTab'
import DatasetsTab from '../components/tabs/DatasetsTab'
import PreprocessingTab from '../components/tabs/PreprocessingTab'
import MetricsTab from '../components/tabs/MetricsTab'
import ExperimentsTab from '../components/tabs/ExperimentsTab'
import CodeTab from '../components/tabs/CodeTab'
import ExecutionTab from '../components/tabs/ExecutionTab'
import DebugTab from '../components/tabs/DebugTab'

const TABS = [
  { key: 'problem', label: 'Problem', icon: '🧩' },
  { key: 'algorithms', label: 'Algorithms', icon: '⚙️' },
  { key: 'datasets', label: 'Datasets', icon: '📊' },
  { key: 'preprocessing', label: 'Preprocessing', icon: '🧹' },
  { key: 'metrics', label: 'Metrics', icon: '📏' },
  { key: 'experiments', label: 'Experiments', icon: '🔬' },
  { key: 'code', label: 'Code', icon: '💻' },
  { key: 'execution', label: 'Execution', icon: '🚀' },
  { key: 'debug', label: 'Debug AI', icon: '🤖' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('problem')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('mn_results')
    if (!raw) { navigate('/analyze'); return }
    setResults(JSON.parse(raw))
  }, [])

  if (!results) return null

  const tabContent = {
    problem: <ProblemTab data={results.analyze} />,
    algorithms: <AlgorithmsTab data={results.recommend} />,
    datasets: <DatasetsTab data={results.datasets} />,
    preprocessing: <PreprocessingTab data={results.preprocessing} />,
    metrics: <MetricsTab data={results.metrics} />,
    experiments: <ExperimentsTab data={results.experiments} />,
    code: <CodeTab data={results.codegen} />,
    execution: <ExecutionTab data={results.execution} />,
    debug: <DebugTab results={results} />,
  }

  return (
    <div className="section" style={{ maxWidth: '1200px', paddingTop: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => navigate('/analyze')}>
            ← New Analysis
          </button>
          <div className="badge badge-green">✓ Analysis Complete</div>
        </div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 800 }}>
          ML Blueprint: <span className="gradient-text">{results.problem.length > 80 ? results.problem.slice(0, 80) + '…' : results.problem}</span>
        </h1>
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
          <div className="stat-pill">🧩 <strong>{results.analyze.problem_type}</strong></div>
          <div className="stat-pill">🌐 Domain: <strong>{results.analyze.domain}</strong></div>
          <div className="stat-pill">🎯 Confidence: <strong>{Math.round(results.analyze.confidence * 100)}%</strong></div>
          {results.recommend.top_pick && <div className="stat-pill">⭐ Top Model: <strong>{results.recommend.top_pick}</strong></div>}
        </div>
      </div>

      {/* Feature Navigation Dropdown */}
      <div className="mobile-dropdown" style={{ position: 'relative', marginBottom: '28px', maxWidth: '340px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
          Select Feature
        </div>
        <button 
          className="btn-secondary" 
          style={{ width: '100%', justifyContent: 'space-between', padding: '16px 20px', fontSize: '1.05rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>{TABS.find(t => t.key === activeTab)?.icon}</span>
            <span style={{ fontWeight: 600 }}>{TABS.find(t => t.key === activeTab)?.label}</span>
          </span>
          <span style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', fontSize: '0.8rem' }}>▼</span>
        </button>
        
        {showDropdown && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', background: '#101018', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.8)', animation: 'dropdownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)', backdropFilter: 'blur(20px)' }}>
            {TABS.map(t => (
              <div 
                key={t.key}
                style={{ 
                  padding: '14px 20px', 
                  cursor: 'pointer', 
                  background: activeTab === t.key ? 'rgba(79, 70, 229, 0.15)' : 'transparent', 
                  borderBottom: '1px solid rgba(255,255,255,0.03)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => { if (activeTab !== t.key) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={(e) => { if (activeTab !== t.key) e.currentTarget.style.background = 'transparent' }}
                onClick={() => { setActiveTab(t.key); setShowDropdown(false); }}
              >
                <span style={{ fontSize: '1.2rem', opacity: activeTab === t.key ? 1 : 0.7 }}>{t.icon}</span>
                <span style={{ 
                  fontWeight: activeTab === t.key ? 700 : 500, 
                  color: activeTab === t.key ? 'var(--cyan)' : 'var(--text-secondary)' 
                }}>
                  {t.label}
                </span>
                {activeTab === t.key && <span style={{ marginLeft: 'auto', color: 'var(--cyan)' }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab content */}
      <div style={{ animation: 'fadeIn 0.2s ease' }}>
        {tabContent[activeTab]}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dropdownFade { from { opacity: 0; transform: translateY(-10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  )
}
