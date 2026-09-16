import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductDetailViewer } from '../3d/ProductDetailViewer'
import { useCart } from '../../context/CartContext'
import { MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { X, Shield, Sparkles, Truck, Check, RefreshCw } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'

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
          className="relative w-full max-w-5xl bg-veyra-surface border border-veyra-border shadow-2xl rounded-sm overflow-hidden z-10 flex flex-col lg:flex-row min-h-[600px] max-h-[92vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalProduct(null)}
            className="absolute top-6 right-6 z-30 p-2 rounded-full hover:bg-black/5 text-veyra-muted hover:text-veyra-text transition-all duration-300"
            aria-label="Close Inspection"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: 360° Studio Canvas */}
          <div className="relative w-full lg:w-3/5 h-[360px] lg:h-auto bg-gradient-to-b from-veyra-bg to-veyra-subtle border-b lg:border-b-0 lg:border-r border-veyra-border flex items-center justify-center overflow-hidden">
            <ProductDetailViewer
              modelType={activeModalProduct.modelType}
              materialType={selectedMaterial}
            />

            {/* Architectural Mode Indicator */}
            <div className="absolute top-6 left-6 font-mono text-[0.625rem] tracking-[0.25em] uppercase text-veyra-muted pointer-events-none">
              [ 360° SILHOUETTE VIEW ]
            </div>
          </div>

          {/* Right Column: Spec & Selection */}
          <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-veyra-surface">
            <div>
              <div className="flex items-center gap-2 text-[0.625rem] tracking-[0.3em] uppercase text-veyra-brass mb-2 font-medium">
                <span>The Permanent Vault</span>
                <span>·</span>
                <span>{activeModalProduct.weight}</span>
              </div>

              <h2 className="font-editorial text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide">
                {activeModalProduct.name}
              </h2>
              <p className="text-xs text-veyra-muted tracking-[0.04em] mt-2 leading-relaxed">
                {activeModalProduct.subtitle}
              </p>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-veyra-border flex items-baseline gap-3">
                <span className="font-editorial text-3xl text-veyra-text">
                  ${activeModalProduct.price}
                </span>
                <span className="text-[0.625rem] tracking-[0.2em] font-mono text-veyra-faint uppercase">
                  USD · Insured Courier Delivery
                </span>
              </div>

              {/* Material Switcher */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[0.6875rem] tracking-[0.2em] uppercase mb-3">
                  <span className="text-veyra-muted">Material</span>
                  <span className="text-veyra-text font-medium">{matConfig.name}</span>
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
                            ? 'border-veyra-text bg-black/[0.04]'
                            : 'border-veyra-border hover:border-veyra-text/40'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: itemConfig.accentColor }}
                        />
                        <span className="text-[0.625rem] tracking-[0.14em] uppercase text-veyra-text font-medium truncate">
                          {itemConfig.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[0.6875rem] text-veyra-muted mt-2.5 leading-relaxed">
                  {matConfig.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[0.6875rem] tracking-[0.2em] uppercase mb-2.5">
                  <span className="text-veyra-muted">Select US Size</span>
                  <span className="text-veyra-faint text-[0.625rem]">Standard Comfort Bore</span>
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
                            ? 'border-veyra-text bg-veyra-text text-white font-medium'
                            : 'border-veyra-border text-veyra-muted hover:border-veyra-text/50 hover:text-veyra-text'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Craftsmanship Features */}
              <div className="mt-6 pt-5 border-t border-veyra-border space-y-2">
                {activeModalProduct.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-veyra-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-veyra-brass mt-1.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-veyra-border flex flex-col gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag · ${activeModalProduct.price} USD</span>
                )}
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  setActiveModalProduct(null)
                  openPrivateViewing(activeModalProduct)
                }}
                className="w-full text-[0.625rem]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2 text-veyra-brass" />
                <span>Request Private Viewing Appointment</span>
              </Button>

              <div className="flex items-center justify-center gap-5 text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-faint pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-veyra-brass" />
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
