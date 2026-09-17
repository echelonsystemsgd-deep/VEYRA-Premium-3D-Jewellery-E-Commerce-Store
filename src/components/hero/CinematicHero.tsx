import React, { useRef, useState, useEffect } from 'react'
import { ArrowDown, Eye, Layers } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS, MATERIAL_CONFIG, MaterialType } from '../../data/products'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

/**
 * VEYRA — Scroll-Driven Cinematic Hero Section
 * 
 * Beat 1 of the 3-Beat Editorial Experience:
 * - HTML5 Canvas frame-sequence scrub tied directly 1:1 to scroll progress ("scrollbar is a film reel").
 * - Zero raw <video> element on the page, zero buffer stutter.
 * - 72 WebP frames (12fps extracted) with progressive chunk preloading.
 * - Dedicated 1:1 square canvas panel alongside refined serif typography.
 * - Respects prefers-reduced-motion.
 * - Clean handoff into Beat 2 (3-up collection showcase) and Beat 3 (statement manifesto).
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
    topPercent: 60,
    leftPercent: 52,
    accentColor: '#787c82'
  },
  {
    id: 'signet',
    productId: 'monolith-signet-i',
    label: 'The Monolith Signet I',
    metal: 'Unlacquered Raw Brass',
    weight: '38.5g Solid Cast',
    topPercent: 68,
    leftPercent: 45,
    accentColor: '#967538'
  }
]

export const CinematicHero: React.FC = () => {
  const { setActiveModalProduct } = useCart()
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentFrameRef = useRef<number>(0)

  const [currentFrame, setCurrentFrame] = useState<number>(0)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [selectedAlloy, setSelectedAlloy] = useState<MaterialType>('oxidised-silver')
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  // Draw frame to canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex]
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }

  // Preload frame sequence progressively
  useEffect(() => {
    let isMounted = true
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null)
    imagesRef.current = images

    // Canvas internal dimension resolution
    if (canvasRef.current) {
      canvasRef.current.width = 720
      canvasRef.current.height = 720
    }

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        const padded = String(idx).padStart(3, '0')
        img.src = `/frames/hero/frame_${padded}.webp`
        img.onload = () => {
          if (!isMounted) return
          images[idx] = img
          if (idx === currentFrameRef.current) {
            drawFrame(idx)
          }
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    // Step 1: Preload the first 12 frames immediately for instant rendering
    const immediateBatch: Promise<void>[] = []
    for (let i = 0; i < Math.min(12, TOTAL_FRAMES); i++) {
      immediateBatch.push(loadSingleFrame(i))
    }

    Promise.all(immediateBatch).then(() => {
      if (!isMounted) return
      setIsReady(true)
      drawFrame(0)

      // Step 2: Progressively queue remaining frames in background
      let nextIndex = 12
      const loadNextBatch = () => {
        if (!isMounted || nextIndex >= TOTAL_FRAMES) return
        const batch: Promise<void>[] = []
        const batchEnd = Math.min(nextIndex + 8, TOTAL_FRAMES)
        for (let i = nextIndex; i < batchEnd; i++) {
          batch.push(loadSingleFrame(i))
        }
        nextIndex = batchEnd

        Promise.all(batch).then(() => {
          if (nextIndex < TOTAL_FRAMES) {
            setTimeout(loadNextBatch, 30)
          }
        })
      }
      setTimeout(loadNextBatch, 50)
    })

    return () => {
      isMounted = false
    }
  }, [])

  // 1:1 Scroll scrubbing calculation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      drawFrame(0)
      return
    }

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const track = trackRef.current
        if (!track) return

        const rect = track.getBoundingClientRect()
        const totalScrollable = rect.height - window.innerHeight
        if (totalScrollable <= 0) return

        // 0.0 at top of hero track, 1.0 when track has been fully traversed
        const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable))
        setScrollProgress(progress)

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        )

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame
          setCurrentFrame(targetFrame)
          drawFrame(targetFrame)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (!el) return
    const lenis = (window as any).__lenisInstance
    if (lenis) {
      lenis.scrollTo('#collection', { offset: -20, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInspectProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId)
    if (found) setActiveModalProduct(found)
  }

  const currentAlloyConfig = MATERIAL_CONFIG[selectedAlloy]

  // Hotspots are prominent when hand reaches forward
  const showHotspots = scrollProgress > 0.25

  return (
    <section
      ref={trackRef}
      id="cinematic-hero"
      aria-label="VEYRA Cinematic Scroll Hero"
      className="relative w-full h-[190vh] sm:h-[220vh] bg-veyra-bg text-veyra-text"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden bg-veyra-bg z-10">
        
        {/* Main Content Layout */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-3 sm:pt-20 sm:pb-6 flex flex-col justify-between h-full max-h-[100dvh]">
          
          {/* Top Atelier Bar */}
          <div className="flex items-center justify-between text-[0.5625rem] sm:text-[0.6875rem] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-veyra-muted border-b border-veyra-border pb-2 sm:pb-3 shrink-0">
            <span className="font-medium truncate">PERMANENT METALLURGY · ATELIER 2026</span>
            <span className="font-mono text-veyra-faint text-[0.5625rem] sm:text-xs">
              FRAME [ {String(currentFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES} ]
            </span>
          </div>

          {/* Central Split Grid: On Mobile, Headline -> Canvas -> Alloy/Buttons. On Desktop: 2 Columns */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 items-center justify-center py-2 sm:py-4 min-h-0">
            
            {/* Left Column Wrapper: on mobile it displays as contents so children are reordered cleanly */}
            <div className="contents lg:flex lg:flex-col lg:justify-center lg:col-span-6 z-20 text-left">
              
              {/* Title Block (Order 1 on mobile) */}
              <div className="order-1 text-center lg:text-left flex flex-col items-center lg:items-start shrink-0">
                <div className="mb-1.5 sm:mb-2.5">
                  <Badge variant="hallmark" className="text-[0.5625rem] sm:text-xs py-0.5 px-2">
                    Archival Release · Forged in Silence
                  </Badge>
                </div>

                <h1 className="font-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] tracking-[0.02em] text-veyra-text font-normal leading-[0.95]">
                  JEWELLERY,<br className="hidden xs:inline" />{' '}
                  <span className="italic font-light text-veyra-text/90">REIMAGINED</span>
                </h1>

                <p className="hidden sm:block text-xs sm:text-sm text-veyra-muted tracking-[0.03em] mt-2 lg:mt-4 max-w-lg leading-relaxed font-normal">
                  Solid cast, unplated jewelry engineered with intentional mass. Hand-finished to patina with touch, friction, and time.
                </p>
              </div>

              {/* Living Metallurgy Selector (Order 3 on mobile) */}
              <div className="order-3 w-full max-w-md mx-auto lg:mx-0 mt-1.5 sm:mt-4 lg:mt-6 p-2 sm:p-3.5 rounded-xs bg-veyra-surface border border-veyra-border shadow-xs shrink-0">
                <div className="flex items-center justify-between text-[0.5625rem] sm:text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-1.5 sm:mb-2.5 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-veyra-text">
                    <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-veyra-brass" />
                    Alloy Selector
                  </span>
                  <span className="text-veyra-brass font-medium text-[0.5625rem] sm:text-xs">{currentAlloyConfig.name}</span>
                </div>

                <Tabs value={selectedAlloy} onValueChange={(val) => setSelectedAlloy(val as MaterialType)}>
                  <TabsList className="grid grid-cols-3 w-full h-auto p-0.5 sm:p-1 gap-1 bg-veyra-subtle border border-veyra-border/60">
                    <TabsTrigger value="oxidised-silver" className="flex items-center justify-center gap-1 sm:gap-1.5 py-1 sm:py-1.5 text-[0.625rem] sm:text-xs cursor-pointer">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c5c8cc] shrink-0" />
                      <span className="truncate">Silver</span>
                    </TabsTrigger>
                    <TabsTrigger value="blackened-bronze" className="flex items-center justify-center gap-1 sm:gap-1.5 py-1 sm:py-1.5 text-[0.625rem] sm:text-xs cursor-pointer">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8a6e55] shrink-0" />
                      <span className="truncate">Bronze</span>
                    </TabsTrigger>
                    <TabsTrigger value="raw-brass" className="flex items-center justify-center gap-1 sm:gap-1.5 py-1 sm:py-1.5 text-[0.625rem] sm:text-xs cursor-pointer">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#d6b36e] shrink-0" />
                      <span className="truncate">Brass</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <p className="text-[0.5625rem] sm:text-xs text-veyra-muted mt-1.5 sm:mt-2.5 leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-none">
                  {currentAlloyConfig.description}
                </p>
              </div>

              {/* Quick Actions (Order 4 on mobile) */}
              <div className="order-4 mt-2 sm:mt-4 lg:mt-6 w-full max-w-md mx-auto lg:mx-0 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 shrink-0">
                <Button
                  variant="default"
                  size="sm"
                  onClick={scrollToCollection}
                  className="group py-2 sm:py-2.5 px-2 text-[0.625rem] sm:text-xs tracking-[0.14em] uppercase font-mono h-8 sm:h-10 cursor-pointer"
                  aria-label="Scroll to collection"
                >
                  <span className="truncate">Explore Archive</span>
                  <ArrowDown className="w-3 h-3 ml-1 sm:ml-1.5 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInspectProduct('solitary-cabochon')}
                  className="py-2 sm:py-2.5 px-2 text-[0.625rem] sm:text-xs tracking-[0.14em] uppercase font-mono h-8 sm:h-10 cursor-pointer"
                >
                  <Eye className="w-3 h-3 mr-1 sm:mr-1.5 text-veyra-brass shrink-0" />
                  <span className="truncate">Inspect Piece</span>
                </Button>
              </div>
            </div>

            {/* Right Column / Centerpiece: Defined Square Canvas Panel (Order 2 on mobile) */}
            <div className="order-2 lg:order-2 lg:col-span-6 flex items-center justify-center w-full my-auto py-1 sm:py-2 min-h-0">
              <div className="relative w-full max-w-[210px] xs:max-w-[240px] sm:max-w-[290px] md:max-w-[340px] lg:max-w-[32rem] aspect-square rounded-sm border border-veyra-border bg-veyra-surface p-1.5 sm:p-2.5 shadow-xl group shrink-0">
                
                {/* Hairline inner boundary */}
                <div className="relative w-full h-full rounded-xs overflow-hidden bg-stone-100 flex items-center justify-center">
                  
                  {/* Canvas displaying 1:1 scroll scrub sequence */}
                  <canvas
                    ref={canvasRef}
                    className={`w-full h-full object-cover select-none transition-opacity duration-500 ${
                      isReady ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-label="Model hand moving forward displaying statement rings"
                  />

                  {/* Frame Progress Pill */}
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 pointer-events-none">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-xs text-[0.5rem] sm:text-[0.5625rem] font-mono border-veyra-border text-veyra-text shadow-xs py-0.5 px-1.5">
                      Frame {String(currentFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES}
                    </Badge>
                  </div>

                  {/* Interactive Ring Hotspots Floating Over Hand */}
                  {HOTSPOTS.map((spot) => {
                    const isActive = activeHotspot?.id === spot.id
                    const isLower = spot.topPercent > 55
                    return (
                      <div
                        key={spot.id}
                        style={{ top: `${spot.topPercent}%`, left: `${spot.leftPercent}%` }}
                        className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                          showHotspots ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
                        }`}
                      >
                        {/* Pulsing Hotspot Indicator */}
                        <button
                          onClick={() => setActiveHotspot(isActive ? null : spot)}
                          onMouseEnter={() => setActiveHotspot(spot)}
                          className="group relative flex items-center justify-center p-2 focus:outline-none cursor-pointer"
                          aria-label={`Inspect ${spot.label}`}
                        >
                          <span
                            className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full animate-ping opacity-40"
                            style={{ backgroundColor: spot.accentColor }}
                          />
                          <span
                            className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-125"
                            style={{ backgroundColor: spot.accentColor }}
                          />
                        </button>

                        {/* Popover Callout */}
                        {isActive && (
                          <div className={`absolute left-1/2 -translate-x-1/2 ${
                            isLower ? 'bottom-full mb-2' : 'top-full mt-2'
                          } w-44 sm:w-56 bg-veyra-surface/98 backdrop-blur-md border border-veyra-border p-2.5 sm:p-3.5 rounded-xs shadow-xl z-40 text-left animate-in fade-in-50 zoom-in-95 duration-200`}>
                            <div className="flex items-center justify-between pb-1 sm:pb-1.5 border-b border-veyra-border mb-1 sm:mb-2">
                              <span className="font-editorial text-xs sm:text-sm text-veyra-text font-normal leading-none truncate">
                                {spot.label}
                              </span>
                              <span
                                className="w-2 h-2 rounded-full shrink-0 ml-1"
                                style={{ backgroundColor: spot.accentColor }}
                              />
                            </div>
                            <div className="text-[0.5625rem] sm:text-[0.625rem] text-veyra-muted font-mono leading-tight space-y-0.5">
                              <div>{spot.metal}</div>
                              <div className="text-veyra-faint">{spot.weight}</div>
                            </div>
                            <button
                              onClick={() => handleInspectProduct(spot.productId)}
                              className="mt-2 sm:mt-2.5 w-full py-1 text-center bg-veyra-text text-white hover:bg-black rounded-xs text-[0.5rem] sm:text-[0.5625rem] tracking-[0.16em] uppercase font-mono transition-colors cursor-pointer"
                            >
                              Inspect in 3D ↗
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Left Discover Scroll-Cue */}
          <div className="flex items-center justify-between pt-2.5 sm:pt-4 border-t border-veyra-border text-[0.5625rem] sm:text-[0.625rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono text-veyra-muted shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-veyra-brass stroke-[1.5]" />
              <span className="font-medium text-veyra-text">Discover</span>
              <span className="text-veyra-faint hidden xs:inline">[ Scroll to scrub ]</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-veyra-faint hidden sm:inline">Scrub Progress:</span>
              <div className="w-16 sm:w-24 h-1 bg-veyra-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-veyra-text transition-all duration-75"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-veyra-text font-mono">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

