import { useState } from 'react'
import './App.css'
import BirthForm from './components/BirthForm'
import ReadingReport from './components/ReadingReport'

function Header() {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3 text-yellow-400 mb-1">
          <span className="text-2xl">☽</span>
          <span className="text-4xl">☀</span>
          <span className="text-2xl">✦</span>
        </div>
        <h1 className="font-serif text-4xl font-medium tracking-widest text-white">
          Jyotish
        </h1>
        <p className="text-xs text-yellow-300/70 tracking-[0.25em] uppercase mt-0.5">
          Vedic Astrology · AI Powered
        </p>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-2"></div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 py-6 text-center border-t border-white/10">
      <p className="text-xs text-white/30 tracking-wider">
        JYOTISH · Vedic Astrology · Powered by AI
      </p>
      <p className="text-xs text-white/20 mt-1">
        For guidance purposes · Consult a professional for major decisions
      </p>
    </footer>
  )
}

function App() {
  const [screen, setScreen] = useState('form')
  const [formData, setFormData] = useState(null)
  const [reading, setReading] = useState('')

  async function handleFormSubmit(data) {
    setFormData(data)
    setScreen('loading')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: data })
      })

      const result = await response.json()

      if (result.error) {
        setScreen('form')
        alert(result.error)
        return
      }

      setReading(result.reading)
      setScreen('report')

    } catch (error) {
      console.error('Error:', error.message)
      setScreen('form')
      alert('Something went wrong: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-10">

        {screen === 'form' && (
          <BirthForm onSubmit={handleFormSubmit} />
        )}

        {screen === 'loading' && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 animate-spin inline-block text-yellow-400">
              ☀
            </div>
            <p className="font-serif text-3xl text-white mb-2">
              Consulting the Cosmos...
            </p>
            <p className="text-sm text-white/40 mb-2">
              Preparing your personalized Jyotish reading
            </p>
            <p className="text-xs text-white/30 mb-8">
              This takes 20–30 seconds for a complete reading
            </p>
            <div className="flex justify-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}>
              </span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}>
              </span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}>
              </span>
            </div>
          </div>
        )}

        {screen === 'report' && (
          <ReadingReport
            reading={reading}
            name={formData?.name}
            onNewReading={() => {
              setScreen('form')
              setReading('')
              setFormData(null)
            }}
          />
        )}

      </main>
      <Footer />
    </div>
  )
}

export default App