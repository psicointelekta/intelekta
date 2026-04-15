/**
 * SEO Links section for the homepage.
 * Provides crawlable, standard links to all indexable sub-pages.
 * This aids in Google sitelink generation and clarifies site architecture.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const seoLinks = [
  { name: "Sobre a Intelekta", href: "/sobre", desc: "História, missão e valores do nosso centro." },
  { name: "Nossos Programas", href: "/programas", desc: "Neuroeducação, Musicoterapia, Xadrez e mais." },
  { name: "Metodologia", href: "/metodologia", desc: "Neurociência aplicada ao desenvolvimento humano." },
  { name: "Equipe Técnica", href: "/equipe", desc: "Psicólogos, neuropsicólogos e psicopedagogos." },
  { name: "Depoimentos", href: "/depoimentos", desc: "Casos de sucesso e histórias reais de superação." },
  { name: "FAQ / Dúvidas", href: "/faq", desc: "Respostas sobre atendimentos e faixas etárias." },
  { name: "Contato e Localização", href: "/contato", desc: "Fale conosco na Praia da Costa, Vila Velha." },
]

export function SEOLinks() {
  return (
    <section className="bg-background py-16 px-6 border-t border-border/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Mapa do Site</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground leading-[1.1] tracking-tight">
              Explore o universo <span className="text-primary italic">Intelekta</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative p-6 rounded-2xl border border-border/60 bg-card hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {link.name}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {link.desc}
              </p>
            </Link>
          ))}
          
          {/* Legal Pages */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-1">
            <Link href="/privacidade" className="p-4 rounded-xl border border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary hover:border-primary/10 transition-colors flex items-center justify-center text-center">
              Privacidade
            </Link>
            <Link href="/termos" className="p-4 rounded-xl border border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary hover:border-primary/10 transition-colors flex items-center justify-center text-center">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
