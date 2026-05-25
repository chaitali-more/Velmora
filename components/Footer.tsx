import Image from 'next/image'
import Link from 'next/link'
import { FiCheckCircle, FiFileText, FiLock, FiShield } from 'react-icons/fi'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/tools', label: 'Tools' },
  { href: '/contact', label: 'Contact' },
]

const calculatorLinks = [
  { href: '/bmi', label: 'BMI Calculator' },
  { href: '/calorie', label: 'Calorie Calculator' },
  { href: '/protein', label: 'Protein Calculator' },
  { href: '/water', label: 'Water Intake Calculator' },
]

const toolLinks = [
  { href: '/qr-code-generator', label: 'QR Generator' },
  { href: '/image-converter', label: 'Converter' },
  { href: '/image-compressor', label: 'Compressor' },
  { href: '/tools', label: 'All Tools' },
]

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/contact', label: 'Contact Support' },
  { href: '/sitemap', label: 'Sitemap' },
]

const trustSignals = [
  {
    icon: FiShield,
    label: 'Free tools',
    description: 'Useful calculators and QR tools with no signup required.',
  },
  {
    icon: FiLock,
    label: 'Privacy minded',
    description: 'Simple browser-based tools designed to avoid unnecessary data collection.',
  },
  {
    icon: FiCheckCircle,
    label: 'No expiry QR',
    description: 'Generated QR codes keep working as long as the destination link works.',
  },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-slate-600 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
    >
      {label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="relative  overflow-hidden border-t border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-[#020711] dark:text-slate-300">
      {/* Background Decorative Blurs */}
      <div className="pointer-events-none absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute right-[-140px] bottom-0 h-80 w-80 rounded-full bg-violet-200/45 blur-3xl dark:bg-violet-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex">
              <Image
                src="/images/velmora-logo-white-black.png"
                alt="Velmora logo"
                width={184}
                height={57}
                className="block h-auto w-[150px] dark:hidden"
              />
              <Image
                src="/images/velmora-blogs-logo2.png"
                alt="Velmora logo"
                width={184}
                height={57}
                className="hidden h-auto w-[150px] dark:block"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
              Practical guides, health calculators, and simple online tools for everyday decisions.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100">
              <FiFileText className="h-3.5 w-3.5" />
              No Signup Required
            </div>
          </div>

          {/* Links Columns */}
          <nav aria-label="Quick links">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Quick Links</h2>
            <div className="mt-5 grid gap-3">
              {quickLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </div>
          </nav>

          <nav aria-label="Popular calculators">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Calculators</h2>
            <div className="mt-5 grid gap-3">
              {calculatorLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </div>
          </nav>

          <nav aria-label="Online tools">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Tools</h2>
            <div className="mt-5 grid gap-3">
              {toolLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </div>
          </nav>

          <nav aria-label="Legal information">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Legal</h2>
            <div className="mt-5 grid gap-3">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </div>
          </nav>
        </div>

        {/* Trust Signals Section */}
        <div className="mt-12 grid gap-4 border-t border-slate-200 pt-8 dark:border-white/10 md:grid-cols-3">
          {trustSignals.map((signal) => {
            const Icon = signal.icon
            return (
              <div
                key={signal.label}
                className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:border-cyan-200 dark:border-white/5 dark:bg-slate-900/50 dark:hover:border-cyan-500/30"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{signal.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{signal.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-200 pt-8 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              &copy; {new Date().getFullYear()} Velmora. All rights reserved.
            </p>
            <p className="max-w-md text-center text-[10px] leading-relaxed text-slate-400 dark:text-slate-600 md:text-right">
              Disclaimer: Information provided on Velmora is for general educational purposes only and does not constitute professional medical, legal, or financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}