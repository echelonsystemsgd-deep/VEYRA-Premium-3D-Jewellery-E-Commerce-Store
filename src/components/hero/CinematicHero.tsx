import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowDown, Sparkles, Eye, Shield, Layers } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS, MATERIAL_CONFIG, MaterialType } from '../../data/products'

/**
 * VEYRA — Luminous Cinematic Narrative Hero
 * 
 * Natural flowing scroll with fluid 1:1 canvas scrubbing of the model reaching forward.
 * Features live interactive ring hotspots on the hand and an interactive metallurgy alloy preview
 * before transitioning smoothly into the product archive.
 * Zero viewport locking. 100% luminous, accessible, and responsive.
 */

const TOTAL_FRAMES = 72

interface Hotspot {
  id: string
  productId: string
  label: string
  metal: string
  weight: string
  topPercent: number
  leftPercent: number
  accentColor: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cabochon',
    productId: 'solitary-cabochon',
    label: 'The Solitary Cabochon',
    metal: 'Oxidised 925 Silver & Garnet',
    weight: '34.6g Solid Cast',
    topPercent: 54,
    leftPercent: 44,
    accentColor: '#881337'
  },
  {
    id: 'triptych',
    productId: 'triptych-bands',
    label: 'Triptych Bands',
    metal: 'Triple Interlocking Silver',
    weight: '28.2g Solid Cast',
    topPercent: 59,
    leftPercent: 52,
    accentColor: '#787c82'
  },
  {
    id: 'signet',
    productId: 'monolith-signet-1',
    label: 'The Monolith Signet I',
    metal: 'Unlacquered Raw Brass',
    weight: '38.5g Solid Cast',
    topPercent: 67,
    leftPercent: 45,
    accentColor: '#967538'
  }
]

