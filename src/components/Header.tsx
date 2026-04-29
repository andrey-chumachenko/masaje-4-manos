import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/context'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_ITEMS = [
    { id: 'inicio', label: t.nav.inicio },
    { id: 'nosotras', label: t.nav.nosotras },
    { id: 'servicios', label: t.nav.servicios },
    { id: 'pelenamiento', label: t.nav.peleamiento },
    { id: 'certificado', label: t.nav.bonoRegalo },
    { id: 'galeria', label: t.nav.galeria },
    { id: 'contacto', label: t.nav.contacto },
  ]

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
          className={`inline-flex items-center gap-3 font-display text-xl font-semibold tracking-wide transition-colors duration-300 lg:text-2xl ${
            scrolled ? 'text-gold-500' : 'text-white'
          }`}
        >
          <img
            src={scrolled ? '/logo-gold.svg' : '/logo-white.svg'}
            alt="Masaje sanador a 4 manos"
            className="h-11 w-11"
          />
          <span>Masaje sanador a 4 manos</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium tracking-wide transition-colors ${
                scrolled
                  ? 'text-charcoal/70 hover:text-gold-500'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === 'es' ? 'ua' : 'es')}
            className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
              scrolled
                ? 'border border-gold-200 text-gold-500 hover:bg-gold-50'
                : 'border border-white/40 text-white hover:bg-white/10'
            }`}
          >
            {lang === 'es' ? 'UA' : 'ES'}
          </button>

          {/* CTA */}
          <a
            href="https://www.instagram.com/masaje.a.4manos"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              scrolled
                ? 'bg-gold-300 text-white hover:bg-gold-500'
                : 'border border-white/50 text-white hover:bg-white/10'
            }`}
          >
            {t.nav.reservar}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-6 transition-all ${scrolled ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${scrolled ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${scrolled ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
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
          <button
            onClick={() => { setLang(lang === 'es' ? 'ua' : 'es'); setMenuOpen(false) }}
            className="mt-1 self-start rounded-full border border-gold-200 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-500"
          >
            {lang === 'es' ? 'Українська' : 'Español'}
          </button>
          <a
            href="https://www.instagram.com/masaje.a.4manos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-gold-300 px-5 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gold-500"
          >
            {t.nav.reservar}
          </a>
        </nav>
      )}
    </header>
  )
}
