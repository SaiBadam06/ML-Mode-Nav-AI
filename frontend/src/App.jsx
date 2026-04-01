import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Analyze from './pages/Analyze'
import Dashboard from './pages/Dashboard'
import ChatWidget from './components/ChatWidget'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <ChatWidget />
    </BrowserRouter>
  )
}
