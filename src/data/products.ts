export type MaterialType = 'oxidised-silver' | 'blackened-bronze' | 'raw-brass'

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  weight: string
  description: string
  details: string[]
  primaryMaterial: MaterialType
  availableMaterials: MaterialType[]
  sizes: number[]
  image: string
  modelType: 'signet' | 'cabochon' | 'stack' | 'carved' | 'sovereign'
  featured?: boolean
}

export const MATERIAL_CONFIG: Record<MaterialType, {
  name: string
  color: string
  roughness: number
  metalness: number
  creviceDarkness: string
  accentColor: string
  description: string
}> = {
  'oxidised-silver': {
    name: 'Oxidised Silver (925)',
    color: '#8d9297',
    roughness: 0.58,
    metalness: 0.94,
    creviceDarkness: '#18191b',
    accentColor: '#c5c8cc',
    description: 'Solid 925 sterling silver, hand-patinated in liver of sulfur. Dark micro-recesses with brushed silver highlights.'
  },
  'blackened-bronze': {
    name: 'Blackened Bronze',
    color: '#463c33',
    roughness: 0.68,
    metalness: 0.88,
    creviceDarkness: '#120f0d',
    accentColor: '#8a6e55',
    description: 'Ancient silicon bronze alloy subjected to thermal blackening. Deep charcoal base with warm burnt copper undertones.'
  },
  'raw-brass': {
    name: 'Unlacquered Raw Brass',
    color: '#9e7e45',
    roughness: 0.48,
    metalness: 0.92,
    creviceDarkness: '#2a2012',
    accentColor: '#d6b36e',
    description: 'Heavy solid brass alloy, unlacquered and breathing. Develops a personal, rich antique patina uniquely tailored to your touch.'
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 'monolith-signet-i',
    name: 'The Monolith Signet I',
    subtitle: 'Classic Oval Seal with VEYRA Hallmark',
    price: 440,
    weight: '24.5g solid 925 silver',
    description: 'Cast in heavy 925 sterling silver, The Monolith Signet features an elongated oval face with subtle hand-beveled edges. Hand-patinated to create rich contrast between the dark oxidised background and the gleaming hand-buffed relief.',
    details: [
      'Individually cast using lost-wax method',
      'Solid non-hollow construction for deliberate physical presence',
      'Hand-finished with liver of sulfur oxidation',
      'Subtle internal comfort-fit band'
    ],
    primaryMaterial: 'oxidised-silver',
    availableMaterials: ['oxidised-silver', 'blackened-bronze', 'raw-brass'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: '/images/uQViM.jpg',
    modelType: 'signet',
    featured: true
  },
  {
    id: 'solitary-cabochon',
    name: 'The Solitary Cabochon',
    subtitle: 'Brutalist Bezel with Raw Garnet Refraction',
    price: 620,
    weight: '28.0g solid bronze',
    description: 'A monolithic ring carrying a deep crimson cabochon stone. The hand-sculpted bronze bezel wraps organically around the gem, gripping it with ancestral weight and organic micro-crevices.',
    details: [
      'Natural raw garnet cabochon with internal light fissures',
      'Blackened silicon bronze with hand-buffed highlights',
      'Weighted ergonomic base that counters top weight',
      'Lifetime guarantee against stone loosening'
    ],
    primaryMaterial: 'blackened-bronze',
    availableMaterials: ['blackened-bronze', 'oxidised-silver', 'raw-brass'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: '/images/a95lc.jpg',
    modelType: 'cabochon',
    featured: true
  },
  {
    id: 'triptych-bands',
    name: 'Triptych Bands',
    subtitle: 'Organic Interlocking Trio Set',
    price: 510,
    weight: '32.2g total mass',
    description: 'Three substantial, organically contoured bands designed to be worn stacked together or distributed across hand digits. Every band possesses unique hand-hammered facets and micro-scratches that celebrate raw metallurgy.',
    details: [
      'Set includes three distinct nesting bands',
      'Unlacquered metallurgy designed to age with the wearer',
      'Substantial 4.5mm individual band thickness',
      'No plating, no synthetic seals'
    ],
    primaryMaterial: 'raw-brass',
    availableMaterials: ['raw-brass', 'oxidised-silver', 'blackened-bronze'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: '/images/c1Qnj.jpg',
    modelType: 'stack',
    featured: true
  },
  {
    id: 'relic-carved-band',
    name: 'The Relic Band',
    subtitle: 'Granular Ceremental Relief',
    price: 490,
    weight: '22.0g solid silver',
    description: 'Inspired by archaic ceremonial artifacts, The Relic Band showcases high-relief granulation and floral architectural motifs submerged in heavy dark oxidation. High-touch surfaces remain silky against the skin.',
    details: [
      'High-relief deep oxidation casting',
      'Silky hand-polished interior bore',
      'Permanent patina that does not rub off',
      'Hallmarked with VEYRA silent signature'
    ],
    primaryMaterial: 'oxidised-silver',
    availableMaterials: ['oxidised-silver', 'blackened-bronze'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: '/images/rtzOI.jpg',
    modelType: 'carved',
    featured: false
  },
  {
    id: 'monolith-slate',
    name: 'The Monolith Signet II',
    subtitle: 'Brutalist Flat Face in Blackened Bronze',
    price: 460,
    weight: '26.8g solid bronze',
    description: 'A variation of our iconic signet with raw side facets and a heavy, unadorned planar top. Positioned as a monument on the finger, commanding quiet respect through pure proportion.',
    details: [
      'Massive cast silicon bronze',
      'Natural cold patination',
      'Individually numbered archival piece',
      'Packaged in heavy milled slate box'
    ],
    primaryMaterial: 'blackened-bronze',
    availableMaterials: ['blackened-bronze', 'oxidised-silver', 'raw-brass'],
    sizes: [8, 9, 10, 11, 12, 13],
    image: '/images/S2JNA.jpg',
    modelType: 'signet',
    featured: false
  },
  {
    id: 'sovereign-band',
    name: 'The Sovereign Band',
    subtitle: 'Deep Weighted Everyday Artifact',
    price: 420,
    weight: '21.5g solid silver',
    description: 'A perpetual band engineered with a steep chamfer and heavy gauge. Designed to never leave the hand, gaining character from stone, steel, and water through decades of life.',
    details: [
      'Solid 925 sterling silver',
      'Uniform 6mm heavy profile',
      'Engineered comfort interior',
      'Lifetime structural warranty'
    ],
    primaryMaterial: 'oxidised-silver',
    availableMaterials: ['oxidised-silver', 'blackened-bronze', 'raw-brass'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: '/images/7OQGa.jpg',
    modelType: 'sovereign',
    featured: false
  }
]
