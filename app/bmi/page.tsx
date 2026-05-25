import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BMIClientPage from "./BMIClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "BMI Calculator – Calculate Your Body Mass Index",
  description:
    "Calculate your BMI instantly with Velmora’s free BMI calculator. Enter your height and weight to check your body mass index, understand your weight category, and track your health with a clear visual BMI chart.",
  path: "/bmi",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "calculate BMI online",
    "BMI chart",
    "check BMI instantly",
    "healthy weight calculator",
    "BMI for men and women",
    "ideal weight calculator",
    "free BMI calculator",
    "BMI calculator India"
  ],
});

export default function BMIPage() {
  return <BMIClientPage />;
}
