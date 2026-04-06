import type { Post } from '@/lib/posts'
import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'http://localhost:3000'

export const siteConfig = {
  name: 'Velmora',
  description: 'A thoughtful blog about technology, life, creativity, and growth.',
  author: 'Velmora',
  publisher: 'Velmora',
  imageAlt: 'Velmora blog covering technology, healthy living, productivity, and personal growth',
  defaultOgImage: '/opengraph-image',
  twitterHandle: '@velmora',
}

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!siteUrl) {
    return DEFAULT_SITE_URL
  }

  return siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    publisher: siteConfig.publisher,
    alternates: {
      canonical: '/',
    },
    keywords: [
      'Velmora',
      'blog',
      'technology',
      'lifestyle',
      'productivity',
      'writing',
      'Healthy Breakfast Ideas',
      'Weight Loss',
      'Best Oats in India',
      'Oats'
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: '/',
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: siteConfig.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [siteConfig.defaultOgImage],
    },
    category: 'technology',
  }
}

export function buildHomeMetadata(): Metadata {
  const title = 'Velmora | Tech, Health and Personal Growth'
  const description =
    'Discover practical articles on technology, productivity, healthy living, and personal growth at Velmora, with useful insights to improve everyday life.'

  return {
    title,
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: '/',
      title,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: 'Velmora homepage for technology, healthy breakfast, productivity, and personal growth articles',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.defaultOgImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  }
}

type StaticPageMetadataOptions = {
  title: string
  description: string
  path: string
  imageAlt?: string
}

export function buildStaticPageMetadata({
  title,
  description,
  path,
  imageAlt,
}: StaticPageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: path,
      title,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${title} | Velmora article on technology, healthy living, and personal growth`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.defaultOgImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  }
}

export function buildBlogPostMetadata(post: Post): Metadata {
  const description = post.excerpt
  const canonicalPath = `/blog/${post.slug}`
  const publishedTime = new Date(`${post.date}T00:00:00.000Z`).toISOString()
  const browserTitle = post.browserTitle ?? post.title

  return {
    title: browserTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      title: browserTitle,
      description,
      publishedTime,
      authors: [siteConfig.name],
      section: post.category,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: browserTitle,
      description,
      images: [post.image],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  }
}
