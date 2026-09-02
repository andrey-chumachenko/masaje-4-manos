import { useI18n } from '../i18n/context'
import { WHATSAPP_URL } from '../constants/contact'

export function CertificadoRegalo() {
  const { t } = useI18n()

  return (
    <section id="certificado" className="bg-gradient-to-b from-gold-50 to-cream-100 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.certificate.subtitle}
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            {t.certificate.title1} <span className="font-semibold italic text-gold-500">{t.certificate.title2}</span>
          </h2>
          <div className="mt-4 h-px w-16 bg-gold-300" />

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-mid">
            {t.certificate.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.certificate.features.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/80 px-5 py-4 text-sm text-gray-mid shadow-sm ring-1 ring-gold-100"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold-300 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-500"
            >
              {t.certificate.cta1}
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-gold-200 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-gold-500 transition-all hover:bg-gold-100/50"
            >
              {t.certificate.cta2}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-xl shadow-gold-200/30">
            <img
              src="/images/optimized/certificado-regalo-640.webp"
              srcSet="/images/optimized/certificado-regalo-640.webp 640w, /images/optimized/certificado-regalo-1280.webp 1280w"
              sizes="(min-width: 1024px) 52vw, calc(100vw - 3rem)"
              alt="Bono regalo de masaje relajante a cuatro manos"
              width={1280}
              height={1350}
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-[2rem] border border-gold-200" />
        </div>
      </div>
    </section>
  )
}
