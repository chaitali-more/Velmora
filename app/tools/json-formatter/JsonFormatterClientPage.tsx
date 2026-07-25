"use client";

import { useMemo, useRef, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCopy,
  FiFileText,
  FiGrid,
  FiLayers,
  FiMaximize2,
  FiMinimize2,
  FiRefreshCw,
  FiShield,
  FiTrash2,
  FiUpload,
  FiAlertCircle,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";

type IndentOption = "2" | "4" | "tab";

type ParseError = {
  message: string;
  line: number | null;
  column: number | null;
};

/**
 * Custom JSON syntax tokenizer component line-by-line
 */
function JsonSyntaxLine({ line }: { line: string }) {
  const tokens = useMemo(() => {
    // Regex matching: keys, strings, numbers, booleans, null, punctuation, whitespace
    const tokenRegex =
      /("(?:\\.|[^"\\])*")\s*(?=:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(true|false)|(null)|([{}[\],:])|(\s+)/g;

    const result: { text: string; type: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          text: line.substring(lastIndex, match.index),
          type: "text",
        });
      }

      if (match[1] !== undefined) {
        result.push({ text: match[1], type: "key" });
      } else if (match[2] !== undefined) {
        result.push({ text: match[2], type: "string" });
      } else if (match[3] !== undefined) {
        result.push({ text: match[3], type: "number" });
      } else if (match[4] !== undefined) {
        result.push({ text: match[4], type: "boolean" });
      } else if (match[5] !== undefined) {
        result.push({ text: match[5], type: "null" });
      } else if (match[6] !== undefined) {
        result.push({ text: match[6], type: "punct" });
      } else if (match[7] !== undefined) {
        result.push({ text: match[7], type: "space" });
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      result.push({ text: line.substring(lastIndex), type: "text" });
    }

    return result;
  }, [line]);

  return (
    <span>
      {tokens.map((token, i) => {
        switch (token.type) {
          case "key":
            return (
              <span
                key={i}
                className="font-semibold text-purple-700 dark:text-cyan-300"
              >
                {token.text}
              </span>
            );
          case "string":
            return (
              <span key={i} className="text-emerald-600 dark:text-emerald-400">
                {token.text}
              </span>
            );
          case "number":
            return (
              <span key={i} className="text-amber-600 dark:text-amber-400">
                {token.text}
              </span>
            );
          case "boolean":
            return (
              <span
                key={i}
                className="font-bold text-blue-600 dark:text-violet-400"
              >
                {token.text}
              </span>
            );
          case "null":
            return (
              <span
                key={i}
                className="font-bold italic text-rose-600 dark:text-rose-400"
              >
                {token.text}
              </span>
            );
          case "punct":
            return (
              <span key={i} className="text-slate-500 dark:text-slate-400">
                {token.text}
              </span>
            );
          default:
            return <span key={i}>{token.text}</span>;
        }
      })}
    </span>
  );
}

