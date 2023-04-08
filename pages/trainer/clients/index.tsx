import React from "react";
import Clients from "views/trainer/clients/Clients";

export default function Index({ clients, setClients, plans }: any) {
  return <Clients clients={clients} setClients={setClients} plans={plans} />;
}
