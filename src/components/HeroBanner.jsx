import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
}) {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-deep" />
      )}
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(30,58,95,0.70), rgba(30,58,95,0.88))',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {breadcrumb && (
          <nav className="flex items-center justify-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wide mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{breadcrumb}</span>
          </nav>
        )}
        {subtitle && (
          <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-3 font-display">
            {subtitle}
          </p>
        )}
        <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
          {title}
        </h1>
      </div>
    </div>
  )
}
