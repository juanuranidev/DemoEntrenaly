export type WalletMovementModel = {
  type: number;
  amount: number;
  reason?: string;
  clientRelated: boolean;
  client?: string;
  observation?: string;
  date: string;
};
