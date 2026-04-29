const WHATSAPP_URL = 'https://wa.me/34627796083'

export function CertificadoRegalo() {
  return (
    <section id="certificado" className="bg-gradient-to-b from-gold-50 to-cream-100 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Regala bienestar
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            Bono <span className="font-semibold italic text-gold-500">Regalo</span>
          </h2>
          <div className="mt-4 h-px w-16 bg-gold-300" />

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-mid">
            Un detalle elegante para sorprender con una experiencia de calma,
            cuidado y presencia. Nuestro bono regalo es ideal para cumpleaños,
            aniversarios o simplemente para ofrecer un momento de bienestar real.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              'Validez de dos meses',
              'Disponible para masaje a cuatro manos',
              'Coordinacion por WhatsApp',
              'Atencion en Santa Cruz',
            ].map((item) => (
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
              Pedir bono regalo
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-gold-200 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-gold-500 transition-all hover:bg-gold-100/50"
            >
              Consultar detalles
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-gold-200/30">
            <div className="aspect-square rounded-[1.5rem] bg-cream-50 p-2">
              <img
                src="/images/certificado-regalo.jpg"
                alt="Bono regalo de masaje a cuatro manos"
                className="h-full w-full rounded-[1.25rem] object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-[2rem] border border-gold-200" />
        </div>
      </div>
    </section>
  )
}
