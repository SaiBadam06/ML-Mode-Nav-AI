import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const LOADING_STEPS = [
  { key: 'analyze', label: 'Analyzing your problem...' },
  { key: 'recommend', label: 'Recommending algorithms...' },
  { key: 'datasets', label: 'Finding relevant datasets...' },
  { key: 'preprocessing', label: 'Building preprocessing pipeline...' },
  { key: 'metrics', label: 'Selecting evaluation metrics...' },
  { key: 'experiments', label: 'Designing experiment strategy...' },
  { key: 'codegen', label: 'Generating Python code...' },
  { key: 'execution', label: 'Determining execution needs...' },
]

export default function Analyze() {
  const navigate = useNavigate()
  const [problem, setProblem] = useState('')
  const [datasetInfo, setDatasetInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [doneSteps, setDoneSteps] = useState([])
  const [activeStep, setActiveStep] = useState(null)
  const [error, setError] = useState('')

  // Prefill from landing page example chips
  useEffect(() => {
    const prefill = sessionStorage.getItem('prefill_problem')
    if (prefill) { setProblem(prefill); sessionStorage.removeItem('prefill_problem') }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!problem.trim()) return
    setLoading(true)
    setError('')
    setDoneSteps([])
    setActiveStep('analyze')

    try {
      // Step 1: Analyze
      const { data: analyzeData } = await axios.post(`${API}/analyze`, { problem, dataset_info: datasetInfo })
      const { problem_type, domain } = analyzeData
      setDoneSteps(['analyze']); setActiveStep('recommend')

      // Steps 2-7 in parallel
      const [recommend, datasets, preprocessing, metrics, experiments, codegen] = await Promise.all([
        axios.post(`${API}/recommend`, { problem, problem_type, domain }).then(r => { setDoneSteps(d => [...d, 'recommend']); return r }),
        axios.post(`${API}/datasets`, { problem, problem_type, domain }).then(r => { setDoneSteps(d => [...d, 'datasets']); return r }),
        axios.post(`${API}/preprocessing`, { problem, problem_type, dataset_info: datasetInfo }).then(r => { setDoneSteps(d => [...d, 'preprocessing']); return r }),
        axios.post(`${API}/metrics`, { problem_type }).then(r => { setDoneSteps(d => [...d, 'metrics']); return r }),
        axios.post(`${API}/experiments`, { problem, problem_type, top_model: '' }).then(r => { setDoneSteps(d => [...d, 'experiments']); return r }),
        axios.post(`${API}/codegen`, { problem, problem_type, top_model: '', dataset_info: datasetInfo }).then(r => { setDoneSteps(d => [...d, 'codegen']); return r }),
      ])
      setActiveStep('execution')

      // Step 8: Execution
      const { data: execData } = await axios.post(`${API}/execution`, {
        problem,
        problem_type,
        top_model: recommend.data.top_pick || '',
      })
      setDoneSteps(d => [...d, 'execution'])
      setActiveStep(null)

      // Store in session and navigate
      sessionStorage.setItem('mn_results', JSON.stringify({
        problem,
        analyze: analyzeData,
        recommend: recommend.data,
        datasets: datasets.data,
        preprocessing: preprocessing.data,
        metrics: metrics.data,
        experiments: experiments.data,
        codegen: codegen.data,
        execution: execData,
      }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Something went wrong. Is the backend running?')
      setLoading(false)
      setActiveStep(null)
    }
  }

  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Building Your ML Blueprint</h2>
          <div className="loading-steps">
            {LOADING_STEPS.map(s => {
              const isDone = doneSteps.includes(s.key)
              const isActive = activeStep === s.key || (!isDone && activeStep && LOADING_STEPS.findIndex(x => x.key === activeStep) > LOADING_STEPS.findIndex(x => x.key === s.key))
              return (
                <div key={s.key} className={`loading-step ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                  <div className="step-dot" />
                  {isDone ? '✓ ' : ''}{s.label}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="section" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '16px' }}>Step 1 of 1</div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>
            Describe Your{' '}
            <span className="gradient-text">ML Problem</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Write in plain English. The more detail you provide, the better the recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card analyze-card" style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.5)', background: 'rgba(15,15,22,0.95)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
          {/* Subtle glow behind form */}
          <div style={{ position: 'absolute', top: 0, left: '20%', width: '60%', height: '100%', background: 'radial-gradient(circle at top, rgba(79, 70, 229, 0.1), transparent 70%)', pointerEvents: 'none', zIndex: -1 }}></div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>🧩</span> 
              <span style={{ fontWeight: 600 }}>Core Problem Description</span>
              <span style={{ color: 'var(--pink)', fontSize: '0.8rem', marginLeft: 'auto' }}>* REQUIRED</span>
            </label>
            <textarea
              id="problem-input"
              className="input-field"
              rows={6}
              placeholder="e.g. I want to predict whether a loan application will default or not. I have 50,000 rows of data with borrower demographics, credit scores, income, loan amount, and repayment history..."
              value={problem}
              onChange={e => setProblem(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--cyan)', marginTop: '8px', display: 'block' }}>
              💡 Tip: Include the goal, data type, and any domain context for the best results.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📁</span> 
              <span style={{ fontWeight: 600 }}>Dataset Details</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto', fontWeight: 400 }}>(OPTIONAL)</span>
            </label>
            <textarea
              id="dataset-input"
              className="input-field"
              rows={3}
              placeholder="e.g. CSV file with 50k rows, columns: age, income, credit_score, loan_amount, default (target), some missing values in income column..."
              value={datasetInfo}
              onChange={e => setDatasetInfo(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-md)', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', color: '#f472b6', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            id="analyze-btn"
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '16px' }}
            disabled={loading || !problem.trim()}
          >
            {loading ? '⏳ Analyzing...' : '🧭 Generate ML Blueprint →'}
          </button>
        </form>

        {/* Quick tip cards */}
        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { icon: '✅', title: 'Great prompts include', items: ['The final goal/prediction', 'Data type (tabular, image, text)', 'Approximate dataset size', 'Domain context'] },
            { icon: '⚡', title: 'What you\'ll get', items: ['Problem type classification', 'Algorithm recommendations', 'Complete Python code', 'Execution Environment'] },
          ].map(tip => (
            <div key={tip.title} className="card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '0.9rem' }}>{tip.icon} {tip.title}</div>
              <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                {tip.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
