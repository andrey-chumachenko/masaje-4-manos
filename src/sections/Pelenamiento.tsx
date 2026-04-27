export function Pelenamiento() {
  return (
    <section id="pelenamiento" className="bg-gradient-to-b from-sage-50 to-cream-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sage-500">
            Nuevo Servicio
          </span>
          <h2 className="font-display mt-6 text-4xl font-light text-charcoal md:text-5xl">
            Peleamiento{' '}
            <span className="font-semibold italic text-sage-500">Corporal</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-sage-400" />
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-mid">
            Descubre nuestra nueva envoltura corporal terapeutica: un ritual ancestral
            de restauracion que envuelve tu cuerpo en ingredientes naturales para
            desintoxicar, nutrir y renovar profundamente tu piel y tu espiritu.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          {/* Left: Description */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                Que es el Peleamiento Corporal?
              </h3>
              <p className="mt-4 leading-relaxed text-gray-mid">
                El peleamiento corporal, tambien conocido como <em>envoltura corporal</em> o
                <em> body wrap</em>, es un tratamiento estetico y terapeutico ancestral que
                consiste en aplicar una mezcla de ingredientes naturales sobre la piel y
                envolver el cuerpo con telas calidas o film especializado.
              </p>
              <p className="mt-4 leading-relaxed text-gray-mid">
                Este ritual permite que los principios activos de los ingredientes penetren
                profundamente en la piel mientras el calor generado por la envoltura favorece
                la eliminacion de toxinas, la hidratacion intensiva y una profunda sensacion
                de bienestar y recogimiento.
              </p>
            </div>

            {/* Process steps */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                Proceso del Tratamiento
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Exfoliacion preparatoria',
                    desc: 'Preparamos tu piel con una exfoliacion suave para eliminar celulas muertas y abrir los poros, maximizando la absorcion de los ingredientes activos.',
                  },
                  {
                    step: 2,
                    title: 'Aplicacion de la mezcla',
                    desc: 'Aplicamos generosamente sobre tu cuerpo una mezcla personalizada de arcillas, algas marinas, aceites esenciales y extractos botanicos seleccionados segun tus necesidades.',
                  },
                  {
                    step: 3,
                    title: 'Envoltura y reposo',
                    desc: 'Envolvemos tu cuerpo en telas calidas creando un capullo protector. Durante 20-30 minutos de reposo, los ingredientes actuan en profundidad mientras disfrutas de una relajacion total.',
                  },
                  {
                    step: 4,
                    title: 'Hidratacion final',
                    desc: 'Retiramos la envoltura y aplicamos una crema hidratante nutritiva. Tu piel queda suave, luminosa y profundamente nutrida.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-400 text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-mid">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Benefits + Image placeholders */}
          <div className="space-y-8">
            {/* Image placeholder grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                'Aplicacion de ingredientes naturales',
                'Proceso de envoltura corporal',
                'Ambiente spa con velas y elementos naturales',
                'Resultado: piel luminosa y renovada',
              ].map((alt, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-sage-100 to-cream-200"
                >
                  <div className="flex h-full items-center justify-center p-4">
                    <div className="text-center">
                      <svg className="mx-auto h-10 w-10 text-sage-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                      <p className="mt-2 text-[11px] leading-tight text-sage-400 italic">
                        {alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                Beneficios
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Desintoxicacion profunda del organismo',
                  'Hidratacion intensiva de la piel',
                  'Reduccion de la retencion de liquidos',
                  'Estimulacion de la circulacion',
                  'Efecto reafirmante y tonificante',
                  'Reduccion de medidas en zonas localizadas',
                  'Alivio de dolores musculares',
                  'Relajacion profunda y bienestar emocional',
                  'Mejora de la textura y luminosidad de la piel',
                  'Estimulacion del sistema linfatico',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-gray-mid">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration & Pricing placeholder */}
            <div className="rounded-2xl border border-sage-200 bg-sage-50/50 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-500">
                Duracion del tratamiento
              </p>
              <p className="font-display mt-2 text-4xl font-semibold text-charcoal">
                90 <span className="text-lg font-normal text-gray-mid">minutos</span>
              </p>
              <p className="mt-4 text-sm text-gray-mid">
                Incluye exfoliacion, aplicacion, envoltura e hidratacion final.
              </p>
              <a
                href="https://www.instagram.com/masaje.a.4manos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-sage-400 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-500"
              >
                Consultar disponibilidad
              </a>
            </div>
          </div>
        </div>

        {/* Ingredients showcase */}
        <div className="mt-20">
          <h3 className="font-display text-center text-2xl font-semibold text-charcoal">
            Ingredientes Naturales
          </h3>
          <div className="mx-auto mt-4 h-px w-16 bg-sage-400" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { name: 'Arcilla Verde', desc: 'Purificante y remineralizante', emoji: '🌿' },
              { name: 'Algas Marinas', desc: 'Ricas en minerales y antioxidantes', emoji: '🌊' },
              { name: 'Aceite de Coco', desc: 'Hidratacion y nutricion profunda', emoji: '🥥' },
              { name: 'Lavanda', desc: 'Relajacion y efecto calmante', emoji: '💜' },
            ].map((item) => (
              <div key={item.name} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <span className="text-3xl">{item.emoji}</span>
                <h4 className="mt-3 font-display text-base font-semibold text-charcoal">
                  {item.name}
                </h4>
                <p className="mt-1 text-xs text-gray-mid">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
