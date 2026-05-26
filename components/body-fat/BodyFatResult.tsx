"use client";

import type { BodyFatCategory, BodyFatGender, BodyFatResultProps } from "@/types/body-fat";

const categoryStyles: Record<BodyFatCategory, string> = {
  "Essential fat":
    "border-cyan-200 bg-cyan-100 text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-500/15 dark:text-cyan-200",
  Athlete:
    "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200",
  Fitness:
    "border-lime-200 bg-lime-100 text-lime-800 dark:border-lime-500/40 dark:bg-lime-500/15 dark:text-lime-200",
  Average:
    "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-200",
  Obese:
    "border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-200",
};

function getRangeLabel(category: BodyFatCategory, gender: BodyFatGender) {
  const ranges =
    gender === "male"
      ? {
          "Essential fat": "2-5%",
          Athlete: "6-13%",
          Fitness: "14-17%",
          Average: "18-24%",
          Obese: "25%+",
        }
      : {
          "Essential fat": "10-13%",
          Athlete: "14-20%",
          Fitness: "21-24%",
          Average: "25-31%",
          Obese: "32%+",
        };

  return ranges[category];
}

export default function BodyFatResult({ result, gender, actions }: BodyFatResultProps & { actions?: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Your Body Fat Result</p>

      <div className="rounded-xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-cyan-500/20 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-slate-900/80 dark:to-violet-500/10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
              {result.bodyFatPercentage.toFixed(1)}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">% body fat</span>
          </div>
          <div className={`rounded-full border px-5 py-2 text-sm font-semibold shadow-sm dark:shadow-none ${categoryStyles[result.category]}`}>
            {result.category}
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Based on your body measurements, this is an estimate of your body fat percentage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Body Fat (kg)</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{result.fatMassKg.toFixed(1)} kg</p>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Lean Body Mass</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{result.leanMassKg.toFixed(1)} kg</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Your Range</p>
        <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
          {result.category} ({getRangeLabel(result.category, gender)})
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        {result.calorieInsight}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
       This is an estimate and may vary based on how measurements are taken and your body type.
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
