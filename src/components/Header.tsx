import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotras', label: 'Nosotras' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'pelenamiento', label: 'Peleamiento' },
  { id: 'certificado', label: 'Bono Regalo' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contacto', label: 'Contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          className="inline-flex items-center gap-3 font-display text-xl font-semibold tracking-wide text-gold-500 lg:text-2xl"
        >
          <img src="/images/logo-small.png" alt="Masaje a cuatro manos" className="h-8 w-8 rounded-full object-cover" />
          <span>Masaje a 4 Manos</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium tracking-wide text-charcoal/70 transition-colors hover:text-gold-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://www.instagram.com/masaje.a.4manos"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gold-300 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-500 md:block"
        >
          Reservar
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-6 bg-charcoal transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-all ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 bg-white/95 px-6 py-6 backdrop-blur-md md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-charcoal/80 transition-colors hover:text-gold-500"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/masaje.a.4manos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-gold-300 px-5 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gold-500"
          >
            Reservar
          </a>
        </nav>
      )}
    </header>
  )
}
