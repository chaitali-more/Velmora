export type BMRUnit = "metric" | "imperial";
export type Gender = "male" | "female";
export type BMRFormula = "mifflin-st-jeor" | "harris-benedict";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active";

export interface BMRFormValues {
  age: string;
  gender: Gender;
  activityLevel: "" | ActivityLevel;
  weight: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
}

export interface BMRInput {
  age: number;
  gender: Gender;
  formula: BMRFormula;
  activityLevel?: ActivityLevel;
  weightKg: number;
  heightCm: number;
}

export interface BMRResultData {
  bmr: number;
  tdee: number | null;
  formula: BMRFormula;
  activityLevel: "" | ActivityLevel;
}

export interface BMRFieldErrors {
  age?: string;
  weight?: string;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  general?: string;
}

export interface BMRFormProps {
  values: BMRFormValues;
  errors: BMRFieldErrors;
  unit: BMRUnit;
  onChange: <K extends keyof BMRFormValues>(field: K, value: BMRFormValues[K]) => void;
}

export interface BMRUnitToggleProps {
  unit: BMRUnit;
  onChange: (unit: BMRUnit) => void;
}

export interface BMRResultProps {
  result: BMRResultData;
}
