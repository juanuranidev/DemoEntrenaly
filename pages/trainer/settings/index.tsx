import React from "react";
import Settings from "views/trainer/settings/Settings";
import { TrainerModel } from "models/Trainer.model";

interface IndexProps {
  trainer: TrainerModel;
  setTrainer: (trainer: TrainerModel) => void;
}

export default function Index({ trainer, setTrainer }: IndexProps) {
  return <Settings trainer={trainer} setTrainer={setTrainer} />;
}
