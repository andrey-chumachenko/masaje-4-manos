export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-gold-50" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold-100/40 blur-3xl" />
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-sage-100/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/30 blur-3xl" />

      {/* Decorative botanical SVG pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M400 100 Q500 300 400 500 Q300 300 400 100Z" stroke="currentColor" strokeWidth="0.5" />
          <path d="M200 400 Q400 300 600 400 Q400 500 200 400Z" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Small tagline */}
        <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold-400">
          Bienestar &middot; Armonia &middot; Relajacion
        </p>

        {/* Main title */}
        <h1 className="animate-fade-in-up font-display text-5xl leading-tight font-light text-charcoal md:text-7xl lg:text-8xl">
          Masaje a{' '}
          <span className="font-semibold italic text-gold-500">4 Manos</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-mid md:text-xl">
          Dos terapeutas, una experiencia unica.
          <br className="hidden md:block" />
          Sumérgete en una relajación profunda donde cuatro manos
          trabajan en perfecta sincronia sobre tu cuerpo.
        </p>

        {/* Divider */}
        <div className="animate-fade-in delay-300 mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

        {/* CTAs */}
        <div className="animate-fade-in-up delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#servicios"
            className="rounded-full bg-gold-300 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-gold-200/40 transition-all hover:bg-gold-500 hover:shadow-xl"
          >
            Descubre nuestros servicios
          </a>
          <a
            href="https://www.instagram.com/masaje.a.4manos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold-200 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold-500 transition-all hover:bg-gold-50"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Siguenos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-light">
            Scroll
          </span>
          <div className="h-8 w-5 rounded-full border border-gold-300/50 p-1">
            <div className="h-2 w-full rounded-full bg-gold-300 animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
