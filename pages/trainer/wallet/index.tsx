import React from "react";
import Wallet from "views/trainer/wallet/Wallet";

export default function Index({ clients, movements, setMovements }: any) {
  return (
    <Wallet
      clients={clients}
      movements={movements}
      setMovements={setMovements}
    />
  );
}
