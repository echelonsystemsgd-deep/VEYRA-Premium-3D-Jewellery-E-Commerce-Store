import React, { useRef, useState, useEffect } from 'react'
import { ArrowDown, Sparkles, Eye, Layers, Shield } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS, MATERIAL_CONFIG, MaterialType } from '../../data/products'

/**
 * VEYRA — Luminous Cinematic Narrative Hero
 * 
 * Continuous, fluid, hardware-accelerated video loop of the model gracefully moving
 * and displaying the statement jewellery, with interactive ring hotspots on the hand,
 * an interactive living metallurgy switcher, and smooth parallax transition into the archive.
 * 100% luminous, ultra-legible, zero viewport locking, fully mobile-optimized.
 */

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [selectedAlloy, setSelectedAlloy] = useState<MaterialType>('oxidised-silver')
  const [scrollY, setScrollY] = useState(0)

  // Ensure video autoplays smoothly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: muted ensures playback
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play()
        }
      })
    }
  }, [])

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Subtle parallax translation for depth
  const parallaxOffset = Math.min(scrollY * 0.18, 120)

  return (
    <section
      ref={containerRef}
      id="cinematic-hero"
      aria-label="VEYRA Cinematic Opening"
      className="relative w-full bg-veyra-bg text-veyra-text overflow-hidden"
    >
      {/* 1. Main Fluid Narrative Container */}
      <div className="relative min-h-[92vh] lg:min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-32 pb-12 flex flex-col justify-between">
        
        {/* Top Header Tagline */}
        <div className="flex items-center justify-between text-[0.625rem] sm:text-[0.6875rem] tracking-[0.28em] uppercase text-veyra-muted border-b border-veyra-border pb-3">
          <span className="font-medium">PERMANENT METALLURGY · ATELIER 2026</span>
          <span className="font-mono text-veyra-faint hidden sm:inline-block">
            LIVE CINEMATIC ATELIER
          </span>
        </div>

        {/* Central Hero Composition: Typography + Living Video */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
          
          {/* Left Column: Headline, Narrative Copy & Living Metallurgy Selector */}
          <div className="lg:col-span-6 z-20 flex flex-col justify-center text-left">
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.02em] text-veyra-text font-normal leading-[0.95]">
              MEASURED<br />
              <span className="italic font-light text-veyra-text/90">PURITY</span>
            </h1>

            <p className="text-sm sm:text-base text-veyra-muted tracking-[0.04em] mt-5 max-w-lg leading-relaxed font-normal">
              Solid cast, unplated jewelry engineered with intentional mass. Hand-finished to patina with touch, friction, and time.
            </p>

            {/* Interactive Metallurgy Selector */}
            <div className="mt-8 p-4 rounded-sm bg-veyra-surface border border-veyra-border max-w-md shadow-sm">
              <div className="flex items-center justify-between text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-2 font-mono">
                <span className="flex items-center gap-1.5 font-medium text-veyra-text">
                  <Layers className="w-3 h-3 text-veyra-brass" />
                  Alloy Selector
                </span>
                <span className="text-veyra-brass font-medium">{currentAlloyConfig.name}</span>
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

            {/* Action Buttons */}
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

          {/* Right Column: Living Video of the Model with Interactive Hand Hotspots */}
          <div
            style={{ transform: `translate3d(0, -${parallaxOffset}px, 0)` }}
            className="lg:col-span-6 relative flex items-center justify-center transition-transform duration-100 ease-out"
          >
            <div className="relative w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[34rem] aspect-square flex items-center justify-center">
              
              {/* Studio Feathering Gradients Blending into Luminous #fbf9f5 Background */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-radial from-transparent via-veyra-bg/30 to-veyra-bg pointer-events-none z-10" />

              {/* Hardware-Accelerated Smooth Continuous Video */}
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-xl filter contrast-[1.03] brightness-[0.99] shadow-md border border-veyra-border/60"
                aria-label="Model gracefully moving hand forward displaying statement rings"
              />

              {/* Soft studio lighting edge vignette */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-veyra-bg via-transparent to-transparent opacity-60 pointer-events-none z-10" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-veyra-bg/30 via-transparent to-veyra-bg/30 pointer-events-none z-10" />

              {/* Interactive Ring Hotspots Floating Over Hand */}
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

                    {/* Interactive Tooltip / Micro-Card */}
                    {isActive && (
                      <div
                        onMouseLeave={() => setActiveHotspot(null)}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3.5 rounded-sm bg-veyra-surface/98 backdrop-blur-md border border-veyra-border shadow-xl text-left z-40 animate-in fade-in zoom-in-95 duration-200"
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

              {/* Touch Indicator Badge */}
              <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-sm bg-veyra-surface/90 backdrop-blur-xs border border-veyra-border text-[0.5625rem] tracking-[0.2em] font-mono text-veyra-muted uppercase shadow-xs">
                Interactive Ring Touchpoints
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Specifications Bar */}
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
