// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPostBySlug, posts, type ListItem } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { buildBlogPostMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

function buildKeywordRichAlt(text?: string) {
  if (text && text.trim()) {
    return text
  }

  return 'Velmora blog image about healthy living, nutrition, technology, and personal growth'
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return buildBlogPostMetadata(post)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  // 🔥 Reading time
  const readingTime = Math.ceil(
    post.content
      .filter((b) => b.type === 'paragraph')
      .reduce((acc, b) => acc + b.text.length, 0) / 200
  )

  return (
    <article className="max-w-5xl mx-auto px-4 py-10">

      {/* Back */}
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-10 inline-block"
      >
        ← Back to all posts
      </Link>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          {post.category}
        </span>
        <span className="text-xs text-zinc-400">{post.date}</span>
        <span className="text-xs text-zinc-400">• {readingTime} min read</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Cover Image */}
      <div className="mb-10 overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.alt}
          width={1200}
          height={600}
          className="w-full h-[300px] md:h-[420px] object-cover"
          priority
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800 mb-10" />

      {/* Content */}
      <div className="space-y-6">

        {post.content.map((block, i) => {

          // ─── H2 Heading ───────────────────────────────────────────────
          if (block.type === 'heading') {
            return (
              <h2
                key={i}
                className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mt-8"
              >
                {block.text}
              </h2>
            )
          }

          // ─── H3 Sub-heading ───────────────────────────────────────────
          if (block.type === 'subheading') {
            return (
              <h3
                key={i}
                className="text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mt-6"
              >
                {block.text}
              </h3>
            )
          }

          // ─── Paragraph ────────────────────────────────────────────────
          if (block.type === 'paragraph') {
            return (
              <p
                key={i}
                className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base md:text-lg"
              >
                {block.text}
              </p>
            )
          }

          // ─── Bullet List ──────────────────────────────────────────────
          if (block.type === 'list') {
            return (
              <ul
                key={i}
                className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-base md:text-lg"
              >
                {block.items.map((item: ListItem, j: number) => (
                  <li key={j}>
                    {typeof item === 'string' || !item.href ? (
                      typeof item === 'string' ? item : item.text
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="underline decoration-zinc-300/10 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:text-white"
                        aria-label={item.label ?? item.text}
                      >
                        {item.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )
          }

          // ─── Numbered List ────────────────────────────────────────────
          if (block.type === 'numbered_list') {
            return (
              <ol
                key={i}
                className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-base md:text-lg"
              >
                {block.items.map((item: ListItem, j: number) => (
                  <li key={j}>
                    {typeof item === 'string' || !item.href ? (
                      typeof item === 'string' ? item : item.text
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:text-white"
                        aria-label={item.label ?? item.text}
                      >
                        {item.text}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            )
          }

          // ─── Horizontal Divider ───────────────────────────────────────
          if (block.type === 'divider') {
            return (
              <div
                key={i}
                className="h-px bg-zinc-200 dark:bg-zinc-800 my-8"
              />
            )
          }

          // ─── Inline Image with optional caption ───────────────────────
          if (block.type === 'image') {
            return (
              <figure key={i} className="my-8">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={block.src}
                    alt={buildKeywordRichAlt(block.alt)}
                    width={1200}
                    height={600}
                    className="w-full h-auto max-h-[480px] object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-zinc-400 dark:text-zinc-500 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          }

          // ─── Tip / Pro Tip callout ────────────────────────────────────
          if (block.type === 'tip') {
            return (
              <div
                key={i}
                className="
                  flex gap-3 items-start
                  rounded-xl p-4
                  bg-amber-50 dark:bg-amber-500/10
                  border border-amber-200 dark:border-amber-500/30
                "
              >
                <span className="text-xl shrink-0">💡</span>
                <p className="text-amber-800 dark:text-amber-300 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold">Pro Tip: </span>
                  {block.text}
                </p>
              </div>
            )
          }

          // ─── Info / Note callout ──────────────────────────────────────
          if (block.type === 'note') {
            return (
              <div
                key={i}
                className="
                  flex gap-3 items-start
                  rounded-xl p-4
                  bg-blue-50 dark:bg-blue-500/10
                  border border-blue-200 dark:border-blue-500/30
                "
              >
                <span className="text-xl shrink-0">📌</span>
                <p className="text-blue-800 dark:text-blue-300 text-sm md:text-base leading-relaxed">
                  {block.text}
                </p>
              </div>
            )
          }

          // ─── Comparison / Data Table ──────────────────────────────────
          if (block.type === 'table') {
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      {block.headers.map((header: string, j: number) => (
                        <th
                          key={j}
                          className="
                            px-4 py-3 text-left font-semibold
                            text-zinc-700 dark:text-zinc-200
                            border-b border-zinc-200 dark:border-zinc-700
                            whitespace-nowrap
                          "
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row: string[], rowIdx: number) => (
                      <tr
                        key={rowIdx}
                        className="
                          even:bg-zinc-50 dark:even:bg-zinc-900
                          hover:bg-zinc-100 dark:hover:bg-zinc-800
                          transition-colors duration-150
                        "
                      >
                        {row.map((cell: string, cellIdx: number) => (
                          <td
                            key={cellIdx}
                            className="
                              px-4 py-3
                              text-zinc-700 dark:text-zinc-300
                              border-b border-zinc-100 dark:border-zinc-800
                              align-top
                            "
                          >
                            {cellIdx === 0
                              ? <span className="font-medium text-zinc-900 dark:text-white">{cell}</span>
                              : cell
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          // ─── Image + Content Split ────────────────────────────────────
          //
          //  Default:  Image LEFT  │  Text RIGHT
          //  Reversed: Text LEFT   │  Image RIGHT  (set reverse: true)
          //  Mobile:   Always stacks → image on top, text below
          //
          //  All fields except image.src are optional.
          //
          //  Usage in posts.ts:
          //  {
          //    type: 'image_content',
          //    image: {
          //      src: '/images/poha.jpg',
          //      alt: 'Vegetable Poha bowl',
          //      caption: 'Ready in 15 minutes',   ← optional overlay text
          //    },
          //    badge: '🌿 Vegetarian',              ← optional pill label
          //    title: 'Vegetable Poha',             ← optional heading
          //    description: 'Light, fluffy...',     ← optional body text
          //    points: [                            ← optional bullet list
          //      '200–250 kcal per serving',
          //      'High in complex carbs',
          //      'Ready in 15 minutes',
          //    ],
          //    link: {                              ← optional CTA button
          //      href: '/blog/poha-recipe',
          //      label: 'Full recipe →',
          //    },
          //    reverse: false,                      ← optional, flips layout
          //  }
          //
          if (block.type === 'image_content') {
            return (
              <div
                key={i}
                className={`
                  group flex flex-col md:flex-row
                  ${block.reverse ? 'md:flex-row-reverse' : ''}
                  my-10 overflow-hidden rounded-2xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  shadow-sm hover:shadow-xl
                  transition-shadow duration-300
                `}
              >

                {/* ── Image Side (40% width on desktop) ── */}
                <div className="relative w-full md:w-2/5 min-h-[220px] md:min-h-[320px] shrink-0 overflow-hidden">
                  <Image
                    src={block.image.src}
                    alt={buildKeywordRichAlt(block.image.alt)}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Caption as bottom overlay */}
                  {block.image.caption && (
                    <span className="
                      absolute bottom-3 left-3
                      text-xs text-white/90
                      bg-black/40 backdrop-blur-sm
                      px-2.5 py-1 rounded-md
                    ">
                      {block.image.caption}
                    </span>
                  )}
                </div>

                {/* ── Content Side (60% width on desktop) ── */}
                <div className="flex flex-col justify-center gap-4 p-6 md:p-8 w-full">

                  {/* Optional badge pill */}
                  {block.badge && (
                    <span className="
                      self-start text-xs font-medium
                      px-3 py-1 rounded-full
                      bg-zinc-100 dark:bg-zinc-800
                      text-zinc-600 dark:text-zinc-400
                    ">
                      {block.badge}
                    </span>
                  )}

                  {/* Optional title */}
                  {block.title && (
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white leading-snug">
                      {block.title}
                    </h3>
                  )}

                  {/* Optional description */}
                  {block.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                      {block.description}
                    </p>
                  )}

                  {/* Optional bullet points */}
                  {block.points && block.points.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {block.points.map((point: string, j: number) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-sm md:text-base text-zinc-700 dark:text-zinc-300"
                        >
                          {/* Dot */}
                          <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Optional CTA link */}
                  {block.link && (
                    <a
                      href={block.link.href}
                      target={block.link.href.startsWith('http') ? '_blank' : undefined}
                      rel={block.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="
                        self-start mt-1
                        inline-flex items-center gap-2
                        text-sm font-medium
                        text-zinc-800 dark:text-zinc-200
                        border border-zinc-300 dark:border-zinc-700
                        px-4 py-2 rounded-full
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        transition-all duration-200
                        group/link
                      "
                    >
                      {block.link.label}
                      <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  )}

                </div>
              </div>
            )
          }

          // ─── CTA Banner (Hero style) ──────────────────────────────────
          if (block.type === 'cta_banner') {
            return (
              <div key={i} className="group relative overflow-hidden rounded-xl mt-12">
                <Image
                  src={block.image}
                  alt={buildKeywordRichAlt(block.title)}
                  fill
                  className="object-cover scale-100 group-hover:scale-110 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
                <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
                  <span className="inline-block mb-4 text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                    🔥 Recommended Tool
                  </span>
                  <h3 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">{block.title}</h3>
                  <p className="text-white/80 mb-8 text-base md:text-lg leading-relaxed">{block.description}</p>
                  <a
                    href={block.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.05]"
                  >
                    {block.buttonText}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60" />
              </div>
            )
          }

          // ─── CTA Inline ───────────────────────────────────────────────
          if (block.type === 'cta_inline') {
            return (
              <div key={i} className="group relative mt-4">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 blur-md transition" />
                <div className="relative rounded-xl p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01]">
                  <a href={block.link} target="_blank" className="flex items-center justify-between">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{block.text}</span>
                    <span className="ml-3 animate-pulse group-hover:translate-x-1 transition">→</span>
                  </a>
                </div>
              </div>
            )
          }

          // ─── CTA Card ─────────────────────────────────────────────────
          if (block.type === 'cta_card') {
            return (
              <div key={i} className="group relative mt-10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-2xl p-6 md:p-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                      🔥 Recommended
                    </span>
                    <span className="text-xs text-zinc-400">Used daily</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-zinc-900 dark:text-white">{block.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">{block.description}</p>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-800 mb-5" />
                  <div className="flex items-center justify-between">
                    <a
                      href={block.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.04]"
                    >
                      {block.buttonText}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                    <span className="text-xs text-zinc-400 hidden sm:block">No signup required</span>
                  </div>
                </div>
              </div>
            )
          }

          // ─── CTA Simple ───────────────────────────────────────────────
          if (block.type === 'cta_simple') {
            return (
              <div key={i} className="mt-8 text-center">
                <a
                  href={block.link}
                  target="_blank"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
                >
                  <span className="relative">
                    {block.text}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="hidden md:block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            )
          }

          return null
        })}

      </div>

    </article>
  )
}


