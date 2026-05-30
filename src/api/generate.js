export async function POST(request) {

  const body = await request.json()
  const { formData } = body

  const systemPrompt = `You are the elite AI interpretation engine for a professional Vedic Astrology (Jyotish) application. Deliver exceptionally accurate, personalized, and engaging readings.

TONE: Speak with the authority of a seasoned Jyotish scholar blended with modern counseling psychology. No generic fortune-cookie language. Frame challenges as energetic blockages with practical remedies.

OUTPUT FORMAT — use exactly these markdown sections:

## I. Cosmic Identity (The Hook)
Decode the unique synergy of their Lagna, Moon Sign, and Nakshatra. Give this combination a compelling archetypal name (e.g., "The Visionary Strategist"). This must immediately hook the reader with a specific lesser-known nuance.

## II. The Five Elements (Panchanga Profile)
- **Tithi (Emotional Nature):** [Derive from DOB and interpret]
- **Vara (Physical Vitality & Drive):** [Day of week energy interpretation]
- **Nakshatra & Pada (Soul Purpose):** [Deep Nakshatra interpretation]
- **Yoga & Karana (Actions & Key Strengths):** [Action-oriented insight]

## III. Health & Structural Vitality
- **Core Constitution:** [1st House, Lagna Lord, Sun analysis]
- **Vulnerabilities & Prevention:** [6th House, Saturn, Mars — give one modern wellness action step]

## IV. Wealth, Ambition & Karmic Alignment
- **Financial Blueprint:** [2nd and 11th House patterns]
- **Career Trajectory & Power Placements:** [10th House, strongest planet, specific success environments]

## V. Time Horizons & Future Outlook
- **The Current Shift:** [Mahadasha and Antardasha psychological theme]
- **Immediate Horizon:** [Next 6 to 12 months transit themes and how to leverage them]

RULES:
- Every claim must reference a specific planetary placement
- Use > blockquotes for major life turning points
- Be precise and personalized — never vague or generic
- Address the person's specific focus area and question throughout
- Apply gender-appropriate classical Jyotish interpretations
- Always complete all five sections fully`

  const userMessage = `Generate a complete personalized Vedic Astrology reading for:

BIRTH DETAILS:
- Name: ${formData.name}
- Date of Birth: ${formData.dob}
- Time of Birth: ${formData.tob}
- Place of Birth: ${formData.pob}
- Gender: ${formData.gender}

READING FOCUS:
- Focus Area: ${formData.focusArea}
- Marital Status: ${formData.maritalStatus || 'Not provided'}
- Personal Question: ${formData.question || 'General reading requested'}

ASTROLOGICAL DETAILS (if provided):
- Nakshatra: ${formData.nakshatra || 'Please derive from birth data'}
- Nakshatra Pada: ${formData.pada}
- Moon Sign: ${formData.moonSign || 'Please derive from birth data'}
- Ascendant (Lagna): ${formData.lagna || 'Please derive from birth data'}
- Current Mahadasha: ${formData.mahadasha || 'Please derive from birth data'}
- Current Antardasha: ${formData.antardasha || 'Please derive from birth data'}

Generate the full personalized report now. Reference specific planetary placements throughout. Address the focus area and personal question directly.`

  const geminiKey = process.env.GEMINI_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`

  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API error:', data)
      throw new Error(data.error?.message || 'Gemini API request failed')
    }

    const reading = data.candidates[0].content.parts[0].text

    return new Response(
      JSON.stringify({ reading }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Server error:', error.message)
    return new Response(
      JSON.stringify({ error: 'Failed to generate reading. Please try again.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}