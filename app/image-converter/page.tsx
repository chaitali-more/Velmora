import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import ImageConverterClientPage from "./ImageConverterClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Image Converter – Convert JPG, PNG, WebP Online",

  description:
    "Convert images between JPG, PNG, and WebP formats online. Change image file types for web use, compatibility, and optimized file handling across devices.",

  path: "/image-converter",

  imageAlt:
    "Image converter for JPG PNG and WebP formats with browser-based file conversion",

  keywords: [
    // Core keywords
    "image converter",
    "convert image online",
    "image format converter",
    "online image converter",
    "convert image format",

    // Long-tail (high ranking potential)
    "jpg to png converter online",
    "png to jpg converter online",
    "webp to jpg converter online",
    "convert jpg to webp online",
    "convert png to webp online",
    "image converter for web optimization",
    "image format converter for website",
    "online image converter without software",
    "image converter for different formats",
    "convert image file type online",

    // Intent-based keywords
    "change image format online",
    "convert image for website use",
    "convert image for compatibility",
    "convert photo to different format",
    "image format change tool",

    // Supporting SEO keywords
    "jpg png webp conversion",
    "image file format conversion",
    "digital image converter tool",
    "image optimization formats",
    "file format conversion tool"
  ],
});

export default function ImageConverterPage() {
  return <ImageConverterClientPage />;
}
