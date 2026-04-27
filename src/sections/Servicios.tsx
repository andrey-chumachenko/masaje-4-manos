const SERVICIOS = [
  {
    title: 'Masaje Relajante a 4 Manos',
    duration: '60 min',
    description:
      'Nuestro tratamiento estrella. Dos terapeutas trabajan de forma sincronizada aplicando movimientos suaves y envolventes que estimulan ambos hemisferios del cerebro, llevandote a un estado de relajacion profunda e incomparable.',
    benefits: [
      'Relajacion profunda y rapida',
      'Eliminacion de contracturas',
      'Estimulacion bilateral cerebral',
      'Mejora de la circulacion sanguinea',
      'Reduccion del estres y ansiedad',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712.75.75 0 0 0-.75-.75 2.25 2.25 0 0 1-.75-.123" />
      </svg>
    ),
    featured: true,
  },
  {
    title: 'Masaje Descontracturante a 4 Manos',
    duration: '60 min',
    description:
      'La fuerza combinada de dos terapeutas permite abordar las contracturas mas profundas de manera eficiente. Ideal despues de jornadas intensas de trabajo o actividad fisica.',
    benefits: [
      'Alivio de tensiones cronicas',
      'Trabajo profundo en tejidos',
      'Recuperacion muscular acelerada',
      'Mejora de la movilidad articular',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    featured: false,
  },
  {
    title: 'Masaje Holístico a 4 Manos',
    duration: '90 min',
    description:
      'Una experiencia integral que combina aromaterapia, tecnicas energeticas y masaje sincronizado. Un viaje sensorial completo que equilibra cuerpo, mente y espíritu.',
    benefits: [
      'Equilibrio energetico total',
      'Aromaterapia personalizada',
      'Reconexion cuerpo-mente',
      'Liberacion emocional profunda',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    featured: false,
  },
]

export function Servicios() {
  return (
    <section id="servicios" className="bg-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Nuestros tratamientos
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            Nuestros{' '}
            <span className="font-semibold italic text-gold-500">Servicios</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
          <p className="mx-auto mt-6 max-w-2xl text-gray-mid">
            Cada uno de nuestros tratamientos es realizado por dos terapeutas
            trabajando en perfecta sincronia, multiplicando los beneficios de
            cada sesion.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICIOS.map((servicio) => (
            <div
              key={servicio.title}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                servicio.featured
                  ? 'bg-gradient-to-br from-gold-50 to-cream-100 ring-1 ring-gold-200'
                  : 'bg-white shadow-sm'
              }`}
            >
              {servicio.featured && (
                <span className="absolute top-4 right-4 rounded-full bg-gold-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}

              <div className="mb-4 inline-flex rounded-xl bg-gold-100/60 p-3 text-gold-500">
                {servicio.icon}
              </div>

              <h3 className="font-display text-xl font-semibold text-charcoal">
                {servicio.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-gold-400">
                {servicio.duration}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-gray-mid">
                {servicio.description}
              </p>

              <ul className="mt-6 space-y-2">
                {servicio.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-gray-mid"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <a
                href="https://www.instagram.com/masaje.a.4manos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block w-full rounded-full border border-gold-200 py-2.5 text-center text-sm font-semibold text-gold-500 transition-all hover:bg-gold-300 hover:text-white"
              >
                Reservar
              </a>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-24">
          <h3 className="font-display text-center text-3xl font-light text-charcoal">
            Como es una sesion
          </h3>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Bienvenida',
                desc: 'Te recibimos en un ambiente calido y tranquilo. Conversamos sobre tus necesidades.',
              },
              {
                step: '02',
                title: 'Preparacion',
                desc: 'Preparamos la camilla con aromas y musica relajante para crear la atmosfera perfecta.',
              },
              {
                step: '03',
                title: 'Masaje Sincronizado',
                desc: 'Cuatro manos trabajan en perfecta armonia sobre tu cuerpo durante toda la sesion.',
              },
              {
                step: '04',
                title: 'Bienestar Total',
                desc: 'Finaliza la sesion con una sensacion de ligereza, equilibrio y renovacion completa.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-4xl font-bold text-gold-200">
                  {item.step}
                </span>
                <h4 className="mt-2 font-display text-lg font-semibold text-charcoal">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
