import type { Metadata } from 'next'
import { buildStaticPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Privacy Policy – Data, Cookies & User Privacy",
  description:
    "Read Velmora’s privacy policy to understand how we collect, use, and protect your data, including cookies, analytics, and tool inputs. Learn about your privacy rights and how your information is handled securely.",
  path: "/privacy-policy",
  imageAlt: "Velmora India privacy policy for data cookies online tools and user privacy",
  keywords: [
    "privacy policy",
    "Velmora privacy policy",
    "data privacy policy",
    "cookie policy",
    "user data protection",
    "website privacy policy",
    "privacy rights",
    "data usage policy"
  ],
});
const sections = [
  {
    number: '1',
    title: 'Introduction',
    content: (
      <>
        <p>
          Welcome to Velmora (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We operate the website velmora.com, which provides free tools including health and fitness calculators, a QR code generator, and a blog with articles on technology and everyday life.
        </p>
        <p>
          Your privacy is important to us. This Privacy Policy explains what information is collected when you visit our website, how we use it, and your rights regarding that information.
        </p>
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100">
          Simple summary: Velmora does not require any account registration or login. We do not collect your name, email, or personal details through any signup form.
        </p>
      </>
    ),
  },
  {
    number: '2',
    title: 'Information We Collect',
    content: (
      <>
        <p>We collect two types of information:</p>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Automatically collected data</h3>
          <p className="mt-1">When you visit our website, our servers and analytics tools may automatically record:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Your IP address, anonymised where possible</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring URL, where you came from</li>
            <li>Date and time of your visit</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Tool input data</h3>
          <p className="mt-1">
            Data you enter into our calculators, such as height, weight, calorie values, or the QR Code Generator, such as URLs, is processed entirely in your browser or on our servers only to generate the result. We do not store, log, or associate this input data with any individual.
          </p>
        </div>
      </>
    ),
  },
  {
    number: '3',
    title: 'How We Use Your Information',
    content: (
      <>
        <p>The data we collect is used solely for the following purposes:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>To operate, maintain, and improve our website and tools</li>
          <li>To analyse aggregate traffic patterns and understand how visitors use the site</li>
          <li>To diagnose technical problems or errors</li>
          <li>To protect the security and integrity of our services</li>
        </ul>
        <p>We do not sell, rent, or trade your information to any third party for commercial purposes.</p>
      </>
    ),
  },
  {
    number: '4',
    title: 'Cookies and Tracking Technologies',
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies. These are small text files placed on your device to help the site function properly and to collect analytics data.
        </p>
        <p>We may use the following types of cookies:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Essential cookies, required for the website to function correctly</li>
          <li>Analytics cookies, used to understand visitor behaviour in aggregate, such as via Google Analytics or a privacy-focused alternative</li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings at any time. Note that disabling certain cookies may affect the functionality of some tools.
        </p>
      </>
    ),
  },
  {
    number: '5',
    title: 'Third-Party Services',
    content: (
      <>
        <p>
          We may use third-party services to help run and improve Velmora. These services may collect information as described in their own privacy policies:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Analytics providers, such as Google Analytics, to track aggregate site usage</li>
          <li>Hosting providers, to serve the website content reliably</li>
          <li>Content delivery networks, CDN, to improve loading speed</li>
        </ul>
        <p>We do not share personally identifiable information with any third party beyond what is necessary for these operational purposes.</p>
      </>
    ),
  },
  {
    number: '6',
    title: 'Data Retention',
    content: (
      <p>
        Analytics data is retained in aggregated, anonymised form for up to 26 months, after which it is automatically deleted. Input data entered into our tools is not stored on our servers and is discarded immediately after the result is generated.
      </p>
    ),
  },
  {
    number: '7',
    title: 'Your Rights',
    content: (
      <>
        <p>Depending on your location, you may have certain rights regarding your data, including:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>The right to access information we hold about you</li>
          <li>The right to request deletion of your data</li>
          <li>The right to opt out of analytics tracking, via browser settings or opt-out tools</li>
          <li>The right to lodge a complaint with a relevant data protection authority</li>
        </ul>
        <p>
          Since we do not collect personally identifiable information through any account or form, most of these rights apply primarily to analytics cookies. You may exercise your rights by contacting us using the details in Section 10.
        </p>
      </>
    ),
  },
  {
    number: '8',
    title: "Children's Privacy",
    content: (
      <p>
        Velmora is a general-purpose informational website and is not directed at children under the age of 13. We do not knowingly collect any personal information from children. If you believe a child has provided us with personal data, please contact us and we will take steps to delete it promptly.
      </p>
    ),
  },
  {
    number: '9',
    title: 'Changes to This Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.
        </p>
        <p>Continued use of Velmora after any changes constitutes your acceptance of the updated policy.</p>
      </>
    ),
  },
  {
    number: '10',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
        <dl className="mt-3 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5 sm:grid-cols-2">
          <div>
            <dt className="font-bold text-slate-900 dark:text-white">Website</dt>
            <dd>velmora.com</dd>
          </div>
          <div>
            <dt className="font-bold text-slate-900 dark:text-white">Contact page</dt>
            <dd>velmora.com/contact</dd>
          </div>
        </dl>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Legal</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Effective date: May 20, 2025 <span aria-hidden="true"> | </span> Last updated: May 20, 2025 <span aria-hidden="true"> | </span> Applies to: velmora.com
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {sections.map((section) => (
          <section key={section.number} className="border-t border-slate-200 pt-6 dark:border-white/10">
            <div className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                {section.number}
              </span>
              <div className="space-y-3">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{section.title}</h2>
                {section.content}
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
