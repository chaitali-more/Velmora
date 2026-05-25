"use client";

import type { CalorieResultProps } from "@/types/calorie";

export default function CalorieResult({ result, actions }: CalorieResultProps & { actions?: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Your Daily Calorie Plan</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-cyan-500/20 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-slate-900/80 dark:to-violet-500/10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">BMR (Calories at Rest)</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
              {result.bmr}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">kcal/day</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Estimated calories your body uses at rest.
          </p>
        </div>

        <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-violet-500/20 dark:bg-gradient-to-br dark:from-violet-500/10 dark:via-slate-900/80 dark:to-fuchsia-500/10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Maintain Weight</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
              {result.maintenance}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">kcal/day</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Estimated calories to maintain your current weight at {result.activityLabel.toLowerCase()}.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {result.goals.map((goal) => (
          <div key={goal.label} className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{goal.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">{goal.calories} kcal</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{goal.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        Real calorie needs vary with body composition, hormones, age-related changes, health status, medications, stress, sleep, and training quality. Adjust based on real-world progress.
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
