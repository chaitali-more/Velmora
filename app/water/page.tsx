import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import WaterClientPage from "./WaterClientPage";
export const metadata: Metadata = buildCalculatorMetadata({
  title: "Water Intake Calculator – Daily Hydration Needs",
  description:
    "Calculate how much water you should drink daily based on body weight and activity level. Use Velmora’s free water intake calculator to stay hydrated, improve health, and track your daily hydration needs.",
  path: "/water",
  keywords: [
    "water intake calculator",
    "hydration calculator",
    "daily water intake calculator",
    "how much water should I drink",
    "water requirement calculator",
    "water intake per day",
    "how many liters of water per day",
    "water intake for weight loss",
    "hydration needs calculator",
    "daily hydration calculator",
    "water intake calculator for men",
    "water intake calculator for women",
    "fitness hydration calculator",
    "free water intake calculator",
    "water intake calculator India"
  ],
});

export default function WaterPage() {
  return <WaterClientPage />;
}
