"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Sobre", href: "#sobre" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Programas", href: "#programas" },
  { name: "Atividades", href: "#atividades" },
  { name: "Equipe", href: "#equipe" },
]

const mobileNavigation = [
  { name: "Sobre", href: "#sobre" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Programas", href: "#programas" },
  { name: "Atividades", href: "#atividades" },
  { name: "Equipe", href: "#equipe" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZSJk5sIbSAfyxDabr8XqSSOBVuPbiN.png"
                alt="Intelekta - Centro de desenvolvimento cognitivo e socioemocional"
                width={140}
                height={48}
                style={{ height: 'auto', width: 'auto' }}
                className="h-10 sm:h-12"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-7">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="#contato">Contato</Link>
              </Button>
              <Button size="sm" className="animate-cta-pulse" asChild>
                <a href="https://wa.me/5527996194455?text=Olá! Gostaria de agendar uma aula na Intelekta." target="_blank" rel="noopener noreferrer">Aula Experimental</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 h-16 sm:h-20 border-b border-border">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZSJk5sIbSAfyxDabr8XqSSOBVuPbiN.png"
                    alt="Intelekta"
                    width={100}
                    height={36}
                    style={{ height: 'auto', width: 'auto' }}
                    className="h-8"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground"
                    aria-label="Fechar menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex-1 px-6 py-6 overflow-y-auto">
                  <div className="flex flex-col gap-0.5">
                    {mobileNavigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2.5 text-base font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social link */}
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
                    <a href="https://wa.me/5527996194455?text=Olá! Gostaria de agendar uma aula na Intelekta." target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                      Agende uma Aula Experimental
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
