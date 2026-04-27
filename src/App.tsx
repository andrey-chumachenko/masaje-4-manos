import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { SobreNosotras } from './sections/SobreNosotras'
import { Servicios } from './sections/Servicios'
import { Pelenamiento } from './sections/Pelenamiento'
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
        <Pelenamiento />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
