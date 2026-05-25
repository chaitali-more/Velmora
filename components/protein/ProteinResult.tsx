"use client";

import type { ProteinResultData } from "@/types/protein";

type ProteinResultProps = {
  result: ProteinResultData | null;
};

const cards = [
  { key: "minimum", label: "Minimum Protein Needed", unit: "g/day" },
  { key: "maximum", label: "Maximum Protein Limit", unit: "g/day" },
  { key: "calories", label: "Daily Calories from Protein", unit: "kcal/day" },
] as const;

export default function ProteinResult({ result }: ProteinResultProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 text-center shadow-sm transition dark:border-sky-500/30 dark:bg-sky-500/10">
        <p className="text-xs font-bold uppercase text-sky-700 dark:text-sky-200">Daily Protein Needed</p>
        <div className="mt-2 flex items-end justify-center gap-2">
          <span className="text-6xl font-black leading-none text-slate-950 dark:text-white">
            {result ? result.daily : "--"}
          </span>
          <span className="pb-2 text-lg font-black text-sky-700 dark:text-sky-200">g/day</span>
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-sky-500/40"
          >
            <p className="text-sm font-black text-slate-800 dark:text-slate-200">{card.label}</p>
            <div className="text-right">
              <p className="text-3xl font-black text-slate-950 dark:text-white">
                {result ? result[card.key] : "--"}
              </p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{card.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
