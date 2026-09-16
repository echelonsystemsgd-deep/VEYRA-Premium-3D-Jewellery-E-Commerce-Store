import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const EditorialSection: React.FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="editorial" className="relative bg-veyra-bg text-veyra-text border-t border-veyra-border overflow-hidden">
      {/* Container with matching architectural grid borders */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-bg relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Manifesto & Philosophy (Matching 00:07 in video) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-veyra-border flex flex-col justify-between bg-veyra-surface">
            <div>
              <span className="text-[0.625rem] tracking-[0.28em] font-mono text-veyra-brass uppercase block mb-3">
                Atelier Manifesto · 2026
              </span>
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
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-veyra-text font-medium"
              >
                <span>View Collection</span>
                <div className="w-9 h-9 rounded-full border border-veyra-border group-hover:border-veyra-text flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 bg-veyra-surface shadow-xs">
                  <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Specification Cells (Matching 00:07 in video) */}
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
                  Est. VEYRA Studio 2018
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
