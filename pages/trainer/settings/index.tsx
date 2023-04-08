import React from "react";
import Settings from "views/trainer/settings/Settings";

export default function Index({ trainer, setTrainer }: any) {
  return <Settings trainer={trainer} setTrainer={setTrainer} />;
}
