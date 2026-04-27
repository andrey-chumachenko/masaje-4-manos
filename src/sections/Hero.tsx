const WHATSAPP_URL = 'https://wa.me/34627796083'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <img
        src="/images/hero.jpg"
        alt="Dos terapeutas realizando masaje a cuatro manos"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/45 to-gold-500/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,246,240,0.18),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-3xl text-white">
          <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-[0.32em] text-gold-100">
            Santa Cruz &middot; Bienestar &middot; Armonia
          </p>

          <h1 className="animate-fade-in-up font-display text-5xl leading-tight font-light md:text-7xl lg:text-8xl">
            Masaje a{' '}
            <span className="font-semibold italic text-gold-100">4 Manos</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Dos terapeutas de masaje de Ucrania, una sola ola de atencion a tu
            cuerpo y tu psique. Una experiencia profunda, sincronizada y
            pensada para reiniciar el sistema nervioso.
          </p>

          <div className="animate-fade-in delay-300 mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold-100 to-transparent" />

          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#servicios"
              className="rounded-full bg-gold-300 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-charcoal/20 transition-all hover:bg-gold-500"
            >
              Descubre nuestros servicios
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/50 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo-small.png"
                alt="Logo Masaje a cuatro manos"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-display text-3xl font-semibold leading-none">
                  Masaje
                </p>
                <p className="text-sm uppercase tracking-[0.22em] text-gold-100">
                  a cuatro manos
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm text-white/85">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                El masaje a cuatro manos no es el doble de intensidad: es mas
                profundo, mas envolvente y mas reparador.
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-100">
                    Ubicacion
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    Santa Cruz
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-100">
                    Instagram
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    @masaje.a.4manos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/80">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-white/40 p-1">
            <div className="h-2 w-full rounded-full bg-white animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
