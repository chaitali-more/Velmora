"use client";

import { macroPlans } from "@/lib/macro";
import type { MacroPlanId } from "@/types/macro";

type MacroTabsProps = {
  selectedPlan: MacroPlanId;
  onSelect: (plan: MacroPlanId) => void;
};

export default function MacroTabs({ selectedPlan, onSelect }: MacroTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {(Object.keys(macroPlans) as MacroPlanId[]).map((plan) => {
        const active = selectedPlan === plan;

        return (
          <button
            key={plan}
            type="button"
            onClick={() => onSelect(plan)}
            className={`relative rounded-lg px-3 py-2.5 text-sm font-bold transition duration-200 ${
              active
                ? "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]"
                : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-200"
            }`}
          >
            {macroPlans[plan].label}
            {active ? (
              <span className="absolute -bottom-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 rotate-45 bg-violet-500 sm:block" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
