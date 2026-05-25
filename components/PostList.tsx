"use client"

import { useDeferredValue, useEffect, useEffectEvent, useRef, useState } from "react"
import type { Post } from "@/types/posts"
import PostCard from "./PostCard"
const PAGE_SIZE = 4
const ALL_CATEGORIES = "All"

type PostListProps = {
  initialPosts: Post[]
  allPosts: Post[]
}

export default function PostList({ initialPosts, allPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [hasMore, setHasMore] = useState(initialPosts.length < allPosts.length)
  const isLoadingRef = useRef(false)
  const pageRef = useRef(1)
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const hasCategoryFilter = selectedCategory !== ALL_CATEGORIES
  const isFiltering = normalizedQuery.length > 0 || hasCategoryFilter
  const categories = [ALL_CATEGORIES, ...new Set(allPosts.map((post) => post.category))]
  const visiblePosts = isFiltering
    ? allPosts.filter((post) => {
       const matchesQuery =
  normalizedQuery.length === 0 ||
  [post.title, post.category, post.excerpt, post.content].some((value) => {
    if (typeof value === "string") {
      return value.toLowerCase().includes(normalizedQuery)
    }

    // handle arrays (like content blocks)
    if (Array.isArray(value)) {
      return value
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    }

    return false
  })
        const matchesCategory =
          !hasCategoryFilter || post.category === selectedCategory

        return matchesQuery && matchesCategory
      })
    : posts

 const loadMore = useEffectEvent(async () => {
  if (isLoadingRef.current || !hasMore || isFiltering) {
    return
  }

  isLoadingRef.current = true

  try {
    const nextPage = pageRef.current + 1
    const res = await fetch(`/api/posts?page=${nextPage}`)
    const data: Post[] = await res.json()

    if (data.length > 0) {
      setPosts((prev) => {
        const existingSlugs = new Set(prev.map((post) => post.slug))
        const uniquePosts = data.filter((post) => !existingSlugs.has(post.slug))

        return uniquePosts.length > 0 ? [...prev, ...uniquePosts] : prev
      })
      pageRef.current = nextPage
      setPage(nextPage)

      // If less than limit → no more posts
      setHasMore(data.length === PAGE_SIZE)
    } else {
      setHasMore(false)
    }
  } catch (err) {
    console.error("Error loading posts", err)
  } finally {
    isLoadingRef.current = false
  }
})
 useEffect(() => {
  if (!hasMore || isFiltering) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 }
  )

  if (loaderRef.current) {
    observer.observe(loaderRef.current)
  }

  return () => observer.disconnect()
}, [page, hasMore, isFiltering])

  return (
    <>
   <div className="mb-10 rounded-xl border border-white/20 bg-white/60 p-6 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:bg-zinc-900/60 dark:border-zinc-800">

  <div className="flex flex-col gap-6 md:flex-row md:items-end">

    {/* Search */}
    <div className="flex-1">
      <label
        htmlFor="post-search"
        className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
      >
        Search Posts
      </label>

      <div className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-black focus-within:shadow-md dark:border-zinc-800 dark:bg-zinc-950">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          id="post-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts..."
          className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-white"
        />
      </div>
    </div>

    {/* Category */}
    <div className="md:w-[240px]">
      <label
        htmlFor="post-category"
        className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
      >
        Category
      </label>

      <div className="relative group">
        <select
          id="post-category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-3 pr-10 text-sm text-zinc-800 shadow-sm outline-none transition-all duration-300 focus:border-black focus:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 group-focus-within:text-black dark:group-focus-within:text-white transition"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>

  {/* Filters Info */}
  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">

    <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {hasCategoryFilter ? `Category: ${selectedCategory}` : "All Categories"}
    </span>

    <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {normalizedQuery ? `Search: ${query.trim()}` : "All Posts"}
    </span>

  </div>
</div>
      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 items-stretch sm:grid-cols-2">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          No posts found for: {query.trim()}
        </div>
      )}

      {!isFiltering && hasMore ? (
        <div
          ref={loaderRef}
          className="h-20 flex items-center justify-center text-sm text-zinc-400"
        >
          <div className="animate-pulse">Loading more posts...</div>
        </div>
      ) : null}

      {!isFiltering && !hasMore && posts.length > 0 ? (
        <div className="h-20 flex items-center justify-center text-sm text-zinc-400">
          No more posts
        </div>
      ) : null}
    </>
  )
}
