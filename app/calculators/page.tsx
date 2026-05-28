import type { Metadata } from "next";
import Link from "next/link";
import { buildStaticPageMetadata } from "@/lib/seo";

const calculators = [
  {
    name: "Protein Calculator",
    href: "/protein-calculator",
    description: "Find a simple daily protein target from weight, activity level, and fitness goal.",
  },
  {
    name: "Macro Calculator",
    href: "/macro-calculator",
    description: "Calculate daily protein, carbs, fat, and calories with balanced or custom macro splits.",
  },
  {
    name: "Calorie Calculator",
    href: "/daily-calorie-needs-calculator",
    description: "Estimate daily calorie needs and get simple targets for maintenance, loss, or gain.",
  },
  {
    name: "BMI Calculator",
    href: "/bmi-calculator",
    description: "Check body mass index instantly with a visual result and category.",
  },
  {
    name: "BMR Calculator",
    href: "/bmr-calculator",
    description: "Estimate resting calorie burn and daily maintenance needs.",
  },
  {
    name: "Body Fat Calculator",
    href: "/body-fat-calculator",
    description: "Estimate body fat percentage with supporting body-composition metrics.",
  },
  {
    name: "Ideal Weight Calculator",
    href: "/ideal-weight-calculator",
    description: "Review a default ideal-weight target with comparison across standard formulas.",
  },
  {
    name: "Water Intake Calculator",
    href: "/water-intake-calculator",
    description: "Calculate a simple daily hydration target based on weight and activity.",
  },
] as const;
export const metadata: Metadata = buildStaticPageMetadata({
  title: "Health Calculators - BMI, BMR, Calories & More",

  description:
    "Access health and fitness calculators including BMI, BMR, calorie, protein, macro, body fat, ideal weight, and water intake tools for daily tracking and assessment.",

  path: "/calculators",

  imageAlt:
    "Health and fitness calculators for BMI BMR calories protein macros and water intake",

  keywords: [
    // Core keywords
    "health calculators",
    "fitness calculators",
    "bmi calculator",
    "bmr calculator",
    "calorie calculator",

    // Long-tail (high ranking potential)
    "online health and fitness calculators",
    "bmi bmr calorie protein calculator tools",
    "fitness calculators for daily tracking",
    "body fat and ideal weight calculators",
    "water intake and macro calculator tools",
    "multiple health calculators in one place",
    "health calculator tools for men and women",
    "online fitness tools for body metrics",
    "daily health tracking calculators",
    "nutrition and fitness calculator tools",

    // Intent-based keywords
    "use health calculators",
    "calculate bmi and calories",
    "check body fat and weight",
    "track daily nutrition and fitness",
    "estimate health metrics online",

    // Supporting SEO keywords
    "body measurement calculators",
    "fitness tracking tools",
    "health assessment tools",
    "nutrition calculation tools",
    "wellness tracking utilities"
  ],
});
export default function CalculatorsPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Health Hub
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Fitness and Health Calculators
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Explore all calculators in one place and jump straight to the tool you need.
          </p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {calculators.map((calculator, index) => (
              <Link
                key={calculator.href}
                href={calculator.href}
                className="group rounded-xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 sm:p-5 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-cyan-400/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-sm font-bold text-slate-700 dark:text-slate-200">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-cyan-600 transition group-hover:text-violet-600 dark:text-cyan-300 dark:group-hover:text-violet-300">
                    Open
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-900 dark:text-slate-100">
                  {calculator.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {calculator.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
