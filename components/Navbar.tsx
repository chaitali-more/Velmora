'use client'

import { type FocusEvent, useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'

const calculatorLinks = [
  { href: '/bmi', label: 'BMI Calculator' },
  { href: '/bmr', label: 'BMR Calculator' },
  { href: '/protein', label: 'Protein Calculator' },
  { href: '/macro', label: 'Macro Calculator' },
  { href: '/water', label: 'Water Intake Calculator' },
  { href: '/calorie', label: 'Calorie Calculator' },
  { href: '/body-fat', label: 'Body Fat Calculator' },
  { href: '/ideal-weight', label: 'Ideal Weight Calculator' },
   
 
]

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
]

const toolLinks = [
  { href: '/qr-code-generator', label: 'QR Code Generator' },
  { href: '/image-converter', label: 'Image Converter' },
  { href: '/image-compressor', label: 'Image Compressor' },
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
  const dark = useSyncExternalStore(subscribeToThemeChanges, getStoredDarkTheme, () => false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCalculatorsOpen, setMobileCalculatorsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState<'calculators' | 'tools' | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

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
    <nav className="relative z-40 bg-slate-100/90 backdrop-blur-xl dark:bg-[#030712]">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/velmora-logo-white-black.png"
              alt="Velmora India logo for free calculators, online tools, and healthy living blog"
              width={184}
              height={57}
              className="block h-auto w-[150px] dark:hidden sm:w-[184px]"
            />
            <Image
              src="/images/velmora-blogs-logo2.png"
              alt="Velmora dark theme logo for Indian tools, calculators, and productivity guides"
              width={184}
              height={57}
              className="hidden h-auto w-[150px] dark:block sm:w-[184px]"
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
                <div className="rounded-2xl border border-white/70 bg-white/95 p-2 shadow-[0_24px_54px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_54px_rgba(0,0,0,0.45)]">
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
                <div className="rounded-2xl border border-white/70 bg-white/95 p-2 shadow-[0_24px_54px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_24px_54px_rgba(0,0,0,0.45)]">
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
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mt-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/92 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:hidden">
            <div className="space-y-2">
              <Link href="/" className={`block ${getLinkClasses(pathname === '/')}`} onClick={closeMobileMenus}>
                Home
              </Link>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-950/60">
                <button
                  type="button"
                  onClick={() => setMobileCalculatorsOpen((current) => !current)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    calculatorsActive
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)]'
                      : 'text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>Calculators</span>
                  <FiChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileCalculatorsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileCalculatorsOpen ? (
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/calculators"
                      onClick={closeMobileMenus}
                      className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        pathname === '/calculators'
                          ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                          : 'bg-white text-slate-800 hover:bg-cyan-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Fitness and Health Calculators
                    </Link>
                    {calculatorLinks.map((calculator) => (
                      <Link
                        key={calculator.href}
                        href={calculator.href}
                        onClick={closeMobileMenus}
                        className={getDropdownLinkClasses(pathname === calculator.href)}
                      >
                        {calculator.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-950/60">
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen((current) => !current)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    toolsActive
                      ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)]'
                      : 'text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>Tools</span>
                  <FiChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileToolsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileToolsOpen ? (
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/tools"
                      onClick={closeMobileMenus}
                      className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        pathname === '/tools'
                          ? 'bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]'
                          : 'bg-white text-slate-800 hover:bg-cyan-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Free Online Tools
                    </Link>
                    {toolLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeMobileMenus}
                        className={getDropdownLinkClasses(pathname === tool.href)}
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {primaryLinks.slice(1).map((link) => (
                <Link key={link.href} href={link.href} className={`block ${getLinkClasses(isPrimaryLinkActive(link.href))}`} onClick={closeMobileMenus}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  )
}
