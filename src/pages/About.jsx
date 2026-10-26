import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import Card from '../components/Card'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="About TCF Houston"
        subtitle="Who We Are"
        backgroundImage={HERO_IMG}
        breadcrumb="About"
      />

      {/* ── Story Section ─────────────────────────────────── */}
      <Section bg="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Pull quote */}
          <div className="md:sticky md:top-24">
            <p className="font-display font-black text-4xl text-primary italic leading-tight mb-6">
              "A place where believers come together to praise, worship, and grow in faith."
            </p>
            <p className="section-eyebrow">TCF Houston · Est. ~1998</p>
          </div>

          {/* Story */}
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              Telugu Christian Fellowship (TCF) Houston is a vibrant, multicultural faith community
              that has operated for more than <strong className="text-text-main">26 years</strong>.
              We serve Telugu-speaking believers from India, Sri Lanka, and other nations across
              various Christian denominations, all unified around the Gospel of Jesus Christ.
            </p>
            <p>
              Our fellowship exists to glorify God through worship, community, and outreach. We
              believe that authentic fellowship requires both spiritual and social interaction —
              interaction made possible through a personal, living relationship with Jesus Christ.
            </p>
            <p>
              Each month, on the third Saturday at 3:30 PM, we gather for a service that includes
              praise and worship, a Gospel message from visiting evangelists or local pastors,
              children's Bible study, intercessory prayer, and a potluck dinner that celebrates
              our shared heritage and faith.
            </p>
            <p>
              TCF welcomes individuals and families of all backgrounds to experience Christ's love
              through our fellowship activities. We are more than a monthly meeting — we are a
              family united by faith, committed to one another's spiritual growth and well-being.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact" className="btn-primary">Join Us</Link>
              <Link to="/history" className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                Our History
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <Section bg="bg-warm">
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-12">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '26+', label: 'Years of TCF' },
              { value: '500+', label: 'Attendees' },
              { value: '100+', label: 'Speakers' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-black text-5xl text-primary mb-2">{value}</p>
                <p className="text-text-muted text-sm uppercase tracking-wide font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Mission Cards ─────────────────────────────────── */}
      <Section bg="bg-white">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Core Values</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep">What We Stand For</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🛐', title: 'Worship', body: 'We prioritize heartfelt praise and worship, inviting the presence of God into every gathering through music, prayer, and the preaching of His Word.' },
            { icon: '🤝', title: 'Community', body: 'We foster genuine relationships among Telugu-speaking believers across denominations, creating a family rooted in love, trust, and mutual encouragement.' },
            { icon: '🌍', title: 'Outreach', body: "Through our COFFEE ministry, India Independence Day celebrations, and other events, we extend Christ's love beyond our fellowship into the broader community." },
          ].map(({ icon, title, body }) => (
            <Card key={title} hover className="text-center">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-display font-bold text-xl text-text-main mb-3">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Bylaws ────────────────────────────────────────── */}
      <Section bg="bg-warm">
        <div className="max-w-3xl mx-auto">
          <Card className="border-l-4 border-secondary">
            <p className="section-eyebrow">Governance</p>
            <h2 className="font-display font-black text-2xl md:text-3xl text-deep mb-5">Our Bylaws</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              TCF Houston maintains bylaws that serve as our foundational guidelines, governing the
              fellowship's mission, leadership structure, operations, and community responsibilities.
              These bylaws are grounded in Scripture and designed to promote unity, transparency,
              and spiritual development within our community.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Our governance reflects our commitment to accountability and faithfulness — ensuring
              that TCF Houston remains a place where believers can trust in the integrity of its
              leadership and the clarity of its purpose.
            </p>
            <Link to="/contact" className="btn-primary">Contact Us for More Info</Link>
          </Card>
        </div>
      </Section>
    </>
  )
}
