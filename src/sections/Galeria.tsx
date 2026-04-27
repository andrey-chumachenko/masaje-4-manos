export function Galeria() {
  const placeholders = [
    { label: 'Masaje sincronizado', aspect: 'aspect-square' },
    { label: 'Ambiente del salon', aspect: 'aspect-[4/5] md:row-span-2' },
    { label: 'Detalle de tecnica', aspect: 'aspect-square' },
    { label: 'Aceites esenciales', aspect: 'aspect-square' },
    { label: 'Bienestar y relajacion', aspect: 'aspect-square' },
    { label: 'Nuestro equipo', aspect: 'aspect-[4/5] md:row-span-2' },
    { label: 'Salon interior', aspect: 'aspect-square' },
    { label: 'Momentos de calma', aspect: 'aspect-square' },
  ]

  return (
    <section id="galeria" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Nuestro espacio
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            <span className="font-semibold italic text-gold-500">Galeria</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>

        {/* Gallery grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-cream-200 to-gold-50 ${item.aspect}`}
            >
              <div className="flex h-full items-center justify-center p-4">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gold-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <p className="mt-2 text-[11px] text-gold-400/70 italic">{item.label}</p>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-all group-hover:bg-charcoal/10">
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-mid">
            Descubre mas de nuestro trabajo en Instagram
          </p>
          <a
            href="https://www.instagram.com/masaje.a.4manos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-200 px-6 py-3 text-sm font-semibold text-gold-500 transition-all hover:bg-gold-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @masaje.a.4manos
          </a>
        </div>
      </div>
    </section>
  )
}
