import { useI18n } from '../i18n/context'

export function Footer() {
  const { t } = useI18n()

  const navItems = [
    { label: t.nav.inicio, id: 'inicio' },
    { label: t.nav.nosotras, id: 'nosotras' },
    { label: t.nav.servicios, id: 'servicios' },
    { label: t.nav.peleamiento, id: 'peleamiento' },
    { label: t.nav.bonoRegalo, id: 'certificado' },
    { label: t.nav.galeria, id: 'galeria' },
    { label: t.nav.contacto, id: 'contacto' },
  ]

  return (
    <footer className="border-t border-cream-300 bg-cream-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo-gold.svg" alt="Masaje sanador a 4 manos" className="h-10 w-10" />
              <h3 className="font-display text-xl font-semibold text-gold-500">
                Masaje sanador a 4 manos
              </h3>
            </div>
            <p className="mt-3 text-sm text-gray-mid">
              {t.footer.tagline1}
              <br />
              {t.footer.tagline2}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-sm text-gray-mid">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="transition-colors hover:text-gold-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
              {t.footer.socialTitle}
            </h4>
            <a
              href="https://www.instagram.com/masaje.a.4manos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-mid transition-colors hover:text-gold-500"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @masaje.a.4manos
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-300 pt-6 text-center text-xs text-gray-light">
          &copy; {new Date().getFullYear()} Masaje sanador a 4 manos. {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
