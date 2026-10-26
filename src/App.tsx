import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { SobreNosotras } from './sections/SobreNosotras'
import { Servicios } from './sections/Servicios'
import { Peleamiento } from './sections/Peleamiento'
import { CertificadoRegalo } from './sections/CertificadoRegalo'
import { Galeria } from './sections/Galeria'
import { Contacto } from './sections/Contacto'
import { Footer } from './components/Footer'
import { RevealMotion } from './components/RevealMotion'
import { Opiniones } from './sections/Opiniones'
import { useI18n } from './i18n/context'
import { reviewCopy } from './i18n/reviews'

const isReviewsPage = /^\/opiniones\/?$/.test(window.location.pathname)

function App() {
  const { lang } = useI18n()
  const copy = reviewCopy[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang
    if (isReviewsPage) {
      document.title = `${copy.title} — Masaje relajante a 4 manos`
      document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description)
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `https://masaje4manos.es/${isReviewsPage ? 'opiniones' : ''}`
  }, [lang, copy])

  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--fg)]">
      <RevealMotion />
      <Header innerPage={isReviewsPage} />
      <main>
        {isReviewsPage ? <Opiniones fullPage /> : (
          <>
            <Hero />
            <SobreNosotras />
            <Opiniones />
            <Servicios />
            <Peleamiento />
            <CertificadoRegalo />
            <Galeria />
            <Contacto />
          </>
        )}
      </main>
      <Footer innerPage={isReviewsPage} />
    </div>
  )
}

export default App
