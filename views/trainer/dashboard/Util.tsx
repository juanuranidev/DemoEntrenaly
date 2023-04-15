import { WalletMovementModel } from "models/WalletMovement.model";
import { Text } from "@chakra-ui/react";

export const dataForChart = (income: number, expenses: number) => {
  return {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        label: "Cantidad $",
        data: [income, expenses],
        backgroundColor: ["#c9e0fe", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["#8cb8f1", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
    responsive: true,
    maintainAspectRatio: true,
    animation: true,
    offset: true,
  };
};

export const lastWalletMovementsColumns = [
  {
    name: "Fecha",
    textAlign: "center",
  },
  {
    name: "Tipo",
    textAlign: "center",
  },
  {
    name: "Monto",
    textAlign: "center",
  },
  {
    name: "Motivo",
    textAlign: "center",
  },
];

export const lastWalletMovementsData = (movements: WalletMovementModel[]) => {
  if (!movements) return null;

  return movements.map((movement: WalletMovementModel) => ({
    date: movement.date,
    type:
      movement.type === 1 ? (
        <Text color="green" fontWeight="600">
          Entrada
        </Text>
      ) : (
        <Text color="red" fontWeight="600">
          Gasto
        </Text>
      ),
    amount: `$${Number(movement.amount).toLocaleString("ES-ar")}`,
    reason: movement.reason,
  }));
};
