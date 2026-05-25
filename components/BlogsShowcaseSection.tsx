'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowUpRight,FiZap  } from 'react-icons/fi'

const ease = [0.22, 1, 0.36, 1] as const

export default function BlogsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // 1. Track scroll progress specifically for this section
  // Trigger starts when the top of the section enters the bottom of the viewport
  // and ends when the bottom of the section leaves the top of the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // 2. Create smooth spring values for the parallax effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // 3. Parallax Transforms (Depth Layers)
  // Background moves slowest, content moves medium, icons move fastest
  const bgY = useTransform(smoothProgress, [0, 1], [-100, 100])
  const contentY = useTransform(smoothProgress, [0, 1], [80, -80])
  const iconY = useTransform(smoothProgress, [0, 1], [150, -150])
  
  // Scale and Opacity: Section "grows" as it centers and "shrinks" as it leaves
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef}
      className="relative left-1/2 flex min-h-[calc(100vh-88px)] w-screen -translate-x-1/2 items-center overflow-hidden bg-[#f7f5f1] py-14 text-slate-950 dark:bg-[#030712] dark:text-white sm:py-16 lg:min-h-screen lg:py-20"
    >
      {/* ── BACKGROUND LAYER (Slow Parallax) ── */}
      <motion.div 
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.2]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.14)_1px,transparent_1px)] bg-[size:52px_52px] dark:bg-[linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.75)_0,rgba(247,245,241,0.94)_58%,#f7f5f1_100%)] dark:bg-[radial-gradient(circle_at_50%_28%,rgba(34,211,238,0.08)_0,rgba(3,7,18,0.7)_55%,#030712_100%)]" />
      </motion.div>

      {/* Floating Glows */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-20 h-56 w-56 rounded-full bg-cyan-300/16 blur-3xl dark:bg-cyan-400/12"
        animate={reduceMotion ? undefined : { y: [-10, 14, -10], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── DECORATION LAYER (Fast Parallax) ── */}
      <motion.div 
        aria-hidden="true" 
        style={{ y: iconY }}
        className="pointer-events-none absolute left-10 top-[20%] hidden rotate-[-18deg] gap-2 sm:flex"
      >
        <span className="h-12 w-4 rounded-full border-[4px] border-orange-500" />
        <span className="h-16 w-4 rounded-full border-[4px] border-orange-500" />
        <span className="h-11 w-4 rounded-full border-[4px] border-orange-500" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: iconY, rotate: -15 }}
        className="pointer-events-none absolute right-[6%] top-[1%] hidden text-violet-500 dark:text-cyan-300 lg:block"
      >
        <FiZap   className="h-24 w-24 stroke-[1.2] " />
      </motion.div>

      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ 
            y: contentY, 
            scale: reduceMotion ? 1 : scale, 
            opacity 
          }}
          className="relative mx-auto text-center"
        >
          {/* Subtle glow behind text */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-48 max-w-5xl -translate-y-1/2 rounded-full bg-white/45 blur-3xl dark:bg-white/[0.035]" />

          <div className="relative">
            <motion.h2
              className="mx-auto max-w-6xl text-balance text-[clamp(3.1rem,9.1vw,8.8rem)] font-black uppercase leading-[0.84] tracking-tight text-[#1f1d1d] dark:text-white"
            >
              Simple Ideas for Better Everyday Life
            </motion.h2>

            <motion.p
              className="mx-auto mt-7 max-w-2xl text-center text-base font-medium leading-7 text-slate-800 dark:text-slate-300 sm:text-lg sm:leading-8"
            >
              Explore thoughtful perspectives on technology, wellness, productivity, and everyday growth, written for clear decisions and calmer momentum.
            </motion.p>

            <motion.div className="mt-10 flex justify-center">
              <Link
                href="/blog"
                className="group relative inline-flex items-center overflow-hidden rounded-2xl border border-slate-950 bg-slate-950 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_22px_54px_rgba(15,23,42,0.22)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_28px_70px_rgba(124,58,237,0.24)] dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_22px_54px_rgba(0,0,0,0.36)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-95 transition duration-500 group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2 transition duration-500 group-hover:text-white">
                  View All Blogs
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/16 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-white/18 dark:bg-slate-950/8">
                    <FiArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}