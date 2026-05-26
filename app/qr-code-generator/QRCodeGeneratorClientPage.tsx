"use client";

import { useState } from "react";
import QRCode from "qrcode";

type QRMode = "url" | "pdf";

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function QRCodeGeneratorClientPage() {
  const [mode, setMode] = useState<QRMode>("url");
  const [input, setInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const trimmedInput = input.trim();
  const inputLabel = mode === "url" ? "Website URL" : "PDF URL";
  const placeholder =
    mode === "url"
      ? "Enter URL (e.g. https://example.com)"
      : "Enter PDF URL (e.g. https://example.com/file.pdf)";

  const handleGenerate = async () => {
    if (!trimmedInput) {
      setError(mode === "url" ? "Please enter a URL to generate a QR code." : "Please enter a PDF URL to generate a QR code.");
      setQrCodeUrl("");
      return;
    }

    if (!isValidUrl(trimmedInput)) {
      setError("Please enter a valid link starting with http:// or https://.");
      setQrCodeUrl("");
      return;
    }

    if (mode === "pdf" && !trimmedInput.toLowerCase().includes(".pdf")) {
      setError("Please enter a direct PDF link, or a share link that opens your PDF.");
      setQrCodeUrl("");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const dataUrl = await QRCode.toDataURL(trimmedInput, {
        width: 720,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
        errorCorrectionLevel: "H",
      });

      setQrCodeUrl(dataUrl);
    } catch {
      setError("Could not generate the QR code. Please try again.");
      setQrCodeUrl("");
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setInput("");
    setQrCodeUrl("");
    setError("");
    setIsGenerating(false);
  };

  const selectMode = (nextMode: QRMode) => {
    setMode(nextMode);
    setInput("");
    setQrCodeUrl("");
    setError("");
    setIsGenerating(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip px-0 sm:px-4 md:px-8 dark:bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Free Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              QR Code Generator
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Generate QR codes instantly for URLs or PDF links
            </p>
            <span className="mt-4 inline-flex max-w-full whitespace-normal rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1.5 text-center text-xs font-bold leading-relaxed text-slate-700 shadow-[0_10px_22px_rgba(14,165,233,0.12)] dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
             Free Forever • No Expiry • No Signup Required
            </span>

            <div className="mt-6 sm:mt-7">
              <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-white/10 dark:bg-slate-950/60">
                <button
                  type="button"
                  onClick={() => selectMode("url")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    mode === "url"
                      ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.1)] dark:bg-slate-800 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  URL QR
                </button>
                <button
                  type="button"
                  onClick={() => selectMode("pdf")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    mode === "pdf"
                      ? "bg-white text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.1)] dark:bg-slate-800 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  PDF QR
                </button>
              </div>

              <label htmlFor="qr-input" className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                {inputLabel}
              </label>
              <input
                id="qr-input"
                type="url"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  if (error) setError("");
                }}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/15 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.35)] dark:focus:border-cyan-400/60 dark:focus:ring-cyan-400/15"
              />

              {error ? (
                <p className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
              ) : (
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Your QR code never expires. Use it anytime, anywhere.
                </p>
              )}

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-white/70 bg-white/85 py-4 text-base font-bold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_22px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-white/15 dark:bg-slate-800/90 dark:text-slate-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_22px_rgba(0,0,0,0.4)] dark:hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_52px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute -right-16 -top-14 h-48 w-48 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
            <div className="pointer-events-none absolute -bottom-14 -left-16 h-52 w-52 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/20" />

            <div className="relative z-10 flex h-full min-h-[300px] rounded-xl border border-cyan-100/80 bg-[radial-gradient(circle_at_8%_94%,rgba(124,58,237,0.1),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_100%)] p-0 shadow-none sm:min-h-[520px] sm:rounded-xl sm:p-8 sm:shadow-[0_24px_64px_rgba(15,23,42,0.12)] dark:border-slate-700/70 dark:bg-[radial-gradient(circle_at_8%_94%,rgba(109,40,217,0.34),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(8,145,178,0.36),transparent_34%),linear-gradient(135deg,#0b1020_0%,#101827_100%)] sm:dark:shadow-[0_28px_70px_rgba(2,6,23,0.42)]">
              {qrCodeUrl ? (
                <div className="flex min-h-full w-full flex-col items-center justify-center text-center">
                  <div className="rounded-xl border border-white/80 bg-white p-4 shadow-[0_24px_54px_rgba(15,23,42,0.18)] dark:border-white/10 dark:shadow-[0_24px_54px_rgba(0,0,0,0.45)]">
                    <img
                      src={qrCodeUrl}
                      alt={`Generated ${mode === "url" ? "website URL" : "PDF link"} QR code for ${trimmedInput}`}
                      className="h-64 w-64 rounded-xl sm:h-80 sm:w-80"
                    />
                  </div>
                  <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                    Your QR code never expires. Use it anytime, anywhere.
                  </p>
                  <a
                    href={qrCodeUrl}
                    download="velmora-qr-code.png"
                    className="mt-5 inline-flex rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-6 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]"
                  >
                    Download QR Code
                  </a>
                </div>
              ) : (
                <div className="flex min-h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-cyan-300/60 px-4 py-8 text-center dark:border-cyan-400/25 sm:rounded-[1.5rem] sm:px-8 sm:py-16">
                  <div className="rounded-xl border border-transparent bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-3 py-2 text-xs font-bold capitalize text-white shadow-[0_10px_22px_rgba(167,139,250,0.38)] sm:py-3 sm:text-sm">
                    Result Panel
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-slate-950 sm:mt-7 sm:text-4xl dark:text-white">
                    Ready to generate
                  </h2>
                  <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:mt-5 sm:text-lg dark:text-slate-300">
                    Enter a {mode === "url" ? "URL" : "PDF link"} and generate a QR code instantly. Your QR code will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
