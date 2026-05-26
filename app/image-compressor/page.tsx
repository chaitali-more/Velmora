import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import ImageCompressorClientPage from "./ImageCompressorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Image Compressor – Reduce Image Size",

  description:
    "Compress images online to reduce file size without quality loss. Optimize JPG, PNG, and WebP images for web use, storage, and faster loading across devices.",

  path: "/image-compressor",

  imageAlt:
    "Image compressor to reduce JPG PNG and WebP file size for web and storage use",

  keywords: [
    // Core keywords
    "image compressor",
    "compress image online",
    "reduce image size",
    "image size reducer",
    "online image compressor",

    // Long-tail (high ranking potential)
    "compress image without losing quality",
    "reduce jpg file size online",
    "compress png image online",
    "compress webp image online",
    "image compressor for website optimization",
    "reduce image size for faster loading",
    "compress image for web use",
    "image compression tool online",
    "reduce photo size without quality loss",
    "compress large image file online",

    // Intent-based keywords
    "optimize image for website",
    "reduce image size for upload",
    "compress image for sharing",
    "decrease image file size online",
    "image file size reduction tool",

    // Supporting SEO keywords
    "jpg png webp compression",
    "image optimization tool",
    "image file compression online",
    "photo size optimization",
    "digital image compression tool"
  ],
});

export default function ImageCompressorPage() {
  return <ImageCompressorClientPage />;
}
