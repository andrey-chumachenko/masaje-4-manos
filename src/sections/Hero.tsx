import { useEffect, useState } from 'react'

const WHATSAPP_URL = 'https://wa.me/34627796083'
const HERO_SLIDES = [
  {
    src: '/images/hero-candidate-1.jpg',
    alt: 'Dos terapeutas realizando masaje sincronizado a cuatro manos',
  },
  {
    src: '/images/hero-candidate-2.jpg',
    alt: 'Terapeutas trabajando en armonia sobre la espalda',
  },
  {
    src: '/images/hero-4.jpg',
    alt: 'Masaje a cuatro manos en ambiente calido',
  },
  {
    src: '/images/hero-5.jpg',
    alt: 'Terapeutas sincronizadas durante sesion de masaje',
  },
  {
    src: '/images/hero-6.jpg',
    alt: 'Detalle de tecnica de masaje a cuatro manos',
  },
  {
    src: '/images/hero-7.jpg',
    alt: 'Sesion de masaje profesional a cuatro manos',
  },
]

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {HERO_SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/45 to-gold-500/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,246,240,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-charcoal/50 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-3xl text-white">
          <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-[0.32em] text-gold-100">
            Santa Cruz &middot; Bienestar &middot; Armonia
          </p>

          <h1 className="animate-fade-in-up font-display text-5xl leading-tight font-light md:text-7xl lg:text-8xl">
            Masaje sanador
            <span className="mt-2 block font-semibold italic text-gold-100">
              a 4 manos
            </span>
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
                src="/logo-white.svg"
                alt="Logo Masaje sanador a 4 manos"
                className="h-14 w-14"
              />
              <div>
                <p className="font-display text-3xl font-semibold leading-none">
                  Masaje sanador
                </p>
                <p className="text-sm uppercase tracking-[0.22em] text-gold-100">
                  a 4 manos
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
