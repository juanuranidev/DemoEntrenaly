import React from "react";
import Dashboard from "views/trainer/dashboard/Dashboard";

export default function Index({ clients, trainer, movements }: any) {
  return (
    <Dashboard clients={clients} trainer={trainer} movements={movements} />
  );
}
