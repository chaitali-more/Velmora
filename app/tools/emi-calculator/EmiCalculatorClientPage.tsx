"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiDollarSign,
  FiInfo,
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

type TenureUnit = "years" | "months";

interface YearlyAmortization {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

const faqData = [
  {
    question: "What is EMI and how is it calculated?",
    answer:
      "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMI is calculated using the reducing balance method formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly installments.",
  },
  {
    question: "How does changing loan tenure affect my monthly EMI and total interest?",
    answer:
      "A longer loan tenure reduces your monthly EMI amount, making payments more manageable in the short term. However, it significantly increases the total interest payable over the entire life of the loan. Conversely, a shorter tenure leads to higher monthly EMIs but drastically reduces total interest paid.",
  },
  {
    question: "What is the reducing balance method for interest calculation?",
    answer:
      "In the reducing balance method, interest is calculated every month on the outstanding principal balance rather than the initial principal amount. As you pay each monthly EMI, a portion goes toward interest and the rest reduces the principal, resulting in lower interest charges in subsequent months.",
  },
  {
    question: "Can I use this calculator for Home, Car, and Personal Loans?",
    answer:
      "Yes! This EMI calculator works for all types of reducing-balance loans, including home loans, auto/car loans, personal loans, education loans, and business loans. Simply adjust the loan amount, interest rate, and tenure according to your loan terms.",
  },
  {
    question: "How does an amortization schedule help in financial planning?",
    answer:
      "An amortization schedule breaks down each repayment into principal paid and interest paid across the loan tenure. Viewing the year-by-year summary allows you to see how your balance decreases over time and helps you plan prepayments or refinancing effectively.",
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

const formatNumberOnly = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(val);
};

export default function EmiCalculatorClientPage() {
  const [isMounted, setIsMounted] = useState(false);

  // Input states
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanAmountInput, setLoanAmountInput] = useState<string>("500000");

  const [interestRate, setInterestRate] = useState<number>(10);
  const [interestRateInput, setInterestRateInput] = useState<string>("10");

  const [tenure, setTenure] = useState<number>(5);
  const [tenureInput, setTenureInput] = useState<string>("5");
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("years");

  // UI state
  const [copied, setCopied] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/tools/emi-calculator");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Synchronize numeric input values when state updates
  const handleLoanAmountChange = (val: number) => {
    const clamped = Math.max(10000, Math.min(100000000, val));
    setLoanAmount(clamped);
    setLoanAmountInput(clamped.toString());
  };

  const handleLoanAmountInput = (strVal: string) => {
    setLoanAmountInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setLoanAmount(parsed);
    }
  };

  const handleInterestRateChange = (val: number) => {
    const clamped = Math.max(0.1, Math.min(30, val));
    setInterestRate(clamped);
    setInterestRateInput(clamped.toString());
  };

  const handleInterestRateInput = (strVal: string) => {
    setInterestRateInput(strVal);
    const parsed = parseFloat(strVal.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed >= 0) {
      setInterestRate(parsed);
    }
  };

  const handleTenureChange = (val: number) => {
    const maxVal = tenureUnit === "years" ? 30 : 360;
    const clamped = Math.max(1, Math.min(maxVal, val));
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

  const handleTenureUnitToggle = (unit: TenureUnit) => {
    if (unit === tenureUnit) return;
    if (unit === "months") {
      const convertedMonths = Math.min(360, Math.max(1, tenure * 12));
      setTenureUnit("months");
      setTenure(convertedMonths);
      setTenureInput(convertedMonths.toString());
    } else {
      const convertedYears = Math.min(30, Math.max(1, Math.round(tenure / 12)));
      setTenureUnit("years");
      setTenure(convertedYears);
      setTenureInput(convertedYears.toString());
    }
  };

  // Core EMI Calculation
  const calculationResults = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const annualRate = Math.max(0, interestRate);
    const totalMonths =
      tenureUnit === "years" ? tenure * 12 : Math.max(1, tenure);

    if (P <= 0 || totalMonths <= 0) {
      return {
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalAmount: P,
        totalMonths,
        amortization: [] as YearlyAmortization[],
      };
    }

    const r = annualRate / 12 / 100;
    let monthlyEmi = 0;

    if (r === 0) {
      monthlyEmi = P / totalMonths;
    } else {
      const compoundFactor = Math.pow(1 + r, totalMonths);
      monthlyEmi = (P * r * compoundFactor) / (compoundFactor - 1);
    }

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - P);

