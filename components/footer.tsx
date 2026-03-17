"use client"

import { useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

const navigation = {
  main: [
    { name: "Sobre", href: "#sobre" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Programas", href: "#programas" },
    { name: "Equipe", href: "#equipe" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ],
  programs: [
    { name: "Neuroeducação", href: "#programas" },
    { name: "Musicoterapia", href: "#programas" },
    { name: "Reforço Escolar", href: "#programas" },
    { name: "Xadrez", href: "#programas" },
    { name: "Cubo Mágico", href: "#programas" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      window.history.replaceState(null, "", href)
    }
  }, [])

  return (
    <footer className="bg-dark-section" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/images/logo-intelekta.webp"
                  alt="Intelekta"
                  width={140}
                  height={48}
                  className="h-10 w-auto brightness-0 invert"
                  priority
                />
              </Link>
              <p className="text-dark-section-foreground/80 leading-relaxed mb-4 text-sm">
                Centro de desenvolvimento cognitivo e socioemocional fundamentado
                em neurociência. Vila Velha, ES.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/psicointelekta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-dark-section-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram da Intelekta"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contato@intelektamente.com"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-dark-section-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email de contato"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/5527996194455?text=Olá! Gostaria de tirar algumas dúvidas sobre a Intelekta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-dark-section-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="WhatsApp de contato"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Main links */}
                <div>
                  <h3 className="font-semibold text-dark-section-foreground mb-3 text-sm">Navegação</h3>
                  <ul className="space-y-2">
                    {navigation.main.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollTo(e, item.href)}
                          className="text-sm text-dark-section-foreground/80 hover:text-primary transition-colors cursor-pointer"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Programs */}
                <div>
                  <h3 className="font-semibold text-dark-section-foreground mb-3 text-sm">Programas</h3>
                  <ul className="space-y-2">
                    {navigation.programs.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollTo(e, item.href)}
                          className="text-sm text-dark-section-foreground/80 hover:text-primary transition-colors cursor-pointer"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact info */}
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="font-semibold text-dark-section-foreground mb-3 text-sm">Contato</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-dark-section-foreground/80">
                        Rua Afonso Pena, 403<br />
                        Praia da Costa, Vila Velha - ES
                      </span>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/5527996194455?text=Olá! Gostaria de tirar algumas dúvidas sobre a Intelekta."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-dark-section-foreground/80 hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        (27) 99619-4455
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:contato@intelektamente.com"
                        className="flex items-center gap-2.5 text-sm text-dark-section-foreground/80 hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                        contato@intelektamente.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-dark-section-foreground/70 text-center sm:text-left">
              &copy; {currentYear} Intelekta. Todos os direitos reservados.
            </p>
            <div className="flex gap-5 text-xs text-dark-section-foreground/70">
              <Link href="/privacidade" className="hover:text-dark-section-foreground/80 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-dark-section-foreground/80 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
