import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BMRClientPage from "./BMRClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "BMR Calculator – Basal Metabolic Rate & Calories",
  description:
    "Calculate your basal metabolic rate (BMR) and estimate daily calorie needs using age, weight, height, and gender. Use Velmora’s free BMR calculator to understand your metabolism and plan weight loss, gain, or maintenance.",
  path: "/bmr",
  keywords: [
    "BMR calculator",
    "basal metabolic rate calculator",
    "calculate BMR",
    "resting metabolic rate calculator",
    "RMR calculator",
    "TDEE calculator",
    "daily calorie needs",
    "maintenance calories calculator",
    "BMR formula calculator",
    "calories burned at rest",
    "BMR calculator for men",
    "BMR calculator for women",
    "metabolism calculator",
    "fitness BMR calculator",
    "free BMR calculator",
    "BMR calculator India"
  ],
});

export default function BMRPage() {
  return <BMRClientPage />;
}
