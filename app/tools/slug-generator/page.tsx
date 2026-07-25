import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import SlugGeneratorClientPage from "./SlugGeneratorClientPage";

const baseMetadata = buildStaticPageMetadata({
  title: "Slug Generator - Free SEO-Friendly URL Slug Tool | Velmora",
  description:
    "Free online slug generator. Convert titles or phrases into clean, SEO-friendly URL slugs instantly. No signup, 100% private — works entirely in your browser.",
  path: "/tools/slug-generator",
  imageAlt: "Slug Generator tool by Velmora",
  keywords: [
    "slug generator",
    "url slug generator",
    "seo slug generator",
    "clean url generator",
    "string to slug",
    "title to url",
    "permalink generator",
    "url friendly text",
    "generate slug online",
    "free slug generator",
    "developer tools",
    "seo tools online"
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Slug Generator - Free & Instant | Velmora",
    description:
      "Convert any title into a clean, SEO-friendly URL slug instantly. Free, private, no signup required.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Slug Generator - Free & Instant | Velmora",
    description:
      "Convert any title into a clean, SEO-friendly URL slug instantly. Free, private, no signup required.",
  },
};

export default function SlugGeneratorPage() {
  return <SlugGeneratorClientPage />;
}
