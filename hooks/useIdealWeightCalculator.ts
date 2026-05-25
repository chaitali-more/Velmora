"use client";

import { useState } from "react";
import {
  calculateIdealWeightSummary,
  idealWeightFormulaLabels,
  validateIdealWeightForm,
} from "@/lib/ideal-weight";
import type {
  IdealWeightFieldErrors,
  IdealWeightFormValues,
  IdealWeightFormula,
  IdealWeightResultData,
  IdealWeightUnit,
} from "@/types/ideal-weight";

const allFormulas = Object.keys(idealWeightFormulaLabels) as IdealWeightFormula[];

function getInitialUnit(): IdealWeightUnit {
  if (typeof window === "undefined") return "metric";
  return new URLSearchParams(window.location.search).get("u") === "imperial" ? "imperial" : "metric";
}

function getInitialValues(): IdealWeightFormValues {
  if (typeof window === "undefined") {
    return {
      age: "28",
      gender: "female",
      height: "165",
      showBmiReference: true,
      primaryFormula: "devine",
      enabledFormulas: allFormulas,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    age: params.get("age") ?? "28",
    gender: params.get("gender") === "male" ? "male" : "female",
    height: params.get("height") ?? "165",
    showBmiReference: params.get("bmiRef") !== "false",
    primaryFormula: "devine",
    enabledFormulas: allFormulas,
  };
}

const blankValues: IdealWeightFormValues = {
  age: "",
  gender: "female",
  height: "",
  showBmiReference: true,
  primaryFormula: "devine",
  enabledFormulas: allFormulas,
};

export function useIdealWeightCalculator() {
  const [unit, setUnit] = useState<IdealWeightUnit>(() => getInitialUnit());
  const [values, setValues] = useState<IdealWeightFormValues>(() => getInitialValues());
  const [errors, setErrors] = useState<IdealWeightFieldErrors>({});
  const [result, setResult] = useState<IdealWeightResultData | null>(null);

  const getDerivedState = (nextValues: IdealWeightFormValues, nextUnit: IdealWeightUnit) => {
    const hasAnyEntry = nextValues.age !== "" || nextValues.height !== "";

    if (!hasAnyEntry) {
      return {
        nextErrors: {},
        nextResult: null,
      };
    }

    const nextErrors = validateIdealWeightForm(nextValues, nextUnit);

    if (Object.keys(nextErrors).length > 0) {
      return {
        nextErrors,
        nextResult: null,
      };
    }

    return {
      nextErrors: {},
      nextResult: calculateIdealWeightSummary(nextValues, nextUnit),
    };
  };

  const handleChange = <K extends keyof IdealWeightFormValues>(
    field: K,
    value: IdealWeightFormValues[K]
  ) => {
    let nextValues: IdealWeightFormValues = values;

    setValues((current) => {
      if (field === "primaryFormula") {
        const nextFormula = value as IdealWeightFormula;

        nextValues = {
          ...current,
          primaryFormula: nextFormula,
          enabledFormulas: current.enabledFormulas.includes(nextFormula)
            ? current.enabledFormulas
            : [...current.enabledFormulas, nextFormula],
        };

        return nextValues;
      }

      nextValues = { ...current, [field]: value };
      return nextValues;
    });

    const { nextErrors, nextResult } = getDerivedState(nextValues, unit);
    setErrors(nextErrors);
    setResult(nextResult);
  };

  const toggleFormula = (formula: IdealWeightFormula) => {
    let nextValues: IdealWeightFormValues = values;

    setValues((current) => {
      const isEnabled = current.enabledFormulas.includes(formula);
      const enabledFormulas = isEnabled
        ? current.enabledFormulas.filter((item) => item !== formula)
        : [...current.enabledFormulas, formula];

      const nextPrimary =
        current.primaryFormula === formula && enabledFormulas.length > 0
          ? enabledFormulas[0]
          : current.primaryFormula;

      nextValues = {
        ...current,
        enabledFormulas,
        primaryFormula: nextPrimary,
      };

      return nextValues;
    });

    const { nextErrors, nextResult } = getDerivedState(nextValues, unit);
    setErrors(nextErrors);
    setResult(nextResult);
  };

  const reset = () => {
    setValues(blankValues);
    setErrors({});
    setResult(null);
  };

  const changeUnit = (nextUnit: IdealWeightUnit) => {
    setUnit(nextUnit);
    setValues(blankValues);
    setErrors({});
    setResult(null);
  };

  const calculate = () => {
    const { nextErrors, nextResult } = getDerivedState(values, unit);
    setErrors(nextErrors);
    setResult(nextResult);
  };

  return {
    unit,
    values,
    errors,
    result,
    handleChange,
    toggleFormula,
    calculate,
    reset,
    changeUnit,
  };
}
