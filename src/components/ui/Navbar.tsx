import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, openPrivateViewing } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/[0.06] py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.22em] uppercase text-[#a5a4a0]">
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors duration-300"
          >
            Collection
          </button>
          <button
            onClick={() => scrollTo('metallurgy')}
            className="hover:text-white transition-colors duration-300"
          >
            Metallurgy
          </button>
          <button
            onClick={() => scrollTo('editorial')}
            className="hover:text-white transition-colors duration-300"
          >
            Manifesto
          </button>
        </nav>

        {/* Center Brand Identity */}
        <div className="text-center select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-display text-xl md:text-2xl tracking-[0.35em] text-[#faf9f6] block font-light">
            VEYRA
          </span>
          <span className="text-[8px] tracking-[0.45em] text-[#71706e] uppercase block mt-0.5">
            Forged in Silence
          </span>
        </div>

        {/* Right Navigation & Bag */}
        <div className="flex items-center space-x-6 md:space-x-8 text-[11px] tracking-[0.2em] uppercase">
          <button
            onClick={() => openPrivateViewing()}
            className="hidden lg:inline-flex items-center gap-2 text-[#b0aba3] hover:text-white transition-colors duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c9a767]" />
            <span>Private Viewing</span>
          </button>

          <span className="hidden sm:inline-block text-[#52514f] text-[10px] tracking-[0.15em]">
            USD ($)
          </span>

          {/* Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 text-[#faf9f6] hover:text-[#c9a767] transition-colors duration-300 py-1"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden sm:inline text-[11px] tracking-[0.2em]">Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#faf9f6] text-[#0a0a0c] text-[9px] font-semibold flex items-center justify-center -ml-1">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#0d0d10] border-b border-white/10 p-8 flex flex-col space-y-6 text-center text-xs tracking-[0.25em] uppercase text-[#a5a4a0]">
          <button onClick={() => scrollTo('collection')} className="hover:text-white">
            Collection
          </button>
          <button onClick={() => scrollTo('metallurgy')} className="hover:text-white">
            Metallurgy
          </button>
          <button onClick={() => scrollTo('editorial')} className="hover:text-white">
            Manifesto
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              openPrivateViewing()
            }}
            className="text-[#c9a767] pt-2"
          >
            Request Private Viewing
          </button>
        </div>
      )}
    </header>
  )
}
