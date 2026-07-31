import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import ImageToBase64ClientPage from "./ImageToBase64ClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Image to Base64 Converter - Online File Encoder & Decoder | Velmora",
  description:
    "Convert PNG, JPG, SVG, and WebP images to Base64 data strings, HTML img markup, or CSS rules, and instantly decode Base64 back to image files. 100% private.",
  path: "/tools/image-to-base64",
  imageAlt: "Image to Base64 Converter by Velmora",
  keywords: [
    "image to base64",
    "base64 to image",
    "convert image to base64",
    "base64 image decoder",
    "base64 image encoder",
    "png to base64",
    "jpg to base64",
    "base64 string to image file",
    "online base64 converter",
    "safe developer tools",
    "convert image to base64 code",
    "decode base64 to jpg",
    "base64 image tag generator",
    "online image to base64 tool",
    "convert base64 to png online",
    "free base64 image encoder"
  ],
});

export default function ImageToBase64Page() {
  return <ImageToBase64ClientPage />;
}
