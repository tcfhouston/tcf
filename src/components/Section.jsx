export default function Section({ children, bg = '', className = '' }) {
  return (
    <section className={`py-16 md:py-24 px-4 ${bg}`}>
      <div className={`max-w-7xl mx-auto ${className}`}>
        {children}
      </div>
    </section>
  )
}
