import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import QRCodeGeneratorClientPage from "./QRCodeGeneratorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "QR Code Generator – Create Codes for URL, PDF, Text",
description:
  "Generate QR codes for URLs and PDF files. Create and download QR codes online for links, documents, and easy sharing across devices and platforms.",
  path: "/qr-code-generator",

  imageAlt:
    "QR code generator for URLs, PDF files, images, and text with download option",

  keywords: [
    // Core keywords
    "qr code generator",
    "generate qr code online",
    "create qr code",
    "qr code generator for free",
    "qr code tool",
    "qr code generator for location free",
    "qr code generator for link",

    // Long-tail (high ranking potential)
    "qr code generator for url",
    "qr code generator for pdf",
    "qr code generator for image",
    "qr code generator for text",
    "qr code generator without signup",
    "static qr code generator online",
    "qr code generator india online",
    "create qr code for website link",
    "generate qr code for documents",
    "qr code generator for business use",

    // Intent-based keywords
    "create qr code online",
    "qr code generator for location",
    "convert link to qr code",
    "make qr code for sharing",
    "qr code for marketing materials",

    // Supporting SEO keywords
    "qr code generator for image",
    "qr code generator for pdf",
    "qr code generator for video",
    "qr code generator for google form",
    "qr code generator for google reviews"
  ],
});

export default function QRCodeGeneratorPage() {
  return <QRCodeGeneratorClientPage />;
}
