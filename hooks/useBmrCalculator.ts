"use client";

import { useRef, useState } from "react";
import { calculateBMRSummary, validateBMRForm } from "@/lib/bmr";
import type { BMRFieldErrors, BMRFormValues, BMRResultData, BMRUnit } from "@/types/bmr";

function getInitialUnit(): BMRUnit {
  if (typeof window === "undefined") return "metric";
  return new URLSearchParams(window.location.search).get("u") === "imperial" ? "imperial" : "metric";
}

function getInitialValues(): BMRFormValues {
  if (typeof window === "undefined") {
    return {
      age: "28",
      gender: "female",
      activityLevel: "moderate",
      weight: "60",
      heightCm: "165",
      heightFt: "5",
      heightIn: "5",
    };
  }

  const params = new URLSearchParams(window.location.search);

  const activity = params.get("activity");

  return {
    age: params.get("age") ?? "28",
    gender: params.get("gender") === "male" ? "male" : "female",
    activityLevel:
      activity === "sedentary" ||
      activity === "light" ||
      activity === "moderate" ||
      activity === "active" ||
      activity === "very-active"
        ? activity
        : "moderate",
    weight: params.get("weight") ?? "60",
    heightCm: params.get("heightCm") ?? "165",
    heightFt: params.get("heightFt") ?? "5",
    heightIn: params.get("heightIn") ?? "5",
  };
}

const blankMetricValues: BMRFormValues = {
  age: "",
  gender: "female",
  activityLevel: "",
  weight: "",
  heightCm: "",
  heightFt: "",
  heightIn: "",
};

const blankImperialValues: BMRFormValues = {
  ...blankMetricValues,
  heightFt: "",
  heightIn: "",
};

export function useBmrCalculator() {
  const [unit, setUnit] = useState<BMRUnit>(() => getInitialUnit());
  const [values, setValues] = useState<BMRFormValues>(() => getInitialValues());
  const [errors, setErrors] = useState<BMRFieldErrors>({});
  const [result, setResult] = useState<BMRResultData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleChange = <K extends keyof BMRFormValues>(field: K, value: BMRFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
  };

  const reset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setValues(unit === "metric" ? blankMetricValues : blankImperialValues);
    setErrors({});
    setResult(null);
    setIsCalculating(false);
  };

  const changeUnit = (nextUnit: BMRUnit) => {
    setUnit(nextUnit);
    setValues(nextUnit === "metric" ? blankMetricValues : blankImperialValues);
    setErrors({});
    setResult(null);
    setIsCalculating(false);
  };

  const calculate = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    const nextErrors = validateBMRForm(values, unit);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    timerRef.current = window.setTimeout(() => {
      const age = Number(values.age);
      const weightKg = unit === "metric" ? Number(values.weight) : Number(values.weight) * 0.45359237;
      const heightCm =
        unit === "metric"
          ? Number(values.heightCm)
          : Number(values.heightFt) * 30.48 + Number(values.heightIn) * 2.54;

      setResult(
        calculateBMRSummary({
          age,
          gender: values.gender,
          formula: "mifflin-st-jeor",
          activityLevel: values.activityLevel || undefined,
          weightKg,
          heightCm,
        })
      );
      setIsCalculating(false);
    }, 320);
  };

  return {
    unit,
    values,
    errors,
    result,
    isCalculating,
    handleChange,
    calculate,
    reset,
    changeUnit,
  };
}
