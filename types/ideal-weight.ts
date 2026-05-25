export type IdealWeightUnit = "metric" | "imperial";
export type IdealWeightGender = "male" | "female";
export type IdealWeightFormula = "devine" | "robinson" | "miller" | "hamwi";

export interface IdealWeightFormValues {
  age: string;
  gender: IdealWeightGender;
  height: string;
  showBmiReference: boolean;
  primaryFormula: IdealWeightFormula;
  enabledFormulas: IdealWeightFormula[];
}

export interface IdealWeightFieldErrors {
  age?: string;
  height?: string;
  general?: string;
}

export interface IdealWeightFormulaResult {
  formula: IdealWeightFormula;
  label: string;
  weightKg: number;
  weightLbs: number;
  isPrimary: boolean;
}

export interface IdealWeightRange {
  minKg: number;
  maxKg: number;
  minLbs: number;
  maxLbs: number;
}

export interface BmiReferenceRange extends IdealWeightRange {
  minBmi: number;
  maxBmi: number;
}

export interface IdealWeightInterpretation {
  title: string;
  message: string;
  tone: "healthy" | "caution" | "neutral";
}

export interface IdealWeightResultData {
  primary: IdealWeightFormulaResult;
  comparisons: IdealWeightFormulaResult[];
  range: IdealWeightRange;
  bmiReference: BmiReferenceRange | null;
  interpretation: IdealWeightInterpretation;
  heightCm: number;
  heightIn: number;
}

export interface IdealWeightFormProps {
  values: IdealWeightFormValues;
  errors: IdealWeightFieldErrors;
  unit: IdealWeightUnit;
  onChange: <K extends keyof IdealWeightFormValues>(
    field: K,
    value: IdealWeightFormValues[K]
  ) => void;
}

export interface IdealWeightUnitToggleProps {
  unit: IdealWeightUnit;
  onChange: (unit: IdealWeightUnit) => void;
}

export interface IdealWeightResultProps {
  result: IdealWeightResultData;
}
