// app/contact/page.tsx
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Contact Velmora – Get in Touch for Support & Collaboration",
  description:
    "Get in touch with Velmora for support, collaborations, feedback, or business inquiries. Reach out easily and connect with us for partnerships, questions, or project ideas.",
  path: "/contact",
  imageAlt: "Contact Velmora for support, collaboration, and inquiries",
  keywords: [
    "contact Velmora",
    "Velmora contact",
    "contact for collaboration",
    "business inquiries Velmora",
    "website feedback",
    "project collaboration",
    "contact support online"
  ],
});
export default function ContactPage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Get in touch
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Have something to say? I&apos;d love to hear from you.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
