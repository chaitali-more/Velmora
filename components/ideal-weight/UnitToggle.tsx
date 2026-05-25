"use client";

import type { IdealWeightUnitToggleProps } from "@/types/ideal-weight";

export default function UnitToggle({ unit, onChange }: IdealWeightUnitToggleProps) {
  return (
    <div className="mb-6 flex w-full rounded-2xl border border-white/70 bg-white/70 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:inline-flex sm:w-auto dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_rgba(0,0,0,0.35)]">
      {(["metric", "imperial"] as const).map((option) => {
        const isActive = unit === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all sm:flex-none ${
              isActive
                ? "bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_8px_18px_rgba(167,139,250,0.4)]"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {option === "metric" ? "cm" : "in"}
          </button>
        );
      })}
    </div>
  );
}
