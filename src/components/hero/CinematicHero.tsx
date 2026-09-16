import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowDown } from 'lucide-react'

/**
 * VEYRA — Cinematic Scroll-Scrub Hero Section
 * 
 * Direct 1:1 tactile canvas film-reel scrub of the model reaching forward.
 * Built on an 8px rem grid with unified stone-luxury design tokens.
 * Zero vibecoded pills or random hex values.
 */

const TOTAL_FRAMES = 72
const SCRUB_PROGRESS_LIMIT = 0.65

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Draw frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let img = framesRef.current[frameIndex]
    // Fallback to nearest loaded frame if scrolling rapidly
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const lower = framesRef.current[frameIndex - offset]
        if (lower && lower.complete && lower.naturalWidth > 0) {
          img = lower
          break
        }
        const upper = framesRef.current[frameIndex + offset]
        if (upper && upper.complete && upper.naturalWidth > 0) {
          img = upper
          break
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return

    if (canvas.width !== 544 || canvas.height !== 544) {
      canvas.width = 544
      canvas.height = 544
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, 544, 544)
  }, [])

  // Preload all 72 WebP frames upfront
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let mounted = true

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `/frames/hero/frame_${frameNum}.webp`

      img.onload = () => {
        if (!mounted) return
        if (i === 0) {
          drawFrame(0)
        }
      }
      images.push(img)
    }

    framesRef.current = images

    return () => {
      mounted = false
    }
  }, [drawFrame])

  // Scroll handler tied directly to window scroll
  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      setScrollProgress(currentProgress)

      if (!prefersReducedMotion) {
        const scrubProgress = Math.min(1, currentProgress / SCRUB_PROGRESS_LIMIT)
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(scrubProgress * (TOTAL_FRAMES - 1)))
        )
        drawFrame(frameIndex)
      }
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        handleScroll()
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [drawFrame, prefersReducedMotion])

  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cross-fade opacity as hero completes scroll
  const heroOpacity = scrollProgress > SCRUB_PROGRESS_LIMIT
    ? Math.max(0, 1 - (scrollProgress - SCRUB_PROGRESS_LIMIT) / (1 - SCRUB_PROGRESS_LIMIT))
    : 1

  const heroY = prefersReducedMotion ? 0 : (scrollProgress > SCRUB_PROGRESS_LIMIT ? (scrollProgress - SCRUB_PROGRESS_LIMIT) * -80 : 0)

  return (
    <section
      ref={containerRef}
      id="cinematic-hero"
      aria-label="VEYRA Opening"
      className="relative w-full h-[220vh] bg-veyra-bg text-veyra-text"
    >
      {/* Pinned Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">

        {/* 1. Full-Height Central Model Canvas with Seamless Studio Vignette */}
        <div
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${heroY}px, 0)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ease-out"
        >
          <div className="relative w-full max-w-[53rem] aspect-square flex items-center justify-center">
            {/* The 1:1 Canvas Sequence */}
            <canvas
              ref={canvasRef}
              width={544}
              height={544}
              className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.99]"
              aria-label="Model reaching hand forward wearing statement jewellery"
            />

            {/* Seamless Off-White Studio Vignette Blending to veyra-bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-veyra-bg via-transparent to-veyra-bg opacity-95 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-veyra-bg/80 via-transparent to-veyra-bg opacity-95 pointer-events-none" />
          </div>
        </div>

        {/* 2. Editorial Typography Overlay */}
        <div
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${heroY}px, 0)` }}
          className="relative z-10 max-w-7xl h-full w-full mx-auto px-6 md:px-12 flex flex-col justify-between pt-32 pb-10 pointer-events-none transition-opacity duration-200 ease-out"
        >
          {/* Top Tagline */}
          <div className="flex items-center justify-between text-[0.625rem] tracking-[0.35em] uppercase text-veyra-muted font-medium border-b border-veyra-border pb-3">
            <span>PERMANENT METALLURGY · ATELIER 2026</span>
            <span className="font-mono text-veyra-faint hidden sm:inline-block">
              ARCHIVAL SEQUENCE 01
            </span>
          </div>

          {/* Left Aligned Main Title & Copy */}
          <div className="my-auto max-w-2xl text-left pointer-events-auto">
            <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[0.02em] text-veyra-text font-normal leading-[0.92]">
              MEASURED<br />
              <span className="italic font-light">PURITY</span>
            </h1>

            <p className="text-xs sm:text-sm text-veyra-muted tracking-[0.12em] uppercase mt-6 max-w-sm leading-relaxed font-normal">
              Quiet, heavy, permanent jewellery. Oxidised metals, deliberate mass, uncompromised casting.
            </p>

            {/* "Discover" Interactive Button */}
            <div className="mt-8">
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-veyra-text font-medium transition-all"
                aria-label="Scroll to collection"
              >
                <span className="group-hover:tracking-[0.3em] transition-all duration-300">Discover</span>
                <div className="w-10 h-10 rounded-full border border-veyra-border group-hover:border-veyra-text flex items-center justify-center transition-all duration-300 group-hover:translate-y-1 shadow-sm bg-white/70 backdrop-blur-sm">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Bar Specifications */}
          <div className="flex items-center justify-between text-[0.625rem] tracking-[0.25em] uppercase text-veyra-faint border-t border-veyra-border pt-4">
            <div>Solid 925 Silver · Blackened Bronze · Raw Brass</div>
            <div className="font-mono text-veyra-muted">
              [ SCROLL TO ENTER ARCHIVE ]
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
