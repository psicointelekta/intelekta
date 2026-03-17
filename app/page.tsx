import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import dynamic from "next/dynamic"

const Methodology = dynamic(() => import("@/components/sections/methodology").then(mod => mod.Methodology))
const Programs = dynamic(() => import("@/components/sections/programs").then(mod => mod.Programs))
const Team = dynamic(() => import("@/components/sections/team").then(mod => mod.Team))
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials))
const Faq = dynamic(() => import("@/components/sections/faq").then(mod => mod.Faq))
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        {/* ATO 1: Despertar — Curiosidade + Esperança */}
        <Hero />

        {/* ATO 2: Compreender — Credibilidade + Clareza */}
        <About />
        <div className="section-divider" />
        <Methodology />

        {/* ATO 3: Visualizar — Identificação + Desejo */}
        <div className="section-divider" />
        <Programs />

        {/* ATO 4: Confiar — Segurança + Conexão */}
        <Team />
        <div className="section-divider-dark" />
        <Testimonials />

        {/* ATO 5: Agir — Urgência + Facilidade */}
        <Faq />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
