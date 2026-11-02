import { Helmet } from 'react-helmet-async'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import NewsletterSignup from '../components/NewsletterSignup'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'
const EVENT_IMG = 'https://tcfhouston.org/wp-content/uploads/2026/05/TCF-May26.jpeg'

const annualEvents = [
  {
    icon: '🌞',
    tag: 'Annual',
    tagColor: 'border-primary bg-primary/10 text-primary',
    name: 'Summer Picnic',
    desc: 'Fun and fellowship for the entire family — a beloved annual tradition where TCF members gather outdoors for food, games, and community.',
  },
  {
    icon: '🌿',
    tag: 'Annual',
    tagColor: 'border-primary bg-primary/10 text-primary',
    name: 'Spring Family Retreat',
    desc: 'A weekend to recharge spiritually and connect with others. Families come together for worship, teaching, and meaningful fellowship away from the routine.',
  },
  {
    icon: '🎯',
    tag: 'Annual',
    tagColor: 'border-primary bg-primary/10 text-primary',
    name: 'Young Adult Retreat',
    desc: 'Designed to encourage and equip the next generation of Telugu Christian believers with faith-building sessions, mentorship, and community.',
  },
  {
    icon: '🎄',
    tag: 'Annual',
    tagColor: 'border-primary bg-primary/10 text-primary',
    name: 'Christmas Celebration',
    desc: 'Our yearly Christmas gathering where families come together to celebrate the birth of Jesus through worship, carols, the Christmas message, and a time of food and fellowship.',
  },
]

const outreachEvents = [
  {
    icon: '🇮🇳',
    tag: 'Outreach',
    tagColor: 'border-secondary bg-secondary/10 text-amber-700',
    name: 'India Independence Day Celebrations',
    desc: 'TCF Houston participates in local Independence Day observances, sharing Gospel messages and providing spiritual encouragement to the broader South Asian community.',
  },
  {
    icon: '☕',
    tag: 'Ministry',
    tagColor: 'border-accent bg-accent/10 text-accent',
    name: 'COFFEE Ministry Visits',
    desc: 'Our Christian Outreach for Fellowship & Effective Evangelism team visits families with special needs or prayer requests throughout the year, bringing comfort and spiritual support.',
  },
]

function EventCard({ icon, tag, tagColor, name, desc, borderColor }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <span className={`inline-block border rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wide mb-2 ${tagColor}`}>
            {tag}
          </span>
          <h3 className="font-display font-bold text-lg text-text-main mb-2">{name}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Events — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Events"
        subtitle="Calendar"
        backgroundImage={HERO_IMG}
        breadcrumb="Events"
      />

      {/* Monthly worship band */}
      <div className="bg-warm border-b border-secondary/20 py-5 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🗓️</span>
            <div>
              <p className="font-display font-bold text-deep text-lg">Monthly Worship Service</p>
              <p className="text-text-muted text-sm">Every 3rd Saturday of the month at 3:30 PM</p>
            </div>
          </div>
          <a
            href="mailto:tcf@tcfhouston.org"
            className="bg-deep text-white font-bold px-5 py-2.5 rounded-full hover:bg-primary transition-colors text-sm whitespace-nowrap"
          >
            Get Details →
          </a>
        </div>
      </div>

      {/* Featured event image */}
      <Section bg="bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={EVENT_IMG}
              alt="Featured TCF Event"
              className="w-full object-cover"
              onError={(e) => { e.currentTarget.parentElement.style.background = '#1E3A5F'; e.currentTarget.style.display = 'none' }}
            />
          </div>
        </div>
      </Section>

      {/* Annual & Seasonal Events */}
      <Section bg="bg-warm">
        <p className="section-eyebrow">Throughout the Year</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-8">
          Annual &amp; Seasonal Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {annualEvents.map((e) => (
            <EventCard key={e.name} {...e} borderColor="border-primary" />
          ))}
        </div>
      </Section>

      {/* Special Outreach Events */}
      <Section bg="bg-white">
        <p className="section-eyebrow">Community Impact</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-8">
          Special Outreach Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outreachEvents.map((e) => (
            <EventCard
              key={e.name}
              {...e}
              borderColor={e.tag === 'Outreach' ? 'border-secondary' : 'border-accent'}
            />
          ))}
        </div>
      </Section>

      {/* Newsletter signup */}
      <Section bg="bg-warm">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  )
}
