import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, ArrowRight } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!validateEmail(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const upcomingEvents = [
    { label: 'Monthly Worship Service', detail: 'Every 3rd Saturday at 3:30 PM' },
    { label: 'Summer Picnic', detail: 'Annual family gathering (date TBA)' },
    { label: 'Spring Family Retreat', detail: 'Annual retreat (date TBA)' },
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Contact Us"
        subtitle="Reach Out"
        backgroundImage={HERO_IMG}
        breadcrumb="Contact"
      />

      <Section bg="bg-warm">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left — Info */}
          <div className="flex flex-col gap-5">
            {/* Info cards */}
            {[
              {
                Icon: Clock,
                label: 'Service Times',
                content: (
                  <>
                    <p className="text-text-muted text-sm">Every 3rd Saturday of the month</p>
                    <p className="text-text-muted text-sm font-semibold">3:30 PM</p>
                  </>
                ),
              },
              {
                Icon: Mail,
                label: 'Email',
                content: (
                  <a href="mailto:tcf@tcfhouston.org" className="text-primary font-semibold text-sm hover:underline">
                    tcf@tcfhouston.org
                  </a>
                ),
              },
              {
                Icon: MapPin,
                label: 'Location',
                content: <p className="text-text-muted text-sm">Houston, TX</p>,
              },
            ].map(({ Icon, label, content }) => (
              <div key={label} className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-text-main text-sm mb-1">{label}</p>
                  {content}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="font-display font-bold text-text-main text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://facebook.com/TCFHouston', Icon: <FacebookIcon />, label: 'Facebook' },
                  { href: 'https://instagram.com/telugu_christian_fellowship/', Icon: <InstagramIcon />, label: 'Instagram' },
                  { href: 'https://youtube.com/@tcfhouston/videos', Icon: <YouTubeIcon />, label: 'YouTube' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors duration-200"
                  >
                    {Icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Inspirational quote */}
            <div className="bg-primary text-white rounded-2xl p-6">
              <p className="italic text-white/90 leading-relaxed mb-3">
                "Our fellowship is grounded in the testimony of God's Word and depends on the
                unity of believers. True fellowship is both spiritual and social — and is made
                possible only through a living relationship with Christ."
              </p>
              <p className="text-secondary font-bold text-sm">— TCF Houston</p>
            </div>

            {/* Upcoming events */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="font-display font-bold text-text-main text-sm mb-3 uppercase tracking-wide">Upcoming Events</p>
              <ul className="flex flex-col gap-3">
                {upcomingEvents.map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-text-main text-sm">{label}</p>
                      <p className="text-text-muted text-xs">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/events" className="text-sm text-primary font-bold hover:underline mt-3 inline-block">
                View all events →
              </Link>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="font-display font-black text-2xl text-deep mb-6">Send Us a Message</h2>

            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">✅</div>
                <p className="font-display font-black text-xl text-deep">Message Sent!</p>
                <p className="text-text-muted text-sm">We'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="text-primary font-semibold text-sm hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className={`w-full border-2 rounded-xl px-4 py-3 text-base focus:border-primary focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className={`w-full border-2 rounded-xl px-4 py-3 text-base focus:border-primary focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5" htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help? Ask about fellowship, worship, prayer requests..."
                    className={`w-full border-2 rounded-xl px-4 py-3 text-base focus:border-primary focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
