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
    email: '',
    phone: '',
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
  if (!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.tob || !formData.pob) {
    setError('Please fill in all required fields.')
    return
  }
  if (!formData.gender) {
    setError('Please select your gender for an accurate reading.')
    return
  }
  setError('')
  onSubmit(formData)
}

  const inputClass = "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/60"
  const labelClass = "block text-sm text-white/70 mb-1"
  const sectionClass = "bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5"
  const sectionLabelClass = "text-xs font-medium tracking-widest uppercase text-yellow-300/60 mb-4"

  return (
    <div className="space-y-4">

      {/* ── Section 1: Essential Details ── */}
      <div className={sectionClass}>

        <p className={sectionLabelClass}>
          Essential Details
        </p>

        {/* Name */}
        <div className="mb-3">
          <label className={labelClass}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Iyengar"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputClass}
          />
        </div>
         {/* Email */}
          <div className="mb-3">
            <label className={labelClass}>
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. your.email@gmail.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass}
            />
          </div>

            {/* Phone */}
            <div className="mb-3">
              <label className={labelClass}>
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass}
              />
            </div>

        {/* DOB and TOB */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelClass}>
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Time of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              value={formData.tob}
              onChange={(e) => handleChange('tob', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="mb-3">
          <label className={labelClass}>
            Place of Birth <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={formData.pob}
            onChange={(e) => handleChange('pob', e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-white/30 mt-1">
            Be specific — include city and country for accuracy
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>
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
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 font-medium'
                    : 'border-white/20 text-white/50 hover:border-white/40'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Section 2: Reading Focus ── */}
      <div className={sectionClass}>

        <p className={sectionLabelClass}>
          Your Reading Focus
        </p>
        <p className="text-xs text-white/30 mb-4">
          Tell us what you want to understand — this sharpens your reading
        </p>

        {/* Focus Area */}
        <div className="mb-3">
          <label className={labelClass}>
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
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 font-medium'
                    : 'border-white/20 text-white/50 hover:border-white/40'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Marital Status */}
        <div className="mb-3">
          <label className={labelClass}>
            Marital Status
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className={inputClass}
          >
            <option value="" className="bg-gray-900">Select status</option>
            {MARITAL_STATUSES.map(m => (
              <option key={m} value={m} className="bg-gray-900">{m}</option>
            ))}
          </select>
        </div>

        {/* Personal Question */}
        <div>
          <label className={labelClass}>
            Your Question for this Reading
          </label>
          <textarea
            rows={3}
            placeholder="e.g. When will I find the right career path? What is blocking my financial growth?"
            value={formData.question}
            onChange={(e) => handleChange('question', e.target.value)}
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-white/30 mt-1">
            The more specific your question, the more precise your reading
          </p>
        </div>

      </div>

      {/* ── Section 3: Astrological Details ── */}
      <div className={sectionClass}>

        <p className={sectionLabelClass}>
          Astrological Details
        </p>
        <p className="text-xs text-white/30 mb-4">
          Optional — add if you know your chart for maximum precision
        </p>

        {/* Nakshatra + Pada */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2">
            <label className={labelClass}>Nakshatra</label>
            <select
              value={formData.nakshatra}
              onChange={(e) => handleChange('nakshatra', e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-gray-900">Select Nakshatra</option>
              {NAKSHATRAS.map(n => (
                <option key={n} value={n} className="bg-gray-900">{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Pada</label>
            <select
              value={formData.pada}
              onChange={(e) => handleChange('pada', e.target.value)}
              className={inputClass}
            >
              {['1', '2', '3', '4'].map(p => (
                <option key={p} value={p} className="bg-gray-900">{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Moon Sign + Lagna */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelClass}>Moon Sign (Rasi)</label>
            <select
              value={formData.moonSign}
              onChange={(e) => handleChange('moonSign', e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-gray-900">Select Moon Sign</option>
              {RASIS.map(r => (
                <option key={r} value={r} className="bg-gray-900">{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ascendant (Lagna)</label>
            <select
              value={formData.lagna}
              onChange={(e) => handleChange('lagna', e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-gray-900">Select Lagna</option>
              {RASIS.map(r => (
                <option key={r} value={r} className="bg-gray-900">{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mahadasha + Antardasha */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Current Mahadasha</label>
            <input
              type="text"
              placeholder="e.g. Jupiter"
              value={formData.mahadasha}
              onChange={(e) => handleChange('mahadasha', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Current Antardasha</label>
            <input
              type="text"
              placeholder="e.g. Venus"
              value={formData.antardasha}
              onChange={(e) => handleChange('antardasha', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl text-sm font-medium text-white hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-900/30"
      >
        ✦ Generate My Vedic Reading
      </button>

      <p className="text-center text-xs text-white/25 pb-4">
        Fields marked <span className="text-red-400">*</span> are required
      </p>

    </div>
  )
}

export default BirthForm