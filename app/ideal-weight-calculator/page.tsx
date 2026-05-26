import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import IdealWeightClientPage from "./IdealWeightClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Ideal Weight Calculator - Healthy Weight by Height",

  description:
    "Find ideal body weight based on height and gender using standard formulas. Estimate healthy weight range and compare values for weight management and assessment.",

  path: "/ideal-weight-calculator",

  keywords: [
    // Core keywords
    "ideal weight calculator",
    "healthy weight calculator",
    "ideal body weight calculator",
    "weight range calculator",
    "ideal weight for height",

    // Long-tail (high ranking potential)
    "ideal weight calculator by height and gender",
    "ideal body weight formula calculation",
    "healthy weight range by height",
    "ideal weight for men and women",
    "ideal weight calculator india online",
    "devine robinson miller formula calculator",
    "calculate ideal weight based on height",
    "what should my ideal weight be",
    "ideal weight range for adults",
    "healthy body weight estimation",

    // Intent-based keywords
    "find ideal body weight",
    "check healthy weight range",
    "calculate weight based on height",
    "estimate ideal weight",
    "weight assessment by height",

    // Supporting SEO keywords
    "ideal weight formulas",
    "body weight standards",
    "height weight ratio calculation",
    "healthy weight guidelines",
    "fitness weight assessment"
  ],
});
export default function IdealWeightPage() {
  return <IdealWeightClientPage />;
}
