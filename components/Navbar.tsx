'use client'

import { type FocusEvent, useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiActivity, FiBookOpen, FiChevronDown, FiGrid, FiHome, FiMenu, FiMoon, FiPhone, FiSun, FiTool, FiX } from 'react-icons/fi'

const calculatorLinks = [
  { href: '/bmi-calculator', label: 'BMI Calculator' },
  { href: '/bmr-calculator', label: 'BMR Calculator' },
  { href: '/protein-calculator', label: 'Protein Calculator' },
  { href: '/macro-calculator', label: 'Macro Calculator' },
  { href: '/water-intake-calculator', label: 'Water Intake Calculator' },
  { href: '/daily-calorie-needs-calculator', label: 'Calorie Calculator' },
  { href: '/body-fat-calculator', label: 'Body Fat Calculator' },
  { href: '/ideal-weight-calculator', label: 'Ideal Weight Calculator' },
   
 
]

const primaryLinks = [
  { href: '/', label: 'Home', icon: FiHome },
  { href: '/blog', label: 'Blogs', icon: FiBookOpen },
  { href: '/contact', label: 'Contact', icon: FiPhone },
]

const toolLinks = [
  { href: '/qr-code-generator', label: 'QR Code Generator' },
  { href: '/image-converter', label: 'Image Converter' },
  { href: '/image-compressor', label: 'Image Compressor' },
  { href: '/tools/word-counter', label: 'Word Counter' },
  { href: '/tools/text-case-converter', label: 'Text Case Converter' },
  { href: '/tools/password-generator', label: 'Password Generator' },
  { href: '/tools/percentage-calculator', label: 'Percentage Calculator' },
]

const THEME_CHANGE_EVENT = 'velmora-theme-change'

function getLinkClasses(isActive: boolean) {
  return `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
  }`
}

