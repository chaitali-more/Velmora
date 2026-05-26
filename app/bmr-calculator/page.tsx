import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BMRClientPage from "./BMRClientPage";
export const metadata: Metadata = buildCalculatorMetadata({
  title: "BMR Calculator - Calculate Basal Metabolic Rate",

  description:
    "Calculate basal metabolic rate (BMR) using age, weight, height, and gender. Estimate daily calorie needs and understand energy requirements for weight management.",

  path: "/bmr-calculator",

  keywords: [
    // Core keywords
    "bmr calculator",
    "basal metabolic rate calculator",
    "calculate bmr",
    "metabolism calculator",
    "resting metabolic rate calculator",

    // Long-tail (high ranking potential)
    "bmr calculator for men and women",
    "bmr calculator by age weight height",
    "bmr calculator india online",
    "calculate bmr for weight loss",
    "bmr calculator for weight management",
    "daily calorie needs calculator bmr",
    "bmr formula calculation online",
    "estimate metabolism rate online",
    "bmr and calorie requirement calculator",
    "basal metabolic rate calculation by gender",

    // Intent-based keywords
    "find daily calorie needs",
    "calculate calories burned at rest",
    "check metabolism rate",
    "estimate maintenance calories",
    "calorie requirement by body metrics",

    // Supporting SEO keywords
    "bmr formula",
    "rmr vs bmr difference",
    "energy expenditure calculation",
    "metabolic rate estimation",
    "fitness calorie calculation"
  ],
});

export default function BMRPage() {
  return <BMRClientPage />;
}
