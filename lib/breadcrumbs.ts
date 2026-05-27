import { getSiteUrl } from '@/lib/seo'

type BreadcrumbListItem = {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

export type BreadcrumbListSchema = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbListItem[]
}

const NON_INDEXABLE_PATHS = new Set(['/add-blog'])

const SEGMENT_LABELS: Record<string, string> = {
  bmi: 'BMI',
  'bmi-calculator': 'BMI Calculator',
  bmr: 'BMR',
  'bmr-calculator': 'BMR Calculator',
  'body-fat-calculator': 'Body Fat Calculator',
  'daily-calorie-needs-calculator': 'Daily Calorie Needs Calculator',
  'ideal-weight-calculator': 'Ideal Weight Calculator',
  'image-compressor': 'Image Compressor',
  'image-converter': 'Image Converter',
  macro: 'Macro Calculator',
  'privacy-policy': 'Privacy Policy',
  protein: 'Protein Calculator',
  'protein-calculator': 'Protein Calculator',
  'qr-code-generator': 'QR Code Generator',
  sitemap: 'Sitemap',
  'terms-and-conditions': 'Terms and Conditions',
  'water-intake-calculator': 'Water Intake Calculator',
}

function cleanPathname(pathname: string) {
  const pathOnly = pathname.split(/[?#]/)[0] || '/'
  const withoutTrailingSlash = pathOnly.replace(/\/+$/, '')

  return withoutTrailingSlash || '/'
}

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

function segmentToName(segment: string) {
  const decodedSegment = decodeSegment(segment)
  const knownLabel = SEGMENT_LABELS[decodedSegment.toLowerCase()]

  if (knownLabel) {
    return knownLabel
  }

  return decodedSegment
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path === '/' ? '' : path}`
}

export function shouldRenderBreadcrumbSchema(pathname: string) {
  return !NON_INDEXABLE_PATHS.has(cleanPathname(pathname))
}

export function buildBreadcrumbListSchema(pathname: string): BreadcrumbListSchema {
  const normalizedPathname = cleanPathname(pathname)
  const segments =
    normalizedPathname === '/'
      ? []
      : normalizedPathname.split('/').filter(Boolean)

  const itemListElement: BreadcrumbListItem[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absoluteUrl('/'),
    },
  ]

  segments.forEach((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`

    itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segmentToName(segment),
      item: absoluteUrl(path),
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

export function serializeJsonLd(schema: BreadcrumbListSchema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}
