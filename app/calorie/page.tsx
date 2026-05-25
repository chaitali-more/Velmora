import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import CalorieClientPage from "./CalorieClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Calorie Calculator – Daily Calorie Needs & Intake",
  description:
    "Calculate your daily calorie needs for weight loss, muscle gain, or maintenance. Use Velmora’s free calorie calculator based on age, weight, height, and activity level to find your ideal calorie intake.",
  path: "/calorie",
  keywords: [
    "calorie calculator",
    "daily calorie calculator",
    "calorie intake calculator",
    "maintenance calorie calculator",
    "calorie deficit calculator",
    "weight loss calorie calculator",
    "calorie calculator for weight gain",
    "how many calories per day",
    "TDEE calculator",
    "BMR calorie calculator",
    "daily calorie needs",
    "calorie calculator for men",
    "calorie calculator for women",
    "fitness calorie calculator",
    "nutrition calorie calculator",
    "free calorie calculator",
    "calorie calculator India"
  ],
});

export default function CaloriePage() {
  return <CalorieClientPage />;
}
