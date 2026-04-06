// app/contact/page.tsx
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Contact | Get in Touch for Collaboration & Queries',
  description: 'Contact Velmora for inquiries, collaborations, feedback, or project ideas. We’d love to hear from you and help bring your ideas to life.',
  path: '/contact',
  imageAlt: 'Contact Velmora – Reach Out for Ideas, Feedback & Collaboration',
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
