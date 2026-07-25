"use client";

import { useMemo, useState } from "react";
import {
  FiAlignLeft,
  FiCheck,
  FiChevronDown,
  FiClipboard,
  FiCopy,
  FiFileText,
  FiLayers,
  FiShield,
  FiTrash2,
  FiType,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";

type StatCardProps = {
  label: string;
  value: number;
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
              {value.toLocaleString()}
            </span>
          </div>
          {subtext && (
            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 dark:text-slate-500">
              {subtext}
            </p>
          )}
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "Does this tool store or save my text?",
    answer:
      "No. This tool works entirely in your browser — your text is never sent to any server, stored in a database, or saved anywhere. Once you close or refresh the page, your text is gone. This makes it safe to use for confidential documents, drafts, or personal writing.",
  },
  {
    question: "How is the word count calculated?",
    answer:
      "Word count is calculated by counting groups of characters separated by spaces or line breaks. Punctuation marks attached to words (like commas or periods) don't count as separate words, but standalone symbols may be counted depending on spacing.",
  },
  {
    question: "What's a good word count for essays or social posts?",
    answer:
      "It depends on the platform: Twitter/X posts are limited to 280 characters, Instagram captions perform best under 125 characters, blog posts for SEO typically range from 1,500–2,500 words, and standard essays are often 500–1,000 words depending on the assignment.",
  },
  {
    question: "Can I count words in a PDF or Word document?",
    answer:
      "This tool counts text that you paste or type directly into the textbox. If you have a PDF or Word file, copy the text from the document and paste it here to get an instant count.",
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

export default function WordCounterClientPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const charCountWithSpaces = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const sentenceCount = trimmed
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphCount = trimmed
      ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    return {
      wordCount,
      charCountWithSpaces,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
    };
  }, [text]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy text.");
    }
  };

  const handlePaste = async () => {
    try {
      const pasted = await navigator.clipboard.readText();
      if (pasted) {
        setText((prev) => (prev ? `${prev}\n${pasted}` : pasted));
        showToast("Text pasted from clipboard!");
      }
    } catch {
      showToast("Clipboard access unavailable.");
    }
  };

  const handleClear = () => {
    setText("");
    showToast("Text cleared!");
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
                Free Online Tool • 100% Browser Private
              </span>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Word Counter & Character Counter
              </h1>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Count words, characters, sentences, and paragraphs instantly as you type. 
                Perfect for essays, social media posts, SEO content, and school assignments. 
                Completely free, no signup required, and your text stays 100% private in your browser.
              </p>
            </div>

            {/* Reorderable Container: On mobile (< sm) Input area comes first (order-1), then Stat Boxes (order-2). On desktop (>= sm), Stat Boxes come first (sm:order-1), then Input area (sm:order-2) */}
            <div className="flex flex-col">
              {/* Text Input Area & Action Toolbar */}
              <div className="order-1 mt-6 sm:order-2 sm:mt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label
                    htmlFor="word-counter-input"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                  >
                    Type or Paste Text Below
                  </label>
                  
                  {/* Action Buttons Toolbar */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <FiClipboard className="h-3.5 w-3.5" />
                      Paste
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={!text}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!text}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-4 py-2 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(167,139,250,0.5)] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="h-3.5 w-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-3.5 w-3.5" />
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Textarea */}
                <div className="relative mt-3">
                  <textarea
                    id="word-counter-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here to count words, characters, and sentences instantly..."
                    className="min-h-[260px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 sm:p-5 sm:text-base dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/20"
                  />
                </div>

                {/* Input Quick Summary Footer */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {text.length === 0
                      ? "Start typing or paste content to view real-time statistics."
                      : `${stats.wordCount} words | ${stats.charCountWithSpaces} chars`}
                  </span>
                  <span className="font-medium text-cyan-600 dark:text-cyan-400">
                    100% Client-Side Privacy Guaranteed
                  </span>
                </div>
              </div>

              {/* Stats Cards Grid */}
              <div className="order-2 mt-6 sm:order-1 sm:mt-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  <StatCard
                    label="Words"
                    value={stats.wordCount}
                    icon={FiFileText}
                    color="from-cyan-400 to-blue-600"
                  />
                  <StatCard
                    label="Characters"
                    value={stats.charCountWithSpaces}
                    subtext="With spaces"
                    icon={FiType}
                    color="from-violet-400 to-purple-600"
                  />
                  <StatCard
                    label="Characters"
                    value={stats.charCountNoSpaces}
                    subtext="No spaces"
                    icon={FiAlignLeft}
                    color="from-fuchsia-400 to-pink-600"
                  />
                  <StatCard
                    label="Sentences"
                    value={stats.sentenceCount}
                    icon={FiLayers}
                    color="from-emerald-400 to-teal-600"
                  />
                  <StatCard
                    label="Paragraphs"
                    value={stats.paragraphCount}
                    icon={FiAlignLeft}
                    color="from-amber-400 to-orange-600"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Sticky Live Counter Floating Bar */}
            <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl border border-cyan-500/30 bg-slate-900/90 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:bg-slate-900/95 sm:hidden">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Words</p>
                <p className="text-base font-black text-white">{stats.wordCount.toLocaleString()}</p>
              </div>
              <div className="h-5 w-px bg-white/15" />
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Chars</p>
                <p className="text-base font-black text-white">{stats.charCountWithSpaces.toLocaleString()}</p>
              </div>
              <div className="h-5 w-px bg-white/15" />
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Sentences</p>
                <p className="text-base font-black text-white">{stats.sentenceCount.toLocaleString()}</p>
              </div>
              <div className="h-5 w-px bg-white/15" />
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Paras</p>
                <p className="text-base font-black text-white">{stats.paragraphCount.toLocaleString()}</p>
              </div>
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
                  Everything You Need to Know About Word & Character Counting
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
                        <span className="text-sm sm:text-base">{faq.question}</span>
                        <FiChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-cyan-500 dark:text-cyan-400" : ""
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
            <RelatedTools currentPath="/tools/word-counter" />
          </main>
        </div>
      </div>
    </>
  );
}
