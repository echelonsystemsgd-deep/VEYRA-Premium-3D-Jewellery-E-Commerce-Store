import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import { X, Sparkles, Calendar, CheckCircle2 } from 'lucide-react'
import { Button } from './button'

export const PrivateViewingModal: React.FC = () => {
  const {
    isPrivateViewingOpen,
    setIsPrivateViewingOpen,
    selectedPrivateViewingProduct
  } = useCart()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedPieceId, setSelectedPieceId] = useState<string>(
    selectedPrivateViewingProduct ? selectedPrivateViewingProduct.id : PRODUCTS[0].id
  )
  const [consultationType, setConsultationType] = useState<'virtual' | 'mayfair' | 'tribeca'>('virtual')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isPrivateViewingOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleClose = () => {
    setIsPrivateViewingOpen(false)
    setTimeout(() => {
      setSubmitted(false)
      setFullName('')
      setEmail('')
    }, 400)
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-veyra-surface border border-veyra-border p-8 sm:p-10 shadow-2xl rounded-sm z-10 text-veyra-text"
          data-lenis-prevent="true"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-veyra-muted hover:text-veyra-text transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-veyra-brass mx-auto mb-4" />
              <h3 className="font-editorial text-3xl text-veyra-text">
                CONSULTATION SECURED
              </h3>
              <p className="text-xs text-veyra-muted tracking-[0.04em] mt-3 leading-relaxed max-w-md mx-auto">
                Our Private Salon Concierge will contact you shortly to coordinate an exclusive examination of your selected piece with physical metallurgy samples.
              </p>
              <Button
                variant="default"
                size="lg"
                onClick={handleClose}
                className="mt-8"
              >
                Close Dossier
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-[0.625rem] tracking-[0.3em] uppercase text-veyra-brass mb-2 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Private Salon Appointment</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-veyra-text font-normal tracking-wide">
                Private Viewing
              </h3>
              <p className="text-xs text-veyra-muted tracking-[0.04em] mt-2">
                Request a dedicated examination session for high-ticket permanent commissions and bespoke signet seals.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="block text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-1 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lord / Lady / Collector"
                    className="w-full bg-veyra-bg border border-veyra-border px-4 py-2.5 text-xs text-veyra-text focus:border-veyra-text focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-1 font-mono">
                    Direct Email / Telephone
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="concierge@collector.com"
                    className="w-full bg-veyra-bg border border-veyra-border px-4 py-2.5 text-xs text-veyra-text focus:border-veyra-text focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-1 font-mono">
                    Piece for Inspection
                  </label>
                  <select
                    value={selectedPieceId}
                    onChange={(e) => setSelectedPieceId(e.target.value)}
                    className="w-full bg-veyra-bg border border-veyra-border px-4 py-2.5 text-xs text-veyra-text focus:border-veyra-text focus:outline-none rounded-sm"
                  >
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${p.price} USD
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[0.625rem] tracking-[0.2em] uppercase text-veyra-muted mb-1 font-mono">
                    Salon Location
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'virtual', label: 'Virtual 3D' },
                      { id: 'mayfair', label: 'London, Mayfair' },
                      { id: 'tribeca', label: 'New York, Tribeca' }
                    ].map((salon) => (
                      <button
                        type="button"
                        key={salon.id}
                        onClick={() => setConsultationType(salon.id as any)}
                        className={`py-2 px-1 text-center text-[0.625rem] tracking-[0.1em] uppercase border rounded-sm transition-all ${
                          consultationType === salon.id
                            ? 'border-veyra-text bg-veyra-text text-white'
                            : 'border-veyra-border text-veyra-muted hover:border-veyra-text/50'
                        }`}
                      >
                        {salon.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    {submitting ? (
                      <span>Dispatching Request...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        Confirm Private Viewing Request
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
