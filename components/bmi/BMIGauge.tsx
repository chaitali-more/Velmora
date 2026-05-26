"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  bmi: number;
};

const MAX = 40;

const zones = [
  {
    label: "Underweight",
    min: 0,
    max: 18.5,
    // Blue — clinical, cool
    accent: "#378ADD",
    tailwindActive:
      "border-blue-400/60 bg-blue-500/10 text-blue-600 dark:border-blue-400/50 dark:bg-blue-500/10 dark:text-blue-300 shadow-[0_0_18px_rgba(55,138,221,0.15)]",
    tailwindIdle:
      "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
    dot: "bg-blue-500 dark:bg-blue-400",
    gradient: "from-blue-500 to-blue-400",
  },
  {
    label: "Normal",
    min: 18.5,
    max: 25,
    // Green — healthy
    accent: "#3B6D11",
    tailwindActive:
      "border-green-500/60 bg-green-500/10 text-green-700 dark:border-green-400/50 dark:bg-green-500/10 dark:text-green-300 shadow-[0_0_18px_rgba(99,153,34,0.15)]",
    tailwindIdle:
      "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
    dot: "bg-green-600 dark:bg-green-400",
    gradient: "from-green-500 to-green-400",
  },
  {
    label: "Overweight",
    min: 25,
    max: 30,
    // Amber — caution
    accent: "#854F0B",
    tailwindActive:
      "border-amber-500/60 bg-amber-500/10 text-amber-700 dark:border-amber-400/50 dark:bg-amber-500/10 dark:text-amber-300 shadow-[0_0_18px_rgba(186,117,23,0.15)]",
    tailwindIdle:
      "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
    dot: "bg-amber-600 dark:bg-amber-400",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    label: "Obese",
    min: 30,
    max: 40,
    // Red — risk
    accent: "#791F1F",
    tailwindActive:
      "border-red-500/60 bg-red-500/10 text-red-700 dark:border-red-400/50 dark:bg-red-500/10 dark:text-red-300 shadow-[0_0_18px_rgba(163,45,45,0.15)]",
    tailwindIdle:
      "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",
    dot: "bg-red-600 dark:bg-red-400",
    gradient: "from-red-500 to-red-400",
  },
];

const messages: Record<string, { text: string; gradient: string }> = {
  Underweight: {
    text: "You may need to gain some weight. Focus on eating enough and building strength gradually.",
    gradient: "from-blue-500 to-green-500",
  },
  Normal: {
    text: "You're in a healthy range. Keep your diet and activity consistent.",
    gradient: "from-green-500 to-green-400",
  },
  Overweight: {
    text: "A few small changes in diet and daily activity can help you reach a healthier range.",
    gradient: "from-amber-500 to-amber-400",
  },
  Obese: {
    text: "It may help to improve your lifestyle step by step. Consider guidance from a health professional.",
    gradient: "from-red-500 to-red-400",
  },
};
function getZone(bmi: number) {
  return zones.find((z) => bmi >= z.min && bmi < z.max) ?? zones[zones.length - 1];
}

const toPercent = (v: number) => (v / MAX) * 100;

// Track gradient: blue → green → amber → red
const TRACK_GRADIENT = `linear-gradient(90deg,
  #378ADD 0%,
  #639922 ${toPercent(18.5)}%,
  #BA7517 ${toPercent(25)}%,
  #A32D2D ${toPercent(30)}%,
  #7B1A1A 100%
)`;

