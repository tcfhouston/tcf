import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Section from '../components/Section'
import Card from '../components/Card'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'
const EVENT_IMG = 'https://tcfhouston.org/wp-content/uploads/2026/05/TCF-May26.jpeg'

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

const scheduleItems = [
  { icon: '🙏', title: 'Praise & Worship', desc: 'Opening prayer with uplifting praise music led by our worship team.' },
  { icon: '📖', title: 'Gospel Message', desc: 'Powerful teaching from visiting evangelists or local pastors.' },
  { icon: '👧', title: "Children's Bible Study", desc: 'Age-appropriate teaching held separately during the main message.' },
  { icon: '🍽️', title: 'Potluck Dinner', desc: 'Fellowship over a shared meal — bring a dish and join the celebration!' },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TCF Houston — Telugu Christian Fellowship</title>
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-screen md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="TCF Houston congregation"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(30,58,95,0.55), rgba(30,58,95,0.80))' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-4 py-24">
          <span className="pill-label mb-6">
            Telugu Christian Fellowship · Houston
          </span>

          <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight mb-5 max-w-3xl">
            Where Faith Meets Fellowship
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 font-body leading-relaxed">
            Every 3rd Saturday · 3:30 PM · Spirit-filled worship, heartfelt prayer &amp; potluck dinner
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">
              Join Us This Month
            </Link>
            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <ChevronDown className="w-7 h-7 text-white/60 animate-bounce" />
        </div>
      </section>

      {/* ── Upcoming Event Card ────────────────────────────── */}
      <div className="px-4 relative z-10">
        <div className="max-w-6xl mx-auto -mt-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Gradient top bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

            {/* Event image */}
            <div className="h-200 overflow-hidden">
              <img
                src={EVENT_IMG}
                alt="Upcoming TCF Event"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.parentElement.style.background = '#1E3A5F'
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* Card body */}
            <div className="p-6">
              <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-3">
                Upcoming Event
              </span>
              <h2 className="font-display font-black text-xl text-text-main mb-2">
                Monthly Worship Service
              </h2>
              <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
                <span>📅</span>
                <span>Every 3rd Saturday &nbsp;·&nbsp; 3:30 PM</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Join us for Spirit-filled worship, a Gospel message, children's Bible study,
                intercessory prayer, and a potluck dinner with the TCF family.
              </p>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:text-blue-700 transition-colors"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Service Schedule ──────────────────────────────── */}
      <Section bg="bg-warm">
        <div className="text-center mb-12">
          <p className="section-eyebrow">What to Expect</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep">
            Every Gathering, Every Month
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            Each service is crafted to nourish your spirit, build community, and send you out refreshed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scheduleItems.map(({ icon, title, desc }) => (
            <Card key={title} hover>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-display font-bold text-lg text-text-main mb-2">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Who We Are ────────────────────────────────────── */}
      <Section bg="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-6">
              26 Years of Faithful Community
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Telugu Christian Fellowship (TCF) Houston has served the community for over{' '}
              <strong className="text-text-main">26 years</strong> as a gathering place where
              believers unite to praise, worship, and deepen their faith in Jesus Christ.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              We bring together Telugu-speaking believers from India, Sri Lanka, and other nations —
              spanning multiple Christian denominations, all united by the Gospel of Jesus Christ
              and the desire to glorify God through worship, community, and outreach.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Worship', 'Community', 'Outreach'].map((v) => (
                <span
                  key={v}
                  className="bg-primary/10 text-primary rounded-full px-4 py-2 font-semibold text-sm"
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">Learn More</Link>
              <Link to="/history" className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                Our History
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5">
            {[
              { value: '26+', label: 'Years of TCF', color: 'bg-primary/10 text-primary' },
              { value: '100+', label: 'Families & Attendees', color: 'bg-secondary/10 text-amber-700' },
              { value: '50+', label: 'Speakers Hosted', color: 'bg-accent/10 text-accent' },
            ].map(({ value, label, color }) => (
              <div key={label} className={`rounded-2xl p-6 ${color} flex items-center gap-5`}>
                <p className="font-display font-black text-4xl">{value}</p>
                <p className="font-semibold text-sm uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="bg-deep py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4">
            Come As You Are
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Whether you're new to Houston or searching for a Telugu-speaking Christian community,
            we welcome you with open arms. No dress code, no formality — just family.
          </p>
          <Link to="/contact" className="btn-primary inline-block mb-10">
            Get in Touch
          </Link>
          <div className="flex items-center justify-center gap-4">
            {[
              { href: 'https://facebook.com/TCFHouston', Icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>, label: 'Facebook' },
              { href: 'https://instagram.com/telugu_christian_fellowship/', Icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, label: 'Instagram' },
              { href: 'https://youtube.com/@tcfhouston/videos', Icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>, label: 'YouTube' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors duration-200"
              >
                {Icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
