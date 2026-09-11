import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { PRODUCTS, Product, MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { FloatingGalleryRing } from '../3d/FloatingGalleryRing'
import { StudioLighting } from '../3d/StudioLighting'
import { useCart } from '../../context/CartContext'
import { Eye, Plus, Check } from 'lucide-react'

export const ProductGrid: React.FC = () => {
  const { setActiveModalProduct, addToCart } = useCart()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, MaterialType>>(() => {
    const map: Record<string, MaterialType> = {}
    PRODUCTS.forEach(p => {
      map[p.id] = p.primaryMaterial
    })
    return map
  })
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null)

  const handleMaterialSelect = (productId: string, mat: MaterialType, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedMaterials(prev => ({ ...prev, [productId]: mat }))
  }

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    const chosenMat = selectedMaterials[product.id] || product.primaryMaterial
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)] || 9
    addToCart(product, chosenMat, defaultSize)

    setAddedItemNotice(product.id)
    setTimeout(() => setAddedItemNotice(null), 2200)
  }

  return (
    <section id="collection" className="relative w-full py-28 md:py-40 bg-[#0c0c0f] text-[#faf9f6]">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1a1a24]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 border-b border-white/[0.08] pb-10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#c9a767] block mb-3 font-medium">
              Curated Permanent Vault
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] font-light text-[#faf9f6]">
              THE ARCHIVE
            </h2>
          </div>
          <p className="font-editorial text-lg md:text-xl text-[#94928e] italic max-w-md mt-6 md:mt-0 tracking-[0.05em]">
            Cast in solitary weight. Each artifact is individually numbered, hand-patinated, and warranted for generations.
          </p>
        </div>

        {/* 3D Interactive Jewellery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PRODUCTS.map((product, index) => {
            const currentMat = selectedMaterials[product.id] || product.primaryMaterial
            const isHovered = hoveredId === product.id

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.0, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveModalProduct(product)}
                className="group relative luxury-card rounded-sm overflow-hidden flex flex-col cursor-pointer transition-all duration-700"
              >
                {/* 3D Floating Ring Viewport */}
                <div className="relative w-full h-80 sm:h-96 bg-gradient-to-b from-[#141418] to-[#0d0d10] flex items-center justify-center overflow-hidden">
                  <Canvas
                    camera={{ position: [0, 0.4, 3.4], fov: 42 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                  >
                    <Suspense fallback={null}>
                      <StudioLighting
                        interactive={false}
                        intensity={1.1}
                        shadowOpacity={0.4}
                      />
                      <FloatingGalleryRing
                        modelType={product.modelType}
                        materialType={currentMat}
                        isHovered={isHovered}
                        floatOffset={index * 0.8}
                      />
                    </Suspense>
                  </Canvas>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#73726f] bg-black/40 px-2.5 py-1 backdrop-blur-md rounded-full border border-white/5">
                      {product.weight}
                    </span>
                    {product.featured && (
                      <span className="text-[9px] tracking-[0.22em] uppercase text-[#c9a767] bg-[#c9a767]/10 px-2.5 py-1 backdrop-blur-md rounded-full border border-[#c9a767]/20">
                        Pillar
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] tracking-[0.2em] uppercase text-[#e0dfdc] transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <Eye className="w-3 h-3 text-[#c9a767]" />
                    <span>360° Studio View</span>
                  </div>
                </div>

                {/* Card Information & Material Switcher */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow border-t border-white/[0.06] bg-[#0f0f13]">
                  <div>
                    {/* Material Color Dots */}
                    <div className="flex items-center gap-2.5 mb-4">
                      {product.availableMaterials.map((mat) => {
                        const isChosen = currentMat === mat
                        const config = MATERIAL_CONFIG[mat]
                        return (
                          <button
                            key={mat}
                            onClick={(e) => handleMaterialSelect(product.id, mat, e)}
                            title={config.name}
                            className={`w-3.5 h-3.5 rounded-full transition-transform duration-300 ${
                              isChosen ? 'scale-125 ring-2 ring-white/60 ring-offset-2 ring-offset-[#0f0f13]' : 'opacity-60 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: config.accentColor }}
                          />
                        )
                      })}
                      <span className="text-[10px] tracking-[0.15em] text-[#71706e] ml-2 font-mono">
                        {MATERIAL_CONFIG[currentMat].name.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="font-display text-lg tracking-[0.16em] text-[#faf9f6] group-hover:text-[#c9a767] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8c8b87] tracking-[0.08em] mt-1.5 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="font-display text-base tracking-[0.14em] text-[#faf9f6]">
                      ${product.price} <span className="text-[10px] text-[#71706e]">USD</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="px-3.5 py-2 rounded-sm border border-white/15 text-[10px] tracking-[0.2em] uppercase text-[#e0deda] hover:border-white hover:bg-white hover:text-[#0a0a0c] transition-all duration-300 flex items-center gap-1.5"
                        aria-label="Add to Bag"
                      >
                        {addedItemNotice === product.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Bag</span>
                          </>
                        )}
                      </button>
                    </div>
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
