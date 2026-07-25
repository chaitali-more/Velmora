import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import EmiCalculatorClientPage from "./EmiCalculatorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "EMI Calculator - Free Loan EMI Calculator Online | Velmora",
  description:
    "Calculate your monthly loan EMI, total interest, and repayment schedule instantly — for home loans, car loans, or personal loans. Free online loan EMI calculator with interactive breakdown charts and year-by-year amortization schedule.",
  path: "/tools/emi-calculator",
  imageAlt: "EMI Calculator tool by Velmora",
  keywords: [
    "emi calculator",
    "loan emi calculator",
    "home loan emi calculator",
    "car loan emi calculator",
    "personal loan emi calculator",
    "calculate emi online",
    "equated monthly installment calculator",
    "loan repayment schedule calculator",
    "amortization schedule calculator",
    "interest calculator india",
    "free finance tools online"
  ],
});

export default function EmiCalculatorPage() {
  return <EmiCalculatorClientPage />;
}
