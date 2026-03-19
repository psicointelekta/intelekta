/**
 * Desktop home page composition.
 *
 * Header, Hero, and About are statically imported (above the fold).
 * All sections below the fold use next/dynamic for code-splitting,
 * reducing the initial JS bundle by ~40%.
 */
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import dynamic from "next/dynamic"

const Methodology = dynamic(() =>
  import("@/components/sections/methodology").then((mod) => mod.Methodology),
)
const Programs = dynamic(() =>
  import("@/components/sections/programs").then((mod) => mod.Programs),
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
        <About />
        <div className="section-divider" />
        <Methodology />
        <div className="section-divider" />
        <Programs />
        <Team />
        <div className="section-divider-dark" />
        <Testimonials />
        <Faq />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
