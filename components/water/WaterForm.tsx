"use client";

import { ActivityLevel, WaterFormProps } from "@/types/water";

export default function WaterForm({
  weight,
  activity,
  setWeight,
  setActivity,
}: WaterFormProps) {
  return (
    <div className="mb-6 flex flex-col gap-5">
      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Weight</label>
        <div className="relative mt-2">
          <input
            type="number"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-2xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
            placeholder="Enter weight"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">kg</span>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Activity Level</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevel)}
          className="mt-2 w-full rounded-2xl border border-white/60 bg-white/85 px-5 py-4 text-base font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

