import { useEffect, useRef, useState } from 'react'
import type { Review } from '../data/reviews'
import { useI18n } from '../i18n/context'
import { reviewCopy } from '../i18n/reviews'

export function ReviewDialog({ review, onClose }: { review: Review; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { lang } = useI18n()
  const copy = reviewCopy[lang]
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="review-dialog"
      aria-labelledby="review-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-cream-300 bg-cream-50 px-5 py-3">
        <h2 id="review-dialog-title" className="font-display text-xl font-semibold text-charcoal">
          {review.ksenia ? copy.ksenia : copy.title}
        </h2>
        <button type="button" onClick={onClose} autoFocus aria-label={copy.close} className="review-icon-button shrink-0">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </div>
      <div className={`grid items-start gap-6 p-5 md:p-8 ${lang !== 'es' ? 'md:grid-cols-2' : ''}`}>
        <figure className="min-w-0">
          <figcaption className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-mid">{copy.original}</figcaption>
          <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed} className="review-text-link mb-3 inline-flex min-h-11 items-center text-sm font-semibold">
            {zoomed ? copy.fit : copy.zoom}
          </button>
          <div className="max-h-[75svh] overflow-auto rounded-xl" data-scroll-native="true">
            <img src={review.image} width={review.width} height={review.height} alt={review.text.es} lang="es" className={zoomed ? 'block max-w-none' : 'mx-auto max-h-[75svh] w-full object-contain'} style={zoomed ? { width: review.width, height: 'auto' } : undefined} />
          </div>
        </figure>
        {lang !== 'es' && (
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-600">{copy.translation}</h3>
            <p className="whitespace-pre-line leading-relaxed text-charcoal">{review.text[lang]}</p>
          </div>
        )}
      </div>
    </dialog>
  )
}