    // Amortization Schedule (Year-by-Year Aggregation)
    const amortization: YearlyAmortization[] = [];
    let currentBalance = P;
    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
    let currentYearTotal = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const monthInterest = r === 0 ? 0 : currentBalance * r;
      const monthPrincipal = Math.min(
        currentBalance,
        monthlyEmi - monthInterest
      );
      const monthTotal = monthPrincipal + monthInterest;

      currentBalance = Math.max(0, currentBalance - monthPrincipal);

      currentYearPrincipal += monthPrincipal;
      currentYearInterest += monthInterest;
      currentYearTotal += monthTotal;

      const isYearEnd = month % 12 === 0 || month === totalMonths;
      if (isYearEnd) {
        const yearNumber = Math.ceil(month / 12);
        amortization.push({
          year: yearNumber,
          principalPaid: currentYearPrincipal,
          interestPaid: currentYearInterest,
          totalPaid: currentYearTotal,
          remainingBalance: currentBalance,
        });
        currentYearPrincipal = 0;
        currentYearInterest = 0;
        currentYearTotal = 0;
      }
    }

    return {
      monthlyEmi,
      totalInterest,
      totalPayment,
      principalAmount: P,
      totalMonths,
      amortization,
    };
  }, [loanAmount, interestRate, tenure, tenureUnit]);

  // Recharts Data
  const chartData = useMemo(() => {
    return [
      { name: "Principal Amount", value: calculationResults.principalAmount },
      { name: "Total Interest", value: calculationResults.totalInterest },
    ];
  }, [calculationResults]);

  const COLORS = ["#06b6d4", "#a855f7"]; // Cyan & Purple matching Velmora gradient

  const handleCopySummary = async () => {
    const text = `Loan Amount: ${formatINR(
      calculationResults.principalAmount
    )}\nInterest Rate: ${interestRate}%\nTenure: ${tenure} ${tenureUnit}\nMonthly EMI: ${formatINR(
      calculationResults.monthlyEmi
    )}\nTotal Interest: ${formatINR(
      calculationResults.totalInterest
    )}\nTotal Payment: ${formatINR(
      calculationResults.totalPayment
    )}\nCalculated with Velmora EMI Calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("EMI summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy to clipboard.");
    }
  };

  const handleReset = () => {
    setLoanAmount(500000);
    setLoanAmountInput("500000");
    setInterestRate(10);
    setInterestRateInput("10");
    setTenure(5);
    setTenureInput("5");
    setTenureUnit("years");
    showToast("Values reset to default!");
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const maxTenureRange = tenureUnit === "years" ? 30 : 360;

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
                EMI Calculator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Calculate your monthly loan EMI, total interest, and repayment
                schedule instantly — for home loans, car loans, or personal
                loans. Get an interactive breakdown chart and full
                amortization details with zero signup required.
              </p>
            </div>

            {/* Main Interactive Workspace (Grid layout) */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Input Parameters Section (Left side on desktop) */}
              <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Loan Details
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

                {/* Field 1: Loan Amount */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Loan Amount (₹)
                    </label>
                    <div className="relative w-36 sm:w-44">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={loanAmountInput}
                        onChange={(e) => handleLoanAmountInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-7 pr-3 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={loanAmount}
                    onChange={(e) =>
                      handleLoanAmountChange(Number(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-500 dark:bg-slate-800 dark:accent-cyan-400"
                  />

                  {/* Quick Preset Buttons for Loan Amount */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[
                      { label: "1 Lakh", value: 100000 },
                      { label: "5 Lakhs", value: 500000 },
                      { label: "10 Lakhs", value: 1000000 },
                      { label: "25 Lakhs", value: 2500000 },
                      { label: "50 Lakhs", value: 5000000 },
                      { label: "1 Crore", value: 10000000 },
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handleLoanAmountChange(preset.value)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          loanAmount === preset.value
                            ? "bg-cyan-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 2: Interest Rate */}
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
                        value={interestRateInput}
                        onChange={(e) =>
                          handleInterestRateInput(e.target.value)
                        }
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
                    value={interestRate}
                    onChange={(e) =>
                      handleInterestRateChange(Number(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-violet-500 dark:bg-slate-800 dark:accent-violet-400"
                  />

                  {/* Preset Rates */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[7.5, 8.5, 9.5, 10.5, 12, 14].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleInterestRateChange(rate)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          interestRate === rate
                            ? "bg-violet-500 text-white shadow-sm"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 3: Loan Tenure */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Loan Tenure
                    </label>

                    {/* Unit Toggle Button Group */}
                    <div className="flex items-center gap-2">
                      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-slate-950">
                        <button
                          type="button"
                          onClick={() => handleTenureUnitToggle("years")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            tenureUnit === "years"
                              ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          }`}
                        >
                          Yr
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTenureUnitToggle("months")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            tenureUnit === "months"
                              ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          }`}
                        >
                          Mo
                        </button>
                      </div>

                      <div className="w-24 sm:w-28">
                        <input
                          type="number"
                          inputMode="decimal"
                          value={tenureInput}
                          onChange={(e) => handleTenureInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-right text-sm font-black text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:bg-slate-950"
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={maxTenureRange}
                    step={1}
                    value={tenure}
                    onChange={(e) =>
                      handleTenureChange(Number(e.target.value))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-fuchsia-500 dark:bg-slate-800 dark:accent-fuchsia-400"
                  />

                  {/* Preset Tenure Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {(tenureUnit === "years"
                      ? [1, 3, 5, 10, 15, 20, 30]
                      : [12, 24, 36, 60, 120, 180, 240]
                    ).map((tVal) => (
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
                        {tVal} {tenureUnit === "years" ? "Yrs" : "Mos"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* StatCards & Visual Breakdown Chart (Right side on desktop) */}
              <div className="space-y-5 lg:col-span-6">
                {/* StatCards Grid */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {/* Primary Highlight Card: Monthly EMI */}
                  <div className="relative overflow-hidden rounded-2xl border border-cyan-300/80 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-4.5 text-center shadow-lg shadow-cyan-500/5 sm:col-span-3 dark:border-cyan-400/30 dark:from-cyan-400/15 dark:to-violet-500/15">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                      Monthly Loan EMI
                    </span>
                    <p className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                      {formatINR(calculationResults.monthlyEmi)}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Payable for {calculationResults.totalMonths} months
                    </p>
                  </div>

                  {/* Stat Card 2: Total Interest */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Total Interest
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.totalInterest)}
                    </p>
                  </div>

                  {/* Stat Card 3: Total Payment */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Total Payment
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.totalPayment)}
                    </p>
                  </div>

                  {/* Stat Card 4: Principal Loan Amount */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Principal Loan
                    </span>
                    <p className="mt-1 text-lg font-black text-slate-900 sm:text-xl dark:text-slate-100">
                      {formatINR(calculationResults.principalAmount)}
                    </p>
                  </div>
                </div>

                {/* Pie Chart Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <FiPieChart className="h-4 w-4 text-cyan-500" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                        Payment Breakdown
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

            {/* Collapsible Year-by-Year Amortization Schedule Table */}
            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
              <button
                type="button"
                onClick={() => setShowAmortization((prev) => !prev)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <FiTable className="h-4 w-4 text-violet-500" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
                      Amortization Schedule (Year-by-Year)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click to {showAmortization ? "hide" : "view"} annual
                      principal and interest breakdown
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
                          Principal Paid (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Interest Paid (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Total Paid (₹)
                        </th>
                        <th className="px-4 py-3 font-black uppercase tracking-wider">
                          Balance (₹)
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
                            {formatINR(row.principalPaid)}
                          </td>
                          <td className="px-4 py-3 font-semibold text-purple-600 dark:text-purple-400">
                            {formatINR(row.interestPaid)}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                            {formatINR(row.totalPaid)}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-400">
                            {formatINR(row.remainingBalance)}
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
                Learn more about loan EMIs, interest calculations, and smart
                repayment strategies.
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
            <RelatedTools currentPath="/tools/emi-calculator" />
          </main>
        </div>
      </div>
    </>
  );
}
