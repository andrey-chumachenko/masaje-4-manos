import { useI18n } from '../i18n/context'
import { WHATSAPP_URL } from '../constants/contact'

const WRAP_IMAGES = [
  { src: '/images/peleamiento-01.jpg', alt: 'Preparacion de ingredientes naturales' },
  { src: '/images/peleamiento-02.jpg', alt: 'Especialista sosteniendo el preparado para la sesion corporal' },
  { src: '/images/optimized/peleamiento-03-768.webp', alt: 'Dos especialistas durante una sesion corporal a cuatro manos' },
  { src: '/images/peleamiento-04.jpg', alt: 'Ambiente de calma durante la experiencia' },
]

const INGREDIENT_IMAGES = [
  '/images/optimized/ingredient-clay.webp',
  '/images/optimized/ingredient-seaweed.webp',
  '/images/optimized/ingredient-coconut.webp',
  '/images/optimized/ingredient-lavender.webp',
]

const SHOW_WRAP_DETAILS = false

export function Peleamiento() {
  const { t } = useI18n()

  return (
    <section id="peleamiento" className="bg-gradient-to-b from-sage-50 to-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

        {SHOW_WRAP_DETAILS && (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
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
        )}

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
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
                  <img
                    src={INGREDIENT_IMAGES[index]}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
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
