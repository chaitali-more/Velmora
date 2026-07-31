"use client";

import Link from "next/link";
import {
  FiArrowUpRight,
  FiActivity,
  FiZap,
  FiTarget,
  FiBarChart2,
  FiDroplet,
  FiThermometer,
  FiPieChart,
} from "react-icons/fi";

type CalculatorItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge: string;
};

const allCalculators: CalculatorItem[] = [
  {
    title: "BMI Calculator",
    description: "Check body mass index and healthy weight range for adults.",
    href: "/bmi-calculator",
    icon: FiTarget,
    badge: "BMI",
  },
  {
    title: "Calorie Calculator",
    description: "Estimate daily calorie requirements for weight loss or gain.",
    href: "/daily-calorie-needs-calculator",
    icon: FiActivity,
    badge: "Calories",
  },
  {
    title: "Calories Burned",
    description: "Calculate calories burned during workouts, sports, and daily activities based on weight.",
    href: "/calories-burned-calculator",
    icon: FiActivity,
    badge: "Calories",
  },
  {
    title: "Protein Calculator",
    description: "Determine daily protein targets based on activity and goals.",
    href: "/protein-calculator",
    icon: FiZap,
    badge: "Protein",
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate custom daily hydration needs based on weight.",
    href: "/water-intake-calculator",
    icon: FiDroplet,
    badge: "Hydration",
  },
  {
    title: "BMR Calculator",
    description: "Find your Basal Metabolic Rate (resting calorie burn).",
    href: "/bmr-calculator",
    icon: FiThermometer,
    badge: "BMR",
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage using standard measurements.",
    href: "/body-fat-calculator",
    icon: FiPieChart,
    badge: "Body Fat",
  },
  {
    title: "Macro Calculator",
    description: "Calculate daily protein, carbs, and fat split for your goal.",
    href: "/macro-calculator",
    icon: FiBarChart2,
    badge: "Macros",
  },
  {
    title: "Ideal Weight Calculator",
    description: "Find your target ideal weight range with medical formulas.",
    href: "/ideal-weight-calculator",
    icon: FiTarget,
    badge: "Weight",
  },
];

export default function RelatedCalculators({ currentPath }: { currentPath: string }) {
  const related = allCalculators.filter((item) => item.href !== currentPath).slice(0, 3);

  return (
    <section className="relative mt-8 sm:mt-10">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Explore More
          </p>
          <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl dark:text-slate-100">
            Related Calculators
          </h3>
        </div>
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          All Calculators <FiArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 cards - grid on desktop, horizontal scroll on mobile */}
      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-none">
        {related.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col  mt-2 justify-between min-w-[240px] sm:min-w-0 snap-start rounded-xl border border-slate-200/80 bg-white/80 p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-cyan-400/30 dark:hover:bg-slate-800/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                <span>Open Calculator</span>
                <FiArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
