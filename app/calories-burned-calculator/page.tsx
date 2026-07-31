import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import CaloriesBurnedClientPage from "./CaloriesBurnedClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Calories Burned Calculator - Exercise & Activity Burn | Velmora",
  description:
    "Calculate calories burned during workouts, sports, and daily activities based on body weight and duration. Uses standardized MET values. 100% private.",
  path: "/calories-burned-calculator",
  imageAlt: "Calories Burned Calculator by Velmora",
  keywords: [
    "calories burned calculator",
    "activity burn calculator",
    "exercise calorie calculator",
    "calories burned running",
    "calories burned walking",
    "met calorie calculator",
    "workout calorie calculator",
    "calculate calories burned sports",
    "daily calorie expenditure tracker",
    "fitness calculators online",
    "calories burned calculator by activity",
    "how many calories did i burn walking",
    "calories burned walking calculator",
    "exercise calorie calculator online",
    "MET calorie calculator",
    "calories burned running calculator",
    "calculate calories burned gym workout",
    "weightlifting calorie burn calculator",
    "yoga calories burned calculator",
    "calories burned cycling calculator",
    "calories burned calculator kg lbs",
    "online metabolic equivalent of task calculator",
    "calories burned calculator free online"
  ],
});

export default function CaloriesBurnedPage() {
  return <CaloriesBurnedClientPage />;
}
