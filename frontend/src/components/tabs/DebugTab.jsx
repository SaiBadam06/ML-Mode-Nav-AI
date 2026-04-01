import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function DebugTab({ results }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! I'm your AI Debugger. I've reviewed the generated ML code for your problem. If you encounter any errors or have questions about how to run it, paste them here!"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || isLoading) return
    
    const userMessage = { role: 'user', text: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Create chat history to send to backend exactly as required
      const historyToSend = messages
        .filter(m => m.role === 'user' || m.role === 'ai' && m.text !== messages[0].text)
        .map(m => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: m.text
        }))
      
      historyToSend.push({ role: 'user', content: userMessage.text })

      const res = await fetch('http://localhost:8000/api/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context: results,
          history: historyToSend
        })
      })

      if (!res.ok) throw new Error('Failed to analyze code')
      const result = await res.json()
      
      setMessages(prev => [...prev, { role: 'ai', text: result.analysis }])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ Connection error. Please make sure the backend is running and try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '600px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ fontSize: '1.4rem' }}>🤖</div>
        <div>
          <h2 style={{ fontWeight: 600, fontSize: '1.05rem', margin: 0 }}>AI Code Debugger</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered by Context-Aware LLM</div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ marginBottom: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: msg.role === 'ai' ? '12px' : 0, marginRight: msg.role === 'user' ? '12px' : 0 }}>
              {msg.role === 'user' ? 'You' : 'AI Debugger'}
            </div>
            <div style={{
              maxWidth: '88%',
              padding: '16px 20px',
              borderRadius: '20px',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
              borderTopLeftRadius: msg.role === 'ai' ? '4px' : '20px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(79, 70, 229, 0.15))' : 'rgba(25, 25, 35, 0.9)',
              border: msg.role === 'user' ? '1px solid rgba(167, 139, 250, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: msg.role === 'user' ? '0 8px 24px rgba(79, 70, 229, 0.15)' : '0 4px 12px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="prose markdown-body" style={{ fontSize: '0.95rem', color: '#f8fafc', lineHeight: 1.6 }}>
                 {msg.role === 'ai' ? 
                   <ReactMarkdown 
                     components={{
                       code({node, inline, className, children, ...props}) {
                         return !inline ? (
                           <div style={{ background: '#0d0d14', borderRadius: '8px', padding: '16px', margin: '12px 0', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto', outline: '1px solid rgba(79, 70, 229, 0.2)' }}>
                             <code style={{ fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace", color: '#e2e8f0' }} {...props}>{children}</code>
                           </div>
                         ) : (
                           <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em', color: 'var(--cyan)' }} {...props}>{children}</code>
                         )
                       }
                     }}
                   >
                     {msg.text}
                   </ReactMarkdown> 
                   : <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              borderTopLeftRadius: '4px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              display: 'flex',
              gap: '6px'
            }}>
              <span className="dot-typing">...</span> Thinking
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: 'linear-gradient(to top, rgba(16,16,24,1) 50%, rgba(16,16,24,0.6))', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '16px', border: '1px solid rgba(79, 70, 229, 0.3)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2), 0 0 20px rgba(79, 70, 229, 0.1)' }}>
          <textarea
            className="input-field"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste stack traces playfully, or ask deeply technical questions about the generated code..."
            style={{ flex: 1, minHeight: '52px', maxHeight: '180px', resize: 'vertical', lineHeight: '1.6', fontFamily: 'inherit', border: 'none', background: 'transparent', boxShadow: 'none', padding: '12px 16px', fontSize: '0.95rem', color: '#ffffff' }}
            disabled={isLoading}
          />
          <button
            className="btn-primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            style={{ height: '48px', padding: '0 24px', whiteSpace: 'nowrap', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(135deg, var(--purple), #4f46e5)', border: 'none' }}
          >
            {isLoading ? '⏳ Searching...' : <><span className="desktop-only">Deploy Request </span>🚀</>}
          </button>
        </div>
      </div>

      <style>{`
        .dot-typing { animation: flash 1.4s infinite linear; }
        @keyframes flash {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
