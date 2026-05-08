import { useRef, useEffect, useState } from 'react'
import { useI18n } from '../i18n/context'

const GALLERY_ITEMS = [
  { src: '/images/galeria-01.jpg', alt: 'Detalle de masaje sincronizado' },
  { src: '/images/galeria-02.jpg', alt: 'Escena de masaje a cuatro manos' },
  { src: '/images/galeria-03.jpg', alt: 'Trabajo coordinado de las terapeutas' },
  { src: '/images/galeria-04.jpg', alt: 'Toque relajante en la cabeza y espalda' },
  { src: '/images/galeria-05.jpg', alt: 'Movimiento armonioso sobre el cuerpo' },
  { src: '/images/galeria-06.jpg', alt: 'Las terapeutas trabajando en sincronizacion' },
  { src: '/images/galeria-07.jpg', alt: 'Masaje corporal con mantas y ambiente calido' },
  { src: '/images/galeria-08.jpg', alt: 'Tecnica de estiramiento y movilidad' },
]

const ITEM_WIDTH = 320
const GAP = 16
const SPEED = 0.5
const TOTAL_WIDTH = GALLERY_ITEMS.length * (ITEM_WIDTH + GAP)

export function Galeria() {
  const { t } = useI18n()
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef(0)
  const offsetRef = useRef(0)
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const dragOffset = useRef(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    function tick() {
      if (!isDragging.current) {
        offsetRef.current -= SPEED
        if (offsetRef.current <= -TOTAL_WIDTH) {
          offsetRef.current += TOTAL_WIDTH
        }
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    setDragging(true)
    dragStart.current = e.clientX
    dragOffset.current = offsetRef.current
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const delta = e.clientX - dragStart.current
    offsetRef.current = dragOffset.current + delta
  }

  const onPointerUp = () => {
    isDragging.current = false
    setDragging(false)
    if (offsetRef.current > 0) offsetRef.current = 0
    if (offsetRef.current <= -TOTAL_WIDTH) offsetRef.current += TOTAL_WIDTH
  }

  const tripled = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS]

  return (
    <section id="galeria" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.gallery.subtitle}
          </p>
          <h2 className="font-display mt-3 text-4xl font-light text-charcoal md:text-5xl">
            <span className="font-semibold italic text-gold-500">{t.gallery.title}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-300" />
        </div>
      </div>

      <div
        className="relative mt-12 select-none overflow-hidden"
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP }}
        >
          {tripled.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="group relative shrink-0 overflow-hidden rounded-xl bg-cream-100"
              style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 text-center">
        <p className="text-sm text-gray-mid">
          {t.gallery.instagramText}
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
    </section>
  )
}
