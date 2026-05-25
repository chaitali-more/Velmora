import type { Metadata } from 'next'
import { connection } from 'next/server'
import AddBlogForm from '@/components/AddBlogForm'
import { getPosts } from '@/lib/posts'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...buildStaticPageMetadata({
    title: 'Add Blog',
    description:
      'Create and publish a new Velmora blog post with title, excerpt, image, category, and structured article content.',
    path: '/add-blog',
    imageAlt: 'Velmora India add blog editor for publishing SEO friendly articles',
    keywords: ['add blog', 'create blog post', 'Velmora editor', 'publish article'],
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

type AddBlogPageProps = {
  searchParams: Promise<{
    status?: string
    message?: string
    slug?: string
  }>
}

export default async function AddBlogPage({ searchParams }: AddBlogPageProps) {
  await connection()

  const posts = await getPosts()
  const params = await searchParams

  return (
    <AddBlogForm
      totalPosts={posts.length}
      status={params.status}
      message={params.message ? decodeURIComponent(params.message) : undefined}
      slug={params.slug}
    />
  )
}
