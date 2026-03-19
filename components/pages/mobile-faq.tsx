"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
}

export function MobileFaq({ faqs }: { faqs: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <article
            key={faq.question}
            className={isOpen
              ? "rounded-3xl border border-primary/30 bg-card px-5 py-1 transition-colors duration-200"
              : "rounded-3xl border border-border bg-card px-5 py-1 transition-colors duration-200"
            }
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={isOpen
                ? "flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-primary"
                : "flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground"
              }
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <ChevronDown className={isOpen ? "h-5 w-5 shrink-0 rotate-180 transition-transform duration-200" : "h-5 w-5 shrink-0 transition-transform duration-200"} />
            </button>

            {isOpen ? (
              <div className="pb-4 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
