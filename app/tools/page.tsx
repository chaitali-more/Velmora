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
      "Reduce image file size for JPG, PNG, WebP, GIF, and more with browser-based compression and ZIP downloads.",
  },
] as const;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Free Online Tools – QR Code, Image Converter, Compressor",
  description:
    "Explore Velmora’s free online tools including QR code generator, image converter, and image compressor. Fast browser-based tools with no signup, no upload, and no watermark.",
  path: "/tools",
  imageAlt: "Velmora free online tools including QR code generator image converter and image compressor",
  keywords: [
    "free online tools",
    "Velmora tools",
    "QR code generator",
    "image converter",
    "image compressor",
    "browser tools",
    "no upload tools",
    "free image tools",
    "online utility tools",
    "tools no signup",
  ],
});

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip px-3 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:rounded-[2rem] dark:border dark:border-white/10 dark:bg-slate-900/55 dark:p-3 sm:dark:p-4 md:dark:p-6">
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Tools Hub
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Free Online Tools
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Explore Velmora tools for QR codes, image conversion, and image compression. Each tool is designed for quick browser-based work with no login, no watermark, and privacy-friendly local processing where possible.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-3xl border border-slate-200/80 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-cyan-400/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-sm font-bold text-slate-700 dark:text-slate-200">
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
