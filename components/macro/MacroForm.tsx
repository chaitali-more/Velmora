"use client";

import { macroActivityLevels, macroGoals } from "@/lib/macro";
import type { MacroFieldErrors, MacroFormValues } from "@/types/macro";

type MacroFormProps = {
  values: MacroFormValues;
  errors: MacroFieldErrors;
  onChange: <K extends keyof MacroFormValues>(field: K, value: MacroFormValues[K]) => void;
  onCalculate: () => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-500/20";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-300">{message}</p> : null;
}

export default function MacroForm({ values, errors, onChange, onCalculate }: MacroFormProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Age</label>
          <input
            type="number"
            value={values.age}
            onChange={(event) => onChange("age", event.target.value)}
            className={`${inputClass} mt-1.5`}
            placeholder="30"
          />
          <FieldError message={errors.age} />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Gender</label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(["male", "female"] as const).map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => onChange("gender", gender)}
                className={`rounded-xl border px-3 py-3 text-sm font-bold capitalize transition ${
                  values.gender === gender
                    ? "border-transparent bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Height</label>
          <div className="relative mt-1.5">
            <input
              type="number"
              value={values.height}
              onChange={(event) => onChange("height", event.target.value)}
              className={`${inputClass} pr-12`}
              placeholder="175"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">cm</span>
          </div>
          <FieldError message={errors.height} />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Weight</label>
          <div className="relative mt-1.5">
            <input
              type="number"
              value={values.weight}
              onChange={(event) => onChange("weight", event.target.value)}
              className={`${inputClass} pr-12`}
              placeholder="70"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">kg</span>
          </div>
          <FieldError message={errors.weight} />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Activity Level</label>
          <select
            value={values.activityLevel}
            onChange={(event) =>
              onChange("activityLevel", event.target.value as MacroFormValues["activityLevel"])
            }
            className={`${inputClass} mt-1.5`}
          >
            {Object.entries(macroActivityLevels).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Goal</label>
          <select
            value={values.goal}
            onChange={(event) => onChange("goal", event.target.value as MacroFormValues["goal"])}
            className={`${inputClass} mt-1.5`}
          >
            {Object.entries(macroGoals).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errors.general ? (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-200">
          {errors.general}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onCalculate}
        className="mt-4 w-full rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 px-4 py-3.5 text-base font-black text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)]"
      >
Calculate Macros      </button>
    </div>
  );
}
