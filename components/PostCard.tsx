"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import type { Post } from '@/types/posts'

const categoryColors: Record<string, { bg: string; text: string }> = {
  Life: {
    bg: 'bg-purple-100/70 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
  },
  Tech: {
    bg: 'bg-cyan-100/70 dark:bg-cyan-900/40',
    text: 'text-cyan-700 dark:text-cyan-300',
  },
  General: {
    bg: 'bg-zinc-100/80 dark:bg-zinc-800/60',
    text: 'text-zinc-700 dark:text-zinc-300',
  },
  Lifestyle: {
    bg: 'bg-emerald-100/70 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  default: {
    bg: 'bg-pink-100/70 dark:bg-pink-900/40',
    text: 'text-pink-700 dark:text-pink-300',
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

    const rotateX = -(y - centerY) / 18
    const rotateY = (x - centerX) / 18

    // FIX 1: No transition during movement — instant response
    card.style.transition = 'box-shadow 0.15s ease'
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
    card.style.boxShadow = '0 24px 48px -12px rgba(0,0,0,0.25)'

    // FIX 2: Position glow, it's already inside the card so overflow-hidden clips it naturally
    glow.style.left = `${x}px`
    glow.style.top = `${y}px`
    glow.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    // FIX 1: Re-add transition only on reset so it eases back smoothly
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease'
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.boxShadow = ''

    glow.style.opacity = '0'
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // FIX 1: Remove transition-transform — JS controls this entirely
        className="relative h-full flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-900
          border border-zinc-200/60 dark:border-zinc-800
          shadow-md will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >

        {/* FIX 2: z-10 so glow renders above content */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute z-10 w-48 h-48 rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
            transition: 'opacity 0.2s ease, left 0s, top 0s',
          }}
        />

        {/* Image */}
        <div className="relative w-full h-[220px] overflow-hidden rounded-t-lg shrink-0">
          <Image
            src={post.image!}
            alt={post.alt || `${post.title} guide for Indian readers on Velmora`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <h2 className="text-[1.25rem] font-semibold text-zinc-800 dark:text-white leading-snug transition-colors duration-200 group-hover:text-violet-500">
            {post.title}
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-200/70 dark:border-zinc-800">
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

            <span className={`text-xs font-bold px-3 py-1 rounded-full ${color.bg} ${color.text}`}>
              {post.category}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
