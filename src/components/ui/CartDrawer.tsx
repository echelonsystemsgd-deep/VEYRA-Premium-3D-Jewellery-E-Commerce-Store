import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { MATERIAL_CONFIG } from '../../data/products'
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from './button'

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
      <div
        className="fixed inset-0 z-50 overflow-hidden"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
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
            className="w-screen max-w-md bg-veyra-surface border-l border-veyra-border p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative z-10"
            data-lenis-prevent="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-veyra-border">
              <div>
                <h3 className="font-editorial text-2xl text-veyra-text font-normal tracking-wide">
                  YOUR BAG
                </h3>
                <span className="text-[0.625rem] tracking-[0.2em] text-veyra-muted uppercase font-mono">
                  Insured Discreet Courier Dispatch
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-black/5 text-veyra-muted hover:text-veyra-text transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {checkoutSuccess ? (
              <div className="my-auto text-center py-12 px-4">
                <CheckCircle2 className="w-12 h-12 text-veyra-brass mx-auto mb-4 stroke-[1.5]" />
                <h4 className="font-editorial text-3xl text-veyra-text tracking-wide">
                  ACQUISITION CONFIRMED
                </h4>
                <p className="text-xs text-veyra-muted tracking-[0.04em] mt-3 leading-relaxed">
                  Your piece has entered our London silversmith workshop queue. A bespoke provenance dossier and solid wooden vault box will accompany the shipment.
                </p>
                <div className="mt-8">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleClose}
                    className="w-full"
                  >
                    Return to Atelier
                  </Button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="my-auto text-center py-16">
                <p className="font-editorial text-2xl italic text-veyra-faint tracking-wide">
                  Your bag is empty.
                </p>
                <p className="text-xs text-veyra-muted tracking-[0.1em] mt-2 uppercase font-mono">
                  Explore our permanent archival pieces.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClose}
                  className="mt-6"
                >
                  Explore Collection
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.map((item, index) => {
                  const mat = MATERIAL_CONFIG[item.material]
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-sm bg-veyra-subtle/50 border border-veyra-border"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-veyra-surface rounded-sm overflow-hidden flex-shrink-0 border border-veyra-border flex items-center justify-center">
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
                            <h5 className="font-editorial text-lg text-veyra-text font-normal leading-tight">
                              {item.product.name}
                            </h5>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-veyra-faint hover:text-red-500 transition-colors p-1"
                              aria-label="Remove Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[0.625rem] tracking-[0.1em] text-veyra-muted mt-1 font-mono">
                            <span>US {item.size}</span>
                            <span className="mx-1.5">·</span>
                            <span>{mat.name.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-veyra-border">
                          <div className="flex items-center border border-veyra-border rounded-sm bg-veyra-surface">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-veyra-muted hover:text-veyra-text"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono text-veyra-text">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-veyra-muted hover:text-veyra-text"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-editorial text-base text-veyra-text">
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
              <div className="pt-6 border-t border-veyra-border space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-veyra-muted tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-veyra-text font-editorial text-base">${cartSubtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-veyra-muted tracking-wider">
                    <span>Express Courier Transit</span>
                    <span className="text-veyra-brass uppercase text-[0.625rem] tracking-widest font-mono">Complimentary</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-veyra-border flex justify-between items-baseline">
                  <span className="text-xs tracking-[0.2em] text-veyra-text uppercase font-mono">
                    Total
                  </span>
                  <span className="font-editorial text-3xl text-veyra-text">
                    ${cartSubtotal} <span className="text-xs text-veyra-faint font-mono">USD</span>
                  </span>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSimulatedCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-2"
                >
                  {isCheckingOut ? (
                    <span>Securing Cast Allocation...</span>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[0.5625rem] tracking-[0.2em] uppercase text-veyra-faint">
                  <ShieldCheck className="w-3 h-3 text-veyra-brass" />
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
