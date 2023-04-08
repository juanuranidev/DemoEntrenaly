import React from "react";
import Wallet from "views/trainer/wallet/Wallet";

export default function Index({ clients }: any) {
  return <Wallet clients={clients} />;
}
