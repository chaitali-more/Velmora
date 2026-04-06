"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { Post } from '@/lib/posts'

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Life: {
    bg: 'bg-purple-100/70 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
    dot: 'bg-purple-500'
  },

  Tech: {
    bg: 'bg-blue-100/70 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500'
  },

  General: {
    bg: 'bg-zinc-100/80 dark:bg-zinc-800/60',
    text: 'text-zinc-700 dark:text-zinc-300',
    dot: 'bg-zinc-500'
  },

  Lifestyle: {
    bg: 'bg-emerald-100/70 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500'
  },

  default: {
    bg: 'bg-pink-100/70 dark:bg-pink-900/40',
    text: 'text-pink-700 dark:text-pink-300',
    dot: 'bg-pink-500'
  },
}

export default function PostCard({
  post,
}: {
  post: Post & {
    image?: string
    readingTime?: number
    author?: { name: string; avatar?: string }
  }
}) {
  const color = categoryColors[post.category] ?? categoryColors.default
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = -(y - centerY) / 20
    const rotateY = (x - centerX) / 20

    // Tilt effect
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `

    // Glow follows cursor
    glow.style.left = `${x}px`
    glow.style.top = `${y}px`
    glow.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `

    glow.style.opacity = '0'
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    className="group relative h-full flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-900 
border border-zinc-200/60 dark:border-zinc-800 
shadow-md hover:shadow-2xl 
transition-transform duration-300 ease-out will-change-transform"
    >

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full opacity-0 transition duration-300 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Image */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-t-lg">
        <Image
          src={post.image}
          alt={post.alt || `${post.title} | Velmora blog article on healthy living, technology, and personal growth`}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
      </div>

      {/* Content */}
<div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <h2 className="text-[1.25rem] font-semibold text-zinc-800 dark:text-white leading-snug group-hover:text-indigo-500 transition">
          {post.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
<div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-200/70 dark:border-zinc-800 ">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {post.date}
          </div>

          {/* Category */}
          <span
  className={`text-xs font-bold px-3 py-1 rounded-full ${color.bg} ${color.text}`}
>
  {post.category}
</span>

        </div>
      </div>
    </article>
    </Link>
  )
}
