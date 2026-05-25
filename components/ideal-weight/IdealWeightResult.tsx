"use client";

import type { IdealWeightResultProps } from "@/types/ideal-weight";

const toneClasses = {
  healthy:
    "border-emerald-200 bg-emerald-50/90 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200",
  caution:
    "border-amber-200 bg-amber-50/90 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200",
  neutral:
    "border-slate-200 bg-slate-50/90 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200",
} as const;

export default function IdealWeightResult({ result, actions }: IdealWeightResultProps & { actions?: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        Your Ideal Weight
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-cyan-500/20 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-slate-900/80 dark:to-violet-500/10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Estimated Ideal Weight
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
              {result.primary.weightKg.toFixed(1)}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">
              kg
            </span>
            <span className="pb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              / {result.primary.weightLbs.toFixed(1)} lbs
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Primary target using the {result.primary.label} formula at {result.heightCm.toFixed(1)} cm /{" "}
            {result.heightIn.toFixed(1)} in.
          </p>
        </div>

        <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-violet-500/20 dark:bg-gradient-to-br dark:from-violet-500/10 dark:via-slate-900/80 dark:to-fuchsia-500/10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Weight Range (All Formulas)
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-black leading-none text-transparent sm:text-4xl dark:from-slate-100 dark:to-slate-300">
              {result.range.minKg.toFixed(1)}-{result.range.maxKg.toFixed(1)}
            </span>
            <span className="pb-1 text-base font-medium text-slate-500 dark:text-slate-400">
              kg
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Comparative span across the formulas you included: {result.range.minLbs.toFixed(1)}-
            {result.range.maxLbs.toFixed(1)} lbs.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {result.comparisons.map((entry) => (
          <div
            key={entry.formula}
            className={`rounded-2xl border p-4 ${
              entry.isPrimary
                ? "border-cyan-300 bg-cyan-50/90 dark:border-cyan-400/40 dark:bg-cyan-500/10"
                : "border-white/70 bg-white/80 dark:border-white/10 dark:bg-slate-900/80"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {entry.label}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                  {entry.weightKg.toFixed(1)} kg
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {entry.weightLbs.toFixed(1)} lbs
                </p>
              </div>
              {entry.isPrimary ? (
                <span className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Primary
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {result.bmiReference ? (
        <div className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            BMI healthy reference
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {result.bmiReference.minKg.toFixed(1)}-{result.bmiReference.maxKg.toFixed(1)} kg
            </span>
            <span className="pb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              / {result.bmiReference.minLbs.toFixed(1)}-{result.bmiReference.maxLbs.toFixed(1)} lbs
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Based on BMI {result.bmiReference.minBmi} to {result.bmiReference.maxBmi}. Use this as a general healthy-weight context, not a personalized diagnosis.
          </p>
        </div>
      ) : null}

      <div className={`rounded-2xl border p-4 text-sm leading-relaxed ${toneClasses[result.interpretation.tone]}`}>
        <p className="font-semibold">{result.interpretation.title}</p>
        <p className="mt-1">{result.interpretation.message}</p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
  These are general estimates. Your ideal weight can vary based on body type, muscle mass, and lifestyle.
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
