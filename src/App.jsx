import { useState } from 'react'
import './App.css'
import BirthForm from './components/BirthForm'

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3 text-yellow-600">
          <span className="text-2xl">☽</span>
          <span className="text-3xl">☀</span>
          <span className="text-2xl">✦</span>
        </div>
        <h1 className="font-serif text-3xl font-medium tracking-wide text-gray-800">
          Jyotish
        </h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          Vedic Astrology Reading
        </p>
        <div className="w-8 h-0.5 bg-yellow-600 rounded mt-1"></div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 py-6 text-center text-xs text-gray-400 border-t border-gray-100">
      Jyotish — Powered by AI · Built with ♡
    </footer>
  )
}

function App() {
  const [screen, setScreen] = useState('form')
  const [formData, setFormData] = useState(null)

  function handleFormSubmit(data) {
    setFormData(data)
    setScreen('loading')
    console.log('Form submitted:', data)
  }

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-10">

        {screen === 'form' && (
          <BirthForm onSubmit={handleFormSubmit} />
        )}

        {screen === 'loading' && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-gray-700 mb-2">
              Consulting the Cosmos...
            </p>
            <p className="text-sm text-gray-400">
              Reading your cosmic blueprint
            </p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}

export default App