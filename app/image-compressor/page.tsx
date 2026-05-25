import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import ImageCompressorClientPage from "./ImageCompressorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Image Compressor – Reduce Image Size Online",
  description:
    "Compress images online and reduce file size without losing quality. Use Velmora’s free image compressor for JPG, PNG, WebP, GIF, and more. No upload, fast, secure, and no watermark.",
  path: "/image-compressor",
  imageAlt: "Free image compressor India to reduce JPG PNG and WebP file size on Velmora",
  keywords: [
    "image compressor",
    "compress image online",
    "reduce image size",
    "image size reducer",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "image optimizer",
    "photo compressor",
    "reduce file size image",
    "image compression tool",
    "free image compressor",
    "online image compressor",
    "compress image without losing quality",
    "image compressor no upload",
    "fast image compressor",
    "image compressor India",
  ],
});

export default function ImageCompressorPage() {
  return <ImageCompressorClientPage />;
}
