import React, { useState } from "react";
import {
  Box,
  Flex,
  Stat,
  Input,
  Button,
  Divider,
  Heading,
  Container,
  StatNumber,
  ButtonGroup,
  FormControl,
  StatHelpText,
} from "@chakra-ui/react";
import {
  initialWalletDate,
  lastWalletMovementsData,
  initialWalletMovementsColumns,
} from "views/trainer/wallet/Util";
import {
  handleGetTotalWalletIncome,
  handleGetTotalWalletExpenses,
} from "util/wallet";
import { WalletMovementModel } from "models/WalletMovement.model";
import ModalWalletMovements from "components/modals/modalWalletMovements/ModalWalletMovements";
import ReusableTable from "components/reusableTable/ReusableTable";
import moment from "moment";
import Navbar from "components/navbar/Navbar";
import "moment/locale/es";

export default function Wallet({ clients, movements, setMovements }: any) {
  const [selectedDate, setSelectedDate] = useState(initialWalletDate);
  const [typeOfMovement, setTypeOfMovement] = useState<number>(0);
  const [modalWalletMovements, setModalWalletMovements] = useState(false);

  const handleOpenModalWalletMovements = (type: number) => {
    setTypeOfMovement(type);
    setModalWalletMovements(true);
  };

  const handleSubmitWalletMovement = (movement: WalletMovementModel) => {
    setMovements([...movements, movement]);
  };

  const handleChangeWalletDate = (e: any) => {
    const value = e.target.value;
    const newDate = new Date(`${value}-01`);

    if (!isNaN(newDate.getTime())) {
      setSelectedDate(value);
    }
  };

  return (
    <Container
      p="0"
      maxW="full"
      bg="background.tertiary"
      minH="calc(100vh - 3rem)"
    >
      <Navbar />
      <Container
        pb="5"
        pt="10"
        px="0"
        borderRadius="md"
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Box
          py="2"
          px="5"
          mb="5"
          display="flex"
          borderRadius="md"
          alignItems="center"
          bg="background.primary"
          justifyContent="flex-end"
          shadow="brand_shadow_md"
          w={{ base: "100%", md: "20rem" }}
        >
          <Heading size="sm" mr="5">
            MES
          </Heading>
          <FormControl>
            <Input
              type="month"
              value={selectedDate}
              onChange={handleChangeWalletDate}
              placeholder="MM/YYYY"
            />
          </FormControl>
        </Box>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          w="100%"
          justifyContent="space-between"
        >
          <Box
            py="2"
            px="5"
            h="100%"
            borderRadius="md"
            maxW="container.xl"
            bg="background.primary"
            shadow="brand_shadow_md"
            mb={{ base: "5", md: "0" }}
            justifyContent="space-between"
            w={{ base: "100%", md: "20rem" }}
            onClick={() => handleOpenModalWalletMovements(0)}
          >
            <Heading size="sm" mb="1">
              GASTOS TOTALES
            </Heading>
            <Stat>
              <StatNumber color="red">
                -$
                {handleGetTotalWalletExpenses(movements).toLocaleString(
                  "ES-ar"
                )}
              </StatNumber>
              <StatHelpText>
                Mes de {moment(selectedDate).format("MMMM - yyyy")}
              </StatHelpText>
            </Stat>
          </Box>
          <Box
            py="2"
            px="5"
            h="100%"
            borderRadius="md"
            maxW="container.xl"
            bg="background.primary"
            shadow="brand_shadow_md"
            mb={{ base: "5", md: "0" }}
            w={{ base: "100%", md: "20rem" }}
            onClick={() => handleOpenModalWalletMovements(1)}
          >
            <Heading size="sm " mb="1">
              INGRESOS TOTALES
            </Heading>
            <Stat w="100%">
              <StatNumber color="green">
                ${handleGetTotalWalletIncome(movements).toLocaleString("ES-ar")}
              </StatNumber>
              <StatHelpText>
                Mes de {moment(selectedDate).format("MMMM - yyyy")}
              </StatHelpText>
            </Stat>
          </Box>
        </Flex>
      </Container>
      <Container
        p="5"
        borderRadius="md"
        maxW="container.xl"
        bg="background.primary"
        shadow="brand_shadow_lg"
      >
        <ButtonGroup w="100%" justifyContent="space-between">
          <Button
            colorScheme="red"
            shadow="md"
            w={{ base: "50%", sm: "10rem" }}
            onClick={() => handleOpenModalWalletMovements(0)}
          >
            - Añadir Gasto
          </Button>
          <Button
            colorScheme="green"
            shadow="md"
            w={{ base: "50%", sm: "10rem" }}
            onClick={() => handleOpenModalWalletMovements(1)}
          >
            + Añadir Ingreso
          </Button>
        </ButtonGroup>
        <Divider my="5" />
        <ReusableTable
          columns={initialWalletMovementsColumns}
          data={lastWalletMovementsData(movements)}
        />
      </Container>
      {modalWalletMovements ? (
        <ModalWalletMovements
          clients={clients}
          isOpen={modalWalletMovements}
          typeOfMovement={typeOfMovement}
          onSubmit={(movement: WalletMovementModel) =>
            handleSubmitWalletMovement(movement)
          }
          onClose={() => setModalWalletMovements(false)}
        />
      ) : null}
    </Container>
  );
}
