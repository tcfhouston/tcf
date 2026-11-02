// Refreshes src/data/videos.json from the TCF Houston YouTube playlists.
// Usage: npm run update-videos
// Reads the public playlist pages (no API key). If YouTube changes its page
// markup this may need adjusting; videos.json can also be edited by hand.
import { writeFileSync } from 'node:fs'

const CHANNEL_PLAYLISTS_URL = 'https://www.youtube.com/@tcfhouston/playlists'
const OUT_FILE = new URL('../src/data/videos.json', import.meta.url)
const HEADERS = { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en-US' }

async function fetchPage(url) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  const html = await res.text()
  const start = html.indexOf('{', html.indexOf('ytInitialData'))
  let depth = 0
  for (let i = start; i < html.length; i++) {
    if (html[i] === '{') depth++
    else if (html[i] === '}' && --depth === 0) {
      return {
        data: JSON.parse(html.slice(start, i + 1)),
        apiKey: html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1],
        clientVersion: html.match(/"clientVersion":"([^"]+)"/)?.[1],
      }
    }
  }
  throw new Error(`No ytInitialData in ${url}`)
}

// Long playlists load in pages; follow YouTube's continuation tokens for the rest.
async function fetchContinuation({ apiKey, clientVersion }, token) {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ context: { client: { clientName: 'WEB', clientVersion } }, continuation: token }),
  })
  if (!res.ok) throw new Error(`continuation -> ${res.status}`)
  return res.json()
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  if (visit(node) === false) return
  for (const key in node) walk(node[key], visit)
}

function collectVideos(data, videos) {
  walk(data, (n) => {
    const title = n.metadata?.lockupMetadataViewModel?.title?.content
    if (n.contentId?.length === 11 && title) {
      if (!videos.some((v) => v.id === n.contentId)) videos.push({ id: n.contentId, title })
      return false
    }
  })
}

function findToken(data) {
  let token
  walk(data, (n) => {
    if (n.continuationCommand?.token) token = n.continuationCommand.token
  })
  return token
}

const channelPage = await fetchPage(CHANNEL_PLAYLISTS_URL)
const playlists = []
walk(channelPage.data, (n) => {
  const title = n.metadata?.lockupMetadataViewModel?.title?.content
  if (n.contentId && title && /^PL/.test(n.contentId)) {
    playlists.push({ id: n.contentId, title })
    return false
  }
})

const result = []
for (const { id, title } of playlists) {
  const page = await fetchPage(`https://www.youtube.com/playlist?list=${id}`)
  const videos = []
  collectVideos(page.data, videos)
  let token = findToken(page.data)
  while (token) {
    const next = await fetchContinuation(page, token)
    collectVideos(next, videos)
    token = findToken(next)
  }
  console.log(`${title}: ${videos.length} videos`)
  result.push({ id, title, videos })
}

// Yearly service playlists first (newest year on top), then everything else in channel order.
const serviceYear = (p) => Number(p.title.match(/^(\d{4}) TCF Services$/)?.[1] ?? 0)
result.sort((a, b) => serviceYear(b) - serviceYear(a))

writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n')
console.log(`Wrote ${result.length} playlists to src/data/videos.json`)
