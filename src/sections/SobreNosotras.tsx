export function SobreNosotras() {
  return (
    <section id="nosotras" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Quienes somos
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            Sobre{' '}
            <span className="font-semibold italic text-gold-500">Nosotras</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>

        {/* Content grid */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-cream-200 to-sage-100">
              <div className="flex h-full items-center justify-center">
                <div className="text-center p-8">
                  <svg className="mx-auto h-20 w-20 text-gold-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <p className="mt-4 text-sm text-gray-light italic">Foto de las terapeutas</p>
                </div>
              </div>
            </div>
            {/* Decorative offset */}
            <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl border border-gold-200" />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-mid">
              Somos dos terapeutas apasionadas por el bienestar y la relajacion profunda.
              Juntas hemos desarrollado una tecnica unica de <strong className="text-charcoal">masaje sincronizado a cuatro manos</strong> que
              transforma cada sesion en una experiencia sensorial extraordinaria.
            </p>
            <p className="text-lg leading-relaxed text-gray-mid">
              Nuestra filosofia se basa en la <em className="text-gold-500">armonia perfecta</em> entre dos
              pares de manos que trabajan como una sola entidad, estimulando ambos hemisferios
              del cerebro simultaneamente y llevandote a un estado de relajacion que no es
              posible alcanzar con un masaje tradicional.
            </p>
            <p className="text-lg leading-relaxed text-gray-mid">
              Cada sesion es personalizada. Combinamos tecnicas de masaje relajante, descontracturante
              y holístico, adaptandonos a las necesidades de cada persona.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: '4', label: 'Manos en sincronia' },
                { number: '100%', label: 'Relajacion' },
                { number: '2x', label: 'Beneficios' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-semibold text-gold-500">{stat.number}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gray-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
