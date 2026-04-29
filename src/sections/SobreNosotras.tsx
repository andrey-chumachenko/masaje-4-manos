import { useI18n } from '../i18n/context'

export function SobreNosotras() {
  const { t } = useI18n()

  return (
    <section id="nosotras" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.about.subtitle}
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            {t.about.title1} <span className="font-semibold italic text-gold-500">{t.about.title2}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream-100 shadow-lg shadow-gold-100/40">
              <img
                src="/images/nosotras.jpg"
                alt="Las terapeutas de Masaje a Cuatro Manos"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl border border-gold-200" />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-cream-50 p-6 ring-1 ring-gold-100">
              <p className="font-display text-2xl leading-snug text-brown-500">
                {t.about.quote}
              </p>
            </div>

            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-gray-mid">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-4">
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-semibold text-gold-500">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gray-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
