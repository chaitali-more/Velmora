import type {
  MacroActivityLevel,
  MacroFieldErrors,
  MacroFormValues,
  MacroGoal,
  MacroPercents,
  MacroPlanId,
  MacroResultData,
} from "@/types/macro";

export const macroPlans: Record<MacroPlanId, { label: string; percents: MacroPercents }> = {
  balanced: {
    label: "Balanced",
    percents: { protein: 30, carbs: 40, fat: 30 },
  },
  "low-fat": {
    label: "Low Fat",
    percents: { protein: 30, carbs: 55, fat: 15 },
  },
  "low-carb": {
    label: "Low Carb",
    percents: { protein: 35, carbs: 20, fat: 45 },
  },
  "high-protein": {
    label: "High Protein",
    percents: { protein: 40, carbs: 35, fat: 25 },
  },
  custom: {
    label: "Custom Plan",
    percents: { protein: 35, carbs: 40, fat: 25 },
  },
};

export const macroActivityLevels: Record<MacroActivityLevel, { label: string; factor: number }> = {
  sedentary: { label: "Sedentary", factor: 1.2 },
  light: { label: "Light exercise", factor: 1.375 },
  moderate: { label: "Moderate exercise", factor: 1.55 },
  active: { label: "Active", factor: 1.725 },
  "very-active": { label: "Very active", factor: 1.9 },
};

export const macroGoals: Record<MacroGoal, { label: string; adjustment: number }> = {
  lose: { label: "Weight loss", adjustment: -400 },
  maintain: { label: "Maintain weight", adjustment: 0 },
  gain: { label: "Weight gain", adjustment: 300 },
};

export function getMacroPercentTotal(percents: MacroPercents) {
  return percents.protein + percents.carbs + percents.fat;
}

export function validateMacroForm(values: MacroFormValues): MacroFieldErrors {
  const errors: MacroFieldErrors = {};
  const age = Number(values.age);
  const height = Number(values.height);
  const weight = Number(values.weight);

  if (!Number.isFinite(age) || age <= 0) {
    errors.age = "Enter age.";
  } else if (age < 15 || age > 80) {
    errors.age = "Use 15-80.";
  }

  if (!Number.isFinite(height) || height <= 0) {
    errors.height = "Enter height.";
  } else if (height < 120 || height > 245) {
    errors.height = "Use 120-245 cm.";
  }

  if (!Number.isFinite(weight) || weight <= 0) {
    errors.weight = "Enter weight.";
  } else if (weight < 25 || weight > 350) {
    errors.weight = "Use 25-350 kg.";
  }

  return errors;
}

export function calculateMacroResult(
  values: MacroFormValues,
  percents: MacroPercents
): MacroResultData {
  const age = Number(values.age);
  const height = Number(values.height);
  const weight = Number(values.weight);
  const bmr =
    values.gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenance = bmr * macroActivityLevels[values.activityLevel].factor;
  const calories = Math.max(1200, Math.round(maintenance + macroGoals[values.goal].adjustment));

  return {
    calories,
    protein: Math.round((calories * (percents.protein / 100)) / 4),
    carbs: Math.round((calories * (percents.carbs / 100)) / 4),
    fat: Math.round((calories * (percents.fat / 100)) / 9),
  };
}
