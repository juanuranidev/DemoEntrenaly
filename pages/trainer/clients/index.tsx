import React from "react";
import Clients from "views/trainer/clients/Clients";
import { ClientModel } from "models/Client.model";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import { NutritionPlanModel } from "models/NutritionPlan.model";

interface IndexProps {
  plans: WorkoutPlanModel[];
  clients: ClientModel[];
  setClients: (client: ClientModel[]) => void;
  nutritionPlans: NutritionPlanModel[];
}

export default function Index({
  plans,
  clients,
  setClients,
  nutritionPlans,
}: IndexProps) {
  return (
    <Clients
      plans={plans}
      clients={clients}
      setClients={setClients}
      nutritionPlans={nutritionPlans}
    />
  );
}
