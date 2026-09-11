import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Hammer, Flame, Award } from 'lucide-react'

export const EditorialSection: React.FC = () => {
  return (
    <div className="relative bg-[#09090b] text-[#faf9f6] overflow-hidden">
      {/* 1. Manifesto / Made Without Compromise Section */}
      <section id="editorial" className="py-28 md:py-44 border-t border-white/[0.06] relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a767] block mb-4">
              Manifesto
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.16em] font-light leading-tight">
              MADE WITHOUT COMPROMISE
            </h2>
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#d0cec9] italic mt-8 leading-relaxed font-light">
              "We reject the hollow, plated, mass-produced jewellery of the modern era. VEYRA exists for those who demand permanent weight and quiet authority."
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 md:mt-28">
            {[
              {
                icon: Hammer,
                title: 'SOLID NON-HOLLOW CASTING',
                desc: 'Every ring is poured in massive solid metal. When you set a VEYRA piece onto a table, it lands with an unmistakable, resonant thud.'
              },
              {
                icon: Flame,
                title: 'PERMANENT METALLURGY',
                desc: 'No micron plating. No synthetic varnish. We rely exclusively on ancient thermal blackening, liver of sulfur patinas, and natural oxidation.'
              },
              {
                icon: Award,
                title: 'LIFETIME GUARANTEE',
                desc: 'Forged to endure decades of direct skin contact, seawater, and physical friction. Should a piece ever compromise structurally, we recast it gratis.'
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-sm hover:border-white/20 transition-all duration-500"
              >
                <pillar.icon className="w-6 h-6 text-[#c9a767] mb-6 stroke-[1.5]" />
                <h3 className="font-display text-sm tracking-[0.2em] text-[#faf9f6] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#8c8a86] tracking-[0.05em] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Metallurgy Showcase (Deep Texture Exploration) */}
      <section id="metallurgy" className="py-24 md:py-36 bg-[#070709] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual Mosaic from Reference Assets */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-sm overflow-hidden border border-white/10 bg-[#121216]">
                  <img
                    src="/images/rtzOI.jpg"
                    alt="Macro relief texture"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-sm overflow-hidden border border-white/10 bg-[#121216]">
                  <img
                    src="/images/S2JNA.jpg"
                    alt="Bronze ring on slate"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-sm overflow-hidden border border-white/10 bg-[#121216]">
                  <img
                    src="/images/c1Qnj.jpg"
                    alt="Stacked raw brass bands"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-sm overflow-hidden border border-white/10 bg-[#121216]">
                  <img
                    src="/images/uQViM.jpg"
                    alt="VEYRA engraved signet"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Metallurgy Copy */}
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#c9a767] block mb-3">
                The Raw Elements
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.16em] font-light text-[#faf9f6]">
                METALS THAT REMEMBER
              </h2>
              <p className="font-editorial text-lg text-[#b8b6b2] italic mt-6 leading-relaxed">
                We believe a jewel must change as you live. Our metals are unlacquered and unshielded by artificial polymers.
              </p>

              <div className="mt-10 space-y-6">
                <div className="border-l-2 border-[#8d9297] pl-6 py-1">
                  <h4 className="font-display text-sm tracking-[0.18em] text-[#faf9f6]">
                    OXIDISED 925 SILVER
                  </h4>
                  <p className="text-xs text-[#8c8a86] tracking-[0.05em] mt-1.5 leading-relaxed">
                    Cold-bathed in elemental sulfur. The deep recessed grooves stay pitch black, while high-contact facets buff to a bright white specular glow with daily friction.
                  </p>
                </div>

                <div className="border-l-2 border-[#8c725c] pl-6 py-1">
                  <h4 className="font-display text-sm tracking-[0.18em] text-[#faf9f6]">
                    THERMALLY BLACKENED BRONZE
                  </h4>
                  <p className="text-xs text-[#8c8a86] tracking-[0.05em] mt-1.5 leading-relaxed">
                    Silicon bronze heated until its surface converts into a resilient charcoal oxide. Warm copper tones slowly emerge along beveled edges over months of contact.
                  </p>
                </div>

                <div className="border-l-2 border-[#c9a767] pl-6 py-1">
                  <h4 className="font-display text-sm tracking-[0.18em] text-[#faf9f6]">
                    UNLACQUERED RAW BRASS
                  </h4>
                  <p className="text-xs text-[#8c8a86] tracking-[0.05em] mt-1.5 leading-relaxed">
                    Satin finished with zero synthetic sealants. It reacts directly to humidity and natural oils, forging a living, golden-brown heirloom signature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
