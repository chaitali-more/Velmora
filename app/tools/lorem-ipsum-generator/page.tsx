import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import LoremIpsumGeneratorClientPage from "./LoremIpsumGeneratorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Lorem Ipsum Generator - Online Placeholder Dummy Text | Velmora",
  description:
    "Generate custom placeholder dummy text (paragraphs, sentences, words, and bullet lists) with options for paragraph lengths and HTML markup wrapping.",
  path: "/tools/lorem-ipsum-generator",
  imageAlt: "Lorem Ipsum Generator by Velmora",
  keywords: [
    "lorem ipsum generator",
    "dummy text generator",
    "placeholder text generator",
    "developer dummy text",
    "ipsum generator online",
    "free text utility",
    "html lorem ipsum generator",
    "random text generator",
    "lipsum generator",
    "free developer tools"
  ],
});

export default function LoremIpsumGeneratorPage() {
  return <LoremIpsumGeneratorClientPage />;
}
