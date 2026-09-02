import { useI18n } from '../i18n/context'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_PHONE,
  WHATSAPP_URL,
} from '../constants/contact'

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
              <img src="/logo-gold.svg" alt="Masaje relajante a 4 manos" className="h-10 w-10" />
              <h3 className="font-display text-xl font-semibold text-gold-500">
                Masaje relajante a 4 manos
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
              {t.footer.contactTitle}
            </h4>
            <div className="flex flex-col items-start gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-mid transition-colors hover:text-gold-500"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.174-.297-.018-.458.13-.606.135-.135.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.015-1.04 2.475 0 1.461 1.065 2.872 1.213 3.07.149.199 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.711.227 1.359.195 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347" />
                </svg>
                {WHATSAPP_PHONE}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-mid transition-colors hover:text-gold-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-300 pt-6 text-center text-xs text-gray-light">
          &copy; {new Date().getFullYear()} Masaje relajante a 4 manos. {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
