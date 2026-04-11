/**
 * Site footer with navigation, programs, contact info, and legal links.
 * Smooth-scroll navigation mirrors the header behavior.
 */
"use client"
import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = {
  main: [
    { name: "Programas", href: "#programas" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Sobre", href: "#sobre" },
    { name: "Equipe", href: "#equipe" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ],
  programs: [
    { name: "Neuroeducação", href: "#programas?p=neuroeducacao" },
    { name: "Xadrez Pedagógico", href: "#programas?p=xadrez" },
    { name: "Musicoterapia", href: "#programas?p=musicoterapia" },
    { name: "Cubo Mágico", href: "#programas?p=cubo-magico" },
    { name: "Reforço Escolar", href: "#programas?p=reforco-escolar" },
    { name: "Neurolê", href: "#programas?p=neurole" },
    { name: "Psicopedagogia", href: "#programas?p=psicopedagogia" },
  ],
}

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    // Find the base ID if query params are present (e.g. #programas?p=...)
    const baseId = href.split('?')[0]
    const el = document.querySelector(baseId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      window.history.replaceState(null, "", href)

      // Dispatch custom event for hash changes within the same page
      if (href.includes('?')) {
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }
  }, [])

  return (
    <footer className={cn("bg-dark-section py-12 border-t border-primary/5", className)} role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center space-y-8">
        {/* Brand */}
        <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
          <Image
            src="/images/logo-intelekta.webp"
            alt="Intelekta"
            width={140}
            height={46}
            className="h-10 w-auto brightness-0 invert opacity-90"
            priority
          />
        </Link>

        {/* Short About */}
        <p className="text-dark-section-foreground/50 text-xs sm:text-sm max-w-md leading-relaxed">
          Desenvolvimento cognitivo e socioemocional fundamentado na neurociência.
          Vila Velha - ES.
        </p>

        {/* Simplified Nav */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className="text-xs font-bold uppercase tracking-widest text-dark-section-foreground/60 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Social & Contact Mix */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/psicointelekta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-section-foreground/40 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/5527988773890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-section-foreground/40 hover:text-primary transition-colors"
            aria-label="WhatsApp"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="mailto:contato.psicointelekta@gmail.com"
            className="text-dark-section-foreground/40 hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* SEO Programs List */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/5 pt-8 w-full">
          {navigation.programs.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark-section-foreground/25 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Minimal Bottom */}
        <div className="pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-dark-section-foreground/30 uppercase tracking-widest">
            &copy; {currentYear} Intelekta &bull; Todos os direitos reservados
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="text-[10px] text-dark-section-foreground/30 hover:text-primary transition-colors font-bold uppercase tracking-widest">
              Privacidade
            </Link>
            <Link href="/termos" className="text-[10px] text-dark-section-foreground/30 hover:text-primary transition-colors font-bold uppercase tracking-widest">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
