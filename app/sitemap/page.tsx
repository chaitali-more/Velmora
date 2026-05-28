import type { Metadata } from 'next'
import Link from 'next/link'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Sitemap - Explore All Pages, Tools & Calculators",
  description:
    "Browse the complete sitemap of Velmora, including all tools, calculators, blogs, and important pages. Easily navigate and discover free online tools, health calculators, and useful resources in one place.",
  path: "/sitemap",
  imageAlt: "Velmora India sitemap listing all free tools calculators blogs and policy pages",
  keywords: [
    "sitemap",
    "Velmora sitemap",
    "website sitemap",
    "all pages list",
    "tools and calculators sitemap",
    "Velmora tools",
    "Velmora calculators",
    "browse website pages",
    "site navigation page"
  ],
});
const mainPages = [
  {
    title: 'Home',
    href: '/',
    displayUrl: 'velmora.com/',
    description:
      'The main landing page of Velmora. Start from the main hub for free online tools, health calculators, and quick access to the blog.',
  },
  {
    title: 'All Fitness & Health Calculators',
    href: '/calculators',
    displayUrl: 'velmora.com/calculators',
    description:
      'A central hub for all Velmora health and fitness calculators, including BMI, BMR, calorie, protein, macro, body fat, ideal weight, and water intake tools.',
  },
  {
    title: 'Contact',
    href: '/contact',
    displayUrl: 'velmora.com/contact',
    description:
      'Have a question, suggestion, or feedback? Reach out to the Velmora team through the contact page. Whether it is about a blog post, a tool, or a general enquiry, we are happy to hear from you.',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
    displayUrl: 'velmora.com/privacy-policy',
    description:
      'A transparent explanation of what data Velmora collects, how it is used, and your rights as a visitor. Since Velmora requires no login or account, your privacy is kept simple and minimal by design.',
  },
  {
    title: 'Terms and Conditions',
    href: '/terms-and-conditions',
    displayUrl: 'velmora.com/terms-and-conditions',
    description:
      'The rules and guidelines that govern your use of Velmora. This page covers acceptable use, intellectual property, disclaimers for our free tools, and our limitation of liability, all written in plain, easy-to-understand language.',
  },
]

const toolPages = [
  {
    title: 'All Free Online Tools',
    href: '/tools',
    displayUrl: 'velmora.com/tools',
    description:
      'Browse all Velmora browser tools in one place, including the QR code generator, image converter, and image compressor. Start from this hub when you want quick, no-signup utilities.',
  },
  {
    title: 'QR Code Generator',
    href: '/qr-code-generator',
    displayUrl: 'velmora.com/qr-code-generator',
    description:
      'Create free QR codes online for website URLs and PDF links. This browser-friendly Velmora tool needs no signup, adds no watermark, and helps you share links quickly from any device.',
  },
  {
    title: 'Image Converter',
    href: '/image-converter',
    displayUrl: 'velmora.com/image-converter',
    description:
      'Convert images to JPG, PNG, or WebP directly in your browser. The Velmora image converter keeps files on your device, supports batch conversion, and provides fast downloads without signup or watermark.',
  },
  {
    title: 'Image Compressor',
    href: '/image-compressor',
    displayUrl: 'velmora.com/image-compressor',
    description:
      'Reduce JPG, PNG, and WebP image file sizes with Velmoraâ€™s free image compressor. Compress images locally in your browser, compare saved size, and download individual files or a ZIP.',
  },
]

const calculatorPages = [
  {
    title: 'Protein Calculator',
    href: '/protein-calculator',
    displayUrl: 'velmora.com/protein-calculator',
    description:
      'Calculates your daily protein requirement based on your body weight, activity level, and fitness goal, whether you are building muscle, losing fat, or maintaining your current physique.',
  },
  {
    title: 'Macro Calculator',
    href: '/macro-calculator',
    displayUrl: 'velmora.com/macro-calculator',
    description:
      'Breaks down your ideal daily intake of carbohydrates, proteins, and fats based on your calorie goal and body composition, a handy guide for anyone tracking their nutrition.',
  },
  {
    title: 'Calorie Calculator',
    href: '/daily-calorie-needs-calculator',
    displayUrl: 'velmora.com/daily-calorie-needs-calculator',
    description:
      'Estimates how many calories you need per day to maintain, lose, or gain weight. Results are personalised using your age, gender, height, weight, and activity level.',
  },
  {
    title: 'BMI Calculator',
    href: '/bmi-calculator',
    displayUrl: 'velmora.com/bmi-calculator',
    description:
      'Calculates your Body Mass Index using your height and weight to give a general indication of whether you fall in the underweight, normal, overweight, or obese range.',
  },
  {
    title: 'BMR Calculator',
    href: '/bmr-calculator',
    displayUrl: 'velmora.com/bmr-calculator',
    description:
      'Finds your Basal Metabolic Rate, the number of calories your body needs at complete rest just to sustain vital functions like breathing, circulation, and cell repair.',
  },
  {
    title: 'Body Fat Calculator',
    href: '/body-fat-calculator',
    displayUrl: 'velmora.com/body-fat-calculator',
    description:
      'Estimates your body fat percentage using key body measurements. Understanding your body fat helps set more realistic fitness goals beyond what the scale alone can tell you.',
  },
  {
    title: 'Ideal Weight Calculator',
    href: '/ideal-weight-calculator',
    displayUrl: 'velmora.com/ideal-weight-calculator',
    description:
      'Provides an estimated ideal weight range tailored to your height, age, and gender using widely recognised health formulas, useful as a general reference point for your wellness journey.',
  },
  {
    title: 'Water Intake Calculator',
    href: '/water-intake-calculator',
    displayUrl: 'velmora.com/water-intake-calculator',
    description:
      'Tells you how much water you should drink daily based on your body weight and activity level, because staying properly hydrated is one of the simplest things you can do for your health.',
  },
]

function SitemapLinkCard({
  title,
  href,
  displayUrl,
  description,
}: {
  title: string
  href: string
  displayUrl: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-cyan-400/40"
    >
      <h3 className="text-lg font-black text-slate-900 transition group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
        {title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{displayUrl}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </Link>
  )
}

export default function SitemapPage() {
  return (
    <article className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Link Page</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Sitemap</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        A complete overview of every page on Velmora, your one-stop reference to find blogs, tools, and everything else the site has to offer.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Main Pages</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {mainPages.map((page) => (
            <SitemapLinkCard key={page.href} {...page} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Free Online Tools</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Use Velmoraâ€™s privacy-minded browser tools for QR codes, image conversion, and image compression. These tools are built for fast everyday tasks with no login, no watermark, and no unnecessary upload step.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {toolPages.map((page) => (
            <SitemapLinkCard key={page.href} {...page} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Fitness &amp; Health Calculators</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {calculatorPages.map((page) => (
            <SitemapLinkCard key={page.href} {...page} />
          ))}
        </div>
      </section>

    </article>
  )
}
