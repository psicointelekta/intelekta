import type { Metadata } from "next"
import { Lato, Nunito } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "404 | Página não encontrada | Intelekta",
  description:
    "A página que você tentou acessar não foi encontrada. Volte para o início e continue navegando pela Intelekta.",
}

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export default function NotFound() {
  return (
    <>
      <main className={`${lato.className} relative overflow-hidden bg-background text-foreground`}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_oklch(0.72_0.09_162_/_0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_oklch(0.545_0.115_162_/_0.1),_transparent_32%)]" />
          <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-secondary/12 blur-3xl" />
        </div>

        <header className="relative z-10 px-6 py-6 sm:px-10 sm:py-8">
          <Link
            href="/"
            className="animate-not-found-rise inline-flex opacity-0"
            style={{ animationDelay: "80ms" }}
          >
            <Image
              src="/images/logo-intelekta.webp"
              alt="Intelekta"
              width={164}
              height={54}
              priority
              className="h-auto w-36 sm:w-40"
            />
          </Link>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-6xl items-center px-6 pb-36 sm:px-10 sm:pb-40">
          <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-[minmax(220px,340px)_minmax(320px,1fr)] md:gap-2">
            <div
              className={`${nunito.className} animate-not-found-ghost pointer-events-none absolute left-1/2 top-1/2 -z-10 select-none text-[clamp(9rem,30vw,24rem)] font-black leading-none tracking-[-0.04em] text-primary/10 opacity-0`}
            >
              404
            </div>

            <div
              className="animate-not-found-rise relative order-1 justify-self-center opacity-0 md:justify-self-start"
              style={{ animationDelay: "220ms" }}
            >
              <div className="absolute inset-x-6 bottom-6 -z-10 h-16 rounded-full bg-primary/15 blur-3xl" />
              <Image
                src="/images/polvo-intelekta.webp"
                alt="Polvo Intelekta, mascote da Intelekta"
                width={340}
                height={430}
                priority
                className="h-auto w-[clamp(200px,28vw,320px)] drop-shadow-[0_24px_36px_rgba(18,60,44,0.18)]"
              />
            </div>

            <div
              className="animate-not-found-rise order-2 max-w-xl text-center opacity-0 md:text-left"
              style={{ animationDelay: "360ms" }}
            >
              <span
                className={`${nunito.className} mb-4 inline-flex rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm`}
              >
                Erro 404
              </span>

              <h1 className={`${nunito.className} text-[clamp(2rem,4.2vw,3.8rem)] font-black leading-[1.12] text-primary`}>
                Essa página se perdeu no caminho.
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-base leading-[1.65] text-muted-foreground md:mx-0 md:text-[1.05rem]">
                Não se preocupe. O nosso mascote te ajuda a voltar para a página
                certa. Tudo o que você precisa continua aqui na Intelekta.
              </p>

              <div
                className="animate-not-found-rise mt-8 flex flex-col items-center gap-3 opacity-0 sm:flex-row sm:justify-center md:justify-start"
                style={{ animationDelay: "520ms" }}
              >
                <Link
                  href="/"
                  className={`${nunito.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_14px_36px_oklch(0.545_0.115_162_/_0.24)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao início
                </Link>

                <a
                  href="https://wa.me/5527988773890?text=Ol%C3%A1!%20N%C3%A3o%20encontrei%20a%20p%C3%A1gina%20que%20procurava%20no%20site%20da%20Intelekta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${nunito.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-bold text-foreground shadow-sm backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar com a equipe
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className={`${lato.className} border-t border-border/60`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4 sm:px-10">

          {/* Identidade */}
          <div className="flex flex-wrap items-center gap-4">
            <span className={`${nunito.className} text-[13px] font-bold text-foreground`}>
              Intelekta
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="text-xs text-muted-foreground">
              Rua Afonso Pena, 403 · Praia da Costa · Vila Velha — ES
            </span>
          </div>

          {/* Contatos + Legal */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+5527988773890"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              (27) 98877-3890
            </a>
            <a
              href="mailto:contato@intelektamente.com"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              contato@intelektamente.com
            </a>
            <a
              href="https://instagram.com/psicointelekta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              @psicointelekta
            </a>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <Link href="/privacidade" className="text-xs text-muted-foreground/70 transition-colors hover:text-primary">
              Privacidade
            </Link>
            <Link href="/termos" className="text-xs text-muted-foreground/70 transition-colors hover:text-primary">
              Termos
            </Link>
          </div>

        </div>
      </footer>
    </>
  )
}