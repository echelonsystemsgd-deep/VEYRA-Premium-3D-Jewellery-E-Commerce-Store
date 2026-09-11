# IMPLEMENTATION PLAN: VEYRA — Premium 3D Jewellery E-Commerce Store

**Brand**: VEYRA  
**Tagline**: *Forged in Silence*  
**Essence**: Quiet, heavy, permanent jewellery. Oxidised metals, deliberate weight, no plating, no compromise. The digital experience feels as considered and restrained as the physical product.

---

## 1. Technical Stack & Configuration
- **Framework**: React 18 / 19 + React Three Fiber (`@react-three/fiber`) + `@react-three/drei`
- **Animation & Scrolling**: Framer Motion + Lenis Smooth Scroll
- **3D Asset Pipeline**: Procedural high-fidelity geometry with bespoke PBR shader materials (micro-scratches, edge oxidation, bevels, inner engraving, cabochon refraction)
- **Studio Lighting**: Poly Haven studio environment HDRI + custom directional key/rim lights + soft contact shadows
- **E-Commerce Architecture**: Front-end Luxury Simulation (interactive bag drawer, material switcher, ring sizer, "Request Private Viewing" concierge modal)
- **Build Tooling**: Vite + React + TypeScript

---

## 2. Directory Structure
```
VEYRA-Premium-3D-Jewellery-E-Commerce-Store/
├── public/
│   ├── images/                # High-res reference assets & editorial imagery
│   └── hdri/                  # Studio environment map
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── StudioLighting.tsx       # Studio rim, key, and soft ambient lights
│   │   │   ├── HeroHandScene.tsx        # Cinematic close-up with micro-breathing & light flares
│   │   │   ├── ProceduralRing.tsx       # Parametric rings (The Monolith Signet, Solitary Cabochon, Triptych Bands)
│   │   │   ├── RingMaterials.ts         # Bespoke PBR metals (Oxidised Silver, Blackened Bronze, Raw Brass)
│   │   │   ├── FloatingGalleryRing.tsx  # Reusable floating grid card with hover elevation & smooth deceleration
│   │   │   └── ProductDetailViewer.tsx  # 360° inspector with constrained orbit & material transitions
│   │   ├── ui/
│   │   │   ├── Navbar.tsx               # Restrained luxury navigation with bag counter
│   │   │   ├── HeroOverlay.tsx          # "VEYRA — Forged in Silence" slow typographic reveal
│   │   │   ├── ProductGrid.tsx          # Curated collection grid with live interactive 3D viewports
│   │   │   ├── ProductModal.tsx         # Fullscreen luxury inspection, size picker, material switcher
│   │   │   ├── CartDrawer.tsx           # Slide-over bag with simulated checkout & summary
│   │   │   ├── PrivateViewingModal.tsx  # High-ticket concierge consultation modal
│   │   │   ├── EditorialSection.tsx     # "Made Without Compromise" manifesto & macro material showcase
│   │   │   └── Footer.tsx               # Brand closing & lifetime warranty pledge
│   │   └── common/
│   │       ├── SmoothScroll.tsx         # Lenis smooth-scroll wrapper
│   │       └── CustomCursor.tsx         # Subdued magnetic ring cursor
│   ├── data/
│   │   └── products.ts                  # VEYRA jewellery catalogue
│   ├── styles/
│   │   └── index.css                    # Luxury styling tokens, custom typography, animations
│   ├── App.tsx                          # Master layout orchestrating scenes and UI
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Core Milestones
1. **Scaffolding & Tooling**: Clean Vite + React + TypeScript configuration with all dependencies.
2. **PBR Material & Geometry Engine**: High-fidelity metal shaders with oxidation crevices, brushed highlights, and cabochon gemstone refraction.
3. **Hero Hand Scene**: Cinematic 3D experience with slow camera drift, breathing motion, and metal flares.
4. **Reusable Floating Gallery Ring**: Smooth idle floating, deceleration on hover, and light enhancement.
5. **Collection Grid & Full Studio Configurator**: Orbit controls, material switcher, and ring sizer.
6. **Luxury UI & E-Commerce Flow**: Cart drawer, concierge viewing request, and editorial showcase.
7. **Verification & Testing**: Build check, responsive testing, and performance validation.
