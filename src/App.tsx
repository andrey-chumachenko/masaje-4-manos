import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { SobreNosotras } from './sections/SobreNosotras'
import { Servicios } from './sections/Servicios'
import { Peleamiento } from './sections/Peleamiento'
import { CertificadoRegalo } from './sections/CertificadoRegalo'
import { Galeria } from './sections/Galeria'
import { Contacto } from './sections/Contacto'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main>
        <Hero />
        <SobreNosotras />
        <Servicios />
        <Peleamiento />
        <CertificadoRegalo />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
