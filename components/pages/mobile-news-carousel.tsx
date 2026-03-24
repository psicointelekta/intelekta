"use client"

import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

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
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-0.5">
          {items.map((item, idx) => (
            <m.div 
              key={idx}
              initial={{ opacity: 0.6, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              className="relative min-w-[85vw] aspect-[3/2] rounded-3xl overflow-hidden bg-neutral-900 snap-center shadow-xl ring-1 ring-white/10"
            >
              {item.link ? (
                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="85vw"
                    priority={idx < 2}
                  />
                </Link>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  style={{ 
                    objectPosition: item.imagePosition || '50% 50%',
                    transform: `scale(${item.imageZoom || 1})`
                  }}
                  sizes="85vw"
                  priority={idx < 2}
                />
              )}
              
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2 py-0.5 bg-primary/95 text-[8px] font-bold tracking-[0.15em] text-primary-foreground rounded-full uppercase">
                    {item.category || "Novidade"}
                  </span>
                  {item.date && (
                    <span className="text-[9px] font-black text-white bg-white/20 px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">{item.date}</span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs line-clamp-2 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
        
        {/* Swipe Indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          {items.slice(0, 5).map((_, idx) => (
            <div 
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-primary" : "bg-primary/20"}`}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  )
}
