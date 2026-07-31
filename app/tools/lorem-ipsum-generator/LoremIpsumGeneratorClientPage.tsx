"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiShield,
  FiAlignLeft,
  FiList,
  FiFileText,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";
import { buildToolPageSchema } from "@/lib/tool-page-schema";

type Mode = "paragraphs" | "sentences" | "words" | "lists";
type ParagraphLength = "short" | "medium" | "long";

const VOCABULARY = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod",
  "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat",
  "duis", "aute", "irure", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "etiam", "ultricies", "nisi", "vel", "augue", "vestibulum",
  "ante", "ipsum", "primis", "in", "faucibus", "orci", "luctus", "et", "ultrices", "posuere", "cubilia", "curae",
  "donec", "velit", "neque", "auctor", "sit", "amet", "aliquet", "id", "gravida", "nec", "nulla", "aenean", "ut",
  "eros", "et", "nisl", "sagittis", "vestibulum", "nullam", "nulla", "eros", "ultricies", "sit", "amet", "nonummy",
  "id", "imperdiet", "feugiat", "pede", "sed", "lectus", "donec", "mollis", "tempor", "urna", "aenean", "ac",
  "tellus", "suspendisse", "eu", "erat", "lobortis", "convallis", "morbi", "ac", "purus", "fusce", "vulputate",
  "cursus", "tellus", "duis", "vitae", "magna", "nec", "magna", "imperdiet", "tempor"
];

