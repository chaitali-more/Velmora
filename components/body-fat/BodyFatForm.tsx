"use client";

import type { BodyFatFormProps } from "@/types/body-fat";

function InputError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-medium text-rose-500">{message}</p>;
}

export default function BodyFatForm({ values, errors, unit, onChange }: BodyFatFormProps) {
  const sizeUnit = unit === "metric" ? "cm" : "in";
  const weightUnit = unit === "metric" ? "kg" : "lbs";

  const inputClassName =
    "w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25";

  return (
    <div className="mb-6 flex flex-col gap-5">
      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Gender</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {([
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ] as const).map((option) => {
            const isActive = values.gender === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange("gender", option.value)}
                aria-pressed={isActive}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-cyan-300 bg-gradient-to-br from-cyan-400/15 to-violet-500/15 text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)] dark:border-cyan-400/40 dark:text-white"
                    : "border-white/60 bg-white/75 text-slate-600 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Age</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.age}
              onChange={(e) => onChange("age", e.target.value)}
              className={inputClassName}
              placeholder="Enter age"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">yrs</span>
          </div>
          <InputError message={errors.age} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Weight</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.weight}
              onChange={(e) => onChange("weight", e.target.value)}
              className={inputClassName}
              placeholder="Enter weight"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{weightUnit}</span>
          </div>
          <InputError message={errors.weight} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Height</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.height}
              onChange={(e) => onChange("height", e.target.value)}
              className={inputClassName}
              placeholder="Enter height"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{sizeUnit}</span>
          </div>
          <InputError message={errors.height} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Neck</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.neck}
              onChange={(e) => onChange("neck", e.target.value)}
              className={inputClassName}
              placeholder="Enter neck"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{sizeUnit}</span>
          </div>
          <InputError message={errors.neck} />
        </div>
      </div>

      <div className={`grid gap-5 ${values.gender === "female" ? "sm:grid-cols-2" : ""}`}>
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Waist</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.waist}
              onChange={(e) => onChange("waist", e.target.value)}
              className={inputClassName}
              placeholder="Enter waist"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{sizeUnit}</span>
          </div>
          <InputError message={errors.waist} />
        </div>

        {values.gender === "female" ? (
          <div>
            <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Hip</label>
            <div className="relative mt-2">
              <input
                type="number"
                value={values.hip}
                onChange={(e) => onChange("hip", e.target.value)}
                className={inputClassName}
                placeholder="Enter hip"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{sizeUnit}</span>
            </div>
            <InputError message={errors.hip} />
          </div>
        ) : null}
      </div>

      {errors.general ? <p className="text-sm font-medium text-rose-500">{errors.general}</p> : null}
    </div>
  );
}
