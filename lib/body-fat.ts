import type {
  BodyFatCategory,
  BodyFatFieldErrors,
  BodyFatFormValues,
  BodyFatGender,
  BodyFatMetricInput,
  BodyFatResult,
  BodyFatUnit,
} from "@/types/body-fat";

function round(value: number, precision = 1) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function convertBodyFatValuesToMetric(values: BodyFatFormValues, unit: BodyFatUnit): BodyFatMetricInput {
  const multiplier = unit === "metric" ? 1 : 2.54;
  const weightMultiplier = unit === "metric" ? 1 : 0.45359237;

  return {
    gender: values.gender,
    age: Number(values.age),
    weightKg: Number(values.weight) * weightMultiplier,
    heightCm: Number(values.height) * multiplier,
    neckCm: Number(values.neck) * multiplier,
    waistCm: Number(values.waist) * multiplier,
    hipCm: values.gender === "female" ? Number(values.hip) * multiplier : undefined,
  };
}

export function validateBodyFatForm(values: BodyFatFormValues, unit: BodyFatUnit): BodyFatFieldErrors {
  const errors: BodyFatFieldErrors = {};
  const metrics = convertBodyFatValuesToMetric(values, unit);

  if (!Number.isFinite(metrics.age) || metrics.age <= 0) {
    errors.age = "Enter a valid age.";
  } else if (metrics.age < 15 || metrics.age > 100) {
    errors.age = "Age should be between 15 and 100 years.";
  }

  if (!Number.isFinite(metrics.weightKg) || metrics.weightKg <= 0) {
    errors.weight = "Enter a valid weight.";
  } else if (metrics.weightKg < 25 || metrics.weightKg > 400) {
    errors.weight = "Weight is outside a realistic range.";
  }

  if (!Number.isFinite(metrics.heightCm) || metrics.heightCm <= 0) {
    errors.height = "Enter a valid height.";
  } else if (metrics.heightCm < 120 || metrics.heightCm > 250) {
    errors.height = "Height is outside a realistic range.";
  }

  if (!Number.isFinite(metrics.neckCm) || metrics.neckCm <= 0) {
    errors.neck = "Enter a valid neck measurement.";
  } else if (metrics.neckCm < 20 || metrics.neckCm > 80) {
    errors.neck = "Neck is outside a realistic range.";
  }

  if (!Number.isFinite(metrics.waistCm) || metrics.waistCm <= 0) {
    errors.waist = "Enter a valid waist measurement.";
  } else if (metrics.waistCm < 35 || metrics.waistCm > 220) {
    errors.waist = "Waist is outside a realistic range.";
  }

  if (values.gender === "female") {
    if (!Number.isFinite(metrics.hipCm ?? Number.NaN) || (metrics.hipCm ?? 0) <= 0) {
      errors.hip = "Hip measurement is required for females.";
    } else if ((metrics.hipCm ?? 0) < 50 || (metrics.hipCm ?? 0) > 220) {
      errors.hip = "Hip is outside a realistic range.";
    }
  }

  if (
    Number.isFinite(metrics.waistCm) &&
    Number.isFinite(metrics.neckCm) &&
    metrics.waistCm <= metrics.neckCm
  ) {
    errors.general = "Waist measurement should be greater than neck measurement for a valid estimate.";
  }

  if (
    values.gender === "female" &&
    Number.isFinite(metrics.waistCm) &&
    Number.isFinite(metrics.neckCm) &&
    Number.isFinite(metrics.hipCm ?? Number.NaN) &&
    metrics.waistCm + (metrics.hipCm ?? 0) <= metrics.neckCm
  ) {
    errors.general = "Combined measurements are not valid for the U.S. Navy formula.";
  }

  return errors;
}

export function calculateBodyFatPercentage(input: BodyFatMetricInput) {
  const heightIn = input.heightCm / 2.54;
  const neckIn = input.neckCm / 2.54;
  const waistIn = input.waistCm / 2.54;

  let result: number;

  if (input.gender === "male") {
    result =
      86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
  } else {
    const hipIn = (input.hipCm ?? 0) / 2.54;
    result =
      163.205 * Math.log10(waistIn + hipIn - neckIn) -
      97.684 * Math.log10(heightIn) -
      78.387;
  }

  return round(result);
}

export function getBodyFatCategory(gender: BodyFatGender, bodyFat: number): BodyFatCategory {
  if (gender === "male") {
    if (bodyFat < 6) return "Essential fat";
    if (bodyFat < 14) return "Athlete";
    if (bodyFat < 18) return "Fitness";
    if (bodyFat < 25) return "Average";
    return "Obese";
  }

  if (bodyFat < 14) return "Essential fat";
  if (bodyFat < 21) return "Athlete";
  if (bodyFat < 25) return "Fitness";
  if (bodyFat < 32) return "Average";
  return "Obese";
}

export function getCalorieInsight(category: BodyFatCategory) {
  switch (category) {
    case "Essential fat":
      return "Your body fat is very low. Focus on eating enough and maintaining your energy and health.";

    case "Athlete":
      return "You are very lean. Maintaining your current routine is usually better than trying to lose more fat.";

    case "Fitness":
      return "You’re in a good range. Maintain your diet and activity or make small changes based on your goals.";

    case "Average":
      return "A few small changes in diet and regular exercise can help you reduce body fat over time.";

    case "Obese":
      return "Focus on gradual lifestyle changes. A balanced diet and regular activity can help improve your health.";
  }
}

export function calculateBodyFatSummary(input: BodyFatMetricInput): BodyFatResult {
  const bodyFatPercentage = calculateBodyFatPercentage(input);
  const fatMassKg = round((input.weightKg * bodyFatPercentage) / 100, 1);
  const leanMassKg = round(input.weightKg - fatMassKg, 1);
  const category = getBodyFatCategory(input.gender, bodyFatPercentage);

  return {
    bodyFatPercentage,
    fatMassKg,
    leanMassKg,
    category,
    calorieInsight: getCalorieInsight(category),
  };
}