function getDropdownLinkClasses(isActive: boolean) {
  return `block rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
    isActive
      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
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
  const [desktopOpen, setDesktopOpen] = useState<'calculators' | 'tools' | null>(null)

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
    setMobileOpen(false)
    setMobileCalculatorsOpen(false)
    setMobileToolsOpen(false)
  }

  function closeDropdownFocus() {
    closeMobileMenus()
    setDesktopOpen(null)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  function handleDesktopMenuBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDesktopOpen(null)
    }
  }

  const calculatorsActive =
    pathname === '/calculators' || calculatorLinks.some((link) => pathname === link.href)
  const toolsActive = pathname === '/tools' || toolLinks.some((link) => pathname === link.href)
  const isPrimaryLinkActive = (href: string) =>
    href === '/blog' ? pathname === '/blog' || pathname.startsWith('/blog/') : pathname === href

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-100/88 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#030712]/92 dark:shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/velmora-logo-white-black.png"
              alt="Velmora India logo for free calculators, online tools, and healthy living blog"
              width={184}
              height={57}
              className="block h-auto w-[142px] dark:hidden sm:w-[184px]"
            />
            <Image
              src="/images/velmora-blogs-logo2.png"
              alt="Velmora dark theme logo for Indian tools, calculators, and productivity guides"
              width={184}
              height={57}
              className="hidden h-auto w-[142px] dark:block sm:w-[184px]"
            />
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/" className={getLinkClasses(pathname === '/')} onClick={closeMobileMenus}>
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDesktopOpen('calculators')}
              onMouseLeave={() => setDesktopOpen(null)}
              onFocus={() => setDesktopOpen('calculators')}
              onBlur={handleDesktopMenuBlur}
            >
              <Link
                href="/calculators"
                onClick={closeDropdownFocus}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  calculatorsActive
                    ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                Calculators
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    desktopOpen === 'calculators' ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              <div className="pointer-events-none absolute left-0 top-full z-20 h-3 w-full" />
              <div
                className={`absolute left-0 top-full z-20 w-80 pt-3 transition-all duration-200 ${
                  desktopOpen === 'calculators'
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="rounded-xl border border-white/70 bg-white/95 p-2 shadow-[0_24px_54px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_54px_rgba(0,0,0,0.45)]">
                <Link
                  href="/calculators"
                  onClick={closeDropdownFocus}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    pathname === '/calculators'
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                      : 'bg-gradient-to-r from-cyan-50 to-violet-50 text-slate-900 hover:from-cyan-100 hover:to-violet-100 hover:text-slate-900 dark:from-slate-800 dark:to-slate-800 dark:text-slate-100 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:hover:text-slate-100'
                  }`}
                >
                  Fitness and Health Calculators
                </Link>

                <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-1">
                  {calculatorLinks.map((calculator) => (
                    <Link
                      key={calculator.href}
                      href={calculator.href}
                      onClick={closeDropdownFocus}
                      className={getDropdownLinkClasses(pathname === calculator.href)}
                    >
                      {calculator.label}
                    </Link>
                  ))}
                </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setDesktopOpen('tools')}
              onMouseLeave={() => setDesktopOpen(null)}
              onFocus={() => setDesktopOpen('tools')}
              onBlur={handleDesktopMenuBlur}
            >
              <Link
                href="/tools"
                onClick={closeDropdownFocus}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  toolsActive
                    ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                Tools
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    desktopOpen === 'tools' ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              <div className="pointer-events-none absolute left-0 top-full z-20 h-3 w-full" />
              <div
                className={`absolute left-0 top-full z-20 w-72 pt-3 transition-all duration-200 ${
                  desktopOpen === 'tools'
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="rounded-xl border border-white/70 bg-white/95 p-2 shadow-[0_24px_54px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_54px_rgba(0,0,0,0.45)]">
                  <Link
                    href="/tools"
                    onClick={closeDropdownFocus}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      pathname === '/tools'
                        ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                        : 'bg-gradient-to-r from-cyan-50 to-violet-50 text-slate-900 hover:from-cyan-100 hover:to-violet-100 hover:text-slate-900 dark:from-slate-800 dark:to-slate-800 dark:text-slate-100 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:hover:text-slate-100'
                    }`}
                  >
                    Free Online Tools
                  </Link>

                  <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

                  <div className="space-y-1">
                    {toolLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeDropdownFocus}
                        className={getDropdownLinkClasses(pathname === tool.href)}
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {primaryLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClasses(isPrimaryLinkActive(link.href))} onClick={closeMobileMenus}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
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
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_10px_22px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:shadow-[0_10px_24px_rgba(0,0,0,0.28)] dark:hover:bg-slate-800 lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      </nav>

      <div
        className={`fixed inset-0 z-[80] bg-slate-950/78 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMobileMenus}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[90] flex h-[100dvh] max-h-[100dvh] w-[min(88vw,390px)] flex-col overflow-hidden overscroll-contain border-l border-white/70 bg-white shadow-[-24px_0_70px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[#070b16] dark:shadow-[-24px_0_70px_rgba(0,0,0,0.55)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
          <Link href="/" onClick={closeMobileMenus} className="shrink-0">
            <Image
              src="/images/velmora-logo-white-black.png"
              alt="Velmora mobile menu logo for free calculators and online tools"
              width={154}
              height={48}
              className="block h-auto w-[145px] dark:hidden"
            />
            <Image
              src="/images/velmora-blogs-logo2.png"
              alt="Velmora mobile dark menu logo for health calculators and productivity guides"
              width={154}
              height={48}
              className="hidden h-auto w-[145px] dark:block"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenus}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <div className="rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-4 dark:border-cyan-400/15 dark:from-cyan-400/10 dark:via-slate-900 dark:to-violet-500/10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">Velmora</p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Free health calculators, image tools, QR utilities, and practical guides.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link
              href="/calculators"
              onClick={closeMobileMenus}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-black text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              <FiActivity className="mx-auto mb-1 h-4 w-4 text-cyan-500" />
              Health
            </Link>
            <Link
              href="/tools"
              onClick={closeMobileMenus}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-black text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              <FiTool className="mx-auto mb-1 h-4 w-4 text-violet-500" />
              Tools
            </Link>
            <Link
              href="/blog"
              onClick={closeMobileMenus}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-black text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              <FiBookOpen className="mx-auto mb-1 h-4 w-4 text-fuchsia-500" />
              Blogs
            </Link>
          </div>

          <div className="mt-5 space-y-2">
            {primaryLinks.map((link) => {
              const Icon = link.icon
              const active = isPrimaryLinkActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenus}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.38)]'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-slate-950/70">
            <button
              type="button"
              onClick={() => setMobileCalculatorsOpen((current) => !current)}
              className={`flex min-h-12 w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition ${
                calculatorsActive
                  ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.38)]'
                  : 'text-slate-800 hover:bg-white dark:text-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <FiActivity className="h-5 w-5" />
                Calculators
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileCalculatorsOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileCalculatorsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="mt-2 space-y-1">
                  <Link
                    href="/calculators"
                    onClick={closeMobileMenus}
                    className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${
                      pathname === '/calculators'
                        ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white'
                        : 'bg-white text-slate-800 hover:bg-cyan-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <FiGrid className="h-4 w-4" />
                    All calculators
                  </Link>
                  {calculatorLinks.map((calculator) => (
                    <Link
                      key={calculator.href}
                      href={calculator.href}
                      onClick={closeMobileMenus}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                        pathname === calculator.href
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-100'
                          : 'text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {calculator.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-slate-950/70">
            <button
              type="button"
              onClick={() => setMobileToolsOpen((current) => !current)}
              className={`flex min-h-12 w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition ${
                toolsActive
                  ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.38)]'
                  : 'text-slate-800 hover:bg-white dark:text-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <FiTool className="h-5 w-5" />
                Tools
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ${mobileToolsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="mt-2 space-y-1">
                  <Link
                    href="/tools"
                    onClick={closeMobileMenus}
                    className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${
                      pathname === '/tools'
                        ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white'
                        : 'bg-white text-slate-800 hover:bg-cyan-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <FiGrid className="h-4 w-4" />
                    All tools
                  </Link>
                  {toolLinks.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={closeMobileMenus}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                        pathname === tool.href
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-100'
                          : 'text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
