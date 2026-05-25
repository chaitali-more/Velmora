"use client";

import ProteinForm from "@/components/protein/ProteinForm";
import ProteinResult from "@/components/protein/ProteinResult";
import FAQSection from "@/components/calculators/FAQSection";
import ResultPlaceholder from "@/components/calculators/ResultPlaceholder";
import { proteinFaqs } from "@/data/calculator-faqs";
import { proteinActivityLevels, proteinGoals } from "@/lib/protein";
import { useProteinCalculator } from "@/hooks/useProteinCalculator";

export default function ProteinPage() {
  const { values, errors, result, handleValueChange, calculate, reset } = useProteinCalculator();
  const activity = proteinActivityLevels[values.activityLevel];
  const goal = proteinGoals[values.goal];

  return (
    <div className="relative min-h-screen overflow-x-clip px-3 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:rounded-[2rem] dark:border dark:border-white/10 dark:bg-slate-900/55 dark:p-3 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Health Tool</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Protein Calculator
            </h1>
            <p className="mt-2 text-sm   text-slate-600 dark:text-slate-300">
              Find out how much protein you need every day to stay fit and healthy.
            </p>

            <div className="mt-6 space-y-4 sm:mt-7">
              <ProteinForm
                values={values}
                errors={errors}
                onChange={handleValueChange}
                onCalculate={calculate}
                onReset={reset}
              />

              <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-slate-800/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.4)]">
                <p className="text-sm font-black text-slate-900 dark:text-slate-100">Current plan</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl bg-white px-3 py-2 dark:bg-slate-950">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Activity</p>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">{activity.label}</p>
                  </div>
                  <div className="rounded-xl bg-white px-3 py-2 dark:bg-slate-950">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Goal</p>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">{goal.label}</p>
                  </div>
                  <div className="rounded-xl bg-sky-100 px-3 py-2 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
                    <p className="text-xs font-bold">Factor</p>
                    <p className="text-sm font-black">
                      {(activity.factor + goal.adjustment).toFixed(2)}g/kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-16 h-52 w-52 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/20" />

            {result ? (
              <div className="relative z-10">
                <ProteinResult result={result} />
              </div>
            ) : (
              <ResultPlaceholder description="Fill the form on the left and hit Calculate. Your daily protein range and calories from protein will appear here." />
            )}
          </section>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl">
        <FAQSection items={proteinFaqs} />
      </div>
    </div>
  );
}
