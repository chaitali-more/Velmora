export type CalorieUnit = "metric" | "imperial";
export type CalorieGender = "male" | "female";
export type CalorieActivityLevel =
  | "bmr"
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active";

export interface CalorieFormValues {
  age: string;
  gender: CalorieGender;
  weight: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  activityLevel: CalorieActivityLevel;
}

export interface CalorieFieldErrors {
  age?: string;
  weight?: string;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  general?: string;
}

export interface CalorieGoal {
  label: string;
  calories: number;
  description: string;
}

export interface CalorieResultData {
  bmr: number;
  maintenance: number;
  goals: CalorieGoal[];
  activityLabel: string;
}

export interface CalorieFormProps {
  values: CalorieFormValues;
  errors: CalorieFieldErrors;
  unit: CalorieUnit;
  onChange: <K extends keyof CalorieFormValues>(
    field: K,
    value: CalorieFormValues[K]
  ) => void;
}

export interface CalorieUnitToggleProps {
  unit: CalorieUnit;
  onChange: (unit: CalorieUnit) => void;
}

export interface CalorieResultProps {
  result: CalorieResultData;
}
