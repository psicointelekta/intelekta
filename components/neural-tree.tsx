"use client"

import { useEffect, useRef, useCallback } from "react"
import { m } from "framer-motion"

interface Neuron {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  activation: number
  activationDecay: number
  connections: number[]
  pulsePhase: number
  lastFired: number
}

interface Impulse {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
}

export function NeuralTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const impulsesRef = useRef<Impulse[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const timeRef = useRef(0)
  const lastAutoFireRef = useRef(0)
  const initialCascadeDone = useRef(false)
  const lastSizeRef = useRef({ w: 0, h: 0 })
  const isMobileRef = useRef(false)

  const initNeurons = useCallback((width: number, height: number) => {
    const neurons: Neuron[] = []
    const isMobile = width < 500
    const count = isMobile ? 30 : 100
    const padding = 20
    const minDistSq = isMobile ? 3600 : 2500 // 60px mobile, 50px desktop

    // Evenly distributed across the full canvas with slight right-side density
    const clusters = isMobile
      ? [
        { cx: width * 0.5, cy: height * 0.1, rx: width * 0.44, ry: height * 0.08, count: 5, weight: 0.7 },
        { cx: width * 0.5, cy: height * 0.3, rx: width * 0.44, ry: height * 0.12, count: 6, weight: 0.8 },
        { cx: width * 0.5, cy: height * 0.52, rx: width * 0.44, ry: height * 0.12, count: 7, weight: 0.9 },
        { cx: width * 0.5, cy: height * 0.74, rx: width * 0.42, ry: height * 0.12, count: 7, weight: 0.85 },
        { cx: width * 0.5, cy: height * 0.92, rx: width * 0.38, ry: height * 0.06, count: 5, weight: 0.7 },
      ]
      : [
        // Sparse left band
        { cx: width * 0.12, cy: height * 0.3, rx: width * 0.1, ry: height * 0.28, count: 5, weight: 0.7 },
        { cx: width * 0.12, cy: height * 0.75, rx: width * 0.1, ry: height * 0.2, count: 4, weight: 0.7 },
        // Center-left
        { cx: width * 0.3, cy: height * 0.2, rx: width * 0.12, ry: height * 0.18, count: 7, weight: 0.85 },
        { cx: width * 0.3, cy: height * 0.55, rx: width * 0.12, ry: height * 0.22, count: 8, weight: 0.85 },
        { cx: width * 0.3, cy: height * 0.85, rx: width * 0.1, ry: height * 0.12, count: 5, weight: 0.8 },
        // Center
        { cx: width * 0.5, cy: height * 0.3, rx: width * 0.12, ry: height * 0.25, count: 9, weight: 1 },
        { cx: width * 0.5, cy: height * 0.72, rx: width * 0.12, ry: height * 0.22, count: 8, weight: 1 },
        // Right (denser)
        { cx: width * 0.7, cy: height * 0.25, rx: width * 0.14, ry: height * 0.22, count: 12, weight: 1 },
        { cx: width * 0.7, cy: height * 0.6, rx: width * 0.14, ry: height * 0.22, count: 12, weight: 1 },
        { cx: width * 0.7, cy: height * 0.88, rx: width * 0.12, ry: height * 0.1, count: 8, weight: 0.9 },
        // Far right
        { cx: width * 0.9, cy: height * 0.3, rx: width * 0.08, ry: height * 0.25, count: 10, weight: 0.9 },
        { cx: width * 0.9, cy: height * 0.72, rx: width * 0.08, ry: height * 0.22, count: 8, weight: 0.85 },
        // Corners
        { cx: width * 0.06, cy: height * 0.06, rx: width * 0.05, ry: height * 0.05, count: 2, weight: 0.6 },
        { cx: width * 0.96, cy: height * 0.94, rx: width * 0.04, ry: height * 0.05, count: 2, weight: 0.6 },
      ]

    let placed = 0
    for (const cluster of clusters) {
      let attempts = 0
      let clusterPlaced = 0
      while (clusterPlaced < cluster.count && placed < count && attempts < cluster.count * 8) {
        attempts++
        const angle = Math.random() * Math.PI * 2
        const dist = Math.pow(Math.random(), 0.6) * 0.9
        const x = cluster.cx + Math.cos(angle) * cluster.rx * dist
        const y = cluster.cy + Math.sin(angle) * cluster.ry * dist

        if (x < padding || x > width - padding || y < padding || y > height - padding) continue

        let tooClose = false
        for (const n of neurons) {
          const dx = n.x - x
          const dy = n.y - y
          if (dx * dx + dy * dy < minDistSq) {
            tooClose = true
            break
          }
        }
        if (tooClose) continue

        neurons.push({
          x, y,
          baseX: x,
          baseY: y,
          radius: 2.2 + Math.random() * 2.3 * cluster.weight,
          activation: 0,
          activationDecay: isMobile ? 0.006 + Math.random() * 0.004 : 0.012 + Math.random() * 0.008,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
          lastFired: -10000,
        })
        placed++
        clusterPlaced++
      }
    }

    // Build connections — wider reach for sparser layout
    const maxDist = isMobile ? 140 : 180
    const maxConn = 5

    for (let i = 0; i < neurons.length; i++) {
      const dists: { idx: number; dist: number }[] = []
      for (let j = 0; j < neurons.length; j++) {
        if (i === j) continue
        const dx = neurons[i].x - neurons[j].x
        const dy = neurons[i].y - neurons[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < maxDist) dists.push({ idx: j, dist: d })
      }
      dists.sort((a, b) => a.dist - b.dist)

      const toConnect = Math.min(dists.length, maxConn)
      for (let k = 0; k < toConnect; k++) {
        const j = dists[k].idx
        if (!neurons[i].connections.includes(j)) neurons[i].connections.push(j)
        if (!neurons[j].connections.includes(i)) neurons[j].connections.push(i)
      }
    }

    return neurons
  }, [])

  const fireNeuron = useCallback((idx: number, time: number) => {
    const neurons = neuronsRef.current
    const impulses = impulsesRef.current
    const neuron = neurons[idx]
    if (!neuron || neuron.activation > 0.5 || time - neuron.lastFired < 350) return

    neuron.activation = 1.0
    neuron.lastFired = time

    const mobile = isMobileRef.current
    for (const connIdx of neuron.connections) {
      impulses.push({
        fromIdx: idx,
        toIdx: connIdx,
        progress: 0,
        speed: mobile ? 0.008 + Math.random() * 0.005 : 0.016 + Math.random() * 0.01,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const applyCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rescaleNeurons = (prevW: number, prevH: number, newW: number, newH: number) => {
      const scaleX = newW / prevW
      const scaleY = newH / prevH
      for (const n of neuronsRef.current) {
        n.baseX *= scaleX
        n.baseY *= scaleY
        n.x *= scaleX
        n.y *= scaleY
      }
    }

    const initFull = (w: number, h: number) => {
      applyCanvasSize()
      isMobileRef.current = w < 500
      neuronsRef.current = initNeurons(w, h)
      impulsesRef.current = []
      lastSizeRef.current = { w, h }
    }

    // First init
    {
      const rect = canvas.getBoundingClientRect()
      initFull(rect.width, rect.height)
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const newW = rect.width
      const newH = rect.height
      const prev = lastSizeRef.current

      // Always apply canvas size immediately so rendering matches viewport
      applyCanvasSize()

      // Rescale neurons immediately (cheap)
      if (prev.w > 0 && prev.h > 0) {
        rescaleNeurons(prev.w, prev.h, newW, newH)
      }
      lastSizeRef.current = { w: newW, h: newH }

      // Check if we crossed mobile/desktop breakpoint — if so, debounce a full re-init
      const wasMobile = prev.w < 500
      const isMobile = newW < 500
      if (wasMobile !== isMobile) {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          const r = canvas.getBoundingClientRect()
          initFull(r.width, r.height)
          initialCascadeDone.current = false
        }, 300)
      }
    }
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y }
      } else {
        mouseRef.current = { x: -1000, y: -1000 }
      }
    }
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (e.touches.length > 0) {
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseRef.current = { x, y }
        }
      }
    }
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleLeave)

    const inactive = { r: 55, g: 155, b: 130 }
    const active = { r: 100, g: 200, b: 168 }
    const bright = { r: 160, g: 235, b: 205 }

    let frameCount = 0

    const animate = () => {
      frameCount++
      if (frameCount % 2 !== 0) { animationRef.current = requestAnimationFrame(animate); return }

      timeRef.current += 33
      const time = timeRef.current
      const w = lastSizeRef.current.w; const h = lastSizeRef.current.h
      ctx.clearRect(0, 0, w, h)

      const neurons = neuronsRef.current
      const impulses = impulsesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // --- Initial cascade: fire a center-right neuron after 800ms ---
      if (!initialCascadeDone.current && time > 800) {
        initialCascadeDone.current = true
        // Find neuron closest to center-right
        let bestIdx = 0; let bestDist = Infinity
        const targetX = w * 0.65; const targetY = h * 0.45
        for (let i = 0; i < neurons.length; i++) {
          const dx = neurons[i].x - targetX; const dy = neurons[i].y - targetY
          const d = dx * dx + dy * dy
          if (d < bestDist) { bestDist = d; bestIdx = i }
        }
        fireNeuron(bestIdx, time)
        lastAutoFireRef.current = time
      }

      // --- Auto-fire: random neuron every 2-4s (desktop) / 3-6s (mobile) ---
      const autoFireInterval = isMobileRef.current ? 3000 + Math.random() * 3000 : 2000 + Math.random() * 2000
      if (time - lastAutoFireRef.current > autoFireInterval) {
        const randomIdx = Math.floor(Math.random() * neurons.length)
        fireNeuron(randomIdx, time)
        lastAutoFireRef.current = time
      }

      // --- Mouse interaction: fire + attract ---
      const cursorActive = mx > -500 && my > -500
      const attractRadius = 220
      const attractStrength = 0.25

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        const dx = mx - n.baseX; const dy = my - n.baseY
        const distSq = dx * dx + dy * dy

        if (cursorActive && distSq < attractRadius * attractRadius) {
          const dist = Math.sqrt(distSq)
          const factor = (1 - dist / attractRadius) * attractStrength
          n.x += (n.baseX + dx * factor - n.x) * 0.18
          n.y += (n.baseY + dy * factor - n.y) * 0.18
        } else {
          n.x += (n.baseX - n.x) * 0.06
          n.y += (n.baseY - n.y) * 0.06
        }

        if (distSq < 40000) fireNeuron(i, time) // 200px
      }

      // --- Cursor glow ---
      if (cursorActive) {
        const glowRadius = 280
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius)
        grad.addColorStop(0, `rgba(${bright.r}, ${bright.g}, ${bright.b}, 0.4)`)
        grad.addColorStop(0.25, `rgba(${active.r}, ${active.g}, ${active.b}, 0.18)`)
        grad.addColorStop(0.55, `rgba(${active.r}, ${active.g}, ${active.b}, 0.06)`)
        grad.addColorStop(1, `rgba(${active.r}, ${active.g}, ${active.b}, 0)`)
        ctx.beginPath()
        ctx.arc(mx, my, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // --- Process impulses ---
      for (let i = impulses.length - 1; i >= 0; i--) {
        const imp = impulses[i]
        imp.progress += imp.speed
        if (imp.progress >= 1) {
          fireNeuron(imp.toIdx, time)
          impulses.splice(i, 1)
        }
      }

      // --- Draw connections ---
      const proxRadius = 200
      const proxRadiusSq = proxRadius * proxRadius

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        for (const j of n.connections) {
          if (j <= i) continue
          const o = neurons[j]
          const maxAct = Math.max(n.activation, o.activation)

          // Proximity boost: brighten connections near cursor
          let proxBoost = 0
          if (cursorActive) {
            const cmx = (n.x + o.x) / 2
            const cmy = (n.y + o.y) / 2
            const cdx = mx - cmx; const cdy = my - cmy
            const cdSq = cdx * cdx + cdy * cdy
            if (cdSq < proxRadiusSq) {
              proxBoost = (1 - Math.sqrt(cdSq) / proxRadius) * 0.7
            }
          }

          const alpha = 0.14 + maxAct * 0.4 + proxBoost * 0.5

          const midX = (n.x + o.x) / 2 + (n.y - o.y) * 0.07
          const midY = (n.y + o.y) / 2 + (o.x - n.x) * 0.07

          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.quadraticCurveTo(midX, midY, o.x, o.y)

          const blend = Math.min(1, maxAct + proxBoost)
          const r = inactive.r + (active.r - inactive.r) * blend
          const g = inactive.g + (active.g - inactive.g) * blend
          const b = inactive.b + (active.b - inactive.b) * blend
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.lineWidth = 1 + maxAct * 2.5 + proxBoost * 2.5
          ctx.stroke()
        }
      }

      // --- Draw impulses ---
      for (const imp of impulses) {
        const from = neurons[imp.fromIdx]; const to = neurons[imp.toIdx]
        if (!from || !to) continue
        const t = imp.progress
        const midX = (from.x + to.x) / 2 + (from.y - to.y) * 0.07
        const midY = (from.y + to.y) / 2 + (to.x - from.x) * 0.07
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y

        const glowSize = 7 + Math.sin(t * Math.PI) * 7
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowSize)
        grad.addColorStop(0, `rgba(${bright.r}, ${bright.g}, ${bright.b}, 1)`)
        grad.addColorStop(0.3, `rgba(${active.r}, ${active.g}, ${active.b}, 0.65)`)
        grad.addColorStop(1, `rgba(${active.r}, ${active.g}, ${active.b}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // --- Draw neurons ---
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        if (n.activation > 0) n.activation = Math.max(0, n.activation - n.activationDecay)

        const idlePulse = Math.sin(time * 0.0015 + n.pulsePhase) * 0.5 + 0.5
        const baseAlpha = 0.22 + idlePulse * 0.1
        const act = n.activation

        // Proximity boost for neuron glow
        let nProx = 0
        if (cursorActive) {
          const ndx = mx - n.x; const ndy = my - n.y
          const ndSq = ndx * ndx + ndy * ndy
          if (ndSq < proxRadiusSq) {
            nProx = (1 - Math.sqrt(ndSq) / proxRadius) * 0.7
          }
        }
        const totalAct = Math.min(1, act + nProx)

        const r = inactive.r + (bright.r - inactive.r) * totalAct
        const g = inactive.g + (bright.g - inactive.g) * totalAct
        const b = inactive.b + (bright.b - inactive.b) * totalAct

        // Glow when active or near cursor
        if (totalAct > 0.1) {
          const glowR = n.radius * (4 + totalAct * 8)
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
          glow.addColorStop(0, `rgba(${active.r}, ${active.g}, ${active.b}, ${totalAct * 0.5})`)
          glow.addColorStop(0.4, `rgba(${active.r}, ${active.g}, ${active.b}, ${totalAct * 0.2})`)
          glow.addColorStop(1, `rgba(${active.r}, ${active.g}, ${active.b}, 0)`)
          ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill()
        }

        // Core
        const coreR = n.radius * (1 + totalAct * 0.8)
        ctx.beginPath(); ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha + totalAct * 0.92})`
        ctx.fill()

        // Bright center
        if (totalAct > 0.25) {
          ctx.beginPath(); ctx.arc(n.x, n.y, coreR * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${bright.r}, ${bright.g}, ${bright.b}, ${totalAct})`
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [initNeurons, fireNeuron])

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        aria-hidden="true"
      />
    </m.div>
  )
}
