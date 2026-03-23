/**
 * Mobile-specific sticky header with hamburger drawer.
 *
 * Accessibility: focus trap, Escape to close, body scroll lock.
 * Sticky (not fixed) to avoid z-index conflicts with the bottom CTA bar.
 */
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Instagram, Menu, X } from "lucide-react"
import { ProgramAwareWhatsappLink } from "@/components/program-aware-whatsapp-link"

type NavItem = {
  name: string
  href: string
}

export function MobileHomeHeader({ navigation }: { navigation: readonly NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset"
      return
    }

    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const drawer = drawerRef.current
      if (!drawer) {
        return
      }

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (!focusable.length) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        last.focus()
        event.preventDefault()
      }

      if (!event.shiftKey && document.activeElement === last) {
        first.focus()
        event.preventDefault()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center" onClick={closeMenu}>
            <Image
              src="/images/logo-intelekta.webp"
              alt="Intelekta"
              width={148}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {isOpen ? (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={closeMenu} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-card shadow-2xl" ref={drawerRef}>
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <Image
                src="/images/logo-intelekta.webp"
                alt="Intelekta"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-2 py-3 text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <a
                  href="https://www.instagram.com/psicointelekta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Instagram className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">@psicointelekta</span>
                </a>
              </div>
            </div>

            <div className="border-t border-border px-6 py-6">
              <ProgramAwareWhatsappLink
                source="mobile-header-drawer"
                onClick={closeMenu}
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                Agende uma aula experimental
              </ProgramAwareWhatsappLink>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
