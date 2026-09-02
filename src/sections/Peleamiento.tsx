import { useI18n } from '../i18n/context'
import { WHATSAPP_URL } from '../constants/contact'

const WRAP_IMAGES = [
  { src: '/images/peleamiento-01.jpg', alt: 'Preparacion de ingredientes naturales' },
  { src: '/images/peleamiento-02.jpg', alt: 'Especialista sosteniendo el preparado para la sesion corporal' },
  { src: '/images/optimized/peleamiento-03-768.webp', alt: 'Dos especialistas durante una sesion corporal a cuatro manos' },
  { src: '/images/peleamiento-04.jpg', alt: 'Ambiente de calma durante la experiencia' },
]

export function Peleamiento() {
  const { t } = useI18n()

  return (
    <section id="peleamiento" className="bg-gradient-to-b from-sage-50 to-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sage-500">
            {t.peleamiento.badge}
          </span>
          <h2 className="font-display mt-6 text-4xl font-light text-charcoal md:text-5xl">
            {t.peleamiento.title1} <span className="font-semibold italic text-sage-500">{t.peleamiento.title2}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-sage-400" />
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-mid">
            {t.peleamiento.intro}
          </p>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
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
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {t.peleamiento.ingredients.items.map((item) => (
              <div key={item.name} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <span className="text-3xl">{item.emoji}</span>
                <h4 className="mt-3 font-display text-base font-semibold text-charcoal">
                  {item.name}
                </h4>
                <p className="mt-1 text-xs text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
