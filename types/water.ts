export type ActivityLevel = "low" | "moderate" | "high";

export interface WaterFormProps {
  weight: string;
  activity: ActivityLevel;
  setWeight: (v: string) => void;
  setActivity: (v: ActivityLevel) => void;
}

export interface WaterResultProps {
  liters: number;
  glasses: number;
  activity: ActivityLevel;
}
