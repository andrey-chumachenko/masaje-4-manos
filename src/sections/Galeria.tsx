import { useCallback, useRef, useEffect, useState } from 'react'
import { useI18n } from '../i18n/context'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../constants/contact'

const GALLERY_ITEMS = [
  { src: '/images/optimized/gallery-old-02-640.webp', alt: 'Dos especialistas coordinando una sesion corporal' },
  { src: '/images/optimized/gallery-3153-640.webp', alt: 'Cuatro manos trabajando de forma sincronizada sobre la espalda' },
  { src: '/images/optimized/gallery-3108-640.webp', alt: 'Detalle de cuidado relajante de los pies' },
  { src: '/images/optimized/gallery-3187-640.webp', alt: 'Especialistas durante una sesion corporal a cuatro manos' },
  { src: '/images/optimized/gallery-3194-640.webp', alt: 'Movimientos coordinados en la parte superior de la espalda' },
  { src: '/images/optimized/gallery-old-07-640.webp', alt: 'Tecnica suave de movilidad y estiramiento' },
  { src: '/images/optimized/gallery-3216-640.webp', alt: 'Atencion sincronizada durante el masaje relajante' },
  { src: '/images/optimized/gallery-old-08-640.webp', alt: 'Cuidado corporal con mantas en un ambiente calido' },
  { src: '/images/optimized/gallery-3222-640.webp', alt: 'Detalle de atencion relajante en cuello y hombros' },
  { src: '/images/optimized/gallery-3228a-640.webp', alt: 'Cuidado relajante de cabeza y cuello' },
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

  const applyOffset = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      applyOffset()
      return
    }

    function tick() {
      if (!isDragging.current) {
        offsetRef.current -= SPEED
        if (offsetRef.current <= -TOTAL_WIDTH) {
          offsetRef.current += TOTAL_WIDTH
        }
      }
      applyOffset()
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [applyOffset])

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
    applyOffset()
  }

  const onPointerUp = () => {
    isDragging.current = false
    setDragging(false)
    if (offsetRef.current > 0) offsetRef.current = 0
    if (offsetRef.current <= -TOTAL_WIDTH) offsetRef.current += TOTAL_WIDTH
    applyOffset()
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
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-200 px-6 py-3 text-sm font-semibold text-gold-500 transition-all hover:bg-gold-50"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  )
}
