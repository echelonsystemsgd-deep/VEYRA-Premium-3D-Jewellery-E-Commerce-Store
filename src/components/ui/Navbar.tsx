import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { SoundToggle } from './SoundToggle'

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
    const lenis = (window as any).__lenisInstance
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -20, duration: 1.2 })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-veyra-bg/95 backdrop-blur-md border-b border-veyra-border py-3 md:py-4'
          : 'bg-transparent py-3 sm:py-4 md:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Identity & Emblem (matching the video's top-left circular logo) */}
        <div
          onClick={() => {
            const lenis = (window as any).__lenisInstance
            if (lenis) {
              lenis.scrollTo(0, { duration: 1.2 })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
        >
          {/* Custom geometric monogram emblem */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-veyra-text flex items-center justify-center relative">
            <span className="font-editorial italic text-sm sm:text-base text-veyra-text -mt-0.5">V</span>
            <div className="absolute inset-0 rounded-full border border-black/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-display text-base sm:text-lg tracking-[0.25em] text-veyra-text font-medium leading-none block">
              VEYRA
            </span>
            <span className="text-[0.375rem] sm:text-[0.4375rem] tracking-[0.3em] uppercase text-veyra-muted block mt-0.5">
              Forged in Silence
            </span>
          </div>
        </div>

        {/* Center: Minimalist Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[0.6875rem] tracking-[0.22em] uppercase text-veyra-muted">
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-veyra-text transition-colors duration-300 cursor-pointer"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('provenance')}
            className="hover:text-veyra-text transition-colors duration-300 cursor-pointer"
          >
            Provenance
          </button>
          <button
            onClick={() => scrollTo('care')}
            className="hover:text-veyra-text transition-colors duration-300 cursor-pointer"
          >
            Client Care
          </button>
          <button
            onClick={() => scrollTo('editorial')}
            className="hover:text-veyra-text transition-colors duration-300 cursor-pointer"
          >
            Atelier
          </button>
        </div>

        {/* Right: Sound Toggle, [ BAG: 0 ] and ||| Menu */}
        <div className="flex items-center space-x-2.5 sm:space-x-4 text-[0.6875rem] tracking-[0.2em] uppercase shrink-0">
          {/* Ambient Sound Atmosphere Toggle */}
          <SoundToggle />

          {/* Bag button styled as [ BAG: X ] */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-veyra-text hover:text-veyra-muted transition-colors duration-300 font-mono text-[0.625rem] sm:text-[0.6875rem] cursor-pointer whitespace-nowrap shrink-0"
            aria-label="View Bag"
          >
            [ BAG: {cartCount} ]
          </button>

          {/* Architectural Menu Trigger: 3 vertical hairline bars ||| */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-[3px] p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Menu"
          >
            <span className="w-[1.5px] h-3.5 sm:h-4 bg-veyra-text" />
            <span className="w-[1.5px] h-3.5 sm:h-4 bg-veyra-text" />
            <span className="w-[1.5px] h-3.5 sm:h-4 bg-veyra-text" />
          </button>
        </div>
      </div>

      {/* Slide-down Minimal Menu & Backdrop */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-xs z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-x-0 top-full bg-veyra-surface/98 backdrop-blur-xl border-b border-veyra-border py-8 px-6 flex flex-col items-center space-y-5 text-center text-xs tracking-[0.25em] uppercase text-veyra-text shadow-xl z-40 animate-in slide-in-from-top-2 duration-300">
            <button
              onClick={() => scrollTo('collection')}
              className="hover:text-veyra-brass py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              The Archive
            </button>
            <button
              onClick={() => scrollTo('provenance')}
              className="hover:text-veyra-brass py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              Unboxing & Provenance
            </button>
            <button
              onClick={() => scrollTo('care')}
              className="hover:text-veyra-brass py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              Client Care & FAQ
            </button>
            <button
              onClick={() => scrollTo('editorial')}
              className="hover:text-veyra-brass py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              Made Without Compromise
            </button>
            <div className="w-12 h-px bg-veyra-border my-1" />
            <button
              onClick={() => {
                setMenuOpen(false)
                openPrivateViewing()
              }}
              className="text-veyra-brass hover:text-veyra-text font-medium py-2 tracking-[0.28em] transition-colors cursor-pointer"
            >
              Request Private Viewing
            </button>
          </div>
        </>
      )}
    </header>
  )
}
