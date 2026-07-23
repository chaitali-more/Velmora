"use client";

import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiClipboard,
  FiCopy,
  FiPercent,
  FiRotateCcw,
  FiShield,
} from "react-icons/fi";

type CalcMode = "mode1" | "mode2" | "mode3" | "mode4";

const calcModes: { id: CalcMode; label: string; shortLabel: string }[] = [
  { id: "mode1", label: "What is X% of Y?", shortLabel: "X% of Y" },
  { id: "mode2", label: "X is what % of Y?", shortLabel: "X is % of Y" },
  { id: "mode3", label: "Percentage increase/decrease", shortLabel: "% Change" },
  { id: "mode4", label: "X% increase/decrease of a number", shortLabel: "X% of Number" },
];

const faqData = [
  {
    question: "How do I calculate a percentage of a number?",
    answer:
      'To find a percentage of a number, divide the percentage by 100 and multiply it by the number. For example, to find 20% of 150, calculate (20 ÷ 100) × 150 = 30. Use the "What is X% of Y?" tab above to get this result instantly.',
  },
  {
    question: "How do I calculate percentage increase or decrease?",
    answer:
      'Percentage change is calculated by subtracting the original value from the new value, dividing by the original value, then multiplying by 100. For example, going from 100 to 125 is a 25% increase: ((125 − 100) ÷ 100) × 100 = 25%. Use the "Percentage increase/decrease" tab to calculate this automatically.',
  },
  {
    question: "How do I find what percentage one number is of another?",
    answer:
      'Divide the smaller (or relevant) number by the total, then multiply by 100. For example, to find what percent 30 is of 150, calculate (30 ÷ 150) × 100 = 20%. Use the "X is what percent of Y?" tab above for instant results.',
  },
  {
    question: "Can this tool calculate discounts and price increases?",
    answer:
      'Yes. Use the "X% increase/decrease of a number" tab to calculate a discount (decrease) or markup (increase) on any price. For example, a 20% discount on a $150 item would show a final price of $120.',
  },
  {
    question: 'Why am I seeing "—" instead of a number?',
    answer:
      'This appears when a calculation would involve dividing by zero, such as when the original value is set to 0 in a percentage change calculation. Enter a non-zero value to see a valid result.',
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

export default function PercentageCalculatorClientPage() {
  const [activeMode, setActiveMode] = useState<CalcMode>("mode1");

  // Mode 1 State: What is X% of Y?
  const [m1X, setM1X] = useState<string>("20");
  const [m1Y, setM1Y] = useState<string>("150");

  // Mode 2 State: X is what % of Y?
  const [m2X, setM2X] = useState<string>("30");
  const [m2Y, setM2Y] = useState<string>("150");

  // Mode 3 State: Percentage increase/decrease (Original -> New)
  const [m3Orig, setM3Orig] = useState<string>("100");
  const [m3New, setM3New] = useState<string>("125");

  // Mode 4 State: X% increase/decrease of a number
  const [m4Num, setM4Num] = useState<string>("150");
  const [m4Pct, setM4Pct] = useState<string>("20");
  const [m4Type, setM4Type] = useState<"increase" | "decrease">("increase");

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "—";
    const rounded = Math.round(num * 100) / 100;
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  // Calculations derived with useMemo
  const calculationResult = useMemo(() => {
    switch (activeMode) {
      case "mode1": {
        const x = parseFloat(m1X);
        const y = parseFloat(m1Y);
        if (isNaN(x) || isNaN(y)) {
          return { value: "—", formula: `X% of Y`, summary: "Enter valid numbers above" };
        }
        const res = (x / 100) * y;
        return {
          value: formatNumber(res),
          formula: `${formatNumber(x)}% of ${formatNumber(y)}`,
          summary: `${formatNumber(x)}% of ${formatNumber(y)} = ${formatNumber(res)}`,
        };
      }

      case "mode2": {
        const x = parseFloat(m2X);
        const y = parseFloat(m2Y);
        if (isNaN(x) || isNaN(y) || y === 0) {
          return { value: "—", formula: `X is what % of Y`, summary: y === 0 ? "Cannot divide by 0" : "Enter valid numbers above" };
        }
        const pct = (x / y) * 100;
        return {
          value: `${formatNumber(pct)}%`,
          formula: `${formatNumber(x)} is what % of ${formatNumber(y)}`,
          summary: `${formatNumber(x)} is ${formatNumber(pct)}% of ${formatNumber(y)}`,
        };
      }

      case "mode3": {
        const orig = parseFloat(m3Orig);
        const newV = parseFloat(m3New);
        if (isNaN(orig) || isNaN(newV) || orig === 0) {
          return { value: "—", formula: `Original to New Value`, summary: orig === 0 ? "Cannot divide by 0" : "Enter valid numbers above" };
        }
        const diff = newV - orig;
        const pctChange = (diff / orig) * 100;
        const isIncrease = pctChange >= 0;
        const absPct = Math.abs(pctChange);
        return {
          value: `${isIncrease ? "Increased" : "Decreased"} by ${formatNumber(absPct)}%`,
          formula: `From ${formatNumber(orig)} to ${formatNumber(newV)}`,
          summary: `${isIncrease ? "Increased" : "Decreased"} by ${formatNumber(absPct)}% (${diff >= 0 ? "+" : ""}${formatNumber(diff)})`,
        };
      }

      case "mode4": {
        const num = parseFloat(m4Num);
        const pct = parseFloat(m4Pct);
        if (isNaN(num) || isNaN(pct)) {
          return { value: "—", formula: `Number ${m4Type} by X%`, summary: "Enter valid numbers above" };
        }
        const changeAmount = num * (pct / 100);
        const finalVal = m4Type === "increase" ? num + changeAmount : num - changeAmount;
        return {
          value: formatNumber(finalVal),
          formula: `${formatNumber(num)} ${m4Type}d by ${formatNumber(pct)}%`,
          summary: `${formatNumber(num)} ${m4Type}d by ${formatNumber(pct)}% = ${formatNumber(finalVal)}`,
        };
      }
    }
  }, [activeMode, m1X, m1Y, m2X, m2Y, m3Orig, m3New, m4Num, m4Pct, m4Type]);

  const handleCopy = async () => {
    if (!calculationResult.summary || calculationResult.value === "—") return;
    try {
      await navigator.clipboard.writeText(calculationResult.summary);
      setCopied(true);
      showToast("Result copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy result.");
    }
  };

  const handleReset = () => {
    setM1X("20");
    setM1Y("150");
    setM2X("30");
    setM2Y("150");
    setM3Orig("100");
    setM3New("125");
    setM4Num("150");
    setM4Pct("20");
    setM4Type("increase");
    showToast("Values reset!");
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
                Percentage Calculator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Calculate percentages, percentage increase or decrease, and percentage 
                change instantly. Whether you&apos;re working out a discount, a tip, exam 
                scores, or business growth, this free tool gives you accurate results 
                in real time — no signup required.
              </p>
            </div>

            {/* Main Percentage Calculator Interface */}
            <div className="mt-5 max-w-3xl sm:mt-8">
              {/* Calculation Mode Selector Tabs (Mobile-First Touch Grid) */}
              <div>
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Select Calculation Type
                </p>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
                  {calcModes.map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setActiveMode(mode.id)}
                        className={`flex min-h-[44px] items-center justify-center rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all active:scale-95 ${
                          isActive
                            ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)]"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`}
                      >
                        <span className="sm:hidden">{mode.shortLabel}</span>
                        <span className="hidden sm:inline">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Input Form Card */}
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                {/* MODE 1: What is X% of Y? */}
                {activeMode === "mode1" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      What is X% of Y?
                    </p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Percentage (X%)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            inputMode="decimal"
                            value={m1X}
                            onChange={(e) => setM1X(e.target.value)}
                            placeholder="e.g. 20"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 pr-8 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            %
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Of Number (Y)
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m1Y}
                          onChange={(e) => setM1Y(e.target.value)}
                          placeholder="e.g. 150"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2: X is what % of Y? */}
                {activeMode === "mode2" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      X is what percent of Y?
                    </p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Part Value (X)
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m2X}
                          onChange={(e) => setM2X(e.target.value)}
                          placeholder="e.g. 30"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Total Value (Y)
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m2Y}
                          onChange={(e) => setM2Y(e.target.value)}
                          placeholder="e.g. 150"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 3: Percentage Increase / Decrease */}
                {activeMode === "mode3" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Percentage Increase / Decrease
                    </p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Original Value
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m3Orig}
                          onChange={(e) => setM3Orig(e.target.value)}
                          placeholder="e.g. 100"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          New Value
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m3New}
                          onChange={(e) => setM3New(e.target.value)}
                          placeholder="e.g. 125"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 4: X% Increase/Decrease of a number */}
                {activeMode === "mode4" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      X% Increase or Decrease of a Number
                    </p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Starting Number
                        </label>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={m4Num}
                          onChange={(e) => setM4Num(e.target.value)}
                          placeholder="e.g. 150"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Action
                        </label>
                        <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-1 dark:border-white/10 dark:bg-slate-950/70">
                          <button
                            type="button"
                            onClick={() => setM4Type("increase")}
                            className={`rounded-lg py-2 text-xs font-bold transition ${
                              m4Type === "increase"
                                ? "bg-emerald-500 text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                          >
                            Increase (+)
                          </button>
                          <button
                            type="button"
                            onClick={() => setM4Type("decrease")}
                            className={`rounded-lg py-2 text-xs font-bold transition ${
                              m4Type === "decrease"
                                ? "bg-rose-500 text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                          >
                            Decrease (-)
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Percentage (%)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            inputMode="decimal"
                            value={m4Pct}
                            onChange={(e) => setM4Pct(e.target.value)}
                            placeholder="e.g. 20"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 pr-8 text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlighted Result Display Card */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-4 sm:p-6 dark:border-cyan-400/20 dark:from-cyan-950/40 dark:via-violet-950/30 dark:to-fuchsia-950/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 sm:text-xs">
                      Calculated Result
                    </span>
                    <h2 className="mt-1 font-mono text-2xl font-black text-slate-900 sm:text-4xl dark:text-slate-100">
                      {calculationResult.value}
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-slate-600 sm:text-sm dark:text-slate-300">
                      {calculationResult.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2.5">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                      <FiRotateCcw className="h-3.5 w-3.5" />
                      <span>Reset</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={calculationResult.value === "—"}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all active:scale-95 disabled:opacity-40"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="h-3.5 w-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-3.5 w-3.5" />
                          <span>Copy Result</span>
                        </>
                      )}
                    </button>
                  </div>
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
                  Everything You Need to Know About Percentage Calculations
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
