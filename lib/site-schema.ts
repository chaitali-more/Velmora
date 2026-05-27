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

export function buildHomeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Velmora Now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Velmora Now is a free online platform offering health calculators, productivity tools, converters, QR generators, image tools, and daily-use utilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Velmora Now tools free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all tools and calculators available on Velmora Now are completely free to use online.',
        },
      },
      {
        '@type': 'Question',
        name: 'What calculators are available on Velmora Now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Velmora Now provides BMI, BMR, calorie, protein, water intake, and other health and fitness calculators.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Velmora Now provide online utility tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Velmora Now offers QR code generators, image compressors, converters, and various productivity tools for everyday use.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use Velmora Now tools on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all tools and calculators on Velmora Now are mobile-friendly and work across smartphones, tablets, and desktops.',
        },
      },
    ],
  }
}
