"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiDownload,
  FiFile,
  FiImage,
  FiRefreshCw,
  FiShield,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

type ImageFormat = "JPG" | "PNG" | "WebP";
type ToastType = "success" | "error" | "warning";

type SelectedImage = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  format: ImageFormat;
  width: number;
  height: number;
  previewUrl: string;
  resolutionWarning?: string;
};

type CompressedImage = {
  id: string;
  outputName: string;
  originalSize: number;
  compressedSize: number;
  previewUrl: string;
  blob: Blob;
  format: ImageFormat;
  width: number;
  height: number;
  compressedWidth: number;
  compressedHeight: number;
  timeMs: number;
  alreadyOptimized: boolean;
};

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type JSZipFile = {
  file: (name: string, data: Blob) => void;
  generateAsync: (options: { type: "blob" }) => Promise<Blob>;
};

declare global {
  interface Window {
    JSZip?: new () => JSZipFile;
    pako?: any;
    UPNG?: any;
  }
}

const MAX_IMAGES = 20;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_TOTAL_SIZE = 100 * 1024 * 1024;
const MAX_ZIP_SIZE = 200 * 1024 * 1024;
const MIN_DIMENSION = 10;
const MAX_DIMENSION = 10000;
const SMALL_FILE_SIZE = 24 * 1024;

const supportedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const formatFromMime: Record<string, ImageFormat> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** exponent).toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function formatMb(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function getLevelBand(level: number) {
  if (level <= 3) return "Low";
  if (level <= 6) return "Medium";
  return "High";
}

function getQualityForLevel(level: number) {
  if (level <= 3) return 0.95 - (level - 1) * 0.025;
  if (level <= 6) return 0.85 - (level - 4) * 0.05;
  return 0.75 - (level - 7) * 0.05;
}

function getFormatFromMime(mime: string): ImageFormat {
  return formatFromMime[mime] ?? "PNG";
}

function getExtensionForMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

function getOutputName(name: string, mime: string) {
  return `${name.replace(/\.[^/.]+$/, "")}.${getExtensionForMime(mime)}`;
}

function getCandidateQualities(level: number) {
  const preferredQuality = getQualityForLevel(level);
  const floorQuality = Math.max(0.62, preferredQuality - 0.12);
  const qualities = [0.92, 0.86, 0.8, 0.74, 0.68, 0.62].filter((quality) => quality >= floorQuality);

  return Array.from(new Set([preferredQuality, ...qualities])).sort((a, b) => b - a);
}

function getCounterClass(count: number) {
  if (count >= MAX_IMAGES) return "text-rose-600 dark:text-rose-300";
  if (count >= Math.floor(MAX_IMAGES * 0.8)) return "text-amber-600 dark:text-amber-300";
  if (count >= 1) return "text-emerald-600 dark:text-emerald-300";
  return "text-[var(--tool-muted)]";
}

function getTotalBarClass(percent: number) {
  if (percent >= 100) return "bg-rose-500";
  if (percent >= 80) return "bg-amber-400";
  return "bg-emerald-400";
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
      reject(new Error("Image appears corrupted or cannot be opened."));
    };
    image.src = url;
  });
}

async function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Compression failed. Please try again."));
      },
      mime,
      quality,
    );
  });
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

