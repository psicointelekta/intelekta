"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"

export interface NewsItem {
  src: string
  alt: string
  title: string
  category: string
  description: string
  date: string
  link?: string
  imagePosition?: string
  imageZoom?: string
}

export function MobileNewsCarousel({ items }: { items: readonly NewsItem[] }) {
  // Infinite loop: clone last before first, first after last
  // Layout: [clone-last] [0] [1] ... [N-1] [clone-first]
  const loopedItems = useMemo(() => {
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items])

  // visualIndex 1 = real item 0, visualIndex N = real item N-1
  const [visualIndex, setVisualIndex] = useState(1)
  const [animated, setAnimated] = useState(true)

  // Touch tracking
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const isSwiping = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Measurements
  const [slideWidth, setSlideWidth] = useState(0)
  const gapPx = 20

  // Measure slide width on mount and resize
  useEffect(() => {
    function measure() {
      setSlideWidth(window.innerWidth * 0.75)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Compute the translateX for a given index
  const getTranslateX = useCallback(
    (index: number) => {
      if (slideWidth === 0) return 0
      const paddingLeft = (window.innerWidth - slideWidth) / 2
      return -(index * (slideWidth + gapPx)) + paddingLeft
    },
    [slideWidth, gapPx]
  )

  // --- Infinite loop: after animating to a clone, silently jump ---
  useEffect(() => {
    if (visualIndex === 0) {
      // At clone-last → jump to real last
      const t = setTimeout(() => {
        setAnimated(false)
        setVisualIndex(items.length)
        // Re-enable animation on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimated(true))
        })
      }, 350)
      return () => clearTimeout(t)
    }
    if (visualIndex === items.length + 1) {
      // At clone-first → jump to real first
      const t = setTimeout(() => {
        setAnimated(false)
        setVisualIndex(1)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimated(true))
        })
      }, 350)
      return () => clearTimeout(t)
    }
  }, [visualIndex, items.length])

  // --- Touch handlers ---
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    isSwiping.current = false
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current
      touchDeltaX.current = dx

      // If horizontal movement > 10px, we're swiping → prevent vertical scroll
      if (Math.abs(dx) > 10) {
        isSwiping.current = true
      }

      // Apply live drag offset via transform
      if (isSwiping.current && containerRef.current) {
        const base = getTranslateX(visualIndex)
        containerRef.current.style.transition = "none"
        containerRef.current.style.transform = `translate3d(${base + dx}px, 0, 0)`
      }
    },
    [visualIndex, getTranslateX]
  )

  const onTouchEnd = useCallback(() => {
    const dx = touchDeltaX.current
    const threshold = slideWidth * 0.2 // 20% of slide width

    if (containerRef.current) {
      // Re-enable CSS transition
      containerRef.current.style.transition = ""
      containerRef.current.style.transform = ""
    }

    setAnimated(true)

    if (Math.abs(dx) > threshold) {
      if (dx < 0) {
        setVisualIndex((v) => v + 1) // swipe left → next
      } else {
        setVisualIndex((v) => v - 1) // swipe right → prev
      }
    }
    // else: snap back (transform will reset to current visualIndex via style)

    isSwiping.current = false
  }, [slideWidth])

  // Dot indicator
  const activeDotIndex = useMemo(() => {
    if (visualIndex === 0) return items.length - 1
    if (visualIndex === items.length + 1) return 0
    return visualIndex - 1
  }, [visualIndex, items.length])

  if (items.length === 0 || slideWidth === 0) return null

  const tx = getTranslateX(visualIndex)

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="flex py-2"
          style={{
            gap: `${gapPx}px`,
            transform: `translate3d(${tx}px, 0, 0)`,
            transition: animated ? "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            willChange: "transform",
            minWidth: `${loopedItems.length * slideWidth + (loopedItems.length - 1) * gapPx}px`,
          }}
        >
          {loopedItems.map((item, idx) => (
            <div
              key={`slide-${idx}`}
              className="relative rounded-3xl overflow-hidden bg-neutral-900 shadow-xl ring-1 ring-white/10 shrink-0"
              style={{ width: slideWidth, aspectRatio: "4/3" }}
            >
              <div className="block w-full h-full relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover pointer-events-none select-none"
                  style={{
                    objectPosition: item.imagePosition || "50% 50%",
                    transform: `scale(${item.imageZoom || 1})`,
                  }}
                  sizes="75vw"
                  priority={idx < 3}
                  draggable={false}
                />

                {item.link && !isSwiping.current && (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    draggable={false}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end px-6 pt-6 pb-4 pointer-events-none">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2 py-0.5 bg-primary/95 text-[8px] font-bold tracking-[0.15em] text-primary-foreground rounded-full uppercase">
                      {item.category || "Novidade"}
                    </span>
                  </div>
                  {item.date && (
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[9px] text-white/90 font-medium whitespace-nowrap">
                      {item.date}
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1.5 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 text-[10px] font-bold text-primary flex items-center gap-1.5">
                    Saiba mais
                    <Plus className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-2 pb-6">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeDotIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  )
}
