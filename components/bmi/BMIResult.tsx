"use client";

import { BMIResultProps } from "@/types/bmi";
import BMIGauge from "./BMIGauge";

function getZone(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BMIResult({ bmi, actions }: BMIResultProps & { actions?: React.ReactNode }) {
  const zone = getZone(bmi);

  const colorMap: Record<string, string> = {
    Underweight: "border-cyan-200 bg-cyan-100 text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-500/15 dark:text-cyan-200",
    Normal: "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200",
    Overweight: "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-200",
    Obese: "border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-200",
  };

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Your BMI Result</p>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-end gap-2">
          <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black leading-none text-transparent sm:text-5xl dark:from-slate-100 dark:to-slate-300">
            {bmi.toFixed(1)}
          </span>
          <span className="pb-2 text-base font-medium text-slate-500 dark:text-slate-400">kg/m²</span>
        </div>

        <div className={`rounded-full border px-5 py-2 text-sm font-semibold shadow-sm dark:shadow-none ${colorMap[zone]}`}>
          {zone}
        </div>
      </div>

      <BMIGauge bmi={bmi} />
      {actions ? <div className="mt-5">{actions}</div> : null}
    </div>
  );
}

