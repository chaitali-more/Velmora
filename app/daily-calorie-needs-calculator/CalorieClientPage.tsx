"use client";

import FAQSection from "@/components/calculators/FAQSection";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import ResultActions from "@/components/calculators/ResultActions";
import ResultPlaceholder from "@/components/calculators/ResultPlaceholder";
import CalorieForm from "@/components/calorie/CalorieForm";
import CalorieResult from "@/components/calorie/CalorieResult";
import UnitToggle from "@/components/calorie/UnitToggle";
import { calorieFaqs } from "@/data/calculator-faqs";
import { useCalorieCalculator } from "@/hooks/useCalorieCalculator";
import { buildShareUrl } from "@/lib/result-sharing";

export default function CaloriePage() {
  const {
    unit,
    values,
    errors,
    result,
    isCalculating,
    handleChange,
    calculate,
    reset,
    changeUnit,
  } = useCalorieCalculator();

  const shareUrl = buildShareUrl("/daily-calorie-needs-calculator", {
    u: unit,
    age: values.age,
    gender: values.gender,
    weight: values.weight,
    heightCm: values.heightCm,
    heightFt: values.heightFt,
    heightIn: values.heightIn,
    activity: values.activityLevel,
  });

  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Health Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">Calorie Calculator</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Find how many calories you need each day to lose, maintain, or gain weight.
            </p>

            <div className="mt-6 sm:mt-7">
              <UnitToggle unit={unit} onChange={changeUnit} />
              <CalorieForm values={values} errors={errors} unit={unit} onChange={handleChange} />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={calculate}
                  disabled={isCalculating}
                  className="rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isCalculating ? "Calculating..." : "Calculate"}
                </button>
                <button
                  onClick={reset}
                  className="rounded-xl border border-white/70 bg-white/85 py-4 text-base font-bold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-white/15 dark:bg-slate-800/90 dark:text-slate-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.4)] dark:hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-16 h-52 w-52 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/20" />

            {isCalculating ? (
              <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/80 bg-white/60 px-5 text-center sm:min-h-[340px] sm:px-6 dark:border-slate-700 dark:bg-slate-900/50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-400 dark:border-slate-700 dark:border-t-cyan-400" />
                <h2 className="mt-5 text-2xl font-black text-slate-900 sm:text-3xl dark:text-slate-100">Calculating your estimate</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Turning your inputs into an easy daily calorie plan now.
                </p>
              </div>
            ) : !result ? (
              <ResultPlaceholder description="Enter your age, gender, height, weight, and activity level. Your daily calorie targets will appear here." />
            ) : (
              <div className="relative z-10">
                <CalorieResult
                  result={result}
                  actions={
                    <ResultActions
                      title="Calorie Calculator Result"
                      shareUrl={shareUrl}
                      filename="velmora-calorie-result"
                      summaryLines={[
                        `BMR: ${result.bmr} kcal/day`,
                        `Maintenance: ${result.maintenance} kcal/day`,
                        `Goal: ${result.goals[2]?.calories ?? result.maintenance} kcal/day`,
                      ]}
                    />
                  }
                />
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl">
        <FAQSection items={calorieFaqs} />
        <RelatedCalculators currentPath="/daily-calorie-needs-calculator" />
      </div>
    </div>
  );
}
