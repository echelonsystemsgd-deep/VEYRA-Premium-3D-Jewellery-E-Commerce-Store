# VEYRA — Forged in Silence

> **Quiet, heavy, permanent jewellery. Oxidised metals, deliberate weight, no plating, no compromise.**

![VEYRA Cover](public/images/uQViM.jpg)

**VEYRA** is an ultra-luxury, 3D-first e-commerce web application engineered with **React Three Fiber**, **Three.js**, **Framer Motion**, and **Lenis Smooth Scroll**. The digital experience reflects the weight, metallurgy, and brutalist restraint of high-end permanent jewellery.

---

## ✦ Core Features

### 1. Cinematic 3D Hero Scene
* **Sculptural Hand & Rings**: Real-time 3D rendered hand adorned with VEYRA signature pieces (*The Monolith Signet I*, *The Solitary Cabochon*, and *Triptych Bands*).
* **Delicate Breathing Dynamics**: Subtly phased sinusoidal finger motion and slow camera parallax.
* **Reflective Light Flares**: Directional studio light sweeps tracing across oxidised metal bevels.
* **Monolithic Typography**: Staggered luxury reveal with Cinzel and Cormorant Garamond serif letterforms.

### 2. The Archive (Floating 3D Gallery Grid)
* **Live 3D Viewports**: Each product card features a dedicated interactive 3D canvas.
* **Idle Floating & Deceleration**: Rings float with natural vertical oscillation and continuous auto-rotation.
* **Hover Micro-Interactions**: Rings lift vertically, rotation smoothly decelerates, and specular highlights intensify.
* **Instant Material Switcher**: Preview pieces in *Oxidised Silver (925)*, *Blackened Bronze*, or *Unlacquered Raw Brass* directly on the card.

### 3. Interactive 3D Studio Configurator (Detail Modal)
* **360° Inspection**: Constrained OrbitControls with physics damping to maintain studio aesthetics without model flipping.
* **Real-time PBR Shader Interpolation**: Custom bump mapping, micro-scratches, edge wear, and gemstone physical transmission (garnet cabochon).
* **Ring Sizer**: Tactile US size selector (sizes 6–13).
* **Add to Bag Flow**: Micro-animated feedback linking directly into the cart.

### 4. Front-End Luxury E-Commerce Experience
* **Slide-over Bag / Cart Drawer**: Persistent cart state, item removal, quantity adjustment, complimentary worldwide insured courier calculation, and simulated 256-bit checkout.
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
