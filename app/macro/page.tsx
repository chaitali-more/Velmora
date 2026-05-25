import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import MacroClientPage from "./MacroClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Macro Calculator – Calories, Protein, Carbs & Fat",
  description:
    "Calculate your daily macros including calories, protein, carbs, and fat based on your goals. Use Velmora’s free macro calculator for weight loss, muscle gain, or maintenance with balanced or custom macro splits.",
  path: "/macro",
  keywords: [
    "macro calculator",
    "macros calculator",
    "calorie macro calculator",
    "protein carbs fat calculator",
    "macro split calculator",
    "daily macros calculator",
    "calculate macros for weight loss",
    "calculate macros for muscle gain",
    "macros for maintenance",
    "nutrition calculator",
    "macro calculator for men",
    "macro calculator for women",
    "custom macro calculator",
    "macro percentage calculator",
    "diet macro calculator",
    "fitness macro calculator",
    "free macro calculator",
    "macros per day calculator",
    "macro calculator India"
  ],
});

export default function MacroPage() {
  return <MacroClientPage />;
}
