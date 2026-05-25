export type Unit = "metric" | "imperial";

export interface BMICategory {
  label: string;
  color: "blue" | "green" | "orange" | "red";
  tip: string;
}

export interface BMIFormProps {
  weight: string;
  height: string;
  setWeight: (v: string) => void;
  setHeight: (v: string) => void;
  unit: Unit;
}

export interface UnitToggleProps {
  unit: Unit;
  setUnit: (u: Unit) => void;
  reset: () => void;
}

export interface BMIResultProps {
  bmi: number;
}
