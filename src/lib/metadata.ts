/**
 * VEYRA — Centralized Brand Metadata & Structured Data Configuration
 * 
 * Single source of truth for SEO, Open Graph, Twitter cards,
 * Schema.org JSON-LD entities, and generic prototype brand identity.
 */

export const SITE_CONFIG = {
  name: 'VEYRA',
  conceptName: 'VEYRA — Permanent Jewellery Concept Prototype',
  tagline: 'Forged in Silence',
  description: 'Production-grade 3D jewellery concept prototype featuring real-time WebGL PBR shaders, tactile 72-frame scroll scrubbing, and made-to-order alloy customization. Concept architecture by Mercian Wealth.',
  url: 'https://veyra-jewellery.vercel.app',
  locale: 'en_US',
  themeColor: '#fbf9f5',
  backgroundColor: '#fbf9f5',
  ogImage: 'https://veyra-jewellery.vercel.app/images/hero-model-hand.jpg',
  ogImageAlt: 'Artisan hand wearing VEYRA solid cast statement rings',
  attribution: {
    text: 'Designed & Built by Mercian Wealth',
    url: 'https://mercianwealth.com'
  }
} as const

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CreativeWork',
      '@id': `${SITE_CONFIG.url}/#prototype`,
      name: SITE_CONFIG.conceptName,
      alternateName: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      author: {
        '@type': 'Organization',
        name: 'Mercian Wealth',
        url: SITE_CONFIG.attribution.url
      },
      knowsAbout: [
        'Bespoke Luxury E-Commerce',
        'WebGL 3D Product Configurator',
        'Canvas Frame Sequence Scrubbing',
        'Permanent Jewellery Architecture'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: {
        '@type': 'Organization',
        name: 'Mercian Wealth',
        url: SITE_CONFIG.attribution.url
      }
    }
  ]
}
