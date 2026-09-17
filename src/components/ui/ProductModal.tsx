import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductDetailViewer } from '../3d/ProductDetailViewer'
import { useCart } from '../../context/CartContext'
import { MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { X, Shield, Sparkles, Truck, Check, Camera, Box, HelpCircle } from 'lucide-react'
import { Button } from './button'

type ViewMode = 'photo' | '3d' | 'model'

export const ProductModal: React.FC = () => {
  const {
    activeModalProduct,
    activeModalInitialMaterial,
    setActiveModalProduct,
    addToCart,
    openPrivateViewing,
    setIsSizingOpen
  } = useCart()

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('oxidised-silver')
  const [selectedSize, setSelectedSize] = useState<number>(9)
  const [isAdded, setIsAdded] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('photo')
  const [isHoverZoom, setIsHoverZoom] = useState(false)

  useEffect(() => {
    if (activeModalProduct) {
      setSelectedMaterial(activeModalInitialMaterial || activeModalProduct.primaryMaterial)
      setSelectedSize(activeModalProduct.sizes[Math.floor(activeModalProduct.sizes.length / 2)] || 9)
      setIsAdded(false)
      setViewMode('photo')
    }
  }, [activeModalProduct, activeModalInitialMaterial])

  if (!activeModalProduct) return null

  const handleAddToCart = () => {
    addToCart(activeModalProduct, selectedMaterial, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2400)
  }

  const matConfig = MATERIAL_CONFIG[selectedMaterial]

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setActiveModalProduct(null)}
          className="fixed inset-0 bg-black/45 backdrop-blur-md"
        />

        {/* Gallery Modal Window — Side-by-Side from md (768px) upwards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-veyra-surface border border-veyra-border shadow-2xl rounded-xs z-10 flex flex-col md:flex-row h-[92vh] md:h-[620px] lg:h-[680px] max-h-[92vh] overflow-hidden select-none"
          data-lenis-prevent="true"
        >
          {/* Dedicated Close Button — High Z-Index, Isolated from Badges */}
          <button
            onClick={() => setActiveModalProduct(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 p-2 rounded-full bg-veyra-surface/95 hover:bg-veyra-text hover:text-white text-veyra-text border border-veyra-border shadow-xs transition-colors cursor-pointer"
            aria-label="Close Inspection"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left Column: Authentic Photography & 360° Studio Showcase */}
          <div className="relative w-full md:w-1/2 lg:w-[55%] h-[40vh] md:h-full shrink-0 bg-gradient-to-b from-veyra-bg via-veyra-subtle/40 to-veyra-bg border-b md:border-b-0 md:border-r border-veyra-border flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
            
            {/* Top View Mode Switcher */}
            <div className="flex items-center justify-between z-20">
              <div className="inline-flex rounded-xs bg-veyra-surface/95 backdrop-blur-xs border border-veyra-border p-0.5 sm:p-1 gap-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[0.5625rem] sm:text-[0.625rem] font-mono tracking-[0.14em] uppercase transition-all rounded-xs cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-veyra-text text-white shadow-2xs font-semibold'
                      : 'text-veyra-muted hover:text-veyra-text'
                  }`}
                >
                  <Camera className="w-3 h-3" />
                  <span>Atelier Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[0.5625rem] sm:text-[0.625rem] font-mono tracking-[0.14em] uppercase transition-all rounded-xs cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-veyra-text text-white shadow-2xs font-semibold'
                      : 'text-veyra-muted hover:text-veyra-text'
                  }`}
                >
                  <Box className="w-3 h-3 text-veyra-brass" />
                  <span>360° 3D Studio</span>
                </button>
              </div>

              <div className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-muted hidden sm:block">
                {viewMode === '3d' ? '3D PBR Shaders' : '1:1 Macro Relief'}
              </div>
            </div>

            {/* Central Media Canvas */}
            <div className="relative flex-1 flex items-center justify-center my-auto min-h-0 overflow-hidden">
              {viewMode === 'photo' ? (
                /* Authentic High-Resolution Jewellery Photography */
                <div
                  className="relative w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden group"
                  onMouseEnter={() => setIsHoverZoom(true)}
                  onMouseLeave={() => setIsHoverZoom(false)}
                >
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className={`max-w-[90%] max-h-[90%] object-contain filter contrast-[1.03] drop-shadow-md transition-transform duration-700 ease-out ${
                      isHoverZoom ? 'scale-115' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Contact Shadow */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-3 bg-black/5 blur-md rounded-full pointer-events-none" />
                </div>
              ) : viewMode === 'model' ? (
                /* Editorial Hand Context */
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/hero-model-hand.jpg"
                    alt="Jewellery worn on hand"
                    className="w-full h-full object-cover rounded-xs filter contrast-[1.02] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 text-[0.5rem] sm:text-[0.5625rem] font-mono tracking-widest text-white uppercase bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                    Atelier Hand Fit Specimen
                  </span>
                </div>
              ) : (
                /* Interactive 360° WebGL Three.js Canvas */
                <div className="w-full h-full flex items-center justify-center">
                  <ProductDetailViewer
                    modelType={activeModalProduct.modelType}
                    materialType={selectedMaterial}
                  />
                </div>
              )}
            </div>

            {/* Bottom Gallery Controls & Thumbnail Rail */}
            <div className="flex items-center justify-between pt-2 border-t border-veyra-border/60 z-20 shrink-0">
              {/* Thumbnail Quick Selector */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xs border overflow-hidden p-0.5 bg-veyra-surface transition-all cursor-pointer ${
                    viewMode === 'photo'
                      ? 'border-veyra-text ring-1 ring-veyra-text shadow-2xs'
                      : 'border-veyra-border hover:border-veyra-text/40'
                  }`}
                  title="Studio Portrait"
                >
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-contain"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('model')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xs border overflow-hidden p-0.5 bg-veyra-surface transition-all cursor-pointer ${
                    viewMode === 'model'
                      ? 'border-veyra-text ring-1 ring-veyra-text shadow-2xs'
                      : 'border-veyra-border hover:border-veyra-text/40'
                  }`}
                  title="Hand Fit Context"
                >
                  <img
                    src="/images/hero-model-hand.jpg"
                    alt="Model Context"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xs border flex flex-col items-center justify-center bg-veyra-surface transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'border-veyra-text ring-1 ring-veyra-text bg-veyra-subtle shadow-2xs'
                      : 'border-veyra-border hover:border-veyra-text/40'
                  }`}
                  title="360° 3D Silhouette"
                >
                  <Box className="w-3 h-3 text-veyra-brass" />
                  <span className="text-[0.375rem] tracking-wider uppercase font-mono mt-0.5 text-veyra-text">360°</span>
                </button>
              </div>

              {/* Mode Micro Cue */}
              <div className="font-mono text-[0.5rem] sm:text-[0.5625rem] tracking-[0.16em] uppercase text-veyra-muted text-right truncate">
                {viewMode === 'photo' ? (
                  <span>Hover to zoom macro</span>
                ) : viewMode === '3d' ? (
                  <span>Drag to rotate 360°</span>
                ) : (
                  <span>Natural light fit</span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Spec, Customizer & Fixed Actions with Dedicated Scroll Container */}
          <div
            className="w-full md:w-1/2 lg:w-[45%] h-[52vh] md:h-full flex flex-col justify-between overflow-y-auto p-4 sm:p-6 lg:p-8 bg-veyra-surface overscroll-contain select-text"
            data-lenis-prevent="true"
          >
            <div className="space-y-4">
              {/* Vault Label */}
              <div className="flex items-center gap-2 text-[0.5625rem] sm:text-[0.625rem] tracking-[0.25em] uppercase text-veyra-brass font-mono font-medium">
                <span>The Permanent Vault</span>
                <span>·</span>
                <span>{activeModalProduct.weight}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide leading-tight">
                  {activeModalProduct.name}
                </h2>
                <p className="text-xs text-veyra-muted tracking-[0.02em] mt-1.5 leading-relaxed font-normal">
                  {activeModalProduct.subtitle}
                </p>
              </div>

              {/* Price & Shipping */}
              <div className="pb-3.5 border-b border-veyra-border flex items-baseline gap-3">
                <span className="font-editorial text-2xl sm:text-3xl text-veyra-text font-medium">
                  ${activeModalProduct.price}
                </span>
                <span className="text-[0.5625rem] sm:text-[0.625rem] tracking-[0.18em] font-mono text-veyra-faint uppercase">
                  USD · Insured Courier Delivery
                </span>
              </div>

              {/* Alloy Switcher */}
              <div>
                <div className="flex items-center justify-between text-[0.625rem] sm:text-[0.6875rem] tracking-[0.18em] uppercase mb-2 font-mono">
                  <span className="text-veyra-muted">Alloy</span>
                  <span className="text-veyra-text font-medium">{matConfig.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {activeModalProduct.availableMaterials.map((mat) => {
                    const isSelected = selectedMaterial === mat
                    const itemConfig = MATERIAL_CONFIG[mat]
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={`p-2 sm:p-2.5 text-left rounded-xs border transition-all duration-200 flex flex-col gap-1 cursor-pointer ${
                          isSelected
                            ? 'border-veyra-text bg-veyra-subtle ring-1 ring-veyra-text shadow-2xs'
                            : 'border-veyra-border hover:border-veyra-text/40 bg-veyra-surface'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 border border-black/10"
                          style={{ backgroundColor: itemConfig.accentColor }}
                        />
                        <span className="text-[0.5625rem] sm:text-[0.625rem] tracking-[0.1em] uppercase text-veyra-text font-medium truncate font-mono">
                          {itemConfig.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[0.625rem] sm:text-[0.6875rem] text-veyra-muted mt-1.5 leading-relaxed">
                  {matConfig.description}
                </p>
              </div>

              {/* Size Selector + Interactive Sizing Guide Button */}
              <div>
                <div className="flex items-center justify-between text-[0.625rem] sm:text-[0.6875rem] tracking-[0.18em] uppercase mb-2 font-mono">
                  <span className="text-veyra-muted">Select US Size</span>
                  <button
                    type="button"
                    onClick={() => setIsSizingOpen(true)}
                    className="flex items-center gap-1 text-[0.5625rem] sm:text-[0.625rem] text-veyra-brass hover:text-veyra-text underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Sizing Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {activeModalProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs tracking-wider border rounded-xs transition-all cursor-pointer font-mono ${
                          isSelected
                            ? 'border-veyra-text bg-veyra-text text-white font-medium shadow-2xs'
                            : 'border-veyra-border text-veyra-muted hover:border-veyra-text/50 hover:text-veyra-text bg-veyra-surface'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Craftsmanship Features */}
              <div className="pt-2.5 border-t border-veyra-border space-y-1">
                {activeModalProduct.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[0.6875rem] sm:text-xs text-veyra-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-veyra-brass mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="mt-5 pt-4 border-t border-veyra-border flex flex-col gap-2 shrink-0">
              <Button
                variant="default"
                size="default"
                onClick={handleAddToCart}
                className="w-full h-11 text-xs"
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
                className="w-full text-[0.5625rem] sm:text-[0.625rem] h-9"
              >
                <Sparkles className="w-3 h-3 mr-1.5 text-veyra-brass" />
                <span>Request Private Viewing Appointment</span>
              </Button>

              <div className="flex items-center justify-center gap-4 text-[0.5rem] sm:text-[0.5625rem] tracking-[0.16em] uppercase text-veyra-faint pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-veyra-brass" />
                  Lifetime Guarantee
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-2.5 h-2.5" />
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
