import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { MATERIAL_CONFIG } from '../../data/products'
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart
  } = useCart()

  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const handleSimulatedCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setCheckoutSuccess(true)
      clearCart()
    }, 1800)
  }

  const handleClose = () => {
    setIsCartOpen(false)
    setTimeout(() => setCheckoutSuccess(false), 400)
  }

  if (!isCartOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#0d0d10] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div>
                <h3 className="font-display text-lg tracking-[0.2em] text-[#faf9f6]">
                  YOUR BAG
                </h3>
                <span className="text-[10px] tracking-[0.2em] text-[#787775] uppercase">
                  Insured Discreet Dispatch
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-white/5 text-[#8a8884] hover:text-white transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {checkoutSuccess ? (
              <div className="my-auto text-center py-12 px-4">
                <CheckCircle2 className="w-12 h-12 text-[#c9a767] mx-auto mb-4 stroke-[1.5]" />
                <h4 className="font-display text-xl tracking-[0.16em] text-[#faf9f6]">
                  ACQUISITION CONFIRMED
                </h4>
                <p className="text-xs text-[#9c9b98] tracking-[0.06em] mt-3 leading-relaxed">
                  Your piece has entered our London silversmith workshop queue. A bespoke provenance dossier will accompany the shipment.
                </p>
                <div className="mt-8">
                  <button
                    onClick={handleClose}
                    className="btn-luxury-solid w-full"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="my-auto text-center py-16">
                <p className="font-editorial text-xl italic text-[#787775] tracking-[0.08em]">
                  Your bag is empty.
                </p>
                <p className="text-xs text-[#52514e] tracking-[0.12em] mt-2">
                  Explore our permanent archival pieces.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 btn-luxury-outline text-[11px]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {cart.map((item, index) => {
                  const mat = MATERIAL_CONFIG[item.material]
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-sm bg-white/[0.02] border border-white/[0.05]"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-[#15151a] rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover grayscale contrast-125"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h5 className="font-display text-xs tracking-[0.14em] text-[#faf9f6]">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-[#696865] hover:text-red-400 transition-colors p-1"
                              aria-label="Remove Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] tracking-[0.12em] text-[#918f8b] mt-1">
                            <span>Size US {item.size}</span>
                            <span className="mx-1.5">·</span>
                            <span>{mat.name.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                          <div className="flex items-center border border-white/10 rounded-sm">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-[#8c8a86] hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono text-[#faf9f6]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-[#8c8a86] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-display text-xs tracking-[0.12em] text-[#faf9f6]">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Footer Summary */}
            {!checkoutSuccess && cart.length > 0 && (
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8c8a86] tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-[#faf9f6] font-display">${cartSubtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-[#8c8a86] tracking-wider">
                    <span>Express Insured Transit</span>
                    <span className="text-[#c9a767] uppercase text-[10px] tracking-widest">Complimentary</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex justify-between items-baseline">
                  <span className="font-display text-sm tracking-[0.2em] text-[#faf9f6] uppercase">
                    Total
                  </span>
                  <span className="font-display text-2xl tracking-[0.1em] text-[#faf9f6]">
                    ${cartSubtotal} <span className="text-xs text-[#73726f]">USD</span>
                  </span>
                </div>

                <button
                  onClick={handleSimulatedCheckout}
                  disabled={isCheckingOut}
                  className="btn-luxury-solid w-full mt-2"
                >
                  {isCheckingOut ? (
                    <span>Securing Allocation...</span>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#61605e]">
                  <ShieldCheck className="w-3 h-3 text-[#c9a767]" />
                  <span>256-Bit Encryption · Archival Packaging Included</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
