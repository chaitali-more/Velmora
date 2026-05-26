import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import WaterClientPage from "./WaterClientPage";
export const metadata: Metadata = buildCalculatorMetadata({
  title: "Water Intake Calculator - Daily Hydration by Weight",

  description:
    "Calculate daily water intake based on body weight and activity level. Estimate hydration needs to support health, energy levels, and overall body function.",

  path: "/water-intake-calculator",

  keywords: [
    // Core keywords
    "water intake calculator",
    "hydration calculator",
    "daily water intake calculator",
    "water requirement calculator",
    "how much water per day",

    // Long-tail (high ranking potential)
    "water intake calculator by body weight",
    "daily water intake for men and women",
    "how many liters of water per day",
    "water intake calculator india online",
    "hydration needs based on activity level",
    "water intake for weight management",
    "daily hydration requirement calculator",
    "water consumption per kg body weight",
    "calculate water intake for fitness",
    "ideal water intake per day",

    // Intent-based keywords
    "calculate water intake",
    "find daily hydration needs",
    "check water requirement",
    "estimate water intake per day",
    "hydration level calculation",

    // Supporting SEO keywords
    "daily hydration levels",
    "water consumption guidelines",
    "body hydration calculation",
    "fluid intake recommendation",
    "health hydration tracking"
  ],
});

export default function WaterPage() {
  return <WaterClientPage />;
}
