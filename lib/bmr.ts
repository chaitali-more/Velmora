import type {
  ActivityLevel,
  BMRFieldErrors,
  BMRFormValues,
  BMRInput,
  BMRResultData,
  BMRUnit,
} from "@/types/bmr";

export const activityLevels: Record<
  ActivityLevel,
  { label: string; factor: number; description: string }
> = {
  sedentary: {
    label: "Sedentary",
    factor: 1.2,
    description: "Little or no exercise",
  },
  light: {
    label: "Lightly active",
    factor: 1.375,
    description: "Light exercise 1-3 days/week",
  },
  moderate: {
    label: "Moderately active",
    factor: 1.55,
    description: "Moderate exercise 3-5 days/week",
  },
  active: {
    label: "Active",
    factor: 1.725,
    description: "Hard exercise 6-7 days/week",
  },
  "very-active": {
    label: "Very active",
    factor: 1.9,
    description: "Very hard exercise or physical job",
  },
};

export const formulaLabels = {
  "mifflin-st-jeor": "Mifflin-St Jeor",
  "harris-benedict": "Harris-Benedict",
} as const;

export function convertToMetric(values: BMRFormValues, unit: BMRUnit) {
  const age = Number(values.age);
  const weight = Number(values.weight);

  if (unit === "metric") {
    return {
      age,
      weightKg: weight,
      heightCm: Number(values.heightCm),
    };
  }

  const feet = Number(values.heightFt);
  const inches = Number(values.heightIn);

  return {
    age,
    weightKg: weight * 0.45359237,
    heightCm: feet * 30.48 + inches * 2.54,
  };
}

export function validateBMRForm(values: BMRFormValues, unit: BMRUnit): BMRFieldErrors {
  const errors: BMRFieldErrors = {};
  const { age, weightKg, heightCm } = convertToMetric(values, unit);

  if (!Number.isFinite(age) || age <= 0) {
    errors.age = "Enter a valid age.";
  } else if (age < 15 || age > 100) {
    errors.age = "Age should be between 15 and 100 years.";
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    errors.weight = "Enter a valid weight.";
  } else if (weightKg < 20 || weightKg > 350) {
    errors.weight = "Weight is outside a realistic range.";
  }

  if (unit === "metric") {
    if (!Number.isFinite(heightCm) || heightCm <= 0) {
      errors.heightCm = "Enter a valid height.";
    } else if (heightCm < 90 || heightCm > 250) {
      errors.heightCm = "Height is outside a realistic range.";
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

    if (!errors.heightFt && !errors.heightIn && (heightCm < 90 || heightCm > 250)) {
      errors.heightFt = "Combined height is outside a realistic range.";
    }
  }

  return errors;
}

export function calculateBMR(input: BMRInput) {
  const { age, gender, formula, weightKg, heightCm } = input;

  if (formula === "harris-benedict") {
    if (gender === "male") {
      return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    }

    return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export function calculateTDEE(bmr: number, activityLevel?: ActivityLevel) {
  if (!activityLevel) {
    return null;
  }

  return bmr * activityLevels[activityLevel].factor;
}

export function calculateBMRSummary(input: BMRInput): BMRResultData {
  const bmr = calculateBMR(input);
  const tdee = calculateTDEE(bmr, input.activityLevel);

  return {
    bmr: Math.round(bmr),
    tdee: tdee ? Math.round(tdee) : null,
    formula: input.formula,
    activityLevel: input.activityLevel ?? "",
  };
}
