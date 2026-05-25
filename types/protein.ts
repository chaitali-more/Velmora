export type ProteinGender = "male" | "female";

export type ProteinActivityLevel = "sedentary" | "light" | "moderate" | "heavy" | "athlete";

export type ProteinGoal = "loss" | "maintain" | "gain";

export type ProteinFormValues = {
  age: string;
  gender: ProteinGender;
  height: string;
  weight: string;
  activityLevel: ProteinActivityLevel;
  goal: ProteinGoal;
};

export type ProteinFieldErrors = Partial<Record<keyof ProteinFormValues | "general", string>>;

export type ProteinResultData = {
  daily: number;
  minimum: number;
  maximum: number;
  calories: number;
};
