import { useEffect, useRef, useState } from 'react'
import { reviews, type Review } from '../data/reviews'
import { useI18n } from '../i18n/context'
import { reviewCopy } from '../i18n/reviews'
import { WHATSAPP_URL } from '../constants/contact'
import { ReviewDialog } from '../components/ReviewDialog'

export function Opiniones({ fullPage = false }: { fullPage?: boolean }) {
  const { lang } = useI18n()
  const copy = reviewCopy[lang]
  const trackRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Review | null>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const updateEdges = () => setEdges({ start: track.scrollLeft < 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 })
    track.addEventListener('scroll', updateEdges, { passive: true })
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    return () => { observer.disconnect(); track.removeEventListener('scroll', updateEdges) }
  }, [])

  function scroll(direction: number) {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !card) return
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const Heading = fullPage ? 'h1' : 'h2'

  return (
    <section id="opiniones" className={`bg-cream-50 px-6 pb-24 ${fullPage ? 'pt-36 md:pt-40' : 'pt-24'}`}>
      <div className="mx-auto max-w-6xl">
        {fullPage && <a href="/" className="review-text-link mb-8 inline-flex min-h-11 items-center gap-2">← {copy.back}</a>}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">{copy.eyebrow}</p>
          <Heading className="font-display mt-3 text-4xl font-semibold italic text-gold-600 md:text-5xl">{copy.title}</Heading>
          <div className="mx-auto mt-5 h-px w-16 bg-gold-300" />
          <p className="mt-6 text-gray-mid">{copy.intro}</p>
        </div>

        <div ref={fullPage ? undefined : trackRef} className={fullPage ? 'mx-auto mt-12 max-w-3xl space-y-10' : 'reviews-track mt-12'} data-scroll-native="true" aria-label={copy.title}>
          {reviews.map((review, index) => (
            <figure key={review.id} className={fullPage ? 'review-full-card' : 'review-preview-card'}>
              <button type="button" aria-label={`${copy.open} ${index + 1}`} onClick={() => setSelected(review)} className={`review-image-button ${fullPage ? '' : 'review-thumbnail'}`}>
                <img
                  src={review.image}
                  alt={review.text[lang]}
                  width={review.width}
                  height={review.height}
                  loading={fullPage && index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={fullPage ? 'mx-auto block h-auto max-w-full rounded-lg' : 'h-full w-full object-contain'}
                />
                <span className="review-zoom-indicator" aria-hidden="true">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M10.5 7.5v6m-3-3h6" />
                  </svg>
                </span>
              </button>
              <figcaption className="flex items-start justify-between gap-4 px-5 py-4 text-xs text-gray-mid">
                <span>{review.ksenia ? copy.ksenia : copy.message}</span>
                <span className="shrink-0 tabular-nums text-gold-600" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {!fullPage ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <a href="/opiniones" className="review-text-link inline-flex min-h-11 items-center gap-3 font-semibold">{copy.all}<span aria-hidden="true">→</span></a>
            <div className="flex gap-3">
              <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label={copy.previous} className="review-icon-button">←</button>
              <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label={copy.next} className="review-icon-button">→</button>
            </div>
          </div>
        ) : (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="review-book-button">{copy.book}</a>
            <a href="/" className="review-text-link inline-flex min-h-11 items-center">{copy.back}</a>
          </div>
        )}
      </div>
      {selected && <ReviewDialog review={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
