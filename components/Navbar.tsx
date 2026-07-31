'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiChevronDown,
  FiGrid,
  FiHome,
  FiMenu,
  FiMoon,
  FiPhone,
  FiShield,
  FiSun,
  FiTool,
  FiX,
} from 'react-icons/fi'

type CalculatorItem = {
  href: string
  label: string
  category: 'Body & Fitness' | 'Energy & Calories' | 'Nutrition & Hydration'
  description: string
}

type ToolItem = {
  href: string
  label: string
  category: 'Developer Tools' | 'Media & Files' | 'Text & Productivity' | 'Math & Finance'
  description: string
}

const calculatorCategories: CalculatorItem[] = [
  {
    href: '/bmi-calculator',
    label: 'BMI Calculator',
    category: 'Body & Fitness',
    description: 'Calculate body mass index and health category.',
  },
  {
    href: '/body-fat-calculator',
    label: 'Body Fat Calculator',
    category: 'Body & Fitness',
    description: 'Estimate body fat percentage and lean mass.',
  },
  {
    href: '/ideal-weight-calculator',
    label: 'Ideal Weight Calculator',
    category: 'Body & Fitness',
    description: 'Find target weight range based on height.',
  },
  {
    href: '/bmr-calculator',
    label: 'BMR Calculator',
    category: 'Energy & Calories',
    description: 'Estimate basal metabolic rate & resting burn.',
  },
  {
    href: '/daily-calorie-needs-calculator',
    label: 'Calorie Calculator',
    category: 'Energy & Calories',
    description: 'Calculate daily calories for weight maintenance.',
  },
  {
    href: '/calories-burned-calculator',
    label: 'Calories Burned Calculator',
    category: 'Energy & Calories',
    description: 'Calculate calories burned during workouts & sports.',
  },
  {
    href: '/protein-calculator',
    label: 'Protein Calculator',
    category: 'Nutrition & Hydration',
    description: 'Determine daily protein targets for muscle & health.',
  },
  {
    href: '/macro-calculator',
    label: 'Macro Calculator',
    category: 'Nutrition & Hydration',
    description: 'Balance carbs, protein, and fats for your goals.',
  },
  {
    href: '/water-intake-calculator',
    label: 'Water Intake Calculator',
    category: 'Nutrition & Hydration',
    description: 'Daily hydration goals based on weight & activity.',
  },
]

const toolCategories: ToolItem[] = [
  {
    href: '/tools/json-formatter',
    label: 'JSON Formatter',
    category: 'Developer Tools',
    description: 'Beautify, minify, and clean up JSON code.',
  },
  {
    href: '/tools/json-validator',
    label: 'JSON Validator',
    category: 'Developer Tools',
    description: 'Validate syntax & debug line errors instantly.',
  },
  {
    href: '/tools/slug-generator',
    label: 'Slug Generator',
    category: 'Developer Tools',
    description: 'Convert titles into clean SEO-friendly URLs.',
  },
  {
    href: '/tools/password-generator',
    label: 'Password Generator',
    category: 'Developer Tools',
    description: 'Generate secure random passwords locally.',
  },
  {
    href: '/qr-code-generator',
    label: 'QR Code Generator',
    category: 'Media & Files',
    description: 'Create scannable QR codes with no watermark.',
  },
  {
    href: '/image-converter',
    label: 'Image Converter',
    category: 'Media & Files',
    description: 'Convert PNG, JPG, WebP, AVIF & PDF files.',
  },
  {
    href: '/tools/image-to-base64',
    label: 'Image to Base64',
    category: 'Media & Files',
    description: 'Convert image files to Base64 and vice versa.',
  },
  {
    href: '/image-compressor',
    label: 'Image Compressor',
    category: 'Media & Files',
    description: 'Reduce image file size without quality loss.',
  },
  {
    href: '/tools/word-counter',
    label: 'Word Counter',
    category: 'Text & Productivity',
    description: 'Count words, characters, sentences, & paras.',
  },
  {
    href: '/tools/text-case-converter',
    label: 'Text Case Converter',
    category: 'Text & Productivity',
    description: 'Convert UPPERCASE, lowercase, & Title Case.',
  },
  {
    href: '/tools/compare-text',
    label: 'Compare Text',
    category: 'Text & Productivity',
    description: 'Compare text and highlight additions & deletions.',
  },
  {
    href: '/tools/lorem-ipsum-generator',
    label: 'Lorem Ipsum Generator',
    category: 'Text & Productivity',
    description: 'Generate customizable placeholder dummy text.',
  },
  {
    href: '/tools/percentage-calculator',
    label: 'Percentage Calculator',
    category: 'Math & Finance',
    description: 'Calculate percentages & percentage changes.',
  },
  {
    href: '/tools/emi-calculator',
    label: 'EMI Calculator',
    category: 'Math & Finance',
    description: 'Calculate loan EMI & repayment schedules.',
  },
  {
    href: '/tools/sip-calculator',
    label: 'SIP Calculator',
    category: 'Math & Finance',
    description: 'Calculate mutual fund SIP & lumpsum returns.',
  },
  {
    href: '/tools/compound-interest-calculator',
    label: 'Compound Interest Calculator',
    category: 'Math & Finance',
    description: 'Calculate compound interest growth with deposits.',
  },
]

