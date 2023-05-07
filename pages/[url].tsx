import React from "react";
import Url from "views/public/Url";
import { TrainerModel } from "models/Trainer.model";

interface IndexProps {
  trainer: TrainerModel;
}

export default function Index({ trainer }: IndexProps) {
  return <Url trainer={trainer} />;
}
