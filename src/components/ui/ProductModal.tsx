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
    setTimeout(() => setIsAdded(false), 2400)
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
          transition={{ duration: 0.4 }}
          onClick={() => setActiveModalProduct(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Gallery Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#ffffff] border border-[#e5e5e7] shadow-2xl rounded-sm overflow-hidden z-10 flex flex-col lg:flex-row min-h-[600px] max-h-[92vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalProduct(null)}
            className="absolute top-6 right-6 z-30 p-2 rounded-full hover:bg-black/5 text-[#666] hover:text-black transition-all duration-300"
            aria-label="Close Inspection"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: 360° Studio Canvas */}
          <div className="relative w-full lg:w-3/5 h-[360px] lg:h-auto bg-gradient-to-b from-[#f8f8fa] to-[#efeff2] border-b lg:border-b-0 lg:border-r border-[#e5e5e7] flex items-center justify-center overflow-hidden">
            <ProductDetailViewer
              modelType={activeModalProduct.modelType}
              materialType={selectedMaterial}
            />

            {/* Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-[#777] bg-white/70 px-3 py-1.5 backdrop-blur-md rounded-full border border-black/5 pointer-events-none">
              <RefreshCw className="w-3 h-3 text-[#967538] animate-spin" style={{ animationDuration: '9s' }} />
              <span>Interactive 360° Studio</span>
            </div>
          </div>

          {/* Right Column: Spec & Selection */}
          <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-white">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#967538] mb-2 font-medium">
                <span>The Permanent Vault</span>
                <span>·</span>
                <span>{activeModalProduct.weight}</span>
              </div>

              <h2 className="font-editorial text-3xl lg:text-4xl text-[#121214] font-normal tracking-wide">
                {activeModalProduct.name}
              </h2>
              <p className="text-xs text-[#6e6e72] tracking-[0.04em] mt-2 leading-relaxed">
                {activeModalProduct.subtitle}
              </p>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-[#e5e5e7] flex items-baseline gap-3">
                <span className="font-editorial text-3xl text-[#121214]">
                  ${activeModalProduct.price}
                </span>
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#777] uppercase">
                  USD · Insured Courier Delivery
                </span>
              </div>

              {/* Material Switcher */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase mb-3">
                  <span className="text-[#666]">Material</span>
                  <span className="text-[#121214] font-medium">{matConfig.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {activeModalProduct.availableMaterials.map((mat) => {
                    const isSelected = selectedMaterial === mat
                    const itemConfig = MATERIAL_CONFIG[mat]
                    return (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`p-2.5 text-left rounded-sm border transition-all duration-300 flex flex-col gap-1.5 ${
                          isSelected
                            ? 'border-black bg-black/[0.04]'
                            : 'border-[#e5e5e7] hover:border-black/30'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: itemConfig.accentColor }}
                        />
                        <span className="text-[9px] tracking-[0.14em] uppercase text-[#121214] font-medium truncate">
                          {itemConfig.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11px] text-[#66666a] mt-2.5 leading-relaxed">
                  {matConfig.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase mb-2.5">
                  <span className="text-[#666]">Select US Size</span>
                  <span className="text-[#888] text-[10px]">Standard Comfort Bore</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeModalProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 flex items-center justify-center text-xs tracking-wider border rounded-sm transition-all ${
                          isSelected
                            ? 'border-black bg-black text-white font-medium'
                            : 'border-[#e5e5e7] text-[#555] hover:border-black/50 hover:text-black'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Craftsmanship Features */}
              <div className="mt-6 pt-5 border-t border-[#e5e5e7] space-y-2">
                {activeModalProduct.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#5e5e63] leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-[#967538] mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-[#e5e5e7] flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-gallery-primary w-full"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${activeModalProduct.price} USD</span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveModalProduct(null)
                  openPrivateViewing(activeModalProduct)
                }}
                className="btn-gallery-outline w-full text-[10px]"
              >
                <Sparkles className="w-3 h-3 text-[#967538]" />
                <span>Request Private Viewing Appointment</span>
              </button>

              <div className="flex items-center justify-center gap-5 text-[9px] tracking-[0.2em] uppercase text-[#888] pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#967538]" />
                  Lifetime Warranty
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
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
