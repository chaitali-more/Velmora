'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  FiActivity,
  FiArrowUpRight,
  FiBarChart2,
  FiDroplet,
  FiHeart,
  FiTarget,
  FiThermometer,
  FiZap,
} from 'react-icons/fi'

const calculators = [
  {
    title: 'Protein Calculator',
    description: 'Calculate your daily protein intake based on weight, goals, and activity level for muscle gain and recovery.',
    href: '/protein',
    metric: 'g/day',
    accent: 'from-cyan-300 via-sky-400 to-violet-500',
    icon: FiZap,
  },
  {
    title: 'Macro Calculator',
    description: 'Find the right balance of protein, carbs, and fats based on your fitness goals and daily activity.',
    href: '/macro',
    metric: 'P/C/F',
    accent: 'from-fuchsia-300 via-violet-400 to-cyan-400',
    icon: FiBarChart2,
  },
  {
    title: 'Calorie Calculator',
    description: 'Estimate your daily calorie needs for weight loss, maintenance, or muscle gain in seconds.',
    href: '/calorie',
    metric: 'kcal',
    accent: 'from-blue-300 via-cyan-400 to-emerald-300',
    icon: FiActivity,
  },
  {
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index (BMI) to understand if your weight is in a healthy range.',
    href: '/bmi',
    metric: 'BMI',
    accent: 'from-violet-300 via-blue-400 to-cyan-300',
    icon: FiTarget,
  },
  {
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) to know how many calories your body needs at rest.',
    href: '/bmr',
    metric: 'BMR',
    accent: 'from-sky-300 via-indigo-400 to-fuchsia-400',
    icon: FiThermometer,
  },
  {
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage to better understand your body composition and fitness level.',
    href: '/body-fat',
    metric: '% fat',
    accent: 'from-rose-300 via-fuchsia-400 to-violet-500',
    icon: FiHeart,
  },
  {
    title: 'Ideal Weight Calculator',
    description: 'Find your ideal weight range based on height, gender, and standard health formulas.',
    href: '/ideal-weight',
    metric: 'range',
    accent: 'from-indigo-300 via-violet-400 to-cyan-300',
    icon: FiTarget,
  },
  {
    title: 'Water Intake Calculator',
    description: 'Calculate how much water you should drink daily based on your body weight and activity level.',
    href: '/water',
    metric: 'litres',
    accent: 'from-cyan-200 via-blue-400 to-violet-500',
    icon: FiDroplet,
  },
] as const

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value))
}

function inverseLerp(start: number, end: number, value: number) {
  return clampProgress((value - start) / (end - start))
}

