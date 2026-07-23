import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import PercentageCalculatorClientPage from "./PercentageCalculatorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Percentage Calculator - Free Online Tool",
  description:
    "Free online percentage calculator. Calculate percentages, percentage increase/decrease, and percentage change instantly. No signup, 100% private — works entirely in your browser.",
  path: "/tools/percentage-calculator",
  imageAlt: "Percentage Calculator tool by Velmora",
  keywords: [
    "percentage calculator",
    "calculate percentage",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percentage change calculator",
    "what percent is X of Y",
    "find percentage of a number",
    "discount calculator",
    "free online math tools"
  ],
});

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClientPage />;
}
