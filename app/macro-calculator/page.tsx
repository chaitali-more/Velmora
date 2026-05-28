import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import MacroClientPage from "./MacroClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Macro Calculator – Calories, Protein, Carbs, Fat",

  description:
    "Calculate daily macros including calories, protein, carbs, and fat based on body metrics and goals. Estimate macro split for weight management and nutrition planning.",

  path: "/macro-calculator",

  keywords: [
    // Core keywords
    "macro calculator",
    "macros calculator",
    "calorie macro calculator",
    "protein carbs fat calculator",
    "daily macros calculator",

    // Long-tail (high ranking potential)
    "macro calculator for weight loss",
    "macro calculator for muscle gain",
    "macro calculator for maintenance",
    "macro split calculator by body weight",
    "daily macros based on calorie intake",
    "macro calculator for men and women",
    "macro calculator india online",
    "calculate macros for diet plan",
    "macronutrient calculator by goals",
    "macro percentage calculator for diet",

    // Intent-based keywords
    "calculate daily macros",
    "find macro split",
    "estimate protein carbs fat intake",
    "check macros for weight management",
    "daily nutrition macro calculation",

    // Supporting SEO keywords
    "macronutrient distribution",
    "macro ratio calculation",
    "nutrition planning calculator",
    "diet macro breakdown",
    "fitness nutrition macros"
  ],
});

export default function MacroPage() {
  return <MacroClientPage />;
}
