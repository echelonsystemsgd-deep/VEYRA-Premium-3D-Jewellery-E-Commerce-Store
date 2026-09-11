import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { HeroHandScene } from '../3d/HeroHandScene'
import { ArrowDown, ShieldCheck, Compass, Sparkles } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export const HeroOverlay: React.FC = () => {
  const { openPrivateViewing } = useCart()

  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-[#08080a]">
      {/* 3D Cinematic Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0.4, 3.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <HeroHandScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmospheric Background Glows */}
      <div className="ambient-flare w-[500px] h-[500px] bg-[#9e7e45]/10 top-1/4 left-1/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="ambient-flare w-[600px] h-[600px] bg-[#23232f]/40 bottom-10 right-10 pointer-events-none" />

      {/* Gradient Vignette so 3D blends into dark luxury void */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#08080a]/80 via-transparent to-[#08080a]/80" />

      {/* Typography Overlay */}
      <div className="relative z-30 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col justify-between h-full pt-32 pb-12 pointer-events-none">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-[#969592]"
        >
          <span className="w-8 h-[1px] bg-[#969592]/50" />
          <span>Permanence · Heavy Metallurgy · No Plating</span>
        </motion.div>

        {/* Center Main Headline */}
        <div className="my-auto text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] tracking-[0.25em] text-[#faf9f6] font-light leading-none select-none pl-4"
          >
            VEYRA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#d4cfc7] tracking-[0.18em] mt-6 md:mt-8 font-light"
          >
            Forged in Silence
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.2 }}
            className="text-xs md:text-sm text-[#8a8884] tracking-[0.18em] max-w-lg mx-auto mt-4 font-light leading-relaxed"
          >
            Quiet, heavy, permanent jewellery. Oxidised metals, deliberate mass, uncompromised casting. Designed to outlast the wearer.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <button
              onClick={scrollToCollection}
              className="btn-luxury-solid w-full sm:w-auto"
            >
              <span>Explore Collection</span>
            </button>

            <button
              onClick={() => openPrivateViewing()}
              className="btn-luxury-outline w-full sm:w-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c9a767]" />
              <span>Private Viewing</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar: Specifications & Scroll Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.07] text-[10px] tracking-[0.24em] uppercase text-[#73726f]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a767]" />
              Solid 925 Silver & Silicon Bronze
            </span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Zero Surface Plating</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Lifetime Replacement Pledge</span>
          </div>

          <button
            onClick={scrollToCollection}
            className="flex items-center gap-2 hover:text-white transition-colors duration-300 pointer-events-auto"
          >
            <span>Descend</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
