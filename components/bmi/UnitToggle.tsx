"use client";

import { UnitToggleProps } from "@/types/bmi";

export default function UnitToggle({
  unit,
  setUnit,
  reset,
}: UnitToggleProps) {
  return (
    <div className="mb-5 flex w-full rounded-xl border border-white/70 bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:mb-6 sm:inline-flex sm:w-auto sm:rounded-xl sm:p-1.5 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_rgba(0,0,0,0.35)]">
      {(["metric", "imperial"] as const).map((u) => {
        const isActive = unit === u;

        return (
          <button
            key={u}
            onClick={() => {
              setUnit(u);
              reset();
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all sm:flex-none sm:rounded-xl sm:px-5 sm:py-2.5 ${
              isActive
                ? "bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_8px_18px_rgba(167,139,250,0.4)]"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {u === "metric" ? "kg / cm" : "lbs / ft"}
          </button>
        );
      })}
    </div>
  );
}

