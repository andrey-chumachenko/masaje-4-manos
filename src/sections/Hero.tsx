import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/context'
import { WHATSAPP_PHONE, WHATSAPP_URL } from '../constants/contact'
const HERO_SLIDES = [
  {
    name: 'hero-candidate-1',
    desktopHeight: 1100,
    alt: 'Dos especialistas realizando masaje relajante sincronizado a cuatro manos',
  },
  {
    name: 'hero-candidate-2',
    desktopHeight: 1100,
    alt: 'Especialistas trabajando de forma coordinada durante una sesion corporal',
  },
  {
    name: 'hero-4',
    desktopHeight: 1012,
    alt: 'Masaje relajante a cuatro manos en un ambiente calido',
  },
  {
    name: 'hero-5',
    desktopHeight: 1012,
    alt: 'Especialistas sincronizadas durante una sesion de masaje relajante',
  },
  {
    name: 'hero-6',
    desktopHeight: 1012,
    alt: 'Detalle de una tecnica de masaje relajante a cuatro manos',
  },
  {
    name: 'hero-7',
    desktopHeight: 1012,
    alt: 'Sesion profesional de masaje relajante a cuatro manos',
  },
]

type HeroSlide = (typeof HERO_SLIDES)[number]

function getHeroSource(slide: HeroSlide) {
  const base = `/images/optimized/${slide.name}`

  if (window.matchMedia('(max-width: 767px)').matches) {
    return `${base}-mobile.webp`
  }

  if (window.matchMedia('(max-width: 1023px)').matches) {
    return `${base}-tablet.webp`
  }

  return window.innerWidth * window.devicePixelRatio > 1280
    ? `${base}-1800.webp`
    : `${base}-1280.webp`
}

function preloadHeroSlide(slide: HeroSlide) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = getHeroSource(slide)
  })
}

function HeroImage({
  slide,
  priority = false,
  transitioning = false,
  onTransitionEnd,
}: {
  slide: HeroSlide
  priority?: boolean
  transitioning?: boolean
  onTransitionEnd?: () => void
}) {
  const base = `/images/optimized/${slide.name}`

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={`${base}-mobile.webp`} />
      <source media="(max-width: 1023px)" srcSet={`${base}-tablet.webp`} />
      <source
        media="(min-width: 1024px)"
        srcSet={`${base}-1280.webp 1280w, ${base}-1800.webp 1800w`}
        sizes="100vw"
      />
      <img
        src={`${base}-1800.webp`}
        alt={slide.alt}
        width={1800}
        height={slide.desktopHeight}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : undefined}
        decoding="async"
        onAnimationEnd={onTransitionEnd}
        className={`absolute inset-0 h-full w-full object-cover ${
          transitioning ? 'animate-hero-crossfade' : ''
        }`}
      />
    </picture>
  )
}

export function Hero() {
  const { t } = useI18n()
  const [activeSlide, setActiveSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const nextSlide = (activeSlide + 1) % HERO_SLIDES.length
    const preload = preloadHeroSlide(HERO_SLIDES[nextSlide])

    const timeout = window.setTimeout(async () => {
      await preload
      if (cancelled) return

      setPreviousSlide(activeSlide)
      setActiveSlide(nextSlide)
    }, 5000)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [activeSlide])

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {previousSlide !== null && (
        <HeroImage slide={HERO_SLIDES[previousSlide]} />
      )}
      <HeroImage
        key={HERO_SLIDES[activeSlide].name}
        slide={HERO_SLIDES[activeSlide]}
        priority={activeSlide === 0 && previousSlide === null}
        transitioning={previousSlide !== null}
        onTransitionEnd={() => setPreviousSlide(null)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/72 via-charcoal/45 to-gold-500/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,246,240,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-charcoal/50 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-3xl text-white">
          <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-[0.32em] text-gold-100">
            {t.hero.tagline}
          </p>

          <h1 className="animate-fade-in-up font-display text-5xl leading-tight font-light md:text-7xl lg:text-8xl">
            {t.hero.title1}
            <span className="mt-2 block font-semibold italic text-gold-100">
              {t.hero.title2}
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            {t.hero.description}
          </p>

          <div className="animate-fade-in delay-300 mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold-100 to-transparent" />

          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#servicios"
              className="rounded-full bg-gold-300 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-charcoal/20 transition-all hover:bg-gold-500"
            >
              {t.hero.cta1}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/50 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img
                src="/logo-white.svg"
                alt="Logo Masaje relajante a 4 manos"
                className="h-14 w-14"
              />
              <div>
                <p className="font-display text-3xl font-semibold leading-none">
                  {t.hero.title1}
                </p>
                <p className="text-sm uppercase tracking-[0.22em] text-gold-100">
                  {t.hero.title2}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm text-white/85">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                {t.hero.cardQuote}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-100">
                    {t.hero.ubicacion}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    Santa Cruz
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-100">
                    {t.hero.whatsapp}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {WHATSAPP_PHONE}
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
