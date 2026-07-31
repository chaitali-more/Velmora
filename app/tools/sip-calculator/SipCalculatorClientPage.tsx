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

type InvestmentMode = "sip" | "lumpsum";

interface YearlyCompounding {
  year: number;
  investedSoFar: number;
  maturityValue: number;
  estReturns: number;
}

const faqData = [
  {
    question: "What is a Systematic Investment Plan (SIP) and how does it work?",
    answer:
      "A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds where you invest a fixed amount of money regularly (e.g., monthly) instead of making a one-time payment. It allows you to build wealth over time through compounding and benefits from Rupee Cost Averaging, meaning you buy more units when prices are low and fewer when they are high.",
  },
  {
    question: "What is the difference between SIP and Lumpsum investment?",
    answer:
      "A SIP involves regular, periodic contributions (monthly, weekly, etc.) into an investment plan. It is ideal for salaried individuals to invest systematically. A Lumpsum investment is a one-time major deposit made at once, suitable for those who have a large surplus of idle cash (e.g., from bonuses, property sales, or savings).",
  },
  {
    question: "How does the compounding formula calculate SIP returns?",
    answer:
      "SIP returns are calculated using the Future Value of an Annuity formula: M = P × [ ( (1 + i)^n - 1 ) / i ] × (1 + i), where P is the monthly investment, i is the periodic interest rate (annual return rate divided by 12, then divided by 100), and n is the total number of monthly payments. Compounding helps your accumulated returns earn further returns over the investment period.",
  },
  {
    question: "What expected return rate should I enter in the calculator?",
    answer:
      "Mutual funds do not offer guaranteed returns as they are linked to the market. Historically, long-term equity mutual funds in India have delivered average returns ranging between 12% to 15% per annum. Debt mutual funds generally yield between 6% to 9%. You should choose a conservative expected rate of return based on your fund type and historic performance.",
  },
  {
    question: "How does Rupee Cost Averaging help long-term investors?",
    answer:
      "Rupee Cost Averaging eliminates the need to time the market. When market prices fall, your fixed SIP installment buys more mutual fund units. When markets rise, it buys fewer units. Over a long tenure, this averages out the cost of unit purchase, lowering your overall purchase price and maximizing profits when the market trends upward.",
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

export default function SipCalculatorClientPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Mode state
  const [mode, setMode] = useState<InvestmentMode>("sip");

  // Inputs
  const [amount, setAmount] = useState<number>(5000);
  const [amountInput, setAmountInput] = useState<string>("5000");

  const [returnRate, setReturnRate] = useState<number>(12);
  const [returnRateInput, setReturnRateInput] = useState<string>("12");

  const [tenure, setTenure] = useState<number>(10);
  const [tenureInput, setTenureInput] = useState<string>("10");

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
    return buildToolPageSchema("/tools/sip-calculator");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Auto-adjust default amount ranges when switching modes
  const handleModeChange = (selectedMode: InvestmentMode) => {
    if (selectedMode === mode) return;
    setMode(selectedMode);
    if (selectedMode === "sip") {
      setAmount(5000);
      setAmountInput("5000");
    } else {
      setAmount(50000);
      setAmountInput("50000");
    }
  };

  const handleAmountChange = (val: number) => {
    const minVal = mode === "sip" ? 500 : 1000;
    const maxVal = mode === "sip" ? 1000000 : 10000000;
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    setAmount(clamped);
    setAmountInput(clamped.toString());
  };

  const handleAmountInput = (strVal: string) => {
    setAmountInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setAmount(parsed);
    }
  };

  const handleReturnRateChange = (val: number) => {
    const clamped = Math.max(1, Math.min(30, val));
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
    const clamped = Math.max(1, Math.min(40, val));
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

  // Core Compounding Calculations
  const calculationResults = useMemo(() => {
    const P = Math.max(0, amount);
    const R = Math.max(0, returnRate);
    const Y = Math.max(1, tenure);

    let investedAmount = 0;
    let maturityValue = 0;
    const amortization: YearlyCompounding[] = [];

    if (mode === "sip") {
      const monthlyRate = R / 12 / 100;
      const totalMonths = Y * 12;

      investedAmount = P * totalMonths;

      if (monthlyRate === 0) {
        maturityValue = P * totalMonths;
      } else {
        maturityValue = P * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      }

      // Populate year-by-year growth
      for (let year = 1; year <= Y; year++) {
        const months = year * 12;
        const yearInvested = P * months;
        let yearMaturity = 0;
        if (monthlyRate === 0) {
          yearMaturity = P * months;
        } else {
          yearMaturity = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        }
        amortization.push({
          year,
          investedSoFar: yearInvested,
          maturityValue: yearMaturity,
          estReturns: Math.max(0, yearMaturity - yearInvested),
        });
      }
    } else {
      // Lumpsum Mode
      const annualRateDecimal = R / 100;
      investedAmount = P;
      maturityValue = P * Math.pow(1 + annualRateDecimal, Y);

      // Populate year-by-year growth
      for (let year = 1; year <= Y; year++) {
        const yearMaturity = P * Math.pow(1 + annualRateDecimal, year);
        amortization.push({
          year,
          investedSoFar: P,
          maturityValue: yearMaturity,
          estReturns: Math.max(0, yearMaturity - P),
        });
      }
    }

    const estReturns = Math.max(0, maturityValue - investedAmount);

    return {
      investedAmount,
      estReturns,
      maturityValue,
      amortization,
    };
  }, [mode, amount, returnRate, tenure]);

  // Recharts Data
  const chartData = useMemo(() => {
    return [
      { name: "Invested Amount", value: calculationResults.investedAmount },
      { name: "Estimated Returns", value: calculationResults.estReturns },
    ];
  }, [calculationResults]);

  const COLORS = ["#06b6d4", "#a855f7"]; // Cyan & Purple matching Velmora gradient

  const handleCopySummary = async () => {
    const text = `Investment Mode: ${mode.toUpperCase()}\nInvested Amount: ${formatINR(
      calculationResults.investedAmount
    )}\nExpected Return Rate: ${returnRate}%\nTenure: ${tenure} Years\nEstimated Returns: ${formatINR(
      calculationResults.estReturns
    )}\nTotal Value (Maturity): ${formatINR(
      calculationResults.maturityValue
    )}\nCalculated with Velmora SIP & Lumpsum Calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Investment summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy to clipboard.");
    }
  };

  const handleReset = () => {
    if (mode === "sip") {
      setAmount(5000);
      setAmountInput("5000");
    } else {
      setAmount(50000);
      setAmountInput("50000");
    }
    setReturnRate(12);
    setReturnRateInput("12");
    setTenure(10);
    setTenureInput("10");
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
                SIP & Lumpsum Calculator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Calculate expected returns for your mutual fund Systematic Investment Plan (SIP) or one-time Lumpsum investments instantly. Get an interactive breakdown chart and a year-by-year compounding growth schedule.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="mt-6 grid grid-cols-2 border-b border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => handleModeChange("sip")}
                className={`py-3.5 px-2 text-xs sm:text-sm font-black transition relative text-center ${
                  mode === "sip"
                    ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 dark:border-cyan-400"
                    : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                SIP (Monthly Investment)
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("lumpsum")}
                className={`py-3.5 px-2 text-xs sm:text-sm font-black transition relative text-center ${
                  mode === "lumpsum"
                    ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 dark:border-cyan-400"
                    : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Lumpsum (One-time)
              </button>
            </div>

            {/* Main Interactive Workspace (Grid layout) */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Input Parameters Section */}
              <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Investment Details
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

                {/* Field 1: Amount */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {mode === "sip" ? "Monthly Investment (₹)" : "Lumpsum Investment (₹)"}
                    </label>
                    <div className="relative w-36 sm:w-44">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={amountInput}
                        onChange={(e) => handleAmountInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-7 pr-3 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={mode === "sip" ? 500 : 1000}
                    max={mode === "sip" ? 100000 : 1000000}
                    step={mode === "sip" ? 500 : 1000}
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-500 dark:bg-slate-800 dark:accent-cyan-400"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {(mode === "sip"
                      ? [
                          { label: "₹1,000", value: 1000 },
                          { label: "₹2,000", value: 2000 },
                          { label: "₹5,000", value: 5000 },
                          { label: "₹10,000", value: 10000 },
                          { label: "₹25,000", value: 25000 },
                          { label: "₹50,000", value: 50000 },
                        ]
                      : [
                          { label: "₹10,000", value: 10000 },
                          { label: "₹25,000", value: 25000 },
                          { label: "₹50,000", value: 50000 },
                          { label: "₹1 Lakh", value: 100000 },
                          { label: "₹5 Lakhs", value: 500000 },
                          { label: "₹10 Lakhs", value: 1000000 },
                        ]
                    ).map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handleAmountChange(preset.value)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          amount === preset.value
                            ? "bg-cyan-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 2: Expected returnRate */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Expected Return Rate (% p.a.)
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

                  {/* Preset Rates */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[6, 8, 10, 12, 15, 18, 20].map((rate) => (
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

                {/* Field 3: Time Period */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Time Period (Years)
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
                    max={40}
                    step={1}
                    value={tenure}
                    onChange={(e) => handleTenureChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-fuchsia-500 dark:bg-slate-800 dark:accent-fuchsia-400"
                  />

                  {/* Preset Tenure Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[1, 5, 10, 15, 20, 25, 30, 40].map((tVal) => (
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

              {/* StatCards & Visual Breakdown Chart (Right side on desktop) */}
              <div className="space-y-5 lg:col-span-6">
                {/* StatCards Grid */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {/* Primary Highlight Card: Maturity Value */}
                  <div className="relative overflow-hidden rounded-2xl border border-cyan-300/80 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-4.5 text-center shadow-lg shadow-cyan-500/5 sm:col-span-2 dark:border-cyan-400/30 dark:from-cyan-400/15 dark:to-violet-500/15">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                      Total Expected Wealth
                    </span>
                    <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                      {formatINR(calculationResults.maturityValue)}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Accumulated value after {tenure} years
                    </p>
                  </div>

                  {/* Stat Card 2: Invested Amount */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Invested Amount
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.investedAmount)}
                    </p>
                  </div>

                  {/* Stat Card 3: Est. Returns */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Est. Returns
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
                        Wealth Breakdown
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

            {/* Collapsible Year-by-Year Growth Table */}
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
                      Annual Compounding Growth Schedule
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click to {showAmortization ? "hide" : "view"} year-by-year invested amount and estimated returns breakdown
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
                          Estimated Returns (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Total Value (₹)
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
                Learn more about SIPs, lumpsum investing, compounding, and wealth creation strategies.
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

            <RelatedTools currentPath="/tools/sip-calculator" />
          </main>
        </div>
      </div>
    </>
  );
}
