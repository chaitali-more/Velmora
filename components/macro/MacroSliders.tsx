"use client";

import type { MacroPercents } from "@/types/macro";

type MacroSlidersProps = {
  percents: MacroPercents;
  total: number;
  onChange: (field: keyof MacroPercents, value: number) => void;
};

const sliderRows: Array<{
  field: keyof MacroPercents;
  label: string;
  accent: string;
  darkAccent: string;
}> = [
  { field: "protein", label: "Protein", accent: "accent-sky-600", darkAccent: "dark:accent-sky-400" },
  { field: "carbs", label: "Carbs", accent: "accent-orange-500", darkAccent: "dark:accent-orange-400" },
  { field: "fat", label: "Fat", accent: "accent-emerald-600", darkAccent: "dark:accent-emerald-400" },
];

export default function MacroSliders({ percents, total, onChange }: MacroSlidersProps) {
  const validTotal = total === 100;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-black text-slate-950 dark:text-slate-100">Create your own plan</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            validTotal
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
              : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200"
          }`}
        >
          {total}%
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {sliderRows.map((row) => (
          <label key={row.field} className="grid gap-2 sm:grid-cols-[84px_1fr_48px] sm:items-center">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{row.label}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={percents[row.field]}
              onInput={(event) => onChange(row.field, Number(event.currentTarget.value))}
              onChange={(event) => onChange(row.field, Number(event.target.value))}
              className={`h-2 w-full cursor-pointer rounded-full ${row.accent} ${row.darkAccent}`}
            />
            <span className="text-sm font-black text-slate-950 dark:text-slate-100">{percents[row.field]}%</span>
          </label>
        ))}
      </div>

      {!validTotal ? (
        <p className="mt-3 text-sm font-semibold text-rose-600 dark:text-rose-300">
          Total macro percentage must equal 100%.
        </p>
      ) : null}
    </div>
  );
}
