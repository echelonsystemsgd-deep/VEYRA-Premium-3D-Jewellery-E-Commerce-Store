import React from 'react'
import { CartProvider } from './context/CartContext'
import { SmoothScroll } from './components/common/SmoothScroll'
import { Navbar } from './components/ui/Navbar'
import { CinematicHero } from './components/hero/CinematicHero'
import { ProductGrid } from './components/ui/ProductGrid'
import { ProvenanceSection } from './components/ui/ProvenanceSection'
import { EditorialSection } from './components/ui/EditorialSection'
import { FaqSection } from './components/ui/FaqSection'
import { Footer } from './components/ui/Footer'
import { ProductModal } from './components/ui/ProductModal'
import { CartDrawer } from './components/ui/CartDrawer'
import { PrivateViewingModal } from './components/ui/PrivateViewingModal'
import { SizingGuideModal } from './components/ui/SizingGuideModal'
import { AgencyPitchPill } from './components/ui/AgencyPitchPill'

export const App: React.FC = () => {
  return (
    <CartProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-veyra-bg text-veyra-text relative selection:bg-black/10 selection:text-black">
          {/* Top Navigation */}
          <Navbar />

          <main>
            {/* Cinematic 3-Beat Scroll-Scrub Hero Section */}
            <CinematicHero />

            {/* Collection 3-Column Hairline Grid */}
            <ProductGrid />

            {/* Unboxing Architecture & Provenance Showcase */}
            <ProvenanceSection />

            {/* Editorial "Made Without Compromise" Section */}
            <EditorialSection />

            {/* Atelier Client Care & FAQ Accordion */}
            <FaqSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Modals */}
          <ProductModal />
          <CartDrawer />
          <PrivateViewingModal />
          <SizingGuideModal />

          {/* Strategic Agency Pitch Outreach Drawer */}
          <AgencyPitchPill />
        </div>
      </SmoothScroll>
    </CartProvider>
  )
}

export default App
