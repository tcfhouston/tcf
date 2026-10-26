import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'

const milestones = [
  {
    year: '~1998',
    title: 'TCF Houston Founded',
    description:
      'A small group of Telugu-speaking Christian families in Houston began gathering to worship together in their mother tongue, marking the birth of Telugu Christian Fellowship Houston.',
  },
  {
    year: 'Early 2000s',
    title: 'Growing the Community',
    description:
      "As Houston's Indian diaspora grew, so did TCF. The fellowship began attracting believers from multiple denominations unified by their shared language, culture, and faith in Jesus Christ.",
  },
  {
    year: 'Mid 2000s',
    title: 'Small Group Bible Studies',
    description:
      'Regional home Bible study groups were established across Houston — West Side, Cypress, Katy, and other neighborhoods — bringing the Word closer to where members lived.',
  },
  {
    year: '2010s',
    title: 'COFFEE Ministry Launched',
    description:
      "The Christian Outreach for Fellowship & Effective Evangelism (COFFEE) ministry was established to visit families with special needs, extending TCF's care beyond Sunday gatherings.",
  },
  {
    year: 'Ongoing',
    title: 'Outreach & Community Impact',
    description:
      "TCF has participated in India Independence Day celebrations and other community events across Houston, sharing the Gospel and demonstrating Christ's love to the broader South Asian community.",
  },
  {
    year: 'Today',
    title: 'Over 26 Years Strong',
    description:
      "TCF Houston continues to thrive as a vibrant, multicultural fellowship meeting every third Saturday at 3:30 PM — worshipping, growing, and serving together for God's glory.",
  },
]

export default function History() {
  return (
    <>
      <Helmet>
        <title>History — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="History of TCF Houston"
        subtitle="Our Journey"
        backgroundImage={HERO_IMG}
        breadcrumb="History"
      />

      {/* Overview */}
      <Section bg="bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="section-eyebrow">Over 26 Years</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-6">
            A Fellowship Built on Faith
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              Telugu Christian Fellowship Houston began as a small gathering of Telugu-speaking
              Christian families who longed to worship in their mother tongue and maintain their
              cultural and spiritual heritage while living in the United States.
            </p>
            <p>
              What started as an intimate home fellowship has grown into a vibrant community that
              serves believers from India, Sri Lanka, and other nations — spanning multiple
              Christian denominations, all united by the Gospel of Jesus Christ.
            </p>
            <p>
              For over 26 years, TCF Houston has been a place where believers come together to
              praise, worship, grow in faith, and serve one another and the broader community.
              Our fellowship is a testament to God's faithfulness and the enduring power of
              authentic, Christ-centered community.
            </p>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section bg="bg-warm">
        <p className="section-eyebrow text-center">Timeline</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep text-center mb-14">
          Key Milestones
        </h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical centre line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary/30 transform md:-translate-x-px" />

          <div className="flex flex-col gap-10">
            {milestones.map(({ year, title, description }, i) => {
              const isRight = i % 2 === 0
              return (
                <div
                  key={year}
                  className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-0 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 w-5 h-5 rounded-full bg-secondary border-4 border-white shadow-md transform md:-translate-x-2.5 z-10" />

                  {/* Year */}
                  <div
                    className={`hidden md:flex md:w-1/2 items-start ${
                      isRight ? 'justify-end pr-10' : 'justify-start pl-10'
                    }`}
                  >
                    <span className="bg-deep text-secondary font-display font-bold text-sm px-4 py-1.5 rounded-full">
                      {year}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`pl-14 md:pl-0 md:w-1/2 ${isRight ? 'md:pl-10' : 'md:pr-10'}`}
                  >
                    <span className="md:hidden inline-block bg-deep text-secondary font-bold text-xs px-3 py-1 rounded-full mb-2">
                      {year}
                    </span>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h3 className="font-display font-bold text-lg text-text-main mb-2">{title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Quote CTA */}
      <section className="bg-deep py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <blockquote className="font-display font-black text-2xl md:text-3xl text-white italic leading-relaxed mb-6">
            "Our fellowship is grounded in the testimony of God's Word and depends on the unity
            of believers."
          </blockquote>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Link to="/about" className="btn-primary">Learn About Us</Link>
            <Link to="/contact" className="btn-outline">Join Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
