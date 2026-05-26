import type { Metadata } from 'next'
import { connection } from 'next/server'
import PostList from '@/components/PostList'
import { getPosts } from '@/lib/posts'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Insights by Velmora',
  description:
    'Browse all Velmora blog posts on technology, fitness, productivity, healthy living, and personal growth.',
  path: '/blog',
  imageAlt: 'Velmora India blog posts on fitness calculators online tools productivity and healthy living',
  keywords: [
    'Velmora blog',
    'Insights by Velmora',
    'technology blog',
    'fitness blog',
    'productivity blog',
    'healthy living',
    'personal growth',
  ],
})

export default async function BlogPage() {
  await connection()

  const posts = await getPosts()

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="relative mb-10 max-w-3xl">
        <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/40" />

        <div className="relative">
          <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 transition duration-300 md:text-5xl dark:text-white">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
              Insights by Velmora
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A collection of thoughts on technology, life, and everything in between.
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          All Posts
        </h2>

        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <PostList initialPosts={posts} allPosts={posts} />
    </div>
  )
}
