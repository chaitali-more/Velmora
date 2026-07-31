import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import CompareTextClientPage from "./CompareTextClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Compare Text Online - Free Diff Checker Tool | Velmora",
  description:
    "Compare two blocks of text side-by-side or inline and see highlights of additions, deletions, and differences instantly. 100% private in-browser diff checker.",
  path: "/tools/compare-text",
  imageAlt: "Compare Text Diff Checker tool by Velmora",
  keywords: [
    "compare text online",
    "diff checker",
    "text comparison tool",
    "side-by-side text comparison",
    "text difference checker",
    "compare two texts",
    "online diff tool",
    "code difference checker",
    "text diff checker",
    "free productivity tools online"
  ],
});

export default function CompareTextPage() {
  return <CompareTextClientPage />;
}
