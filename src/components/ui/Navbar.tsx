import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, openPrivateViewing } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#f6f6f8]/90 backdrop-blur-md border-b border-[#e5e5e7] py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Identity & Emblem (matching the video's top-left circular logo) */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Custom geometric monogram emblem */}
          <div className="w-8 h-8 rounded-full border border-[#121214] flex items-center justify-center relative">
            <span className="font-editorial italic text-base text-[#121214] -mt-0.5">V</span>
            <div className="absolute inset-0 rounded-full border border-black/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-display text-lg tracking-[0.25em] text-[#121214] font-medium leading-none block">
              VEYRA
            </span>
            <span className="text-[7px] tracking-[0.3em] uppercase text-[#7a7a7e] block mt-0.5">
              Forged in Silence
            </span>
          </div>
        </div>

        {/* Center: Minimalist Link (Matching 'ABOUT' in the video) */}
        <div className="hidden md:flex items-center space-x-12 text-[11px] tracking-[0.22em] uppercase text-[#5e5e62]">
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-black transition-colors duration-300"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('editorial')}
            className="hover:text-black transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('metallurgy')}
            className="hover:text-black transition-colors duration-300"
          >
            Metallurgy
          </button>
        </div>

        {/* Right: [ BAG: 0 ] and ||| Menu (Matching video) */}
        <div className="flex items-center space-x-6 text-[11px] tracking-[0.2em] uppercase">
          {/* Bag button styled as [ BAG: X ] */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[#121214] hover:text-[#777] transition-colors duration-300 font-mono text-[11px]"
            aria-label="View Bag"
          >
            [ BAG: {cartCount} ]
          </button>

          {/* Architectural Menu Trigger: 3 vertical hairline bars ||| */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-[3px] p-1.5 hover:opacity-60 transition-opacity"
            aria-label="Menu"
          >
            <span className="w-[1.5px] h-4 bg-[#121214]" />
            <span className="w-[1.5px] h-4 bg-[#121214]" />
            <span className="w-[1.5px] h-4 bg-[#121214]" />
          </button>
        </div>
      </div>

      {/* Slide-down Minimal Menu */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-full bg-[#f6f6f8] border-b border-[#e5e5e7] py-8 px-6 flex flex-col items-center space-y-6 text-center text-xs tracking-[0.25em] uppercase text-[#444] shadow-lg">
          <button onClick={() => scrollTo('collection')} className="hover:text-black">
            The Archive
          </button>
          <button onClick={() => scrollTo('editorial')} className="hover:text-black">
            Made Without Compromise
          </button>
          <button onClick={() => scrollTo('metallurgy')} className="hover:text-black">
            Living Metallurgy
          </button>
          <button
            onClick={() => {
              setMenuOpen(false)
              openPrivateViewing()
            }}
            className="text-[#967538] font-medium pt-2"
          >
            Request Private Viewing
          </button>
        </div>
      )}
    </header>
  )
}
