import { useState, useEffect } from 'react'
import { useI18n, type Lang } from '../i18n/context'
import { WHATSAPP_URL } from '../constants/contact'

const LANG_OPTIONS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ua', label: 'UA', name: 'Українська' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
]

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_ITEMS = [
    { id: 'inicio', label: t.nav.inicio },
    { id: 'nosotras', label: t.nav.nosotras },
    { id: 'servicios', label: t.nav.servicios },
    { id: 'peleamiento', label: t.nav.peleamiento },
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
            alt="Masaje relajante a 4 manos"
            className="h-11 w-11"
          />
          <span>Masaje relajante a 4 manos</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-5 md:flex lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-[13px] whitespace-nowrap transition-colors ${lang === 'ua' ? 'font-normal tracking-normal' : 'font-medium tracking-wide'} ${
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
          <div
            className={`flex rounded-full border p-0.5 ${
              scrolled ? 'border-gold-200' : 'border-white/40'
            }`}
            aria-label={t.nav.language}
          >
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLang(option.code)}
                aria-pressed={lang === option.code}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all ${
                  lang === option.code
                    ? scrolled
                      ? 'bg-gold-300 text-white'
                      : 'bg-white text-gold-500'
                    : scrolled
                      ? 'text-gold-500 hover:bg-gold-50'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
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
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        <nav id="mobile-menu" className="flex flex-col gap-4 bg-white/95 px-6 py-6 backdrop-blur-md md:hidden">
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
          <div className="mt-1 flex flex-wrap gap-2" aria-label={t.nav.language}>
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => { setLang(option.code); setMenuOpen(false) }}
                aria-pressed={lang === option.code}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  lang === option.code
                    ? 'border-gold-300 bg-gold-300 text-white'
                    : 'border-gold-200 text-gold-500'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
          <a
            href={WHATSAPP_URL}
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
