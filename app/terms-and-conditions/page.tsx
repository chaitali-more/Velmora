import type { Metadata } from 'next'
import { buildStaticPageMetadata } from '@/lib/seo'
export const metadata: Metadata = buildStaticPageMetadata({
  title: "Terms & Conditions – Website Usage & Policies",
  description:
    "Read Velmora’s terms and conditions to understand the rules for using our website, including tools, calculators, content, and services. Learn about user responsibilities, limitations, and legal policies.",
  path: "/terms-and-conditions",
  imageAlt: "Velmora India terms and conditions for free tools calculators and website usage",
  keywords: [
    "terms and conditions",
    "Velmora terms and conditions",
    "website terms of use",
    "user agreement",
    "terms of service",
    "website usage policy",
    "legal terms website",
    "terms for online tools"
  ],
});
const sections = [
  {
    number: '1',
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing or using the website at velmora.com, the &quot;Website&quot;, you agree to be bound by these Terms and Conditions, &quot;Terms&quot;. If you do not agree with any part of these Terms, please discontinue use of the Website immediately.
        </p>
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100">
          Simple summary: Using Velmora means you agree to these rules. No account or signup is needed. Just visiting the site counts as acceptance.
        </p>
      </>
    ),
  },
  {
    number: '2',
    title: 'About Velmora',
    content: (
      <>
        <p>Velmora is a free, publicly accessible website that offers:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>A blog with articles covering technology, life, and related topics</li>
          <li>Health and fitness calculators, including BMI, BMR, calorie, protein, macro, body fat, ideal weight, and water intake calculators</li>
          <li>A QR code generator, a free tool to generate QR codes from URLs or PDF links</li>
        </ul>
        <p>All tools and content on Velmora are provided free of charge and do not require any user registration or login.</p>
      </>
    ),
  },
  {
    number: '3',
    title: 'Use of the Website',
    content: (
      <>
        <p>You agree to use Velmora only for lawful purposes and in a manner that does not infringe upon the rights of others. You must not:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Attempt to gain unauthorised access to any part of the Website or its servers</li>
          <li>Use automated bots, scrapers, or crawlers to extract content in bulk without prior written permission</li>
          <li>Introduce malicious code, viruses, or any software intended to disrupt the Website</li>
          <li>Use the Website in any way that could damage, disable, or impair its functionality</li>
          <li>Attempt to reverse-engineer any feature or tool on the Website</li>
        </ul>
        <p>We reserve the right to restrict access to the Website at our discretion if these terms are violated.</p>
      </>
    ),
  },
  {
    number: '4',
    title: 'Our Tools and Calculators',
    content: (
      <>
        <p>The health, fitness, and QR code tools provided on Velmora are intended for informational and convenience purposes only.</p>
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Important: Calculator results, such as BMI, calorie needs, or ideal weight, are estimates based on general formulas. They are not a substitute for professional medical, nutritional, or healthcare advice. Always consult a qualified professional before making health-related decisions.
        </p>
        <p>
          QR codes generated on Velmora are provided as-is. We do not guarantee that generated QR codes will function correctly with all devices or scanning applications. You are responsible for verifying the accuracy of the URL or content you input.
        </p>
        <p>We do not store or retain any data you enter into our tools.</p>
      </>
    ),
  },
  {
    number: '5',
    title: 'Blog and Content',
    content: (
      <>
        <p>
          All blog articles and written content published on Velmora are the original work of the Velmora team unless otherwise stated. Content is provided for general informational purposes only.
        </p>
        <p>
          While we strive for accuracy, we make no guarantees that the information in our blog posts is complete, up to date, or free of errors. We are not responsible for any decisions made based on blog content.
        </p>
        <p>
          You may share links to our blog posts freely. However, reproducing, copying, or republishing our content in whole or in significant part without written permission is not permitted.
        </p>
      </>
    ),
  },
  {
    number: '6',
    title: 'Intellectual Property',
    content: (
      <>
        <p>
          All content on Velmora, including but not limited to text, blog articles, tool designs, graphics, logos, and the Velmora name and brand, is the intellectual property of Velmora and is protected under applicable copyright and trademark laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable licence to access and use the Website for your own personal, non-commercial use. This licence does not permit you to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Copy or reproduce the Website&apos;s content for commercial purposes</li>
          <li>Modify or create derivative works based on our content without permission</li>
          <li>Remove any copyright, trademark, or proprietary notices from any content</li>
        </ul>
      </>
    ),
  },
  {
    number: '7',
    title: 'Disclaimer of Warranties',
    content: (
      <>
        <p>
          Velmora is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied. We do not warrant that:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>The Website will be uninterrupted, error-free, or free of viruses</li>
          <li>The results obtained from using our tools will be accurate or reliable for your specific situation</li>
          <li>Any errors or defects in the Website will be corrected</li>
        </ul>
        <p>Your use of the Website is entirely at your own risk.</p>
      </>
    ),
  },
  {
    number: '8',
    title: 'Limitation of Liability',
    content: (
      <>
        <p>
          To the fullest extent permitted by law, Velmora and its operators shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Website, including but not limited to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Reliance on calculator results for medical or health decisions</li>
          <li>Errors in QR codes generated using our tool</li>
          <li>Data loss or technical issues caused by using the Website</li>
          <li>Any actions taken based on blog content</li>
        </ul>
        <p>
          Our total liability to you, in any circumstance, shall not exceed the amount you paid to use our services, which, since Velmora is entirely free, is zero.
        </p>
      </>
    ),
  },
  {
    number: '9',
    title: 'Third-Party Links',
    content: (
      <>
        <p>
          Our blog posts or pages may occasionally contain links to third-party websites for reference or further reading. These links are provided for convenience only. Velmora does not endorse, control, or take responsibility for the content, privacy practices, or accuracy of any third-party websites.
        </p>
        <p>Clicking on external links is done entirely at your own discretion and risk.</p>
      </>
    ),
  },
  {
    number: '10',
    title: 'Governing Law',
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which Velmora operates. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in that jurisdiction.
        </p>
        <p>If you are accessing Velmora from outside that jurisdiction, you are responsible for compliance with any local laws that may apply to you.</p>
      </>
    ),
  },
  {
    number: '11',
    title: 'Changes to These Terms',
    content: (
      <>
        <p>
          We reserve the right to update or modify these Terms at any time. When changes are made, we will revise the &quot;Last updated&quot; date at the top of this page. It is your responsibility to review these Terms periodically.
        </p>
        <p>Continued use of Velmora following the posting of any changes constitutes your acceptance of the revised Terms.</p>
      </>
    ),
  },
  {
    number: '12',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have any questions or concerns about these Terms and Conditions, please get in touch with us:</p>
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

export default function TermsAndConditionsPage() {
  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Legal</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Terms and Conditions</h1>
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
