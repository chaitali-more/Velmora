"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowRight,
  FiDownload,
  FiFile,
  FiImage,
  FiRefreshCw,
  FiShield,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

type TargetFormat = "jpg" | "png" | "webp";
type DetectedFormat = "JPG" | "PNG" | "WebP" | "Unknown";

type SelectedImage = {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  detectedFormat: DetectedFormat;
};

type ConvertedImage = {
  id: string;
  originalName: string;
  outputName: string;
  originalSize: number;
  convertedSize: number;
  previewUrl: string;
  blob: Blob;
  from: DetectedFormat;
  to: TargetFormat;
};

type Toast = {
  id: number;
  message: string;
};

type JSZipFile = {
  file: (name: string, data: Blob) => void;
  generateAsync: (options: { type: "blob" }) => Promise<Blob>;
};

declare global {
  interface Window {
    JSZip?: new () => JSZipFile;
  }
}

const supportedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGES = 20;

const suggestions: Record<Exclude<DetectedFormat, "Unknown">, TargetFormat> = {
  JPG: "webp",
  PNG: "webp",
  WebP: "png",
};

const suggestionText: Record<Exclude<DetectedFormat, "Unknown">, string> = {
  JPG: "We recommend WebP for your JPG files - smaller size with strong visual quality.",
  PNG: "We recommend WebP for your PNG files - 30% smaller with same quality.",
  WebP: "We recommend PNG for your WebP files - the most compatible image format.",
};

const badgeClasses: Record<DetectedFormat, string> = {
  JPG: "bg-amber-400/15 text-amber-700 ring-1 ring-amber-400/30 dark:text-amber-200",
  PNG: "bg-sky-400/15 text-sky-700 ring-1 ring-sky-400/30 dark:text-sky-200",
  WebP: "bg-emerald-400/15 text-emerald-700 ring-1 ring-emerald-400/30 dark:text-emerald-200",
  Unknown: "bg-slate-400/15 text-slate-700 ring-1 ring-slate-400/30 dark:text-slate-200",
};

const formatMime: Record<TargetFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const formatExtension: Record<TargetFormat, string> = {
  jpg: "jpg",
  png: "png",
  webp: "webp",
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** exponent).toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function outputFilename(name: string, format: TargetFormat) {
  return `${name.replace(/\.[^/.]+$/, "")}.${formatExtension[format]}`;
}

async function readHeader(file: File) {
  const buffer = await file.slice(0, 16).arrayBuffer();
  return new Uint8Array(buffer);
}

function detectFromMime(mime: string): DetectedFormat {
  if (mime === "image/jpeg") return "JPG";
  if (mime === "image/png") return "PNG";
  if (mime === "image/webp") return "WebP";
  return "Unknown";
}

