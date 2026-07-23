import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import TextCaseConverterClientPage from "./TextCaseConverterClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Text Case Converter - Upper, Lower & Title Case",
  description:
    "Free online text case converter. Instantly switch text to UPPERCASE, lowercase, Title Case, Sentence case, and more. No signup, 100% private — your text never leaves your browser.",
  path: "/tools/text-case-converter",
  imageAlt: "Text Case Converter tool by Velmora",
  keywords: [
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "alternating case generator",
    "inverse case converter",
    "convert text case online",
    "capitalize text online",
    "all caps converter",
    "free text case tool"
  ],
});

export default function TextCaseConverterPage() {
  return <TextCaseConverterClientPage />;
}
