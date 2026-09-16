import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowDown } from 'lucide-react'

/**
 * VEYRA — Cinematic Scroll-Scrub Hero Section
 * 
 * Direct 1:1 tactile canvas film-reel scrub of the model reaching forward.
 * The square footage is seamlessly blended into the studio off-white (#f8f8f9)
 * environment via soft edge feathering, creating a full-bleed editorial hero.
 * 
 * As the user scrolls down, the hand extends frame-by-frame toward the camera.
 * As the user continues scrolling, the hero softly cross-fades into the 3-column
 * collection showcase.
 */

const TOTAL_FRAMES = 72
const SCRUB_PROGRESS_LIMIT = 0.65 // Scrub completes at 65% scroll, then fades into collection

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
    // Fallback to closest loaded frame if not yet complete
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
    let loadedCount = 0

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `/frames/hero/frame_${frameNum}.webp`

      img.onload = () => {
        if (!mounted) return
        loadedCount++
        // Draw frame 0 immediately once ready
        if (i === 0) {
          drawFrame(0)
        }
        if (loadedCount >= 10) {
          setIsLoaded(true)
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

      // Progress normalized from 0.0 to 1.0
      const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      setScrollProgress(currentProgress)

      if (!prefersReducedMotion) {
        // Frame index scrubbing
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
      aria-label="VEYRA Cinematic Opening"
      className="relative w-full h-[220vh] bg-[#f8f8f9] text-[#121214]"
    >
      {/* Pinned Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">

        {/* 1. Full-Height Central Model Canvas with Seamless Studio Vignette */}
        <div
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${heroY}px, 0)` }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 ease-out"
        >
          <div className="relative w-full max-w-[850px] aspect-square flex items-center justify-center">
            {/* The 1:1 Canvas Sequence */}
            <canvas
              ref={canvasRef}
              width={544}
              height={544}
              className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.99]"
              aria-label="VEYRA Model reaching hand forward wearing solid rings"
            />

            {/* Seamless Off-White Studio Vignette Blending to #f8f8f9 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f9] via-transparent to-[#f8f8f9] opacity-95 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f9]/80 via-transparent to-[#f8f8f9] opacity-95 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
          </div>
        </div>

        {/* 2. Editorial Typography Overlay */}
        <div
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${heroY}px, 0)` }}
          className="relative z-10 max-w-7xl h-full w-full mx-auto px-6 md:px-12 flex flex-col justify-between pt-32 pb-10 pointer-events-none transition-opacity duration-150 ease-out"
        >
          {/* Top Tagline */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-[#7a7a7e] font-medium border-b border-[#e5e5e7] pb-3">
            <span>PERMANENT METALLURGY · ATELIER 2026</span>
            <span className="font-mono text-[#9999a0] hidden sm:inline-block">
              FRAME {String(Math.min(TOTAL_FRAMES, Math.max(1, Math.round(Math.min(1, scrollProgress / SCRUB_PROGRESS_LIMIT) * TOTAL_FRAMES)))).padStart(3, '0')} / {TOTAL_FRAMES}
            </span>
          </div>

          {/* Left Aligned Main Title & Copy */}
          <div className="my-auto max-w-2xl text-left pointer-events-auto">
            <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[0.02em] text-[#121214] font-normal leading-[0.92]">
              MEASURED<br />
              <span className="italic font-light">PURITY</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#525256] tracking-[0.12em] uppercase mt-6 max-w-sm leading-relaxed">
              Quiet, heavy, permanent jewellery. Oxidised metals, deliberate mass, uncompromised casting.
            </p>

            {/* "Discover" Interactive Button */}
            <div className="mt-8">
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-[#121214] font-medium transition-all"
                aria-label="Scroll to collection"
              >
                <span className="group-hover:tracking-[0.3em] transition-all duration-300">Discover</span>
                <div className="w-10 h-10 rounded-full border border-black/25 group-hover:border-black flex items-center justify-center transition-all duration-300 group-hover:translate-y-1 shadow-sm bg-white/60 backdrop-blur-sm">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Bar Specifications & Scroll Indicator */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#88888c] border-t border-[#e5e5e7] pt-4">
            <div>Solid 925 Silver · Blackened Bronze · Raw Brass</div>
            <div className="font-mono text-[#555] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black/60 animate-pulse" />
              <span>[ SCROLL TO SCRUB ARCHIVE ]</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
