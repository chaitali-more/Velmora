'use client'

import { useRef, useEffect, useCallback } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/* ─── data ─────────────────────────────────────────────── */

const particles = [
  { left: '7%',  top: '24%', size: 3, delay: 0.1 },
  { left: '14%', top: '67%', size: 2, delay: 1.6 },
  { left: '24%', top: '18%', size: 2, delay: 2.1 },
  { left: '31%', top: '78%', size: 4, delay: 0.8 },
  { left: '43%', top: '33%', size: 2, delay: 1.2 },
  { left: '52%', top: '66%', size: 3, delay: 2.8 },
  { left: '64%', top: '22%', size: 2, delay: 0.4 },
  { left: '73%', top: '57%', size: 4, delay: 1.9 },
  { left: '83%', top: '31%', size: 2, delay: 2.4 },
  { left: '91%', top: '72%', size: 3, delay: 0.7 },
  { left: '96%', top: '43%', size: 2, delay: 3.2 },
  { left: '38%', top: '12%', size: 2, delay: 2.7 },
] as const

const ribbons = [
  {
    className:
      'left-[-18%] top-[8%] h-[22rem] w-[138%] rotate-[-10deg] ' +
      'bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.32)_24%,rgba(139,92,246,0.32)_50%,rgba(244,114,182,0.26)_72%,transparent_100%)] ' +
      'dark:bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.24)_24%,rgba(167,139,250,0.24)_50%,rgba(244,114,182,0.2)_72%,transparent_100%)]',
    duration: 18, delay: 0, travel: 52,
  },
  {
    className:
      'left-[-26%] top-[43%] h-[18rem] w-[150%] rotate-[8deg] ' +
      'bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.22)_18%,rgba(56,189,248,0.28)_44%,rgba(168,85,247,0.28)_70%,transparent_100%)] ' +
      'dark:bg-[linear-gradient(90deg,transparent_0%,rgba(20,184,166,0.15)_18%,rgba(56,189,248,0.2)_44%,rgba(168,85,247,0.22)_70%,transparent_100%)]',
    duration: 22, delay: 2.4, travel: -44,
  },
] as const

const beams = [
  { left: '13%', height: '44%', delay: 0.2, duration: 7.5 },
  { left: '37%', height: '58%', delay: 1.6, duration: 8.4 },
  { left: '61%', height: '40%', delay: 0.9, duration: 7.9 },
  { left: '84%', height: '52%', delay: 2.2, duration: 9.2 },
] as const

/* floating feature chips that parallax independently */
const chips = [
  { label: 'Technology', color: 'from-cyan-400/20 to-cyan-400/5', border: 'border-cyan-400/20', dot: 'bg-cyan-400', left: '4%',  top: '18%', yFar: -60 },
  { label: 'Productivity', color: 'from-violet-400/20 to-violet-400/5', border: 'border-violet-400/20', dot: 'bg-violet-400', left: '78%', top: '22%', yFar: -90 },
  { label: 'Lifestyle', color: 'from-fuchsia-400/20 to-fuchsia-400/5', border: 'border-fuchsia-400/20', dot: 'bg-fuchsia-400', left: '3%',  top: '68%', yFar: 60 },
  { label: 'Fitness', color: 'from-emerald-400/20 to-emerald-400/5', border: 'border-emerald-400/20', dot: 'bg-emerald-400', left: '79%', top: '64%', yFar: 80 },
] as const

