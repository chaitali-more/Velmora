'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiGrid,
  FiImage,
  FiLayers,
  FiMinimize2,
  FiShield,
  FiZap,
} from 'react-icons/fi'

type Tool = {
  number: string
  title: string
  tagline: string
  href: string
  icon: React.ElementType
  accent: string
  glow: string
  metric: string
  features: string[]
  badges: string[]
  preview: ToolPreviewItem[]
}

type ToolPreviewItem = {
  label: string
  value: string
}

const ease = [0.22, 1, 0.36, 1] as const

const tools: Tool[] = [
 {
  number: '01',
  title: 'QR Code Generator',
  tagline: 'Generate high-quality QR codes for links, text, and contact details—instantly downloadable and ready to use anywhere.',
  href: '/qr-code-generator',
  icon: FiGrid,
  accent: 'from-cyan-300 via-sky-400 to-violet-500',
  glow: 'bg-cyan-300/30 dark:bg-cyan-400/14',

  metric: 'PNG',

  features: [
    'Instant generation',
    'Download ready output',
    'Works in browser',
    'No login required'
  ],

  badges: [
    'Fast',
    'Free',
    'No Login'
  ],

  preview: [
    { label: 'Format', value: 'PNG' },
    { label: 'Access', value: 'No signup needed' },
    { label: 'Use case', value: 'URLs, PDFs' },
  ],
},
  {
  number: '02',
  title: 'Image Converter',

  tagline: 'Convert PNG, JPG, and WebP images instantly in your browser with fast, secure processing.',

  href: '/image-converter',
  icon: FiImage,
  accent: 'from-fuchsia-300 via-violet-400 to-cyan-400',
  glow: 'bg-violet-400/25 dark:bg-violet-500/14',

  metric: '3 formats',

  features: [
    'Batch image conversion',
    'Adjustable quality settings',
    'Runs locally in your browser',
    'Instant download ready'
  ],

  badges: [
    'Fast',
    'Private',
    'Batch'
  ],

  preview: [
    { label: 'Formats', value: 'PNG, JPG, WebP' },
    { label: 'Processing', value: 'Runs locally (no upload)' },
    { label: 'Output', value: 'Single or ZIP download' },
  ],
},
  {
  number: '03',
  title: 'Image Compressor',

  tagline: 'Compress images instantly to reduce file size while maintaining quality—fast, secure, and browser-based.',

  href: '/image-compressor',
  icon: FiMinimize2,
  accent: 'from-blue-300 via-cyan-400 to-emerald-300',
  glow: 'bg-fuchsia-300/20 dark:bg-fuchsia-400/10',

  metric: 'Up to 70%',

  features: [
    'Adjustable compression levels',
    'Batch image compression',
    'Runs locally in your browser',
    'Instant download ready'
  ],

  badges: [
    'Fast',
    'Private',
    'Batch'
  ],

  preview: [
    { label: 'Formats', value: 'JPG, PNG, WebP' },
    { label: 'Control', value: 'Compression level slider' },
    { label: 'Processing', value: 'Runs locally (no upload)' },
  ],
}
]

function PreviewPill({ item }: { item: ToolPreviewItem }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {item.label}
      </p>
      <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{item.value}</p>
    </div>
  )
}

