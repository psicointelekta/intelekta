"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Announcement {
  id: number
  date: string
  category: string
  title: string
  description: string
  imageUrl: string
  linkUrl: string
}

export function Announcements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [items, setItems] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const next = () => {
    if (items.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    if (items.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  if (!isLoading && items.length === 0) return null

  return (
    <section id="novidades" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Fique por dentro</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
            >
              Novidades e <span className="text-primary italic">Avisos</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={items.length <= 1}
              className="rounded-full border-border hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={items.length <= 1}
              className="rounded-full border-border hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="aspect-[4/3] rounded-3xl bg-muted animate-pulse" />
                <div className="space-y-4">
                  <div className="h-8 w-1/4 bg-muted rounded animate-pulse" />
                  <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-24 w-full bg-muted rounded animate-pulse" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Image side */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-[32px] border border-border shadow-2xl">
                    {items[currentIndex].imageUrl ? (
                      <img
                        src={items[currentIndex].imageUrl}
                        alt={items[currentIndex].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-primary border border-primary/10">
                        {items[currentIndex].category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-4">
                    <Calendar className="w-4 h-4" />
                    {items[currentIndex].date}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-black text-foreground leading-[1.1] mb-6 tracking-tight">
                    {items[currentIndex].title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {items[currentIndex].description}
                  </p>
                  
                  {items[currentIndex].linkUrl && (
                    <div className="flex">
                      <Button asChild size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 group">
                        <a href={items[currentIndex].linkUrl} target="_blank" rel="noopener noreferrer">
                          Saiba mais
                          <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* Indicators */}
                  <div className="flex gap-2 mt-12">
                    {items.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          idx === currentIndex ? "w-10 bg-primary" : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                        )}
                        aria-label={`Ir para notícia ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
