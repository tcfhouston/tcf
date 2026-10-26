import { Helmet } from 'react-helmet-async'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import Card from '../components/Card'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'

const groups = [
  {
    name: 'West Side Bible Study',
    schedule: 'Every 2nd and 4th Fridays',
    time: '7:30 PM',
    icon: '🏠',
    active: true,
    scripRef: 'Home Group · W. Houston',
  },
  {
    name: 'Cypress Bible Study',
    schedule: '2nd Saturdays',
    time: '7:30 PM',
    icon: '🏡',
    active: true,
    scripRef: 'Home Group · Cypress, TX',
  },
  {
    name: 'Katy Bible Study',
    schedule: '4th Sunday afternoon',
    time: '2:30 PM',
    icon: '🏘️',
    active: true,
    scripRef: 'Home Group · Katy, TX',
  },
  {
    name: 'Houston Bible Study',
    schedule: 'Currently inactive',
    time: '—',
    icon: '📍',
    active: false,
    scripRef: '',
  },
]

export default function BibleStudy() {
  return (
    <>
      <Helmet>
        <title>Bible Study — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Bible Study"
        subtitle="Grow Together"
        backgroundImage={HERO_IMG}
        breadcrumb="Bible Study"
      />

      {/* Intro */}
      <Section bg="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-eyebrow">Small Groups</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-5">
            Studying God's Word Together
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            TCF Houston hosts several active small group Bible studies that meet regularly in
            members' homes. These intimate gatherings are participant-led, creating space for
            open discussion, shared insight, and mutual encouragement as we dig deeper into
            Scripture together.
          </p>
          <p className="text-text-muted leading-relaxed">
            Whether you're a long-time believer or new to faith, our Bible study groups offer
            a welcoming environment to explore God's Word in community.
          </p>
        </div>
      </Section>

      {/* Study Groups */}
      <Section bg="bg-warm">
        <p className="section-eyebrow text-center">Active Groups</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-8 text-center">
          Find a Group Near You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map(({ name, schedule, time, icon, active, scripRef }) => (
            <div
              key={name}
              className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
                active ? 'border-primary' : 'border-gray-200 opacity-60'
              } hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display font-bold text-lg text-text-main">{name}</h3>
                    {!active && (
                      <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  {scripRef && (
                    <span className="inline-block bg-warm rounded-lg px-3 py-1 text-primary font-mono text-xs mb-2">
                      {scripRef}
                    </span>
                  )}
                  <div className="flex flex-col gap-1 text-sm text-text-muted mt-1">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{time}</span>
                    </div>
                    {active && (
                      <p className="text-xs text-text-muted mt-1 italic">
                        Meets in members' homes · Participant-led discussion
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* COFFEE Ministry */}
      <Section bg="bg-deep">
        <div className="max-w-3xl mx-auto text-center text-white">
          <span className="inline-block bg-secondary/20 border border-secondary/40 text-secondary rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
            Ministry
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">TCF COFFEE</h2>
          <p className="text-secondary font-bold text-lg mb-6">
            Christian Outreach for Fellowship &amp; Effective Evangelism
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            COFFEE is a caring ministry dedicated to visiting families with special needs or
            prayer requests. When members of our community face illness, grief, hardship, or
            simply need spiritual encouragement, the COFFEE team comes alongside them with
            prayer, comfort, and practical support.
          </p>
          <p className="text-white/70 leading-relaxed">
            This ministry embodies the heart of TCF Houston — that our fellowship extends
            beyond monthly gatherings into the everyday lives of those we serve.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="bg-warm">
        <Card className="max-w-xl mx-auto text-center border-l-4 border-secondary">
          <h2 className="font-display font-black text-2xl text-deep mb-3">
            Interested in Joining a Group?
          </h2>
          <p className="text-text-muted text-sm leading-relaxed mb-5">
            Reach out and we'll connect you with the Bible study group nearest you.
          </p>
          <a
            href="mailto:tcf@tcfhouston.org"
            className="btn-primary"
          >
            Email tcf@tcfhouston.org
          </a>
        </Card>
      </Section>
    </>
  )
}
