import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BMIClientPage from "./BMIClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "BMI Calculator India - Body Mass Index by Age",

  description:
    "Calculate BMI using height and weight (kg/cm). Check body mass index, weight category, and healthy BMI range for men and women in India.",

  path: "/bmi-calculator",

  keywords: [
    // Core keywords
    "bmi calculator",
    "bmi calculator india",
    "body mass index calculator",
    "calculate bmi online",
    "bmi chart",

    // Long-tail (high ranking potential)
    "bmi calculator for indian adults",
    "bmi calculator in kg and cm",
    "bmi calculator by age and gender",
    "bmi calculator for men india",
    "bmi calculator for women india",
    "ideal bmi for indian body type",
    "healthy bmi range india",
    "bmi calculator for weight management india",
    "body mass index calculator india online",
    "bmi calculation by height and weight",

    // Intent-based keywords
    "check bmi online",
    "find bmi category",
    "am i underweight or overweight",
    "check ideal weight by bmi",
    "health status by bmi",

    // Supporting SEO keywords
    "bmi calculator for women",
    "bmi calculator for men",
    "normal bmi for men and women",
    "bmi calculator for indian",
    "bmi calculator for women indian",
    "bmi calculator for women in kg",
    "bmi calculator for men in kg",
    "bmi calculator for infants in kg and cm"
  ],
});

export default function BMIPage() {
  return <BMIClientPage />;
}
