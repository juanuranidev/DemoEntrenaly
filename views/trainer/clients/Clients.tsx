import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Flex,
  Input,
  Button,
  TabList,
  useToast,
  TabPanels,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { clientsColumns, formatClientsData } from "./Util";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import { ClientModel } from "models/Client.model";
import ModalClientDetail from "components/modals/modalClientDetail/ModalClientDetail";
import ModalAddClient from "components/modals/modalAddClient/ModalAddClient";
import ReusableTable from "components/reusableTable/ReusableTable";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";
import Navbar from "components/navbar/Navbar";

interface ClientsProps {
  clients: ClientModel[];
  plans: WorkoutPlanModel[];
  setClients: (clients: ClientModel[]) => void;
}

export default function Clients({ clients, setClients, plans }: ClientsProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [modalAddClient, setModalAddClient] = useState<boolean>(false);
  const [clientSelected, setClientSelected] = useState<
    ClientModel | undefined
  >();
  const [modalClientDetail, setModalClientDetail] = useState<boolean>(false);

  const toast = useToast();

  const handleAddClient = (object: ClientModel) => {
    setClients([...clients, { ...object, id: String(new Date()) }]);
    handleCloseModals();
    toast({
      isClosable: true,
      status: "success",
      position: "bottom-right",
      title: "Cliente creado con éxito",
    });
  };

  const handleEditClient = (object: ClientModel) => {
    let newArray = clients.filter(
      (obj: ClientModel) => obj.id !== clientSelected?.id
    );
    setClients([...newArray, { ...object, id: String(new Date()) }]);
    handleCloseModals();
    toast({
      isClosable: true,
      status: "success",
      position: "bottom-right",
      title: "Cliente editado con éxito",
    });
  };

  const handleDeleteClient = () => {
    setClients(
      clients.filter((client: ClientModel) => client.id !== clientSelected?.id)
    );
    setModalConfirm(false);
    setClientSelected(undefined);
    toast({
      isClosable: true,
      status: "success",
      position: "bottom-right",
      title: "Cliente eliminado con éxito",
    });
  };

  const handleOpenModalEditClient = (object: ClientModel) => {
    setIsEditing(true);
    setModalAddClient(true);
    setClientSelected(object);
  };

  const handleOpenModalConfirm = (object: ClientModel) => {
    setClientSelected(object);
    setModalConfirm(true);
  };

  const handleOpenModalClientDetail = (object: ClientModel) => {
    setClientSelected(object);
    setModalClientDetail(true);
  };

  const handleCloseModals = () => {
    setIsEditing(false);
    setModalConfirm(false);
    setModalAddClient(false);
    setModalClientDetail(false);
    setClientSelected(undefined);
  };

  return (
    <Container
      p="0"
      maxW="full"
      bg="background.tertiary"
      minH="calc(100vh - 3rem)"
    >
      <Navbar />
      <Container pt="10" px="0" borderRadius="md" maxW="container.xl">
        <Tabs variant="enclosed-colored" colorScheme="brand">
          <TabList>
            <Tab border="none">Administración</Tab>
          </TabList>
          <TabPanels>
            <Container
              p="5"
              borderRadius="md"
              maxW="container.xl"
              bg="background.primary"
              shadow="brand_shadow_lg"
            >
              <Flex
                alignItems="center"
                flexDirection={{ base: "column", md: "row" }}
              >
                <FormControl
                  mr={{ base: "0", md: "2" }}
                  mb={{ base: "3", md: "0" }}
                >
                  <Input
                    value={searchBarValue}
                    bg="background.primary"
                    placeholder="Buscar cliente por nombre"
                    onChange={(e) => setSearchBarValue(e.target.value)}
                  />
                </FormControl>
                <Button
                  variant="primary"
                  w={{ base: "100%", md: "40" }}
                  onClick={() => setModalAddClient(true)}
                >
                  Nuevo cliente
                </Button>
              </Flex>
              <ReusableTable
                columns={clientsColumns}
                data={formatClientsData(
                  clients,
                  searchBarValue,
                  handleOpenModalConfirm,
                  handleOpenModalEditClient,
                  handleOpenModalClientDetail
                )}
              />
            </Container>
          </TabPanels>
        </Tabs>
      </Container>
      {modalAddClient ? (
        <ModalAddClient
          plans={plans}
          isEditing={isEditing}
          isOpen={modalAddClient}
          onSubmit={handleAddClient}
          onClose={handleCloseModals}
          clientSelected={clientSelected}
          handleEditClient={handleEditClient}
        />
      ) : null}
      {modalConfirm ? (
        <ModalConfirm
          isOpen={modalConfirm}
          onClose={handleCloseModals}
          onSubmit={handleDeleteClient}
          buttons={{ cancel: "Cancelar", confirm: "Eliminar" }}
          body={`¿Está seguro que desea eliminar a ${clientSelected?.name}?`}
        />
      ) : null}
      {modalClientDetail ? (
        <ModalClientDetail
          client={clientSelected}
          isOpen={modalClientDetail}
          onClose={handleCloseModals}
        />
      ) : null}
    </Container>
  );
}
