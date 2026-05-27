import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

function absoluteUrl(path: string) {
  return `${getSiteUrl().replace(/\/$/, '')}${path}`
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ai.txt', '/llm.txt'],
        disallow: ['/api/', '/add-blog/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  }
}
