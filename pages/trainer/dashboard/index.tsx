import React from "react";
import Dashboard from "views/trainer/dashboard/Dashboard";

export default function Index({ clients, trainer }: any) {
  return <Dashboard clients={clients} trainer={trainer} />;
}
