import {
  Text,
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import horizontalMenu from "assets/icons/horizontalMenu.svg";
import trashIcon from "assets/icons/trashIcon.svg";

export const initialWalletMovementsColumns = [
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
  {
    name: "Cliente",
    textAlign: "center",
  },
  {
    name: "Observación",
    textAlign: "center",
  },
  {
    name: "Opciones",
    textAlign: "center",
  },
];

export const initialWalletMovements = [
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
    client: movement.client ? movement.client : "---",
    observation: movement.observation ? movement.observation : "---",
    options: (
      <Menu>
        <MenuButton>
          <Image src={horizontalMenu.src} w="5" h="5" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => console.log(movement)}>
            <Image src={trashIcon.src} pr="5" />
            Eliminar
          </MenuItem>
        </MenuList>
      </Menu>
    ),
  }));
};

export const initialWalletDate = new Date().toISOString().substring(0, 7);
