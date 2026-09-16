import React from 'react'
import { CartProvider } from './context/CartContext'
import { SmoothScroll } from './components/common/SmoothScroll'
import { Navbar } from './components/ui/Navbar'
import { CinematicHero } from './components/hero/CinematicHero'
import { ProductGrid } from './components/ui/ProductGrid'
import { EditorialSection } from './components/ui/EditorialSection'
import { Footer } from './components/ui/Footer'
import { ProductModal } from './components/ui/ProductModal'
import { CartDrawer } from './components/ui/CartDrawer'
import { PrivateViewingModal } from './components/ui/PrivateViewingModal'

export const App: React.FC = () => {
  return (
    <CartProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-[#f8f8f9] text-[#121214] relative selection:bg-black/10 selection:text-black">
          {/* Top Navigation */}
          <Navbar />

          <main>
            {/* Cinematic 3-Beat Scroll-Scrub Hero Section */}
            <CinematicHero />

            {/* Collection 3-Column Hairline Grid */}
            <ProductGrid />

            {/* Editorial "Made Without Compromise" Section */}
            <EditorialSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Modals */}
          <ProductModal />
          <CartDrawer />
          <PrivateViewingModal />
        </div>
      </SmoothScroll>
    </CartProvider>
  )
}

export default App
