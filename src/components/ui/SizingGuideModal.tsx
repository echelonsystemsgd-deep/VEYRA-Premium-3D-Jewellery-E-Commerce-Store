import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { X, Sparkles, Ruler, CheckCircle } from 'lucide-react'
import { Button } from './button'

interface SizeRow {
  us: number
  uk: string
  eu: number
  diameterMm: number
  circumferenceMm: number
}

const SIZE_CHART: SizeRow[] = [
  { us: 6, uk: 'L ½', eu: 52, diameterMm: 16.5, circumferenceMm: 51.9 },
  { us: 7, uk: 'N ½', eu: 54, diameterMm: 17.3, circumferenceMm: 54.4 },
  { us: 8, uk: 'P ½', eu: 57, diameterMm: 18.1, circumferenceMm: 57.0 },
  { us: 9, uk: 'R ½', eu: 59, diameterMm: 19.0, circumferenceMm: 59.5 },
  { us: 10, uk: 'T ½', eu: 62, diameterMm: 19.8, circumferenceMm: 62.1 },
  { us: 11, uk: 'V ½', eu: 65, diameterMm: 20.6, circumferenceMm: 64.6 },
  { us: 12, uk: 'X ½', eu: 67, diameterMm: 21.4, circumferenceMm: 67.2 },
  { us: 13, uk: 'Z ½', eu: 70, diameterMm: 22.2, circumferenceMm: 69.7 },
]

export const SizingGuideModal: React.FC = () => {
  const { isSizingOpen, setIsSizingOpen } = useCart()

  if (!isSizingOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizingOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Modal Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-veyra-surface border border-veyra-border p-6 sm:p-10 shadow-2xl rounded-xs z-10 text-veyra-text max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setIsSizingOpen(false)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 text-veyra-muted hover:text-veyra-text transition-colors p-2"
            aria-label="Close Sizing Dossier"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 text-[0.625rem] tracking-[0.3em] uppercase text-veyra-brass mb-2 font-mono">
            <Ruler className="w-3.5 h-3.5" />
            <span>Atelier Measurement Standard</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-4xl text-veyra-text font-normal tracking-wide">
            Ring Sizing Dossier
          </h3>
          <p className="text-xs text-veyra-muted tracking-[0.03em] mt-2 leading-relaxed">
            All VEYRA rings are cast with substantial non-hollow weight and an internal parabolic comfort bore, ensuring silky contact against the skin without pinching.
          </p>

          {/* Sizing Table */}
          <div className="mt-6 border border-veyra-border rounded-xs overflow-hidden bg-veyra-bg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-veyra-border bg-veyra-subtle/80 text-[0.625rem] tracking-[0.16em] uppercase text-veyra-muted">
                    <th className="py-2.5 px-3 sm:px-4 font-semibold text-veyra-text">US</th>
                    <th className="py-2.5 px-3 sm:px-4 font-semibold">UK / AU</th>
                    <th className="py-2.5 px-3 sm:px-4 font-semibold">EU</th>
                    <th className="py-2.5 px-3 sm:px-4 font-semibold">Diameter (mm)</th>
                    <th className="py-2.5 px-3 sm:px-4 font-semibold">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-veyra-border/60">
                  {SIZE_CHART.map((row) => (
                    <tr
                      key={row.us}
                      className="hover:bg-veyra-surface transition-colors text-veyra-text text-[0.6875rem]"
                    >
                      <td className="py-2 px-3 sm:px-4 font-medium text-veyra-brass">Size {row.us}</td>
                      <td className="py-2 px-3 sm:px-4 text-veyra-muted">{row.uk}</td>
                      <td className="py-2 px-3 sm:px-4 text-veyra-muted">{row.eu}</td>
                      <td className="py-2 px-3 sm:px-4 text-veyra-muted">{row.diameterMm.toFixed(1)} mm</td>
                      <td className="py-2 px-3 sm:px-4 text-veyra-muted">{row.circumferenceMm.toFixed(1)} mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Notes */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-veyra-muted">
            <div className="p-3.5 rounded-xs bg-veyra-subtle/50 border border-veyra-border space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-veyra-text text-[0.6875rem] uppercase tracking-wider font-mono">
                <CheckCircle className="w-3 h-3 text-veyra-brass" />
                <span>Wide Band Advisory</span>
              </div>
              <p className="text-[0.6875rem] leading-relaxed">
                For rings wider than 5mm (such as The Sovereign Band or Triptych Bands), we recommend sizing up a half size for effortless daily movement.
              </p>
            </div>

            <div className="p-3.5 rounded-xs bg-veyra-subtle/50 border border-veyra-border space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-veyra-text text-[0.6875rem] uppercase tracking-wider font-mono">
                <Sparkles className="w-3 h-3 text-veyra-brass" />
                <span>Complimentary Resizing</span>
              </div>
              <p className="text-[0.6875rem] leading-relaxed">
                Every solid 925 silver or bronze casting includes complimentary one-time resizing within 60 days of insured courier receipt.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-veyra-border flex justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsSizingOpen(false)}
            >
              Return to Inspection
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
