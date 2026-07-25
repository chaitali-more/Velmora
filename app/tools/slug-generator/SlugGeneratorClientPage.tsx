"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCopy,
  FiFileText,
  FiGrid,
  FiLayers,
  FiLink2,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiTrash2,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";

type SeparatorOption = "-" | "_";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  subtext?: string;
};

function StatCard({ label, value, icon: Icon, color, subtext }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/80 sm:p-4 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_32px_rgba(0,0,0,0.4)] dark:hover:border-cyan-400/40">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <div className="mt-1 flex items-baseline">
            <span className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
          </div>
          {subtext && (
            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 dark:text-slate-500">
              {subtext}
            </p>
          )}
        </div>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "What is a URL slug?",
    answer:
      "A URL slug is the part of a web address that identifies a specific page in a readable, simplified format — usually the portion after the domain name. For example, in \"velmoranow.in/blog/free-online-image-compressor\", the slug is \"free-online-image-compressor\". Good slugs are short, descriptive, and easy to read.",
  },
  {
    question: "Why are slugs important for SEO?",
    answer:
      "Search engines and users both benefit from clean, descriptive URLs. Slugs that clearly reflect page content help search engines understand what a page is about, can improve click-through rates in search results, and are easier for users to read, remember, and share compared to URLs with random characters or unnecessary words.",
  },
  {
    question: "Should I use hyphens or underscores in a slug?",
    answer:
      "Hyphens are the recommended standard for SEO. Google explicitly treats hyphens as word separators, so \"free-online-tool\" is read as three distinct words. Underscores, on the other hand, can sometimes be treated as a single continuous string (\"free_online_tool\"), which may hurt how search engines interpret individual keywords in the URL.",
  },
  {
    question: "How long should a URL slug be?",
    answer:
      "Shorter slugs generally perform better for both SEO and readability — aim for under 60 characters where possible, focusing on the most important keywords from your title. Very long slugs can get truncated in search results and are harder for users to read or share.",
  },
  {
    question: "Does this tool remove special characters and spaces automatically?",
    answer:
      "Yes. This tool automatically converts your title to lowercase, replaces spaces with hyphens (or underscores, if selected), and strips out special characters like punctuation, symbols, and accents that aren't URL-friendly, giving you a clean, ready-to-use slug instantly.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const DEFAULT_EXAMPLE = "Free Online Image Compressor & Converter!";

export default function SlugGeneratorClientPage() {
  const [inputText, setInputText] = useState("");
  const [separator, setSeparator] = useState<SeparatorOption>("-");
  const [isLowercase, setIsLowercase] = useState<boolean>(true);
  const [maxLength, setMaxLength] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /**
   * Slug generation logic
   */
  const generatedSlug = useMemo(() => {
    const textToProcess = inputText.trim() ? inputText : DEFAULT_EXAMPLE;
    let result = textToProcess.trim();

    // 1. Lowercase if enabled
    if (isLowercase) {
      result = result.toLowerCase();
    }

    // 2. Strip non-alphanumeric except spaces, hyphens, underscores
    result = result.replace(/[^a-zA-Z0-9\s-_]/g, "");

    // 3. Replace whitespace with chosen separator
    result = result.replace(/\s+/g, separator);

    // 4. Collapse multiple consecutive separators into one
    const sepRegex = separator === "-" ? /-+/g : /_+/g;
    result = result.replace(sepRegex, separator);

    // 5. Trim leading and trailing separator
    const trimRegex = new RegExp(`^\\${separator}+|\\${separator}+$`, "g");
    result = result.replace(trimRegex, "");

    // 6. Max length truncation at word boundary
    const maxLenNum = parseInt(maxLength, 10);
    if (!isNaN(maxLenNum) && maxLenNum > 0 && result.length > maxLenNum) {
      let truncated = result.slice(0, maxLenNum);
      const lastSepIndex = truncated.lastIndexOf(separator);
      if (lastSepIndex > 0) {
        truncated = truncated.slice(0, lastSepIndex);
      }
      result = truncated;
    }

    return result;
  }, [inputText, separator, isLowercase, maxLength]);

  const handleCopy = async () => {
    if (!generatedSlug) return;
    try {
      await navigator.clipboard.writeText(generatedSlug);
      setCopied(true);
      showToast("Slug copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy slug.");
    }
  };

  const handleClear = () => {
    setInputText("");
    showToast("Input cleared!");
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
        <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
          <main className="rounded-xl border border-slate-200/80 bg-white p-4 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
                <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Developer Tools • 100% Local Browser Privacy
              </span>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Slug Generator
              </h1>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Convert any title or phrase into a clean, SEO-friendly URL slug — instantly and for free. Perfect for blog posts, product pages, and website URLs. Just type your title and get a properly formatted slug in real time, with options to customize separators, casing, and length.
              </p>
            </div>

            {/* Input & Generator Card */}
            <div className="mt-6 flex flex-col gap-6">
              {/* Input Area */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="slug-input"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                  >
                    Enter Title or Phrase
                  </label>
                  {inputText && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline dark:text-rose-400"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                      Clear
                    </button>
                  )}
                </div>

                <div className="relative mt-2">
                  <input
                    id="slug-input"
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g. Free Online Image Compressor & Converter!"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 sm:p-5 sm:text-base dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/20"
                  />
                </div>

                {/* Example helper tag */}
                {!inputText && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Sample Preview:
                    </span>
                    <button
                      type="button"
                      onClick={() => setInputText("Free Online Image Compressor & Converter!")}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-200 bg-cyan-50/60 px-2.5 py-1 text-[11px] font-bold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-400/20 dark:bg-cyan-950/40 dark:text-cyan-200"
                    >
                      <span>&ldquo;Free Online Image Compressor & Converter!&rdquo;</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        free-online-image-compressor-converter
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Options & Settings Toolbar */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/60">
                <div className="flex items-center gap-2 mb-3">
                  <FiSliders className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Customization Settings
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Separator Toggle */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Separator Character
                    </label>
                    <div className="inline-flex w-full rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-900">
                      <button
                        type="button"
                        onClick={() => setSeparator("-")}
                        className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          separator === "-"
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        Hyphen ( - )
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeparator("_")}
                        className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          separator === "_"
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        Underscore ( _ )
                      </button>
                    </div>
                  </div>

                  {/* Lowercase Toggle */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Convert to Lowercase
                    </label>
                    <div className="inline-flex w-full rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-900">
                      <button
                        type="button"
                        onClick={() => setIsLowercase(true)}
                        className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          isLowercase
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        Lowercase (ON)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsLowercase(false)}
                        className={`flex-1 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          !isLowercase
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        Preserve Case (OFF)
                      </button>
                    </div>
                  </div>

                  {/* Max Length Truncation */}
                  <div>
                    <label
                      htmlFor="max-length-input"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5"
                    >
                      Max Length (Chars)
                    </label>
                    <input
                      id="max-length-input"
                      type="number"
                      min={1}
                      max={300}
                      value={maxLength}
                      onChange={(e) => setMaxLength(e.target.value)}
                      placeholder="Optional limit e.g. 60"
                      className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Generated Slug Result Box */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Generated URL Slug
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    ✓ Clean & SEO-Friendly
                  </span>
                </div>

                <div className="group relative mt-2 overflow-hidden rounded-2xl border border-cyan-300/80 bg-slate-900 p-4 shadow-lg transition-all dark:border-cyan-500/40 dark:bg-slate-950 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0 flex-1 overflow-x-auto">
                      <p className="select-all font-mono text-base font-bold text-cyan-300 sm:text-xl break-all">
                        {generatedSlug || "your-generated-slug-will-appear-here"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!generatedSlug}
                      className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(167,139,250,0.5)] disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-4 w-4" />
                          Copy Slug
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard
                  label="Slug Characters"
                  value={generatedSlug.length}
                  icon={FiFileText}
                  color="from-cyan-400 to-blue-600"
                />
                <StatCard
                  label="Word Count"
                  value={
                    generatedSlug
                      ? generatedSlug.split(separator).filter(Boolean).length
                      : 0
                  }
                  icon={FiLayers}
                  color="from-violet-400 to-purple-600"
                />
                <StatCard
                  label="Separator Used"
                  value={separator === "-" ? "Hyphen (-)" : "Underscore (_)"}
                  icon={FiLink2}
                  color="from-fuchsia-400 to-pink-600"
                />
              </div>

              <p className="text-right text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Generated 100% locally in your browser — never uploaded anywhere.
              </p>
            </div>

            {/* Toast Feedback Notification */}
            {toastMessage && (
              <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-2xl dark:bg-white dark:text-slate-900 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
                {toastMessage}
              </div>
            )}

            {/* FAQ Accordion Section */}
            <section className="mt-12 border-t border-slate-200/80 pt-10 sm:mt-16 sm:pt-12 dark:border-white/10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                  Everything You Need to Know About URL Slugs & SEO
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 transition-all dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-slate-900 sm:p-5 dark:text-slate-100"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm sm:text-base">
                          {faq.question}
                        </span>
                        <FiChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen
                              ? "rotate-180 text-cyan-500 dark:text-cyan-400"
                              : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-200/60 px-4 py-3.5 text-xs leading-relaxed text-slate-600 sm:px-5 sm:py-4 sm:text-sm dark:border-white/5 dark:text-slate-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
            <RelatedTools currentPath="/tools/slug-generator" />
          </main>
        </div>
      </div>
    </>
  );
}
