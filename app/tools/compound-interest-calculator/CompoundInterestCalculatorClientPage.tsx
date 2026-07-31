"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiPieChart,
  FiRotateCcw,
  FiShield,
  FiTable,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { buildToolPageSchema } from "@/lib/tool-page-schema";

type AdditionFrequency = "none" | "monthly" | "annually";
type CompoundFrequency = "daily" | "monthly" | "quarterly" | "semiannually" | "annually";

interface YearlyProjection {
  year: number;
  investedSoFar: number;
  maturityValue: number;
  estReturns: number;
}

const faqData = [
  {
    question: "What is compound interest and how does it work?",
    answer:
      "Compound interest is the interest calculated on both the initial principal amount and the accumulated interest from previous periods. It is essentially earning 'interest on interest', which allows your wealth or savings to grow exponentially over time compared to simple interest.",
  },
  {
    question: "How does compounding frequency affect my returns?",
    answer:
      "Compounding frequency refers to how often interest is calculated and added back to the principal. The more frequently interest compounds (e.g., daily instead of annually), the faster your balance grows. Daily compounding yields slightly more returns than monthly compounding, which in turn yields more than quarterly or annual compounding under the same nominal rate.",
  },
  {
    question: "What is the difference between Simple Interest and Compound Interest?",
    answer:
      "Simple interest is calculated strictly on the original principal amount for the entire duration. Compound interest calculates interest on the principal plus all interest earned previously. Compound interest creates an exponential growth curve, whereas simple interest increases linearly.",
  },
  {
    question: "How do regular monthly or annual deposits accelerate compounding?",
    answer:
      "Adding regular deposits (additions) regularly increases the principal base upon which your interest is calculated. By contributing monthly or yearly, you compound not only your initial capital but also all subsequent additions and their interest, leading to a much larger final maturity value.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick, handy formula to estimate how long it will take for your money to double at a given annual interest rate under compounding. You simply divide 72 by your expected annual interest rate. For example, an investment with a 12% annual return rate will double in approximately 6 years (72 / 12 = 6).",
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

const formatINR = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
};

export default function CompoundInterestCalculatorClientPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Inputs
  const [principal, setPrincipal] = useState<number>(50000);
  const [principalInput, setPrincipalInput] = useState<string>("50000");

  const [additionAmount, setAdditionAmount] = useState<number>(2000);
  const [additionInput, setAdditionInput] = useState<string>("2000");
  const [additionFrequency, setAdditionFrequency] = useState<AdditionFrequency>("monthly");

  const [returnRate, setReturnRate] = useState<number>(10);
  const [returnRateInput, setReturnRateInput] = useState<string>("10");

  const [tenure, setTenure] = useState<number>(10);
  const [tenureInput, setTenureInput] = useState<string>("10");

  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>("monthly");

  // UI state
  const [copied, setCopied] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/tools/compound-interest-calculator");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handlePrincipalChange = (val: number) => {
    const clamped = Math.max(1000, Math.min(10000000, val));
    setPrincipal(clamped);
    setPrincipalInput(clamped.toString());
  };

  const handlePrincipalInput = (strVal: string) => {
    setPrincipalInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setPrincipal(parsed);
    }
  };

  const handleAdditionChange = (val: number) => {
    const clamped = Math.max(0, Math.min(1000000, val));
    setAdditionAmount(clamped);
    setAdditionInput(clamped.toString());
  };

  const handleAdditionInput = (strVal: string) => {
    setAdditionInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setAdditionAmount(parsed);
    }
  };

  const handleReturnRateChange = (val: number) => {
    const clamped = Math.max(0.1, Math.min(30, val));
    setReturnRate(clamped);
    setReturnRateInput(clamped.toString());
  };

  const handleReturnRateInput = (strVal: string) => {
    setReturnRateInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setReturnRate(parsed);
    }
  };

  const handleTenureChange = (val: number) => {
    const clamped = Math.max(1, Math.min(50, val));
    setTenure(clamped);
    setTenureInput(clamped.toString());
  };

  const handleTenureInput = (strVal: string) => {
    setTenureInput(strVal);
    const parsed = parseInt(strVal.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setTenure(parsed);
    }
  };

  // Compounding simulation logic
  const calculationResults = useMemo(() => {
    const P = Math.max(0, principal);
    const R = Math.max(0, returnRate) / 100;
    const Y = Math.max(1, tenure);
    const PMT = additionFrequency === "none" ? 0 : Math.max(0, additionAmount);

    let currentBalance = P;
    let totalInvested = P;
    const amortization: YearlyProjection[] = [];

    for (let year = 1; year <= Y; year++) {
      for (let month = 1; month <= 12; month++) {
        // Apply monthly addition at the start of the month
        if (additionFrequency === "monthly" && PMT > 0) {
          currentBalance += PMT;
          totalInvested += PMT;
        }

        // Apply compounding interest
        let monthlyInterest = 0;
        if (compoundFrequency === "daily") {
          // (1 + R/365)^(365/12) - 1
          const factor = Math.pow(1 + R / 365, 365 / 12);
          monthlyInterest = currentBalance * (factor - 1);
        } else if (compoundFrequency === "monthly") {
          monthlyInterest = currentBalance * (R / 12);
        } else if (compoundFrequency === "quarterly") {
          if (month % 3 === 0) {
            monthlyInterest = currentBalance * (R / 4);
          }
        } else if (compoundFrequency === "semiannually") {
          if (month % 6 === 0) {
            monthlyInterest = currentBalance * (R / 2);
          }
        } else if (compoundFrequency === "annually") {
          if (month % 12 === 0) {
            monthlyInterest = currentBalance * R;
          }
        }

        currentBalance += monthlyInterest;
      }

      // Apply annual addition at the end of the year
      if (additionFrequency === "annually" && PMT > 0) {
        currentBalance += PMT;
        totalInvested += PMT;
      }

      amortization.push({
        year,
        investedSoFar: totalInvested,
        maturityValue: currentBalance,
        estReturns: Math.max(0, currentBalance - totalInvested),
      });
    }

    const estReturns = Math.max(0, currentBalance - totalInvested);

    return {
      investedAmount: totalInvested,
      estReturns,
      maturityValue: currentBalance,
      amortization,
    };
  }, [principal, returnRate, tenure, additionAmount, additionFrequency, compoundFrequency]);

  // Recharts Data
  const chartData = useMemo(() => {
    return [
      { name: "Invested Amount", value: calculationResults.investedAmount },
      { name: "Compounded Interest", value: calculationResults.estReturns },
    ];
  }, [calculationResults]);

  const COLORS = ["#06b6d4", "#a855f7"]; // Cyan & Purple matching Velmora gradient

  const handleCopySummary = async () => {
    const text = `Initial Principal: ${formatINR(principal)}\n` +
      `Regular Deposits: ${additionFrequency !== "none" ? `${formatINR(additionAmount)} (${additionFrequency})` : "None"}\n` +
      `Compounding Frequency: ${compoundFrequency.toUpperCase()}\n` +
      `Expected Return Rate: ${returnRate}%\n` +
      `Tenure: ${tenure} Years\n` +
      `Total Invested: ${formatINR(calculationResults.investedAmount)}\n` +
      `Earned Interest: ${formatINR(calculationResults.estReturns)}\n` +
      `Maturity Value: ${formatINR(calculationResults.maturityValue)}\n` +
      `Calculated with Velmora Compound Interest Calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Compounding summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy to clipboard.");
    }
  };

  const handleReset = () => {
    setPrincipal(50000);
    setPrincipalInput("50000");
    setAdditionAmount(2000);
    setAdditionInput("2000");
    setAdditionFrequency("monthly");
    setReturnRate(10);
    setReturnRateInput("10");
    setTenure(10);
    setTenureInput("10");
    setCompoundFrequency("monthly");
    showToast("Values reset to default!");
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
                Compound Interest Calculator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Determine the future compounding growth of your money. Customize compounding frequencies from daily to annual, and model regular monthly or annual additions with dynamic analytics breakdown.
              </p>
            </div>

            {/* Main Interactive Workspace (Grid layout) */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Input Parameters Section */}
              <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Growth Parameters
                  </h2>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  >
                    <FiRotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>

                {/* Parameter 1: Initial Principal */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Initial Principal (₹)
                    </label>
                    <div className="relative w-36 sm:w-44">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={principalInput}
                        onChange={(e) => handlePrincipalInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-7 pr-3 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={principal}
                    onChange={(e) => handlePrincipalChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-500 dark:bg-slate-800 dark:accent-cyan-400"
                  />

                  {/* Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[10000, 25000, 50000, 100000, 250000, 500000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePrincipalChange(preset)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          principal === preset
                            ? "bg-cyan-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        ₹{preset.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 2: Regular additions */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Regular Deposits (₹)
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={additionFrequency}
                        onChange={(e) => setAdditionFrequency(e.target.value as AdditionFrequency)}
                        className="flex-1 sm:flex-initial rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-800 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
                      >
                        <option value="none">No Deposit</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                      </select>

                      {additionFrequency !== "none" && (
                        <div className="relative flex-1 sm:flex-initial sm:w-32">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            ₹
                          </span>
                          <input
                            type="number"
                            inputMode="decimal"
                            value={additionInput}
                            onChange={(e) => handleAdditionInput(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-7 pr-3 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {additionFrequency !== "none" && (
                    <>
                      <input
                        type="range"
                        min={100}
                        max={100000}
                        step={500}
                        value={additionAmount}
                        onChange={(e) => handleAdditionChange(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-teal-500 dark:bg-slate-800 dark:accent-teal-400"
                      />
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {[1000, 2000, 5000, 10000, 20000, 50000].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleAdditionChange(preset)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                              additionAmount === preset
                                ? "bg-teal-500 text-white shadow-sm"
                                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            }`}
                          >
                            ₹{preset.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Parameter 3: Expected Interest Rate */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Interest Rate (% p.a.)
                    </label>
                    <div className="relative w-28 sm:w-32">
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        value={returnRateInput}
                        onChange={(e) => handleReturnRateInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-7 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        %
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={0.1}
                    value={returnRate}
                    onChange={(e) => handleReturnRateChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-violet-500 dark:bg-slate-800 dark:accent-violet-400"
                  />

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[5, 7, 9, 10, 12, 15, 20].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleReturnRateChange(rate)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          returnRate === rate
                            ? "bg-violet-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 4: Compounding Frequency */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 pt-4 dark:border-white/5">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Compounding Frequency
                    </label>
                    <select
                      value={compoundFrequency}
                      onChange={(e) => setCompoundFrequency(e.target.value as CompoundFrequency)}
                      className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-800 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
                    >
                      <option value="daily">Daily compounding</option>
                      <option value="monthly">Monthly compounding</option>
                      <option value="quarterly">Quarterly compounding</option>
                      <option value="semiannually">Half-yearly compounding</option>
                      <option value="annually">Annual compounding</option>
                    </select>
                  </div>
                </div>

                {/* Parameter 5: Tenure */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tenure (Years)
                    </label>
                    <div className="relative w-28 sm:w-32">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={tenureInput}
                        onChange={(e) => handleTenureInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-7 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        Yr
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={tenure}
                    onChange={(e) => handleTenureChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-fuchsia-500 dark:bg-slate-800 dark:accent-fuchsia-400"
                  />

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[1, 5, 10, 15, 20, 25, 30, 45].map((tVal) => (
                      <button
                        key={tVal}
                        type="button"
                        onClick={() => handleTenureChange(tVal)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          tenure === tVal
                            ? "bg-fuchsia-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {tVal} Yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projections Visual Output (Right side on desktop) */}
              <div className="space-y-5 lg:col-span-6">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {/* Primary Highlight Card: Maturity Value */}
                  <div className="relative overflow-hidden rounded-2xl border border-cyan-300/80 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-4.5 text-center shadow-lg shadow-cyan-500/5 sm:col-span-2 dark:border-cyan-400/30 dark:from-cyan-400/15 dark:to-violet-500/15">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                      Maturity Value
                    </span>
                    <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                      {formatINR(calculationResults.maturityValue)}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Accumulated balance after {tenure} years
                    </p>
                  </div>

                  {/* Invested Amount Card */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Total Principal & Deposits
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.investedAmount)}
                    </p>
                  </div>

                  {/* Compounded Interest Card */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Compounded Interest
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.estReturns)}
                    </p>
                  </div>
                </div>

                {/* Pie Chart Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <FiPieChart className="h-4 w-4 text-cyan-500" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Compounding Breakdown
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      {copied ? (
                        <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <FiCopy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied" : "Copy Summary"}
                    </button>
                  </div>

                  <div className="mt-4 h-64 w-full">
                    {isMounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => [
                              formatINR(Number(value) || 0),
                              "",
                            ]}
                            contentStyle={{
                              backgroundColor: "#090d16",
                              borderColor: "rgba(255,255,255,0.1)",
                              borderRadius: "12px",
                              color: "#fff",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value: string) => (
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {value}
                              </span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        Loading chart...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Annual Compound Projection Table */}
            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
              <button
                type="button"
                onClick={() => setShowAmortization((prev) => !prev)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <FiTable className="hidden sm:block h-4 w-4 text-violet-500" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                      Annual Compounding Schedule
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click to {showAmortization ? "hide" : "view"} yearly compounding projections and deposits breakdown
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {showAmortization ? (
                    <FiChevronUp className="h-4 w-4" />
                  ) : (
                    <FiChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {showAmortization && (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Invested Amount (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Compounded Interest (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          End Balance (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {calculationResults.amortization.map((row) => (
                        <tr
                          key={row.year}
                          className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                        >
                          <td className="px-4 py-3 font-black text-slate-900 dark:text-slate-100">
                            Year {row.year}
                          </td>
                          <td className="px-4 py-3 font-semibold text-cyan-600 dark:text-cyan-400">
                            {formatINR(row.investedSoFar)}
                          </td>
                          <td className="px-4 py-3 font-semibold text-purple-600 dark:text-purple-400">
                            {formatINR(row.estReturns)}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                            {formatINR(row.maturityValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* FAQ Accordion Section */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Learn more about compound interest, deposit growth strategies, and compounding frequencies.
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

            <RelatedTools currentPath="/tools/compound-interest-calculator" />
          </main>
        </div>
      </div>
    </>
  );
}
