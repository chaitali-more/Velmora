"use client";

import { useState } from "react";
import { calculateProteinResult, validateProteinForm } from "@/lib/protein";
import type { ProteinFieldErrors, ProteinFormValues, ProteinResultData } from "@/types/protein";

const defaultValues: ProteinFormValues = {
  age: "30",
  gender: "male",
  height: "175",
  weight: "70",
  activityLevel: "moderate",
  goal: "maintain",
};

export function useProteinCalculator() {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<ProteinFieldErrors>({});
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<ProteinResultData | null>(null);

  function handleValueChange<K extends keyof ProteinFormValues>(field: K, value: ProteinFormValues[K]) {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));

    if (hasCalculated) {
      setResult(Object.keys(validateProteinForm(nextValues)).length > 0 ? null : calculateProteinResult(nextValues));
    }
  }

  function calculate() {
    const nextErrors = validateProteinForm(values);

    if (Object.keys(nextErrors).length > 0) {
      nextErrors.general = "Please complete the highlighted fields.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setHasCalculated(true);
      setResult(null);
      return;
    }

    setHasCalculated(true);
    setResult(calculateProteinResult(values));
  }

  function reset() {
    setValues(defaultValues);
    setErrors({});
    setHasCalculated(false);
    setResult(null);
  }

  return {
    values,
    errors,
    result,
    handleValueChange,
    calculate,
    reset,
  };
}
