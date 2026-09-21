import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'

export const EditorialSection: React.FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="editorial" className="relative bg-veyra-bg text-veyra-text border-t border-veyra-border overflow-hidden">
      
      {/* 1. Full-Width Editorial Macro Banner (Carrying the Model's Visual Narrative into Section 2) */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface border-b border-veyra-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left: Close-up macro visual of the hand wearing multiple rings */}
          <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-[28rem] overflow-hidden border-b lg:border-b-0 lg:border-r border-veyra-border">
            <img
              src="/images/hero-model-hand.jpg"
              alt="Artisan hand wearing multiple solid cast rings"
              className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98] hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <Badge variant="outline" className="bg-black/40 backdrop-blur-md text-white border-white/20">
                Figure 02 · Tactile Patina Evolution
              </Badge>
            </div>
          </div>

          {/* Right: Editorial Quote & Philosophy */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="mb-3">
              <Badge variant="hallmark">
                <Sparkles className="w-2.5 h-2.5 mr-1.5" />
                The Philosophy of Weight
              </Badge>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-veyra-text font-normal leading-[1.05] tracking-wide">
              "We cast for permanence, not fleeting trend."
            </h3>
            <p className="text-xs sm:text-sm text-veyra-muted mt-4 leading-relaxed max-w-md font-normal">
              Every ring begins as an unyielding ingot of virgin metal. We do not plate, we do not hollow, and we never polish away the human touch.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Architectural Grid: Manifesto & 3 Specification Cards */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-bg relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Manifesto & Philosophy */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-veyra-border flex flex-col justify-between bg-veyra-surface">
            <div>
              <div className="mb-3">
                <Badge variant="hallmark">
                  Atelier Manifesto · 2026
                </Badge>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.02em] text-veyra-text leading-[0.95] mb-8">
                Made Without<br />Compromise
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-veyra-muted leading-relaxed max-w-xl font-normal">
                <p>
                  Each ring is forged by a single pair of hands — no factory floor, no assembly line. The material is chosen first, the form follows its nature.
                </p>
                <p>
                  We work in oxidized silver, blackened bronze, and raw brass. Weights are deliberate. Edges are left where they fall. Nothing is smoothed for comfort.
                </p>
                <p className="text-veyra-text font-medium">
                  VEYRA exists for those who wear jewelry that means something. Not decoration — declaration. One piece at a time, made to last a lifetime.
                </p>
              </div>
            </div>

            {/* "VIEW COLLECTION ➔" */}
            <div className="pt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToCollection}
                className="group"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-3 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
              </Button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Specification Cells */}
          <div className="lg:col-span-5 flex flex-col bg-veyra-bg">
            {/* Cell 1: Deliberate Weight */}
            <div className="p-8 sm:p-12 border-b border-veyra-border flex flex-col justify-between flex-1 bg-veyra-surface hover:bg-veyra-subtle/50 transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide">
                  Deliberate Weight
                </h3>
                <span className="text-[0.625rem] font-mono text-veyra-faint uppercase">[ 01 ]</span>
              </div>
              <p className="text-xs tracking-[0.06em] text-veyra-muted uppercase mt-6 leading-relaxed">
                Each ring is a physical presence you feel
              </p>
            </div>

            {/* Cell 2: Sterling & Silver */}
            <div className="p-8 sm:p-12 border-b border-veyra-border flex flex-col justify-between flex-1 bg-veyra-surface hover:bg-veyra-subtle/50 transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide">
                  Sterling & Silver
                </h3>
                <span className="text-[0.625rem] font-mono text-veyra-faint uppercase">[ 02 ]</span>
              </div>
              <p className="text-xs tracking-[0.06em] text-veyra-muted uppercase mt-6 leading-relaxed">
                Oxidized metals only — no plating, no compromise
              </p>
            </div>

            {/* Cell 3: Lifetime Guarantee */}
            <div className="p-8 sm:p-12 flex flex-col justify-between flex-1 bg-veyra-surface hover:bg-veyra-subtle/50 transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide">
                  Lifetime Guarantee
                </h3>
                <span className="text-[0.625rem] font-mono text-veyra-faint uppercase">[ 03 ]</span>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <p className="text-xs tracking-[0.06em] text-veyra-muted uppercase leading-relaxed">
                  We stand behind every piece we make, forever.
                </p>
                <span className="text-[0.625rem] tracking-[0.2em] font-mono text-veyra-brass uppercase pt-2">
                  Permanent Metallurgy Standard
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
