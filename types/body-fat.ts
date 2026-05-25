export type BodyFatUnit = "metric" | "imperial";
export type BodyFatGender = "male" | "female";
export type BodyFatCategory = "Essential fat" | "Athlete" | "Fitness" | "Average" | "Obese";

export interface BodyFatFormValues {
  gender: BodyFatGender;
  age: string;
  weight: string;
  height: string;
  neck: string;
  waist: string;
  hip: string;
  activityLevel: "";
}

export interface BodyFatFieldErrors {
  age?: string;
  weight?: string;
  height?: string;
  neck?: string;
  waist?: string;
  hip?: string;
  general?: string;
}

export interface BodyFatMetricInput {
  gender: BodyFatGender;
  age: number;
  weightKg: number;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  fatMassKg: number;
  leanMassKg: number;
  category: BodyFatCategory;
  calorieInsight: string;
}

export interface BodyFatFormProps {
  values: BodyFatFormValues;
  errors: BodyFatFieldErrors;
  unit: BodyFatUnit;
  onChange: <K extends keyof BodyFatFormValues>(field: K, value: BodyFatFormValues[K]) => void;
}

export interface BodyFatUnitToggleProps {
  unit: BodyFatUnit;
  onChange: (unit: BodyFatUnit) => void;
}

export interface BodyFatResultProps {
  result: BodyFatResult;
  gender: BodyFatGender;
}
