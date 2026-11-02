import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'
const MAX_PRAYER = 3000

export default function PrayerRequest() {
  const [form, setForm] = useState({ name: '', email: '', prayer: '', website: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!form.prayer.trim()) errs.prayer = 'Please share your prayer request.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitStatus('success')
      setForm({ name: '', email: '', prayer: '', website: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError) =>
    `w-full border-2 rounded-xl px-4 py-3 text-base focus:border-primary focus:outline-none transition-colors ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-200'
    }`

  return (
    <>
      <Helmet>
        <title>Prayer Request — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Prayer Request"
        subtitle="We Would Love to Pray With You"
        backgroundImage={HERO_IMG}
        breadcrumb="Prayer"
      />

      <Section bg="bg-warm">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-eyebrow">Pray With Us</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-4">
              Share Your Prayer Request
            </h2>
            <p className="text-text-muted leading-relaxed">
              "Do not be anxious about anything, but in every situation, by prayer and petition,
              with thanksgiving, present your requests to God." — Philippians 4:6
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">🙏</div>
                <p className="font-display font-black text-xl text-deep">Prayer Request Received</p>
                <p className="text-text-muted text-sm">
                  Thank you for sharing. Our fellowship will be praying for you.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="text-primary font-semibold text-sm hover:underline mt-2"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Honeypot — hidden from real users */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="prayer">
                    Prayer Request <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="prayer"
                    rows={6}
                    maxLength={MAX_PRAYER}
                    value={form.prayer}
                    onChange={(e) => setForm({ ...form, prayer: e.target.value })}
                    placeholder="Write your prayer request here..."
                    className={`${inputClass(errors.prayer)} resize-none`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.prayer ? (
                      <p className="text-red-500 text-xs">{errors.prayer}</p>
                    ) : <span />}
                    <p className="text-text-muted text-xs">{form.prayer.length}/{MAX_PRAYER}</p>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm">
                    Something went wrong. Please try again or email us directly at{' '}
                    <a href="mailto:tcf@tcfhouston.org" className="font-semibold underline">
                      tcf@tcfhouston.org
                    </a>.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-blue-700 text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? 'Sending...' : 'Submit Prayer Request →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
