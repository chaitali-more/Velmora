"use client";

import { useState } from "react";
import BMIForm from "@/components/bmi/BMIForm";
import BMIResult from "@/components/bmi/BMIResult";
import UnitToggle from "@/components/bmi/UnitToggle";
import FAQSection from "@/components/calculators/FAQSection";
import ResultPlaceholder from "@/components/calculators/ResultPlaceholder";
import ResultActions from "@/components/calculators/ResultActions";
import { bmiFaqs } from "@/data/calculator-faqs";
import { buildShareUrl } from "@/lib/result-sharing";

function calcBMI(weight: number, height: number, unit: "metric" | "imperial") {
  if (unit === "metric") {
    const hMeters = height / 100;
    return weight / (hMeters * hMeters);
  }

  const hInches = height * 12;
  return (703 * weight) / (hInches * hInches);
}

export default function BMIPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">(() => {
    if (typeof window === "undefined") return "metric";
    return window.location.search.includes("u=imperial") ? "imperial" : "metric";
  });
  const [weight, setWeight] = useState(() => {
    if (typeof window === "undefined") return "70";
    return new URLSearchParams(window.location.search).get("w") ?? "70";
  });
  const [height, setHeight] = useState(() => {
    if (typeof window === "undefined") return "175";
    return new URLSearchParams(window.location.search).get("h") ?? "175";
  });
  const [bmi, setBmi] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const weightValue = Number(params.get("w"));
    const heightValue = Number(params.get("h"));
    const initialUnit = params.get("u") === "imperial" ? "imperial" : "metric";
    if (!weightValue || !heightValue) return null;
    return parseFloat(calcBMI(weightValue, heightValue, initialUnit).toFixed(1));
  });

  const handleCalc = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;

    setBmi(parseFloat(calcBMI(w, h, unit).toFixed(1)));
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
  };

  const shareUrl = buildShareUrl("/bmi-calculator", {
    u: unit,
    w: weight,
    h: height,
  });

  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Health Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">BMI Calculator</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your weight and height to see your BMI (Body Mass Index), a simple measure that helps you understand if your weight is in a healthy range.</p>

            <div className="mt-6 sm:mt-7">
              <UnitToggle unit={unit} setUnit={setUnit} reset={reset} />
              <BMIForm
                weight={weight}
                height={height}
                setWeight={setWeight}
                setHeight={setHeight}
                unit={unit}
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={handleCalc}
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

            {!bmi ? (
              <ResultPlaceholder description="Fill the form on the left and hit Calculate. Your BMI value, category, and 3D gauge will appear here." />
            ) : (
              <div className="relative z-10">
                <BMIResult
                  bmi={bmi}
                  actions={
                    <ResultActions
                      title="BMI Calculator Result"
                      shareUrl={shareUrl}
                      filename="velmora-bmi-result"
                      summaryLines={[
                        `BMI: ${bmi.toFixed(1)}`,
                        `Weight: ${weight} ${unit === "metric" ? "kg" : "lbs"}`,
                        `Height: ${height} ${unit === "metric" ? "cm" : "ft"}`,
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
        <FAQSection items={bmiFaqs} />
      </div>
    </div>
  );
}
