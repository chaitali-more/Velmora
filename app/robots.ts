import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

function absoluteUrl(path: string) {
  return `${getSiteUrl().replace(/\/$/, '')}${path}`
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/add-blog/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  }
}
