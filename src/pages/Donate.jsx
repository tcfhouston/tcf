import { Helmet } from 'react-helmet-async'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import Card from '../components/Card'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'

const usageItems = [
  { icon: '📢', label: 'Gospel outreach and community evangelism' },
  { icon: '🙏', label: 'Monthly worship services and Bible study programs' },
  { icon: '🎤', label: 'Inviting evangelists and pastors to minister to believers' },
  { icon: '👧', label: "Children's religious education during gatherings" },
  { icon: '☕', label: 'COFFEE Ministry — visiting families with special needs' },
  { icon: '📰', label: 'Monthly newsletters with spiritual content' },
  { icon: '🎉', label: 'Family events including picnics, retreats, and youth activities' },
]

export default function Donate() {
  return (
    <>
      <Helmet>
        <title>Donate — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Give to TCF Houston"
        subtitle="Support the Ministry"
        backgroundImage={HERO_IMG}
        breadcrumb="Donate"
      />

      {/* Intro */}
      <Section bg="bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">Your Generosity</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-5">
            Partner with TCF Houston
          </h2>
          <p className="text-text-muted leading-relaxed">
            Your giving enables us to worship, serve, and reach our community. For over 26 years,
            TCF Houston has been sustained by the generosity of believers who believe in the
            power of Gospel-centered community.
          </p>
        </div>
      </Section>

      {/* Giving Methods */}
      <Section bg="bg-warm">
        <p className="section-eyebrow text-center">Ways to Give</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-8 text-center">
          Donation Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* PayPal */}
          <Card hover className="border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">💳</div>
              <h3 className="font-display font-bold text-xl text-text-main">PayPal</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Give securely online using your PayPal account or any credit/debit card. Fast,
              easy, and secure — no PayPal account required to donate with a card.
            </p>
            <a
              href="https://paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#0070ba] text-white font-bold py-3.5 rounded-full hover:bg-[#005ea6] transition-colors text-sm hover:scale-105 transition-all duration-200"
            >
              Donate via PayPal →
            </a>
          </Card>

          {/* Zelle */}
          <Card hover className="border-l-4 border-secondary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">📱</div>
              <h3 className="font-display font-bold text-xl text-text-main">Zelle</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Send a direct bank transfer using Zelle — quick, free, and secure. Available
              through most major US banking apps. No fees, funds arrive immediately.
            </p>
            <div className="bg-warm rounded-2xl p-4 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Send to Zelle email</p>
              <p className="font-display font-black text-deep text-lg">tcf@tcfhouston.org</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* How Your Gift Is Used */}
      <Section bg="bg-white">
        <p className="section-eyebrow text-center">Transparency</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-8 text-center">
          How Your Gift Is Used
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {usageItems.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-4 bg-warm rounded-2xl p-4">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <p className="text-text-main text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Scripture Banner */}
      <section className="bg-deep py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <blockquote className="font-display font-black text-2xl md:text-3xl text-white italic leading-relaxed mb-4">
            "Each of you should give what you have decided in your heart to give, not reluctantly
            or under compulsion, for God loves a cheerful giver."
          </blockquote>
          <p className="text-secondary font-bold mt-4">— 2 Corinthians 9:7</p>
          <div className="mt-10">
            <a href="mailto:tcf@tcfhouston.org" className="btn-primary">
              Questions? Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
