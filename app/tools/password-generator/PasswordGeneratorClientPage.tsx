"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiLock,
  FiRefreshCw,
  FiShield,
  FiSliders,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";

const faqData = [
  {
    question: "Is it safe to generate my password using this tool?",
    answer:
      "Yes. This tool generates passwords entirely within your browser using your device's cryptographically secure random number generator. No password is ever sent to a server, stored in a database, or logged anywhere. Once you leave or refresh the page, the generated password is gone unless you've copied and saved it yourself.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "A strong password is typically at least 12–16 characters long and combines uppercase letters, lowercase letters, numbers, and symbols. Longer passwords with more character variety are exponentially harder to guess or crack through brute-force methods. Avoid using dictionary words, personal information, or predictable patterns.",
  },
  {
    question: "Should I exclude ambiguous characters like 0, O, 1, l, and I?",
    answer:
      'Excluding ambiguous characters can help if you need to manually type or read the password aloud, since characters like the number "0" and letter "O" (or "1", "l", and "I") can look identical in some fonts. If you\'re storing the password in a password manager and copy-pasting it, this isn\'t necessary and you can leave all character types enabled for maximum security.',
  },
  {
    question: "How long should my password be?",
    answer:
      "For most accounts, 12–16 characters is a solid minimum. For highly sensitive accounts like email, banking, or password managers, 20+ characters is recommended. Length matters more than complexity — a longer password with fewer symbol requirements is often stronger than a short one packed with special characters.",
  },
  {
    question: "Should I reuse the same password across multiple sites?",
    answer:
      "No. Reusing passwords means that if one website is breached, attackers can potentially access all your other accounts using the same credentials. Generate a unique password for every account and consider using a password manager to store them securely.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS_CHARS = ["0", "O", "1", "l", "I"];

export default function PasswordGeneratorClientPage() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const generatePassword = useCallback(() => {
    let pool = "";
    if (includeUppercase) pool += UPPERCASE_CHARS;
    if (includeLowercase) pool += LOWERCASE_CHARS;
    if (includeNumbers) pool += NUMBER_CHARS;
    if (includeSymbols) pool += SYMBOL_CHARS;

    if (!pool) {
      pool = LOWERCASE_CHARS;
      setIncludeLowercase(true);
    }

    if (excludeAmbiguous) {
      AMBIGUOUS_CHARS.forEach((char) => {
        pool = pool.replaceAll(char, "");
      });
    }

    if (!pool) {
      pool = LOWERCASE_CHARS;
    }

    let result = "";
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        const val = randomValues[i];
        if (val !== undefined) {
          result += pool[val % pool.length];
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += pool[Math.floor(Math.random() * pool.length)];
      }
    }

    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Uncheck Guard logic
  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentVal: boolean
  ) => {
    if (currentVal) {
      const activeCount = [
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
      ].filter(Boolean).length;

      if (activeCount <= 1) {
        showToast("At least one character type must be selected!");
        return;
      }
    }
    setter(!currentVal);
  };

  // Password Strength Calculation
  const strengthInfo = useMemo(() => {
    if (!password) return { score: 1, label: "Weak", color: "bg-red-500", text: "text-red-500", width: "w-1/4" };

    const activeTypes = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    ].filter(Boolean).length;

    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;

    if (activeTypes >= 3) score += 1;
    if (activeTypes === 4) score += 1;

    if (score <= 2) {
      return { score: 1, label: "Weak", color: "bg-red-500", text: "text-red-500", width: "w-1/4" };
    } else if (score === 3) {
      return { score: 2, label: "Medium", color: "bg-amber-500", text: "text-amber-500", width: "w-2/4" };
    } else if (score === 4) {
      return { score: 3, label: "Strong", color: "bg-emerald-500", text: "text-emerald-500", width: "w-3/4" };
    } else {
      return { score: 4, label: "Very Strong", color: "bg-cyan-500", text: "text-cyan-500", width: "w-full" };
    }
  }, [password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      showToast("Password copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy password.");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
        <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
          <main className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
                <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Cryptographically Secure • 100% Local Browser RNG
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Password Generator
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Generate strong, secure, random passwords instantly. Customize length 
                and character types to match any website&apos;s requirements. Every password 
                is generated locally in your browser using cryptographically secure 
                randomness — nothing is ever stored, logged, or transmitted anywhere.
              </p>
            </div>

            {/* Main Generator Tool Card */}
            <div className="mt-5 max-w-3xl sm:mt-8">
              {/* Password Display Box (Mobile-first responsive layout) */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 sm:p-5 dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Generated Password Box */}
                  <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-slate-100/90 p-3 text-center sm:bg-transparent sm:p-0 sm:text-left dark:bg-slate-900/80 sm:dark:bg-transparent">
                    <span className="font-mono text-lg font-black tracking-wider text-slate-900 select-all break-all sm:text-2xl md:text-3xl dark:text-cyan-300">
                      {password}
                    </span>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="grid w-full grid-cols-[auto_1fr] items-center gap-2 sm:w-auto sm:flex sm:shrink-0">
                    <button
                      type="button"
                      onClick={generatePassword}
                      title="Generate New Password"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                      <FiRefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!password}
                      className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-4 text-xs font-bold text-white shadow-[0_10px_22px_rgba(167,139,250,0.4)] transition-all active:scale-95 disabled:opacity-40 sm:w-auto sm:px-5 sm:text-sm"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="h-4 w-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="h-4 w-4" />
                          <span>Copy Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator Meter */}
                <div className="mt-4 border-t border-slate-200/60 pt-3 dark:border-white/5">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold">
                    <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Password Strength
                    </span>
                    <span className={`shrink-0 ${strengthInfo.text}`}>{strengthInfo.label}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${strengthInfo.color} ${strengthInfo.width}`}
                    />
                  </div>
                </div>
              </div>

              {/* Password Controls Card */}
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-6 dark:border-white/10 dark:bg-slate-900/40">
                {/* Length Slider Control */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password-length-slider"
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      <FiSliders className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      Password Length
                    </label>
                    <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-lg bg-cyan-500/10 px-2.5 py-1 font-mono text-sm font-extrabold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                      {length}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setLength((l) => Math.max(4, l - 1))}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
                    >
                      -
                    </button>
                    <input
                      id="password-length-slider"
                      type="range"
                      min={4}
                      max={64}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-500 dark:bg-slate-800 dark:accent-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setLength((l) => Math.min(64, l + 1))}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Character Type Toggles */}
                <div className="mt-6 border-t border-slate-200/60 pt-5 dark:border-white/10">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Include Character Types
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Uppercase Letters (A-Z)
                      </span>
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={() => handleToggle(setIncludeUppercase, includeUppercase)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Lowercase Letters (a-z)
                      </span>
                      <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={() => handleToggle(setIncludeLowercase, includeLowercase)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Numbers (0-9)
                      </span>
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => handleToggle(setIncludeNumbers, includeNumbers)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-cyan-500"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Symbols (!@#$%^&*)
                      </span>
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => handleToggle(setIncludeSymbols, includeSymbols)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-cyan-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Exclude Ambiguous Option */}
                <div className="mt-4 border-t border-slate-200/60 pt-4 dark:border-white/10">
                  <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Exclude Ambiguous Characters
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Avoids confusing characters like 0, O, 1, l, I
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={excludeAmbiguous}
                      onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                      className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-cyan-500"
                    />
                  </label>
                </div>
              </div>

              {/* Security Privacy Callout */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                <FiLock className="h-4 w-4 shrink-0" />
                <span>Generated locally in your browser using cryptographically secure randomness. Never stored or transmitted.</span>
              </div>
            </div>

            {/* Toast Feedback Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-2xl dark:bg-white dark:text-slate-900 sm:left-auto sm:right-6 sm:translate-x-0">
                {toastMessage}
              </div>
            )}

            {/* FAQ Accordion Section */}
            <section className="mt-10 border-t border-slate-200/80 pt-8 sm:mt-16 sm:pt-12 dark:border-white/10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                  Everything You Need to Know About Password Security
                </h2>
              </div>

              <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 transition-all dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-3.5 text-left font-bold text-slate-900 sm:p-5 dark:text-slate-100"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-base">{faq.question}</span>
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 sm:h-5 sm:w-5 ${
                            isOpen ? "rotate-180 text-cyan-500 dark:text-cyan-400" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-200/60 px-3.5 py-3 text-xs leading-relaxed text-slate-600 sm:px-5 sm:py-4 sm:text-sm dark:border-white/5 dark:text-slate-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
            <RelatedTools currentPath="/tools/password-generator" />
          </main>
        </div>
      </div>
    </>
  );
}
