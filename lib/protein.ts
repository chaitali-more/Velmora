import type {
  ProteinActivityLevel,
  ProteinFieldErrors,
  ProteinFormValues,
  ProteinGoal,
  ProteinResultData,
} from "@/types/protein";

export const proteinActivityLevels: Record<ProteinActivityLevel, { label: string; factor: number }> = {
  sedentary: { label: "Sedentary", factor: 0.8 },
  light: { label: "Light Exercise", factor: 1.2 },
  moderate: { label: "Moderate Exercise", factor: 1.6 },
  heavy: { label: "Heavy Exercise", factor: 2 },
  athlete: { label: "Athlete", factor: 2.2 },
};

export const proteinGoals: Record<ProteinGoal, { label: string; adjustment: number }> = {
  loss: { label: "Weight Loss", adjustment: 0.15 },
  maintain: { label: "Maintain Weight", adjustment: 0 },
  gain: { label: "Muscle Gain", adjustment: 0.2 },
};

export function validateProteinForm(values: ProteinFormValues): ProteinFieldErrors {
  const errors: ProteinFieldErrors = {};
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

export function calculateProteinResult(values: ProteinFormValues): ProteinResultData {
  const weight = Number(values.weight);
  const baseFactor = proteinActivityLevels[values.activityLevel].factor;
  const goalAdjustment = proteinGoals[values.goal].adjustment;
  const targetFactor = baseFactor + goalAdjustment;
  const daily = Math.round(weight * targetFactor);
  const minimum = Math.round(weight * Math.max(0.8, targetFactor - 0.3));
  const maximum = Math.round(weight * (targetFactor + 0.3));

  return {
    daily,
    minimum,
    maximum,
    calories: daily * 4,
  };
}
