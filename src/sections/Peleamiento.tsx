import { useI18n } from '../i18n/context'
import { WHATSAPP_URL } from '../constants/contact'

const WRAP_IMAGES = [
  { src: '/images/peleamiento-01.jpg', alt: 'Preparacion de ingredientes naturales' },
  { src: '/images/peleamiento-02.jpg', alt: 'Especialista sosteniendo el preparado para la sesion corporal' },
  { src: '/images/optimized/peleamiento-03-768.webp', alt: 'Dos especialistas durante una sesion corporal a cuatro manos' },
  { src: '/images/peleamiento-04.jpg', alt: 'Ambiente de calma durante la experiencia' },
]

function IngredientIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path
          d="M13 39c0-7.5 8.5-15 19-15s19 7.5 19 15-8.5 12-19 12-19-4.5-19-12Z"
          fill="currentColor"
          opacity="0.12"
        />
        <path d="M16 36c2.7-7 8.8-11 16-11s13.3 4 16 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 39c0 7.2 8.5 12 19 12s19-4.8 19-12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M22 35c3.4-2.3 6.7-3.4 10-3.4S38.6 32.7 42 35" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M28 18c1.8-3 4.3-4.5 7.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path d="M11 45c6-5 12-5 18 0s12 5 18 0 10-5 14-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 51c5-3.5 10-3.5 15 0s10 3.5 15 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.65" />
        <path d="M31 42V17M31 26c-6-1-9-4.5-9-9.5 5.8.2 9 3.8 9 9.5Zm0 7c6-1 9-4.5 9-9.5-5.8.2-9 3.8-9 9.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="49" cy="17" r="3" fill="currentColor" opacity="0.18" />
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <path d="M16 34c0-10 7.2-18 16-18s16 8 16 18-7.2 17-16 17-16-7-16-17Z" fill="currentColor" opacity="0.11" />
        <path d="M16 34c0-10 7.2-18 16-18s16 8 16 18-7.2 17-16 17-16-7-16-17Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 40c7.5-6 16.5-6 24 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 19c-2.8-3.5-3.2-6.5-1.2-9M32 16c-.5-4 1-7 4.5-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <path d="M31 54V19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 44c-6.5-.5-10-3.7-10.5-9.5 6.3.4 9.8 3.6 10.5 9.5Zm2-8c6-.8 9-4 9-9-5.7.5-8.8 3.5-9 9Z" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M31 22c-4-1-6-3.3-6-6.8 3.8.2 6 2.5 6 6.8Zm1-4c4-.8 6-3.2 6-7-3.8.4-5.8 2.8-6 7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="25" cy="27" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="38" cy="23" r="2.6" fill="currentColor" opacity="0.5" />
      <circle cx="25" cy="19" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

export function Peleamiento() {
  const { t } = useI18n()

  return (
    <section id="peleamiento" className="bg-gradient-to-b from-sage-50 to-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                {t.peleamiento.whatIs.title}
              </h3>
              <p className="mt-4 leading-relaxed text-gray-mid">
                {t.peleamiento.whatIs.p1.before}
                <em>{t.peleamiento.whatIs.p1.em1}</em>
                {t.peleamiento.whatIs.p1.middle}
                <em>{t.peleamiento.whatIs.p1.em2}</em>
                {t.peleamiento.whatIs.p1.after}
              </p>
              <p className="mt-4 leading-relaxed text-gray-mid">
                {t.peleamiento.whatIs.p2}
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                {t.peleamiento.process.title}
              </h3>
              <div className="mt-6 space-y-4">
                {t.peleamiento.process.steps.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-400 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-mid">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {WRAP_IMAGES.map((image) => (
                <div
                  key={image.src}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-sage-100"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                {t.peleamiento.benefits.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {t.peleamiento.benefits.items.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-gray-mid">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sage-200 bg-sage-50/50 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-500">
                {t.peleamiento.duration.label}
              </p>
              <p className="font-display mt-2 text-4xl font-semibold text-charcoal">
                {t.peleamiento.duration.value}
              </p>
              <p className="mt-4 text-sm text-gray-mid">
                {t.peleamiento.duration.note}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-sage-400 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-500"
              >
                {t.peleamiento.cta}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-center text-2xl font-semibold text-charcoal">
            {t.peleamiento.ingredients.title}
          </h3>
          <div className="mx-auto mt-4 h-px w-16 bg-sage-400" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {t.peleamiento.ingredients.items.map((item, index) => (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-2xl border border-gold-100/80 bg-white/80 px-4 py-7 text-center shadow-[0_12px_30px_rgba(125,95,45,0.07)] backdrop-blur-sm md:px-6"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sage-50" aria-hidden="true" />
                <div className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-100 bg-gradient-to-br from-cream-50 via-gold-50 to-sage-50 shadow-inner ${index % 2 === 0 ? 'text-gold-500' : 'text-sage-500'}`}>
                  <IngredientIcon index={index} />
                </div>
                <h4 className="relative mt-4 font-display text-base font-semibold text-charcoal">
                  {item.name}
                </h4>
                <p className="relative mt-1.5 text-xs leading-relaxed text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
