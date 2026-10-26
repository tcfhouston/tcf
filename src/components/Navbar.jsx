import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const TCF_LOGO = 'https://tcfhouston.org/wp-content/uploads/2018/02/cropped-TCF_Final-1-e1744329960863.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/bible-study', label: 'Bible Study' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  const handleLinkClick = () => setMenuOpen(false)

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-wide transition-colors duration-150 ${
      isActive
        ? 'text-secondary underline decoration-2 underline-offset-4'
        : scrolled
        ? 'text-text-main hover:text-secondary'
        : 'text-white hover:text-secondary'
    }`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 flex-shrink-0">
            <img
              src={TCF_LOGO}
              alt="TCF Houston"
              className={`h-10 w-auto object-contain transition-all duration-300 ${
                scrolled || menuOpen ? '' : 'brightness-0 invert'
              }`}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span
              className={`font-display font-black text-lg hidden sm:block transition-colors duration-300 ${
                scrolled || menuOpen ? 'text-deep' : 'text-white'
              }`}
            >
              TCF Houston
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className={desktopLinkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop GIVE */}
          <div className="hidden md:block">
            <Link
              to="/donate"
              className="bg-secondary text-deep font-bold px-5 py-2 rounded-full text-sm
                         hover:bg-amber-400 hover:scale-105 transition-all duration-200 shadow"
            >
              GIVE
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || menuOpen ? 'text-deep' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-3xl overflow-hidden border-t border-gray-100">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `block py-4 px-6 text-lg font-bold border-b border-gray-100 transition-colors ${
                    isActive ? 'text-primary bg-warm' : 'text-text-main hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="p-4">
              <Link
                to="/donate"
                onClick={handleLinkClick}
                className="block w-full text-center bg-secondary text-deep font-bold py-3.5
                           rounded-full text-base hover:bg-amber-400 transition-colors"
              >
                GIVE
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
