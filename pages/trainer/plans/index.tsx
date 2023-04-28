import React from "react";
import Plans from "views/trainer/plans/Plans";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import { NutritionPlanModel } from "models/NutritionPlan.model";

interface IndexProps {
  plans: WorkoutPlanModel[];
  setPlans: (plans: WorkoutPlanModel[]) => void;
  nutritionPlans: NutritionPlanModel[];
  setNutritionPlans: (plans: WorkoutPlanModel[]) => void;
}

export default function Index({
  plans,
  setPlans,
  nutritionPlans,
  setNutritionPlans,
}: IndexProps) {
  return (
    <Plans
      plans={plans}
      setPlans={setPlans}
      nutritionPlans={nutritionPlans}
      setNutritionPlans={setNutritionPlans}
    />
  );
}
