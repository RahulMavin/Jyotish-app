import { useState } from 'react'

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
  "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

const RASIS = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)",
  "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)",
  "Libra (Tula)", "Scorpio (Vrishchika)", "Sagittarius (Dhanu)",
  "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)"
]

const FOCUS_AREAS = [
  "General Life Reading",
  "Career & Life Purpose",
  "Love & Relationships",
  "Health & Wellbeing",
  "Wealth & Finance",
  "Family & Children",
  "Spiritual Growth"
]

const MARITAL_STATUSES = [
  "Single",
  "In a Relationship",
  "Married",
  "Divorced",
  "Widowed"
]

function BirthForm({ onSubmit }) {

  const [formData, setFormData] = useState({
  name: '',
  dob: '',
  tob: '',
  pob: '',
  gender: '',
  maritalStatus: '',
  focusArea: 'General Life Reading',
  question: '',
  nakshatra: '',
  pada: '1',
  moonSign: '',
  lagna: '',
  mahadasha: '',
  antardasha: ''
})

  const [error, setError] = useState('')

  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit() {
  if (!formData.name || !formData.dob || !formData.tob || !formData.pob) {
    setError('Please fill in Name, Date of Birth, Time of Birth, and Place of Birth.')
    return
  }
  if (!formData.gender) {
    setError('Please select your gender for an accurate reading.')
    return
  }
  setError('')
  onSubmit(formData)
}

  return (
    <div className="space-y-4">

      {/* ── Section 1: Essential Details ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">
          Essential Details
        </p>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* DOB and TOB */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Time of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              value={formData.tob}
              onChange={(e) => handleChange('tob', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-1">
            Place of Birth <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={formData.pob}
            onChange={(e) => handleChange('pob', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Be specific — include city and country for accuracy
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">
            Gender <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-3">
            {['Male', 'Female', 'Other'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => handleChange('gender', g)}
                className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                  formData.gender === g
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700 font-medium'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Section 2: Reading Focus ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
          Your Reading Focus
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Tell us what you want to understand — this sharpens your reading
        </p>

        {/* Focus Area */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-2">
            What area of life do you want insights on?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FOCUS_AREAS.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => handleChange('focusArea', f)}
                className={`py-2 px-3 rounded-lg text-sm border text-left transition-colors ${
                  formData.focusArea === f
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700 font-medium'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Marital Status */}
        <div className="mb-3">
          <label className="block text-sm text-gray-500 mb-2">
            Marital Status
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
          >
            <option value="">Select status</option>
            {MARITAL_STATUSES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Personal Question */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Your Question for this Reading
          </label>
          <textarea
            rows={3}
            placeholder="e.g. When will I find the right career path? What is blocking my growth?"
            value={formData.question}
            onChange={(e) => handleChange('question', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            The more specific your question, the more precise your reading
          </p>
        </div>

      </div>

      {/* ── Section 3: Astrological Details ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
          Astrological Details
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Optional — add if you know your chart for maximum precision
        </p>

        {/* Nakshatra + Pada */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Nakshatra</label>
            <select
              value={formData.nakshatra}
              onChange={(e) => handleChange('nakshatra', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            >
              <option value="">Select Nakshatra</option>
              {NAKSHATRAS.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Pada</label>
            <select
              value={formData.pada}
              onChange={(e) => handleChange('pada', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            >
              {['1','2','3','4'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Moon Sign + Lagna */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Moon Sign (Rasi)</label>
            <select
              value={formData.moonSign}
              onChange={(e) => handleChange('moonSign', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            >
              <option value="">Select Moon Sign</option>
              {RASIS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Ascendant (Lagna)</label>
            <select
              value={formData.lagna}
              onChange={(e) => handleChange('lagna', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            >
              <option value="">Select Lagna</option>
              {RASIS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mahadasha + Antardasha */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Current Mahadasha</label>
            <input
              type="text"
              placeholder="e.g. Jupiter"
              value={formData.mahadasha}
              onChange={(e) => handleChange('mahadasha', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Current Antardasha</label>
            <input
              type="text"
              placeholder="e.g. Venus"
              value={formData.antardasha}
              onChange={(e) => handleChange('antardasha', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
      >
        ✦ Generate My Vedic Reading
      </button>

      <p className="text-center text-xs text-gray-400 pb-4">
        Fields marked <span className="text-red-400">*</span> are required
      </p>

    </div>
  )
}

export default BirthForm