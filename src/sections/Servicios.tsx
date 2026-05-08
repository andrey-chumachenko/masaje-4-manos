import { type ReactNode } from 'react'
import { useI18n } from '../i18n/context'

const GRID_ICONS: ReactNode[] = [
  /* spa / water */
  <svg key="spa" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>,
  /* moon / relax */
  <svg key="moon" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>,
  /* heart / nurture */
  <svg key="heart" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>,
]

export function Servicios() {
  const { t } = useI18n()
  const restItems = t.services.items.slice(1)

  return (
    <section id="servicios" className="bg-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.services.subtitle}
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            {t.services.title1} <span className="font-semibold italic text-gold-500">{t.services.title2}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
          <p className="mx-auto mt-6 max-w-2xl text-gray-mid">
            {t.services.intro}
          </p>
        </div>

        {/* Featured service — item[0] */}
        <div className="mt-14 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-gold-100/40 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[340px]">
            <img
              src="/images/servicio-destacado.jpg"
              alt={t.services.items[0].title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent" />
          </div>
          <div className="bg-gradient-to-br from-gold-50 to-cream-100 p-8 md:p-10">
            <span className="rounded-full bg-gold-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {t.services.featured}
            </span>
            <h3 className="font-display mt-5 text-3xl font-semibold text-charcoal">
              {t.services.items[0].title}
            </h3>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-gold-500">{t.services.items[0].price}</span>
              <span className="text-sm text-gray-mid">{t.services.items[0].duration}</span>
            </div>
            <p className="mt-5 text-base leading-relaxed text-gray-mid">
              {t.services.items[0].description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.services.items[0].benefits.slice(0, 4).map((benefit) => (
                <li
                  key={benefit}
                  className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-gray-mid ring-1 ring-gold-100"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Remaining services grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {restItems.map((servicio, index) => (
            <div
              key={servicio.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex rounded-xl bg-gold-100/60 p-3 text-gold-500">
                {GRID_ICONS[index]}
              </div>

              <h3 className="font-display text-xl font-semibold text-charcoal">
                {servicio.title}
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-gold-500">{servicio.price}</span>
                <span className="text-xs text-gray-mid">{servicio.duration}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-mid">
                {servicio.description}
              </p>

              <ul className="mt-6 space-y-2">
                {servicio.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-gray-mid"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <a
                href="https://www.instagram.com/masaje.a.4manos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block w-full rounded-full border border-gold-200 py-2.5 text-center text-sm font-semibold text-gold-500 transition-all hover:bg-gold-300 hover:text-white"
              >
                {t.services.reservar}
              </a>
            </div>
          ))}
        </div>

        {/* Biodynamic note */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm italic text-gray-mid/80">
          {t.services.biodynamicNote}
        </p>

        {/* Process */}
        <div className="mt-24">
          <h3 className="font-display text-center text-3xl font-light text-charcoal">
            {t.services.process.title}
          </h3>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {t.services.process.steps.map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-4xl font-bold text-gold-200">
                  {item.step}
                </span>
                <h4 className="mt-2 font-display text-lg font-semibold text-charcoal">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
