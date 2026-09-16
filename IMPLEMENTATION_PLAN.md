# IMPLEMENTATION PLAN: VEYRA — Architectural & Editorial 3D E-Commerce Store

**Brand**: VEYRA  
**Tagline**: *Forged in Silence*  
**Visual North Star**: Editorial fashion video reference featuring the model reaching forward, studio lighting, lens reflection on hand-crafted statement rings, 3-column architectural hairline collection grid, and the "Made Without Compromise" artisanal manifesto.

---

## 1. Design System & UI Architecture Decision

### Selection: Radix Primitives + Tailwind CSS (shadcn/ui Design Token Architecture)
Following the review of modern component libraries (from the Notion collection), **Radix UI Primitives combined with Tailwind CSS (shadcn token architecture)** was chosen as the definitive single library foundation.
* **Aesthetic Rationale**: Unlike bulky, opinionated frameworks (e.g. Bootstrap, AntD, Chakra) that introduce generic SaaS looks, Radix + Tailwind provides headless, unstyled accessibility primitives with complete design sovereignty. This enables high-fashion editorial styling, hairline borders, and bespoke typographic hierarchies identical to luxury houses like The Row, Lemaire, and Tom Wood.
* **No Theme Mismatch**: By doubling down strictly on this single architecture, every component shares identical CSS variable tokens, border weights, surface depths, and transition curves.

---

## 2. Stone & Living Metallurgy Color Token Palette

To eliminate "vibecoded" random hex codes, the entire site is governed by a unified stone-mineral luxury palette configured in `tailwind.config.js` and `src/styles/index.css`:

| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `veyra-bg` | `#fafaf9` | Warm gallery off-white background |
| `veyra-surface` | `#ffffff` | Crisp modal & card surface |
| `veyra-subtle` | `#f5f5f4` | Subtle card tint / hover layer |
| `veyra-border` | `#e7e5e4` | Architectural hairline grid borders |
| `veyra-border-subtle` | `#f0eeec` | Secondary interior hairline dividers |
| `veyra-text` | `#1c1917` | Deep stone charcoal primary typography |
| `veyra-muted` | `#78716c` | Neutral stone gray secondary copy & sub-labels |
| `veyra-faint` | `#a8a29e` | Faint stone micro-copy, timestamps, indexing |
| `veyra-silver` | `#8d9297` | Oxidised 925 Sterling Silver tone |
| `veyra-bronze` | `#785942` | Ancient Silicon Bronze tone |
| `veyra-brass` | `#967538` | Unlacquered Raw Brass tone |
| `veyra-garnet` | `#881337` | Cabochon deep blood ruby/garnet tone |

All random ad-hoc colors (`#7a7a7e`, `#525256`, `#6e6e73`, `#444`, `#666`) have been eliminated across all application views.

---

## 3. 8px Rem Grid & Spacing Standard

All margin, padding, height, width, and gap values conform to an **8px base grid** using `rem` units (1rem = 16px):

* **4px (0.25rem / `p-1`)**: Micro-dividers, dot indicators.
* **8px (0.5rem / `p-2`)**: Standard button vertical padding, tag margins.
* **16px (1rem / `p-4`)**: Standard card internal padding, horizontal field margins.
* **24px (1.5rem / `p-6`)**: Mobile container gutters, modal margins.
* **32px (2rem / `p-8`)**: Desktop section padding, card cell bounds.
* **48px (3rem / `p-12`)**: Grid cell spacing, drawer internal separation.
* **64px (4rem / `p-16`)**: Editorial column padding, macro section headers.
* **96px (6rem / `p-24`)**: Hero viewport offsets.
* **128px (8rem / `p-32`)**: Top-level viewport breathing space.

---

## 4. Elimination of Vibecoded Clutter

* **Pill Badges Removed**: All non-functional techno pills (e.g. "cockpit", generic badges) were permanently expunged.
* **Architectural Indicators Retained**: Replaced with understated editorial typographic markers such as `[ BAG: 0 ]`, `[ 01 ] Deliberate Weight`, `[ 360° SILHOUETTE VIEW ]`, and the `|||` triple hairline menu trigger.

---

## 5. Core Architectural Components

### 1. Cinematic Scroll-Scrub Hero Section (`CinematicHero.tsx`)
* **1:1 Tactile Canvas Scrub**: Rather than raw `<video>` tags (which have scrub lag, native play overlays, and browser codec stutter), the hero renders a pre-extracted 72-frame WebP sequence (12fps, ~1MB total payload) directly onto a high-DPI HTML5 canvas.
* **Pinned Viewport**: Contained within a `220vh` parent with a `sticky top-0 h-screen` viewport.
* **Smooth Cross-Fade**: As scroll reaches progress `0.65` to `1.0`, the hero smoothly fades out with upward momentum, seamlessly transitioning the visitor into the product archive.
* **Accessibility**: Full `prefers-reduced-motion` compliance falling back to static frame display.

### 2. Archival Collection Grid (`ProductGrid.tsx`)
* **Clean 2D Editorial Photography**: Replaced heavy synthetic 3D Three.js canvas cards with crisp, high-resolution editorial product photography (`uQViM.jpg`, `a95lc.jpg`, `c1Qnj.jpg`, etc.).
* **Architectural Hairline Grid**: 3-column desktop layout framed by `border-veyra-border` hairline lines matching the visual video reference.
* **Interactive Inspection Trigger**: Clicking any product opens the dedicated 3D Studio Configurator.

### 3. 360° Studio Configurator Modal (`ProductModal.tsx`)
* **Targeted WebGL Experience**: OrbitControls with damping, studio gallery lighting, and real-time PBR material shaders (Oxidised 925 Silver, Silicon Bronze, Raw Brass).
* **Selection Controls**: Real-time US ring size selector (6–13) and "Add to Bag" cart integration.

### 4. Editorial Manifesto (`EditorialSection.tsx`)
* **"Made Without Compromise"**: Dual-column layout mirroring `00:07` in the fashion reference video.
* **Specifications**: Three structured architectural cells (`[ 01 ] Deliberate Weight`, `[ 02 ] Sterling & Silver`, `[ 03 ] Lifetime Guarantee`).

### 5. Client Concierge & Commerce (`CartDrawer.tsx` & `PrivateViewingModal.tsx`)
* **Discreet Courier Dispatch**: Slide-over cart drawer with live subtotal calculation, complimentary shipping indicator, and checkout simulation.
* **Private Viewing Salon**: Dedicated booking modal for London Mayfair, Tribeca NY, or Virtual 3D examinations.

---

## 6. Verification & Health

* **TypeScript Compilation**: `0` errors (`npx tsc --noEmit` passes cleanly).
* **Production Build**: `npm run build` succeeds cleanly with assets optimized.
* **Responsive Layout**: Validated across mobile, tablet, and ultra-wide displays without horizontal overflow (`overflow-x: clip`).
