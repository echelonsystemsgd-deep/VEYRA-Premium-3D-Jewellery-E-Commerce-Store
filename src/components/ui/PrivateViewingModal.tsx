import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import { X, Sparkles, Calendar, CheckCircle2 } from 'lucide-react'

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
  const [consultationType, setConsultationType] = useState<'virtual' | 'mayfair' | 'manhattan'>('virtual')
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#050507]/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#0e0e12] border border-white/10 p-8 sm:p-10 shadow-2xl rounded-sm z-10"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-[#73726f] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-[#c9a767] mx-auto mb-4" />
              <h3 className="font-display text-2xl tracking-[0.16em] text-[#faf9f6]">
                CONSULTATION SECURED
              </h3>
              <p className="text-xs text-[#9c9b98] tracking-[0.06em] mt-3 leading-relaxed max-w-md mx-auto">
                Our Private Salon Concierge will contact you within 4 hours to arrange an exclusive examination of your selected piece with physical material samples.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 btn-luxury-solid"
              >
                Close Dossier
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a767] mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Private Viewing Appointment</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl tracking-[0.14em] text-[#faf9f6]">
                SALON APPOINTMENT
              </h3>
              <p className="text-xs text-[#8f8e8b] tracking-[0.06em] mt-2">
                Request a dedicated examination session for high-ticket permanent commissions and bespoke signet seals.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#969592] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lord / Lady / Collector"
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs tracking-wider text-[#faf9f6] focus:border-white/30 focus:outline-none rounded-sm placeholder-[#555]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#969592] mb-1.5">
                    Private Email / Direct Line
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="concierge@collector.com"
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-xs tracking-wider text-[#faf9f6] focus:border-white/30 focus:outline-none rounded-sm placeholder-[#555]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#969592] mb-1.5">
                    Piece for Inspection
                  </label>
                  <select
                    value={selectedPieceId}
                    onChange={(e) => setSelectedPieceId(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 px-4 py-3 text-xs tracking-wider text-[#faf9f6] focus:border-white/30 focus:outline-none rounded-sm"
                  >
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${p.price} USD
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#969592] mb-1.5">
                    Consultation Salon
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'virtual', label: 'Virtual 3D' },
                      { id: 'mayfair', label: 'London, Mayfair' },
                      { id: 'manhattan', label: 'New York, Tribeca' }
                    ].map((salon) => (
                      <button
                        type="button"
                        key={salon.id}
                        onClick={() => setConsultationType(salon.id as any)}
                        className={`py-2 px-2 text-center text-[10px] tracking-[0.12em] uppercase border rounded-sm transition-all ${
                          consultationType === salon.id
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 text-[#71706e] hover:border-white/20'
                        }`}
                      >
                        {salon.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-luxury-solid w-full"
                  >
                    {submitting ? (
                      <span>Dispatching Request...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        Confirm Private Viewing Request
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
