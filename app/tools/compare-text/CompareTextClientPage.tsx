"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiShield,
  FiColumns,
  FiCode,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";
import { buildToolPageSchema } from "@/lib/tool-page-schema";

type ViewMode = "split" | "unified";

interface DiffLine {
  type: "added" | "deleted" | "unchanged";
  value: string;
  oldLineNum?: number;
  newLineNum?: number;
}

const faqData = [
  {
    question: "What is a Diff Checker and how does it work?",
    answer:
      "A Diff Checker is a tool that compares two blocks of text (such as code, documents, or lists) and highlights the differences. It shows which lines have been added, deleted, or changed. This tool runs 100% in your browser using a custom Longest Common Subsequence (LCS) algorithm, meaning your text is never uploaded to any server.",
  },
  {
    question: "What is the difference between Split View and Unified View?",
    answer:
      "Split View displays the original and modified texts side-by-side, placing gaps in the layout so corresponding lines align. This is ideal for comparing changes visually. Unified View displays the changes inline in a single column, showing deletions and additions chronologically.",
  },
  {
    question: "Is my text data safe and private?",
    answer:
      "Yes! Your privacy is our highest priority. All calculations and text comparisons are executed locally in your browser using client-side JavaScript. None of your data is sent to our servers, keeping your documents completely private.",
  },
  {
    question: "Can I use this tool to compare programming code?",
    answer:
      "Absolutely! This tool works perfectly for comparing source code (HTML, CSS, JS, Python, etc.), configuration files, and Markdown. It highlights additions in green and deletions in red, similar to GitHub or other git diff utilities.",
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

const sampleOriginal = `Velmora Now is a collection of free online tools.
We provide everyday web utilities:
- Image Compressor
- QR Code Generator
- Percentage Calculator
Enjoy private browser-based utilities!`;

const sampleModified = `Velmora Now is a collection of premium online tools.
We provide everyday utilities for developers & writers:
- Image Compressor & Converter
- Custom QR Code Generator
- Percentage Calculator
- Compound Interest Calculator
Enjoy fast, private browser-based utilities!`;

export default function CompareTextClientPage() {
  // Text inputs
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");

  // Options
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [hasCompared, setHasCompared] = useState(false);

  // UI state
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/tools/compare-text");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
    setHasCompared(false);
    showToast("Texts cleared!");
  };

  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
    showToast("Texts swapped!");
  };

  const handleLoadSample = () => {
    setOriginalText(sampleOriginal);
    setModifiedText(sampleModified);
    setHasCompared(true);
    showToast("Sample texts loaded!");
  };

  // Diff algorithm: Longest Common Subsequence of lines
  const diffResults = useMemo(() => {
    if (!originalText && !modifiedText) {
      return {
        diff: [] as DiffLine[],
        stats: { additions: 0, deletions: 0, unchanged: 0, totalChanges: 0 },
      };
    }

    const oldLines = originalText.split(/\r?\n/);
    const newLines = modifiedText.split(/\r?\n/);

    const M = oldLines.length;
    const N = newLines.length;
    const dp: number[][] = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));

    for (let i = 1; i <= M; i++) {
      for (let j = 1; j <= N; j++) {
        if (oldLines[i - 1] === newLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const diff: DiffLine[] = [];
    let i = M;
    let j = N;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
        diff.push({
          type: "unchanged",
          value: oldLines[i - 1],
          oldLineNum: i,
          newLineNum: j,
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diff.push({
          type: "added",
          value: newLines[j - 1],
          newLineNum: j,
        });
        j--;
      } else {
        diff.push({
          type: "deleted",
          value: oldLines[i - 1],
          oldLineNum: i,
        });
        i--;
      }
    }

    diff.reverse();

    let additions = 0;
    let deletions = 0;
    let unchanged = 0;

    diff.forEach((line) => {
      if (line.type === "added") additions++;
      else if (line.type === "deleted") deletions++;
      else unchanged++;
    });

    return {
      diff,
      stats: {
        additions,
        deletions,
        unchanged,
        totalChanges: additions + deletions,
      },
    };
  }, [originalText, modifiedText]);

  // Aligned lines for Side-by-Side Split View
  const splitViewData = useMemo(() => {
    const leftSide: (DiffLine | null)[] = [];
    const rightSide: (DiffLine | null)[] = [];

    const diff = diffResults.diff;
    let idx = 0;

    while (idx < diff.length) {
      const current = diff[idx];

      if (current.type === "unchanged") {
        leftSide.push(current);
        rightSide.push(current);
        idx++;
      } else if (current.type === "deleted") {
        // Look ahead for matching additions to align them
        leftSide.push(current);
        if (idx + 1 < diff.length && diff[idx + 1].type === "added") {
          rightSide.push(diff[idx + 1]);
          idx += 2;
        } else {
          rightSide.push(null);
          idx++;
        }
      } else {
        // Added line without preceding deletion
        leftSide.push(null);
        rightSide.push(current);
        idx++;
      }
    }

    return { leftSide, rightSide };
  }, [diffResults]);

  const handleCopyDiff = async () => {
    let text = "";
    diffResults.diff.forEach((line) => {
      if (line.type === "added") text += `+ ${line.value}\n`;
      else if (line.type === "deleted") text += `- ${line.value}\n`;
      else text += `  ${line.value}\n`;
    });

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Unified diff copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy to clipboard.");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* WebApplication Schema */}
      {toolSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
      )}

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-2xl dark:bg-slate-100 dark:text-slate-900 sm:text-sm">
          {toastMessage}
        </div>
      )}

      <div className="relative min-h-screen overflow-x-clip px-3 sm:px-4 md:px-8 dark:bg-gray-950">
        <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
          <main className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
                <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Free Online Tool • 100% Browser Private
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Compare Text
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Compare two text files or code blocks side-by-side or inline. Highlights deletions in red and additions in green instantly. 100% secure client-side execution.
              </p>
            </div>

            {/* Quick Actions Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Load Sample Text
                </button>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Swap Inputs
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl border border-rose-200/50 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
                >
                  Clear All
                </button>
              </div>

              {hasCompared && (
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-950">
                  <button
                    type="button"
                    onClick={() => setViewMode("split")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition inline-flex items-center gap-1 ${
                      viewMode === "split"
                        ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    <FiColumns className="h-3.5 w-3.5" />
                    Split View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("unified")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition inline-flex items-center gap-1 ${
                      viewMode === "unified"
                        ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    <FiCode className="h-3.5 w-3.5" />
                    Unified
                  </button>
                </div>
              )}
            </div>

            {/* Inputs Workspace */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Original Text Input */}
              <div className="space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Original Text <span className="hidden sm:inline">(Left / Old)</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {originalText.length} characters
                  </span>
                </div>
                <textarea
                  value={originalText}
                  onChange={(e) => {
                    setOriginalText(e.target.value);
                    setHasCompared(true);
                  }}
                  placeholder="Paste your original text or code here..."
                  className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950/60"
                />
              </div>

              {/* Modified Text Input */}
              <div className="space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Modified Text <span className="hidden sm:inline">(Right / New)</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {modifiedText.length} characters
                  </span>
                </div>
                <textarea
                  value={modifiedText}
                  onChange={(e) => {
                    setModifiedText(e.target.value);
                    setHasCompared(true);
                  }}
                  placeholder="Paste your modified text or code here..."
                  className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-mono text-slate-800 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950/60"
                />
              </div>
            </div>

            {/* Results Analytics & Diff Viewer */}
            {hasCompared && (originalText || modifiedText) && (
              <div className="mt-8 space-y-6">
                {/* Analytics Summary */}
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Total Changes
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {diffResults.stats.totalChanges}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center dark:border-emerald-500/10 dark:bg-emerald-500/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Additions (+)
                    </span>
                    <p className="mt-1 text-lg font-black text-emerald-700 sm:text-xl dark:text-emerald-400">
                      {diffResults.stats.additions}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 text-center dark:border-rose-500/10 dark:bg-rose-500/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      Deletions (-)
                    </span>
                    <p className="mt-1 text-lg font-black text-rose-700 sm:text-xl dark:text-rose-400">
                      {diffResults.stats.deletions}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Unchanged Lines
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {diffResults.stats.unchanged}
                    </p>
                  </div>
                </div>

                {/* Diff Outputs */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 shadow-inner dark:border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Difference Output
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyDiff}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                    >
                      {copied ? (
                        <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <FiCopy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied" : "Copy Diff"}
                    </button>
                  </div>

                  {/* Split View (Side by Side) */}
                  {viewMode === "split" ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 overflow-x-auto scrollbar-none">
                      {/* Left Column: Original (Deletions) */}
                      <div className="min-w-0 md:min-w-[300px] border-r border-white/5 pr-2 md:border-r-0 md:pr-0">
                        <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Original
                        </div>
                        <div className="font-mono text-xs leading-relaxed space-y-0.5 select-text">
                          {splitViewData.leftSide.map((line, idx) => {
                            if (!line) {
                              return (
                                <div
                                  key={`l-empty-${idx}`}
                                  className="h-[1.4rem] bg-slate-900/40 border-l-4 border-transparent select-none text-transparent"
                                >
                                  &nbsp;
                                </div>
                              );
                            }
                            return (
                              <div
                                key={`l-${idx}`}
                                className={`flex items-start ${
                                  line.type === "deleted"
                                    ? "bg-rose-500/10 border-l-4 border-rose-500 text-rose-200"
                                    : "border-l-4 border-transparent text-slate-300"
                                }`}
                              >
                                <span className="w-8 shrink-0 text-right pr-2.5 text-slate-600 select-none">
                                  {line.oldLineNum}
                                </span>
                                <span className="w-4 shrink-0 text-center select-none">
                                  {line.type === "deleted" ? "-" : " "}
                                </span>
                                <span className="whitespace-pre-wrap break-all pr-2">
                                  {line.value || " "}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Column: Modified (Additions) */}
                      <div className="min-w-0 md:min-w-[300px]">
                        <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Modified
                        </div>
                        <div className="font-mono text-xs leading-relaxed space-y-0.5 select-text">
                          {splitViewData.rightSide.map((line, idx) => {
                            if (!line) {
                              return (
                                <div
                                  key={`r-empty-${idx}`}
                                  className="h-[1.4rem] bg-slate-900/40 border-l-4 border-transparent select-none text-transparent"
                                >
                                  &nbsp;
                                </div>
                              );
                            }
                            return (
                              <div
                                key={`r-${idx}`}
                                className={`flex items-start ${
                                  line.type === "added"
                                    ? "bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-200"
                                    : "border-l-4 border-transparent text-slate-300"
                                }`}
                              >
                                <span className="w-8 shrink-0 text-right pr-2.5 text-slate-600 select-none">
                                  {line.newLineNum}
                                </span>
                                <span className="w-4 shrink-0 text-center select-none">
                                  {line.type === "added" ? "+" : " "}
                                </span>
                                <span className="whitespace-pre-wrap break-all pr-2">
                                  {line.value || " "}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Unified View (Inline) */
                    <div className="overflow-x-auto scrollbar-none">
                      <div className="font-mono text-xs leading-relaxed space-y-0.5 min-w-[320px] select-text">
                        {diffResults.diff.map((line, idx) => (
                          <div
                            key={`u-${idx}`}
                            className={`flex items-start ${
                              line.type === "added"
                                ? "bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-200"
                                : line.type === "deleted"
                                ? "bg-rose-500/10 border-l-4 border-rose-500 text-rose-200"
                                : "border-l-4 border-transparent text-slate-300"
                            }`}
                          >
                            <span className="w-8 shrink-0 text-right pr-2 select-none text-slate-600">
                              {line.oldLineNum || " "}
                            </span>
                            <span className="w-8 shrink-0 text-right pr-2.5 select-none text-slate-600">
                              {line.newLineNum || " "}
                            </span>
                            <span className="w-4 shrink-0 text-center select-none">
                              {line.type === "added" ? "+" : line.type === "deleted" ? "-" : " "}
                            </span>
                            <span className="whitespace-pre-wrap break-all pr-2">
                              {line.value || " "}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ Accordion Section */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Learn more about text differences, online diff checkers, and visual views.
              </p>

              <div className="mt-6 space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100"
                      >
                        <span className="text-xs sm:text-sm">
                          {faq.question}
                        </span>
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-cyan-500" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-100 p-4 text-xs leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-300 sm:text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <RelatedTools currentPath="/tools/compare-text" />
          </main>
        </div>
      </div>
    </>
  );
}
