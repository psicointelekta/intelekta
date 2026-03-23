/**
 * Desktop home page composition.
 *
 * Header and Hero remain static above the fold.
 * All sections below the fold use next/dynamic for code-splitting,
 * keeping the initial JS bundle focused on first paint.
 */
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import dynamic from "next/dynamic"

const About = dynamic(() =>
  import("@/components/sections/about").then((mod) => mod.About),
)
const Methodology = dynamic(() =>
  import("@/components/sections/methodology").then((mod) => mod.Methodology),
)
const Programs = dynamic(() =>
  import("@/components/sections/programs").then((mod) => mod.Programs),
)
const ProgramDiscovery = dynamic(() =>
  import("@/components/sections/program-discovery").then((mod) => mod.ProgramDiscovery),
)
const Team = dynamic(() =>
  import("@/components/sections/team").then((mod) => mod.Team),
)
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((mod) => mod.Testimonials),
)
const Faq = dynamic(() => import("@/components/sections/faq").then((mod) => mod.Faq))
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact),
)
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer))

export function HomeDesktop() {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <ProgramDiscovery />
        <Programs />
        <div className="section-divider-dark" />
        <Testimonials />
        <div className="section-divider" />
        <Methodology />
        <div className="section-divider" />
        <About />
        <Team />
        <Faq />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
