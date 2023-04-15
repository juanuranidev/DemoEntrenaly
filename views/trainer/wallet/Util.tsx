import {
  Text,
  Menu,
  Image,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import { WalletMovementModel } from "models/WalletMovement.model";
import horizontalMenu from "assets/icons/horizontalMenu.svg";
import trashIcon from "assets/icons/trashIcon.svg";

export const initialWalletDate = new Date().toISOString().substring(0, 7);

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