async function ensureUPNG() {
  if (window.UPNG) return window.UPNG;

  if (!window.pako) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-pako]");
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Unable to load compression helper library (pako).")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js";
      script.async = true;
      script.dataset.pako = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Unable to load compression helper library (pako)."));
      document.body.appendChild(script);
    });
  }

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-upng]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load PNG optimizer library (UPNG).")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/upng-js/2.1.0/UPNG.min.js";
    script.async = true;
    script.dataset.upng = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load PNG optimizer library (UPNG)."));
    document.body.appendChild(script);
  });

  if (!window.UPNG) throw new Error("PNG optimizer library (UPNG) is unavailable.");
  return window.UPNG;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function compressImage(image: SelectedImage, level: number): Promise<CompressedImage> {
  const started = performance.now();

  if (image.size < SMALL_FILE_SIZE) {
    return {
      id: `${image.id}-optimized`,
      outputName: image.name,
      originalSize: image.size,
      compressedSize: image.size,
      previewUrl: URL.createObjectURL(image.file),
      blob: image.file,
      format: image.format,
      width: image.width,
      height: image.height,
      compressedWidth: image.width,
      compressedHeight: image.height,
      timeMs: performance.now() - started,
      alreadyOptimized: true,
    };
  }

  const loadedImage = await loadImage(image.file);
  const width = image.width;
  const height = image.height;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not supported in this browser.");
  }

  if (image.format === "JPG") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(loadedImage, 0, 0, width, height);

  let finalBlob: Blob = image.file;
  let finalMime: string = image.type;

  if (image.format === "PNG") {
    try {
      const UPNG = await ensureUPNG();
      const imgData = context.getImageData(0, 0, width, height);
      const buffer = imgData.data.buffer;

      // Map level 1-10 to cnum (0 for lossless, or 256 down to 16 for lossy)
      let cnum = 0;
      if (level === 1) {
        cnum = 0; // Lossless
      } else {
        const cnumMap: Record<number, number> = {
          2: 256,
          3: 192,
          4: 128,
          5: 96,
          6: 64,
          7: 48,
          8: 32,
          9: 24,
          10: 16
        };
        cnum = cnumMap[level] || 96;
      }

      const compressedBuffer = UPNG.encode([buffer], width, height, cnum);
      const compressedBlob = new Blob([new Uint8Array(compressedBuffer)], { type: "image/png" });

      if (compressedBlob.size < image.size) {
        finalBlob = compressedBlob;
      }
    } catch (e) {
      console.error("UPNG compression failed, falling back to canvas toBlob:", e);
      const canvasBlob = await canvasToBlob(canvas, "image/png");
      if (canvasBlob.size < image.size) {
        finalBlob = canvasBlob;
      }
    }
  } else if (image.format === "JPG") {
    const quality = getQualityForLevel(level);
    const compressedBlob = await canvasToBlob(canvas, "image/jpeg", quality);
    if (compressedBlob.size < image.size) {
      finalBlob = compressedBlob;
      finalMime = "image/jpeg";
    }
  } else if (image.format === "WebP") {
    const quality = getQualityForLevel(level);
    const compressedBlob = await canvasToBlob(canvas, "image/webp", quality);
    if (compressedBlob.size < image.size) {
      finalBlob = compressedBlob;
      finalMime = "image/webp";
    }
  }

  const finalFormat = getFormatFromMime(finalMime);

  return {
    id: `${image.id}-${Date.now()}`,
    outputName: finalBlob === image.file ? image.name : getOutputName(image.name, finalMime),
    originalSize: image.size,
    compressedSize: finalBlob.size,
    previewUrl: URL.createObjectURL(finalBlob),
    blob: finalBlob,
    format: finalFormat,
    width: image.width,
    height: image.height,
    compressedWidth: width,
    compressedHeight: height,
    timeMs: performance.now() - started,
    alreadyOptimized: finalBlob === image.file,
  };
}

