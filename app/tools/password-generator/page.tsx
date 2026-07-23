import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import PasswordGeneratorClientPage from "./PasswordGeneratorClientPage";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Password Generator - Free Secure Random Passwords",
  description:
    "Free online password generator. Create strong, secure, random passwords instantly with custom length and character options. No signup, 100% private — passwords are generated locally and never stored or transmitted.",
  path: "/tools/password-generator",
  imageAlt: "Secure Password Generator tool by Velmora",
  keywords: [
    "password generator",
    "secure password generator",
    "random password generator",
    "strong password generator",
    "crypto password generator",
    "password strength checker",
    "custom password generator",
    "free password tool online",
    "private password generator"
  ],
});

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClientPage />;
}
