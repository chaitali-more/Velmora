import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import CompoundInterestCalculatorClientPage from "./CompoundInterestCalculatorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Compound Interest Calculator - Free Savings Growth Calculator | Velmora",
  description:
    "Calculate the growth of your investments or savings over time using compound interest. Support for daily, monthly, quarterly, semi-annual, or annual compounding and deposits.",
  path: "/tools/compound-interest-calculator",
  imageAlt: "Compound Interest Calculator tool by Velmora",
  keywords: [
    "compound interest calculator",
    "savings calculator",
    "savings growth calculator",
    "daily compounding calculator",
    "monthly compounding calculator",
    "compound interest monthly deposits",
    "calculate compound interest",
    "interest compounding calculator",
    "future value calculator",
    "investment growth calculator",
    "free finance tools online"
  ],
});

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculatorClientPage />;
}
