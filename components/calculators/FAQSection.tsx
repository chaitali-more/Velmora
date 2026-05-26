"use client";

import type { FaqItem } from "@/data/calculator-faqs";
import { FiChevronDown } from "react-icons/fi";

type FAQSectionProps = {
  items: FaqItem[];
  title?: string;
  description?: string;
};

export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
  description = "Quick answers to the most common questions about this calculator and how to use the result.",
}: FAQSectionProps) {
  return (
    <section className="relative mt-4 p-0 sm:mt-6 sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 sm:dark:shadow-[0_35px_90px_rgba(0,0,0,0.55)] md:dark:p-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:rounded-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
        
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Helpful Guide
        </p>

        <h2 className="mt-2 text-[1.65rem] font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>

        <div className="mt-5 space-y-3 sm:mt-6">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 transition open:border-cyan-300/70 open:bg-cyan-50/70 sm:px-5 sm:py-4 dark:border-white/10 dark:bg-slate-900/85 dark:shadow-[0_10px_28px_rgba(0,0,0,0.32)] dark:open:border-cyan-400/30 dark:open:bg-slate-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-[0.95rem] font-bold text-slate-900 marker:hidden sm:gap-4 sm:text-base dark:text-slate-100">
                
                <span>{item.question}</span>

                {/* Arrow Icon */}
                <span className="flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-600 transition group-open:bg-cyan-100 group-open:text-cyan-700 dark:bg-slate-800 dark:text-slate-300 dark:group-open:bg-cyan-500/10 dark:group-open:text-cyan-300">
                  <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
                </span>

              </summary>

              <p className="mt-4 pr-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
