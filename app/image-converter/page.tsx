import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import ImageConverterClientPage from "./ImageConverterClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Image Converter – JPG, PNG, WebP Online",
  description:
    "Convert images to JPG, PNG, or WebP instantly with Velmora’s free image converter. No upload required, works in your browser, fast, secure, and no watermark.",
  path: "/image-converter",
  imageAlt: "Free image converter for JPG PNG WebP on Velmora",
  keywords: [
    "image converter",
    "convert image online",
    "JPG to PNG converter",
    "PNG to JPG converter",
    "WebP to JPG converter",
    "image format converter",
    "convert JPG to WebP",
    "convert PNG to WebP",
    "free image converter",
    "online image converter",
    "image converter no upload",
    "browser image converter",
    "fast image converter",
    "image converter India",
  ],
});

export default function ImageConverterPage() {
  return <ImageConverterClientPage />;
}
