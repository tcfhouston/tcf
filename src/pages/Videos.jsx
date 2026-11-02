import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, Play, X } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Section from '../components/Section'
import playlists from '../data/videos.json'

const HERO_IMG = 'https://tcfhouston.org/wp-content/uploads/2025/04/31-e1744253318600.jpeg'
const CHANNEL_URL = 'https://www.youtube.com/@tcfhouston'
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@tcfhouston/videos'

export default function Videos() {
  const [playlistId, setPlaylistId] = useState(playlists[0].id)
  const [playing, setPlaying] = useState(null)
  const playlist = playlists.find((p) => p.id === playlistId)

  useEffect(() => {
    if (!playing) return
    const onKey = (e) => e.key === 'Escape' && setPlaying(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  return (
    <>
      <Helmet>
        <title>Videos — TCF Houston</title>
      </Helmet>

      <HeroBanner
        title="Videos"
        subtitle="Watch & Be Encouraged"
        backgroundImage={HERO_IMG}
        breadcrumb="Videos"
      />

      <Section bg="bg-warm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="section-eyebrow">Playlists</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-deep mb-4">
            Watch Our Services &amp; Events
          </h2>
          <p className="text-text-muted leading-relaxed">
            Choose a playlist to see all of its videos.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-3">
          <label htmlFor="playlist" className="block text-xs font-bold text-text-main uppercase tracking-wide mb-1.5">
            Playlist
          </label>
          <div className="relative">
            <select
              id="playlist"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              className="w-full appearance-none border-2 border-gray-200 bg-white rounded-xl pl-4 pr-11 py-3 text-base font-semibold text-text-main focus:border-primary focus:outline-none"
            >
              {playlists.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.videos.length})
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <p className="text-center text-sm text-text-muted mb-8">
          {playlist.videos.length} {playlist.videos.length === 1 ? 'video' : 'videos'} in {playlist.title}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.videos.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setPlaying(video)}
              className="group text-left bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative aspect-video bg-deep">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <span className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                  </span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-text-main leading-snug">{video.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <a
            href={CHANNEL_VIDEOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Browse All Videos on YouTube
          </a>
          <a
            href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center"
          >
            Open This Playlist on YouTube
          </a>
          <a
            href={`${CHANNEL_URL}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center"
          >
            Subscribe to Our Channel
          </a>
        </div>
      </Section>

      {playing && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="text-white font-display font-bold">{playing.title}</p>
              <button
                onClick={() => setPlaying(null)}
                aria-label="Close video"
                className="text-white hover:text-secondary flex-shrink-0"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
                title={playing.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
