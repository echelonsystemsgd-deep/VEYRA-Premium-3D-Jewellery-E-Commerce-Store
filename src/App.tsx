import React from 'react'
import { CartProvider } from './context/CartContext'
import { SmoothScroll } from './components/common/SmoothScroll'
import { Navbar } from './components/ui/Navbar'
import { HeroOverlay } from './components/ui/HeroOverlay'
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
        <div className="min-h-screen bg-[#08080a] text-[#faf9f6] selection:bg-white/20 selection:text-white relative">
          {/* Header */}
          <Navbar />

          <main>
            {/* Hero Scene with Hand & Rings */}
            <HeroOverlay />

            {/* Collection Gallery */}
            <ProductGrid />

            {/* Editorial & Metallurgy */}
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
