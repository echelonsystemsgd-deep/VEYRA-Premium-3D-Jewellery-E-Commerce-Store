import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Package, FileCheck2, ArrowRight } from 'lucide-react'
import { Badge } from './badge'
import { Button } from './button'
import { useCart } from '../../context/CartContext'

export const ProvenanceSection: React.FC = () => {
  const { openPrivateViewing } = useCart()

  const scrollToCollection = () => {
    const el = document.getElementById('collection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const PILLARS = [
    {
      num: '[ 01 ]',
      title: 'Milled Slate & Oak Box',
      subtitle: 'Heavyweight Stone & Solid Wood',
      image: '/images/7OQGa.jpg',
      icon: Package,
      description:
        'Precision-milled from raw British slate and sustainably harvested oiled English oak. Features an internal recessed velvet ring cradle and silent magnetic closure.',
      specs: 'Mass: 420g Solid Weight · 100% Non-Synthetic · Permanent Vault Storage'
    },
    {
      num: '[ 02 ]',
      title: 'Wax-Sealed Dossier',
      subtitle: 'Archival Silversmith Provenance',
      image: '/images/rtzOI.jpg',
      icon: FileCheck2,
      description:
        'An individual parchment record specifying virgin metal ingot batch, casting date, exact gram mass, and the silversmith’s hallmark signature, sealed with natural beeswax.',
      specs: 'Individually Numbered · Silversmith Signature · Lifetime Traceability'
    },
    {
      num: '[ 03 ]',
      title: 'Assay Hallmarking Standard',
      subtitle: 'British Standard 925 Specification',
      image: '/images/a95lc.jpg',
      icon: ShieldCheck,
      description:
        'Engineered for indelible assay hallmarking. Conforms to chemical purity standards, 925 sterling silver fineness, and authentic non-plated solid construction.',
      specs: 'Assay Office Compatible · British Standard 925 · Metallurgy Verification'
    }
  ]

  return (
    <section id="provenance" className="relative w-full bg-veyra-bg text-veyra-text border-t border-veyra-border z-20">
      
      {/* Section Macro Header */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface px-4 sm:px-6 md:px-12 py-8 sm:py-12 border-b border-veyra-border flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="mb-2">
            <Badge variant="hallmark">
              Archival Provenance · Standard 01
            </Badge>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-5xl text-veyra-text font-normal tracking-wide leading-tight">
            The Unboxing &amp; Provenance
          </h2>
        </div>
        <p className="text-xs text-veyra-muted max-w-md font-normal leading-relaxed">
          In luxury metallurgy, how a piece arrives matters as much as how it is worn. Every VEYRA artifact is accompanied by permanent heirloom packaging.
        </p>
      </div>

      {/* 3-Column Architectural Hairline Grid */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            const isRightCol = (idx + 1) % 3 === 0

            return (
              <div
                key={pillar.num}
                className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 border-b border-veyra-border hover:bg-veyra-subtle/40 transition-colors ${
                  !isRightCol ? 'md:border-r border-veyra-border' : ''
                }`}
              >
                <div>
                  {/* Pillar Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-veyra-border font-mono text-[0.625rem] text-veyra-brass tracking-[0.2em] uppercase">
                    <span>{pillar.num}</span>
                    <Icon className="w-4 h-4 text-veyra-muted" />
                  </div>

                  {/* Thumbnail Visual */}
                  <div className="relative w-full h-44 sm:h-52 my-5 rounded-xs overflow-hidden border border-veyra-border bg-veyra-bg">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98] hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 font-mono text-[0.5rem] tracking-[0.18em] uppercase text-white bg-black/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      Atelier Protocol
                    </span>
                  </div>

                  {/* Text Content */}
                  <h3 className="font-editorial text-xl sm:text-2xl text-veyra-text font-normal tracking-wide">
                    {pillar.title}
                  </h3>
                  <div className="text-[0.625rem] tracking-[0.16em] uppercase font-mono text-veyra-muted mt-1">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-veyra-muted mt-3 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="mt-6 pt-4 border-t border-veyra-border font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-veyra-faint leading-tight">
                  {pillar.specs}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Dispatch Reassurance Bar */}
      <div className="max-w-7xl mx-auto border-x border-b border-veyra-border bg-veyra-subtle/60 px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-veyra-muted">
          <ShieldCheck className="w-4 h-4 text-veyra-brass shrink-0" />
          <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-veyra-text">
            Complimentary Insured Courier Transit Included with Every Cast Commission
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToCollection}
            className="text-[0.625rem] h-8"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => openPrivateViewing()}
            className="text-[0.625rem] h-8"
          >
            <span>Request Viewing</span>
          </Button>
        </div>
      </div>

    </section>
  )
}
