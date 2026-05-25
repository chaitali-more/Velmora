import { BMICategory } from "@/types/bmi";

export const calculateBMI = (weight: number, height: number): number => {
  return weight / (height * height);
};

export const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "blue",
      tip: "Increase calorie intake & strength training.",
    };

  if (bmi < 25)
    return {
      label: "Normal",
      color: "green",
      tip: "Maintain balanced diet & regular exercise.",
    };

  if (bmi < 30)
    return {
      label: "Overweight",
      color: "orange",
      tip: "Focus on cardio + portion control.",
    };

  return {
    label: "Obese",
    color: "red",
    tip: "Consult a doctor & adopt structured fitness plan.",
  };
};