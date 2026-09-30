import { type CSSProperties, useState } from 'react'
import { useI18n } from '../i18n/context'
import { createWhatsAppUrl, WHATSAPP_PHONE, WHATSAPP_URL } from '../constants/contact'

export function Contacto() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `${t.contact.whatsappIntro}\n${t.contact.formName}: ${formData.nombre}\n${t.contact.formEmail}: ${formData.email}\n${t.contact.formMessage}: ${formData.mensaje}`
    window.open(createWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contacto" className="bg-cream-100 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center" data-reveal="blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.contact.subtitle}
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            <span className="font-semibold italic text-gold-500">{t.contact.title}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="space-y-8" data-reveal="rise">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                {t.contact.bookTitle}
              </h3>
              <p className="mt-4 leading-relaxed text-gray-mid">
                {t.contact.bookDescription}
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:translate-y-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <svg aria-hidden="true" className="h-[22px] w-[22px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{t.contact.whatsapp}</p>
                  <p className="text-sm text-gray-mid">{WHATSAPP_PHONE}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-500">
                  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{t.contact.ubicacion}</p>
                  <p className="text-sm text-gray-mid">Santa Cruz</p>
                </div>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-sm"
            data-reveal="rise"
            style={{ '--reveal-delay': '100ms' } as CSSProperties}
          >
            <h3 className="font-display text-xl font-semibold text-charcoal">
              {t.contact.formTitle}
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  {t.contact.formName}
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder={t.contact.formNamePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  {t.contact.formEmail}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder={t.contact.formEmailPlaceholder}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  {t.contact.formMessage}
                </label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder={t.contact.formMessagePlaceholder}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold-300 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-500 hover:shadow-lg"
              >
                {t.contact.formSubmit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
