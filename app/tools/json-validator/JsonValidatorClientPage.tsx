"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiFileText,
  FiGrid,
  FiInfo,
  FiLayers,
  FiShield,
  FiTrash2,
  FiUpload,
  FiXCircle,
  FiChevronDown,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";

type ValidationStatus = "empty" | "valid" | "invalid";

type ParseErrorDetails = {
  message: string;
  line: number | null;
  column: number | null;
  explanation: string;
};

type ValidStats = {
  charCount: number;
  lineCount: number;
  rootType: string;
  itemCount: number;
};

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
    question: "What does a JSON validator check for?",
    answer:
      "A JSON validator checks whether your data follows correct JSON syntax rules — properly matched brackets and braces, correctly quoted keys and string values, valid data types, and no trailing commas. If any rule is broken, the JSON is considered invalid and won't be parsed correctly by applications or APIs expecting it.",
  },
  {
    question: "What are the most common JSON syntax errors?",
    answer:
      "The most common errors include trailing commas after the last item in an object or array, using single quotes instead of double quotes around keys and strings, missing commas between elements, unmatched or mismatched brackets/braces, and unquoted object keys. This tool identifies the exact line where these issues occur.",
  },
  {
    question: "How do I fix an \"Unexpected token\" error?",
    answer:
      "An \"Unexpected token\" error usually means there's an extra character, missing character, or misplaced symbol near the reported position — commonly a trailing comma, a missing quote, or an extra closing bracket. Check the line and column number shown, then look just before and after that position for the issue.",
  },
  {
    question: "Is my JSON data uploaded anywhere when I validate it?",
    answer:
      "No. All validation happens locally in your browser using JavaScript's built-in JSON parser — your data is never sent to a server, logged, or stored anywhere. This makes it safe to validate configuration files, API responses, or other sensitive JSON structures.",
  },
  {
    question: "What's the difference between this and the JSON Formatter tool?",
    answer:
      "The JSON Validator focuses on checking correctness and pinpointing errors, while the JSON Formatter focuses on beautifying and minifying already-valid JSON. If your JSON has errors, start here to find and fix them; once it's valid, use the JSON Formatter to clean up its structure.",
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

export default function JsonValidatorClientPage() {
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState<ValidationStatus>("empty");
  const [errorDetails, setErrorDetails] = useState<ParseErrorDetails | null>(null);
  const [stats, setStats] = useState<ValidStats | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /**
   * Helper to derive plain-English explanation based on error message patterns
   */
  const getPlainEnglishExplanation = (msg: string): string => {
    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes("unexpected token }") || lowerMsg.includes("unexpected token ]")) {
      return "This is often caused by a trailing comma before a closing brace/bracket or an extra closing punctuation mark.";
    }
    if (lowerMsg.includes("unexpected token ,")) {
      return "You likely have a duplicate comma or a missing property key/value before this comma.";
    }
    if (lowerMsg.includes("unexpected string") || lowerMsg.includes("unexpected number")) {
      return "This usually happens when a comma is missing between keys/items, or property keys are missing double quotes.";
    }
    if (lowerMsg.includes("unexpected end of json") || lowerMsg.includes("unexpected end of input")) {
      return "Your JSON code is incomplete. An open bracket '{' or '[' or string quote '\"' was not closed.";
    }
    if (lowerMsg.includes("single quote") || msg.includes("'")) {
      return "JSON requires double quotes (\") around keys and string values. Single quotes (') are invalid syntax in JSON.";
    }
    return "Check for missing or misplaced quotes, brackets ({}, []), commas, or unescaped characters near this line.";
  };

  /**
   * Core validation logic
   */
  const validateJsonText = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setStatus("empty");
      setErrorDetails(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);

      let rootType: string = typeof parsed;
      let itemCount = 1;

      if (Array.isArray(parsed)) {
        rootType = "Array";
        itemCount = parsed.length;
      } else if (parsed !== null && typeof parsed === "object") {
        rootType = "Object";
        itemCount = Object.keys(parsed).length;
      } else if (parsed === null) {
        rootType = "Null";
        itemCount = 0;
      } else {
        rootType = rootType.charAt(0).toUpperCase() + rootType.slice(1);
      }

      const inputLines = raw.split("\n").length;

      setStatus("valid");
      setErrorDetails(null);
      setStats({
        charCount: raw.length,
        lineCount: inputLines,
        rootType,
        itemCount,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "SyntaxError: Invalid JSON syntax";

      let line: number | null = null;
      let column: number | null = null;

      // Extract position
      const posMatch = msg.match(/at position (\d+)/i);
      if (posMatch && posMatch[1]) {
        const pos = parseInt(posMatch[1], 10);
        if (!isNaN(pos) && pos >= 0 && pos <= raw.length) {
          const textBeforePos = raw.slice(0, pos);
          const lines = textBeforePos.split("\n");
          line = lines.length;
          column = lines[lines.length - 1].length + 1;
        }
      }

      if (line === null) {
        const lineColMatch = msg.match(/line (\d+) column (\d+)/i);
        if (lineColMatch) {
          line = parseInt(lineColMatch[1], 10);
          column = parseInt(lineColMatch[2], 10);
        }
      }

      const explanation = getPlainEnglishExplanation(msg);

      setStatus("invalid");
      setStats(null);
      setErrorDetails({
        message: msg,
        line,
        column,
        explanation,
      });
    }
  };

  // Debounced real-time validation (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      validateJsonText(inputText);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputText]);

  // Handle manual validate button
  const handleManualValidate = () => {
    if (!inputText.trim()) {
      showToast("Please enter or paste JSON first.");
      return;
    }
    validateJsonText(inputText);
    if (status === "valid") {
      showToast("JSON is valid!");
    } else if (status === "invalid") {
      showToast("Syntax error detected.");
    }
  };

  // Handle clear
  const handleClear = () => {
    setInputText("");
    setStatus("empty");
    setErrorDetails(null);
    setStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("Validator cleared!");
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        validateJsonText(content);
        showToast(`Loaded ${file.name}`);
      }
    };
    reader.onerror = () => {
      showToast("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const inputLines = useMemo(() => {
    if (!inputText) return ["1"];
    return inputText.split("\n");
  }, [inputText]);

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
                JSON Validator
              </h1>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Check if your JSON is valid and pinpoint exactly where errors occur — instantly and for free. Get the exact line and column of any syntax issue along with a plain-English explanation of what went wrong, so you can fix it fast. Everything runs locally in your browser — nothing is ever uploaded.
              </p>

              {/* Cross-Tool Banner link to JSON Formatter */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50/70 px-3.5 py-2 text-xs font-bold text-cyan-900 transition hover:bg-cyan-100 dark:border-cyan-400/20 dark:bg-cyan-950/40 dark:text-cyan-200 dark:hover:bg-cyan-900/50">
                <FiCode className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Need to format or minify valid JSON?</span>
                <Link
                  href="/tools/json-formatter"
                  className="inline-flex items-center gap-1 text-violet-700 hover:underline dark:text-cyan-300"
                >
                  Try our JSON Formatter
                  <FiArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Validation Status Banner */}
            <div className="mt-6">
              {status === "valid" && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-200">
                  <FiCheckCircle className="h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-black">Valid JSON Structure</h3>
                    <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-300">
                      Your JSON syntax is clean, valid, and well-formed.
                    </p>
                  </div>
                </div>
              )}

              {status === "invalid" && (
                <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900 shadow-sm dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-200">
                  <FiXCircle className="h-6 w-6 shrink-0 text-rose-600 dark:text-rose-400" />
                  <div>
                    <h3 className="text-sm font-black">Invalid JSON Syntax</h3>
                    <p className="mt-0.5 text-xs text-rose-700 dark:text-rose-300">
                      Syntax error detected. Review line location and details below.
                    </p>
                  </div>
                </div>
              )}

              {status === "empty" && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
                  <FiInfo className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <p className="text-xs font-semibold">
                    Paste or upload JSON below to validate syntax instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Action Toolbar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4 dark:border-white/10 dark:bg-slate-950/60">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleManualValidate}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-5 py-2 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(167,139,250,0.5)] active:translate-y-0"
                >
                  <FiCheckCircle className="h-4 w-4" />
                  Validate JSON
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <FiUpload className="h-4 w-4" />
                  Upload File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:border-white/10 dark:bg-slate-800/90 dark:text-rose-400 dark:hover:bg-slate-800"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Clear
                </button>
              </div>

              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Validated 100% locally
              </span>
            </div>

            {/* Main Textarea Editor with Line Number Gutter */}
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-white/10 dark:bg-slate-950/70">
              <div className="flex min-h-[380px]">
                {/* Line number gutter */}
                <div className="w-12 select-none border-r border-slate-200 bg-slate-100/60 py-4 font-mono text-xs text-slate-400 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-600">
                  {inputLines.map((_, i) => {
                    const lineNum = i + 1;
                    const isErrorLine = errorDetails && errorDetails.line === lineNum;
                    return (
                      <div
                        key={i}
                        className={`px-2 text-right leading-relaxed ${
                          isErrorLine
                            ? "bg-rose-500 font-bold text-white shadow-sm dark:bg-rose-600"
                            : ""
                        }`}
                      >
                        {lineNum}
                      </div>
                    );
                  })}
                </div>

                {/* Textarea Input */}
                <div className="relative flex-1">
                  <textarea
                    id="json-validator-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder='Type or paste JSON to validate, e.g. {"status": "success", "code": 200}'
                    className="h-full min-h-[380px] w-full resize-y bg-transparent p-4 font-mono text-xs leading-relaxed text-slate-900 placeholder-slate-400 outline-none transition sm:text-sm dark:text-slate-100 dark:placeholder-slate-500"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Error Panel (When Invalid) */}
            {status === "invalid" && errorDetails && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-rose-200 bg-rose-50/90 p-4 sm:p-5 dark:border-rose-500/30 dark:bg-rose-950/40">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-rose-900 dark:text-rose-200">
                        Syntax Error Breakdown
                      </h4>
                      {errorDetails.line !== null && (
                        <span className="rounded-full bg-rose-200 px-3 py-1 text-xs font-bold text-rose-900 dark:bg-rose-900/80 dark:text-rose-100">
                          Error at Line {errorDetails.line}
                          {errorDetails.column !== null ? `, Column ${errorDetails.column}` : ""}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 rounded-xl bg-white/80 p-3 font-mono text-xs leading-relaxed text-rose-950 border border-rose-200/60 dark:bg-slate-900/80 dark:border-rose-500/20 dark:text-rose-200">
                      {errorDetails.message}
                    </div>

                    <div className="mt-3 rounded-xl bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200 border border-amber-500/20">
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        💡 Debugging Tip:{" "}
                      </span>
                      {errorDetails.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Section (When Valid) */}
            {status === "valid" && stats && (
              <div className="mt-6 border-t border-slate-200/80 pt-6 dark:border-white/10">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatCard
                    label="Characters"
                    value={stats.charCount}
                    icon={FiFileText}
                    color="from-cyan-400 to-blue-600"
                  />
                  <StatCard
                    label="Total Lines"
                    value={stats.lineCount}
                    icon={FiLayers}
                    color="from-violet-400 to-purple-600"
                  />
                  <StatCard
                    label="Root Type"
                    value={stats.rootType}
                    icon={FiCode}
                    color="from-emerald-400 to-teal-600"
                  />
                  <StatCard
                    label="Items / Keys"
                    value={stats.itemCount}
                    icon={FiGrid}
                    color="from-fuchsia-400 to-pink-600"
                  />
                </div>
              </div>
            )}

            <p className="mt-4 text-right text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Validated locally in your browser — never uploaded anywhere.
            </p>

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
                  Everything You Need to Know About JSON Validation
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
            <RelatedTools currentPath="/tools/json-validator" />
          </main>
        </div>
      </div>
    </>
  );
}
