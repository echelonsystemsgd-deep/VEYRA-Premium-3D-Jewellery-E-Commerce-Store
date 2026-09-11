# IMPLEMENTATION PLAN: VEYRA — Premium 3D Jewellery E-Commerce Store

**Brand**: VEYRA  
**Tagline**: *Forged in Silence*  
**Visual North Star**: Reference video (`WhatsApp Video 2026-09-11 at 20.33.17.mp4`) showcasing the high-fashion editorial model with extended hand, lens flare gleam on the red cabochon ring, 3-column architectural hairline collection grid, and "Made Without Compromise" manifesto.

---

## 1. Current Implementation Status

### ✅ Completed & Active in Codebase
* **Framework & Build**: Vite + React 18 + TypeScript + Tailwind CSS (Fully configured and compiling with `0` errors).
* **Luminous Off-White Studio Aesthetic**: Switched theme to gallery-grade off-white (`#f8f8f9`) with crisp architectural hairline borders (`#e5e5e7`) and high-contrast dark typography.
* **Hero Campaign Visual**: Direct rendering of the high-fashion model with extended hand wearing the 3 artisan rings (red garnet cabochon, stacked bands, and heavy signet) with pulsing starburst lens flare and smooth scroll parallax.
* **3-Column Hairline Collection Grid**:
  * 3-column architectural layout separated by vertical borders (`#e5e5e7`).
  * Live 3D floating and rotating Three.js jewellery models (`FloatingGalleryRing.tsx`) with hover lift and deceleration.
  * Centered piece names and prices directly beneath each cell (*The Monolith Signet I*, *The Solitary Cabochon*, *Triptych Bands*, etc.).
* **"Made Without Compromise" Editorial Section**:
  * Multi-cell structural grid matching `00:07` in the reference video.
  * Left: Artisanal manifesto and *"VIEW COLLECTION ➔"* CTA.
  * Right: 3 architectural specification cards (`[ 01 ] Deliberate Weight`, `[ 02 ] Sterling & Silver`, `[ 03 ] Lifetime Guarantee`).
* **Header & Navigation**:
  * Circular monogram emblem + `VEYRA` mark.
  * Minimalist `ABOUT`, `COLLECTION`, and `METALLURGY` navigation.
  * Minimal `[ BAG: 0 ]` and `|||` triple hairline architectural menu trigger.
* **3D Studio Configurator & Inspector Modal**:
  * 360° constrained OrbitControls with rotation damping.
  * Real-time material switcher (*Oxidised Silver (925)*, *Blackened Bronze*, *Unlacquered Raw Brass*).
  * US ring size selector (sizes 6–13) and "Add to Bag" flow.
* **E-Commerce Simulation**:
  * Slide-over Cart Drawer with persistent storage, item removal, quantity adjustment, and complimentary courier shipping.
  * Private Viewing Concierge modal for London Mayfair, Tribeca NY, or Virtual Salon consultations.
* **Cleanup**:
  * Removed `3d-ecom.mp4` and extraneous files from the workspace.

---

## 2. Standby / Next Phase (Awaiting User Return)

* **Video Loop Integration**: When you recall the exact video generation/loop technique used in the previous site, we can drop the direct MP4/WebM video into `public/hero-video.mp4` or plug in the exact canvas animation mechanism.
* **Custom Model Imports**: Ready to swap procedural rings with specific CAD/GLTF models whenever desired.
* **Additional Editorial Micro-interactions**: Refinements to hover transitions, audio hum, or scroll snapping based on your feedback.

---

## 3. Project Health & Commands
* **Dev Server**: `npm run dev` (Active on `http://localhost:5173/`)
* **Type Check**: `npx tsc --noEmit` (Clean exit code 0)
* **Production Build**: `npm run build`