export default function BMIGauge({ bmi }: Props) {
  const safeBMI = Math.max(0, Math.min(bmi, MAX));
  const percent = toPercent(safeBMI);
  const activeZone = getZone(safeBMI);
  const msg = messages[activeZone.label];

  const [animated, setAnimated] = useState(false);
  const [displayBMI, setDisplayBMI] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Count-up animation for BMI label
  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    const from = 0;
    const to = safeBMI;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayBMI(parseFloat((from + (to - from) * ease).toFixed(1)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [safeBMI]);

  const ticks = [0, 18.5, 25, 30, 40];
  const accent = activeZone.accent;
  const trackGradient = TRACK_GRADIENT;

  return (
    <div className="mt-7 space-y-4">
      {/* Card — adapts to light/dark */}
      <div
        className="relative overflow-hidden rounded-xl p-5 sm:p-6
          bg-white/80 border border-slate-200 shadow-lg
          dark:bg-[rgba(15,15,28,0.72)] dark:border-white/10 dark:shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        style={{
          backdropFilter: "blur(18px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Ambient glow behind track */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: 28,
            width: "80%",
            height: 48,
            background: trackGradient,
            filter: "blur(28px)",
            opacity: 0.16,
            borderRadius: "9999px",
          }}
        />

        {/* BMI readout */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Body Mass Index
            </p>
            <p
              className="mt-0.5 text-3xl font-bold tabular-nums"
              style={{
                background: trackGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {displayBMI}
            </p>
          </div>
          <span
            className="mb-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}55`,
              color: accent,
              boxShadow: `0 0 12px ${accent}22`,
            }}
          >
            {activeZone.label}
          </span>
        </div>

        {/* Track */}
        <div className="relative">
          <div
            className="relative h-5 overflow-visible rounded-full bg-slate-300/60 dark:bg-white/10"
            style={{
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.18)",
            }}
          >
            {/* Filled gradient track */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-700"
              style={{ background: trackGradient }}
            />

            {/* Gloss sheen */}
            <div
              className="pointer-events-none absolute inset-x-1 top-0.5 h-[7px] rounded-full bg-white/40 dark:bg-white/20"
            />

            {/* Zone dividers */}
            {[18.5, 25, 30].map((v) => (
              <div
                key={v}
                className="absolute top-0 h-full w-px bg-white/50 dark:bg-black/35"
                style={{
                  left: `${toPercent(v)}%`,
                }}
              />
            ))}

            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{
                left: animated ? `${percent}%` : "0%",
                transitionDuration: "900ms",
                transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* Outer glow ring */}
              <div
                className="absolute -inset-2 rounded-full opacity-60"
                style={{
                  background: `radial-gradient(circle, ${accent}55, transparent 70%)`,
                  filter: "blur(4px)",
                }}
              />
              {/* Ring */}
              <div
                className="relative h-7 w-7 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: `2px solid ${accent}`,
                  boxShadow: `0 0 0 3px ${accent}28, 0 4px 16px rgba(0,0,0,0.2)`,
                }}
              >
                {/* Inner dot */}
                <div
                  className="absolute inset-[5px] rounded-full"
                  style={{
                    background: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              </div>

              {/* Floating BMI callout */}
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-bold tabular-nums bg-white/95 dark:bg-[rgba(15,15,28,0.85)]"
                style={{
                  border: `1px solid ${accent}55`,
                  color: accent,
                  backdropFilter: "blur(8px)",
                  boxShadow: `0 4px 14px rgba(0,0,0,0.2)`,
                }}
              >
                {displayBMI}
              </div>
            </div>
          </div>

          {/* Tick labels */}
          <div className="relative mt-2.5 h-4">
            {ticks.map((v) => (
              <span
                key={v}
                className="absolute -translate-x-1/2 text-[10px] font-medium text-slate-400 dark:text-slate-500"
                style={{ left: `${toPercent(v)}%` }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Zone chips */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          {zones.map((z) => {
            const isActive = z.label === activeZone.label;
            return (
              <div
                key={z.label}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-center text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? z.tailwindActive : z.tailwindIdle
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${z.dot} ${isActive ? "opacity-100" : "opacity-30"} transition-opacity duration-300`}
                />
                <span className="hidden sm:block">{z.label}</span>
                <span className="block sm:hidden text-[9px]">{z.label.replace("weight", "wt")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <p className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
        <span
          className={`mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${msg.gradient}`}
          style={{ boxShadow: `0 0 8px ${accent}88` }}
        />
        {msg.text}
      </p>
    </div>
  );
}
