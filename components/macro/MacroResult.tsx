"use client";

import type { MacroPercents, MacroResultData } from "@/types/macro";

type MacroResultProps = {
  result: MacroResultData | null;
  percents: MacroPercents;
};

const cards = [
  { key: "protein", label: "Protein", unit: "grams/day", color: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200" },
  { key: "carbs", label: "Carbs", unit: "grams/day", color: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200" },
  { key: "fat", label: "Fat", unit: "grams/day", color: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200" },
] as const;

export default function MacroResult({ result, percents }: MacroResultProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-950">
        <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Calories/day</p>
        <div className="mt-1 flex items-end justify-center gap-2">
          <span className="text-5xl font-black leading-none text-slate-950 dark:text-slate-100">
            {result ? result.calories.toLocaleString() : "--"}
          </span>
          <span className="pb-2 text-sm font-bold text-slate-500 dark:text-slate-400">kcal</span>
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border p-3 ${card.color}`}
          >
            <div>
              <p className="text-lg font-black text-slate-950 dark:text-slate-100">{card.label}</p>
              <p className="text-xs font-semibold opacity-80">{percents[card.key]}% of calories</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-slate-950 dark:text-slate-100">
                {result ? result[card.key] : "--"}
              </p>
              <p className="text-xs font-semibold">{card.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
