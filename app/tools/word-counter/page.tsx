import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import WordCounterClientPage from "./WordCounterClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Word Counter & Character Counter - Free Online Tool",
  description:
    "Free online word counter and character counter tool. Instantly count words, characters, sentences, and paragraphs. Get reading time estimates. No signup, 100% private — your text never leaves your browser.",
  path: "/tools/word-counter",
  imageAlt: "Word Counter & Character Counter tool by Velmora",
  keywords: [
    "word counter",
    "character counter",
    "online word counter",
    "character count tool",
    "count words online",
    "word count without spaces",
    "reading time calculator",
    "speaking time estimator",
    "sentence counter",
    "paragraph counter",
    "essay word counter",
    "seo content word counter",
    "free word counter no signup",
    "private word counter browser"
  ],
});

export default function WordCounterPage() {
  return <WordCounterClientPage />;
}
