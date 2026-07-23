import type { Metadata } from "next";
import Link from "next/link";
import { buildStaticPageMetadata } from "@/lib/seo";

const tools = [
  {
    name: "QR Code Generator",
    href: "/qr-code-generator",
    description:
      "Create QR codes for website URLs and PDF links with no signup, no watermark, and no expiry from Velmora.",
  },
  {
    name: "Image Converter",
    href: "/image-converter",
    description:
      "Convert JPG, PNG, and WebP images directly in your browser with batch support and private local processing.",
  },
  {
    name: "Image Compressor",
    href: "/image-compressor",
    description:
      "Reduce image file size for JPG, PNG, and WebP with browser-based compression and ZIP downloads.",
  },
  {
    name: "Word Counter & Character Counter",
    href: "/tools/word-counter",
    description:
      "Count words, characters, sentences, paragraphs, and estimate reading/speaking time in real-time with 100% browser privacy.",
  },
  {
    name: "Text Case Converter",
    href: "/tools/text-case-converter",
    description:
      "Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, alternating case, and inverse case.",
  },
  {
    name: "Password Generator",
    href: "/tools/password-generator",
    description:
      "Generate strong, customizable, cryptographically secure passwords locally in your browser with zero data logging.",
  },
  {
    name: "Percentage Calculator",
    href: "/tools/percentage-calculator",
    description:
      "Calculate percentages, percentage increase/decrease, and percentage changes instantly in real time.",
  },
] as const;
export const metadata: Metadata = buildStaticPageMetadata({
  title: "Free Online Tools - QR Code Generator, Image Tools",

  description:
    "Explore free online tools including QR code generator, image converter, and image compressor. Browser-based utilities for quick file handling and everyday tasks.",

  path: "/tools",

  imageAlt:
    "Free online tools for QR code generation and image conversion and compression",

  keywords: [
    "chaitali more frontend developer",
    // Core keywords
    "free online tools",
    "online tools",
    "image compressor",
    "qr code generator",
    "image converter",

    // Long-tail (high ranking potential)
    "free online image compressor and converter",
    "qr code generator for links and pdf free",
    "browser based image tools no upload",
    "online tools without signup",
    "free tools for image compression and conversion",
    "online utility tools for daily tasks",
    "free qr code generator online tool",
    "image tools for web optimization",
    "multiple online tools in one place",
    "free web tools for productivity",

    // Intent-based keywords
    "use free online tools",
    "compress image online free",
    "generate qr code online free",
    "convert image online free",
    "access browser tools",

    // Supporting SEO keywords
    "web based utilities",
    "digital tool platform",
    "image optimization tools online",
    "online productivity tools",
    "utility tools website"
  ],
});

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Tools Hub
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Free Online Tools
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Explore Velmora tools for QR codes, image conversion, and image compression. Each tool is designed for quick browser-based work with no login, no watermark, and privacy-friendly local processing where possible.
          </p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 sm:p-5 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-cyan-400/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-sm font-bold text-slate-700 dark:text-slate-200">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-cyan-600 transition group-hover:text-violet-600 dark:text-cyan-300 dark:group-hover:text-violet-300">
                    Open
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-slate-100">
                  {tool.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
