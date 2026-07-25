import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import JsonValidatorClientPage from "./JsonValidatorClientPage";

const baseMetadata = buildStaticPageMetadata({
  title: "JSON Validator - Check & Debug JSON Online | Velmora",
  description:
    "Free online JSON validator. Instantly check if your JSON is valid and pinpoint the exact line and reason for any syntax errors. No signup, 100% private — validated entirely in your browser.",
  path: "/tools/json-validator",
  imageAlt: "JSON Validator tool by Velmora",
  keywords: [
    "json validator",
    "json syntax checker",
    "validate json online",
    "debug json",
    "json error finder",
    "check json syntax",
    "json lint",
    "json linter",
    "json syntax error",
    "online json validator",
    "developer tools",
    "free json validator",
    "private json validator"
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    title: "JSON Validator - Free & Instant | Velmora",
    description:
      "Check if your JSON is valid and find errors instantly, with exact line and column numbers. Free, private, no signup required.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "JSON Validator - Free & Instant | Velmora",
    description:
      "Check if your JSON is valid and find errors instantly, with exact line and column numbers. Free, private, no signup required.",
  },
};

export default function JsonValidatorPage() {
  return <JsonValidatorClientPage />;
}
