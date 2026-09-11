import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const EditorialSection: React.FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="editorial" className="relative bg-transparent text-[#121214] border-t border-[#e5e5e7] overflow-hidden">
      {/* Container with matching architectural grid borders */}
      <div className="max-w-7xl mx-auto border-x border-[#e5e5e7] bg-[#f6f6f8]/80 backdrop-blur-sm relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Manifesto & Philosophy (Matching 00:07 in video) */}
          <div className="lg:col-span-7 p-10 sm:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#e5e5e7] flex flex-col justify-between">
            <div>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.02em] text-[#121214] leading-[0.95] mb-12">
                Made Without<br />Compromise
              </h2>

              <div className="space-y-6 text-sm text-[#4d4d52] leading-relaxed max-w-xl font-normal">
                <p>
                  Each ring is forged by a single pair of hands — no factory floor, no assembly line. The material is chosen first, the form follows its nature.
                </p>
                <p>
                  We work in oxidized silver, blackened bronze, and raw brass. Weights are deliberate. Edges are left where they fall. Nothing is smoothed for comfort.
                </p>
                <p className="text-[#121214] font-medium">
                  VEYRA exists for those who wear jewelry that means something. Not decoration — declaration. One piece at a time, made to last a lifetime.
                </p>
              </div>
            </div>

            {/* "VIEW COLLECTION ➔" */}
            <div className="pt-16">
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-[#121214] font-medium"
              >
                <span>View Collection</span>
                <div className="w-9 h-9 rounded-full border border-black/20 group-hover:border-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Specification Cells (Matching 00:07 in video) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Cell 1: Deliberate Weight */}
            <div className="p-10 sm:p-14 border-b border-[#e5e5e7] flex flex-col justify-between flex-1 hover:bg-white transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#121214] font-normal tracking-wide">
                  Deliberate Weight
                </h3>
                <span className="text-[10px] font-mono text-[#88888c] uppercase">[ 01 ]</span>
              </div>
              <p className="text-xs tracking-[0.06em] text-[#55555a] uppercase mt-6 leading-relaxed">
                Each ring is a physical presence you feel
              </p>
            </div>

            {/* Cell 2: Sterling & Silver */}
            <div className="p-10 sm:p-14 border-b border-[#e5e5e7] flex flex-col justify-between flex-1 hover:bg-white transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#121214] font-normal tracking-wide">
                  Sterling & Silver
                </h3>
                <span className="text-[10px] font-mono text-[#88888c] uppercase">[ 02 ]</span>
              </div>
              <p className="text-xs tracking-[0.06em] text-[#55555a] uppercase mt-6 leading-relaxed">
                Oxidized metals only — no plating, no compromise
              </p>
            </div>

            {/* Cell 3: Lifetime Guarantee */}
            <div className="p-10 sm:p-14 flex flex-col justify-between flex-1 hover:bg-white transition-colors">
              <div className="flex justify-between items-baseline">
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#121214] font-normal tracking-wide">
                  Lifetime Guarantee
                </h3>
                <span className="text-[10px] font-mono text-[#88888c] uppercase">[ 03 ]</span>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <p className="text-xs tracking-[0.06em] text-[#55555a] uppercase leading-relaxed">
                  We stand behind every piece we make, forever.
                </p>
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#99999f] uppercase pt-2">
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
