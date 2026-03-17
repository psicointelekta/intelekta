"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { track } from "@vercel/analytics/react"

const navigation = [
  { name: "Sobre", href: "#sobre" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Programas", href: "#programas" },
  { name: "Equipe", href: "#equipe" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
]

const mobileNavigation = [
  { name: "Sobre", href: "#sobre" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Programas", href: "#programas" },
  { name: "Equipe", href: "#equipe" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return
        const drawer = drawerRef.current
        if (!drawer) return
        const focusable = drawer.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey) {
          if (document.activeElement === first) {
            last.focus()
            event.preventDefault()
          }
        } else {
          if (document.activeElement === last) {
            first.focus()
            event.preventDefault()
          }
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    }
    document.body.style.overflow = "unset"
  }, [isMobileMenuOpen])

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      window.history.replaceState(null, "", href)
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.history.replaceState(null, "", "/")
              }}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/images/logo-intelekta.webp"
                alt="Intelekta - Centro de desenvolvimento cognitivo e socioemocional"
                width={160}
                height={52}
                style={{ height: 'auto', width: 'auto' }}
                className="h-10 sm:h-12"
                priority
              />
            </a>

            <div className="hidden lg:flex lg:items-center lg:gap-7">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="#contato"
                  onClick={(e) => {
                    track("cta_header_contato")
                    scrollTo(e, "#contato")
                  }}
                >
                  Contato
                </a>
              </Button>
              <Button size="sm" asChild>
                <a
                  href="https://wa.me/5527996194455?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20na%20Intelekta."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar aula gratuita
                </a>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground cursor-pointer"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card z-50 lg:hidden shadow-2xl">
            <div className="flex flex-col h-full" ref={drawerRef}>
              <div className="flex items-center justify-between px-6 h-16 sm:h-20 border-b border-border">
                <Image
                  src="/images/logo-intelekta.webp"
                  alt="Intelekta"
                  width={120}
                  height={42}
                  style={{ height: 'auto', width: 'auto' }}
                  className="h-8"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <div className="flex flex-col gap-0.5">
                  {mobileNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => { scrollTo(e, item.href); setIsMobileMenuOpen(false) }}
                      className="block py-2.5 text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="https://instagram.com/psicointelekta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">@psicointelekta</span>
                  </a>
                </div>
              </div>
              <div className="px-6 py-6 border-t border-border">
                <Button className="w-full" asChild>
                  <a
                    href="https://wa.me/5527996194455?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20na%20Intelekta."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      track("cta_header_mobile_whatsapp")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Agende uma aula gratuita
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
