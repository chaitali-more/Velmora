import Link from 'next/link'

const helpfulPages = [
  {
    title: 'Home',
    href: '/',
    displayUrl: 'velmora.com/',
    description: 'Return to the main Velmora page and continue exploring tools, calculators, and blog articles.',
  },
  {
    title: 'Sitemap',
    href: '/sitemap',
    displayUrl: 'velmora.com/sitemap',
    description: 'View a complete overview of Velmora pages, tools, calculators, and legal links.',
  },
  {
    title: 'QR Code Generator',
    href: '/qr-code-generator',
    displayUrl: 'velmora.com/qr-code-generator',
    description: 'Create a free QR code from any website URL or PDF link with no signup, no watermark, and no expiry from Velmora.',
  },
  {
    title: 'Free Online Tools',
    href: '/tools',
    displayUrl: 'velmora.com/tools',
    description:
      'Browse Velmora’s tools hub for QR code generation, image conversion, image compression, and other no-signup browser utilities.',
  },
  {
    title: 'Image Converter',
    href: '/image-converter',
    displayUrl: 'velmora.com/image-converter',
    description:
      'Convert images to JPG, PNG, or WebP online in your browser. Fast, secure, no upload required, and no watermark.',
  },
  {
    title: 'Image Compressor',
    href: '/image-compressor',
    displayUrl: 'velmora.com/image-compressor',
    description:
      'Compress images and reduce file size for JPG, PNG, and WebP using Velmora’s free browser-based image compressor.',
  },
  {
    title: 'Fitness & Health Calculators',
    href: '/calculators',
    displayUrl: 'velmora.com/calculators',
    description: 'Explore Velmora calculators for BMI, BMR, calories, protein, macros, body fat, ideal weight, and water intake.',
  },
  {
    title: 'Contact',
    href: '/contact',
    displayUrl: 'velmora.com/contact',
    description: 'Reach out to the Velmora team with questions, suggestions, feedback, or general enquiries.',
  },
]

function HelpfulPageCard({
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
      <h2 className="text-lg font-black text-slate-900 transition group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
        {title}
      </h2>
      <p className="mt-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{displayUrl}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </Link>
  )
}

export default function NotFound() {
  return (
    <article className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">404</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        The page you are looking for does not exist, may have moved, or the link may be incorrect. Use the links below to continue exploring Velmora’s free tools, health calculators, blog pages, and site navigation.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Helpful Tools and Pages</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {helpfulPages.map((page) => (
            <HelpfulPageCard key={page.href} {...page} />
          ))}
        </div>
      </section>

  
    </article>
  )
}
