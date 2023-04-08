import React from "react";
import Plans from "views/trainer/plans/Plans";

export default function Index({
  plans,
  setPlans,
  nutritionPlans,
  setNutritionPlans,
}: any) {
  return (
    <Plans
      plans={plans}
      setPlans={setPlans}
      nutritionPlans={nutritionPlans}
      setNutritionPlans={setNutritionPlans}
    />
  );
}
