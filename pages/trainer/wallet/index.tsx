import React from "react";
import Wallet from "views/trainer/wallet/Wallet";
import { ClientModel } from "models/Client.model";
import { WalletMovementModel } from "models/WalletMovement.model";

interface IndexProps {
  clients: ClientModel[];
  movements: WalletMovementModel[];
  setMovements: (movements: WalletMovementModel) => void;
}

export default function Index({
  clients,
  movements,
  setMovements,
}: IndexProps) {
  return (
    <Wallet
      clients={clients}
      movements={movements}
      setMovements={setMovements}
    />
  );
}
