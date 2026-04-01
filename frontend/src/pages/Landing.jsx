import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const FEATURES = [
  { icon: '🧩', title: 'Problem Analyzer', color: 'var(--purple)', desc: 'Classifies your ML problem into one of 6 types using NLP (Classification, Regression, NLP, CV, Clustering, Time Series).' },
  { icon: '⚙️', title: 'Algorithm Engine', color: 'var(--cyan)', desc: 'Recommends beginner & advanced models with pros/cons and "why this model" explanations tailored to your problem.' },
  { icon: '📊', title: 'Dataset Finder', color: 'var(--pink)', desc: 'Surfaces the best Kaggle & UCI datasets for your use case, enriched with relevance reasoning by AI.' },
  { icon: '🧹', title: 'Preprocessing Planner', color: 'var(--green)', desc: 'Generates step-by-step preprocessing plans and ready-to-run scikit-learn Pipeline code.' },
  { icon: '📏', title: 'Metrics Advisor', color: 'var(--yellow)', desc: 'Recommends the right evaluation metrics and visualization plots for your specific problem type.' },
  { icon: '🔬', title: 'Experiment Engine', color: 'var(--orange)', desc: 'Designs experiment strategies: baseline, hyperparameter tuning, cross-validation, feature selection & model comparison.' },
  { icon: '💻', title: 'Code Generator', color: 'var(--purple-light)', desc: 'Produces a complete end-to-end Python ML script with data loading, preprocessing, training, and evaluation.' },
  { icon: '🚀', title: 'Execution & Deploy', color: 'var(--cyan-light)', desc: 'Recommends hardware (CPU/GPU), ideal platforms (Colab, AWS), and standard best practices for training models.' },
  { icon: '💬', title: 'ML Chat Assistant', color: 'var(--pink)', desc: 'Ask follow-up questions about any recommendation. Powered by Groq LLaMA 3.3 70B for instant answers.' },
]

const EXAMPLES = [
  'Detect fraudulent credit card transactions',
  'Predict house prices from features',
  'Classify customer reviews as positive or negative',
  'Identify objects in warehouse camera footage',
  'Segment customers by purchasing behavior',
  'Forecast next 30 days of sales demand',
]

const STATS = [
  { value: '6', label: 'ML Problem Types' },
  { value: '40+', label: 'Algorithm Recommendations' },
  { value: '9', label: 'Intelligent Modules' },
  { value: '∞', label: 'Problems Solvable' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [hoveredFeature, setHoveredFeature] = useState(null)

  function handleExample(ex) {
    sessionStorage.setItem('prefill_problem', ex)
    navigate('/analyze')
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '100px 24px 60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div className="badge badge-purple" style={{ marginBottom: '24px' }}>
          🚀 AI-Powered ML Guidance
        </div>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
          From Problem to Pipeline —{' '}
          <span className="gradient-text">Intelligent ML Guidance</span>{' '}
          in One Place
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Describe any machine learning problem in plain English. ModelNavigator AI instantly generates algorithm recommendations, preprocessing pipelines, evaluation strategies, full Python code, and execution environment guidelines.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }} onClick={() => navigate('/analyze')}>
            🧭 Analyze My Problem
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
            Explore Features
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '56px' }}>
          {STATS.map(s => (
            <div key={s.label} className="glass" style={{ padding: '16px 28px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Example chips */}
      <section style={{ padding: '0 24px 60px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Try an example →
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {EXAMPLES.map(ex => (
            <button key={ex} className="chip" onClick={() => handleExample(ex)}>{ex}</button>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '16px' }}>9 Intelligent Modules</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '12px' }}>
            Everything You Need,{' '}
            <span className="gradient-text">All in One Place</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}>
            ModelNavigator isn't just a model picker — it's a complete ML decision-making system.
          </p>
        </div>
        <div className="grid-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card glass-hover"
              style={{ cursor: 'default', borderRadius: 'var(--radius-lg)', padding: '24px' }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{
                width: '48px', height: '48px',
                borderRadius: '14px',
                background: `${f.color}22`,
                border: `1px solid ${f.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '16px',
                transition: 'var(--transition)',
                transform: hoveredFeature === i ? 'scale(1.1)' : 'scale(1)',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ font: '0.875rem/1.6 inherit', color: 'var(--text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '0 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-green" style={{ marginBottom: '16px' }}>How It Works</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800 }}>
            <span className="gradient-text">3 Steps</span> to a Complete ML Blueprint
          </h2>
        </div>
        <div className="grid-3">
          {[
            { step: '01', icon: '✍️', title: 'Describe Your Problem', desc: 'Type a natural-language description of your ML problem. Optionally add dataset details.' },
            { step: '02', icon: '🤖', title: 'AI Analyzes Everything', desc: 'Our AI classifies your problem, recommends algorithms, generates code, and determines execution needs — in seconds.' },
            { step: '03', icon: '🚀', title: 'Get Your Blueprint', desc: 'Review the complete ML pipeline across 8 interactive tabs. Copy code, check deployment platforms, and chat with the ML assistant.' },
          ].map(s => (
            <div key={s.step} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--purple)', marginBottom: '12px', letterSpacing: '0.1em' }}>STEP {s.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '0 24px 100px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '64px 48px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '16px' }}>
            Ready to navigate your{' '}
            <span className="gradient-text">ML journey?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1rem' }}>
            Describe your problem and get a complete ML blueprint in under 30 seconds.
          </p>
          <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 40px' }} onClick={() => navigate('/analyze')}>
            🧭 Start Analyzing → Free
          </button>
        </div>
      </section>
    </div>
  )
}
