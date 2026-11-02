import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import BibleStudy from './pages/BibleStudy'
import Events from './pages/Events'
import Contact from './pages/Contact'
import History from './pages/History'
import Donate from './pages/Donate'
import PrayerRequest from './pages/PrayerRequest'
import Calendar from './pages/Calendar'
import Videos from './pages/Videos'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bible-study" element={<BibleStudy />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<History />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/prayer" element={<PrayerRequest />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
