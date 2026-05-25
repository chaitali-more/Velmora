import type {
  CalorieActivityLevel,
  CalorieFieldErrors,
  CalorieFormValues,
  CalorieResultData,
  CalorieUnit,
} from "@/types/calorie";

export const calorieActivityLevels: Record<
  CalorieActivityLevel,
  { label: string; factor: number; description: string }
> = {
  bmr: {
    label: "Resting (BMR)",
    factor: 1,
    description: "Calories your body burns at rest (no activity).",
  },
  sedentary: {
    label: "Sedentary",
    factor: 1.2,
    description: "Little to no exercise",
  },
  light: {
    label: "Light activity",
    factor: 1.375,
    description: "Light exercise 1–3 days/week",
  },
  moderate: {
    label: "Moderate activity",
    factor: 1.55,
    description: "Exercise 3–5 days/week",
  },
  active: {
    label: "Active",
    factor: 1.725,
    description: "Exercise most days (6–7 days/week)",
  },
  "very-active": {
    label: "Very active",
    factor: 1.9,
    description: "Intense training or physical job daily",
  },
};
export function convertCalorieInputs(values: CalorieFormValues, unit: CalorieUnit) {
  const age = Number(values.age);
  const weight = Number(values.weight);

  if (unit === "metric") {
    return {
      age,
      weightKg: weight,
      heightCm: Number(values.heightCm),
    };
  }

  return {
    age,
    weightKg: weight * 0.45359237,
    heightCm: Number(values.heightFt) * 30.48 + Number(values.heightIn) * 2.54,
  };
}

export function validateCalorieForm(
  values: CalorieFormValues,
  unit: CalorieUnit
): CalorieFieldErrors {
  const errors: CalorieFieldErrors = {};
  const { age, weightKg, heightCm } = convertCalorieInputs(values, unit);

  if (!Number.isFinite(age) || age <= 0) {
    errors.age = "Enter a valid age.";
  } else if (age < 15 || age > 80) {
    errors.age = "Age should be between 15 and 80 years.";
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    errors.weight = "Enter a valid weight.";
  } else if (weightKg < 25 || weightKg > 350) {
    errors.weight = "Weight is outside a realistic range.";
  }

  if (unit === "metric") {
    if (!Number.isFinite(heightCm) || heightCm <= 0) {
      errors.heightCm = "Enter a valid height.";
    } else if (heightCm < 120 || heightCm > 245) {
      errors.heightCm = "Height should be between 120 and 245 cm.";
    }
  } else {
    const feet = Number(values.heightFt);
    const inches = Number(values.heightIn);

    if (!Number.isFinite(feet) || feet < 0) {
      errors.heightFt = "Enter valid feet.";
    }

    if (!Number.isFinite(inches) || inches < 0 || inches >= 12) {
      errors.heightIn = "Inches should be between 0 and 11.";
    }

    if (!errors.heightFt && !errors.heightIn && (heightCm < 120 || heightCm > 245)) {
      errors.heightFt = "Combined height is outside a realistic range.";
    }
  }

  return errors;
}

export function calculateBMRFromInputs(
  age: number,
  gender: CalorieFormValues["gender"],
  weightKg: number,
  heightCm: number
) {
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export function calculateCalorieSummary(
  values: CalorieFormValues,
  unit: CalorieUnit
): CalorieResultData {
  const { age, weightKg, heightCm } = convertCalorieInputs(values, unit);
  const bmr = calculateBMRFromInputs(age, values.gender, weightKg, heightCm);
  const activity = calorieActivityLevels[values.activityLevel];
  const maintenance = Math.round(bmr * activity.factor);

  return {
    bmr: Math.round(bmr),
    maintenance,
    activityLabel: activity.label,
    goals: [
      {
        label: "Slow Fat Loss",
        calories: Math.max(1200, maintenance - 250),
        description: "A gentler calorie deficit for steady progress.",
      },
      {
        label: "Fast Fat Loss",
        calories: Math.max(1200, maintenance - 500),
        description: "A stronger deficit that may suit short-term cutting phases.",
      },
      {
        label: "Maintain weight",
        calories: maintenance,
        description: "A practical daily target to maintain your current weight.",
      },
      {
        label: "Mild weight gain",
        calories: maintenance + 250,
        description: "A small surplus that supports gradual weight gain.",
      },
    ],
  };
}
