"use client";

import { WaterResultProps } from "@/types/water";

function getProgress(liters: number) {
  return Math.min((liters / 4.5) * 100, 100);
}

function getActivityLabel(activity: WaterResultProps["activity"]) {
  if (activity === "low") return "Low";
  if (activity === "moderate") return "Moderate";
  return "High";
}

export default function WaterResult({ liters, glasses, activity, actions }: WaterResultProps & { actions?: React.ReactNode }) {
  const progress = getProgress(liters);

  return (
    <div className="space-y-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Your Hydration Goal</p>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-end gap-2">
          <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
            {liters.toFixed(2)}
          </span>
          <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">liters/day</span>
        </div>

        <span className="rounded-full border border-cyan-300 bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-500/15 dark:text-cyan-200">
          {getActivityLabel(activity)} Activity
        </span>
      </div>

      <div className="rounded-xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(16,24,40,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
           You should drink <span className="text-cyan-600 dark:text-cyan-300">{liters.toFixed(2)} liters</span> of water per day
        </p>

        <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
         {glasses} glasses per day
        </p>

        {/* <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Daily Target Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div> */}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
