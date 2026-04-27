import { useState } from 'react'

export function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hola! Mi nombre es ${formData.nombre}. ${formData.mensaje}`,
    )
    window.open(
      `https://www.instagram.com/masaje.a.4manos`,
      '_blank',
    )
    void text
  }

  return (
    <section id="contacto" className="bg-cream-100 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            Hablemos
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            <span className="font-semibold italic text-gold-500">Contacto</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                Reserva tu experiencia
              </h3>
              <p className="mt-4 leading-relaxed text-gray-mid">
                Estamos encantadas de atenderte. Puedes contactarnos a traves
                de Instagram o enviarnos un mensaje desde aqui. Responderemos
                lo antes posible.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-6">
              <a
                href="https://www.instagram.com/masaje.a.4manos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Instagram</p>
                  <p className="text-sm text-gray-mid">@masaje.a.4manos</p>
                </div>
              </a>

              {/* Location placeholder */}
              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Ubicacion</p>
                  <p className="text-sm text-gray-mid italic">Consultanos por la direccion del salon</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Horario</p>
                  <p className="text-sm text-gray-mid">Con cita previa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-charcoal">
              Envianos un mensaje
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Mensaje
                </label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                  placeholder="Cuentanos que necesitas..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold-300 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-500 hover:shadow-lg"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
