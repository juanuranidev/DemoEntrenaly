export type NutritionPlanModel = {
  id?: string;
  days: DaysModel[];
  name: string;
  type: string;
  hasFile?: boolean;
  file?: any;
};

export type DaysModel = {
  name: string;
  meals: MealsModel;
};

export type MealsModel = {
  lunch: string;
  dinner: string;
  snacks: string;
  breakfast: string;
  afternoonSnack: string;
};
