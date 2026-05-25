import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/seo";
import BodyFatClientPage from "./BodyFatClientPage";

export const metadata: Metadata = buildCalculatorMetadata({
  title: "Body Fat Calculator – Body Fat % & Lean Mass",
  description:
    "Calculate your body fat percentage, fat mass, and lean body mass using the U.S. Navy method. Use Velmora’s free body fat calculator to track fitness, improve body composition, and plan weight loss or muscle gain.",
  path: "/body-fat",
  keywords: [
    "body fat calculator",
    "body fat percentage calculator",
    "calculate body fat",
    "U.S. Navy body fat calculator",
    "body fat % calculator",
    "fat mass calculator",
    "lean body mass calculator",
    "body composition calculator",
    "body fat calculator for men",
    "body fat calculator for women",
    "how to calculate body fat",
    "ideal body fat percentage",
    "fitness body fat calculator",
    "free body fat calculator",
    "body fat calculator India"
  ],
});
export default function BodyFatPage() {
  return <BodyFatClientPage />;
}