export default function ImageCompressorClientPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<SelectedImage[]>([]);
  const resultsRef = useRef<CompressedImage[]>([]);
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [results, setResults] = useState<CompressedImage[]>([]);
  const [level, setLevel] = useState(5);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [estimatedRemaining, setEstimatedRemaining] = useState("");

  const totalSize = useMemo(() => images.reduce((sum, image) => sum + image.size, 0), [images]);
  const totalPercent = Math.min(100, (totalSize / MAX_TOTAL_SIZE) * 100);
  const totalSaved = useMemo(
    () => results.reduce((sum, result) => sum + Math.max(0, result.originalSize - result.compressedSize), 0),
    [results],
  );
  const totalOriginal = useMemo(() => results.reduce((sum, result) => sum + result.originalSize, 0), [results]);
  const savedPercent = totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0;

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      resultsRef.current.forEach((result) => URL.revokeObjectURL(result.previewUrl));
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), toast.type === "success" ? 1800 : 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(message: string, type: ToastType = "error") {
    setToast({ id: Date.now(), message, type });
  }

  async function prepareFile(file: File): Promise<SelectedImage | null> {
    if (!supportedMimeTypes.has(file.type)) {
      showToast("Unsupported file format. Only JPG, PNG, WebP allowed.");
      return null;
    }

    if (file.size > MAX_FILE_SIZE) {
      showToast("File size exceeds 50MB limit. Please select a smaller image.");
      return null;
    }

    const image = await loadImage(file);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;

    if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
      showToast("Image too small to process.");
      return null;
    }

    const resolutionWarning =
      width > MAX_DIMENSION || height > MAX_DIMENSION ? "Image resolution too high, may cause lag." : undefined;

    if (resolutionWarning) {
      showToast(resolutionWarning, "warning");
    }

    return {
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      format: formatFromMime[file.type],
      width,
      height,
      previewUrl: URL.createObjectURL(file),
      resolutionWarning,
    };
  }

  async function addFiles(files: FileList | File[]) {
    if (images.length >= MAX_IMAGES) {
      showToast("Maximum 20 images per batch. Please remove an image first.");
      return;
    }

    const incoming = Array.from(files);
    const prepared: SelectedImage[] = [];
    let nextTotal = totalSize;

    for (const file of incoming) {
      if (images.length + prepared.length >= MAX_IMAGES) {
        showToast("Maximum 20 images per batch. Please remove an image first.");
        break;
      }

      const item = await prepareFile(file);
      if (!item) continue;

      nextTotal += item.size;
      prepared.push(item);
    }

    if (prepared.length === 0) return;

    setImages((current) => [...current, ...prepared]);
    setResults((current) => {
      current.forEach((result) => URL.revokeObjectURL(result.previewUrl));
      return [];
    });

    if (nextTotal > MAX_TOTAL_SIZE) {
      showToast("Total upload size exceeds 100MB. Please remove some images.", "warning");
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

  async function handleCompress() {
    if (images.length === 0) {
      showToast("Select images to compress.");
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      showToast("Total upload size exceeds 100MB. Please remove some images.");
      return;
    }

    setIsCompressing(true);
    setProcessedCount(0);
    setProgressMessage(`Compressing 0/${images.length} images...`);
    setEstimatedRemaining("");
    setResults((current) => {
      current.forEach((result) => URL.revokeObjectURL(result.previewUrl));
      return [];
    });

    try {
      const completed: CompressedImage[] = [];
      const startedAll = performance.now();

      for (let index = 0; index < images.length; index += 1) {
        const slowTimer = window.setTimeout(() => {
          showToast("Large image taking longer...", "warning");
        }, 5000);

        const result = await compressImage(images[index], level);
        window.clearTimeout(slowTimer);
        completed.push(result);
        setResults([...completed]);
        setProcessedCount(index + 1);
        setProgressMessage(`Compressing ${index + 1}/${images.length} images...`);

        const averageMs = (performance.now() - startedAll) / (index + 1);
        const remainingMs = averageMs * (images.length - index - 1);
        setEstimatedRemaining(remainingMs > 0 ? `About ${Math.ceil(remainingMs / 1000)}s remaining` : "");
        showToast(result.alreadyOptimized ? "File already optimized" : "Image compressed successfully", "success");
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Compression failed. Please try again.");
    } finally {
      setIsCompressing(false);
      setProgressMessage("");
      setEstimatedRemaining("");
    }
  }

  function reset() {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    results.forEach((result) => URL.revokeObjectURL(result.previewUrl));
    setImages([]);
    setResults([]);
    setLevel(5);
    setProcessedCount(0);
    setProgressMessage("");
    setEstimatedRemaining("");
  }

  async function downloadAll() {
    if (results.length === 0) {
      showToast("Compress images before downloading ZIP.");
      return;
    }

    const zipSize = results.reduce((sum, result) => sum + result.compressedSize, 0);
    if (zipSize > MAX_ZIP_SIZE) {
      showToast("ZIP file size exceeds 200MB. Download images individually.", "warning");
      return;
    }

    try {
      const JSZip = await ensureJSZip();
      const zip = new JSZip();
      results.forEach((result) => zip.file(result.outputName, result.blob));
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, "velmora-compressed-images.zip");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to create ZIP download.");
    }
  }

  const canAddMore = images.length < MAX_IMAGES && !isCompressing;
  const levelBand = getLevelBand(level);

  return (
    <div className="image-compressor-shell relative min-h-screen overflow-x-clip bg-transparent px-0 py-0 font-['DM_Sans',Arial,sans-serif] text-[var(--tool-text)] transition-colors sm:rounded-[2rem] sm:bg-[var(--tool-bg)] sm:px-4 sm:py-5 md:px-8">
      {toast ? (
        <div
          className={`fixed right-4 top-24 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm font-bold text-white shadow-[0_18px_38px_rgba(15,23,42,0.22)] ${
            toast.type === "success"
              ? "border-emerald-400/30 bg-emerald-500"
              : toast.type === "warning"
                ? "border-amber-400/30 bg-amber-500"
                : "border-rose-400/30 bg-rose-500"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-7xl pt-0 sm:pt-2">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.08fr] lg:gap-5">
          <section className="rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-card)] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-colors sm:rounded-[20px] sm:p-6 sm:shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tool-muted)]">Free Tool</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-[var(--tool-text)] sm:text-3xl">Image Compressor</h1>
            <p className="mt-2 text-sm text-[var(--tool-muted)]">
              Reduce image file sizes locally with browser-based compression while keeping original dimensions.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={!canAddMore}
              className="hidden"
              onChange={handleInputChange}
              title={!canAddMore ? "Maximum 20 images per batch. Please remove an image first." : undefined}
            />

            <div
              role="button"
              tabIndex={0}
              aria-disabled={!canAddMore}
              title={!canAddMore ? "Maximum 20 images per batch. Please remove an image first." : undefined}
              onClick={() => {
                if (canAddMore) inputRef.current?.click();
                else showToast("Maximum 20 images per batch. Please remove an image first.");
              }}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && canAddMore) inputRef.current?.click();
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition sm:mt-6 sm:min-h-56 sm:rounded-[20px] sm:px-5 sm:py-8 ${
                isDragging
                  ? "border-fuchsia-400 bg-fuchsia-400/10 shadow-[0_0_0_4px_rgba(200,80,192,0.18)]"
                  : "border-[rgba(127,119,221,0.5)] bg-[var(--tool-soft)] hover:border-fuchsia-400 hover:bg-fuchsia-400/5 hover:shadow-[0_0_0_4px_rgba(200,80,192,0.12)]"
              } ${!canAddMore ? "cursor-not-allowed opacity-70" : ""}`}
            >
              <FiUploadCloud className="h-12 w-12 text-cyan-400" />
              <p className="mt-4 text-base font-black text-[var(--tool-text)]">Drag & drop images here or click to browse</p>
              <p className="mt-2 text-sm font-medium text-[var(--tool-muted)]">Supports JPG, PNG, WebP</p>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-black">
                <span className={getCounterClass(images.length)}>{images.length}/20 images selected</span>
                <span className="text-[var(--tool-muted)]">Total size: {formatMb(totalSize)} MB / 100 MB</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${getTotalBarClass(totalPercent)}`}
                  style={{ width: `${totalPercent}%` }}
                />
              </div>
              <p className="mt-3 rounded-xl bg-white/70 px-3 py-2 text-xs font-bold text-[var(--tool-muted)] dark:bg-slate-950/60">
                Compress up to 20 images simultaneously with powerful AI-quality optimization.
              </p>
              <p className="mt-2 rounded-xl bg-white/70 px-3 py-2 text-xs font-bold text-[var(--tool-muted)] dark:bg-slate-950/60">
                Upload up to 20 images at once. 50MB per file, 100MB total per batch.
              </p>
            </div>

            {images.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {images.map((image) => (
                  <div key={image.id} className="relative rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-3">
                    <img
                      src={image.previewUrl}
                      alt={`Uploaded ${image.name} preview before image compression`}
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                    <p className="mt-2 truncate text-xs font-black text-[var(--tool-text)]">{image.name}</p>
                    <p className="mt-1 text-[11px] font-medium text-[var(--tool-muted)]">{formatBytes(image.size)}</p>
                    {image.resolutionWarning ? (
                      <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        <FiAlertTriangle className="h-3 w-3" />
                        High resolution
                      </p>
                    ) : null}
                    <button
                      type="button"
                      disabled={isCompressing}
                      onClick={() => removeImage(image.id)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--tool-border)] bg-[var(--tool-card)] text-[var(--tool-muted)] transition hover:text-rose-400 disabled:opacity-50"
                      aria-label={`Remove ${image.name}`}
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tool-muted)]">Compression Level</p>
                <p className="text-sm font-black text-[var(--tool-text)]">Level {level}: {levelBand}</p>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={level}
                disabled={isCompressing}
                onChange={(event) => setLevel(Number(event.target.value))}
                className="compressor-range mt-3 w-full"
              />
              <p className="mt-2 text-xs font-bold text-[var(--tool-muted)]">
                Auto-picks the smallest same-dimension result that avoids excessive visible quality loss.
              </p>
              <div className="mt-2 grid grid-cols-3 text-xs font-bold text-[var(--tool-muted)]">
                <span>Low (1-3)</span>
                <span className="text-center">Medium (4-6)</span>
                <span className="text-right">High (7-10)</span>
              </div>
            </div>

            {isCompressing ? (
              <div className="mt-5 rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-4">
                <div className="flex flex-wrap justify-between gap-2 text-sm font-bold text-[var(--tool-muted)]">
                  <span>{progressMessage}</span>
                  <span>{estimatedRemaining}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] transition-all"
                    style={{ width: `${images.length ? (processedCount / images.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCompress}
                disabled={isCompressing || images.length === 0}
                title={images.length === 0 ? "Select images to compress" : undefined}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] py-4 text-base font-black text-white shadow-[0_14px_28px_rgba(127,119,221,0.4)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompressing ? <FiRefreshCw className="h-5 w-5 animate-spin" /> : <FiImage className="h-5 w-5" />}
                {isCompressing ? "Compressing..." : "Compress All"}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={isCompressing}
                className="min-h-12 rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] py-4 text-base font-black text-[var(--tool-muted)] shadow-[0_12px_22px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:text-[var(--tool-text)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reset
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--tool-border)] bg-[var(--tool-card)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-colors sm:rounded-[20px] sm:p-6 sm:shadow-[0_20px_52px_rgba(15,23,42,0.16)]">
            <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] px-3 py-2 text-xs font-black text-white shadow-[0_10px_22px_rgba(127,119,221,0.32)] sm:mb-5 sm:px-4 sm:text-sm sm:shadow-[0_14px_28px_rgba(127,119,221,0.35)]">
              Result Panel
            </div>

            {results.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/60 bg-[radial-gradient(circle_at_8%_94%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.8)_100%)] px-4 py-8 text-center sm:min-h-[520px] sm:rounded-[20px] sm:px-5 sm:py-16 dark:border-cyan-400/25 dark:bg-[radial-gradient(circle_at_8%_94%,rgba(109,40,217,0.34),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(8,145,178,0.36),transparent_34%),linear-gradient(135deg,#0b1020_0%,#101827_100%)]">
                <FiFile className="h-12 w-12 text-cyan-400" />
                <h2 className="mt-5 text-2xl font-black text-[var(--tool-text)] sm:mt-7 sm:text-4xl">Ready to compress</h2>
                <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-[var(--tool-muted)] sm:mt-5 sm:text-lg">
                  Upload images and click Compress. Your files will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-4 text-sm font-black text-[var(--tool-text)]">
                  Compressed {results.length} images - Total saved: {formatBytes(totalSaved)} ({savedPercent}%)
                </div>

                {results.map((result, index) => {
                  const saved = Math.max(0, Math.round((1 - result.compressedSize / result.originalSize) * 100));
                  return (
                    <div
                      key={result.id}
                      className="result-row grid gap-3 rounded-xl border border-[var(--tool-border)] bg-[var(--tool-soft)] p-3 sm:grid-cols-[60px_1fr_auto]"
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      <img
                        src={result.previewUrl}
                        alt={`Compressed ${result.outputName} preview with ${saved}% smaller file size`}
                        loading="lazy"
                        className="h-[60px] w-[60px] rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[var(--tool-text)]">{result.outputName}</p>
                        <p className="mt-1 text-xs font-bold text-[var(--tool-muted)]">
                          {result.format} &bull; {result.compressedWidth}x{result.compressedHeight}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--tool-muted)]">
                          <span>
                            {formatBytes(result.originalSize)} <FiArrowRight className="mx-1 inline h-3.5 w-3.5" />{" "}
                            {formatBytes(result.compressedSize)}
                          </span>
                          <span className="rounded-full bg-emerald-400/15 px-2 py-1 font-black text-emerald-600 ring-1 ring-emerald-400/30 dark:text-emerald-200">
                            saved {saved}%
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[var(--tool-muted)]">
                          {result.alreadyOptimized ? "File already optimized" : `Compressed in ${(result.timeMs / 1000).toFixed(1)}s`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadBlob(result.blob, result.outputName)}
                        className="inline-flex h-11 items-center justify-center gap-2 self-center rounded-xl border border-cyan-300/50 px-4 text-sm font-black text-cyan-600 transition hover:-translate-y-0.5 hover:bg-cyan-400/10 dark:text-cyan-200"
                      >
                        <FiDownload className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={downloadAll}
                  disabled={results.length === 0}
                  title={results.length === 0 ? "Compress images before downloading ZIP" : undefined}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C6FF] via-[#7F77DD] to-[#C850C0] py-4 text-base font-black text-white shadow-[0_14px_28px_rgba(127,119,221,0.4)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiDownload className="h-5 w-5" />
                  Download All as ZIP
                </button>
              </div>
            )}
          </section>
        </div>

        <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-sm font-medium text-[var(--tool-muted)]">
          <FiShield className="h-4 w-4 text-emerald-400" />
          Your images never leave your device. All compression happens locally in your browser.
        </p>
      </div>
    </div>
  );
}