const faqData = [
  {
    question: "What does a JSON formatter do?",
    answer:
      "A JSON formatter takes raw, minified, or messy JSON data and rearranges it with proper indentation, line breaks, and spacing, making it easier to read and debug. This is especially useful when working with API responses, configuration files, or logs where JSON is often returned as a single unreadable line.",
  },
  {
    question: "What's the difference between formatting and minifying JSON?",
    answer:
      "Formatting (or \"beautifying\") adds indentation and line breaks to make JSON human-readable. Minifying does the opposite — it strips out all unnecessary whitespace to reduce file size, which is useful when sending JSON over a network or storing it efficiently, since smaller payloads load faster.",
  },
  {
    question: "Why is my JSON showing an error?",
    answer:
      "JSON has strict syntax rules — common issues include trailing commas, missing quotes around keys, single quotes instead of double quotes, or mismatched brackets/braces. This tool highlights the specific line and reason for the error so you can quickly locate and fix the problem in your original data.",
  },
  {
    question: "Is my JSON data safe to paste here?",
    answer:
      "Yes. All formatting and validation happens locally in your browser — your JSON is never uploaded, transmitted, or stored on any server. This makes it safe to use with sensitive configuration files, API keys, or internal data structures, though we'd still recommend caution with highly sensitive credentials on any online tool.",
  },
  {
    question: "Can I format a JSON file instead of pasting text?",
    answer:
      "Yes. Use the \"Upload File\" button to select a .json file directly from your device. Its contents will load into the input panel automatically, where you can format, minify, or validate it just like pasted text.",
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

export default function JsonFormatterClientPage() {
  const [inputText, setInputText] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [indentOption, setIndentOption] = useState<IndentOption>("2");
  const [error, setError] = useState<ParseError | null>(null);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");
  const [copied, setCopied] = useState(false);
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
   * Helper function to extract line & column from JSON parse error
   */
  const parseJsonError = (errMessage: string, rawText: string): ParseError => {
    let line: number | null = null;
    let column: number | null = null;

    // Pattern 1: position match (V8 error format: "at position X")
    const posMatch = errMessage.match(/at position (\d+)/i);
    if (posMatch && posMatch[1]) {
      const pos = parseInt(posMatch[1], 10);
      if (!isNaN(pos) && pos >= 0 && pos <= rawText.length) {
        const textBeforePos = rawText.slice(0, pos);
        const lines = textBeforePos.split("\n");
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    // Pattern 2: line and column directly in error message (e.g., Firefox / Safari)
    if (line === null) {
      const lineColMatch = errMessage.match(/line (\d+) column (\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      }
    }

    return {
      message: errMessage,
      line,
      column,
    };
  };

  /**
   * Core JSON formatting handler
   */
  const handleFormat = (
    raw: string,
    mode: "beautify" | "minify",
    currentIndent: IndentOption = indentOption
  ) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setFormattedOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const indentVal =
        currentIndent === "2" ? 2 : currentIndent === "4" ? 4 : "\t";
      const result =
        mode === "beautify"
          ? JSON.stringify(parsed, null, indentVal)
          : JSON.stringify(parsed);

      setFormattedOutput(result);
      setError(null);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Invalid JSON syntax";
      const errInfo = parseJsonError(msg, raw);
      setError(errInfo);
    }
  };

  // Handle live input changes
  const handleInputChange = (val: string) => {
    setInputText(val);
    if (val.trim()) {
      handleFormat(val, "beautify");
    } else {
      setFormattedOutput("");
      setError(null);
    }
  };

  // Handle auto-format on paste
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (pasted && pasted.trim()) {
      // Auto format pasted JSON
      setTimeout(() => {
        handleFormat(pasted, "beautify");
        showToast("Auto-formatted pasted JSON!");
      }, 0);
    }
  };

  // Handle Indent option toggle
  const handleIndentChange = (newIndent: IndentOption) => {
    setIndentOption(newIndent);
    if (inputText.trim()) {
      handleFormat(inputText, "beautify", newIndent);
    }
  };

  // Handle Minify
  const handleMinify = () => {
    if (!inputText.trim()) {
      showToast("Please enter or paste JSON first.");
      return;
    }
    handleFormat(inputText, "minify");
    setActiveTab("output");
    showToast("JSON minified successfully!");
  };

  // Handle Beautify
  const handleBeautify = () => {
    if (!inputText.trim()) {
      showToast("Please enter or paste JSON first.");
      return;
    }
    handleFormat(inputText, "beautify");
    setActiveTab("output");
    showToast("JSON beautified!");
  };

  // Handle Copy
  const handleCopy = async () => {
    const textToCopy = formattedOutput || inputText;
    if (!textToCopy) {
      showToast("Nothing to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showToast("JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy to clipboard.");
    }
  };

  // Handle Clear
  const handleClear = () => {
    setInputText("");
    setFormattedOutput("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("Editor cleared!");
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        handleFormat(content, "beautify");
        showToast(`Loaded ${file.name}`);
      }
    };
    reader.onerror = () => {
      showToast("Failed to read file.");
    };
    reader.readAsText(file);
  };

  // Computed Statistics
  const stats = useMemo(() => {
    const activeText = formattedOutput || inputText;
    const charCount = activeText.length;
    const lineCount = activeText ? activeText.split("\n").length : 0;
    const blobSize = new Blob([activeText]).size;
    const sizeFormatted =
      blobSize < 1024
        ? `${blobSize} B`
        : `${(blobSize / 1024).toFixed(2)} KB`;

    return {
      charCount,
      lineCount,
      sizeFormatted,
    };
  }, [inputText, formattedOutput]);

  const outputLines = useMemo(() => {
    if (!formattedOutput) return [];
    return formattedOutput.split("\n");
  }, [formattedOutput]);

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
                JSON Formatter & Validator
              </h1>
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Paste messy or minified JSON and get a clean, properly indented, easy-to-read structure instantly. Validate your JSON, catch syntax errors with line numbers, and switch between beautified and minified output — all processed locally in your browser. Free, fast, and no signup required.
              </p>
            </div>

            {/* Action Toolbar */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4 dark:border-white/10 dark:bg-slate-950/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left side actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBeautify}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-4 py-2 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(167,139,250,0.5)] active:translate-y-0"
                  >
                    <FiMaximize2 className="h-4 w-4" />
                    Format / Beautify
                  </button>

                  <button
                    type="button"
                    onClick={handleMinify}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <FiMinimize2 className="h-4 w-4" />
                    Minify
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="h-4 w-4 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:border-white/10 dark:bg-slate-800/90 dark:text-rose-400 dark:hover:bg-slate-800"
                  >
                    <FiTrash2 className="h-4 w-4" />
                    Clear
                  </button>
                </div>

                {/* Right side controls: Indentation selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Indent:
                  </span>
                  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-900">
                    {(["2", "4", "tab"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleIndentChange(opt)}
                        className={`min-h-[36px] rounded-lg px-3 py-1 text-xs font-bold transition ${
                          indentOption === opt
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        {opt === "tab" ? "Tab" : `${opt} Spaces`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tab Switcher (Visible only on < md screens) */}
            <div className="mt-4 flex rounded-xl border border-slate-200 bg-slate-100 p-1 md:hidden dark:border-white/10 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveTab("input")}
                className={`flex-1 min-h-[44px] rounded-lg py-2 text-xs font-bold transition ${
                  activeTab === "input"
                    ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Input JSON
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("output")}
                className={`flex-1 min-h-[44px] rounded-lg py-2 text-xs font-bold transition ${
                  activeTab === "output"
                    ? "bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Formatted Output {formattedOutput && `(${outputLines.length} lines)`}
              </button>
            </div>

            {/* Main Dual Editor Area */}
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {/* Input Panel */}
              <div
                className={`flex flex-col ${
                  activeTab === "input" ? "block" : "hidden md:flex"
                }`}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="json-input"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                  >
                    Raw / Input JSON
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Auto-formats on paste
                  </span>
                </div>

                <div className="relative mt-2 min-h-[380px] flex-1">
                  <textarea
                    id="json-input"
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onPaste={handlePaste}
                    placeholder='Paste raw or unformatted JSON here, e.g. {"name": "Velmora", "tools": ["JSON Formatter"]}'
                    className="h-full min-h-[380px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs leading-relaxed text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 sm:text-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/20"
                    spellCheck={false}
                  />
                </div>

                {/* Validation Error Alert Box */}
                {error && (
                  <div className="mt-3 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-200">
                    <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Invalid JSON Syntax</span>
                        {error.line !== null && (
                          <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-900 dark:bg-rose-900/80 dark:text-rose-100">
                            Line {error.line}
                            {error.column !== null ? `, Col ${error.column}` : ""}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-[11px] leading-tight opacity-90">
                        {error.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Output Panel */}
              <div
                className={`flex flex-col ${
                  activeTab === "output" ? "block" : "hidden md:flex"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Formatted Output
                  </span>
                  {formattedOutput && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ Valid JSON
                    </span>
                  )}
                </div>

                <div className="relative mt-2 min-h-[380px] flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 dark:border-white/10 dark:bg-slate-950/90">
                  {outputLines.length > 0 ? (
                    <div className="max-h-[500px] overflow-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
                      <table className="w-full border-collapse">
                        <tbody>
                          {outputLines.map((line, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/40">
                              <td className="w-10 select-none pr-3 text-right font-mono text-xs text-slate-500 dark:text-slate-600">
                                {idx + 1}
                              </td>
                              <td className="whitespace-pre font-mono">
                                <JsonSyntaxLine line={line} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex min-h-[380px] flex-col items-center justify-center p-6 text-center text-slate-500 dark:text-slate-500">
                      <FiCode className="h-10 w-10 text-slate-400 opacity-40 dark:text-slate-600" />
                      <p className="mt-3 text-xs sm:text-sm">
                        Formatted JSON with syntax highlighting will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy Disclaimer Note */}
            <div className="mt-4 text-right">
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Your JSON is processed locally and never uploaded anywhere.
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
                  Everything You Need to Know About JSON Formatting & Validation
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
            <RelatedTools currentPath="/tools/json-formatter" />
          </main>
        </div>
      </div>
    </>
  );
}
