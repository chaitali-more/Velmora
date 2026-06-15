import type { Post } from '@/types/posts'
import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://www.velmoranow.in'
const MAX_META_DESCRIPTION_LENGTH = 160

export const siteConfig = {
  name: 'Velmora Now',
  description: 'Free online tools and calculators for health, fitness, productivity, and daily web utilities.',
  author: 'Velmora Now',
  publisher: 'Velmora Now',
  imageAlt: 'Velmora India blog for free online tools, health calculators, productivity, and healthy living',
  defaultOgImage: '/opengraph-image',
  randomOgImages: [
    '/velmora-now-og-image.png',
    '/velmora-now-og-image-free-tools.png',
    '/velmora-now-og-image-smart-tools.png',
  ],
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

function trimMetaDescription(description: string) {
  const normalizedDescription = description.replace(/\s+/g, ' ').trim()

  if (normalizedDescription.length <= MAX_META_DESCRIPTION_LENGTH) {
    return normalizedDescription
  }

  const shortenedDescription = normalizedDescription.slice(0, MAX_META_DESCRIPTION_LENGTH + 1)
  const lastSpaceIndex = shortenedDescription.lastIndexOf(' ')
  const trimmedDescription =
    lastSpaceIndex > 0
      ? shortenedDescription.slice(0, lastSpaceIndex)
      : shortenedDescription.slice(0, MAX_META_DESCRIPTION_LENGTH)

  return trimmedDescription.replace(/[,.!?;:]+$/, '')
}

function getRandomOgImage() {
  const imageIndex = Math.floor(Math.random() * siteConfig.randomOgImages.length)

  return siteConfig.randomOgImages[imageIndex] ?? siteConfig.defaultOgImage
}

function getStaticPageOgImage(path: string) {
  return path.startsWith('/blog') ? siteConfig.defaultOgImage : getRandomOgImage()
}

export function buildRootMetadata(): Metadata {
  const ogImage = getRandomOgImage()

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
      'max-image-preview': 'large',
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    other: {
      bingbot: 'index, follow',
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
          url: ogImage,
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
      images: [ogImage],
    },
    category: 'technology',
  }
}

export function buildHomeMetadata(): Metadata {
  const title = "Velmora Now - Free Online Tools & Calculators"
  const ogImage = getRandomOgImage()

  const description =
trimMetaDescription(
      "Access online tools including image compressor, QR code generator, and converters, along with BMI, calorie, and protein calculators for daily use."
    )
  return {
    title,
    description,
    keywords: [
      "Velmora","Velmora Now", "velmoranow",
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
      "free tools website",
      // Core keywords
      "online calculators",
      "image compressor",
      "qr code generator",
      "image converter",

      // Long-tail (high ranking potential)
      "online image compressor and converter",
      "qr code generator for links and pdf",
      "health calculators bmi calorie protein",
      "online tools for daily use",
      "browser based image tools",
      "fitness calculators for daily tracking",
      "online utility tools website",
      "multiple calculators in one place",
      "web tools for productivity and health",
      "online tools without software",

      // Intent-based keywords
      "use online tools",
      "access free calculators",
      "generate qr code online",
      "compress image online",
      "calculate bmi and calories",

      // Supporting SEO keywords
      "web based tools",
      "digital utility tools",
      "image optimization tools",
      "health tracking calculators",
      "online productivity utilities"
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
          url: ogImage,
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
      images: [ogImage],
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
  const metaDescription = trimMetaDescription(description)
  const ogImage = getStaticPageOgImage(path)

  return {
    title,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: path,
      title,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${title} for Indian readers on Velmora tools, calculators, and blog guides`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: [ogImage],
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
  const description = trimMetaDescription(post.excerpt)
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
