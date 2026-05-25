'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiImage,
  FiMinimize2,
  FiGrid,
  FiZap,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tool {
  number: string
  title: string
  tagline: string
  href: string
  icon: React.ElementType
  accentLight: string
  accentDark: string
  features: string[]
  badges: string[]
  preview: ToolPreviewItem[]
}

interface ToolPreviewItem {
  label: string
  value: string
  sub: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tools: Tool[] = [
  {
    number: '01',
    title: 'QR Code Generator',
    tagline:
      'Turn any URL, text, or contact into a crisp, downloadable QR code in seconds — no sign-up, no friction.',
    href: '/tools/qr-generator',
    icon: FiGrid,
    accentLight: '#0891b2',
    accentDark: '#67e8f9',
    features: [
      'Custom size & error correction',
      'PNG / SVG download',
      'Foreground & background colours',
      'Instant live preview',
    ],
    badges: ['Free', 'No Login', 'Instant'],
    preview: [
      { label: 'Output format', value: 'PNG · SVG', sub: 'Vector & raster' },
      { label: 'Error levels', value: 'L / M / Q / H', sub: 'Up to 30% recovery' },
      { label: 'Max content', value: '4,296 chars', sub: 'Alphanumeric mode' },
    ],
  },
  {
    number: '02',
    title: 'Image Converter',
    tagline:
      'Convert between PNG, JPEG, WebP, AVIF, and more — all client-side, so your files never leave the browser.',
    href: '/tools/image-converter',
    icon: FiImage,
    accentLight: '#7c3aed',
    accentDark: '#c4b5fd',
    features: [
      'PNG · JPG · WebP · AVIF · BMP',
      'Batch conversion support',
      'Quality & DPI control',
      'Zero server uploads',
    ],
    badges: ['Private', 'Batch', 'Fast'],
    preview: [
      { label: 'Formats', value: '8 types', sub: 'Modern & legacy' },
      { label: 'Processing', value: 'Client-side', sub: 'Files stay local' },
      { label: 'Batch limit', value: 'Unlimited', sub: 'Drop as many as needed' },
    ],
  },
  {
    number: '03',
    title: 'Image Compressor',
    tagline:
      'Shrink images without visible quality loss. Ideal for web performance, email attachments, or saving storage.',
    href: '/tools/image-compressor',
    icon: FiMinimize2,
    accentLight: '#0f766e',
    accentDark: '#5eead4',
    features: [
      'Lossless & lossy modes',
      'Side-by-side comparison',
      'Adjustable quality slider',
      'Preserves EXIF or strips it',
    ],
    badges: ['Lossless', 'Side-by-side', 'EXIF'],
    preview: [
      { label: 'Avg reduction', value: '~ 70 %', sub: 'Without visible loss' },
      { label: 'Formats in', value: 'PNG · JPG · WebP', sub: 'Auto-detected' },
      { label: 'Preview', value: 'Before / After', sub: 'Drag-split compare' },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function PreviewCard({ item }: { item: ToolPreviewItem }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-black/8 bg-black/[0.03] px-4 py-3 dark:border-white/8 dark:bg-white/[0.04]">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        {item.label}
      </p>
      <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
        {item.value}
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</p>
    </div>
  )
}

function ToolRow({ tool, isOpen, onToggle }: { tool: Tool; isOpen: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion()
  const Icon = tool.icon
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={rowRef}
      className={`border-b border-black/10 dark:border-white/10 ${isOpen ? '' : ''}`}
    >
      {/* ── Header row ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-6 py-7 text-left transition-colors duration-200 hover:opacity-80 sm:items-center sm:py-8 lg:py-9"
      >
        {/* Number */}
        <span
          className="mt-0.5 shrink-0 text-3xl font-black tracking-tight text-black/20 transition-colors duration-300 group-hover:text-black/40 dark:text-white/20 dark:group-hover:text-white/40 sm:mt-0 sm:text-4xl lg:text-5xl"
          aria-hidden="true"
        >
          {tool.number}
        </span>

        {/* Title block */}
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <h2
            className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {tool.title}
          </h2>

          {/* Badges — visible only when closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden items-center gap-2 sm:flex"
              >
                {tool.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* More details link */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span
            className="hidden text-sm font-medium text-slate-400 transition-colors duration-200 group-hover:text-slate-700 dark:group-hover:text-slate-200 sm:block"
            style={{ color: isOpen ? tool.accentLight : undefined }}
          >
            {isOpen ? 'View tool' : 'More details'}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
          >
            <FiArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      {/* ── Expanded panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: reduceMotion ? 0 : 0.4, ease: 'easeInOut' },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-10 pt-1 lg:pb-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
                {/* Left: description + features */}
                <div>
                  <p className="max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-300 sm:text-lg">
                    {tool.tagline}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {tool.features.map((feat, i) => (
                      <motion.li
                        key={feat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.12 + i * 0.06,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        <FiCheckCircle
                          className="h-4 w-4 shrink-0"
                          style={{ color: tool.accentLight }}
                        />
                        {feat}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={tool.href}
                      className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5"
                      style={{ backgroundColor: tool.accentLight }}
                    >
                      <Icon className="h-4 w-4" />
                      Open {tool.title}
                      <FiArrowUpRight className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <div className="flex items-center gap-2">
                      {tool.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: preview stat cards */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.22,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:w-56"
                >
                  {tool.preview.map((item) => (
                    <PreviewCard key={item.label} item={item} />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ToolsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="relative border-y border-black/10 bg-white py-16 text-slate-950 dark:border-white/10 dark:bg-[#0a0a0a] dark:text-white sm:py-20 lg:py-24">
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Soft ambient glow — adds atmosphere without being distracting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[120px] dark:opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[100px] dark:opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #0891b2, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500"
            >
              My tools
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {/* The word "utilitarian" (adj.) means something designed for practical use
                  rather than beauty — used here intentionally since these are utility tools.
                  Definition: "designed to be useful or practical rather than attractive" */}
              Utilitarian tools,{' '}
              <span className="italic text-slate-400 dark:text-slate-500">built for speed.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 lg:pb-1"
          >
            {/* Live count badge */}
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-4 py-2 dark:border-white/10 dark:bg-white/[0.04]">
              <FiZap className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {tools.length} tools live
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-4 py-2 dark:border-white/10 dark:bg-white/[0.04]">
              <FiLayers className="h-3.5 w-3.5 text-violet-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                100% free
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Tool accordion list ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top border of the list */}
          <div className="border-t border-black/10 dark:border-white/10" />

          {tools.map((tool, index) => (
            <ToolRow
              key={tool.href}
              tool={tool}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </motion.div>

        {/* ── Footer note — uses the word "nascent" (adj.) meaning "just beginning to exist" ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 text-sm text-slate-400 dark:text-slate-600"
        >
          {/* "Nascent" = just beginning to develop or emerge. Used here to describe tools still being built. */}
          More nascent tools are on the way —{' '}
          <Link
            href="/tools"
            className="font-medium underline underline-offset-2 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
          >
            see all tools →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}