/* ─── component ─────────────────────────────────────────── */

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement | null>(null)
  const canvasRef     = useRef<HTMLCanvasElement | null>(null)
  const ripples       = useRef<{ x: number; y: number; r: number; alpha: number }[]>([])
  const rafRef        = useRef<number>(0)
  const reduceMotion  = useReducedMotion()

  /* pointer values */
  const pointerX    = useMotionValue(0)
  const pointerY    = useMotionValue(0)
  const pointerXPx  = useMotionValue(0)
  const pointerYPx  = useMotionValue(0)
  const pointerGlow = useMotionValue(0)

  /* smooth springs */
  const smoothX    = useSpring(pointerX,    { stiffness: 55, damping: 20, mass: 0.5 })
  const smoothY    = useSpring(pointerY,    { stiffness: 55, damping: 20, mass: 0.5 })
  const smoothXPx  = useSpring(pointerXPx,  { stiffness: 100, damping: 24, mass: 0.3 })
  const smoothYPx  = useSpring(pointerYPx,  { stiffness: 100, damping: 24, mass: 0.3 })
  const smoothGlow = useSpring(pointerGlow, { stiffness: 120, damping: 28, mass: 0.3 })

  /* lagging orb */
  const orbXPx    = useSpring(pointerXPx, { stiffness: 25, damping: 12, mass: 1.4 })
  const orbYPx    = useSpring(pointerYPx, { stiffness: 25, damping: 12, mass: 1.4 })
  const orbScaleV = useTransform(useSpring(pointerGlow, { stiffness: 70, damping: 18 }), [0, 1], [0.4, 1])

  /* scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  /* scroll progress bar width */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* parallax depths */
  const bgY     = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 160])
  const midY    = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90])
  const contentY     = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])
  const contentScale   = useTransform(scrollYProgress, [0, 0.62], [1, 0.88])

  /* rings */
  const ringRotate  = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 65])
  const ringRotateI = useTransform(ringRotate, v => v * -0.7)
  const ringScale   = useTransform(scrollYProgress, [0, 1], [1, 1.28])

  /* pointer→layer */
  const layerX   = useTransform(smoothX, [-1, 1], reduceMotion ? [0, 0] : [-22, 22])
  const layerY   = useTransform(smoothY, [-1, 1], reduceMotion ? [0, 0] : [-16, 16])
  const nearX    = useTransform(smoothX, [-1, 1], reduceMotion ? [0, 0] : [-50, 50])
  const nearY    = useTransform(smoothY, [-1, 1], reduceMotion ? [0, 0] : [-38, 38])

  /* title tilt */
  const titleRX  = useTransform(smoothY, [-1, 1], reduceMotion ? [0, 0] : [5, -5])
  const titleRY  = useTransform(smoothX, [-1, 1], reduceMotion ? [0, 0] : [-8, 8])

  /* accent line grows as you scroll in */
  const accentW  = useTransform(scrollYProgress, [0, 0.3], ['2.5rem', '12rem'])

  /* pointer light */
  const pointerLight = useMotionTemplate`radial-gradient(580px circle at ${smoothXPx}px ${smoothYPx}px, rgba(34,211,238,0.36), rgba(168,85,247,0.2) 35%, transparent 64%)`

  /* chip parallax — each chip gets its own scroll speed */
  const chip0Y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60])
  const chip1Y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -90])
  const chip2Y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0,  60])
  const chip3Y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0,  80])
  const chipYs = [chip0Y, chip1Y, chip2Y, chip3Y]
  const chipOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])

  /* ── ripple canvas ── */
  const drawRipples = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ripples.current = ripples.current.filter(r => r.alpha > 0.01)
    for (const rip of ripples.current) {
      ctx.beginPath()
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(34,211,238,${rip.alpha})`
      ctx.lineWidth = 1.2
      ctx.stroke()
      rip.r     += 2.8
      rip.alpha *= 0.955
    }
    rafRef.current = requestAnimationFrame(drawRipples)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    rafRef.current = requestAnimationFrame(drawRipples)
    return () => cancelAnimationFrame(rafRef.current)
  }, [drawRipples, reduceMotion])

  useEffect(() => {
    const canvas  = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const sync = () => { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(section)
    return () => ro.disconnect()
  }, [])

  /* ── handlers ── */
  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    pointerXPx.set(x); pointerYPx.set(y); pointerGlow.set(1)
    pointerX.set((x / rect.width)  * 2 - 1)
    pointerY.set((y / rect.height) * 2 - 1)
    if (!reduceMotion && Math.random() < 0.14)
      ripples.current.push({ x, y, r: 3, alpha: 0.5 })
  }
  function handlePointerLeave() {
    pointerX.set(0); pointerY.set(0); pointerGlow.set(0)
  }
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    for (let i = 0; i < 6; i++)
      ripples.current.push({ x, y, r: i * 7, alpha: 0.65 - i * 0.09 })
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className="relative left-1/2 min-h-[calc(100vh-76px)] w-screen -translate-x-1/2 overflow-hidden bg-slate-50 text-slate-950 [perspective:1400px] dark:bg-[#030712] dark:text-white"
    >

      {/* ── scroll progress bar ─────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ width: progressWidth }}
        className="pointer-events-none absolute top-0 left-0 z-50 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      />

      {/* ── deepest background ──────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY, x: layerX }}
        className="pointer-events-none absolute inset-[-14%]
          bg-[linear-gradient(135deg,#ecfeff_0%,#f0f4ff_22%,#eef2ff_45%,#faf5ff_68%,#fff1f2_100%)]
          dark:bg-[linear-gradient(135deg,#020617_0%,#060d1f_28%,#0d1124_50%,#1a1040_75%,#2d0a2e_100%)]"
      />

      {/* top radial glow */}
      <motion.div
        aria-hidden="true"
        style={{ y: midY, x: layerX }}
        className="pointer-events-none absolute inset-[-8%] blur-sm
          [background:radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.15)_55%,transparent_80%)]
          dark:[background:radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(34,211,238,0.14)_0%,rgba(124,58,237,0.08)_55%,transparent_80%)]"
      />

      {/* pointer-follow glow */}
      <motion.div
        aria-hidden="true"
        style={{ background: pointerLight, opacity: reduceMotion ? 0 : smoothGlow }}
        className="pointer-events-none absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
      />

      {/* ── outer ring ──────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ x: nearX, y: nearY, rotate: ringRotate, scale: ringScale }}
        className="pointer-events-none absolute left-1/2 top-1/2
          h-[min(76vw,44rem)] w-[min(76vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full
          border border-slate-900/8 opacity-50
          shadow-[inset_0_0_100px_rgba(14,165,233,0.2),0_0_80px_rgba(168,85,247,0.14)]
          [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]
          dark:border-white/8 dark:opacity-65
          dark:shadow-[inset_0_0_120px_rgba(34,211,238,0.16),0_0_100px_rgba(168,85,247,0.18)]"
      />

      {/* inner ring */}
      <motion.div
        aria-hidden="true"
        style={{ x: layerX, y: layerY, rotate: ringRotateI }}
        className="pointer-events-none absolute left-1/2 top-1/2
          h-[min(94vw,56rem)] w-[min(94vw,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-full
          border border-cyan-600/8 opacity-40
          [mask-image:linear-gradient(180deg,transparent,black_22%,black_74%,transparent)]
          dark:border-cyan-200/8"
      />

      {/* ── color ribbons ───────────────────────────────── */}
      {ribbons.map((ribbon) => (
        <motion.div
          key={ribbon.duration}
          aria-hidden="true"
          style={{ y: midY }}
          className={`pointer-events-none absolute rounded-[999px] blur-3xl ${ribbon.className}`}
          animate={reduceMotion ? undefined : { x: [0, ribbon.travel, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: ribbon.duration, delay: ribbon.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* diagonal stripes */}
      <motion.div
        aria-hidden="true"
        style={{ x: nearX, y: layerY }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.15]
          [background-image:linear-gradient(115deg,transparent_0_18%,rgba(15,23,42,0.3)_18.1%,transparent_18.5%_44%,rgba(6,182,212,0.3)_44.1%,transparent_44.5%_70%,rgba(168,85,247,0.26)_70.1%,transparent_70.5%)]
          dark:opacity-[0.2]
          dark:[background-image:linear-gradient(115deg,transparent_0_18%,rgba(255,255,255,0.28)_18.1%,transparent_18.5%_44%,rgba(34,211,238,0.36)_44.1%,transparent_44.5%_70%,rgba(244,114,182,0.28)_70.1%,transparent_70.5%)]"
      />

      {/* grid */}
      <motion.div
        aria-hidden="true"
        style={{ x: layerX, y: bgY }}
        className="pointer-events-none absolute inset-0
          bg-[linear-gradient(rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.07)_1px,transparent_1px)]
          bg-[size:52px_52px] opacity-40
          dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
          dark:opacity-22"
      />

      {/* beams */}
      {beams.map((beam) => (
        <motion.span
          key={beam.left}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 w-px bg-gradient-to-b from-transparent via-cyan-500/25 to-transparent dark:via-cyan-200/25"
          style={{ left: beam.left, height: beam.height, x: layerX }}
          animate={reduceMotion ? undefined : { opacity: [0.06, 0.5, 0.06], scaleY: [0.8, 1, 0.8] }}
          transition={{ duration: beam.duration, delay: beam.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* veil */}
      <div className="pointer-events-none absolute inset-0 bg-white/8 backdrop-blur-[0.5px] dark:bg-slate-950/20" />

      {/* fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-50 via-slate-50/70 to-transparent dark:from-[#030712] dark:via-[#030712]/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-slate-50/70 to-slate-50 dark:via-[#030712]/80 dark:to-[#030712]" />

      {/* ── particles ───────────────────────────────────── */}
      {particles.map((p) => (
        <motion.span
          key={`${p.left}-${p.top}`}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/65 shadow-[0_0_16px_rgba(255,255,255,0.65)] dark:bg-cyan-100/50"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, x: nearX, y: nearY }}
          animate={reduceMotion ? undefined : { opacity: [0.14, 0.82, 0.14], scale: [1, 1.7, 1] }}
          transition={{ duration: 5.8, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── magnetic orb ────────────────────────────────── */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ x: orbXPx, y: orbYPx, scale: orbScaleV, opacity: smoothGlow, translateX: '-50%', translateY: '-50%' }}
          className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-full blur-2xl
            bg-[radial-gradient(circle,rgba(34,211,238,0.5)_0%,rgba(168,85,247,0.3)_55%,transparent_78%)]"
        />
      )}

      {/* ── ripple canvas ───────────────────────────────── */}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-55 dark:opacity-75" />


      {/* ── main content ────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8"
      >
        {/* growing accent line */}
        <motion.div
          aria-hidden="true"
          style={{ width: accentW }}
          className="mb-6 h-px bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent dark:via-cyan-300/80"
          animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5], scaleX: [0.85, 1.1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Brand Chip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:border-cyan-400/25 dark:bg-cyan-950/20 dark:text-cyan-200"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          Velmora Now
        </motion.div>

        {/* 3D title */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease }}
          style={{ rotateX: titleRX, rotateY: titleRY, transformStyle: 'preserve-3d' }}
          className="max-w-6xl text-balance text-[clamp(3rem,8.8vw,7.7rem)] font-black uppercase leading-[0.84] tracking-tight
            text-slate-950 drop-shadow-[0_20px_40px_rgba(15,23,42,0.1)]
            dark:text-white dark:drop-shadow-[0_24px_44px_rgba(34,211,238,0.1)]"
        >
          Smart Tools for{' '}
          <span className="bg-gradient-to-br from-cyan-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent dark:from-cyan-200 dark:via-violet-300 dark:to-fuchsia-300">
            Smarter
          </span>{' '}
          Everyday Life
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.76, ease }}
          className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
        >
          Velmora Now is your go-to platform for free online calculators, utility tools, and health trackers. Discover powerful calculators, smart utilities, and blogs across fitness, technology, and productivity to help you make better decisions, every day.
        </motion.p>

        <motion.div
          aria-hidden="true"
          className="mt-9 flex items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.72, ease }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300" />
          <span className="h-px w-20 bg-gradient-to-r from-cyan-500/70 via-violet-500/70 to-fuchsia-500/70 dark:from-cyan-300/70 dark:via-violet-300/70 dark:to-fuchsia-300/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 dark:bg-fuchsia-300" />
        </motion.div>
      </motion.div>

    </section>
  )
}