"use client";

import { activityLevels, formulaLabels } from "@/lib/bmr";
import type { BMRResultProps } from "@/types/bmr";

export default function BMRResult({ result, actions }: BMRResultProps & { actions?: React.ReactNode }) {
  const activityMeta = result.activityLevel ? activityLevels[result.activityLevel] : null;

  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Your BMR Result</p>

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
           Calories your body needs to function at rest.
          </p>
        </div>

        <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-violet-500/20 dark:bg-gradient-to-br dark:from-violet-500/10 dark:via-slate-900/80 dark:to-fuchsia-500/10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">TDEE (Daily Calories Needed)</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
              {result.tdee ?? "--"}
            </span>
            <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">kcal/day</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {activityMeta
           ? `Calories you need each day based on your ${activityMeta.label.toLowerCase()}.`
              : "Select an activity level to estimate real-world daily calorie needs."}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Calculation Method</p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">{formulaLabels[result.formula]}</p>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/80">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Activity factor</p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            {activityMeta ? `${activityMeta.label} (${activityMeta.factor}x)` : "Not selected"}
          </p>
          {activityMeta ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{activityMeta.description}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        These numbers are estimates. Your actual calorie needs may vary based on your body, lifestyle, and health.
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
