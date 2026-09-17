import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, Minus } from 'lucide-react'
import { Badge } from './badge'
import { useCart } from '../../context/CartContext'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

const FAQS: FaqItem[] = [
  {
    id: 'patina',
    category: 'METALLURGY',
    question: 'How does unplated metallurgy evolve and patina over time?',
    answer:
      'VEYRA jewelry is forged from solid, virgin ingots with zero artificial surface plating or synthetic sealants. Our solid 925 silver is patinated with elemental sulfur baths: the micro-crevices retain deep dark shadows while exterior contact facets naturally buff to a bright, silky gleam through friction and skin touch. Silicon bronze develops warm burnt-copper highlights, and raw unlacquered brass oxidizes into an antique honey-brown tone that permanently records the life of the wearer.'
  },
  {
    id: 'sizing',
    category: 'CLIENT CARE',
    question: 'What if my ring does not fit comfortably upon delivery?',
    answer:
      'Every VEYRA piece includes complimentary one-time resizing within 60 days of insured courier delivery. Because each ring features an internal parabolic comfort bore, minor adjustments can be made without compromising structural integrity. If you are unsure of your size, consult our Ring Sizing Dossier or contact our concierge for a physical sizer.'
  },
  {
    id: 'shipping',
    category: 'TRANSIT',
    question: 'How is high-value insured courier transit dispatched?',
    answer:
      'All orders are dispatched via fully insured, signature-required courier services (Royal Mail Special Delivery / FedEx Express Priority). To ensure complete discretion, external parcel packaging is entirely unmarked with no indication of jewelry or atelier contents. A private tracking cipher is emailed to you upon workshop dispatch.'
  },
  {
    id: 'mass',
    category: 'CRAFTSMANSHIP',
    question: 'Are VEYRA rings cast solid or hollowed out for weight reduction?',
    answer:
      'Every ring is 100% solid cast metal with intentional physical weight (ranging from 21.5g to 38.5g per artifact). We never hollow bands, core out backplates, or electroplate base metals. The substantial mass is a core tenet of our design philosophy: jewelry should possess a deliberate, grounding physical presence.'
  },
  {
    id: 'bespoke',
    category: 'SALON',
    question: 'Can bespoke family crests or monograms be hand-carved into signet seals?',
    answer:
      'Yes. Our London workshop specializes in deep-relief intaglio seal engraving for wax seals and personal heraldry. Bespoke commissions begin with a consultation in our Private Salon (Mayfair London, Tribeca New York, or Virtual 3D) where silversmiths develop 1:1 wax prototypes for your approval.'
  }
]

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('patina')
  const { setIsSizingOpen, openPrivateViewing } = useCart()

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="care" className="relative w-full bg-veyra-bg text-veyra-text border-t border-veyra-border z-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface px-4 sm:px-6 md:px-12 py-8 sm:py-12 border-b border-veyra-border flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="mb-2">
            <Badge variant="hallmark">
              <HelpCircle className="w-2.5 h-2.5 mr-1" />
              Atelier Protocol &amp; Care
            </Badge>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-5xl text-veyra-text font-normal tracking-wide leading-tight">
            Client Care &amp; Inquiries
          </h2>
        </div>
        <p className="text-xs text-veyra-muted max-w-md font-normal leading-relaxed">
          Detailed guidance regarding our non-hollow casting standards, patina behavior, international courier insurance, and bespoke commissions.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-7xl mx-auto border-x border-veyra-border bg-veyra-surface divide-y divide-veyra-border">
        {FAQS.map((faq, idx) => {
          const isOpen = openId === faq.id

          return (
            <div
              key={faq.id}
              className="transition-colors hover:bg-veyra-subtle/30"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 focus:outline-none cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="font-mono text-[0.5625rem] tracking-[0.2em] text-veyra-brass uppercase">
                    [ 0{idx + 1} ] · {faq.category}
                  </div>
                  <h3 className="font-editorial text-lg sm:text-2xl text-veyra-text font-normal tracking-wide leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div className="w-7 h-7 rounded-xs border border-veyra-border flex items-center justify-center shrink-0 mt-1 bg-veyra-surface text-veyra-text transition-transform duration-300">
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 text-veyra-brass" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-veyra-muted" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-0 max-w-3xl">
                      <p className="text-xs sm:text-sm text-veyra-muted leading-relaxed font-normal">
                        {faq.answer}
                      </p>

                      {faq.id === 'sizing' && (
                        <button
                          type="button"
                          onClick={() => setIsSizingOpen(true)}
                          className="mt-3 font-mono text-[0.625rem] tracking-[0.16em] uppercase text-veyra-brass hover:text-veyra-text underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          View Full Ring Sizing Dossier ➔
                        </button>
                      )}

                      {faq.id === 'bespoke' && (
                        <button
                          type="button"
                          onClick={() => openPrivateViewing()}
                          className="mt-3 font-mono text-[0.625rem] tracking-[0.16em] uppercase text-veyra-brass hover:text-veyra-text underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          Request Private Salon Appointment ➔
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

    </section>
  )
}
