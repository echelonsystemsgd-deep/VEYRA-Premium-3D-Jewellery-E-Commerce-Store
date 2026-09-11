import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductDetailViewer } from '../3d/ProductDetailViewer'
import { useCart } from '../../context/CartContext'
import { MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { X, Shield, Sparkles, Truck, Check, RefreshCw } from 'lucide-react'

export const ProductModal: React.FC = () => {
  const { activeModalProduct, setActiveModalProduct, addToCart, openPrivateViewing } = useCart()

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('oxidised-silver')
  const [selectedSize, setSelectedSize] = useState<number>(9)
  const [isAdded, setIsAdded] = useState(false)

  // Sync state when product opens
  useEffect(() => {
    if (activeModalProduct) {
      setSelectedMaterial(activeModalProduct.primaryMaterial)
      setSelectedSize(activeModalProduct.sizes[Math.floor(activeModalProduct.sizes.length / 2)] || 9)
      setIsAdded(false)
    }
  }, [activeModalProduct])

  if (!activeModalProduct) return null

  const handleAddToCart = () => {
    addToCart(activeModalProduct, selectedMaterial, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2600)
  }

  const matConfig = MATERIAL_CONFIG[selectedMaterial]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setActiveModalProduct(null)}
          className="fixed inset-0 bg-[#060608]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl bg-[#0e0e12] border border-white/10 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col lg:flex-row min-h-[640px] max-h-[95vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalProduct(null)}
            className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/40 hover:bg-white/10 text-[#a5a4a0] hover:text-white transition-all duration-300"
            aria-label="Close Inspection"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: 360° Studio Canvas */}
          <div className="relative w-full lg:w-3/5 h-[380px] lg:h-auto bg-gradient-to-br from-[#15151a] via-[#0d0d10] to-[#070709] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex items-center justify-center overflow-hidden">
            <ProductDetailViewer
              modelType={activeModalProduct.modelType}
              materialType={selectedMaterial}
            />

            {/* Subtle floating badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#7a7875] bg-black/40 px-3 py-1.5 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
              <RefreshCw className="w-3 h-3 text-[#c9a767] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Interactive 3D Turntable</span>
            </div>
          </div>

          {/* Right Column: Luxury Product Spec & Actions */}
          <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Collection Hierarchy */}
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a767] mb-2">
                <span>The Permanent Series</span>
                <span>·</span>
                <span>{activeModalProduct.weight}</span>
              </div>

              <h2 className="font-display text-2xl lg:text-3xl tracking-[0.16em] text-[#faf9f6]">
                {activeModalProduct.name}
              </h2>
              <p className="text-xs text-[#9c9b98] tracking-[0.06em] mt-2 leading-relaxed">
                {activeModalProduct.subtitle}
              </p>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-white/[0.08] flex items-baseline gap-3">
                <span className="font-display text-3xl tracking-[0.12em] text-[#faf9f6]">
                  ${activeModalProduct.price}
                </span>
                <span className="text-[11px] tracking-[0.2em] text-[#71706e] uppercase">
                  USD · Free Global Courier Delivery
                </span>
              </div>

              {/* Material Switcher */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase mb-3">
                  <span className="text-[#a5a4a0]">Material</span>
                  <span className="text-[#faf9f6] font-medium">{matConfig.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {activeModalProduct.availableMaterials.map((mat) => {
                    const isSelected = selectedMaterial === mat
                    const itemConfig = MATERIAL_CONFIG[mat]
                    return (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`p-3 text-left rounded-sm border transition-all duration-300 flex flex-col gap-1.5 ${
                          isSelected
                            ? 'border-[#faf9f6] bg-white/[0.06]'
                            : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: itemConfig.accentColor }}
                        />
                        <span className="text-[10px] tracking-[0.14em] uppercase text-[#faf9f6] font-medium truncate">
                          {itemConfig.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11px] text-[#7d7c79] mt-3 leading-relaxed">
                  {matConfig.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase mb-3">
                  <span className="text-[#a5a4a0]">Select US Size</span>
                  <span className="text-[#7d7c79] text-[10px]">Comfort Fit Standard</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeModalProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-11 h-11 flex items-center justify-center text-xs tracking-wider border rounded-sm transition-all duration-300 ${
                          isSelected
                            ? 'border-[#faf9f6] bg-[#faf9f6] text-[#0a0a0c] font-semibold'
                            : 'border-white/[0.08] text-[#a5a4a0] hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Craftsmanship Features */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-2.5">
                {activeModalProduct.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#9c9b98] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-[#c9a767] mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-luxury-solid w-full"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${activeModalProduct.price}</span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveModalProduct(null)
                  openPrivateViewing(activeModalProduct)
                }}
                className="btn-luxury-outline w-full text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c9a767]" />
                <span>Request Private Viewing Appointment</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-[10px] tracking-[0.2em] uppercase text-[#61605e] pt-3">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#c9a767]" />
                  Lifetime Warranty
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3 h-3" />
                  Insured Transit
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
