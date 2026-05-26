import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BodyFatClientPage from "./BodyFatClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Body Fat Calculator - Body Fat % & Lean Mass",

  description:
    "Calculate body fat percentage, fat mass, and lean body mass using the U.S. Navy method. Estimate body composition for fitness tracking and weight management.",

  path: "/body-fat-calculator",

  keywords: [
    // Core keywords
    "body fat calculator",
    "body fat percentage calculator",
    "calculate body fat",
    "body composition calculator",
    "lean body mass calculator",

    // Long-tail (high ranking potential)
    "body fat calculator using us navy method",
    "body fat calculator for men and women",
    "calculate body fat percentage by measurements",
    "body fat percentage calculator india online",
    "ideal body fat percentage by age",
    "body fat calculator for fitness tracking",
    "fat mass and lean mass calculation",
    "body composition calculator by measurements",
    "body fat calculator by waist neck height",
    "body fat percentage estimation tool",

    // Intent-based keywords
    "calculate body fat percentage",
    "find body fat level",
    "check body composition",
    "estimate fat mass and lean mass",
    "body fat measurement calculation",

    // Supporting SEO keywords
    "us navy body fat formula",
    "body fat percentage range",
    "fitness body composition analysis",
    "body fat tracking method",
    "lean mass calculation formula"
  ],
});
export default function BodyFatPage() {
  return <BodyFatClientPage />;
}
