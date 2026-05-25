"use client";

import { useRef, useState } from "react";
import { calculateCalorieSummary, validateCalorieForm } from "@/lib/calorie";
import type {
  CalorieFieldErrors,
  CalorieFormValues,
  CalorieResultData,
  CalorieUnit,
} from "@/types/calorie";

function getInitialUnit(): CalorieUnit {
  if (typeof window === "undefined") return "metric";
  return new URLSearchParams(window.location.search).get("u") === "imperial" ? "imperial" : "metric";
}

function getInitialValues(): CalorieFormValues {
  if (typeof window === "undefined") {
    return {
      age: "25",
      gender: "male",
      weight: "65",
      heightCm: "180",
      heightFt: "5",
      heightIn: "11",
      activityLevel: "bmr",
    };
  }

  const params = new URLSearchParams(window.location.search);

  const activity = params.get("activity");

  return {
    age: params.get("age") ?? "25",
    gender: params.get("gender") === "female" ? "female" : "male",
    weight: params.get("weight") ?? "65",
    heightCm: params.get("heightCm") ?? "180",
    heightFt: params.get("heightFt") ?? "5",
    heightIn: params.get("heightIn") ?? "11",
    activityLevel:
      activity === "bmr" ||
      activity === "sedentary" ||
      activity === "light" ||
      activity === "moderate" ||
      activity === "active" ||
      activity === "very-active"
        ? activity
        : "bmr",
  };
}

const blankMetricValues: CalorieFormValues = {
  age: "",
  gender: "male",
  weight: "",
  heightCm: "",
  heightFt: "",
  heightIn: "",
  activityLevel: "bmr",
};

const blankImperialValues: CalorieFormValues = {
  ...blankMetricValues,
};

export function useCalorieCalculator() {
  const [unit, setUnit] = useState<CalorieUnit>(() => getInitialUnit());
  const [values, setValues] = useState<CalorieFormValues>(() => getInitialValues());
  const [errors, setErrors] = useState<CalorieFieldErrors>({});
  const [result, setResult] = useState<CalorieResultData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleChange = <K extends keyof CalorieFormValues>(field: K, value: CalorieFormValues[K]) => {
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

  const changeUnit = (nextUnit: CalorieUnit) => {
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

    const nextErrors = validateCalorieForm(values, unit);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    timerRef.current = window.setTimeout(() => {
      setResult(calculateCalorieSummary(values, unit));
      setIsCalculating(false);
    }, 250);
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
