import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'
import { getSiteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { path: '/calculators', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/sitemap', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/protein-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/macro', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/daily-calorie-needs-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bmi-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bmr-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/body-fat-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ideal-weight-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/water-intake-calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/qr-code-generator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/image-converter', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/image-compressor', priority: 0.8, changeFrequency: 'monthly' },
] as const

function absoluteUrl(path: string) {
  return `${getSiteUrl().replace(/\/$/, '')}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const posts = await getPosts()

  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00.000Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
