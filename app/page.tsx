  // app/page.tsx
  import type { Metadata } from 'next'
  import { posts } from '@/lib/posts'
  import { buildHomeMetadata } from '@/lib/seo'
  import PostList from '@/components/PostList'

  export const metadata: Metadata = buildHomeMetadata()

  export default function HomePage() {
    const initialPosts = posts.slice(0, 4)

    return (
      <div className="max-w-5xl mx-auto px-4">
  {/* Hero */}
  <div className="relative mb-10 max-w-3xl">

    {/* subtle background glow */}
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-zinc-200/40 dark:bg-zinc-800/40 blur-3xl rounded-full pointer-events-none" />

    {/* content */}
    <div className="relative">

      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight mb-4 transition duration-300">
        <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
          Insights by Velmora
        </span>
      </h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
        A collection of thoughts on technology, life, and everything in between.
      </p>

    
    </div>

  </div>
        {/* Section Title */}
  <div className="mb-6 flex items-center gap-4">

    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
      All Posts
    </h2>

    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />

  </div>

        {/* Infinite Posts */}
        <PostList initialPosts={initialPosts} allPosts={posts} />

      </div>
    )
  }
