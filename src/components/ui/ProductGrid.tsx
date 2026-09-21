import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { Badge } from './badge'

type CategoryFilter = 'all' | 'signet' | 'band' | 'gemstone'

export const ProductGrid: React.FC = () => {
  const { setActiveModalProduct } = useCart()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, MaterialType>>(() => {
    const map: Record<string, MaterialType> = {}
    PRODUCTS.forEach(p => {
      map[p.id] = p.primaryMaterial
    })
    return map
  })

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS
    return PRODUCTS.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const categoryCounts = useMemo(() => ({
    all: PRODUCTS.length,
    signet: PRODUCTS.filter(p => p.category === 'signet').length,
    band: PRODUCTS.filter(p => p.category === 'band').length,
    gemstone: PRODUCTS.filter(p => p.category === 'gemstone').length
  }), [])

  const filterTabs: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: `ALL ARCHIVE (${categoryCounts.all})` },
    { id: 'signet', label: `SIGNET SEALS (${categoryCounts.signet})` },
    { id: 'band', label: `SOLID BANDS (${categoryCounts.band})` },
    { id: 'gemstone', label: `CABOCHON GEMS (${categoryCounts.gemstone})` }
  ]

  return (
    <section id="collection" className="relative w-full bg-veyra-bg text-veyra-text border-t border-veyra-border z-20">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface px-4 sm:px-6 md:px-12 py-8 sm:py-10 border-b border-veyra-border flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="mb-2">
            <Badge variant="hallmark">
              Archival Release · 01
            </Badge>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-veyra-text font-normal tracking-wide">
            The Permanent Collection
          </h2>
        </div>
        <p className="text-xs text-veyra-muted max-w-sm font-normal leading-relaxed">
          Each piece cast in solid metal, patinated with traditional alchemy, and individually finished by master artisans.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="max-w-7xl mx-auto border-x border-b border-veyra-border bg-veyra-surface/60 backdrop-blur-xs px-4 sm:px-6 md:px-12 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max">
          <span className="font-mono text-[0.625rem] text-veyra-muted uppercase tracking-[0.2em] mr-2 hidden sm:inline-block">
            FILTER:
          </span>
          {filterTabs.map(tab => {
            const isActive = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`font-mono text-[0.625rem] sm:text-[0.6875rem] tracking-[0.16em] uppercase px-3 py-1.5 transition-all duration-200 border ${
                  isActive
                    ? 'bg-veyra-text text-white border-veyra-text shadow-2xs'
                    : 'bg-veyra-surface text-veyra-muted border-veyra-border hover:border-veyra-text/40 hover:text-veyra-text'
                }`}
              >
                [ {tab.label} ]
              </button>
            )
          })}
        </div>
      </div>

      {/* 3-Column Architectural Hairline Grid */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3">
          <AnimatePresence>
            {filteredProducts.map((product, index) => {
              const currentMat = selectedMaterials[product.id] || product.primaryMaterial
              const isRightCol = (index + 1) % 3 === 0

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveModalProduct(product, currentMat)}
                  className={`relative group bg-veyra-surface hover:bg-veyra-subtle/40 transition-colors duration-400 cursor-pointer flex flex-col items-center justify-between p-6 sm:p-8 md:p-12 min-h-[25rem] sm:min-h-[30rem] border-b border-veyra-border ${
                    !isRightCol ? 'md:border-r border-veyra-border' : ''
                  }`}
                >
                {/* High-Resolution Editorial Product Photography */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden p-4 sm:p-6">
                  {/* Subtle 360 Inspection Hover Tag */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase bg-veyra-surface/95 backdrop-blur-xs border border-veyra-border px-2 py-1 text-veyra-text shadow-2xs rounded-xs">
                      [ 360° INSPECT ]
                    </span>
                  </div>

                  <img
                    src={product.image}
                    alt={`${product.name} — ${product.subtitle}`}
                    loading="eager"
                    className="w-full h-full object-contain filter contrast-[1.04] brightness-[0.99] group-hover:scale-105 transition-transform duration-600 ease-out"
                  />
                  {/* Subtle gallery contact shadow */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-3 bg-black/4 blur-md rounded-full pointer-events-none" />
                </div>

                {/* Ring Metadata (Matching Video: Name & Price centered below) */}
                <div className="text-center w-full pt-3 sm:pt-4">
                  <h3 className="font-editorial text-lg sm:text-xl md:text-2xl text-veyra-text font-normal tracking-wide group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-[0.625rem] sm:text-[0.6875rem] tracking-[0.2em] font-mono text-veyra-muted mt-1.5 sm:mt-2 uppercase">
                    ${product.price} USD
                  </div>

                  {/* Material Dots (Subtle) */}
                  <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    {product.availableMaterials.map((mat) => {
                      const isChosen = currentMat === mat
                      return (
                        <button
                          key={mat}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMaterials(prev => ({ ...prev, [product.id]: mat }))
                          }}
                          className={`w-2.5 h-2.5 rounded-full transition-transform ${
                            isChosen ? 'scale-125 ring-1 ring-veyra-text' : 'opacity-40 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: MATERIAL_CONFIG[mat].accentColor }}
                          title={MATERIAL_CONFIG[mat].name}
                        />
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
