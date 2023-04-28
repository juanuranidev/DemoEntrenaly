import React from "react";
import Dashboard from "views/trainer/dashboard/Dashboard";
import { ClientModel } from "models/Client.model";
import { TrainerModel } from "models/Trainer.model";
import { WalletMovementModel } from "models/WalletMovement.model";

interface IndexProps {
  clients: ClientModel[];
  trainer: TrainerModel;
  movements: WalletMovementModel[];
}

export default function Index({ clients, trainer, movements }: IndexProps) {
  return (
    <Dashboard clients={clients} trainer={trainer} movements={movements} />
  );
}
