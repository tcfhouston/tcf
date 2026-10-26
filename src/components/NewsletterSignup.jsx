import { useState } from 'react'

export default function NewsletterSignup() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setStatus('success')
    setForm({ name: '', email: '' })
  }

  return (
    <div className="bg-deep rounded-3xl p-8 md:p-10 text-white text-center">
      <h3 className="font-display font-black text-2xl md:text-3xl mb-2">Stay Connected</h3>
      <p className="text-white/70 mb-8 text-sm leading-relaxed max-w-sm mx-auto">
        Sign up for our monthly newsletter with spiritual content, event updates, and community news.
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center text-2xl">✅</div>
          <p className="font-display font-bold text-lg">You're subscribed!</p>
          <p className="text-white/60 text-sm">You'll receive our next newsletter soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
          />
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary text-sm pr-36"
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-secondary text-deep font-bold px-5 py-2.5 rounded-full text-sm hover:bg-amber-400 hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