const faqData = [
  {
    question: "What is Lorem Ipsum placeholder text?",
    answer:
      "Lorem Ipsum is standard dummy placeholder text used by designers, web developers, and publishers to fill empty spaces before real copy is written. It has been the industry standard since the 1500s because its natural-looking word distribution prevents readers from being distracted by readable content.",
  },
  {
    question: "What can I customize with this Lorem Ipsum Generator?",
    answer:
      "You can generate standard paragraphs, single sentences, single lists (wrapped in bullet elements), or a raw count of words. You can also specify the length profile of your paragraphs (Short, Medium, or Long) and wrap the generated outputs in HTML tags (<p> or <li>) for quick integration into code editors.",
  },
  {
    question: "Is this tool completely free and private?",
    answer:
      "Yes! Like all Velmora tools, this Lorem Ipsum Generator executes 100% locally in your browser. No text is generated or sent through external APIs, preserving your workflow efficiency and privacy.",
  },
  {
    question: "How do I copy the generated dummy text?",
    answer:
      "Simply customize your generation preferences using the sliders and selection buttons, and click the 'Copy Text' button at the top right of the output container to copy the text to your clipboard.",
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

export default function LoremIpsumGeneratorClientPage() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(5);
  const [length, setLength] = useState<ParagraphLength>("medium");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrapWithHtml, setWrapWithHtml] = useState(false);

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/tools/lorem-ipsum-generator");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === "paragraphs") setCount(5);
    else if (newMode === "sentences") setCount(10);
    else if (newMode === "words") setCount(100);
    else setCount(6);
  };

  const maxCount = useMemo(() => {
    if (mode === "paragraphs") return 50;
    if (mode === "sentences") return 100;
    if (mode === "words") return 1000;
    return 30;
  }, [mode]);

  const handleCountChange = (value: number) => {
    const val = Math.max(1, Math.min(maxCount, value));
    setCount(val);
  };

  // Helper generators
  const getRandomWord = () => {
    return VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];
  };

  const generateWordsList = (wordCount: number) => {
    const arr: string[] = [];
    for (let w = 0; w < wordCount; w++) {
      arr.push(getRandomWord());
    }
    return arr;
  };

  const generateSentenceText = (isFirst = false) => {
    if (isFirst && startWithLorem) {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    }
    const len = Math.floor(Math.random() * 11) + 8; // 8 to 18 words
    const words = generateWordsList(len);
    const text = words.join(" ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const generateParagraphText = (isFirst = false) => {
    let sentenceCount = 6;
    if (length === "short") sentenceCount = Math.floor(Math.random() * 3) + 3; // 3 to 5
    else if (length === "long") sentenceCount = Math.floor(Math.random() * 5) + 10; // 10 to 14
    else sentenceCount = Math.floor(Math.random() * 4) + 6; // 6 to 9

    const sentences: string[] = [];
    for (let s = 0; s < sentenceCount; s++) {
      sentences.push(generateSentenceText(isFirst && s === 0) + ".");
    }
    return sentences.join(" ");
  };

  // Output generator
  const generatedOutput = useMemo(() => {
    if (count < 1) return "";

    if (mode === "words") {
      let words = generateWordsList(count);
      if (startWithLorem) {
        words = ["lorem", "ipsum", "dolor", "sit", "amet", ...words.slice(5)];
      }
      const rawText = words.join(" ");
      return wrapWithHtml ? `<span>${rawText}</span>` : rawText;
    }

    if (mode === "sentences") {
      const arr: string[] = [];
      for (let s = 0; s < count; s++) {
        const sen = generateSentenceText(s === 0) + ".";
        arr.push(wrapWithHtml ? `<span>${sen}</span>` : sen);
      }
      return arr.join(wrapWithHtml ? "\n" : " ");
    }

    if (mode === "lists") {
      const arr: string[] = [];
      for (let i = 0; i < count; i++) {
        // 4 to 8 words per list item phrase
        const len = Math.floor(Math.random() * 5) + 4;
        let words = generateWordsList(len);
        if (i === 0 && startWithLorem) {
          words = ["lorem", "ipsum", "dolor", ...words.slice(3)];
        }
        const phrase = words.join(" ");
        const itemText = phrase.charAt(0).toUpperCase() + phrase.slice(1);
        arr.push(wrapWithHtml ? `  <li>${itemText}</li>` : `• ${itemText}`);
      }
      return wrapWithHtml ? `<ul>\n${arr.join("\n")}\n</ul>` : arr.join("\n");
    }

    // Paragraphs
    const paras: string[] = [];
    for (let p = 0; p < count; p++) {
      const paraText = generateParagraphText(p === 0);
      paras.push(wrapWithHtml ? `<p>${paraText}</p>` : paraText);
    }
    return paras.join(wrapWithHtml ? "\n\n" : "\n\n");
  }, [mode, count, length, startWithLorem, wrapWithHtml]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generatedOutput);
      setCopied(true);
      showToast("Placeholder text copied!");
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
                Lorem Ipsum Generator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Generate highly customizable placeholder dummy text for documents, design mockups, and web layouts. Choose paragraphs, sentences, words, or lists with custom formatting.
              </p>
            </div>

            {/* Main Workspace (Grid Layout) */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Generator Controls */}
              <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40 lg:col-span-5">
                <div className="border-b border-slate-100 pb-3 dark:border-white/5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Generator Options
                  </h2>
                </div>

                {/* Mode Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Generate Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                    {(
                      [
                        { id: "paragraphs", label: "Paragraphs", icon: FiFileText },
                        { id: "sentences", label: "Sentences", icon: FiAlignLeft },
                        { id: "words", label: "Words", icon: FiAlignLeft },
                        { id: "lists", label: "Lists", icon: FiList },
                      ] as const
                    ).map((m) => {
                      const Icon = m.icon;
                      const isActive = mode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleModeChange(m.id)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-bold transition ${
                            isActive
                              ? "border-cyan-500 bg-cyan-500 text-white shadow-sm dark:border-cyan-400 dark:bg-cyan-400"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Count Controller */}
                <div className="space-y-2 pt-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Amount to Generate
                    </label>
                    <div className="relative w-28 sm:w-32">
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={maxCount}
                        value={count}
                        onChange={(e) => handleCountChange(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-7 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        Qty
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={maxCount}
                    step={1}
                    value={count}
                    onChange={(e) => handleCountChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-500 dark:bg-slate-800 dark:accent-cyan-400"
                  />
                </div>

                {/* Paragraph Length Controls (Only for Paragraph Mode) */}
                {mode === "paragraphs" && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 pt-4 dark:border-white/5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Paragraph Length
                    </label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-950">
                      {(["short", "medium", "long"] as const).map((len) => (
                        <button
                          key={len}
                          type="button"
                          onClick={() => setLength(len)}
                          className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition capitalize ${
                            length === len
                              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Configuration Toggles */}
                <div className="space-y-3.5 pt-2 border-t border-slate-100 pt-4 dark:border-white/5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Formatting Options
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-white/10 dark:bg-slate-950"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Start with &quot;Lorem ipsum...&quot;
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wrapWithHtml}
                      onChange={(e) => setWrapWithHtml(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-white/10 dark:bg-slate-950"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Wrap in HTML tags
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Side: Output Preview Container */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 shadow-inner dark:border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Generated Placeholder
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                    >
                      {copied ? (
                        <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <FiCopy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied" : "Copy Text"}
                    </button>
                  </div>

                  <div className="max-h-[350px] overflow-y-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text pr-2 scrollbar-none">
                    {wrapWithHtml ? (
                      /* Rich Highlighted HTML Output */
                      <code className="block select-text">
                        {generatedOutput.split(/(\r?\n)/).map((line, lIdx) => {
                          if (line.match(/\r?\n/)) return <br key={`br-${lIdx}`} />;
                          
                          // Simple regex highlighting for tags <p>, <li>, <ul>, <span>
                          const tagRegex = /(<\/?[a-z0-9]+>)/gi;
                          const parts = line.split(tagRegex);

                          return (
                            <span key={`line-${lIdx}`} className="select-text">
                              {parts.map((part, pIdx) => {
                                const isTag = tagRegex.test(part);
                                return (
                                  <span
                                    key={`part-${pIdx}`}
                                    className={
                                      isTag
                                        ? "text-cyan-400 font-bold select-text"
                                        : "text-slate-300 select-text"
                                    }
                                  >
                                    {part}
                                  </span>
                                );
                              })}
                            </span>
                          );
                        })}
                      </code>
                    ) : (
                      /* Standard Text Output */
                      <div className="select-text">{generatedOutput}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Learn more about placeholder text, lists, and customization modes.
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

            <RelatedTools currentPath="/tools/lorem-ipsum-generator" />
          </main>
        </div>
      </div>
    </>
  );
}
