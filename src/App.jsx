import { useState } from 'react'
import './App.css'
import BirthForm from './components/BirthForm'
import ReadingReport from './components/ReadingReport'

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
  const [reading, setReading] = useState('')

  async function handleFormSubmit(data) {
    setFormData(data)
    setScreen('loading')

    const systemPrompt = `You are the elite AI interpretation engine for a professional Vedic Astrology (Jyotish) application. Deliver exceptionally accurate, personalized, and engaging readings.

TONE: Speak with the authority of a seasoned Jyotish scholar blended with modern counseling psychology. No generic fortune-cookie language. Frame challenges as energetic blockages with practical remedies.

OUTPUT FORMAT — use exactly these markdown sections:

## I. Cosmic Identity (The Hook)
Decode the unique synergy of their Lagna, Moon Sign, and Nakshatra. Give this combination a compelling archetypal name. Hook the reader with a specific lesser-known nuance immediately.

## II. The Five Elements (Panchanga Profile)
- **Tithi (Emotional Nature):** [Derive from DOB and interpret]
- **Vara (Physical Vitality & Drive):** [Day of week energy interpretation]
- **Nakshatra & Pada (Soul Purpose):** [Deep Nakshatra interpretation]
- **Yoga & Karana (Actions & Key Strengths):** [Action-oriented insight]

## III. Health & Structural Vitality
- **Core Constitution:** [1st House, Lagna Lord, Sun analysis]
- **Vulnerabilities & Prevention:** [6th House, Saturn, Mars — one modern wellness action step]

## IV. Wealth, Ambition & Karmic Alignment
- **Financial Blueprint:** [2nd and 11th House patterns]
- **Career Trajectory & Power Placements:** [10th House, strongest planet, specific success environments]

## V. Time Horizons & Future Outlook
- **The Current Shift:** [Mahadasha and Antardasha psychological theme]
- **Immediate Horizon:** [Next 6 to 12 months transit themes and how to leverage them]

RULES:
- Every claim must reference a specific planetary placement
- Use blockquotes for major life turning points
- Be precise and personalized — never vague or generic
- Address the person's specific focus area and question throughout
- Always complete all five sections fully`

    const userMessage = `Generate a complete personalized Vedic Astrology reading for:

BIRTH DETAILS:
- Name: ${data.name}
- Date of Birth: ${data.dob}
- Time of Birth: ${data.tob}
- Place of Birth: ${data.pob}
- Gender: ${data.gender}

READING FOCUS:
- Focus Area: ${data.focusArea}
- Marital Status: ${data.maritalStatus || 'Not provided'}
- Personal Question: ${data.question || 'General reading requested'}

ASTROLOGICAL DETAILS (if provided):
- Nakshatra: ${data.nakshatra || 'Please derive from birth data'}
- Nakshatra Pada: ${data.pada}
- Moon Sign: ${data.moonSign || 'Please derive from birth data'}
- Ascendant (Lagna): ${data.lagna || 'Please derive from birth data'}
- Current Mahadasha: ${data.mahadasha || 'Please derive from birth data'}
- Current Antardasha: ${data.antardasha || 'Please derive from birth data'}

Generate the full personalized report now.`

    const geminiKey = import.meta.env.VITE_GEMINI_KEY
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 2000
          }
        })
      })

      const data2 = await response.json()

      if (!response.ok) {
        throw new Error(data2.error?.message || 'API request failed')
      }

      const readingText = data2.candidates[0].content.parts[0].text
      setReading(readingText)
      setScreen('report')

    } catch (error) {
      console.error('Error:', error.message)
      setScreen('form')
      alert('Something went wrong: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-10">

        {screen === 'form' && (
          <BirthForm onSubmit={handleFormSubmit} />
        )}

        {screen === 'loading' && (
  <div className="text-center py-24">
    <div className="text-5xl mb-6 animate-spin inline-block">
      ☀
    </div>
    <p className="font-serif text-2xl text-gray-700 mb-2">
      Consulting the Cosmos...
    </p>
    <p className="text-sm text-gray-400 mb-6">
      Preparing your personalized Jyotish reading
    </p>
    <div className="flex justify-center gap-1">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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