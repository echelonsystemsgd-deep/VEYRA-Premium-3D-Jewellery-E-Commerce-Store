import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export const HeroOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Smooth scroll transitions for text & visual depth
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[750px] bg-[#f8f8f9] overflow-hidden select-none"
    >
      {/* 1. Direct High-Fashion Hero Model with Hand Reaching Forward */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full">
          <img
            src="/images/hero-model-hand.jpg"
            alt="VEYRA Campaign Model"
            className="w-full h-full object-cover object-[70%_35%] md:object-center filter contrast-[1.04] brightness-[0.99]"
          />

          {/* Seamless Studio Off-White Edge Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f9]/90 via-[#f8f8f9]/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f9] via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f9]/60 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>
      </motion.div>

      {/* 2. Glistening Starburst Lens Flare (Positioned right on the garnet gemstone ring, matching 00:01 in video) */}
      <div className="absolute top-[48%] left-[45%] md:left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="flare-gleam relative w-16 h-16 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/70 blur-sm animate-pulse" />
          <div className="absolute w-28 h-[1.5px] bg-white/95 rotate-45 shadow-[0_0_12px_rgba(255,255,255,1)]" />
          <div className="absolute w-28 h-[1.5px] bg-white/95 -rotate-45 shadow-[0_0_12px_rgba(255,255,255,1)]" />
          <div className="absolute w-36 h-[1.5px] bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          <div className="absolute h-36 w-[1.5px] bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '14s' }} />
        </div>
      </div>

      {/* 3. Main Typography & Interaction Overlay (Matching reference video 00:00 - 00:02) */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-7xl h-full mx-auto px-6 md:px-12 flex flex-col justify-between pt-36 pb-14 pointer-events-none"
      >
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] tracking-[0.35em] uppercase text-[#7a7a7e] font-medium"
        >
          PERMANENT METALLURGY · ATELIER 2026
        </motion.div>

        {/* Hero Title: Left Aligned "MEASURED PURITY" */}
        <div className="my-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[0.03em] text-[#121214] font-normal leading-[0.92]"
          >
            MEASURED<br />
            PURITY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-xs text-[#525256] tracking-[0.14em] uppercase mt-6 max-w-sm leading-relaxed"
          >
            Quiet, heavy, permanent jewellery. Oxidised metals, deliberate mass, uncompromised casting.
          </motion.p>

          {/* "DISCOVER ➔" button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-10 pointer-events-auto"
          >
            <button
              onClick={scrollToCollection}
              className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-[#121214] font-medium transition-all"
            >
              <span className="group-hover:tracking-[0.3em] transition-all duration-300">Discover</span>
              <div className="w-10 h-10 rounded-full border border-black/25 group-hover:border-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 shadow-sm bg-white/50 backdrop-blur-sm">
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Bottom Specifications Bar */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#88888c] border-t border-[#e5e5e7] pt-4">
          <div>Solid 925 Silver · Silicon Bronze · Raw Brass</div>
          <div className="font-mono text-[#555]">[ SCROLL TO ENTER ARCHIVE ]</div>
        </div>
      </motion.div>
    </section>
  )
}
