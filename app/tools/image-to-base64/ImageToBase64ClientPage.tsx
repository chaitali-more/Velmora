"use client";

import { useMemo, useState, useRef } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiShield,
  FiImage,
  FiUploadCloud,
  FiDownload,
  FiCode,
} from "react-icons/fi";
import RelatedTools from "@/components/tools/RelatedTools";
import { buildToolPageSchema } from "@/lib/tool-page-schema";

type Tab = "encoder" | "decoder";

const faqData = [
  {
    question: "What is an Image to Base64 Converter?",
    answer:
      "An Image to Base64 Converter is a utility that encodes binary image files (like PNG, JPG, SVG, WebP) into an ASCII string format using Base64 encoding. This string can be embedded directly in HTML documents, CSS files, or JSON payloads without requiring separate HTTP requests to load the image.",
  },
  {
    question: "How do I convert a Base64 string back to an image file?",
    answer:
      "Simply switch to the 'Base64 to Image' tab, paste your Base64 encoded string into the input area, and the tool will automatically detect the file format, preview it, and provide a 'Download Image' button to save the file back to your device.",
  },
  {
    question: "Is there a file size limit for Base64 conversion?",
    answer:
      "While there is no technical limit in this tool, Base64 strings are roughly 33% larger in data size compared to their original binary format. It is recommended to use Base64 primarily for small images, icons, and SVGs (usually under 50KB) to avoid bloating your HTML or CSS files.",
  },
  {
    question: "Is my uploaded image uploaded to a server?",
    answer:
      "No, absolutely not. All conversions are performed locally in your browser using Javascript FileReader APIs. Your files are never uploaded to any server, ensuring complete security and privacy.",
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

export default function ImageToBase64ClientPage() {
  const [activeTab, setActiveTab] = useState<Tab>("encoder");

  // Encoder state
  const [encoderFile, setEncoderFile] = useState<{
    name: string;
    size: number;
    type: string;
    base64: string;
    dataUri: string;
  } | null>(null);

  // Decoder state
  const [decoderInput, setDecoderInput] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolSchema = useMemo(() => {
    return buildToolPageSchema("/tools/image-to-base64");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopy = async (text: string, codeKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeKey);
      showToast("Copied to clipboard!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      showToast("Failed to copy code.");
    }
  };

  // Convert File to Base64
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file (PNG, JPG, WebP, SVG, GIF).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Extract raw base64 (remove data:image/xxx;base64,)
        const base64Str = result.split(",")[1] || "";
        setEncoderFile({
          name: file.name,
          size: file.size,
          type: file.type,
          base64: base64Str,
          dataUri: result,
        });
        showToast("Image encoded successfully!");
      }
    };
    reader.onerror = () => {
      showToast("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Base64 to Image Decoding logic
  const decodedInfo = useMemo(() => {
    if (!decoderInput.trim()) return null;

    let base64String = decoderInput.trim();
    let mimeType = "image/png"; // default fallback

    // Match data URI header: data:image/png;base64,...
    const dataUriMatch = base64String.match(/^data:([^;]+);base64,([\s\S]*)$/);

    if (dataUriMatch) {
      mimeType = dataUriMatch[1];
      base64String = dataUriMatch[2];
    } else {
      // Check if it looks like raw base64, if yes wrap it in a data URI
      // Try to guess mime type from first few characters of raw base64
      if (base64String.startsWith("iVBORw0KGgo")) mimeType = "image/png";
      else if (base64String.startsWith("/9j/")) mimeType = "image/jpeg";
      else if (base64String.startsWith("R0lGOD")) mimeType = "image/gif";
      else if (base64String.startsWith("UklGR")) mimeType = "image/webp";
      else if (base64String.startsWith("PHN2Zy")) mimeType = "image/svg+xml";
    }

    const dataUri = `data:${mimeType};base64,${base64String}`;

    // Calculate approximate size in bytes: length * 0.75
    const approxSize = Math.floor(base64String.replace(/=/g, "").length * 0.75);

    // Get file extension from mime type
    let extension = "png";
    if (mimeType.includes("jpeg")) extension = "jpg";
    else if (mimeType.includes("webp")) extension = "webp";
    else if (mimeType.includes("svg")) extension = "svg";
    else if (mimeType.includes("gif")) extension = "gif";

    return {
      dataUri,
      mimeType,
      size: approxSize,
      extension,
      rawBase64: base64String,
    };
  }, [decoderInput]);

  const handleDownloadDecoded = () => {
    if (!decodedInfo) return;

    try {
      const link = document.createElement("a");
      link.href = decodedInfo.dataUri;
      link.download = `decoded-image.${decodedInfo.extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Image downloaded successfully!");
    } catch {
      showToast("Download failed. Ensure the Base64 format is valid.");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Presets load functions
  const handleLoadSample = () => {
    // Small 1x1 transparent spacer PNG encoded
    const sampleUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    setEncoderFile({
      name: "sample-dot.png",
      size: 68,
      type: "image/png",
      base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      dataUri: sampleUri,
    });
    showToast("Sample image loaded!");
  };

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* WebApplication Schema */}
      {toolSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
        />
      )}

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-2xl dark:bg-slate-100 dark:text-slate-900 sm:text-sm">
          {toastMessage}
        </div>
      )}

      <div className="relative min-h-screen overflow-x-clip px-3 sm:px-4 md:px-8 dark:bg-gray-950">
        <div className="relative mx-auto w-full max-w-7xl p-0 dark:bg-transparent sm:dark:rounded-[2rem] sm:dark:border sm:dark:border-white/10 sm:dark:bg-slate-900/55 sm:dark:p-4 md:dark:p-6">
          <main className="rounded-xl border border-slate-200/80 bg-white p-3.5 sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.5)]">
            {/* Header Section */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/80 bg-gradient-to-r from-cyan-50 to-violet-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-100">
                <FiShield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                Free Online Tool • 100% Browser Private
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Image to Base64
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Encode images to Base64 data strings for direct embeds in HTML and CSS, or decode Base64 data streams back to downloadable images instantly. 100% private.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="mt-6 grid grid-cols-2 border-b border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("encoder")}
                className={`py-3.5 px-2 text-xs sm:text-sm font-black transition relative text-center ${
                  activeTab === "encoder"
                    ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 dark:border-cyan-400"
                    : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Image to Base64 (Encode)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("decoder")}
                className={`py-3.5 px-2 text-xs sm:text-sm font-black transition relative text-center ${
                  activeTab === "decoder"
                    ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 dark:border-cyan-400"
                    : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Base64 to Image (Decode)
              </button>
            </div>

            {/* Encoder Tab */}
            {activeTab === "encoder" && (
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                {/* File Dropzone Area */}
                <div className="space-y-4 lg:col-span-5">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center cursor-pointer transition hover:border-cyan-400 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-cyan-400/50 dark:hover:bg-slate-950/60"
                  >
                    <FiUploadCloud className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                    <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      Drag & Drop Image Here
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Supports PNG, JPG, WebP, SVG, GIF (Max 5MB)
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      Browse File
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      Use Sample Image
                    </button>
                  </div>

                  {/* Thumbnail & File Details */}
                  {encoderFile && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-900/40">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={encoderFile.dataUri}
                          alt="Thumbnail preview"
                          className="h-14 w-14 rounded-lg object-contain border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                            {encoderFile.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {formatSize(encoderFile.size)} • {encoderFile.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Encoded Outputs */}
                <div className="lg:col-span-7">
                  {encoderFile ? (
                    <div className="space-y-4">
                      {/* Raw Base64 */}
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                            Raw Base64 string
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(encoderFile.base64, "raw")}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                          >
                            {copiedCode === "raw" ? (
                              <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <FiCopy className="h-3.5 w-3.5" />
                            )}
                            {copiedCode === "raw" ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="max-h-[100px] overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 break-all select-all">
                          {encoderFile.base64}
                        </div>
                      </div>

                      {/* HTML Tag Embed */}
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                            HTML Image Element
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                `<img src="${encoderFile.dataUri}" alt="${encoderFile.name}" />`,
                                "html"
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                          >
                            {copiedCode === "html" ? (
                              <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <FiCopy className="h-3.5 w-3.5" />
                            )}
                            {copiedCode === "html" ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="max-h-[100px] overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 break-all select-all">
                          {`<img src="${encoderFile.dataUri}" alt="${encoderFile.name}" />`}
                        </div>
                      </div>

                      {/* CSS Property */}
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                            CSS Background Property
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                `background-image: url("${encoderFile.dataUri}");`,
                                "css"
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                          >
                            {copiedCode === "css" ? (
                              <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <FiCopy className="h-3.5 w-3.5" />
                            )}
                            {copiedCode === "css" ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="max-h-[100px] overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 break-all select-all">
                          {`background-image: url("${encoderFile.dataUri}");`}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center dark:border-white/10 dark:bg-slate-900/40">
                      <FiCode className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                      <p className="mt-2 text-xs text-slate-400">
                        Upload an image on the left to see Base64 outputs.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Decoder Tab */}
            {activeTab === "decoder" && (
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                {/* Input Text Box */}
                <div className="space-y-3 lg:col-span-6">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Paste Base64 String
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setDecoderInput("");
                        showToast("Input cleared!");
                      }}
                      className="text-xs font-bold text-rose-500 hover:text-rose-600"
                    >
                      Clear
                    </button>
                  </div>
                  <textarea
                    value={decoderInput}
                    onChange={(e) => setDecoderInput(e.target.value)}
                    placeholder="Paste raw Base64 data string or complete data URI (data:image/...) here..."
                    className="h-72 w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-mono text-slate-800 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950/60"
                  />
                </div>

                {/* Preview Image */}
                <div className="lg:col-span-6">
                  {decodedInfo ? (
                    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4.5 dark:border-white/10 dark:bg-slate-900/40">
                      <div className="border-b border-slate-100 pb-2.5 dark:border-white/5">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Decoded Preview
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center border border-slate-200/60 bg-slate-50 p-4 rounded-xl max-h-[220px] overflow-hidden dark:border-white/10 dark:bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={decodedInfo.dataUri}
                          alt="Decoded preview"
                          className="max-h-[180px] object-contain rounded-lg shadow-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                        <div className="text-xs">
                          <p className="font-bold text-slate-800 dark:text-slate-200">
                            Estimated Size: {formatSize(decodedInfo.size)}
                          </p>
                          <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Format: {decodedInfo.mimeType}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownloadDecoded}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 py-2.5 px-4 text-xs font-bold text-white shadow transition hover:bg-cyan-600"
                        >
                          <FiDownload className="h-4 w-4" />
                          Download Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-center dark:border-white/10 dark:bg-slate-900/40">
                      <FiImage className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                      <p className="mt-2 text-xs text-slate-400">
                        Paste a valid Base64 string to see the image preview.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ Accordion Section */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Learn more about image base64 formats, HTML wrappers, and download formats.
              </p>

              <div className="mt-6 space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100"
                      >
                        <span className="text-xs sm:text-sm">
                          {faq.question}
                        </span>
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-cyan-500" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-slate-100 p-4 text-xs leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-300 sm:text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <RelatedTools currentPath="/tools/image-to-base64" />
          </main>
        </div>
      </div>
    </>
  );
}
