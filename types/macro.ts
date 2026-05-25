export type MacroPlanId = "balanced" | "low-fat" | "low-carb" | "high-protein" | "custom";

export type MacroGender = "male" | "female";

export type MacroActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";

export type MacroGoal = "lose" | "maintain" | "gain";

export type MacroFormValues = {
  age: string;
  gender: MacroGender;
  height: string;
  weight: string;
  activityLevel: MacroActivityLevel;
  goal: MacroGoal;
};

export type MacroPercents = {
  protein: number;
  carbs: number;
  fat: number;
};

export type MacroResultData = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MacroFieldErrors = Partial<Record<keyof MacroFormValues | "general", string>>;
