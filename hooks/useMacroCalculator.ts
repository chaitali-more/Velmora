"use client";

import { useState } from "react";
import {
  calculateMacroResult,
  getMacroPercentTotal,
  macroPlans,
  validateMacroForm,
} from "@/lib/macro";
import type {
  MacroFieldErrors,
  MacroFormValues,
  MacroPercents,
  MacroPlanId,
  MacroResultData,
} from "@/types/macro";

const defaultValues: MacroFormValues = {
  age: "30",
  gender: "male",
  height: "175",
  weight: "70",
  activityLevel: "moderate",
  goal: "maintain",
};

export function useMacroCalculator() {
  const [values, setValues] = useState(defaultValues);
  const [selectedPlan, setSelectedPlan] = useState<MacroPlanId>("balanced");
  const [customPercents, setCustomPercents] = useState<MacroPercents>(macroPlans.custom.percents);
  const [errors, setErrors] = useState<MacroFieldErrors>({});
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<MacroResultData | null>(null);

  const activePercents = selectedPlan === "custom" ? customPercents : macroPlans[selectedPlan].percents;
  const percentTotal = getMacroPercentTotal(activePercents);

  function syncResult(nextValues: MacroFormValues, nextPercents: MacroPercents) {
    const nextErrors = validateMacroForm(nextValues);
    const nextTotal = getMacroPercentTotal(nextPercents);

    setResult(
      Object.keys(nextErrors).length > 0 || nextTotal !== 100
        ? null
        : calculateMacroResult(nextValues, nextPercents)
    );
  }

  function handleValueChange<K extends keyof MacroFormValues>(field: K, value: MacroFormValues[K]) {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
    if (hasCalculated) {
      syncResult(nextValues, activePercents);
    }
  }

  function selectPlan(plan: MacroPlanId) {
    const nextPercents = plan === "custom" ? customPercents : macroPlans[plan].percents;

    setSelectedPlan(plan);
    if (hasCalculated) {
      syncResult(values, nextPercents);
    }
    if (plan !== "custom") {
      setErrors((current) => ({ ...current, general: undefined }));
    }
  }

  function updateCustomPercent(field: keyof MacroPercents, value: number) {
    const nextPercents = { ...customPercents, [field]: value };

    setSelectedPlan("custom");
    setCustomPercents(nextPercents);
    if (hasCalculated) {
      syncResult(values, nextPercents);
    }
  }

  function calculate() {
    const nextErrors = validateMacroForm(values);

    if (percentTotal !== 100) {
      nextErrors.general = `Macro percentages must equal 100%. Current total is ${percentTotal}%.`;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setHasCalculated(true);
      setResult(null);
      return;
    }

    setHasCalculated(true);
    setResult(calculateMacroResult(values, activePercents));
  }

  return {
    values,
    errors,
    selectedPlan,
    customPercents,
    activePercents,
    percentTotal,
    result,
    handleValueChange,
    selectPlan,
    updateCustomPercent,
    calculate,
  };
}
