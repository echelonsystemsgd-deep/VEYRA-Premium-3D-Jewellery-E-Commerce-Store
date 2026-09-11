import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#f6f6f8] text-[#555] border-t border-[#e5e5e7] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-x border-[#e5e5e7]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#e5e5e7]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-3xl text-[#121214] block">
              VEYRA
            </span>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#777] font-mono">
              Forged in Silence · Permanent Metallurgy
            </p>
            <p className="text-xs text-[#666] leading-relaxed max-w-sm pt-2">
              Every ring is cast in solid metal, patinated with traditional alchemy, and individually finished by master artisans. Never plated. Never compromised.
            </p>

            {/* Hallmarks Micro Badge */}
            <div className="pt-4 flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[#777] font-mono">
              <span className="border border-[#e5e5e7] px-2 py-1 bg-white">925 SOLID</span>
              <span className="border border-[#e5e5e7] px-2 py-1 bg-white">SILICON BRONZE</span>
              <span className="border border-[#e5e5e7] px-2 py-1 bg-white">RAW BRASS</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h5 className="text-[11px] tracking-[0.2em] text-[#121214] uppercase mb-4 font-medium">
              The Archive
            </h5>
            <ul className="space-y-2.5 text-xs text-[#666] tracking-wider">
              <li><a href="#collection" className="hover:text-black transition-colors">Signet Series</a></li>
              <li><a href="#collection" className="hover:text-black transition-colors">Cabochon Stones</a></li>
              <li><a href="#collection" className="hover:text-black transition-colors">Interlocking Trios</a></li>
              <li><a href="#collection" className="hover:text-black transition-colors">Ceremonial Relics</a></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h5 className="text-[11px] tracking-[0.2em] text-[#121214] uppercase mb-4 font-medium">
              Atelier & Care
            </h5>
            <ul className="space-y-2.5 text-xs text-[#666] tracking-wider">
              <li><a href="#metallurgy" className="hover:text-black transition-colors">Metallurgy Guide</a></li>
              <li><a href="#editorial" className="hover:text-black transition-colors">Patina Evolution</a></li>
              <li><span className="hover:text-black cursor-pointer">Ring Sizing Dossier</span></li>
              <li><span className="hover:text-black cursor-pointer">Lifetime Guarantee</span></li>
            </ul>
          </div>

          {/* Newsletter / Private Ledger */}
          <div>
            <h5 className="text-[11px] tracking-[0.2em] text-[#121214] uppercase mb-4 font-medium">
              The Silent Ledger
            </h5>
            <p className="text-xs text-[#666] leading-relaxed mb-4">
              Receive private notices for numbered cast allocations and one-off salon releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collector@domain.com"
                  required
                  className="w-full bg-white border border-[#e5e5e7] px-3 py-2 text-xs text-[#121214] focus:border-black focus:outline-none rounded-sm placeholder-[#999]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-black text-white hover:bg-black/80 transition-colors rounded-sm flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] tracking-wider text-emerald-600 block mt-1">
                  Enrolled in the private ledger.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#888] gap-4 font-mono">
          <span>© {new Date().getFullYear()} VEYRA ATELIER LTD. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <span className="hover:text-black cursor-pointer">PRIVACY</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">TERMS</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">PROVENANCE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
