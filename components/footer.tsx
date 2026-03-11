"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

const navigation = {
  main: [
    { name: "Sobre", href: "#sobre" },
    { name: "Programas", href: "#programas" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Equipe", href: "#equipe" },
    { name: "Artigos", href: "#artigos" },
    { name: "Contato", href: "#contato" },
  ],
  programs: [
    { name: "Programa Infantil", href: "#programas" },
    { name: "Programa Adolescente", href: "#programas" },
    { name: "Programa Adulto", href: "#programas" },
    { name: "Programa Sênior", href: "#programas" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-section" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-20">
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZSJk5sIbSAfyxDabr8XqSSOBVuPbiN.png"
                  alt="Intelekta"
                  width={120}
                  height={42}
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-dark-section-foreground/70 leading-relaxed mb-6 text-sm sm:text-base">
                Centro de desenvolvimento cognitivo e socioemocional fundamentado 
                em neurociência. Fortalecendo mentes e emoções em todas as fases da vida.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/intelektamente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-dark-section-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram da Intelekta"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contato@intelektamente.com"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-dark-section-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email de contato"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="tel:+5527999999999"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-dark-section-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Telefone de contato"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Main links */}
                <div>
                  <h3 className="font-semibold text-dark-section-foreground mb-4 text-sm sm:text-base">Navegação</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {navigation.main.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm text-dark-section-foreground/70 hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Programs */}
                <div>
                  <h3 className="font-semibold text-dark-section-foreground mb-4 text-sm sm:text-base">Programas</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {navigation.programs.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm text-dark-section-foreground/70 hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact info */}
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="font-semibold text-dark-section-foreground mb-4 text-sm sm:text-base">Contato</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-dark-section-foreground/70">
                        Rua Afonso Pena, 403<br />
                        Praia da Costa, Vila Velha - ES
                      </span>
                    </li>
                    <li>
                      <a
                        href="tel:+5527999999999"
                        className="flex items-center gap-3 text-sm text-dark-section-foreground/70 hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        (27) 99999-9999
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:contato@intelektamente.com"
                        className="flex items-center gap-3 text-sm text-dark-section-foreground/70 hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
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
        <div className="border-t border-white/10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-dark-section-foreground/50 text-center sm:text-left">
              &copy; {currentYear} Intelekta. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-dark-section-foreground/50">
              <Link href="#" className="hover:text-dark-section-foreground transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-dark-section-foreground transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
