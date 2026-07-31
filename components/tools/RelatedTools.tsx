"use client";

import Link from "next/link";
import {
  FiArrowUpRight,
  FiGrid,
  FiImage,
  FiMinimize2,
  FiFileText,
  FiColumns,
  FiAlignLeft,
  FiType,
  FiLock,
  FiPercent,
  FiDollarSign,
  FiTrendingUp,
  FiCode,
  FiCheckSquare,
  FiLink,
} from "react-icons/fi";

type ToolItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge: string;
};

const allTools: ToolItem[] = [
  {
    title: "QR Code Generator",
    description: "Generate high-quality QR codes for links and contact info.",
    href: "/qr-code-generator",
    icon: FiGrid,
    badge: "QR Code",
  },
  {
    title: "Image Converter",
    description: "Convert WebP, PNG, JPG, and AVIF images in your browser.",
    href: "/image-converter",
    icon: FiImage,
    badge: "Media",
  },
  {
    title: "Image to Base64",
    description: "Convert image files to Base64 strings, HTML img tags, or CSS rules, and vice versa.",
    href: "/tools/image-to-base64",
    icon: FiImage,
    badge: "Media",
  },
  {
    title: "Image Compressor",
    description: "Compress images with custom quality right in your browser.",
    href: "/image-compressor",
    icon: FiMinimize2,
    badge: "Compressor",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and reading time.",
    href: "/tools/word-counter",
    icon: FiFileText,
    badge: "Text",
  },
  {
    title: "Text Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case & more.",
    href: "/tools/text-case-converter",
    icon: FiType,
    badge: "Text",
  },
  {
    title: "Compare Text",
    description: "Compare two text blocks side-by-side or inline and highlight changes.",
    href: "/tools/compare-text",
    icon: FiColumns,
    badge: "Text",
  },
  {
    title: "Lorem Ipsum",
    description: "Generate customized placeholder dummy text with options for paragraphs and HTML tags.",
    href: "/tools/lorem-ipsum-generator",
    icon: FiAlignLeft,
    badge: "Text",
  },
  {
    title: "Password Generator",
    description: "Generate secure, randomized passwords with custom rules.",
    href: "/tools/password-generator",
    icon: FiLock,
    badge: "Security",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentage increase, decrease, and differences.",
    href: "/tools/percentage-calculator",
    icon: FiPercent,
    badge: "Math",
  },
  {
    title: "EMI Calculator",
    description: "Calculate monthly loan EMI and total interest payable.",
    href: "/tools/emi-calculator",
    icon: FiDollarSign,
    badge: "Finance",
  },
  {
    title: "SIP Calculator",
    description: "Calculate expected returns for mutual fund SIP & lumpsum investments.",
    href: "/tools/sip-calculator",
    icon: FiTrendingUp,
    badge: "Finance",
  },
  {
    title: "Compound Interest Calculator",
    description: "Calculate compound interest growth for your investments and savings.",
    href: "/tools/compound-interest-calculator",
    icon: FiTrendingUp,
    badge: "Finance",
  },
  {
    title: "JSON Formatter",
    description: "Format, prettify, and clean up unformatted JSON code.",
    href: "/tools/json-formatter",
    icon: FiCode,
    badge: "Dev",
  },
  {
    title: "JSON Validator",
    description: "Validate JSON syntax and spot structural syntax errors.",
    href: "/tools/json-validator",
    icon: FiCheckSquare,
    badge: "Dev",
  },
  {
    title: "Slug Generator",
    description: "Create clean, SEO-friendly URL slugs from any string.",
    href: "/tools/slug-generator",
    icon: FiLink,
    badge: "SEO",
  },
];

export default function RelatedTools({ currentPath }: { currentPath: string }) {
  const related = allTools.filter((item) => item.href !== currentPath).slice(0, 3);

  return (
    <section className="relative mt-8 sm:mt-10">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Explore More
          </p>
          <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl dark:text-slate-100">
            Related Tools
          </h3>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          All Tools <FiArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 cards - grid on desktop, horizontal scroll on mobile */}
      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-none">
        {related.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col mt-2 justify-between min-w-[240px] sm:min-w-0 snap-start rounded-xl border border-slate-200/80 bg-white/80 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-400/30 dark:hover:bg-slate-800/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                <span>Open Tool</span>
                <FiArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
