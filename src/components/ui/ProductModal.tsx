import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductDetailViewer } from '../3d/ProductDetailViewer'
import { useCart } from '../../context/CartContext'
import { MaterialType, MATERIAL_CONFIG } from '../../data/products'
import { X, Shield, Sparkles, Truck, Check, Camera, Box, HelpCircle } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'

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
      setViewMode('photo') // Default to the correct authentic jewellery photography
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 lg:p-12 overflow-y-auto">
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
          className="relative w-full max-w-5xl bg-veyra-surface border border-veyra-border shadow-2xl rounded-xs z-10 flex flex-col lg:flex-row min-h-0 max-h-[94dvh] overflow-y-auto lg:overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveModalProduct(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2 rounded-full hover:bg-black/5 text-veyra-muted hover:text-veyra-text transition-all duration-300 cursor-pointer"
            aria-label="Close Inspection"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Authentic Photography & 360° Studio Showcase */}
          <div className="relative w-full lg:w-3/5 h-[340px] sm:h-[420px] lg:h-auto shrink-0 bg-gradient-to-b from-veyra-bg to-veyra-subtle border-b lg:border-b-0 lg:border-r border-veyra-border flex flex-col justify-between overflow-hidden p-4 sm:p-6 select-none">
            
            {/* Top View Mode Switcher (Atelier Photography vs 360° Studio) */}
            <div className="flex items-center justify-between z-20">
              <div className="inline-flex rounded-xs bg-veyra-surface/90 backdrop-blur-xs border border-veyra-border p-1 gap-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] font-mono tracking-[0.14em] uppercase transition-all rounded-xs cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-veyra-text text-white shadow-2xs font-medium'
                      : 'text-veyra-muted hover:text-veyra-text'
                  }`}
                >
                  <Camera className="w-3 h-3" />
                  <span>Atelier Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] font-mono tracking-[0.14em] uppercase transition-all rounded-xs cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-veyra-text text-white shadow-2xs font-medium'
                      : 'text-veyra-muted hover:text-veyra-text'
                  }`}
                >
                  <Box className="w-3 h-3 text-veyra-brass" />
                  <span>360° 3D Studio</span>
                </button>
              </div>

              <Badge variant="hallmark" className="hidden sm:inline-flex text-[0.5625rem]">
                {viewMode === '3d' ? 'PBR Shader View' : 'Archival Macro 1:1'}
              </Badge>
            </div>

            {/* Central Media Canvas */}
            <div className="relative flex-1 flex items-center justify-center my-auto min-h-0">
              {viewMode === 'photo' ? (
                /* Authentic High-Resolution Jewellery Photography */
                <div
                  className="relative w-full h-full max-h-[22rem] sm:max-h-[26rem] flex items-center justify-center cursor-crosshair overflow-hidden group"
                  onMouseEnter={() => setIsHoverZoom(true)}
                  onMouseLeave={() => setIsHoverZoom(false)}
                >
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className={`max-w-[85%] max-h-[85%] object-contain filter contrast-[1.03] drop-shadow-xl transition-transform duration-700 ease-out ${
                      isHoverZoom ? 'scale-115' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Contact Shadow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-4 bg-black/6 blur-lg rounded-full pointer-events-none" />
                </div>
              ) : viewMode === 'model' ? (
                /* Editorial Hand Context */
                <div className="relative w-full h-full max-h-[22rem] sm:max-h-[26rem] flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/hero-model-hand.jpg"
                    alt="Jewellery worn on hand"
                    className="w-full h-full object-cover rounded-xs filter contrast-[1.02] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 text-[0.5625rem] font-mono tracking-widest text-white uppercase bg-black/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">
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
            <div className="flex items-center justify-between pt-2 border-t border-veyra-border/60 z-20">
              {/* Thumbnail Quick Selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xs border overflow-hidden p-0.5 bg-veyra-surface transition-all cursor-pointer ${
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
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xs border overflow-hidden p-0.5 bg-veyra-surface transition-all cursor-pointer ${
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
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xs border flex flex-col items-center justify-center bg-veyra-surface transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'border-veyra-text ring-1 ring-veyra-text bg-veyra-subtle shadow-2xs'
                      : 'border-veyra-border hover:border-veyra-text/40'
                  }`}
                  title="360° 3D Silhouette"
                >
                  <Box className="w-3.5 h-3.5 text-veyra-brass" />
                  <span className="text-[0.4375rem] tracking-wider uppercase font-mono mt-0.5 text-veyra-text">360°</span>
                </button>
              </div>

              {/* Mode Cue */}
              <div className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-muted text-right">
                {viewMode === 'photo' ? (
                  <span>Hover to inspect macro relief</span>
                ) : viewMode === '3d' ? (
                  <span>Drag to rotate · Scroll to zoom</span>
                ) : (
                  <span>Natural light scale</span>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Spec, Alloy Configurator & Actions */}
          <div className="w-full lg:w-2/5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-veyra-surface">
            <div>
              <div className="flex items-center gap-2 text-[0.625rem] tracking-[0.3em] uppercase text-veyra-brass mb-2 font-medium font-mono">
                <span>The Permanent Vault</span>
                <span>·</span>
                <span>{activeModalProduct.weight}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-veyra-text font-normal tracking-wide leading-tight">
                {activeModalProduct.name}
              </h2>
              <p className="text-xs text-veyra-muted tracking-[0.03em] mt-2 leading-relaxed font-normal">
                {activeModalProduct.subtitle}
              </p>

              {/* Price */}
              <div className="mt-5 pb-5 border-b border-veyra-border flex items-baseline gap-3">
                <span className="font-editorial text-3xl text-veyra-text">
                  ${activeModalProduct.price}
                </span>
                <span className="text-[0.625rem] tracking-[0.2em] font-mono text-veyra-faint uppercase">
                  USD · Insured Courier Delivery
                </span>
              </div>

              {/* Material Switcher */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[0.6875rem] tracking-[0.2em] uppercase mb-2.5 font-mono">
                  <span className="text-veyra-muted">Alloy</span>
                  <span className="text-veyra-text font-medium">{matConfig.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {activeModalProduct.availableMaterials.map((mat) => {
                    const isSelected = selectedMaterial === mat
                    const itemConfig = MATERIAL_CONFIG[mat]
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={`p-2.5 text-left rounded-xs border transition-all duration-300 flex flex-col gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'border-veyra-text bg-veyra-subtle/80 ring-1 ring-veyra-text'
                            : 'border-veyra-border hover:border-veyra-text/40 bg-veyra-surface'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                          style={{ backgroundColor: itemConfig.accentColor }}
                        />
                        <span className="text-[0.625rem] tracking-[0.12em] uppercase text-veyra-text font-medium truncate font-mono">
                          {itemConfig.name.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[0.6875rem] text-veyra-muted mt-2 leading-relaxed">
                  {matConfig.description}
                </p>
              </div>

              {/* Size Selector + Interactive Sizing Guide Button */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[0.6875rem] tracking-[0.2em] uppercase mb-2 font-mono">
                  <span className="text-veyra-muted">Select US Size</span>
                  <button
                    type="button"
                    onClick={() => setIsSizingOpen(true)}
                    className="flex items-center gap-1 text-[0.625rem] text-veyra-brass hover:text-veyra-text underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Sizing Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeModalProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs tracking-wider border rounded-xs transition-all cursor-pointer font-mono ${
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
              <div className="mt-5 pt-4 border-t border-veyra-border space-y-1.5">
                {activeModalProduct.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-veyra-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-veyra-brass mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-veyra-border flex flex-col gap-2.5">
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

              <div className="flex items-center justify-center gap-5 text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-faint pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-veyra-brass" />
                  Lifetime Guarantee
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
