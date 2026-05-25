import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import IdealWeightClientPage from "./IdealWeightClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Ideal Weight Calculator – Healthy Weight Range",
  description:
    "Find your ideal body weight based on height, gender, and standard formulas. Use Velmora’s free ideal weight calculator to check your healthy weight range and compare with BMI for better fitness planning.",
  path: "/ideal-weight",
  keywords: [
    "ideal weight calculator",
    "healthy weight calculator",
    "ideal body weight calculator",
    "weight range calculator",
    "ideal weight for height",
    "healthy weight range",
    "Devine formula calculator",
    "Robinson formula calculator",
    "Miller formula calculator",
    "BMI ideal weight range",
    "what is my ideal weight",
    "ideal weight for men",
    "ideal weight for women",
    "fitness weight calculator",
    "free ideal weight calculator",
    "ideal weight calculator India"
  ],
});
export default function IdealWeightPage() {
  return <IdealWeightClientPage />;
}
