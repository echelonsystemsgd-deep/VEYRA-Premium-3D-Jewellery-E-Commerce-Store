import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, ArrowUpRight, CheckCircle2, Mail, ExternalLink } from 'lucide-react'
import { Button } from './button'

export const AgencyPitchPill: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <>
      {/* Floating Bottom-Left Luxury Pill */}
      <div className="fixed bottom-4 left-4 z-40 select-none">
        <div className="inline-flex items-center gap-2 p-1.5 pr-2.5 rounded-xs bg-veyra-surface/95 backdrop-blur-md border border-veyra-border shadow-lg text-[0.5625rem] sm:text-[0.625rem] font-mono tracking-[0.14em] uppercase text-veyra-text transition-all hover:border-veyra-brass">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 text-veyra-text hover:text-veyra-brass transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-veyra-brass animate-pulse" />
            <span className="font-semibold truncate">Prototype Concept · Mercian Wealth</span>
            <ArrowUpRight className="w-3 h-3 text-veyra-brass shrink-0" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-veyra-faint hover:text-veyra-text p-0.5 ml-1 transition-colors"
            title="Dismiss Badge"
            aria-label="Dismiss Badge"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Slide-over Consultation Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-veyra-surface border border-veyra-border p-6 sm:p-8 rounded-xs shadow-2xl z-10 text-veyra-text max-h-[90vh] overflow-y-auto"
              data-lenis-prevent="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-veyra-muted hover:text-veyra-text transition-colors rounded-full hover:bg-black/5"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Monogram / Header */}
              <div className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.25em] uppercase text-veyra-brass mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mercian Wealth · Digital Architecture</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-veyra-text font-normal tracking-wide">
                Bespoke E-Commerce Architecture
              </h3>

              <p className="text-xs text-veyra-muted mt-2 leading-relaxed">
                This website is a production-grade prototype demonstrating how high-ticket jewelry and luxury maisons can replace commoditized storefronts with tactile, high-converting digital flagships.
              </p>

              {/* Architectural Highlights */}
              <div className="mt-5 space-y-2.5 pt-4 border-t border-veyra-border">
                {[
                  '1:1 Tactile Canvas Hero scrub — 0ms video buffering',
                  'Real-Time WebGL 3D PBR Shaders for precious metals',
                  'Private Salon Concierge booking & International sizing conversion',
                  'Sub-second page loads optimized for high-net-worth clients'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[0.6875rem] text-veyra-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-veyra-brass mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-veyra-border flex flex-col gap-2.5">
                <a
                  href="mailto:concierge@mercianwealth.com?subject=Inquiry:%20Bespoke%20Luxury%20Store%20Architecture"
                  className="w-full"
                >
                  <Button variant="default" size="default" className="w-full text-xs">
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    <span>Initiate Strategy Audit</span>
                  </Button>
                </a>

                <a
                  href="https://mercianwealth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="default" className="w-full text-[0.625rem]">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-veyra-brass" />
                    <span>Visit Mercian Wealth ↗</span>
                  </Button>
                </a>
              </div>

              <div className="mt-4 text-center font-mono text-[0.5rem] tracking-[0.2em] text-veyra-faint uppercase">
                Designed &amp; Engineered for High-Ticket Luxury Brands
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