function ToolRow({
  tool,
  index,
  isOpen,
  onOpen,
  onToggle,
}: {
  tool: Tool
  index: number
  isOpen: boolean
  onOpen: () => void
  onToggle: () => void
}) {
  const reduceMotion = useReducedMotion()
  const Icon = tool.icon

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ delay: index * 0.07, duration: 0.62, ease }}
      onMouseEnter={onOpen}
      className={`group relative overflow-hidden border-t border-slate-200/80 transition duration-500 last:border-b dark:border-white/10 ${
        isOpen ? 'bg-white/62 dark:bg-white/[0.035]' : 'hover:bg-white/42 dark:hover:bg-white/[0.025]'
      }`}
    >
      <div className={`pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full ${tool.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 ${isOpen ? 'opacity-100' : ''}`} />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative flex w-full items-start gap-4 px-3 py-6 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-cyan-300/35 sm:gap-6 sm:px-5 sm:py-7 lg:px-7 lg:py-8"
      >
        <span className="mt-1 shrink-0 text-sm font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300 sm:text-base">
          {tool.number}
        </span>

        <span
          className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} text-white shadow-[0_18px_42px_rgba(79,70,229,0.3)] sm:inline-flex`}
        >
          <Icon className="h-6 w-6" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[clamp(1.8rem,7vw,1rem)] mb-4 font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white">
            {tool.title}
          </span>
          <span className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
              {tool.metric}
            </span>
            {tool.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-200/70 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100"
              >
                {badge}
              </span>
            ))}
          </span>
        </span>

        <span className="flex shrink-0 flex-col items-end gap-3">
          <span className="hidden text-sm font-bold text-slate-500 transition group-hover:text-slate-950 dark:text-slate-400 dark:group-hover:text-white md:block">
            {isOpen ? 'Ready to open' : 'Hover or tap'}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.06 : 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${tool.accent} text-white shadow-[0_14px_34px_rgba(79,70,229,0.28)]`}
          >
            <FiArrowUpRight className="h-5 w-5" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.58, ease }, opacity: { duration: 0.3 } }}
            className="relative overflow-hidden"
          >
            <div className="grid gap-6 px-3 pb-7 sm:px-5 lg:grid-cols-[1fr_0.78fr] lg:px-7 lg:pb-9">
              <div>
                <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
                  {tool.tagline}
                </p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {tool.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.04, duration: 0.35, ease }}
                      className="flex items-center gap-2.5 text-sm font-bold text-slate-700 dark:text-slate-200"
                    >
                      <FiCheckCircle className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={tool.href}
                    className="group/button relative inline-flex items-center overflow-hidden rounded-xl border border-slate-950 bg-slate-950 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_22px_54px_rgba(15,23,42,0.2)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_28px_70px_rgba(124,58,237,0.22)] dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_22px_54px_rgba(0,0,0,0.36)]"
                  >
                    <span className={`absolute inset-0 -translate-x-full bg-gradient-to-br ${tool.accent} opacity-95 transition duration-500 group-hover/button:translate-x-0`} />
                    <span className="relative flex items-center gap-2 transition duration-500 group-hover/button:text-white">
                      Generate Now
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/16 transition duration-500 group-hover/button:translate-x-1 group-hover/button:-translate-y-0.5 dark:bg-slate-950/8">
                        <FiArrowUpRight className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <FiShield className="h-4 w-4" />
                    Instant, No Setup
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {tool.preview.map((item) => (
                  <PreviewPill key={item.label} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function ToolsSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
  const driftY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-28, 28])

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-100 pb-12 pt-8 text-slate-950 dark:bg-[#030712] dark:text-white sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.26] dark:opacity-[0.22]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.13)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-slate-100/90 dark:bg-[#030712]/88" />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ y: driftY }}
        className="pointer-events-none absolute left-[7%] top-[12%] h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/12"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: driftY }}
        className="pointer-events-none absolute bottom-[8%] right-[7%] h-72 w-72 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/14"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300"
            >
              Everyday utilities
            </motion.p>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: 0.08, duration: 0.72, ease }}
              className="mt-3 max-w-5xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
            >
            Fast, safe & smart tools.
            </motion.h2>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: 0.16, duration: 0.72, ease }}
            className="max-w-xl lg:ml-auto"
          >
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:leading-7">
Explore powerful, easy-to-use tools built for speed and simplicity.
No clutter, no sign-ups—just instant results when you need them.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/80 bg-cyan-50 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100">
                <FiZap className="h-4 w-4" />
                {tools.length} tools live
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-violet-200/80 bg-violet-50 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-violet-800 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-100">
                <FiLayers className="h-4 w-4" />
                100% Free
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-xl bg-white/55 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl ring-1 ring-slate-200/55 dark:bg-slate-950/48 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] dark:ring-white/[0.06] sm:mt-12">
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineScale, transformOrigin: '0% 50%' }}
            className="h-1.5 bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
          />

          {tools.map((tool, index) => (
            <ToolRow
              key={tool.href}
              tool={tool}
              index={index}
              isOpen={openIndex === index}
              onOpen={() => setOpenIndex(index)}
              onToggle={() => setOpenIndex(index)}
            />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.62, ease }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/tools"
            className="group relative inline-flex items-center overflow-hidden rounded-xl border border-slate-950 bg-slate-950 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_22px_54px_rgba(15,23,42,0.2)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_28px_70px_rgba(124,58,237,0.22)] dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_22px_54px_rgba(0,0,0,0.36)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-95 transition duration-500 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2 transition duration-500 group-hover:text-white">
              View All Tools
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/16 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5 dark:bg-slate-950/8">
                <FiArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
