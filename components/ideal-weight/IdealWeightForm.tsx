"use client";

import type { IdealWeightFormProps } from "@/types/ideal-weight";

function InputError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-xs font-medium text-rose-500">{message}</p>;
}

export default function IdealWeightForm({
  values,
  errors,
  unit,
  onChange,
}: IdealWeightFormProps) {
  const heightUnit = unit === "metric" ? "cm" : "in";

  return (
    <div className="mb-6 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Age
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.age}
              onChange={(e) => onChange("age", e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
              placeholder="Enter age"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">
              yrs
            </span>
          </div>
          <InputError message={errors.age} />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Height
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              value={values.height}
              onChange={(e) => onChange("height", e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/85 px-5 py-4 pr-14 text-lg font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/50 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.45)] dark:focus:border-cyan-400 dark:focus:ring-cyan-500/25"
              placeholder={`Enter height in ${heightUnit}`}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">
              {heightUnit}
            </span>
          </div>
          <InputError message={errors.height} />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Gender
        </label>
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
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
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

      <div>
        <label className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Formula comparison
        </label>
        <p className="mt-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
          We use Devine as the default target and automatically compare it with Robinson, Miller, and Hamwi in the result panel, so you do not need to pick formulas manually.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        These formulas are generalized adult estimates. Age is validated for adult-use context, while the weight targets themselves are primarily driven by height and sex.
      </div>

      {errors.general ? <p className="text-sm font-medium text-rose-500">{errors.general}</p> : null}
    </div>
  );
}
