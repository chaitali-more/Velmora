"use client";

import { calorieActivityLevels } from "@/lib/calorie";
import type { CalorieFormProps } from "@/types/calorie";

function InputError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-xs font-medium text-rose-500">{message}</p>;
}

export default function CalorieForm({ values, errors, unit, onChange }: CalorieFormProps) {
  const weightUnit = unit === "metric" ? "kg" : "lbs";

  return (
    <div className="mb-6 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Age</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.age}
              onChange={(e) => onChange("age", e.target.value)}
              className="w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
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
              className="w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
              placeholder="Enter weight"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">{weightUnit}</span>
          </div>
          <InputError message={errors.weight} />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Gender</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {([
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ] as const).map((option) => {
            const isActive = values.gender === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange("gender", option.value)}
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

      {unit === "metric" ? (
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Height</label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.heightCm}
              onChange={(e) => onChange("heightCm", e.target.value)}
              className="w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
              placeholder="Enter height"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">cm</span>
          </div>
          <InputError message={errors.heightCm} />
        </div>
      ) : (
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Height</label>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <input
                type="number"
                value={values.heightFt}
                onChange={(e) => onChange("heightFt", e.target.value)}
                className="w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
                placeholder="Feet"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">ft</span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={values.heightIn}
                onChange={(e) => onChange("heightIn", e.target.value)}
                className="w-full rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
                placeholder="Inches"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">in</span>
            </div>
          </div>
          <InputError message={errors.heightFt || errors.heightIn} />
        </div>
      )}

      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Activity</label>
        <div className="relative mt-2">
          <select
            value={values.activityLevel}
            onChange={(e) => onChange("activityLevel", e.target.value as CalorieFormProps["values"]["activityLevel"])}
            className="w-full appearance-none rounded-xl border border-white/60 bg-white/85 px-5 py-4 pr-12 text-base font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
          >
            {Object.entries(calorieActivityLevels).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500">âŒ„</span>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {calorieActivityLevels[values.activityLevel].description}
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        This tool gives a quick daily calorie estimate using standard equations. It is a starting point, not a personalized medical nutrition plan.
      </div>

      {errors.general ? <p className="text-sm font-medium text-rose-500">{errors.general}</p> : null}
    </div>
  );
}
