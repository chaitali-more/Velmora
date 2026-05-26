"use client";

import { useState } from "react";
import FAQSection from "@/components/calculators/FAQSection";
import ResultActions from "@/components/calculators/ResultActions";
import ResultPlaceholder from "@/components/calculators/ResultPlaceholder";
import WaterForm from "@/components/water/WaterForm";
import WaterResult from "@/components/water/WaterResult";
import { waterFaqs } from "@/data/calculator-faqs";
import { buildShareUrl } from "@/lib/result-sharing";
import { ActivityLevel } from "@/types/water";

type SavedWater = {
  weight: string;
  activity: ActivityLevel;
  liters: number;
};

const STORAGE_KEY = "velmora_water_intake_last";

function calculateWaterIntake(weight: number, activity: ActivityLevel) {
  let liters = weight * 0.033;

  if (activity === "moderate") liters += 0.5;
  if (activity === "high") liters += 1;

  return parseFloat(liters.toFixed(2));
}

function getSavedWater(): SavedWater | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const saved = JSON.parse(raw) as SavedWater;
    if (
      typeof saved.weight === "string" &&
      ["low", "moderate", "high"].includes(saved.activity) &&
      typeof saved.liters === "number"
    ) {
      return saved;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

export default function WaterPage() {
  const [saved] = useState<SavedWater | null>(() => getSavedWater());
  const [weight, setWeight] = useState(() => {
    if (typeof window === "undefined") return saved?.weight ?? "";
    return new URLSearchParams(window.location.search).get("weight") ?? saved?.weight ?? "";
  });
  const [activity, setActivity] = useState<ActivityLevel>(() => {
    if (typeof window === "undefined") return saved?.activity ?? "low";
    const value = new URLSearchParams(window.location.search).get("activity");
    return value === "moderate" || value === "high" || value === "low" ? value : saved?.activity ?? "low";
  });
  const [liters, setLiters] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const w = parseFloat(weight);

    if (!weight || Number.isNaN(w) || w <= 0) {
      setError("Please enter a valid weight greater than 0.");
      setLiters(null);
      return;
    }

    const result = calculateWaterIntake(w, activity);
    setLiters(result);
    setError("");

    const payload: SavedWater = { weight, activity, liters: result };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const reset = () => {
    setWeight("");
    setActivity("low");
    setLiters(null);
    setError("");
  };

  const glasses = liters === null ? 0 : Math.round((liters * 1000) / 250);
  const shareUrl = buildShareUrl("/water-intake-calculator", {
    weight,
    activity,
  });

  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Health Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">Water Intake Calculator</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your weight and activity level to get your hydration target.</p>

            <div className="mt-6 sm:mt-7">
              <WaterForm
                weight={weight}
                activity={activity}
                setWeight={setWeight}
                setActivity={setActivity}
              />

              {error ? (
                <p className="mb-4 text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
              ) : null}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={handleCalculate}
                  className="rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]"
                >
                  Calculate
                </button>
                <button
                  onClick={reset}
                  className="rounded-xl border border-white/70 bg-white/85 py-4 text-base font-bold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-white/15 dark:bg-slate-800/90 dark:text-slate-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.4)] dark:hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-16 h-52 w-52 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/20" />

            {liters === null ? (
              <ResultPlaceholder description="Fill the form on the left and hit Calculate. Your daily hydration target will appear here." />
            ) : (
              <div className="relative z-10 transition-all duration-500">
                <WaterResult
                  liters={liters}
                  glasses={glasses}
                  activity={activity}
                  actions={
                    <ResultActions
                      title="Water Intake Calculator Result"
                      shareUrl={shareUrl}
                      filename="velmora-water-intake-result"
                      summaryLines={[
                        `Water target: ${liters.toFixed(2)} liters/day`,
                        `Glasses: ${glasses} per day`,
                        `Activity: ${activity}`,
                      ]}
                    />
                  }
                />
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl">
        <FAQSection items={waterFaqs} />
      </div>
    </div>
  );
}

