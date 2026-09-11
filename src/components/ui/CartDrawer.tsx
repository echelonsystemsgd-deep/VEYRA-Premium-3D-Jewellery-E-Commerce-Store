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
    }, 1600)
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
          className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#ffffff] border-l border-[#e5e5e7] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e5e5e7]">
              <div>
                <h3 className="font-editorial text-2xl text-[#121214] font-normal tracking-wide">
                  YOUR BAG
                </h3>
                <span className="text-[10px] tracking-[0.2em] text-[#777] uppercase font-mono">
                  Insured Discreet Courier Dispatch
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-black/5 text-[#777] hover:text-black transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {checkoutSuccess ? (
              <div className="my-auto text-center py-12 px-4">
                <CheckCircle2 className="w-12 h-12 text-[#967538] mx-auto mb-4 stroke-[1.5]" />
                <h4 className="font-editorial text-3xl text-[#121214] tracking-wide">
                  ACQUISITION CONFIRMED
                </h4>
                <p className="text-xs text-[#666] tracking-[0.04em] mt-3 leading-relaxed">
                  Your piece has entered our London silversmith workshop queue. A bespoke provenance dossier and solid wooden vault box will accompany the shipment.
                </p>
                <div className="mt-8">
                  <button
                    onClick={handleClose}
                    className="btn-gallery-primary w-full"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="my-auto text-center py-16">
                <p className="font-editorial text-2xl italic text-[#888] tracking-wide">
                  Your bag is empty.
                </p>
                <p className="text-xs text-[#666] tracking-[0.1em] mt-2 uppercase font-mono">
                  Explore our permanent archival pieces.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 btn-gallery-outline text-[11px]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.map((item, index) => {
                  const mat = MATERIAL_CONFIG[item.material]
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-sm bg-[#fafafa] border border-[#e5e5e7]"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-white rounded-sm overflow-hidden flex-shrink-0 border border-[#e5e5e7] flex items-center justify-center">
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
                            <h5 className="font-editorial text-lg text-[#121214] font-normal leading-tight">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-[#999] hover:text-red-500 transition-colors p-1"
                              aria-label="Remove Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] tracking-[0.1em] text-[#666] mt-1 font-mono">
                            <span>US {item.size}</span>
                            <span className="mx-1.5">·</span>
                            <span>{mat.name.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e5e5e7]">
                          <div className="flex items-center border border-[#e5e5e7] rounded-sm bg-white">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-[#777] hover:text-black"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono text-[#121214]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-[#777] hover:text-black"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-editorial text-base text-[#121214]">
                            ${item.product.price * item.quantity} USD
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
              <div className="pt-6 border-t border-[#e5e5e7] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#666] tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-[#121214] font-editorial text-base">${cartSubtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-[#666] tracking-wider">
                    <span>Express Courier Transit</span>
                    <span className="text-[#967538] uppercase text-[10px] tracking-widest font-mono">Complimentary</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e5e5e7] flex justify-between items-baseline">
                  <span className="text-xs tracking-[0.2em] text-[#121214] uppercase font-mono">
                    Total
                  </span>
                  <span className="font-editorial text-3xl text-[#121214]">
                    ${cartSubtotal} <span className="text-xs text-[#888] font-mono">USD</span>
                  </span>
                </div>

                <button
                  onClick={handleSimulatedCheckout}
                  disabled={isCheckingOut}
                  className="btn-gallery-primary w-full mt-2"
                >
                  {isCheckingOut ? (
                    <span>Securing Cast Allocation...</span>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[#888]">
                  <ShieldCheck className="w-3 h-3 text-[#967538]" />
                  <span>256-Bit SSL · Wooden Vault Box Included</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
