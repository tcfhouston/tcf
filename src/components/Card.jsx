export default function Card({ children, className = '', hover = false }) {
  const base = 'bg-white rounded-2xl shadow-md p-6'
  const hoverClass = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200'
    : ''
  return (
    <div className={`${base} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}
