# VEYRA — Forged in Silence

> **Quiet, heavy, permanent jewellery. Oxidised metals, deliberate weight, no plating, no compromise.**

![VEYRA Cover](public/images/uQViM.jpg)

**VEYRA** is an ultra-luxury, 3D-first e-commerce web application engineered with **React Three Fiber**, **Three.js**, **Framer Motion**, and **Lenis Smooth Scroll**. The digital experience reflects the weight, metallurgy, and brutalist restraint of high-end permanent jewellery.

---

## ✦ Core Features

### 1. Cinematic Scroll-Scrub Hero Experience
* **1:1 Canvas Film Reel**: HTML5 Canvas frame-sequence scrub tied directly 1:1 to scroll progress using 72 pre-extracted high-resolution WebP frames — zero video buffer lag or native player controls.
* **Interactive Hotspots**: Pulsing indicators floating over model digits triggering on-hand inspection popovers.
* **Living Metallurgy Selector**: Real-time alloy switching with tactile descriptions for *Oxidised 925 Silver*, *Blackened Bronze*, and *Unlacquered Raw Brass*.
* **Editorial Monogram & Header**: Monolithic typography with Cinzel, Cormorant Garamond, and Plus Jakarta Sans.

### 2. Archival Collection Grid
* **Editorial Product Photography**: Crisp 2D macro imagery celebrating genuine oxidation, hand-beveled contours, and physical hallmarks.
* **Architectural Hairline Grid**: 3-column layout framed with subtle stone dividers.
* **Interactive `[ 360° INSPECT ]` Badge**: Subtle hover cue inviting exploration.
* **Alloy Selection Memory**: Choosing an alloy dot directly on the card carries over to the modal configurator.

### 3. Dual-Mode Studio Configurator Modal
* **Authentic Studio Photography Default**: Showcases the true physical piece in ultra-high resolution with interactive macro hover zoom and contact shadow.
* **`[ 360° 3D STUDIO ]` Mode**: Instant switch into a real-time WebGL Three.js viewport with constrained OrbitControls and dynamic PBR alloy shaders.
* **Multi-View Thumbnail Rail**: Quick access to Studio Macro, Hand Fit Context, and 360° Silhouette views.
* **Integrated Sizing Guide & Add to Bag**: Instant size selection with direct link to the sizing dossier and live cart badge updates.

### 4. International Ring Sizing Dossier
* **Complete Conversion Chart**: US (6–13), UK/AU, EU, diameter (mm), and circumference (mm).
* **Artisanal Guidance**: Specific advice for wide gauge bands (such as The Sovereign Band) and complimentary 60-day resizing policy.

### 5. Client Concierge & Luxury Commerce
* **Slide-over Bag / Cart Drawer**: Persistent cart state, item removal, quantity adjustment, complimentary worldwide insured courier calculation, and simulated checkout sequence (*"Acquisition Confirmed"* receipt).
* **Private Salon Viewing Flow**: Dedicated concierge consultation appointment modal for high-ticket pieces and bespoke signet seals (Virtual 3D, London Mayfair, New York Tribeca).
* **Editorial & Metallurgy Showcase**: "Made Without Compromise" manifesto celebrating solid non-hollow casting, zero surface plating, and lifetime structural guarantees.

---

## ✦ Tech Stack

* **Core**: React 18, TypeScript, Vite
* **3D & Shaders**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **Motion & Scrolling**: Framer Motion, Lenis Smooth Scroll
* **Styling**: Tailwind CSS, Vanilla CSS design tokens
* **Icons**: Lucide React

---

## ✦ Getting Started

### Prerequisites
* Node.js `v18+` (Tested on `v24.14.0`)
* npm `v9+`

### Installation
```bash
git clone <repo-url>
cd VEYRA-Premium-3D-Jewellery-E-Commerce-Store
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to explore the experience locally.

### Production Build
```bash
npm run build
```
Generates a highly optimized bundle in `dist/` ready for zero-configuration deployment to **Vercel**, **Netlify**, or AWS CloudFront.

### Preview Production Build
```bash
npm run preview
```

---

## ✦ Metallurgy Specifications

| Alloy | Composition | Patination Method | Living Characteristic |
| :--- | :--- | :--- | :--- |
| **Oxidised 925 Silver** | 92.5% Ag, 7.5% Cu | Elemental sulfur cold bath | Crevices remain dark; outer bevels buff with contact |
| **Blackened Bronze** | Silicon Bronze | High-temperature thermal oxidation | Dark charcoal base developing warm copper highlights |
| **Raw Brass** | Unlacquered Brass | Hand-satin burnishing | Zero varnish; develops rich golden-brown antique patina |

---

## ✦ License & Provenance
© VEYRA ATELIER LTD. All rights reserved. Forged in Silence.
