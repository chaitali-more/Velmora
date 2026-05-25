import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import ProteinClientPage from "./ProteinClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Protein Calculator – Daily Protein Intake & Needs",
  description:
    "Calculate your daily protein intake based on weight, age, activity level, and fitness goals. Use Velmora’s free protein calculator to find how much protein you need per day for muscle gain, weight loss, or maintenance.",
  path: "/protein",
  keywords: [
    "protein calculator",
    "daily protein calculator",
    "protein intake calculator",
    "how much protein per day",
    "protein per kg calculator",
    "protein requirement calculator",
    "grams of protein per day",
    "protein for muscle gain",
    "protein for weight loss",
    "protein calculator for men",
    "protein calculator for women",
    "ideal protein intake",
    "daily protein needs",
    "fitness protein calculator",
    "free protein calculator",
    "protein intake per body weight",
    "protein calculator India"
  ],
});

export default function ProteinPage() {
  return <ProteinClientPage />;
}
