import { getSiteUrl } from '@/lib/seo'

type JsonLdSchema = Record<string, unknown>

function withTrailingSlash(url: string) {
  return `${url.replace(/\/$/, '')}/`
}

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

export function serializeJsonLd(schema: JsonLdSchema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl()
  const logoUrl = absoluteUrl('/images/velmora-logo-white-black.png')

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Velmora Now',
    alternateName: 'Velmora',
    url: withTrailingSlash(siteUrl),
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 512,
      height: 512,
    },
    image: logoUrl,
    description:
      'Velmora Now offers free online calculators, smart utility tools, converters, QR generators, image optimization tools, and health calculators including BMI, BMR, calorie, protein, and water intake calculators.',
    email: 'velmoranow@gmail.com',
    foundingDate: '2026',
    brand: {
      '@type': 'Brand',
      name: 'Velmora Now',
    },
    knowsAbout: [
      'Free Calculators',
      'Health Calculators',
      'BMI Calculator',
      'BMR Calculator',
      'Calorie Calculator',
      'Protein Calculator',
      'Water Intake Calculator',
      'QR Code Generator',
      'Image Compressor',
      'Image Converter',
      'Digital Tools',
      'velmoranow',
      'Velmora',
      'Velmora Now',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: absoluteUrl('/contact'),
      availableLanguage: ['English'],
    },
  }
}

export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: withTrailingSlash(siteUrl),
    name: 'Velmora Now',
    description:
      'Free online calculators, converters, health tools, QR generators, and productivity utilities.',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
