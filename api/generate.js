export async function POST(request) {
  // Safe Header Definitions for cross-origin cloud environments
  const responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    const body = await request.json()
    const { formData } = body

    if (!formData || !formData.name) {
      return new Response(
        JSON.stringify({ error: 'Missing required form data fields.' }),
        { status: 400, headers: responseHeaders }
      );
    }

    const systemPrompt = `You are a world-class Vedic Astrology (Jyotish) expert with 25 years of experience, trained in Brihat Parashara Hora Shastra, Jaimini Sutras, and Phaladeepika. You serve the Indian market where astrology guides major life decisions.

CRITICAL RULES:
- Write ALL 13 sections completely — never skip or summarize
- Each section minimum 120 words, specific and actionable
- Use the person's name throughout
- Reference exact planetary placements
- Be warm, like a trusted family astrologer
- Write in simple English

OUTPUT FORMAT — Generate these 13 sections in order:`;

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
Name ${formData.name}'s cosmic archetype. Describe what makes their chart unique using Lagna lord, Moon sign, and Nakshatra deity. (120+ words)

## 🔮 II. Core Personality & Soul Blueprint
Cover: fundamental nature from Lagna, emotional world from Moon and Nakshatra, hidden strengths, shadow traits, karmic purpose. (120+ words)

## 💪 III. Health & Vitality Forecast
Cover: Ayurvedic constitution, vulnerable body parts, health risks by decade (20s 30s 40s 50s), diet recommendations, one remedy. End with blockquote of critical health warning. (120+ words)

## 💰 IV. Wealth, Finance & Prosperity
Cover: Dhana Yogas by name, nature of wealth, peak earning years, investment style, specific years for major moves. End with blockquote of key wealth insight. (120+ words)

## 💼 V. Career, Profession & Life Purpose
Cover: suitable career fields, job vs business suitability, professional strengths, career milestones, any Rajyogas. End with blockquote of greatest career strength. (120+ words)

## 📚 VI. Education & Intellectual Abilities
Cover: academic strengths, fields to excel in, higher education prospects, learning style, challenges. (120+ words)

## 💑 VII. Love, Marriage & Relationships
Cover: marriage timing from 7th house, ideal partner qualities, love vs arranged marriage, Mangal Dosha assessment, compatibility, timing window. End with blockquote of key relationship insight. (120+ words)

## 👨‍👩‍👧 VIII. Family, Children & Home Life
Cover: relationship with parents from 4th house, children timing from 5th house, where likely to settle, family karma. (120+ words)

## 🕉️ IX. Spiritual Path & Karma
Cover: spiritual inclination, past life karma, dharmic path, beneficial practices, relationship with divine. (120+ words)

## ⏰ X. Current Dasha Analysis — Your Life Right Now
Cover: Mahadasha lord themes, Antardasha flavoring, psychological experience, opportunities, challenges, when next Dasha begins. End with blockquote of defining theme. (120+ words)

## 📅 XI. 12-Month Forecast — Month by Month
Write one line per month starting June 2026 through May 2027. Format: **Month Year:** [energy — opportunity — action]

## 🍀 XII. Lucky Elements & Power Enhancers
- **Lucky Colors:** [2-3 colors with explanation]
- **Lucky Numbers:** [with explanation]
- **Lucky Days:** [with explanation]
- **Power Direction:** [direction with explanation]
- **Favorable Gemstone:** [stone, finger, metal, carats]
- **Best Time of Day:** [for decisions]

## 🙏 XIII. Remedies & Recommendations
- **Mantra:** [exact mantra, times daily, best time]
- **Fasting:** [day, what to avoid, why]
- **Charity:** [what to give, to whom, when, why]
- **Color Therapy:** [colors for specific days]
- **Deity Worship:** [deity, why, daily practice]
- **One Life-Changing Habit:** [single most powerful change]

End with a warm 3-sentence closing addressing ${formData.name} by name.

DO NOT ADD INTRODUCTION OR PREAMBLE BEFORE SECTION I.`;

    const claudeKey = process.env.CLAUDE_KEY;
    const url = 'https://api.anthropic.com/v1/messages';

    if (!claudeKey) {
      console.error('Server Configuration Missing: CLAUDE_KEY env variable is empty.');
      throw new Error('Server credentials are missing.');
    }

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
});

    const data = await response.json();

    if (!response.ok) {
      console.error('Claude API internal structural failure:', data);
      throw new Error(data.error?.message || 'Claude API request failed');
    }

    const reading = data.content[0].text;

    return new Response(
      JSON.stringify({ reading }),
      { status: 200, headers: responseHeaders }
    );

  } catch (error) {
    console.error('Production Server Error Caught:', error.message);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate reading' }),
      { status: 500, headers: responseHeaders }
    );
  }
}

// Handles serverless runtime preflight OPTIONS hits safely
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}