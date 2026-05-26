"use client";

import { BMIFormProps } from "@/types/bmi";

export default function BMIForm({
  weight,
  height,
  setWeight,
  setHeight,
  unit,
}: BMIFormProps) {
  const wUnit = unit === "metric" ? "kg" : "lbs";
  const hUnit = unit === "metric" ? "cm" : "ft";

  return (
    <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:gap-5">
      <div>
        <label className="text-[11px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em] dark:text-slate-400">Weight</label>
        <div className="relative mt-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-xl border border-white/60 bg-white/85 px-4 py-3.5 pr-12 text-base font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 sm:rounded-xl sm:px-5 sm:py-4 sm:pr-14 sm:text-lg dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
            placeholder="Enter weight"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 sm:right-5 sm:text-sm dark:text-slate-400">{wUnit}</span>
        </div>
      </div>

      <div>
        <label className="text-[11px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em] dark:text-slate-400">Height</label>
        <div className="relative mt-2">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-xl border border-white/60 bg-white/85 px-4 py-3.5 pr-12 text-base font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 sm:rounded-xl sm:px-5 sm:py-4 sm:pr-14 sm:text-lg dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
            placeholder="Enter height"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 sm:right-5 sm:text-sm dark:text-slate-400">{hUnit}</span>
        </div>
      </div>
    </div>
  );
}

