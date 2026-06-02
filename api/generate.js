export async function POST(request) {

  const body = await request.json()
  const { formData } = body

  const systemPrompt = `You are a world-class Vedic Astrology (Jyotish) expert with 25 years of experience, trained in Brihat Parashara Hora Shastra, Jaimini Sutras, and Phaladeepika. You serve the Indian market where astrology guides major life decisions.

CRITICAL RULES:
- Write ALL 13 sections completely — never skip or summarize
- Each section minimum 120 words, specific and actionable
- Use the person's name throughout
- Reference exact planetary placements (e.g., "Jupiter in 9th house")
- Be warm, like a trusted family astrologer
- Write in simple English — avoid jargon without explanation

OUTPUT FORMAT — Generate these 13 sections in order with no introduction, no preamble:`

  const userMessage = `Generate a COMPLETE 13-section Vedic Astrology reading for ${formData.name}.

BIRTH DETAILS:
- Date of Birth: ${formData.dob}
- Time of Birth: ${formData.tob}
- Place of Birth: ${formData.pob}
- Gender: ${formData.gender}

FOCUS & CONTEXT:
- Primary Focus Area: ${formData.focusArea}
- Marital Status: ${formData.maritalStatus || 'Not specified'}
- Personal Question: ${formData.question || 'Please provide a complete life reading'}

ASTROLOGICAL DETAILS:
- Nakshatra: ${formData.nakshatra || 'Calculate from birth data'}
- Nakshatra Pada: ${formData.pada}
- Moon Sign: ${formData.moonSign || 'Calculate from birth data'}
- Ascendant (Lagna): ${formData.lagna || 'Calculate from birth data'}
- Mahadasha: ${formData.mahadasha || 'Calculate from birth data'}
- Antardasha: ${formData.antardasha || 'Calculate from birth data'}

GENERATE EXACTLY THESE 13 SECTIONS:

## 🌟 I. Cosmic Identity — Who You Are
Name ${formData.name}'s cosmic archetype. Describe what makes their chart unique using Lagna lord, Moon sign, and Nakshatra deity. (120+ words, personal and specific)

## 🔮 II. Core Personality & Soul Blueprint
Cover: fundamental nature from Lagna, emotional world from Moon and Nakshatra, hidden strengths, shadow traits, how others perceive them, karmic purpose. (120+ words)

## 💪 III. Health & Vitality Forecast
Cover: Ayurvedic constitution from Lagna, vulnerable body parts from 6th house, health risks by decade (20s, 30s, 40s, 50s), diet recommendations, one remedy. End with a blockquote > of the most critical health warning. (120+ words)

## 💰 IV. Wealth, Finance & Prosperity
Cover: Dhana Yogas by name if present, nature of wealth (inherited/self-made/business/service), peak earning years based on Dasha, investment style, specific years in next decade for major financial moves. End with a blockquote > of the single most important wealth insight. (120+ words)

## 💼 V. Career, Profession & Life Purpose
Cover: most suitable career fields from 10th house, job vs business suitability, professional strengths, career challenges, expected milestones, any Rajyogas by name. End with a blockquote > of their greatest career strength. (120+ words)

## 📚 VI. Education & Intellectual Abilities
Cover: academic strengths from Mercury and Jupiter, fields to excel in, higher education and overseas prospects, learning style, challenges and solutions. (120+ words)

## 💑 VII. Love, Marriage & Relationships
Cover: marriage timing from 7th house and Venus, ideal partner qualities from 7th house sign and lord, love vs arranged marriage indication, Mangal Dosha assessment, compatibility factors, expected marriage timing window. End with a blockquote > of the most important relationship insight. (120+ words)

## 👨‍👩‍👧 VIII. Family, Children & Home Life
Cover: relationship with parents from 4th house, children timing and number from 5th house, where they are likely to settle, family karma and responsibilities. (120+ words)

## 🕉️ IX. Spiritual Path & Karma
Cover: spiritual inclination from 12th house and Ketu, past life karma they are resolving, dharmic path and life purpose, beneficial spiritual practices for their chart, relationship with the divine. (120+ words)

## ⏰ X. Current Dasha Analysis — Your Life Right Now
Cover: what the Mahadasha lord means for ${formData.name}'s life themes, how the Antardasha is flavoring the current period, what they are psychologically experiencing, specific opportunities opening, specific challenges present, when the next Dasha begins. End with a blockquote > of the defining theme of this life chapter. (120+ words)

## 📅 XI. 12-Month Forecast — Month by Month
Write exactly one line per month for the next 12 months starting from June 2026. Format strictly as:
**June 2026:** [dominant energy — key opportunity or challenge — recommended action]
**July 2026:** [dominant energy — key opportunity or challenge — recommended action]
[Continue for all 12 months through May 2027]

## 🍀 XII. Lucky Elements & Power Enhancers
- **Lucky Colors:** [2-3 colors with one-sentence explanation]
- **Lucky Numbers:** [2-3 numbers with explanation]
- **Lucky Days:** [2-3 days of the week with explanation]
- **Power Direction:** [one direction with explanation]
- **Favorable Gemstone:** [specific gemstone name, which finger, which metal, weight in carats]
- **Best Time of Day:** [for making important decisions]

## 🙏 XIII. Remedies & Recommendations
- **Mantra:** [exact mantra, how many times daily, best time to chant]
- **Fasting:** [which day of the week, what to eat/avoid, why]
- **Charity:** [what to donate, to whom, on which day, why]
- **Color Therapy:** [colors for specific days of the week]
- **Deity Worship:** [which deity, why, simple daily practice]
- **One Life-Changing Habit:** [the single most powerful daily habit for ${formData.name}]

CLOSE WITH: End the entire reading with a warm 3-sentence paragraph addressing ${formData.name} by name.

DO NOT ADD ANY INTRODUCTION OR PREAMBLE BEFORE SECTION I.`

  const claudeKey = process.env.CLAUDE_KEY

  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Claude API error:', data)
      throw new Error(data.error?.message || 'Claude API request failed')
    }

    const reading = data.content[0].text

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