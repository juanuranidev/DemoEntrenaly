import { Text } from "@chakra-ui/react";

export const dataForChart = {
  labels: ["Ingresos", "Gastos"],
  datasets: [
    {
      label: "Cantidad $",
      data: [24500, 5000],
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

export const lastWalletMovements = [
  {
    type: 1,
    amount: 2500,
    reason: "Pago de plan Diciembre",
    clientRelated: true,
    client: "Agustin",
    observation: "",
    date: "20/01/2023",
  },
  {
    type: 1,
    amount: 3000,
    reason: "Entrenamiento personalizado",
    clientRelated: true,
    client: "Carlos",
    observation: "Se realizó en la casa del cliente",
    date: "20/01/2023",
  },
  {
    type: 0,
    amount: 500,
    reason: "Gasto de transporte",
    clientRelated: true,
    client: "Esteban",
    observation: "Gasto de taxi hasta la casa del cliente",
    date: "20/01/2023",
  },
  {
    type: 1,
    amount: 2500,
    reason: "Pago de plan Diciembre",
    clientRelated: true,
    client: "Juan",
    observation: "",
    date: "20/01/2023",
  },
  {
    type: 1,
    amount: 2500,
    reason: "Pago de plan Enero",
    clientRelated: true,
    client: "Nico",
    observation: "",
    date: "20/01/2023",
  },
];

export const lastWalletMovementsData = (movements: any) => {
  if (!movements) return null;

  return movements.map((movement: any) => ({
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
