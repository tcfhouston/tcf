import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import data from '../data/events.json'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CATEGORIES = {
  worship: { label: 'Worship', chip: 'bg-primary/10 text-primary border-primary', dot: 'bg-primary', bar: 'border-primary' },
  annual: { label: 'Annual', chip: 'bg-secondary/20 text-amber-800 border-secondary', dot: 'bg-secondary', bar: 'border-secondary' },
  prayer: { label: 'Prayer', chip: 'bg-violet-100 text-violet-700 border-violet-500', dot: 'bg-violet-500', bar: 'border-violet-500' },
  outreach: { label: 'Outreach', chip: 'bg-accent/10 text-emerald-700 border-accent', dot: 'bg-accent', bar: 'border-accent' },
}
const DEFAULT_CATEGORY = CATEGORIES.worship

const pad = (n) => String(n).padStart(2, '0')
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

function timeToMinutes(time = '') {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let hours = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') hours += 12
  return hours * 60 + Number(match[2])
}

// Returns { 'YYYY-MM-DD': [event, ...] } for the given month, combining
// one-off events with recurring rules (e.g. 3rd Saturday of every month).
function buildMonthEvents(year, month) {
  const byDay = {}
  const add = (key, event) => {
    if (!byDay[key]) byDay[key] = []
    byDay[key].push(event)
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = new Date(year, month, 1).getDay()

  data.recurring.forEach((rule) => {
    const day = 1 + ((rule.weekday - firstWeekday + 7) % 7) + (rule.nth - 1) * 7
    if (day <= daysInMonth) add(toKey(year, month, day), rule)
  })

  const prefix = `${year}-${pad(month + 1)}-`
  data.events.forEach((event) => {
    if (event.date.startsWith(prefix)) add(event.date, event)
  })

  Object.values(byDay).forEach((list) =>
    list.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  )
  return byDay
}

export default function Calendar() {
  const today = new Date()
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selectedDay, setSelectedDay] = useState(null)
  const { year, month } = cursor

  const eventsByDay = useMemo(() => buildMonthEvents(year, month), [year, month])

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = new Date(year, month, 1).getDay()
  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate())

  const agendaDays = Object.keys(eventsByDay)
    .sort()
    .filter((key) => !selectedDay || key === selectedDay)

  function changeMonth(delta) {
    const next = new Date(year, month + delta, 1)
    setCursor({ year: next.getFullYear(), month: next.getMonth() })
    setSelectedDay(null)
  }

  function goToday() {
    setCursor({ year: today.getFullYear(), month: today.getMonth() })
    setSelectedDay(null)
  }

  return (
    <>
      <Helmet>
        <title>Calendar — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Calendar"
        subtitle="What's Happening"
        backgroundImage={HERO_IMG}
        breadcrumb="Calendar"
      />

      <Section bg="bg-warm">
        <div className="max-w-5xl mx-auto">
          {/* Month controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="font-display font-black text-2xl md:text-3xl text-deep">{monthLabel}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={goToday}
                className="text-sm font-bold text-primary border-2 border-primary rounded-full px-4 py-1.5 hover:bg-primary hover:text-white transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-deep hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-deep hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4">
            {Object.values(CATEGORIES).map(({ label, dot }) => (
              <span key={label} className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <span className={`w-3 h-3 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </div>

          {/* Month grid */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-7 bg-deep text-white text-center text-xs font-bold uppercase tracking-wide">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-3">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (!day) {
                  return <div key={`blank-${i}`} className="min-h-16 md:min-h-28 bg-gray-50 border-t border-r border-gray-100" />
                }
                const key = toKey(year, month, day)
                const events = eventsByDay[key] || []
                const isToday = key === todayKey
                const isSelected = key === selectedDay
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => events.length && setSelectedDay(isSelected ? null : key)}
                    className={`min-h-16 md:min-h-28 p-1.5 md:p-2 text-left border-t border-r border-gray-100 flex flex-col gap-1 transition-colors ${
                      isSelected ? 'bg-primary/10' : events.length ? 'hover:bg-warm/60' : ''
                    } ${events.length ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span
                      className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                        isToday ? 'bg-secondary text-white' : 'text-text-main'
                      }`}
                    >
                      {day}
                    </span>

                    {/* Phones: dots. Larger screens: titled chips. */}
                    <div className="flex gap-1 md:hidden">
                      {events.map((e, idx) => (
                        <span key={idx} className={`w-2 h-2 rounded-full ${(CATEGORIES[e.category] || DEFAULT_CATEGORY).dot}`} />
                      ))}
                    </div>
                    <div className="hidden md:flex flex-col gap-1">
                      {events.map((e, idx) => (
                        <span
                          key={idx}
                          title={`${e.title} — ${e.time}`}
                          className={`block truncate border-l-4 rounded px-1.5 py-0.5 text-xs font-semibold ${(CATEGORIES[e.category] || DEFAULT_CATEGORY).chip}`}
                        >
                          {e.time && <span className="font-bold">{e.time.replace(':00', '')} </span>}
                          {e.title}
                        </span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Agenda for the month */}
      <Section bg="bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-black text-2xl md:text-3xl text-deep">
              {selectedDay ? 'Selected Day' : `Activities in ${monthLabel}`}
            </h2>
            {selectedDay && (
              <button onClick={() => setSelectedDay(null)} className="text-sm font-semibold text-primary hover:underline">
                Show whole month
              </button>
            )}
          </div>

          {agendaDays.length === 0 ? (
            <p className="text-text-muted">No activities scheduled for this month yet. Please check back soon.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {agendaDays.flatMap((key) =>
                eventsByDay[key].map((e, idx) => {
                  const [y, m, d] = key.split('-').map(Number)
                  const date = new Date(y, m - 1, d)
                  const cat = CATEGORIES[e.category] || DEFAULT_CATEGORY
                  return (
                    <div key={`${key}-${idx}`} className={`flex gap-4 bg-white rounded-2xl shadow-md p-5 border-l-4 ${cat.bar}`}>
                      <div className="text-center w-14 flex-shrink-0">
                        <p className="text-xs font-bold uppercase text-text-muted">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                        <p className="font-display font-black text-3xl text-deep leading-none">{d}</p>
                        <p className="text-xs text-text-muted mt-1">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                      </div>
                      <div className="flex-1">
                        <span className={`inline-block border rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wide mb-2 ${cat.chip}`}>
                          {cat.label}
                        </span>
                        <h3 className="font-display font-bold text-lg text-text-main">{e.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mt-1">
                          {e.time && (
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{e.time}</span>
                          )}
                          {e.location && (
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{e.location}</span>
                          )}
                        </div>
                        {e.description && <p className="text-sm text-text-muted leading-relaxed mt-2">{e.description}</p>}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
