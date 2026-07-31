import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import SipCalculatorClientPage from "./SipCalculatorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "SIP Calculator - Free Mutual Fund SIP & Lumpsum Calculator | Velmora",
  description:
    "Calculate expected returns and maturity value for your mutual fund SIP (Systematic Investment Plan) or lumpsum investments. Free online calculator with interactive charts and year-by-year compounding growth table.",
  path: "/tools/sip-calculator",
  imageAlt: "SIP & Lumpsum Calculator tool by Velmora",
  keywords: [
    "sip calculator",
    "lumpsum calculator",
    "mutual fund calculator",
    "sip return calculator",
    "sip interest calculator",
    "calculate sip online",
    "systematic investment plan calculator",
    "mutual fund sip returns",
    "compound interest calculator",
    "investment growth calculator",
    "wealth calculator",
    "free finance tools online"
  ],
});

export default function SipCalculatorPage() {
  return <SipCalculatorClientPage />;
}
