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

  const geminiKey = import.meta.env.VITE_GEMINI_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`

  const systemPrompt = `You are a Vedic Astrology expert. Follow instructions exactly. Never add greetings, introductions, or preamble. Start directly with the ## section heading requested. Write minimum 80 words per section. Be specific about planetary positions. Use the person's name. Write in warm simple English.`

  const person = `
Name: ${data.name} | DOB: ${data.dob} | TOB: ${data.tob} | POB: ${data.pob} | Gender: ${data.gender}
Focus: ${data.focusArea} | Marital Status: ${data.maritalStatus || 'Not specified'}
Question: ${data.question || 'General life reading'}
Nakshatra: ${data.nakshatra || 'Derive'} | Pada: ${data.pada} | Moon Sign: ${data.moonSign || 'Derive'} | Lagna: ${data.lagna || 'Derive'} | Mahadasha: ${data.mahadasha || 'Derive'} | Antardasha: ${data.antardasha || 'Derive'}`

  const calls = [
    {
      label: 'Part 1',
      prompt: `Birth details: ${person}

Start DIRECTLY with Section I heading. No introduction. No greeting. Write 80+ words per section.

## 🌟 I. Cosmic Identity — Who You Are
Give ${data.name} a cosmic archetype name. Reference Lagna lord, Moon sign, Nakshatra deity. Make it personal.

## 🔮 II. Core Personality & Soul Blueprint
Cover: nature from Lagna, emotional world from Moon and Nakshatra, strengths, shadow traits, karmic purpose.

## 💪 III. Health & Vitality Forecast
Cover: Ayurvedic constitution, vulnerable body parts from 6th house, health by decade, diet tips, one remedy.
> One critical health warning as blockquote`
    },
    {
      label: 'Part 2',
      prompt: `Birth details: ${person}

Start DIRECTLY with Section IV heading. No introduction. No greeting. Write 80+ words per section.

## 💰 IV. Wealth, Finance & Prosperity
Cover: Dhana Yogas by name, nature of wealth, peak earning years, investment style, key years for financial moves.
> Most important wealth insight as blockquote

## 💼 V. Career, Profession & Life Purpose
Cover: career fields from 10th house, job vs business, professional strengths, milestones, any Rajyogas by name.
> Greatest career strength as blockquote

## 📚 VI. Education & Intellectual Abilities
Cover: academic strengths from Mercury and Jupiter, fields to excel, higher education, overseas prospects, learning style.`
    },
    {
      label: 'Part 3',
      prompt: `Birth details: ${person}

Start DIRECTLY with Section VII heading. No introduction. No greeting. Write 80+ words per section.

## 💑 VII. Love, Marriage & Relationships
Cover: marriage timing from 7th house, ideal partner from 7th lord, love vs arranged, Mangal Dosha assessment, timing window.
> Most important relationship insight as blockquote

## 👨‍👩‍👧 VIII. Family, Children & Home Life
Cover: parents from 4th house, children timing from 5th house, where they settle, family karma.

## 🕉️ IX. Spiritual Path & Karma
Cover: spiritual inclination from 12th house and Ketu, past life karma, dharmic path, beneficial practices.`
    },
    {
      label: 'Part 4',
      prompt: `Birth details: ${person}

Start DIRECTLY with Section X heading. No introduction. No greeting.

## ⏰ X. Current Dasha Analysis — Your Life Right Now
Cover: Mahadasha lord themes, Antardasha flavoring, what ${data.name} is experiencing now, opportunities, challenges, when next Dasha begins.
> Defining theme of this life chapter as blockquote

## 📅 XI. 12-Month Forecast — Month by Month
Write one line per month for next 12 months from June 2026. Strict format:
**June 2026:** [energy — key event — best action]
**July 2026:** [energy — key event — best action]
**August 2026:** [energy — key event — best action]
**September 2026:** [energy — key event — best action]
**October 2026:** [energy — key event — best action]
**November 2026:** [energy — key event — best action]
**December 2026:** [energy — key event — best action]
**January 2027:** [energy — key event — best action]
**February 2027:** [energy — key event — best action]
**March 2027:** [energy — key event — best action]
**April 2027:** [energy — key event — best action]
**May 2027:** [energy — key event — best action]

## 🍀 XII. Lucky Elements & Power Enhancers
- **Lucky Colors:** [2-3 colors with explanation]
- **Lucky Numbers:** [2-3 numbers with explanation]
- **Lucky Days:** [2-3 days with explanation]
- **Power Direction:** [direction with explanation]
- **Favorable Gemstone:** [stone, finger, metal, carats]
- **Best Time of Day:** [for decisions]

## 🙏 XIII. Remedies & Recommendations
- **Mantra:** [exact mantra, times daily, best time to chant]
- **Fasting:** [day, what to avoid, why]
- **Charity:** [what to give, to whom, which day]
- **Color Therapy:** [colors for specific days]
- **Deity Worship:** [deity, why, daily practice]
- **One Life-Changing Habit:** [most powerful change for this chart]

End with a warm 2-sentence closing to ${data.name} by name.`
    }
  ]

  try {
    const results = []

    for (const call of calls) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: call.prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000
          }
        })
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(`${call.label} failed: ${json.error?.message || 'Unknown error'}`)
      }

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) throw new Error(`${call.label} returned empty response`)

      results.push(text.trim())

      // Small pause between calls to be safe with rate limits
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const fullReading = results.join('\n\n---\n\n')
    setReading(fullReading)
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
            <p className="text-xs text-white/30 mb-2">
              This takes 30–45 seconds for a complete reading
            </p>
            <p className="text-xs text-yellow-400/40 mb-8">
              Generating all 13 sections of your chart...
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