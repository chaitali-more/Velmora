import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import JsonFormatterClientPage from "./JsonFormatterClientPage";

const baseMetadata = buildStaticPageMetadata({
  title: "JSON Formatter & Validator - Free Online Tool | Velmora",
  description:
    "Free online JSON formatter and validator. Beautify, minify, and validate JSON instantly with syntax highlighting and error detection. No signup, 100% private — processed entirely in your browser.",
  path: "/tools/json-formatter",
  imageAlt: "JSON Formatter & Validator tool by Velmora",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "online json formatter",
    "format json online",
    "json prettifier",
    "json syntax highlighter",
    "validate json online",
    "json parser",
    "json viewer",
    "developer tools online",
    "free json formatter no signup",
    "private json formatter browser"
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    title: "JSON Formatter & Validator - Free & Instant | Velmora",
    description:
      "Beautify, minify, and validate JSON online. Instant syntax highlighting and error detection. Free, private, no signup required.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "JSON Formatter & Validator - Free & Instant | Velmora",
    description:
      "Beautify, minify, and validate JSON online. Instant syntax highlighting and error detection. Free, private, no signup required.",
  },
};

export default function JsonFormatterPage() {
  return <JsonFormatterClientPage />;
}
