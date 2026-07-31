"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiClock,
  FiChevronDown,
  FiHeart,
} from "react-icons/fi";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import { buildToolPageSchema } from "@/lib/tool-page-schema";

type WeightUnit = "kg" | "lbs";

interface Activity {
  id: string;
  label: string;
  met: number;
  intensity: "Light" | "Moderate" | "Vigorous";
}

const ACTIVITIES: Activity[] = [
  { id: "running_fast", label: "Running (6 mph / 10 min mile)", met: 9.8, intensity: "Vigorous" },
  { id: "running_slow", label: "Running (Slow / Jogging)", met: 7.0, intensity: "Vigorous" },
  { id: "cycling_moderate", label: "Cycling (Moderate, 12-14 mph)", met: 7.5, intensity: "Vigorous" },
  { id: "cycling_light", label: "Cycling (Leisurely, <10 mph)", met: 3.5, intensity: "Light" },
  { id: "swimming_crawl", label: "Swimming (Moderate front crawl)", met: 5.8, intensity: "Moderate" },
  { id: "swimming_breaststroke", label: "Swimming (Breaststroke)", met: 5.3, intensity: "Moderate" },
  { id: "walking_moderate", label: "Walking (Moderate, 3 mph)", met: 3.5, intensity: "Moderate" },
  { id: "walking_brisk", label: "Walking (Brisk, 4 mph)", met: 5.0, intensity: "Moderate" },
  { id: "weightlifting_heavy", label: "Weightlifting (Vigorous intensity)", met: 6.0, intensity: "Vigorous" },
  { id: "weightlifting_light", label: "Weightlifting (Light/Moderate)", met: 3.5, intensity: "Light" },
  { id: "yoga_hatha", label: "Yoga (Hatha style)", met: 2.5, intensity: "Light" },
  { id: "yoga_power", label: "Yoga (Vinyasa / Power style)", met: 4.0, intensity: "Moderate" },
  { id: "hiking_moderate", label: "Hiking (Moderate terrain)", met: 6.0, intensity: "Vigorous" },
  { id: "rope_jumping", label: "Jump Rope (Moderate intensity)", met: 10.0, intensity: "Vigorous" },
  { id: "aerobics_high", label: "Aerobics (High impact)", met: 7.3, intensity: "Vigorous" },
  { id: "badminton", label: "Badminton (Casual/Competitive)", met: 5.5, intensity: "Moderate" },
  { id: "basketball", label: "Basketball (Game play)", met: 8.0, intensity: "Vigorous" },
  { id: "soccer", label: "Soccer / Football (Game play)", met: 7.0, intensity: "Vigorous" },
];

