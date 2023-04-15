import { Menu, Image, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { ClientModel } from "models/Client.model";
import horizontalMenu from "assets/icons/horizontalMenu.svg";
import trashIcon from "assets/icons/trashIcon.svg";
import infoIcon from "assets/icons/infoIcon.svg";
import editIcon from "assets/icons/editIcon.svg";

export const clientsColumns = [
  {
    name: "Nombre",
    textAlign: "left",
  },
  {
    name: "Categoria",
    textAlign: "left",
  },
  {
    name: "Sub Categoria",
    textAlign: "left",
  },
  {
    name: "Plan",
    textAlign: "center",
  },
  {
    name: "Opciones",
    textAlign: "center",
  },
];

export const formatClientsData = (
  data: ClientModel[],
  searchBarValue: any,
  handleOpenModalConfirm: any,
  handleOpenModalEditClient: any,
  handleOpenModalClientDetail: any
) => {
  if (!data) return null;

  return data
    .filter((client: ClientModel) => {
      if (!searchBarValue) {
        return client;
      } else {
        return client.name.toLowerCase().includes(searchBarValue);
      }
    })
    .map((client: ClientModel) => ({
      name: client.name || "" + client.lastName || "",
      category: client.category,
      subCategory: client.subCategory,
      plan: client.planAssigned,
      menu: (
        <Menu>
          <MenuButton>
            <Image src={horizontalMenu.src} w="5" h="5" />
          </MenuButton>
          <MenuList zIndex="100">
            <MenuItem onClick={() => handleOpenModalClientDetail(client)}>
              <Image src={infoIcon.src} pr="5" />
              Ver detalles
            </MenuItem>
            <MenuItem onClick={() => handleOpenModalEditClient(client)}>
              <Image src={editIcon.src} pr="5" />
              Editar
            </MenuItem>
            <MenuItem onClick={() => handleOpenModalConfirm(client)}>
              <Image src={trashIcon.src} pr="5" />
              Eliminar
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    }));
};
