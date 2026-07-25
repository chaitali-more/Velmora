"use client";

import MacroForm from "@/components/macro/MacroForm";
import MacroResult from "@/components/macro/MacroResult";
import MacroSliders from "@/components/macro/MacroSliders";
import MacroTabs from "@/components/macro/MacroTabs";
import FAQSection from "@/components/calculators/FAQSection";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import ResultPlaceholder from "@/components/calculators/ResultPlaceholder";
import { macroFaqs } from "@/data/calculator-faqs";
import { macroPlans } from "@/lib/macro";
import { useMacroCalculator } from "@/hooks/useMacroCalculator";

export default function MacroPage() {
  const {
    values,
    errors,
    selectedPlan,
    customPercents,
    activePercents,
    percentTotal,
    result,
    handleValueChange,
    selectPlan,
    updateCustomPercent,
    calculate,
  } = useMacroCalculator();

  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:gap-5">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Health Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">Macro Calculator</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
             Find the right balance of protein, carbs, and fat based on your body and fitness goals.
            </p>

            <div className="mt-6 sm:mt-7">
              <MacroTabs selectedPlan={selectedPlan} onSelect={selectPlan} />

              <div className="mt-5 space-y-4">
                <MacroForm
                  values={values}
                  errors={errors}
                  onChange={handleValueChange}
                  onCalculate={calculate}
                />

                {selectedPlan === "custom" ? (
                  <MacroSliders
                    percents={customPercents}
                    total={percentTotal}
                    onChange={updateCustomPercent}
                  />
                ) : (
                  <div className="rounded-xl border border-white/70 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-slate-800/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.4)]">
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">
                      {macroPlans[selectedPlan].label} split
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-sky-100 px-2 py-2 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
                        <p className="text-xs font-bold">Protein</p>
                        <p className="text-xl font-black">{activePercents.protein}%</p>
                      </div>
                      <div className="rounded-xl bg-orange-100 px-2 py-2 text-orange-800 dark:bg-orange-500/15 dark:text-orange-200">
                        <p className="text-xs font-bold">Carbs</p>
                        <p className="text-xl font-black">{activePercents.carbs}%</p>
                      </div>
                      <div className="rounded-xl bg-emerald-100 px-2 py-2 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                        <p className="text-xs font-bold">Fat</p>
                        <p className="text-xl font-black">{activePercents.fat}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-16 h-52 w-52 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/20" />

            {result ? (
              <div className="relative z-10">
                <MacroResult result={result} percents={activePercents} />
              </div>
            ) : (
              <ResultPlaceholder description="Fill the form on the left and hit Calculate. Your daily calories, protein, carbs, and fat targets will appear here." />
            )}
          </section>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl">
        <FAQSection items={macroFaqs} />
        <RelatedCalculators currentPath="/macro-calculator" />
      </div>
    </div>
  );
}
