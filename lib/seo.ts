import type { Post } from '@/types/posts'
import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://www.velmoranow.in'

export const siteConfig = {
  name: 'Velmora',
  description: 'A thoughtful blog about technology, life, creativity, and growth.',
  author: 'Velmora',
  publisher: 'Velmora',
  imageAlt: 'Velmora India blog for free online tools, health calculators, productivity, and healthy living',
  defaultOgImage: '/opengraph-image',
  twitterHandle: '@velmora',
}

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL

  if (!siteUrl) {
    return DEFAULT_SITE_URL
  }

  const absoluteSiteUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`

  return absoluteSiteUrl.replace(/\/$/, '')
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
  const title = "Velmora - Free Online Tools & Calculators"

  const description =
    "Explore Velmora for free online tools like image compressor, QR code generator, and converters, along with health calculators such as BMI, calorie, and protein calculators."

  return {
    title,
    description,
    keywords: [
      "Velmora",
      "free online tools",
      "image compressor",
      "QR code generator",
      "image converter",
      "health calculators",
      "BMI calculator",
      "calorie calculator",
      "protein calculator",
      "fitness tools",
      "tech blog",
      "productivity blog",
      "personal growth",
      "online utilities",
      "free tools website"
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: "Velmora India homepage with free online tools, health calculators, and productivity blog guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
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
  keywords?: string[]
}

export function buildStaticPageMetadata({
  title,
  description,
  path,
  imageAlt,
  keywords,
}: StaticPageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
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
          alt: imageAlt ?? `${title} for Indian readers on Velmora tools, calculators, and blog guides`,
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

type CalculatorMetadataOptions = {
  title: string
  description: string
  path: string
  keywords: string[]
}

export function buildCalculatorMetadata({
  title,
  description,
  path,
  keywords,
}: CalculatorMetadataOptions): Metadata {
  return buildStaticPageMetadata({
    title,
    description,
    path,
    keywords: [
      ...keywords,
      'Velmora calculator',
      'health calculator',
      'fitness calculator',
      'nutrition calculator',
    ],
    imageAlt: `${title} for Indian users on Velmora health and fitness calculators`,
  })
}

export function buildBlogPostMetadata(post: Post): Metadata {
  const description = post.excerpt
  const canonicalPath = `/blog/${post.slug}`
  const publishedTime = new Date(`${post.date}T00:00:00.000Z`).toISOString()
  const browserTitle = post.browserTitle ?? post.title

  return {
    title: browserTitle,
    description,
    keywords: [
      post.title,
      post.category,
      'Velmora',
      'blog article',
      'healthy living',
      'technology',
      'personal growth',
    ],
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
