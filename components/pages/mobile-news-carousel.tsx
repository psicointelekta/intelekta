"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useState, useEffect, useMemo, useCallback } from "react"

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

const SWIPE_THRESHOLD    = 0.20 // 20% width = snap
const VELOCITY_THRESHOLD = 500  // px/s = snap
const GAP                = 20

export function MobileNewsCarousel({ items }: { items: readonly NewsItem[] }) {
  // Infinite loop: clone last before first, first after last
  // Layout: [clone-last] [0] [1] ... [N-1] [clone-first]
  const loopedItems = useMemo(() => {
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items])

  // visualIndex 1 = real item 0, visualIndex N = real item N-1
  const [visualIndex, setVisualIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const [slideWidth, setSlideWidth] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      // Use a consistent size: 75% of viewport but capped for desktop-sized mobile windows
      setSlideWidth(Math.min(window.innerWidth * 0.75, 450))
      setWindowWidth(window.innerWidth)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const getTranslateX = useCallback((index: number) => {
    if (slideWidth === 0 || windowWidth === 0) return 0
    // Center the active slide
    const paddingLeft = (windowWidth - slideWidth) / 2
    return -(index * (slideWidth + GAP)) + paddingLeft
  }, [slideWidth, windowWidth])

  const goTo = useCallback((idx: number) => {
    setVisualIndex(idx)
    setIsAnimating(true)
  }, [])

  // Infinite jump logic: after the transition to a clone completes, jump to the real one
  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false)
    if (visualIndex === 0) {
      setVisualIndex(items.length)
    } else if (visualIndex === items.length + 1) {
      setVisualIndex(1)
    }
  }, [visualIndex, items.length])

  const handleDragEnd = useCallback((_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info
    const isQuickSwipe = Math.abs(velocity.x) > VELOCITY_THRESHOLD
    const isHardSwipe  = Math.abs(offset.x) > slideWidth * SWIPE_THRESHOLD

    if (isQuickSwipe || isHardSwipe) {
      const direction = (velocity.x || offset.x) > 0 ? -1 : 1
      goTo(visualIndex + direction)
    } else {
      goTo(visualIndex) // snap back
    }
  }, [visualIndex, slideWidth, goTo])

  const activeDotIndex = useMemo(() => {
    if (visualIndex === 0) return items.length - 1
    if (visualIndex === items.length + 1) return 0
    return Math.max(0, Math.min(items.length - 1, visualIndex - 1))
  }, [visualIndex, items.length])

  if (items.length === 0 || slideWidth === 0) return null

  const tx = getTranslateX(visualIndex)

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative overflow-hidden">
        <m.div
          className="flex py-2 cursor-grab active:cursor-grabbing touch-pan-y"
          animate={{ x: tx }}
          transition={isAnimating ? { type: "spring", stiffness: 350, damping: 35, mass: 0.8 } : { duration: 0 }}
          drag="x"
          dragConstraints={{
            left:  getTranslateX(items.length + 1) - 100, // allow some elastic pull
            right: getTranslateX(0) + 100,
          }}
          dragElastic={0.15}
          onDragStart={() => setIsAnimating(false)}
          onDragEnd={handleDragEnd}
          onAnimationComplete={handleAnimationComplete}
          style={{ width: "fit-content" }}
        >
          {loopedItems.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="relative rounded-3xl overflow-hidden bg-neutral-900 shadow-xl ring-1 ring-white/10 shrink-0"
              style={{ width: slideWidth || "75%", aspectRatio: "4/3", marginRight: GAP }}
            >
              <div className="block w-full h-full relative">
                <div 
                  className="absolute"
                  style={{
                    width: `${(parseFloat(item.imageZoom || "1") * 100)}%`,
                    height: `${(parseFloat(item.imageZoom || "1") * 100)}%`,
                    left: `${-((parseFloat((item.imagePosition || "50% 50%").split(" ")[0]) / 100) * (parseFloat(item.imageZoom || "1") - 1) * 100)}%`,
                    top: `${-((parseFloat((item.imagePosition || "50% 50%").split(" ")[1]) / 100) * (parseFloat(item.imageZoom || "1") - 1) * 100)}%`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover pointer-events-none select-none"
                    sizes="75vw"
                    priority={idx < 3}
                    draggable={false}
                  />
                </div>

                {/* Link moved to the "Saiba mais" button below */}

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
                  {item.link && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 pointer-events-auto"
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[10px] font-bold text-primary-foreground transition-transform active:scale-95"
                        draggable={false}
                      >
                        Saiba mais
                        <Plus className="h-3 w-3" />
                      </Link>
                    </m.div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </m.div>

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