export const CinematicHero: React.FC = () => {
  const { setActiveModalProduct } = useCart()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [selectedAlloy, setSelectedAlloy] = useState<MaterialType>('oxidised-silver')
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
    // Fallback to nearest loaded frame
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

  // Fluid natural scroll listener
  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) {
        // Fallback for short displays
        const progress = Math.min(1, Math.max(0, -rect.top / (window.innerHeight * 0.8)))
        setScrollProgress(progress)
        return
      }

      const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      setScrollProgress(currentProgress)

      if (!prefersReducedMotion) {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
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

  const handleInspectProduct = (productId: string) => {
    const found = PRODUCTS.find(p => p.id === productId)
    if (found) {
      setActiveModalProduct(found)
    }
  }

  const currentAlloyConfig = MATERIAL_CONFIG[selectedAlloy]

  return (
    <section
      ref={containerRef}
      id="cinematic-hero"
      aria-label="VEYRA Opening"
      className="relative w-full bg-veyra-bg text-veyra-text overflow-hidden"
    >
      {/* 1. Main Fluid Hero Viewport (Smooth, Unlocked Narrative Experience) */}
      <div className="relative min-h-[92vh] lg:min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-12 flex flex-col justify-between">
        
        {/* Top Header Tagline */}
        <div className="flex items-center justify-between text-[0.625rem] sm:text-[0.6875rem] tracking-[0.28em] uppercase text-veyra-muted border-b border-veyra-border pb-3">
          <span className="font-medium">PERMANENT METALLURGY · ATELIER 2026</span>
          <span className="font-mono text-veyra-faint hidden sm:inline-block">
            INTERACTIVE NARRATIVE 01
          </span>
        </div>

        {/* Central Narrative Composition: Split Editorial + Interactive Canvas */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
          
          {/* Left Column: Headline, Narrative Copy & Living Metallurgy Selector */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center text-left">
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.02em] text-veyra-text font-normal leading-[0.95]">
              MEASURED<br />
              <span className="italic font-light text-veyra-text/90">PURITY</span>
            </h1>

            <p className="text-sm sm:text-base text-veyra-muted tracking-[0.04em] mt-5 max-w-lg leading-relaxed font-normal">
              Solid cast, unplated jewelry engineered with intentional mass. Designed to patina with touch, friction, and time.
            </p>

            {/* Interactive Metallurgy Selector: Lets users explore living alloys right in the hero */}
            <div className="mt-8 p-4 rounded-sm bg-veyra-surface border border-veyra-border max-w-md shadow-sm">
              <div className="flex items-center justify-between text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-2 font-mono">
                <span className="flex items-center gap-1.5 font-medium text-veyra-text">
                  <Layers className="w-3 h-3 text-veyra-brass" />
                  Alloy Selector
                </span>
                <span>{currentAlloyConfig.name}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                {(['oxidised-silver', 'blackened-bronze', 'raw-brass'] as MaterialType[]).map((mat) => {
                  const cfg = MATERIAL_CONFIG[mat]
                  const isSelected = selectedAlloy === mat
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedAlloy(mat)}
                      className={`px-2.5 py-2 text-left border rounded-sm transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? 'border-veyra-text bg-veyra-subtle shadow-xs'
                          : 'border-veyra-border hover:border-veyra-text/40 bg-veyra-surface'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cfg.accentColor }}
                      />
                      <span className="text-[0.5625rem] tracking-[0.14em] uppercase text-veyra-text font-medium truncate">
                        {cfg.name.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="text-[0.6875rem] text-veyra-muted mt-2.5 leading-relaxed">
                {currentAlloyConfig.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToCollection}
                className="btn-gallery-primary group"
                aria-label="Scroll to collection"
              >
                <span>Explore The Archive</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleInspectProduct('solitary-cabochon')}
                className="btn-gallery-outline text-[0.6875rem]"
              >
                <Eye className="w-3.5 h-3.5 text-veyra-brass" />
                <span>Inspect Featured Piece</span>
              </button>
            </div>
          </div>

          {/* Right Column: Luminous Canvas Scrub with Interactive Hand Hotspots */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[34rem] aspect-square flex items-center justify-center">
              
              {/* Studio Backdrop Feathering (Soft Gallery Gradient Blending into #fbf9f5) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-radial from-transparent via-veyra-bg/40 to-veyra-bg pointer-events-none z-10" />

              {/* The 1:1 Canvas Sequence */}
              <canvas
                ref={canvasRef}
                width={544}
                height={544}
                className="w-full h-full object-cover rounded-xl filter contrast-[1.02] brightness-[0.99] shadow-md border border-veyra-border/60"
                aria-label="Model reaching hand forward wearing VEYRA statement rings"
              />

              {/* Seamless Studio Border Vignettes */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-veyra-bg via-transparent to-transparent opacity-60 pointer-events-none z-10" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-veyra-bg/40 via-transparent to-veyra-bg/40 pointer-events-none z-10" />

              {/* Interactive Ring Hotspots Pinned to the Model's Hand */}
              {HOTSPOTS.map((spot) => {
                const isActive = activeHotspot?.id === spot.id
                return (
                  <div
                    key={spot.id}
                    style={{ top: `${spot.topPercent}%`, left: `${spot.leftPercent}%` }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Pulsing Hotspot Indicator */}
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : spot)}
                      onMouseEnter={() => setActiveHotspot(spot)}
                      className="group relative flex items-center justify-center p-2 focus:outline-none"
                      aria-label={`Inspect ${spot.label}`}
                    >
                      <span
                        className="absolute w-6 h-6 rounded-full animate-ping opacity-40"
                        style={{ backgroundColor: spot.accentColor }}
                      />
                      <span
                        className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: spot.accentColor }}
                      />
                    </button>

                    {/* Interactive Reveal Tooltip / Micro-Card */}
                    {isActive && (
                      <div
                        onMouseLeave={() => setActiveHotspot(null)}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3.5 rounded-sm bg-veyra-surface/95 backdrop-blur-md border border-veyra-border shadow-xl text-left z-40 animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-center gap-1.5 text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-brass font-mono">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Worn Piece</span>
                        </div>
                        <h4 className="font-editorial text-base text-veyra-text font-normal mt-1 leading-snug">
                          {spot.label}
                        </h4>
                        <div className="text-[0.625rem] font-mono text-veyra-muted mt-1">
                          {spot.weight}
                        </div>
                        <p className="text-[0.625rem] text-veyra-faint mt-1 leading-tight">
                          {spot.metal}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleInspectProduct(spot.productId)
                          }}
                          className="mt-2.5 w-full py-1 px-2 text-center text-[0.5625rem] tracking-[0.16em] uppercase bg-veyra-text text-white rounded-xs hover:bg-black transition-colors font-medium flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>Inspect in 3D</span>
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Floating Frame Cue */}
              <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-sm bg-veyra-surface/90 backdrop-blur-xs border border-veyra-border text-[0.5625rem] tracking-[0.2em] font-mono text-veyra-muted uppercase shadow-xs">
                Interactive Touch Hotspots
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Editorial Specifications Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-veyra-border text-[0.6875rem] tracking-[0.18em] uppercase text-veyra-muted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-veyra-brass" />
            <span>[ 01 ] 100% Solid Cast Metallurgy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-veyra-brass" />
            <span>[ 02 ] Zero Factory Floor Compromise</span>
          </div>
          <div className="flex items-center gap-2 justify-start md:justify-end">
            <Shield className="w-3 h-3 text-veyra-brass" />
            <span>[ 03 ] Insured Worldwide Transit</span>
          </div>
        </div>

      </div>
    </section>
  )
}
