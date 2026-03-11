"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  layer: number
}

interface Branch {
  startX: number
  startY: number
  endX: number
  endY: number
  controlX: number
  controlY: number
  width: number
}

export function NeuralTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const branchesRef = useRef<Branch[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })

  const initBranches = useCallback((width: number, height: number) => {
    const centerX = width / 2
    const baseY = height * 0.95
    const branches: Branch[] = []

    // Main trunk - thicker
    branches.push({
      startX: centerX,
      startY: baseY,
      endX: centerX,
      endY: height * 0.30,
      controlX: centerX - 20,
      controlY: height * 0.60,
      width: 5,
    })

    // Primary branches - wider spread
    const primaryBranches = [
      { start: 0.55, offset: -120, control: -70, end: 0.28 },
      { start: 0.55, offset: 110, control: 65, end: 0.30 },
      { start: 0.65, offset: -90, control: -50, end: 0.42 },
      { start: 0.65, offset: 85, control: 45, end: 0.44 },
      { start: 0.48, offset: -70, control: -45, end: 0.24 },
      { start: 0.48, offset: 75, control: 50, end: 0.22 },
      { start: 0.38, offset: -55, control: -35, end: 0.18 },
      { start: 0.38, offset: 60, control: 40, end: 0.16 },
      { start: 0.75, offset: -65, control: -35, end: 0.55 },
      { start: 0.75, offset: 70, control: 40, end: 0.52 },
      { start: 0.32, offset: -40, control: -25, end: 0.14 },
      { start: 0.32, offset: 45, control: 30, end: 0.12 },
    ]

    primaryBranches.forEach((b) => {
      branches.push({
        startX: centerX,
        startY: height * b.start,
        endX: centerX + b.offset,
        endY: height * b.end,
        controlX: centerX + b.control,
        controlY: height * ((b.start + b.end) / 2),
        width: 3,
      })
    })

    // Secondary branches
    const secondaryBranches = [
      { parentEnd: { x: -120, y: 0.28 }, offset: -40, end: 0.18 },
      { parentEnd: { x: 110, y: 0.30 }, offset: 35, end: 0.20 },
      { parentEnd: { x: -90, y: 0.42 }, offset: -35, end: 0.34 },
      { parentEnd: { x: 85, y: 0.44 }, offset: 30, end: 0.36 },
      { parentEnd: { x: -70, y: 0.24 }, offset: -30, end: 0.16 },
      { parentEnd: { x: 75, y: 0.22 }, offset: 25, end: 0.14 },
      { parentEnd: { x: -55, y: 0.18 }, offset: -20, end: 0.10 },
      { parentEnd: { x: 60, y: 0.16 }, offset: 18, end: 0.08 },
    ]

    secondaryBranches.forEach((b) => {
      branches.push({
        startX: centerX + b.parentEnd.x,
        startY: height * b.parentEnd.y,
        endX: centerX + b.parentEnd.x + b.offset,
        endY: height * b.end,
        controlX: centerX + b.parentEnd.x + b.offset * 0.6,
        controlY: height * ((b.parentEnd.y + b.end) / 2),
        width: 1.8,
      })
    })

    return branches
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const centerX = width / 2
    const numParticles = 150

    for (let i = 0; i < numParticles; i++) {
      const layer = Math.floor(i / 25)
      const layerHeight = height * (0.10 + layer * 0.13)
      const spreadX = 160 - layer * 12
      const spreadY = 50

      particles.push({
        x: centerX + (Math.random() - 0.5) * spreadX * 2,
        y: layerHeight + (Math.random() - 0.5) * spreadY,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 4.5 + 2.5,
        opacity: Math.random() * 0.5 + 0.45,
        layer,
      })
    }

    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      particlesRef.current = initParticles(rect.width, rect.height)
      branchesRef.current = initBranches(rect.width, rect.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })

    // Brand colors
    const primaryRGB = { r: 47, g: 143, b: 120 }
    const secondaryRGB = { r: 93, g: 185, b: 158 }
    const accentRGB = { r: 31, g: 111, b: 99 }

    let frameCount = 0

    const animate = () => {
      frameCount++
      // Throttle to ~30fps for performance
      if (frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const particles = particlesRef.current
      const branches = branchesRef.current

      // Draw branches
      for (let i = 0; i < branches.length; i++) {
        const branch = branches[i]
        const gradient = ctx.createLinearGradient(
          branch.startX, branch.startY, branch.endX, branch.endY
        )
        gradient.addColorStop(0, `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.8)`)
        gradient.addColorStop(1, `rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, 0.45)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = branch.width
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(branch.startX, branch.startY)
        ctx.quadraticCurveTo(branch.controlX, branch.controlY, branch.endX, branch.endY)
        ctx.stroke()
      }

      // Draw connections (limit to nearby only for performance)
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          // Skip expensive sqrt for far particles
          const distSq = dx * dx + dy * dy
          if (distSq > 4900) continue // 70^2

          const distance = Math.sqrt(distSq)
          const alpha = (1 - distance / 70) * 0.3
          ctx.strokeStyle = `rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }

      // Update and draw particles
      const centerX = rect.width / 2
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - stronger force, larger radius
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distSq = dx * dx + dy * dy

        if (distSq < 40000 && distSq > 0) { // 200^2
          const distance = Math.sqrt(distSq)
          const force = (200 - distance) / 200
          particle.vx -= (dx / distance) * force * 0.08
          particle.vy -= (dy / distance) * force * 0.08
        }

        // Boundaries
        const layerHeight = rect.height * (0.10 + particle.layer * 0.13)
        const maxSpreadX = 170 - particle.layer * 10
        const maxSpreadY = 55

        if (particle.x < centerX - maxSpreadX) particle.vx += 0.04
        else if (particle.x > centerX + maxSpreadX) particle.vx -= 0.04
        if (particle.y < layerHeight - maxSpreadY) particle.vy += 0.04
        else if (particle.y > layerHeight + maxSpreadY) particle.vy -= 0.04

        // Damping
        particle.vx *= 0.96
        particle.vy *= 0.96

        // Draw glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        glowGradient.addColorStop(0, `rgba(${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b}, ${particle.opacity * 0.6})`)
        glowGradient.addColorStop(0.5, `rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, ${particle.opacity * 0.25})`)
        glowGradient.addColorStop(1, `rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b}, ${particle.opacity})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, initBranches])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        aria-hidden="true"
      />
      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 rounded-full bg-secondary/8 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
    </motion.div>
  )
}
