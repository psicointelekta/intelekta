import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Methodology } from "@/components/sections/methodology"
import { Programs } from "@/components/sections/programs"
import { Activities } from "@/components/sections/activities"
import { Team } from "@/components/sections/team"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { Cta } from "@/components/sections/cta"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ATO 1: Despertar — Curiosidade + Esperança */}
        <Hero />

        {/* ATO 2: Compreender — Credibilidade + Clareza */}
        <About />
        <div className="section-divider" />
        <Methodology />

        {/* ATO 3: Visualizar — Identificação + Desejo */}
        <div className="section-divider" />
        <Programs />
        <div className="section-divider" />
        <Activities />

        {/* ATO 4: Confiar — Segurança + Conexão */}
        <Team />
        <div className="section-divider-dark" />
        <Testimonials />

        {/* ATO 5: Agir — Urgência + Facilidade */}
        <Faq />
        <div className="section-divider" />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
