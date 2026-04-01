import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000/api'

const WELCOME = { role: 'assistant', content: "👋 Hi! I'm your ML Assistant. Ask me anything about algorithms, metrics, preprocessing, or the recommendations you just received!" }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const { data } = await axios.post(`${API}/chat`, {
        messages: [...messages, userMsg].filter(m => m.role !== 'system'),
        context: sessionStorage.getItem('mn_results')
          ? JSON.parse(sessionStorage.getItem('mn_results'))?.analyze?.problem_type
          : '',
      })
      setMessages(m => [...m, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: '⚠️ Could not reach the backend. Is it running on port 8000?' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>🤖</span>
            <span>ML Assistant</span>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontSize: 18, lineHeight: 1 }}
            >✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble assistant" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ animation: 'pulse 1s infinite' }}>●</span>
                <span style={{ animation: 'pulse 1s 0.2s infinite' }}>●</span>
                <span style={{ animation: 'pulse 1s 0.4s infinite' }}>●</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask about ML concepts..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="chat-send" onClick={sendMessage} disabled={loading}>➤</button>
          </div>
        </div>
      )}
      <button
        id="chat-toggle-btn"
        className="chat-toggle"
        onClick={() => setOpen(o => !o)}
        title="ML Assistant"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
