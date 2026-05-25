import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import QRCodeGeneratorClientPage from "./QRCodeGeneratorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Free QR Code Generator – Create QR Codes Instantly",
  description:
    "Generate free QR codes instantly for URLs, PDFs, images, and text. No signup required, no expiry, and fully customizable. Create high-quality QR codes online for business, marketing, and personal use.",
  path: "/qr-code-generator",
  imageAlt: "Free QR code generator India for website URLs PDF links and instant QR downloads on Velmora",
  keywords: [
    "free QR code generator",
    "QR code generator",
    "generate QR code online",
    "create QR code free",
    "QR code generator no expiry",
    "dynamic QR code generator",
    "static QR code generator",
    "QR code for URL",
    "QR code for PDF",
    "QR code for image",
    "QR code for text",
    "QR code for business",
    "custom QR code generator",
    "high quality QR code generator",
    "download QR code",
    "QR code maker online",
    "free QR code creator",
    "QR code generator India",
    "QR code for marketing",
    "QR code tool online"
  ],
});

export default function QRCodeGeneratorPage() {
  return <QRCodeGeneratorClientPage />;
}