export default function SmartHealthCalculatorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scrollStage, setScrollStage] = useState(0)
  const reduceMotion = useReducedMotion()

  const activeCalculator = calculators[activeIndex]
  const introFade = reduceMotion ? 1 : 1 - inverseLerp(0.08, 0.22, scrollStage)
  const cardsStage = reduceMotion ? 1 : inverseLerp(0.16, 0.32, scrollStage)

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    if (!desktopQuery.matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduceMotion])

  useEffect(() => {
    if (!sectionRef.current || reduceMotion) {
      return
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    if (!desktopQuery.matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * 4.2}`,
      pin: true,
      scrub: 0.75,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextProgress = clampProgress(self.progress)
        const cardsProgress = inverseLerp(0.2, 1, nextProgress)
        const nextIndex = Math.min(
          calculators.length - 1,
          Math.floor(cardsProgress * calculators.length),
        )

        setProgress(cardsProgress)
        setScrollStage(nextProgress)
        setActiveIndex(nextIndex)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduceMotion) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const particles = Array.from({ length: 58 }, (_, index) => ({
      angle: index * 0.72,
      radius: 70 + (index % 11) * 18,
      speed: 0.0012 + (index % 7) * 0.00022,
      size: 1.2 + (index % 5) * 0.34,
      drift: (index % 2 === 0 ? 1 : -1) * (0.18 + (index % 4) * 0.05),
    }))

    let animationFrame = 0
    let pointerX = 0
    let pointerY = 0

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, width * ratio)
      canvas.height = Math.max(1, height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = (event.clientX - rect.left - rect.width / 2) / rect.width
      pointerY = (event.clientY - rect.top - rect.height / 2) / rect.height
    }

    const render = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect()
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      particles.forEach((particle, index) => {
        const depth = 0.6 + (index % 8) * 0.08
        const x =
          width / 2 +
          Math.cos(particle.angle + time * particle.speed) * particle.radius * depth +
          pointerX * 42 * depth
        const y =
          height / 2 +
          Math.sin(particle.angle * 1.35 + time * particle.speed) *
            particle.radius *
            particle.drift +
          pointerY * 36 * depth

        const gradient = context.createRadialGradient(x, y, 0, x, y, particle.size * 9)
        gradient.addColorStop(0, 'rgba(125, 211, 252, 0.42)')
        gradient.addColorStop(0.48, 'rgba(168, 85, 247, 0.16)')
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')

        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, particle.size * 9, 0, Math.PI * 2)
        context.fill()
      })

      animationFrame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove)
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduceMotion])

  const progressMarks = useMemo(
    () => calculators.map((calculator) => calculator.title.replace(' Calculator', '')),
    [],
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-8 text-slate-950 dark:bg-[#030712] dark:text-white sm:py-10 lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.22]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.13)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0,rgba(248,250,252,0.82)_58%,rgba(248,250,252,0.98)_100%)] dark:bg-[radial-gradient(circle_at_50%_35%,transparent_0,rgba(3,7,18,0.74)_56%,#030712_100%)]" />
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 h-full w-full opacity-75"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/12" />
      <div className="pointer-events-none absolute bottom-[8%] right-[6%] h-72 w-72 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/14" />
      <div className="pointer-events-none absolute left-[58%] top-[8%] h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-400/10" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:min-h-screen lg:px-8">
        <motion.div
          className="grid gap-8 pt-10 sm:pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:pt-14"
          animate={{
            opacity: introFade,
            y: -56 * (1 - introFade),
            height: introFade < 0.04 ? 0 : 'auto',
            marginBottom: introFade < 0.04 ? 0 : 56,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: introFade > 0.2 ? 'auto' : 'none' }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300"
            >
              Health Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
            >
           Smart Tools for Fitness
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.16, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl lg:ml-auto"
          >
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:leading-7">
              Calculate calories, BMI, BMR, macros, water intake, and more with fast, easy-to-use tools.
Get accurate insights to make smarter fitness decisions every day.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/calculators"
                className="group relative inline-flex items-center overflow-hidden rounded-2xl border border-slate-950 bg-slate-950 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_22px_54px_rgba(15,23,42,0.22)] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_28px_70px_rgba(124,58,237,0.24)] dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_22px_54px_rgba(0,0,0,0.36)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-95 transition duration-500 group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2 transition duration-500 group-hover:text-white">
                  Explore All Calculators
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/16 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-white/18 dark:bg-slate-950/8">
                    <FiArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
             
            </div>
          </motion.div>
        </motion.div>

        <div className="relative grid gap-5 pb-4 lg:hidden">
          {calculators.map((calculator, index) => {
            const Icon = calculator.icon

            return (
              <Link
                key={calculator.href}
                href={calculator.href}
                aria-label={`Open ${calculator.title}`}
                className="group relative block overflow-hidden rounded-[1.5rem] border border-white/45 bg-white/62 p-px shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-2xl transition duration-300 dark:border-white/[0.08] dark:bg-white/[0.06]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${calculator.accent} opacity-35 blur-2xl transition duration-300 group-hover:opacity-55`}
                />
                <div className="relative min-h-[360px] rounded-[calc(1.5rem-1px)] border border-white/50 bg-white/78 p-5 dark:border-white/10 dark:bg-slate-950/76">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${calculator.accent} text-white shadow-[0_18px_42px_rgba(79,70,229,0.34)]`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
                      {calculator.metric}
                    </p>
                    <h3 className="mt-3 text-[clamp(2rem,10vw,2.55rem)] font-black leading-tight tracking-tight text-slate-950 dark:text-white">
                      {calculator.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {calculator.description}
                    </p>
                  </div>

                  <div className="mt-9 flex items-center justify-between border-t border-slate-200/80 pt-5 dark:border-white/10">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      Open calculator
                    </span>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${calculator.accent} text-white shadow-[0_14px_34px_rgba(79,70,229,0.28)]`}
                    >
                      <FiArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <motion.div
          className="relative hidden min-h-[610px] flex-1 flex-col justify-center py-8 sm:min-h-[650px] sm:py-9 lg:flex lg:min-h-0 lg:py-0"
          animate={{
            opacity: cardsStage,
            y: 74 * (1 - cardsStage),
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: cardsStage > 0.7 ? 'auto' : 'none' }}
        >
          <div className="relative h-[540px] w-full overflow-hidden sm:h-[570px] lg:h-[560px]">
            {calculators.map((calculator, index) => {
              const Icon = calculator.icon
              let offset = index - activeIndex
              if (offset > calculators.length / 2) {
                offset -= calculators.length
              } else if (offset < -calculators.length / 2) {
                offset += calculators.length
              }
              const isActive = offset === 0
              const distance = Math.abs(offset)

              return (
                <div
                  key={calculator.href}
                  className="absolute left-1/2 top-1/2 w-[min(88vw,430px)] -translate-x-1/2 -translate-y-1/2 transform-gpu [perspective:1200px]"
                  style={{ zIndex: calculators.length - distance }}
                >
                  <motion.article
                    initial={false}
                    animate={{
                      x:
                        offset === 0
                          ? 0
                          : offset < 0
                            ? -Math.min(distance, 3) * 182
                            : Math.min(distance, 3) * 182,
                      y: isActive ? 0 : distance * 16,
                      scale: isActive ? 1 : Math.max(0.72, 0.92 - distance * 0.08),
                      opacity: isActive ? 1 : Math.max(0, 0.52 - distance * 0.14),
                      rotateY: isActive ? 0 : offset < 0 ? 15 : -15,
                      filter: isActive ? 'blur(0px)' : `blur(${Math.min(distance * 1.4, 4)}px)`,
                    }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    className="transform-gpu"
                  >
                    <Link
                      href={calculator.href}
                      tabIndex={isActive ? 0 : -1}
                      aria-label={`Open ${calculator.title}`}
                      className={`group relative block overflow-hidden rounded-[2rem] border bg-white/62 p-px shadow-[0_34px_90px_rgba(15,23,42,0.22)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 dark:bg-white/[0.06] ${
                        isActive
                          ? 'border-white/80 dark:border-white/18'
                          : 'border-white/35 dark:border-white/[0.08]'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${calculator.accent} opacity-60 blur-2xl transition duration-500 group-hover:opacity-70`}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${calculator.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
                      />
                      <div className="relative min-h-[500px] rounded-[calc(2rem-1px)] border border-white/60 bg-white/78 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-[530px] sm:p-7">
                        <div className="flex items-center justify-between gap-4">
                          <span
                            className={`inline-flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br ${calculator.accent} text-white shadow-[0_18px_42px_rgba(79,70,229,0.34)] sm:h-[68px] sm:w-[68px]`}
                          >
                            <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                          </span>
                          <span className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                            0{index + 1}
                          </span>
                        </div>

                        <div className="mt-10 sm:mt-12">
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
                            {calculator.metric}
                          </p>
                          <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                            {calculator.title}
                          </h3>
                          <p className="mt-5 min-h-[104px] text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
                            {calculator.description}
                          </p>
                        </div>

                        <div className="mt-10 flex items-center justify-between border-t border-slate-200/80 pt-6 dark:border-white/10">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            Open calculator
                          </span>
                          <span
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${calculator.accent} text-white shadow-[0_14px_34px_rgba(79,70,229,0.28)] transition duration-300 group-hover:rotate-12 group-hover:scale-110`}
                          >
                            <FiArrowUpRight className="h-5 w-5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                </div>
              )
            })}
          </div>

          <div className="relative mx-auto w-full max-w-6xl pb-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-300/70 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
              animate={{ width: `${Math.max(progress, (activeIndex + 1) / calculators.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500 sm:grid-cols-8">
            {progressMarks.map((mark, index) => (
              <button
                key={mark}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`truncate rounded-full px-2 py-1 text-center transition ${
                  index === activeIndex
                    ? 'bg-white/70 text-slate-950 shadow-sm dark:bg-white/10 dark:text-white'
                    : 'hover:bg-white/50 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-300'
                }`}
              >
                {mark}
              </button>
            ))}
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  )
}
