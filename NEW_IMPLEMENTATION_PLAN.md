# IMPLEMENTATION PLAN: VEYRA Luxury Flagship Full-Feature Elevation

Elevating the VEYRA prototype into a comprehensive, high-converting flagship jewelry boutique by integrating all 5 high-impact features while preserving strict stone-mineral design tokens, hairline grid aesthetics, and performance standards.

---

## 1. Feature Specifications & Architecture

### Feature 1: Architectural Collection Category Filter Bar
* **Location**: Integrated into `ProductGrid.tsx` directly above the 3-column hairline grid.
* **Categories**:
  * `ALL ARCHIVE (6)`
  * `SIGNET SEALS (2)`
  * `SOLID BANDS (3)`
  * `CABOCHON GEMS (1)`
* **Design & Motion**:
  * Understated monospace filters styled with `[ ... ]` editorial brackets.
  * Active indicator with subtle hairline border and pill background.
  * Animated layout transition using Framer Motion (`AnimatePresence` and `layout` prop).

### Feature 2: "The Unboxing & Provenance" Architectural Section
* **Component**: `src/components/ui/ProvenanceSection.tsx`
* **Layout**: 3-column hairline architectural grid matching Section 2:
  * **[ 01 ] Milled Slate & Oak Box**: Custom heavyweight milled stone box with precision magnetic seal and velvet ring cradle.
  * **[ 02 ] Wax-Sealed Provenance Dossier**: Individually numbered and silversmith-signed archival certificate detailing ingot batch and weight.
  * **[ 03 ] Goldsmiths' Hall Hallmark**: Official British Assay Office certified hallmarks confirming solid 925 sterling silver and ancient alloy composition.
* **Visuals**: Crisp macro editorial photography and structured monospace specs (`WEIGHT`, `MATERIALS`, `PACKAGING SPEC`).

### Feature 3: Atelier Client Care & FAQ Accordion
* **Component**: `src/components/ui/FaqSection.tsx`
* **Questions Addressed**:
  1. *How does unplated metallurgy evolve and patina over decades of wear?*
  2. *What if my ring does not fit perfectly? (Complimentary 60-day size exchange & resizing)*
  3. *How is discreet insured courier transit handled? (Double-boxed, tracked, non-branded discreet exterior)*
  4. *Are VEYRA rings cast solid or hollowed out? (100% solid, non-hollow deliberate mass with internal comfort bore)*
  5. *Can bespoke signet seals or family crests be engraved? (Lost-wax bespoke seal carving via Private Salon consultation)*
* **Design**: Minimalist hairline accordion with smooth height animation and `+ / −` monospace toggles.

### Feature 4: Ambient Atelier Audio Atmosphere (`SoundToggle.tsx`)
* **Component**: `src/components/ui/SoundToggle.tsx` (and `src/lib/sound.ts`)
* **Mechanism**:
  * Uses the native HTML5 Web Audio API (`AudioContext`) — **zero external MP3 downloads**, zero buffer lag.
  * Generates a warm, organic resonant metallic drone (432Hz fundamental with soft harmonic overtone series and gentle low-pass filter).
  * Smooth fade-in/fade-out on click (`gainNode.linearRampToValueAtTime`).
  * Persisted state in `localStorage`.
* **Indicator**: Located in the Navbar / Top Atelier Bar as `[ SOUND: OFF ]` / `[ SOUND: ACTIVE ]` with mini animated equalizer waves.

### Feature 5: Discreet Agency Pitch Pill & Consultation Trigger
* **Component**: `src/components/ui/AgencyPitchPill.tsx`
* **Position**: Bottom-left fixed floating badge, styled in pure stone luxury typography:
  ```text
  [ PROTOTYPE CONCEPT · BY MERCIAN WEALTH · BOOK STRATEGY AUDIT ↗ ]
  ```
* **Interactive Drawer**: Clicking opens a sleek slide-over strategy audit consultation modal with direct booking details, contact email, and prototype capability overview.

---

## 2. Proposed Changes

### Component Architecture

```text
src/
├── lib/
│   └── sound.ts                 [NEW] Web Audio API synthetic ambient sound generator
├── components/
│   ├── ui/
│   │   ├── ProvenanceSection.tsx [NEW] 3-card unboxing & packaging showcase
│   │   ├── FaqSection.tsx        [NEW] Client care accordion
│   │   ├── SoundToggle.tsx       [NEW] Audio atmosphere toggle with animated EQ
│   │   ├── AgencyPitchPill.tsx   [NEW] Discreet Mercian Wealth pitch pill & drawer
│   │   ├── ProductGrid.tsx       [MODIFY] Add category filter tabs with layout animation
│   │   ├── Navbar.tsx            [MODIFY] Integrate SoundToggle into top atelier bar
│   │   └── Footer.tsx            [MODIFY] Add links to Provenance & Client Care
│   └── App.tsx                   [MODIFY] Mount ProvenanceSection, FaqSection, and AgencyPitchPill
└── data/
    └── products.ts               [MODIFY] Ensure category tags match filter definitions
```

---

## 3. Verification Plan

### Automated Build Verification
* Run `npm run build` to verify clean TypeScript compilation and bundle generation with 0 errors.

### Interactive Functionality Testing
1. **Category Filters**: Test filtering between *All Archive*, *Signet Seals*, *Solid Bands*, and *Gemstone*. Verify smooth card reordering and modal triggers.
2. **Audio Toggle**: Verify Web Audio initialization on first click without console errors or sound stutter. Confirm mute on second click.
3. **Provenance Section**: Verify responsive 3-column layout on desktop, tablet, and mobile.
4. **FAQ Accordion**: Click through all 5 questions to ensure clean expand/collapse with no layout shift or scroll jumping.
5. **Pitch Pill**: Verify clicking opens the Mercian Wealth strategy consultation drawer, and test closing it.
6. **Git & Vercel**: Push verified commit to GitHub `main` and confirm deployment succeeds.
