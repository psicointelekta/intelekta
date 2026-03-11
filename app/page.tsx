import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Activities } from "@/components/sections/activities"
import { Programs } from "@/components/sections/programs"
import { Methodology } from "@/components/sections/methodology"
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
        <Hero />
        <About />
        <Activities />
        <Programs />
        <Methodology />
        <Team />
        <Testimonials />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
