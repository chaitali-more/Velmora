"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiClipboard,
  FiCopy,
  FiShield,
  FiTrash2,
} from "react-icons/fi";

type CaseType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "sentencecase"
  | "alternatingcase"
  | "inversecase";

type CaseOption = {
  id: CaseType;
  label: string;
  example: string;
};

const caseOptions: CaseOption[] = [
  { id: "uppercase", label: "UPPERCASE", example: "TEXT CASE" },
  { id: "lowercase", label: "lowercase", example: "text case" },
  { id: "titlecase", label: "Title Case", example: "Text Case" },
  { id: "sentencecase", label: "Sentence case", example: "Text case converter." },
  { id: "alternatingcase", label: "aLtErNaTiNg cAsE", example: "tExT cAsE" },
  { id: "inversecase", label: "InVeRsE CaSe", example: "tEXT cASE" },
];

const faqData = [
  {
    question: "What is Title Case and when should I use it?",
    answer:
      'Title Case capitalizes the first letter of every major word in a sentence, commonly used for headlines, blog titles, and book names (e.g., "The Art Of Writing Well"). Small connector words like "a," "the," or "of" are sometimes left lowercase in strict style guides, but this tool capitalizes every word for simplicity and consistency.',
  },
  {
    question: "What's the difference between Title Case and Sentence case?",
    answer:
      'Title Case capitalizes the first letter of every word (e.g., "This Is A Title"), while Sentence case only capitalizes the first letter of each sentence, like normal writing (e.g., "This is a sentence."). Sentence case is typically used for body text and paragraphs, while Title Case is used for headlines and titles.',
  },
  {
    question: "Does this tool store or save my text?",
    answer:
      "No. This tool works entirely in your browser — your text is never sent to any server, stored in a database, or saved anywhere. Once you close or refresh the page, your text is gone. This makes it safe to use for confidential documents, drafts, or personal writing.",
  },
  {
    question: "Can I convert text back to its original case after converting it?",
    answer:
      "Once you apply a case conversion, the original casing isn't automatically saved. If you want to keep the original version, we recommend copying your original text elsewhere before converting, or using your browser's undo (Ctrl+Z / Cmd+Z) inside the text box immediately after conversion.",
  },
  {
    question: "What is aLtErNaTiNg cAsE used for?",
    answer:
      'Alternating case (also called "sarcasm case" or "spongebob case") is mostly used for memes, social media posts, or casual/humorous text online. It has no formal writing use but is a popular formatting style on platforms like X, Instagram, and Discord.',
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

export default function TextCaseConverterClientPage() {
  const [text, setText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const charCountWithSpaces = text.length;

    return {
      wordCount,
      charCountWithSpaces,
    };
  }, [text]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const convertCase = (type: CaseType) => {
    if (!text) {
      showToast("Please enter or paste text first!");
      return;
    }

    let converted = "";

    switch (type) {
      case "uppercase":
        converted = text.toUpperCase();
        break;
      case "lowercase":
        converted = text.toLowerCase();
        break;
      case "titlecase":
        converted = text
          .toLowerCase()
          .replace(/(?:^|\s|-)\S/g, (char) => char.toUpperCase());
        break;
      case "sentencecase":
        converted = text
          .toLowerCase()
          .replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
        break;
      case "alternatingcase": {
        let isLower = true;
        converted = text
          .split("")
          .map((char) => {
            if (/[a-zA-Z]/.test(char)) {
              const res = isLower ? char.toLowerCase() : char.toUpperCase();
              isLower = !isLower;
              return res;
            }
            return char;
          })
          .join("");
        break;
      }
      case "inversecase":
        converted = text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
    }

    setText(converted);
    setActiveCase(type);
    showToast(`Converted to ${type.toUpperCase()}`);
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
        setActiveCase(null);
        showToast("Text pasted from clipboard!");
      }
    } catch {
      showToast("Clipboard access unavailable.");
    }
  };

  const handleClear = () => {
    setText("");
    setActiveCase(null);
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
          <main className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
                <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Free Online Tool • 100% Browser Private
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Text Case Converter
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Convert your text to UPPERCASE, lowercase, Title Case, Sentence case, and more — 
                instantly, with a single click. Useful for editing headlines, cleaning up pasted content, 
                formatting titles, or fixing text typed with Caps Lock accidentally on. Completely free, 
                no signup required, and your text stays private in your browser.
              </p>
            </div>

            {/* Main Conversion Interface */}
            <div className="mt-5 sm:mt-8">
              {/* Textarea Header & Touch-Friendly Mobile Action Toolbar */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor="case-converter-input"
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                >
                  Type or Paste Text Below
                </label>
                
                {/* Actions Toolbar */}
                <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-2">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 transition active:scale-95 sm:px-3.5 sm:py-2 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <FiClipboard className="h-3.5 w-3.5" />
                    <span>Paste</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={!text}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 transition active:scale-95 disabled:opacity-40 sm:px-3.5 sm:py-2 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Clear</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!text}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-3.5 py-2.5 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all active:scale-95 disabled:opacity-40 sm:px-4 sm:py-2"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Textarea */}
              <div className="relative mt-2.5">
                <textarea
                  id="case-converter-input"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setActiveCase(null);
                  }}
                  placeholder="Type or paste your text here, then tap any case button below to convert..."
                  className="min-h-[220px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm leading-relaxed text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 sm:min-h-[260px] sm:p-5 sm:text-base dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/20"
                />
              </div>

              {/* Textarea Quick Summary */}
              <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {text.length === 0
                    ? "0 words · 0 chars"
                    : `${stats.wordCount.toLocaleString()} words · ${stats.charCountWithSpaces.toLocaleString()} chars`}
                </span>
                <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  100% Private
                </span>
              </div>

              {/* Case Conversion Mode Buttons */}
              <div className="mt-5 sm:mt-6">
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Select Case to Convert
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:gap-2.5">
                  {caseOptions.map((option) => {
                    const isActive = activeCase === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => convertCase(option.id)}
                        className={`flex min-h-[44px] items-center justify-center rounded-xl px-3.5 py-3 text-xs font-bold transition-all active:scale-95 ${
                          isActive
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)]"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Toast Feedback Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-2xl dark:bg-white dark:text-slate-900 sm:left-auto sm:right-6 sm:translate-x-0">
                {toastMessage}
              </div>
            )}

            {/* FAQ Accordion Section */}
            <section className="mt-10 border-t border-slate-200/80 pt-8 sm:mt-16 sm:pt-12 dark:border-white/10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                  Everything You Need to Know About Text Case Conversion
                </h2>
              </div>

              <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
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
                        className="flex w-full items-center justify-between p-3.5 text-left font-bold text-slate-900 sm:p-5 dark:text-slate-100"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-base">{faq.question}</span>
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 sm:h-5 sm:w-5 ${
                            isOpen ? "rotate-180 text-cyan-500 dark:text-cyan-400" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-200/60 px-3.5 py-3 text-xs leading-relaxed text-slate-600 sm:px-5 sm:py-4 sm:text-sm dark:border-white/5 dark:text-slate-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
