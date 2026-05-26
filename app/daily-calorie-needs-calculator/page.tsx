import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import CalorieClientPage from "./CalorieClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Calorie Calculator – Daily Calorie Needs by Age",

  description:
    "Calculate daily calorie needs based on age, weight, height, and activity level. Estimate calorie intake for weight management and energy balance.",

  path: "/daily-calorie-needs-calculator",

  keywords: [
    // Core keywords
    "calorie calculator",
    "daily calorie calculator",
    "calorie intake calculator",
    "maintenance calorie calculator",
    "calorie needs calculator",

    // Long-tail (high ranking potential)
    "calorie calculator by age weight height",
    "daily calorie needs for men and women",
    "calorie calculator for weight loss",
    "calorie calculator for weight gain",
    "calorie calculator for maintenance",
    "calorie calculator india online",
    "calculate calories needed per day",
    "calorie intake based on activity level",
    "daily calorie requirement calculator",
    "tdee calorie calculator",

    // Intent-based keywords
    "calculate daily calories",
    "find calorie intake",
    "check calorie requirement",
    "estimate calories for weight management",
    "daily energy intake calculation",

    // Supporting SEO keywords
    "calorie formula",
    "tdee calculation",
    "energy balance calculation",
    "nutrition calorie planning",
    "fitness calorie estimation"
  ],
});

export default function CaloriePage() {
  return <CalorieClientPage />;
}
