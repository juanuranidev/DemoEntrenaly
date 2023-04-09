export const handleGetTotalWalletExpenses = (movements) => {
  let totalExpenses = 0;

  movements.forEach((movement) => {
    totalExpenses += movement.type === 0 ? movement.amount : null;
  });

  return totalExpenses;
};

export const handleGetTotalWalletIncome = (movements) => {
  let totalIncome = 0;

  movements.forEach((movement) => {
    totalIncome += movement.type === 1 ? movement.amount : null;
  });

  return totalIncome;
};
