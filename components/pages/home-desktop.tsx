/**
 * Desktop home page composition.
 *
 * Header and Hero remain static above the fold.
 * All sections below the fold use next/dynamic for code-splitting,
 * keeping the initial JS bundle focused on first paint.
 *
 * SEO: when a targetId is provided (e.g. /sobre renders with targetId="sobre"),
 * that section is rendered first in the DOM so Googlebot sees unique primary
 * content per URL — while the full SPA experience remains intact below.
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

export function HomeDesktop({
  announcements = [],
  targetId
}: {
  announcements?: any[],
  targetId?: string
}) {
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        {/*
          Priority section — rendered first so Googlebot indexes unique content
          per URL. Stays invisible to the visitor on the full SPA scroll since
          the same section's id still exists lower on the page.
          On section pages, this IS the section the visitor sees first.
        */}
        {targetId === 'programas'   && <Programs />}
        {targetId === 'depoimentos' && <Testimonials />}
        {targetId === 'metodologia' && <Methodology />}
        {targetId === 'sobre'       && <About />}
        {targetId === 'equipe'      && <Team />}
        {targetId === 'faq'         && <Faq />}
        {targetId === 'contato'     && <Contact />}

        {/* Hero — always present; acts as "see everything" entry point */}
        <Hero initialAnnouncements={announcements} />

        {/* Remaining sections in standard order, each skipped if already rendered above */}
        {targetId !== 'programas' && <Programs />}
        {targetId !== 'depoimentos' && <div className="section-divider-dark" />}
        {targetId !== 'depoimentos' && <Testimonials />}
        {targetId !== 'metodologia' && <div className="section-divider" />}
        {targetId !== 'metodologia' && <Methodology />}
        {targetId !== 'sobre' && <div className="section-divider" />}
        {targetId !== 'sobre' && <About />}
        {targetId !== 'equipe' && <Team />}
        {targetId !== 'faq' && <Faq />}
        {targetId !== 'contato' && <div className="section-divider" />}
        {targetId !== 'contato' && <Contact />}
      </main>
      <Footer />
    </>
  )
}