const faqData = [
  {
    question: "What is a MET value and how is it used?",
    answer:
      "MET stands for Metabolic Equivalent of Task. It is a physiological measure expressing the energy cost of physical activities. One MET is defined as the energy cost of sitting quietly (roughly 1 kcal/kg/hour). Activities with higher MET values burn more calories per minute.",
  },
  {
    question: "How does the Calories Burned Calculator work?",
    answer:
      "The calculator uses the standardized ACSM (American College of Sports Medicine) formula: Calories Burned = Duration (minutes) x [MET x 3.5 x Weight (kg) / 200]. This is the most widely accepted scientific formula to estimate physical workout energy expenditure.",
  },
  {
    question: "Is weight in Kg or Lbs more accurate?",
    answer:
      "Both units are equally accurate. The tool automatically converts Pounds (lbs) to Kilograms (kg) behind the scenes using the standard conversion ratio (1 kg = 2.20462 lbs) before executing the calculation formula.",
  },
  {
    question: "Are these calorie burn values exact?",
    answer:
      "No. These values are estimates based on average metabolic efficiency. Actual calories burned vary based on age, gender, body fat percentage, current muscle mass, heart rate, and metabolic health.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function CaloriesBurnedClientPage() {
  const [activityId, setActivityId] = useState<string>("running_slow");
  const [weightInput, setWeightInput] = useState("70");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [durationInput, setDurationInput] = useState("30");

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/calories-burned-calculator");
  }, []);

  const activeActivity = useMemo(() => {
    return ACTIVITIES.find((a) => a.id === activityId) || ACTIVITIES[0];
  }, [activityId]);

  const weightKg = useMemo(() => {
    const num = parseFloat(weightInput) || 0;
    if (weightUnit === "lbs") {
      return num / 2.20462;
    }
    return num;
  }, [weightInput, weightUnit]);

  const duration = useMemo(() => {
    return parseFloat(durationInput) || 0;
  }, [durationInput]);

  // ACSM Calorie Burn Formula
  const caloriesBurned = useMemo(() => {
    if (weightKg <= 0 || duration <= 0) return 0;
    const met = activeActivity.met;
    // Formula: kcal = min * (MET * 3.5 * kg / 200)
    const kcal = duration * (met * 3.5 * weightKg / 200);
    return Math.round(kcal);
  }, [weightKg, duration, activeActivity]);

  // Food Equivalences
  const equivalents = useMemo(() => {
    return {
      pizza: (caloriesBurned / 285).toFixed(1),
      apples: (caloriesBurned / 95).toFixed(1),
      bread: (caloriesBurned / 80).toFixed(1),
      soda: (caloriesBurned / 140).toFixed(1),
    };
  }, [caloriesBurned]);

  // Equivalent durations for other activities
  const alternateActivities = useMemo(() => {
    if (caloriesBurned <= 0 || weightKg <= 0) return [];
    
    // Choose 5 key alternate activities to display
    const alternates = [
      "walking_moderate",
      "running_slow",
      "cycling_moderate",
      "swimming_crawl",
      "yoga_hatha",
    ];

    return ACTIVITIES.filter((a) => alternates.includes(a.id)).map((act) => {
      // Mins needed to burn target calories: targetKcal / (MET * 3.5 * kg / 200)
      const factor = act.met * 3.5 * weightKg / 200;
      const minsNeeded = factor > 0 ? caloriesBurned / factor : 0;
      return {
        label: act.label.split(" (")[0] || act.label,
        mins: Math.round(minsNeeded),
      };
    });
  }, [caloriesBurned, weightKg]);

  const handleWeightChange = (val: number) => {
    const maxVal = weightUnit === "kg" ? 200 : 440;
    const bounded = Math.max(1, Math.min(maxVal, val));
    setWeightInput(bounded.toString());
  };

  const handleDurationChange = (val: number) => {
    const bounded = Math.max(1, Math.min(180, val));
    setDurationInput(bounded.toString());
  };

  const handleUnitToggle = (newUnit: WeightUnit) => {
    const currentWeight = parseFloat(weightInput) || 70;
    if (newUnit === "lbs" && weightUnit === "kg") {
      setWeightInput(Math.round(currentWeight * 2.20462).toString());
    } else if (newUnit === "kg" && weightUnit === "lbs") {
      setWeightInput(Math.round(currentWeight / 2.20462).toString());
    }
    setWeightUnit(newUnit);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* WebApplication Schema */}
      {toolSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
      )}

      <div className="relative min-h-screen overflow-x-clip px-3 sm:px-4 md:px-8 dark:bg-gray-950">
        <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
          <main className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-gradient-to-r from-orange-50 to-rose-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-orange-400/20 dark:from-orange-400/10 dark:to-rose-500/10 dark:text-orange-100">
                <FiHeart className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                Standard MET Calculator • 100% Private
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Calories Burned Calculator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Calculate estimated physical workout energy expenditure based on body weight and duration. Review MET values, food equivalence ratings, and relative workout comparisons.
              </p>
            </div>

            {/* Main Interactive Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Inputs Panel */}
              <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40 lg:col-span-6">
                <div className="border-b border-slate-100 pb-3 dark:border-white/5">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Activity & Weight Details
                  </h2>
                </div>

                {/* Field 1: Select Activity */}
                <div className="space-y-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Exercise or Sport Activity
                    </label>
                    <select
                      value={activityId}
                      onChange={(e) => setActivityId(e.target.value)}
                      className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-800 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
                    >
                      {ACTIVITIES.map((act) => (
                        <option key={act.id} value={act.id}>
                          {act.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 2: Body Weight */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Body Weight
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-950">
                        {(["kg", "lbs"] as const).map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => handleUnitToggle(unit)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition capitalize ${
                              weightUnit === unit
                                ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                                : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                      <div className="relative flex-1 sm:flex-initial sm:w-32">
                        <input
                          type="number"
                          inputMode="numeric"
                          value={weightInput}
                          onChange={(e) => setWeightInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-9 text-right text-sm font-black text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-950"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">
                          {weightUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10}
                    max={weightUnit === "kg" ? 200 : 440}
                    step={1}
                    value={parseFloat(weightInput) || 70}
                    onChange={(e) => handleWeightChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-orange-500 dark:bg-slate-800 dark:accent-orange-400"
                  />
                </div>

                {/* Field 3: Workout Duration */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Workout Duration
                    </label>
                    <div className="relative w-full sm:w-32">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={durationInput}
                        onChange={(e) => setDurationInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-3 pr-12 text-right text-sm font-black text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-950"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        Mins
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={180}
                    step={1}
                    value={duration}
                    onChange={(e) => handleDurationChange(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-orange-500 dark:bg-slate-800 dark:accent-orange-400"
                  />
                </div>
              </div>

              {/* Right Side: Results Analytics */}
              <div className="space-y-6 lg:col-span-6">
                {/* Result Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-lg shadow-orange-500/10">
                  <div className="flex items-center gap-2">
                    <FiActivity className="h-5 w-5 opacity-90" />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                      Calories Burned Estimate
                    </span>
                  </div>
                  <p className="mt-4 text-4xl font-black tracking-tight">
                    {caloriesBurned} <span className="text-lg font-black opacity-90">kcal</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-white/20 px-3 py-1">
                      MET Value: {activeActivity.met}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1">
                      Intensity: {activeActivity.intensity}
                    </span>
                  </div>
                </div>

                {/* Equivalences Grid */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 pb-2 mb-4 dark:border-white/5">
                    Food Equivalents Burned
                  </h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-center dark:border-white/10 dark:bg-slate-950/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Pizza Slices
                      </span>
                      <p className="mt-1 text-base font-black text-slate-900 dark:text-slate-100">
                        {equivalents.pizza}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-center dark:border-white/10 dark:bg-slate-950/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Fresh Apples
                      </span>
                      <p className="mt-1 text-base font-black text-slate-900 dark:text-slate-100">
                        {equivalents.apples}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-center dark:border-white/10 dark:bg-slate-950/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Slices of Bread
                      </span>
                      <p className="mt-1 text-base font-black text-slate-900 dark:text-slate-100">
                        {equivalents.bread}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-center dark:border-white/10 dark:bg-slate-950/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Cans of Soda
                      </span>
                      <p className="mt-1 text-base font-black text-slate-900 dark:text-slate-100">
                        {equivalents.soda}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alternate Durations Comparer */}
                {caloriesBurned > 0 && (
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 pb-2 mb-4 dark:border-white/5">
                      Burn Time for Other Activities
                    </h3>
                    <div className="space-y-3">
                      {alternateActivities.map((alt) => (
                        <div key={alt.label} className="flex items-center justify-between text-xs border-b border-slate-100/50 pb-2 dark:border-white/5 last:border-b-0 last:pb-0">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {alt.label}
                          </span>
                          <span className="font-black text-slate-900 dark:text-slate-100 inline-flex items-center gap-1.5">
                            <FiClock className="h-3.5 w-3.5 text-orange-500" />
                            {alt.mins} Mins
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Learn more about metabolic MET coefficients, calorie formulas, and weight metrics.
              </p>

              <div className="mt-6 space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100"
                      >
                        <span className="text-xs sm:text-sm">
                          {faq.question}
                        </span>
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-orange-500" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-100 p-4 text-xs leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-300 sm:text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <RelatedCalculators currentPath="/calories-burned-calculator" />
          </main>
        </div>
      </div>
    </>
  );
}
