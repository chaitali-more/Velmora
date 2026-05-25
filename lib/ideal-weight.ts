import type {
  BmiReferenceRange,
  IdealWeightFieldErrors,
  IdealWeightFormValues,
  IdealWeightFormula,
  IdealWeightFormulaResult,
  IdealWeightGender,
  IdealWeightInterpretation,
  IdealWeightResultData,
  IdealWeightUnit,
} from "@/types/ideal-weight";

export const idealWeightFormulaLabels: Record<IdealWeightFormula, string> = {
  devine: "Devine",
  robinson: "Robinson",
  miller: "Miller",
  hamwi: "Hamwi",
};

const KG_TO_LBS = 2.2046226218;
const CM_TO_IN = 0.3937007874;
const MIN_AGE = 18;
const MAX_AGE = 100;
const MIN_HEIGHT_CM = 122;
const MAX_HEIGHT_CM = 244;

function round(value: number) {
  return Math.round(value * 10) / 10;
}

export function convertHeight(values: IdealWeightFormValues, unit: IdealWeightUnit) {
  const heightValue = Number(values.height);

  if (unit === "metric") {
    return {
      heightCm: heightValue,
      heightIn: heightValue * CM_TO_IN,
    };
  }

  return {
    heightCm: heightValue * 2.54,
    heightIn: heightValue,
  };
}

export function validateIdealWeightForm(
  values: IdealWeightFormValues,
  unit: IdealWeightUnit
): IdealWeightFieldErrors {
  const errors: IdealWeightFieldErrors = {};
  const age = Number(values.age);
  const { heightCm, heightIn } = convertHeight(values, unit);

  if (!Number.isFinite(age) || age <= 0) {
    errors.age = "Enter a valid age.";
  } else if (age < MIN_AGE || age > MAX_AGE) {
    errors.age = `Age should be between ${MIN_AGE} and ${MAX_AGE} years.`;
  }

  if (!Number.isFinite(heightCm) || !Number.isFinite(heightIn) || heightCm <= 0) {
    errors.height = `Enter a valid height in ${unit === "metric" ? "cm" : "inches"}.`;
  } else if (heightCm < MIN_HEIGHT_CM || heightCm > MAX_HEIGHT_CM) {
    errors.height = `Height should be between ${MIN_HEIGHT_CM} and ${MAX_HEIGHT_CM} cm (${Math.round(
      MIN_HEIGHT_CM * CM_TO_IN
    )}-${Math.round(MAX_HEIGHT_CM * CM_TO_IN)} in).`;
  }

  if (values.enabledFormulas.length === 0) {
    errors.general = "Select at least one formula.";
  }

  return errors;
}

export function calculateIdealWeightKg(
  formula: IdealWeightFormula,
  gender: IdealWeightGender,
  heightIn: number
) {
  const inchesOverFiveFeet = heightIn - 60;

  switch (formula) {
    case "robinson":
      return gender === "male"
        ? 52 + 1.9 * inchesOverFiveFeet
        : 49 + 1.7 * inchesOverFiveFeet;
    case "miller":
      return gender === "male"
        ? 56.2 + 1.41 * inchesOverFiveFeet
        : 53.1 + 1.36 * inchesOverFiveFeet;
    case "hamwi":
      return gender === "male"
        ? 48 + 2.7 * inchesOverFiveFeet
        : 45.5 + 2.2 * inchesOverFiveFeet;
    case "devine":
    default:
      return gender === "male"
        ? 50 + 2.3 * inchesOverFiveFeet
        : 45.5 + 2.3 * inchesOverFiveFeet;
  }
}

export function getBmiReferenceRange(heightCm: number): BmiReferenceRange {
  const heightM = heightCm / 100;
  const minKg = 18.5 * heightM * heightM;
  const maxKg = 24.9 * heightM * heightM;

  return {
    minBmi: 18.5,
    maxBmi: 24.9,
    minKg: round(minKg),
    maxKg: round(maxKg),
    minLbs: round(minKg * KG_TO_LBS),
    maxLbs: round(maxKg * KG_TO_LBS),
  };
}

function buildInterpretation(
  primary: IdealWeightFormulaResult,
  bmiReference: BmiReferenceRange | null
): IdealWeightInterpretation {
  if (!bmiReference) {
    return {
      title: "Generalized target estimate",
      message:
        "This target comes from a population formula and should be treated as a directional estimate, not a personalized health prescription.",
      tone: "neutral",
    };
  }

  if (primary.weightKg < bmiReference.minKg) {
    return {
      title: "Below the BMI healthy band",
      message:
        "Your selected formula lands below the standard BMI healthy-weight reference. Use the BMI band as a broader context rather than a rule.",
      tone: "caution",
    };
  }

  if (primary.weightKg > bmiReference.maxKg) {
    return {
      title: "Above the BMI healthy band",
      message:
        "Your selected formula lands above the standard BMI healthy-weight reference. That does not automatically indicate risk, especially when body composition differs from population averages.",
      tone: "caution",
    };
  }

  return {
    title: "Aligned with the BMI healthy band",
    message:
      "Your selected target sits inside the standard BMI healthy-weight reference, which makes it a reasonable general target range for comparison.",
    tone: "healthy",
  };
}

export function calculateIdealWeightSummary(
  values: IdealWeightFormValues,
  unit: IdealWeightUnit
): IdealWeightResultData {
  const { heightCm, heightIn } = convertHeight(values, unit);

  const comparisons = values.enabledFormulas.map((formula) => {
    const weightKg = calculateIdealWeightKg(formula, values.gender, heightIn);

    return {
      formula,
      label: idealWeightFormulaLabels[formula],
      weightKg: round(weightKg),
      weightLbs: round(weightKg * KG_TO_LBS),
      isPrimary: values.primaryFormula === formula,
    } satisfies IdealWeightFormulaResult;
  });

  const primary =
    comparisons.find((entry) => entry.formula === values.primaryFormula) ?? comparisons[0];

  const kgValues = comparisons.map((entry) => entry.weightKg);
  const lbsValues = comparisons.map((entry) => entry.weightLbs);
  const bmiReference = values.showBmiReference ? getBmiReferenceRange(heightCm) : null;

  return {
    primary,
    comparisons,
    range: {
      minKg: Math.min(...kgValues),
      maxKg: Math.max(...kgValues),
      minLbs: Math.min(...lbsValues),
      maxLbs: Math.max(...lbsValues),
    },
    bmiReference,
    interpretation: buildInterpretation(primary, bmiReference),
    heightCm: round(heightCm),
    heightIn: round(heightIn),
  };
}
