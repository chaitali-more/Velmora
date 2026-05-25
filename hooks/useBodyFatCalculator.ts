"use client";

import { useRef, useState } from "react";
import { calculateBodyFatSummary, convertBodyFatValuesToMetric, validateBodyFatForm } from "@/lib/body-fat";
import type {
  BodyFatFieldErrors,
  BodyFatFormValues,
  BodyFatResult,
  BodyFatUnit,
} from "@/types/body-fat";

const initialValues: BodyFatFormValues = {
  gender: "female",
  age: "28",
  weight: "60",
  height: "165",
  neck: "32",
  waist: "74",
  hip: "96",
  activityLevel: "",
};

function getInitialUnit(): BodyFatUnit {
  if (typeof window === "undefined") return "metric";
  return new URLSearchParams(window.location.search).get("u") === "imperial" ? "imperial" : "metric";
}

function getInitialValues(): BodyFatFormValues {
  if (typeof window === "undefined") {
    return initialValues;
  }

  const params = new URLSearchParams(window.location.search);

  return {
    gender: params.get("gender") === "male" ? "male" : "female",
    age: params.get("age") ?? initialValues.age,
    weight: params.get("weight") ?? initialValues.weight,
    height: params.get("height") ?? initialValues.height,
    neck: params.get("neck") ?? initialValues.neck,
    waist: params.get("waist") ?? initialValues.waist,
    hip: params.get("hip") ?? initialValues.hip,
    activityLevel: "",
  };
}

const blankValues: BodyFatFormValues = {
  gender: "female",
  age: "",
  weight: "",
  height: "",
  neck: "",
  waist: "",
  hip: "",
  activityLevel: "",
};

export function useBodyFatCalculator() {
  const [unit, setUnit] = useState<BodyFatUnit>(() => getInitialUnit());
  const [values, setValues] = useState<BodyFatFormValues>(() => getInitialValues());
  const [errors, setErrors] = useState<BodyFatFieldErrors>({});
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleChange = <K extends keyof BodyFatFormValues>(field: K, value: BodyFatFormValues[K]) => {
    setValues((current) => {
      const next = { ...current, [field]: value };

      if (field === "gender" && value === "male") {
        next.hip = "";
      }

      return next;
    });
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
  };

  const reset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setValues({ ...blankValues, gender: values.gender });
    setErrors({});
    setResult(null);
    setIsCalculating(false);
  };

  const changeUnit = (nextUnit: BodyFatUnit) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setUnit(nextUnit);
    setValues({ ...blankValues, gender: values.gender });
    setErrors({});
    setResult(null);
    setIsCalculating(false);
  };

  const calculate = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    const nextErrors = validateBodyFatForm(values, unit);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    timerRef.current = window.setTimeout(() => {
      const metrics = convertBodyFatValuesToMetric(values, unit);
      setResult(calculateBodyFatSummary(metrics));
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
