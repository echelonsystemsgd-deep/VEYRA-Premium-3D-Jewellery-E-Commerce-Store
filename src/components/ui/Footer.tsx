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
    <footer className="bg-[#060608] text-[#8c8a86] border-t border-white/[0.08] pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl tracking-[0.3em] text-[#faf9f6] block">
              VEYRA
            </span>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#73726f]">
              Forged in Silence · Permanent Metallurgy
            </p>
            <p className="text-xs text-[#7d7b78] leading-relaxed max-w-sm pt-2">
              Every ring is cast in solid metal, patinated with traditional alchemy, and individually finished by master artisans. Never plated. Never compromised.
            </p>

            {/* Hallmarks Micro Badge */}
            <div className="pt-4 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#5a5957]">
              <span className="border border-white/10 px-2 py-1 rounded-sm">925 SOLID</span>
              <span className="border border-white/10 px-2 py-1 rounded-sm">SILICON BRONZE</span>
              <span className="border border-white/10 px-2 py-1 rounded-sm">RAW BRASS</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h5 className="font-display text-xs tracking-[0.22em] text-[#faf9f6] uppercase mb-4">
              The Archive
            </h5>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li><a href="#collection" className="hover:text-white transition-colors">Signet Series</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Cabochon Stones</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Interlocking Trios</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Ceremonial Relics</a></li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h5 className="font-display text-xs tracking-[0.22em] text-[#faf9f6] uppercase mb-4">
              Atelier & Care
            </h5>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li><a href="#metallurgy" className="hover:text-white transition-colors">Metallurgy Guide</a></li>
              <li><a href="#editorial" className="hover:text-white transition-colors">Patina Evolution</a></li>
              <li><span className="hover:text-white cursor-pointer">Ring Sizing Dossier</span></li>
              <li><span className="hover:text-white cursor-pointer">Lifetime Guarantee</span></li>
            </ul>
          </div>

          {/* Newsletter / Private Ledger */}
          <div>
            <h5 className="font-display text-xs tracking-[0.22em] text-[#faf9f6] uppercase mb-4">
              The Silent Ledger
            </h5>
            <p className="text-xs text-[#71706e] leading-relaxed mb-4">
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
                  className="w-full bg-white/[0.03] border border-white/10 px-3 py-2.5 text-xs tracking-wider text-white focus:border-white/30 focus:outline-none rounded-sm placeholder-[#4a4947]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-white/10 hover:bg-white text-white hover:text-black transition-colors rounded-sm flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] tracking-wider text-emerald-400 block mt-1">
                  Enrolled in the private ledger.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#545351] gap-4">
          <span>© {new Date().getFullYear()} VEYRA ATELIER LTD. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <span className="hover:text-[#888] cursor-pointer">PRIVACY</span>
            <span>·</span>
            <span className="hover:text-[#888] cursor-pointer">TERMS</span>
            <span>·</span>
            <span className="hover:text-[#888] cursor-pointer">SECURITY</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