const THEME_CHANGE_EVENT = 'velmora-theme-change'

function getLinkClasses(isActive: boolean) {
  return `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(167,139,250,0.4)]'
      : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
  }`
}

function getStoredDarkTheme() {
  if (typeof window === 'undefined') {
    return true
  }
  return localStorage.getItem('theme') !== 'light'
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === 'theme') {
      onStoreChange()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange)
  }
}

export default function Navbar() {
  const pathname = usePathname()
  const dark = useSyncExternalStore(subscribeToThemeChanges, getStoredDarkTheme, () => true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCalculatorsOpen, setMobileCalculatorsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const [forceClosedMenu, setForceClosedMenu] = useState<'calculators' | 'tools' | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (!mobileOpen) return

    const scrollY = window.scrollY
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPosition = document.body.style.position
    const previousBodyTop = document.body.style.top
    const previousBodyWidth = document.body.style.width

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.width = previousBodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [mobileOpen])

  function toggleDark() {
    localStorage.setItem('theme', dark ? 'light' : 'dark')
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  function closeMobileMenus() {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setMobileOpen(false)
    setMobileCalculatorsOpen(false)
    setMobileToolsOpen(false)
  }

  function handleDropdownLinkClick(type: 'calculators' | 'tools') {
    closeMobileMenus()
    setForceClosedMenu(type)
  }

  const calculatorsActive =
    pathname === '/calculators' || calculatorCategories.some((link) => pathname === link.href)
  const toolsActive =
    pathname === '/tools' || toolCategories.some((link) => pathname === link.href)
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/')

  return (
    <>
      <nav className="relative sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#030712]/95 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/velmora-logo-white-black.png"
                alt="Velmora logo for free calculators, online tools, and blog"
                width={184}
                height={57}
                priority
                className="block h-auto w-[140px] dark:hidden sm:w-[175px]"
              />
              <Image
                src="/images/velmora-blogs-logo2.png"
                alt="Velmora dark mode logo for tools and calculators"
                width={184}
                height={57}
                priority
                className="hidden h-auto w-[140px] dark:block sm:w-[175px]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1.5 lg:flex">
              <Link href="/" className={getLinkClasses(pathname === '/')} onClick={closeMobileMenus}>
                Home
              </Link>

              {/* Desktop Calculators Dropdown Container */}
              <div
                className="group/calculators static"
                onMouseLeave={() => setForceClosedMenu(null)}
                onMouseEnter={() => setForceClosedMenu(null)}
              >
                <Link
                  href="/calculators"
                  onClick={closeMobileMenus}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    calculatorsActive
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(167,139,250,0.4)]'
                      : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
                  }`}
                >
                  <FiActivity className={`h-4 w-4 ${calculatorsActive ? 'text-white' : 'text-cyan-500'}`} />
                  Calculators
                  <FiChevronDown className={`h-4 w-4 transition-transform duration-200 group-hover/calculators:rotate-180 ${calculatorsActive ? 'text-white' : 'group-hover/calculators:text-cyan-400'}`} />
                </Link>

                {/* FULL-WIDTH DESKTOP MEGA MENU DROPDOWN - CALCULATORS */}
                <div
                  className={`pointer-events-none absolute left-0 right-0 top-full z-40 hidden w-full border-b border-slate-200/90 bg-white/98 shadow-2xl backdrop-blur-3xl transition-all duration-200 opacity-0 invisible dark:border-white/10 dark:bg-[#070d1b]/98 lg:block ${
                    forceClosedMenu === 'calculators'
                      ? '!pointer-events-none !visible-none !opacity-0 !invisible'
                      : 'group-hover/calculators:pointer-events-auto group-hover/calculators:visible group-hover/calculators:opacity-100'
                  }`}
                >
                  <div className="mx-auto max-w-7xl px-6 pb-6 pt-15 -mt-10">
                    <div className="mb-5 flex items-center justify-between border-b border-slate-200/80 pb-3.5 dark:border-white/10">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
                          <FiActivity className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                          Health & Fitness Calculators
                        </span>
                      </div>
                      <Link
                        href="/calculators"
                        onClick={() => handleDropdownLinkClick('calculators')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-violet-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        View All Calculators
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                      {(['Body & Fitness', 'Energy & Calories', 'Nutrition & Hydration'] as const).map(
                        (category) => (
                          <div key={category} className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                              {category}
                            </h3>
                            <div className="space-y-1">
                              {calculatorCategories
                                .filter((c) => c.category === category)
                                .map((calc) => (
                                  <Link
                                    key={calc.href}
                                    href={calc.href}
                                    onClick={() => handleDropdownLinkClick('calculators')}
                                    className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all ${
                                      pathname === calc.href
                                        ? 'bg-gradient-to-br from-cyan-400/15 via-violet-500/15 to-fuchsia-500/15 text-cyan-700 dark:text-cyan-200'
                                        : 'hover:bg-slate-100/90 dark:hover:bg-slate-900/90'
                                    }`}
                                  >
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 transition group-hover:scale-105 dark:bg-slate-800 dark:text-cyan-300">
                                      <FiActivity className="h-3.5 w-3.5" />
                                    </span>
                                    <div>
                                      <p className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-300">
                                        {calc.label}
                                      </p>
                                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
                                        {calc.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Tools Dropdown Container */}
              <div
                className="group/tools static"
                onMouseLeave={() => setForceClosedMenu(null)}
                onMouseEnter={() => setForceClosedMenu(null)}
              >
                <Link
                  href="/tools"
                  onClick={closeMobileMenus}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    toolsActive
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(167,139,250,0.4)]'
                      : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
                  }`}
                >
                  <FiTool className={`h-4 w-4 ${toolsActive ? 'text-white' : 'text-violet-500'}`} />
                  Tools
                  <FiChevronDown className={`h-4 w-4 transition-transform duration-200 group-hover/tools:rotate-180 ${toolsActive ? 'text-white' : 'group-hover/tools:text-cyan-400'}`} />
                </Link>

                {/* FULL-WIDTH DESKTOP MEGA MENU DROPDOWN - TOOLS */}
                <div
                  className={`pointer-events-none absolute left-0 right-0 top-full z-40 hidden w-full border-b border-slate-200/90 bg-white/98 shadow-2xl backdrop-blur-3xl transition-all duration-200 opacity-0 invisible dark:border-white/10 dark:bg-[#070d1b]/98 lg:block ${
                    forceClosedMenu === 'tools'
                      ? '!pointer-events-none !visible-none !opacity-0 !invisible'
                      : 'group-hover/tools:pointer-events-auto group-hover/tools:visible group-hover/tools:opacity-100'
                  }`}
                >
                  <div className="mx-auto max-w-7xl px-6 pb-6 pt-15 -mt-10">
                    <div className="mb-5 flex items-center justify-between border-b border-slate-200/80 pb-3.5 dark:border-white/10">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
                          <FiTool className="h-3.5 w-3.5 text-violet-600 dark:text-cyan-400" />
                          Free Online Developer & Web Utilities
                        </span>
                      </div>
                      <Link
                        href="/tools"
                        onClick={() => handleDropdownLinkClick('tools')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-violet-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        View All Tools
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                      {(['Developer Tools', 'Media & Files', 'Text & Productivity', 'Math & Finance'] as const).map(
                        (category) => (
                          <div key={category} className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                              {category}
                            </h3>
                            <div className="space-y-1">
                              {toolCategories
                                .filter((t) => t.category === category)
                                .map((tool) => (
                                  <Link
                                    key={tool.href}
                                    href={tool.href}
                                    onClick={() => handleDropdownLinkClick('tools')}
                                    className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all ${
                                      pathname === tool.href
                                        ? 'bg-gradient-to-br from-cyan-400/15 via-violet-500/15 to-fuchsia-500/15 text-cyan-700 dark:text-cyan-200'
                                        : 'hover:bg-slate-100/90 dark:hover:bg-slate-900/90'
                                    }`}
                                  >
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 transition group-hover:scale-105 dark:bg-slate-800 dark:text-violet-300">
                                      <FiTool className="h-3.5 w-3.5" />
                                    </span>
                                    <div>
                                      <p className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-300">
                                        {tool.label}
                                      </p>
                                      <p className="mt-0.5 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
                                        {tool.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/blog" className={getLinkClasses(isBlogActive)} onClick={closeMobileMenus}>
                Blogs
              </Link>
              <Link href="/contact" className={getLinkClasses(pathname === '/contact')} onClick={closeMobileMenus}>
                Contact
              </Link>
            </div>

            {/* Dark Mode Toggle & Mobile Menu Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleDark}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Toggle dark mode"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <FiSun
                    className={`absolute h-5 w-5 text-yellow-400 transition-all duration-500 ${
                      dark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                    }`}
                  />
                  <FiMoon
                    className={`absolute h-5 w-5 transition-all duration-500 ${
                      dark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_10px_24px_rgba(0,0,0,0.28)] dark:hover:bg-slate-800 lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER BACKDROP */}
      <div
        className={`fixed inset-0 z-[80] bg-slate-950/78 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMobileMenus}
        aria-hidden="true"
      />

      {/* CLEAN APP-LIKE MOBILE DRAWER MENU SLIDE-OUT */}
      <aside
        className={`fixed inset-y-0 right-0 z-[90] flex h-[100dvh] max-h-[100dvh] w-[min(90vw,400px)] flex-col overflow-hidden overscroll-contain border-l border-slate-200/80 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[#070b16] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 px-5 py-4 dark:border-white/10">
          <Link href="/" onClick={closeMobileMenus} className="shrink-0">
            <Image
              src="/images/velmora-logo-white-black.png"
              alt="Velmora mobile menu logo"
              width={154}
              height={48}
              priority
              className="block h-auto w-[140px] dark:hidden"
            />
            <Image
              src="/images/velmora-blogs-logo2.png"
              alt="Velmora mobile dark menu logo"
              width={154}
              height={48}
              priority
              className="hidden h-auto w-[140px] dark:block"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenus}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100/80 text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Content List */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-3">
          {/* Home Link */}
          <Link
            href="/"
            onClick={closeMobileMenus}
            className={`flex min-h-[48px] items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              pathname === '/'
                ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-lg'
                : 'border border-slate-200/80 bg-slate-50/60 text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <FiHome className={`h-5 w-5 ${pathname === '/' ? 'text-white' : 'text-cyan-500'}`} />
            Home
          </Link>

          {/* Calculators Expandable Mobile Item */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 overflow-hidden dark:border-white/10 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => setMobileCalculatorsOpen((prev) => !prev)}
              className={`flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-bold transition ${
                calculatorsActive
                  ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-lg'
                  : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-3.5">
                <FiActivity className={`h-5 w-5 ${calculatorsActive ? 'text-white' : 'text-cyan-500'}`} />
                Calculators
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileCalculatorsOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileCalculatorsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden bg-white dark:bg-slate-950">
                <div className="p-3 space-y-2">
                  <Link
                    href="/calculators"
                    onClick={closeMobileMenus}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                      pathname === '/calculators'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <span>All Health Calculators</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {Array.from(new Set(calculatorCategories.map((c) => c.category))).map((cat) => (
                    <div key={cat} className="pt-2">
                      <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {cat}
                      </p>
                      <div className="space-y-1">
                        {calculatorCategories
                          .filter((c) => c.category === cat)
                          .map((calc) => (
                            <Link
                              key={calc.href}
                              href={calc.href}
                              onClick={closeMobileMenus}
                              className={`block rounded-xl px-3 py-2 text-xs font-semibold transition ${
                                pathname === calc.href
                                  ? 'bg-cyan-100 text-cyan-900 dark:bg-cyan-400/20 dark:text-cyan-100'
                                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                              }`}
                            >
                              {calc.label}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools Expandable Mobile Item */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 overflow-hidden dark:border-white/10 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => setMobileToolsOpen((prev) => !prev)}
              className={`flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-bold transition ${
                toolsActive
                  ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-lg'
                  : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-3.5">
                <FiTool className={`h-5 w-5 ${toolsActive ? 'text-white' : 'text-violet-500'}`} />
                Tools
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileToolsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden bg-white dark:bg-slate-950">
                <div className="p-3 space-y-2">
                  <Link
                    href="/tools"
                    onClick={closeMobileMenus}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                      pathname === '/tools'
                        ? 'bg-violet-500 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <span>All Free Online Tools</span>
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {Array.from(new Set(toolCategories.map((t) => t.category))).map((cat) => (
                    <div key={cat} className="pt-2">
                      <p className="px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {cat}
                      </p>
                      <div className="space-y-1">
                        {toolCategories
                          .filter((t) => t.category === cat)
                          .map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              onClick={closeMobileMenus}
                              className={`block rounded-xl px-3 py-2 text-xs font-semibold transition ${
                                pathname === tool.href
                                  ? 'bg-violet-100 text-violet-900 dark:bg-violet-400/20 dark:text-violet-100'
                                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                              }`}
                            >
                              {tool.label}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blogs Link */}
          <Link
            href="/blog"
            onClick={closeMobileMenus}
            className={`flex min-h-[48px] items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              isBlogActive
                ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-lg'
                : 'border border-slate-200/80 bg-slate-50/60 text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <FiBookOpen className={`h-5 w-5 ${isBlogActive ? 'text-white' : 'text-fuchsia-500'}`} />
            Blogs
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            onClick={closeMobileMenus}
            className={`flex min-h-[48px] items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              pathname === '/contact'
                ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-lg'
                : 'border border-slate-200/80 bg-slate-50/60 text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <FiPhone className={`h-5 w-5 ${pathname === '/contact' ? 'text-white' : 'text-emerald-500'}`} />
            Contact Us
          </Link>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="border-t border-slate-200/80 p-4 text-center dark:border-white/10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50/60 px-3 py-1 text-[11px] font-bold text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-950/40 dark:text-cyan-200">
            <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            100% Free & Private Online Tools
          </span>
        </div>
      </aside>
    </>
  )
}