async function detectFormat(file: File): Promise<DetectedFormat> {
  const bytes = await readHeader(file);

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "JPG";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "PNG";
  if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "WebP";
  return detectFromMime(file.type);
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not load ${file.name}`));
    };
    image.src = url;
  });
}

async function convertImage(image: SelectedImage, target: TargetFormat, quality: number): Promise<ConvertedImage> {
  const loadedImage = await loadImage(image.file);
  const canvas = document.createElement("canvas");
  canvas.width = loadedImage.naturalWidth || loadedImage.width;
  canvas.height = loadedImage.naturalHeight || loadedImage.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not supported in this browser.");
  }

  if (target === "jpg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(loadedImage, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error(`Could not convert ${image.name}`));
      },
      formatMime[target],
      target === "png" ? undefined : quality / 100,
    );
  });

  return {
    id: `${image.id}-${target}-${Date.now()}`,
    originalName: image.name,
    outputName: outputFilename(image.name, target),
    originalSize: image.size,
    convertedSize: blob.size,
    previewUrl: URL.createObjectURL(blob),
    blob,
    from: image.detectedFormat,
    to: target,
  };
}

async function ensureJSZip() {
  if (window.JSZip) return window.JSZip;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-jszip]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load ZIP library.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    script.async = true;
    script.dataset.jszip = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load ZIP library."));
    document.body.appendChild(script);
  });

  if (!window.JSZip) throw new Error("ZIP library is unavailable.");
  return window.JSZip;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ImageConverterClientPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [converted, setConverted] = useState<ConvertedImage[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("webp");
  const [quality, setQuality] = useState(82);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [tipDismissed, setTipDismissed] = useState(false);
  const imagesRef = useRef<SelectedImage[]>([]);
  const convertedRef = useRef<ConvertedImage[]>([]);

  const detectedFormats = useMemo(() => {
    return Array.from(new Set(images.map((image) => image.detectedFormat))).filter(
      (format): format is Exclude<DetectedFormat, "Unknown"> => format !== "Unknown",
    );
  }, [images]);

  const activeSuggestionFormat = detectedFormats[0];
  const activeTip = activeSuggestionFormat ? suggestionText[activeSuggestionFormat] : "";
  const showQuality = targetFormat !== "png";

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    convertedRef.current = converted;
  }, [converted]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      convertedRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function addFiles(files: FileList | File[]) {
    const incoming = Array.from(files);
    const validFiles = incoming.filter((file) => supportedMimeTypes.has(file.type));
    const invalidCount = incoming.length - validFiles.length;
    const remainingSlots = Math.max(0, MAX_IMAGES - images.length);
    const filesToAdd = validFiles.slice(0, remainingSlots);
    const overLimitCount = validFiles.length - filesToAdd.length;

    if (invalidCount > 0) {
      setToast({ id: Date.now(), message: "Some files were skipped because they are not supported images." });
    }

    if (overLimitCount > 0 || (remainingSlots === 0 && validFiles.length > 0)) {
      setToast({
        id: Date.now(),
        message: `You can convert up to ${MAX_IMAGES} images at once. Reset to start another batch.`,
      });
    }

    if (filesToAdd.length === 0) return;

    const prepared = await Promise.all(
      filesToAdd.map(async (file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
        detectedFormat: await detectFormat(file),
      })),
    );

    if (prepared.length === 0) return;

    setImages((current) => [...current, ...prepared]);
    setConverted((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      return [];
    });
    setTipDismissed(false);

    const firstKnown = prepared.find((image) => image.detectedFormat !== "Unknown")?.detectedFormat;
    if (firstKnown && firstKnown !== "Unknown") {
      setTargetFormat(suggestions[firstKnown]);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      void addFiles(event.target.files);
      event.target.value = "";
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void addFiles(event.dataTransfer.files);
  }

  function removeImage(id: string) {
    setImages((current) => {
      const match = current.find((image) => image.id === id);
      if (match) URL.revokeObjectURL(match.previewUrl);
      return current.filter((image) => image.id !== id);
    });
  }

  async function handleConvert() {
    if (images.length === 0) {
      setToast({ id: Date.now(), message: "Upload at least one image before converting." });
      return;
    }

    setIsProcessing(true);
    setConverted((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      return [];
    });

    try {
      const results: ConvertedImage[] = [];
      for (const image of images) {
        results.push(await convertImage(image, targetFormat, quality));
      }
      setConverted(results);
    } catch (error) {
      setToast({
        id: Date.now(),
        message: error instanceof Error ? error.message : "Conversion failed. Try another image.",
      });
    } finally {
      setIsProcessing(false);
    }
  }

  function reset() {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    converted.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setImages([]);
    setConverted([]);
    setTargetFormat("webp");
    setQuality(82);
    setTipDismissed(false);
  }

  async function downloadAll() {
    try {
      const JSZip = await ensureJSZip();
      const zip = new JSZip();
      converted.forEach((image) => zip.file(image.outputName, image.blob));
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, "velmora-converted-images.zip");
    } catch (error) {
      setToast({
        id: Date.now(),
        message: error instanceof Error ? error.message : "Unable to create ZIP download.",
      });
    }
  }

  return (
    <div className="image-converter-shell relative min-h-screen overflow-x-clip rounded-[2rem] bg-[var(--tool-bg)] px-3 py-5 font-['DM_Sans',Arial,sans-serif] text-[var(--tool-text)] transition-colors sm:px-4 md:px-8">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap");

        .image-converter-shell {
          --tool-bg: #f4f4fa;
          --tool-card: #ffffff;
          --tool-border: #e5e5ef;
          --tool-text: #111827;
          --tool-muted: #64748b;
          --tool-soft: #f8fafc;
        }

        .dark .image-converter-shell {
          --tool-bg: #0d0d1a;
          --tool-card: #13131f;
          --tool-border: rgba(255, 255, 255, 0.08);
          --tool-text: #f8fafc;
          --tool-muted: #94a3b8;
          --tool-soft: #0d1220;
        }

        .converter-range {
          accent-color: #8b5cf6;
        }

        @keyframes resultIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .result-row {
          animation: resultIn 0.35s ease both;
        }
      `}</style>

      {toast ? (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border border-rose-400/30 bg-rose-500 px-4 py-3 text-sm font-bold text-white shadow-[0_18px_38px_rgba(244,63,94,0.25)]">
          {toast.message}
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-7xl pt-2">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-[20px] border border-[var(--tool-border)] bg-[var(--tool-card)] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.14)] transition-colors sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tool-muted)]">Free Tool</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--tool-text)]">Image Converter</h1>
            <p className="mt-2 text-sm text-[var(--tool-muted)]">
              Convert up to {MAX_IMAGES} images at a time to JPG, PNG, or WebP in your browser.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleInputChange}
            />

            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-6 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed px-5 py-8 text-center transition ${
                isDragging
                  ? "border-fuchsia-400 bg-fuchsia-400/10 shadow-[0_0_0_4px_rgba(200,80,192,0.18)]"
                  : "border-slate-300/80 bg-[var(--tool-soft)] hover:border-fuchsia-400 hover:shadow-[0_0_0_4px_rgba(200,80,192,0.12)] dark:border-white/15"
              }`}
            >
              <FiUploadCloud className="h-12 w-12 text-cyan-400" />
              <p className="mt-4 text-base font-black text-[var(--tool-text)]">Drag & drop images here or click to browse</p>
              <p className="mt-2 text-sm font-medium text-[var(--tool-muted)]">Supports JPG, PNG, WebP</p>
            </div>

            {images.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-3"
                  >
                    <img src={image.previewUrl} alt="" className="h-[72px] w-[72px] rounded-xl object-cover" />
                    <div className="min-w-0 pr-7">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${badgeClasses[image.detectedFormat]}`}>
                        {image.detectedFormat}
                      </span>
                      <p className="mt-2 truncate text-sm font-black text-[var(--tool-text)]">{image.name}</p>
                      <p className="text-xs font-medium text-[var(--tool-muted)]">{formatBytes(image.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--tool-border)] bg-[var(--tool-card)] text-[var(--tool-muted)] transition hover:text-rose-400"
                      aria-label={`Remove ${image.name}`}
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tool-muted)]">Convert To</p>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-1.5">
                {(["jpg", "png", "webp"] as const).map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => setTargetFormat(format)}
                    className={`rounded-xl px-3 py-3 text-sm font-black transition ${
                      targetFormat === format
                        ? "bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] text-white shadow-[0_14px_28px_rgba(127,119,221,0.35)]"
                        : "bg-[var(--tool-card)] text-[var(--tool-muted)] hover:text-[var(--tool-text)]"
                    }`}
                  >
                    {format === "jpg" ? "JPG" : format === "png" ? "PNG" : "WebP"}
                  </button>
                ))}
              </div>

              {activeTip && !tipDismissed ? (
                <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-soft)] px-3 py-2 text-xs italic text-[var(--tool-muted)]">
                  <span className="text-cyan-400">✦</span>
                  <p className="flex-1">{activeTip}</p>
                  <button type="button" onClick={() => setTipDismissed(true)} aria-label="Dismiss recommendation">
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {showQuality ? (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tool-muted)]">Quality</p>
                  <p className="text-sm font-black text-[var(--tool-text)]">{quality}%</p>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  className="converter-range mt-3 w-full"
                />
              </div>
            ) : null}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleConvert}
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] py-4 text-base font-black text-white shadow-[0_14px_28px_rgba(127,119,221,0.4)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isProcessing ? <FiRefreshCw className="h-5 w-5 animate-spin" /> : <FiImage className="h-5 w-5" />}
                {isProcessing ? "Converting..." : "Convert All"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-soft)] py-4 text-base font-black text-[var(--tool-muted)] shadow-[0_12px_22px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:text-[var(--tool-text)]"
              >
                Reset
              </button>
            </div>
          </section>

          <section className="rounded-[20px] border border-[var(--tool-border)] bg-[var(--tool-card)] p-5 shadow-[0_20px_52px_rgba(15,23,42,0.16)] transition-colors sm:p-6">
            <div className="mb-5 inline-flex rounded-full bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] px-4 py-2 text-sm font-black text-white shadow-[0_14px_28px_rgba(127,119,221,0.35)]">
              Result Panel
            </div>

            {converted.length === 0 ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[20px] border border-dashed border-cyan-300/60 bg-[radial-gradient(circle_at_8%_94%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.8)_100%)] px-5 py-16 text-center dark:border-cyan-400/25 dark:bg-[radial-gradient(circle_at_8%_94%,rgba(109,40,217,0.34),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(8,145,178,0.36),transparent_34%),linear-gradient(135deg,#0b1020_0%,#101827_100%)]">
                <FiFile className="h-12 w-12 text-cyan-400" />
                <h2 className="mt-7 text-3xl font-black text-[var(--tool-text)] sm:text-4xl">Ready to convert</h2>
                <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[var(--tool-muted)] sm:text-lg">
                  Upload images and click Convert. Your files will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {converted.map((image, index) => {
                  const saved = Math.max(0, Math.round((1 - image.convertedSize / image.originalSize) * 100));
                  return (
                    <div
                      key={image.id}
                      className="result-row grid gap-3 rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-3 sm:grid-cols-[60px_1fr_auto]"
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      <img src={image.previewUrl} alt="" className="h-[60px] w-[60px] rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[var(--tool-text)]">{image.outputName}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--tool-muted)]">
                          <span>{image.from}</span>
                          <FiArrowRight className="h-3.5 w-3.5" />
                          <span>{image.to === "jpg" ? "JPG" : image.to === "png" ? "PNG" : "WebP"}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--tool-muted)]">
                          <span>
                            {formatBytes(image.originalSize)} <FiArrowRight className="mx-1 inline h-3.5 w-3.5" />{" "}
                            {formatBytes(image.convertedSize)}
                          </span>
                          <span className="rounded-full bg-emerald-400/15 px-2 py-1 font-black text-emerald-600 ring-1 ring-emerald-400/30 dark:text-emerald-200">
                            saved {saved}%
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadBlob(image.blob, image.outputName)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/50 px-4 py-2 text-sm font-black text-cyan-600 transition hover:-translate-y-0.5 hover:bg-cyan-400/10 dark:text-cyan-200"
                      >
                        <FiDownload className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  );
                })}

                {converted.length > 1 ? (
                  <button
                    type="button"
                    onClick={downloadAll}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] py-4 text-base font-black text-white shadow-[0_14px_28px_rgba(127,119,221,0.4)] transition hover:-translate-y-0.5"
                  >
                    <FiDownload className="h-5 w-5" />
                    Download All as ZIP
                  </button>
                ) : null}
              </div>
            )}
          </section>
        </div>

        <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-sm font-medium text-[var(--tool-muted)]">
          <FiShield className="h-4 w-4 text-emerald-400" />
          Your images never leave your device. All conversion happens locally in your browser.
        </p>
      </div>
    </div>
  );
}
