import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import ProteinClientPage from "../protein-calculator/ProteinClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Protein Calculator - Daily Protein Intake by Weight",

  description:
    "Calculate daily protein intake based on weight, age, and activity level. Estimate protein needs for muscle gain, weight management, and overall nutrition balance.",

  path: "/protein",

  keywords: [
    // Core keywords
    "protein calculator",
    "daily protein intake calculator",
    "protein intake calculator",
    "protein requirement calculator",
    "how much protein per day",

    // Long-tail (high ranking potential)
    "protein calculator by body weight",
    "protein intake per kg body weight",
    "daily protein intake for men and women",
    "protein calculator for muscle gain",
    "protein calculator for weight loss",
    "protein requirement by age and activity level",
    "protein calculator india online",
    "grams of protein needed per day",
    "protein intake calculator for fitness goals",
    "ideal protein intake for body weight",

    // Intent-based keywords
    "calculate protein intake",
    "find daily protein needs",
    "check protein requirement",
    "estimate protein for muscle growth",
    "protein intake for weight management",

    // Supporting SEO keywords
    "protein intake formula",
    "nutrition protein calculation",
    "diet protein requirement",
    "fitness nutrition calculator",
    "protein consumption guidelines"
  ],
});

export default function ProteinPage() {
  return <ProteinClientPage />;
}
