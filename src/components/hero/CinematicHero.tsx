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
    productId: 'monolith-signet-1',
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
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
      className="relative w-full h-[220vh] bg-veyra-bg text-veyra-text"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-veyra-bg z-10">
        
        {/* Main Content Layout */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 flex flex-col justify-between h-full max-h-[92vh]">
          
          {/* Top Atelier Bar */}
          <div className="flex items-center justify-between text-[0.625rem] sm:text-[0.6875rem] tracking-[0.28em] uppercase text-veyra-muted border-b border-veyra-border pb-3">
            <span className="font-medium">PERMANENT METALLURGY · ATELIER 2026</span>
            <span className="font-mono text-veyra-faint hidden sm:inline-block">
              FRAME SCROLL SEQUENCE [ 01 / {TOTAL_FRAMES} ]
            </span>
          </div>

          {/* Central Split Grid: Serif Typography Left, 1:1 Square Canvas Right */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-4 sm:py-6">
            
            {/* Left Column: Refined Serif Typography & Controls */}
            <div className="lg:col-span-6 z-20 flex flex-col justify-center text-left">
              <div className="mb-3">
                <Badge variant="hallmark">
                  Archival Release · Forged in Silence
                </Badge>
              </div>

              <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.02em] text-veyra-text font-normal leading-[0.95]">
                JEWELLERY,<br />
                <span className="italic font-light text-veyra-text/90">REIMAGINED</span>
              </h1>

              <p className="text-sm sm:text-base text-veyra-muted tracking-[0.04em] mt-5 max-w-lg leading-relaxed font-normal">
                Solid cast, unplated jewelry engineered with intentional mass. Hand-finished to patina with touch, friction, and time.
              </p>

              {/* Living Metallurgy Selector (Shadcn Tabs) */}
              <div className="mt-6 p-4 rounded-xs bg-veyra-surface border border-veyra-border max-w-md shadow-xs">
                <div className="flex items-center justify-between text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-3 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-veyra-text">
                    <Layers className="w-3.5 h-3.5 text-veyra-brass" />
                    Alloy Selector
                  </span>
                  <span className="text-veyra-brass font-medium">{currentAlloyConfig.name}</span>
                </div>

                <Tabs value={selectedAlloy} onValueChange={(val) => setSelectedAlloy(val as MaterialType)}>
                  <TabsList className="grid grid-cols-3 w-full h-auto p-1 gap-1 bg-veyra-subtle border border-veyra-border/60">
                    <TabsTrigger value="oxidised-silver" className="flex items-center gap-1.5 py-2">
                      <span className="w-2 h-2 rounded-full bg-[#c5c8cc]" />
                      <span className="truncate">Silver</span>
                    </TabsTrigger>
                    <TabsTrigger value="blackened-bronze" className="flex items-center gap-1.5 py-2">
                      <span className="w-2 h-2 rounded-full bg-[#8a6e55]" />
                      <span className="truncate">Bronze</span>
                    </TabsTrigger>
                    <TabsTrigger value="raw-brass" className="flex items-center gap-1.5 py-2">
                      <span className="w-2 h-2 rounded-full bg-[#d6b36e]" />
                      <span className="truncate">Brass</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <p className="text-xs text-veyra-muted mt-3 leading-relaxed">
                  {currentAlloyConfig.description}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={scrollToCollection}
                  className="group"
                  aria-label="Scroll to collection"
                >
                  <span>Explore The Archive</span>
                  <ArrowDown className="w-3.5 h-3.5 ml-2 group-hover:translate-y-0.5 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleInspectProduct('solitary-cabochon')}
                >
                  <Eye className="w-3.5 h-3.5 mr-2 text-veyra-brass" />
                  <span>Inspect Featured Piece</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Defined 1:1 Square Canvas Panel */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[34rem] aspect-square rounded-sm border border-veyra-border bg-veyra-surface p-2 sm:p-3 shadow-xl overflow-hidden group">
                
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
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <Badge variant="outline" className="bg-white/85 backdrop-blur-xs text-[0.5625rem] font-mono border-veyra-border text-veyra-text shadow-xs">
                      Frame {String(currentFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES}
                    </Badge>
                  </div>

                  {/* Interactive Ring Hotspots Floating Over Hand */}
                  {HOTSPOTS.map((spot) => {
                    const isActive = activeHotspot?.id === spot.id
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
                            className="absolute w-6 h-6 rounded-full animate-ping opacity-40"
                            style={{ backgroundColor: spot.accentColor }}
                          />
                          <span
                            className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-125"
                            style={{ backgroundColor: spot.accentColor }}
                          />
                        </button>

                        {/* Popover Callout */}
                        {isActive && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-veyra-surface/98 backdrop-blur-md border border-veyra-border p-3.5 rounded-xs shadow-xl z-40 text-left animate-in fade-in-50 zoom-in-95 duration-200">
                            <div className="flex items-center justify-between pb-1.5 border-b border-veyra-border mb-2">
                              <span className="font-editorial text-sm text-veyra-text font-normal leading-none">
                                {spot.label}
                              </span>
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: spot.accentColor }}
                              />
                            </div>
                            <div className="text-[0.625rem] text-veyra-muted font-mono leading-tight space-y-0.5">
                              <div>{spot.metal}</div>
                              <div className="text-veyra-faint">{spot.weight}</div>
                            </div>
                            <button
                              onClick={() => handleInspectProduct(spot.productId)}
                              className="mt-2.5 w-full py-1 text-center bg-veyra-text text-white hover:bg-black rounded-xs text-[0.5625rem] tracking-[0.16em] uppercase font-mono transition-colors"
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
          <div className="flex items-center justify-between pt-4 border-t border-veyra-border text-[0.625rem] tracking-[0.25em] uppercase font-mono text-veyra-muted">
            <div className="flex items-center gap-2.5">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-veyra-brass stroke-[1.5]" />
              <span className="font-medium text-veyra-text">Discover</span>
              <span className="text-veyra-faint">[ Scroll to scrub footage ]</span>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-veyra-faint">Scrub Progress:</span>
              <div className="w-24 h-1 bg-veyra-border rounded-full overflow-hidden">
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
