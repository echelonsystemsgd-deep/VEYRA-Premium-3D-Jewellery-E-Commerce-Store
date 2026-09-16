import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS, MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { useCart } from '../../context/CartContext'

export const ProductGrid: React.FC = () => {
  const { setActiveModalProduct } = useCart()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, MaterialType>>(() => {
    const map: Record<string, MaterialType> = {}
    PRODUCTS.forEach(p => {
      map[p.id] = p.primaryMaterial
    })
    return map
  })

  return (
    <section id="collection" className="relative w-full bg-veyra-bg text-veyra-text border-t border-veyra-border">
      {/* 3-Column Architectural Hairline Grid (Exact Layout from Reference Video) */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {PRODUCTS.map((product, index) => {
            const currentMat = selectedMaterials[product.id] || product.primaryMaterial
            const isHovered = hoveredId === product.id

            // Determine border classes for clean 3-col architectural grid lines
            const isRightCol = (index + 1) % 3 === 0

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveModalProduct(product)}
                className={`relative group bg-veyra-bg hover:bg-veyra-surface transition-colors duration-500 cursor-pointer flex flex-col items-center justify-between p-8 sm:p-12 min-h-[30rem] border-b border-veyra-border ${
                  !isRightCol ? 'md:border-r border-veyra-border' : ''
                }`}
              >
                {/* High-Resolution Editorial Product Photography */}
                <div className="relative w-full h-72 sm:h-80 flex items-center justify-center overflow-hidden p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain filter contrast-[1.04] brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle gallery contact shadow */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/5 blur-md rounded-full pointer-events-none" />
                </div>

                {/* Ring Metadata (Matching Video: Name & Price centered below) */}
                <div className="text-center w-full pt-4">
                  <h3 className="font-editorial text-xl sm:text-2xl text-veyra-text font-normal tracking-wide group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-[0.6875rem] tracking-[0.2em] font-mono text-veyra-muted mt-2 uppercase">
                    ${product.price} USD
                  </div>

                  {/* Material Dots (Subtle) */}
                  <div className="flex items-center justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        </div>
      </div>
    </section>
  )
}
