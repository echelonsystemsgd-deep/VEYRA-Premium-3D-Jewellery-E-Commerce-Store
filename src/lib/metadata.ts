/**
 * VEYRA — Centralized Brand Metadata & Structured Data Configuration
 * 
 * Single source of truth for SEO, Open Graph, Twitter cards,
 * Schema.org JSON-LD entities, and digital brand identity.
 */

export const SITE_CONFIG = {
  name: 'VEYRA',
  legalName: 'VEYRA ATELIER LTD',
  tagline: 'Forged in Silence',
  description: 'Solid cast, unplated permanent jewellery engineered with intentional mass. Hand-finished 925 sterling silver, blackened bronze & raw brass. Explore the VEYRA atelier.',
  url: 'https://veyra-jewellery.com',
  locale: 'en_US',
  themeColor: '#fafaf9',
  backgroundColor: '#fafaf9',
  ogImage: 'https://veyra-jewellery.com/images/hero-model-hand.jpg',
  ogImageAlt: 'Artisan hand wearing VEYRA solid cast statement rings',
  salons: [
    {
      name: 'VEYRA Mayfair Salon',
      locality: 'London',
      region: 'Mayfair',
      country: 'GB'
    },
    {
      name: 'VEYRA Tribeca Salon',
      locality: 'New York',
      region: 'Tribeca',
      country: 'US'
    }
  ],
  attribution: {
    text: 'Designed & Built by Mercian Wealth',
    url: 'https://mercianwealth.com'
  }
} as const

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.legalName,
      alternateName: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/favicon.svg`
      },
      description: SITE_CONFIG.description,
      knowsAbout: [
        'Permanent Jewellery',
        'Lost-wax Casting',
        '925 Sterling Silver Patination',
        'Silicon Bronze Metallurgy',
        'Unlacquered Raw Brass'
      ],
      location: SITE_CONFIG.salons.map((salon) => ({
        '@type': 'Place',
        name: salon.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: salon.locality,
          addressRegion: salon.region,
          addressCountry: salon.country
        }
      }))
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: {
        '@id': `${SITE_CONFIG.url}/#organization`
      }
    }
  ]
}
