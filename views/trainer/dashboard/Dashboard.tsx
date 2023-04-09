import React from "react";
import {
  dataForChart,
  lastWalletMovementsData,
  lastWalletMovementsColumns,
} from "views/trainer/dashboard/Util";
import {
  handleGetTotalWalletIncome,
  handleGetTotalWalletExpenses,
} from "util/wallet";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Stat, Heading, Container, StatNumber } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Pie } from "react-chartjs-2";
import Navbar from "components/navbar/Navbar";
import ReusableTable from "components/reusableTable/ReusableTable";

export default function Dashboard({ clients, trainer, movements }: any) {
  const router = useRouter();
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Container
      p="0"
      maxW="full"
      h="calc(100vh - 3rem)"
      bg="background.tertiary"
    >
      <Navbar />
      <Container
        pt="10"
        px="0"
        display="flex"
        borderRadius="md"
        maxW="container.xl"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Container
          p="5"
          mr="5"
          w="100%"
          display="flex"
          bg="brand.500"
          color="#ffffff"
          borderRadius="md"
          maxW="container.xl"
          alignContent="center"
          shadow="brand_shadow_md"
          mb={{ base: "5", md: "0" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Heading
            size={{ base: "2xl", md: "lg" }}
            display="flex"
            alignItems="center"
          >
            ¡Hola {trainer?.name}!
          </Heading>
        </Container>
        <Container
          p="5"
          mr="5"
          borderRadius="md"
          maxW="container.xl"
          bg="background.primary"
          shadow="brand_shadow_md"
          mb={{ base: "5", md: "0" }}
          _hover={{ cursor: "pointer" }}
          w={{ base: "100%", md: "25rem" }}
          onClick={() => router.push("/trainer/wallet")}
        >
          <Heading size="sm">INGRESOS ESTE MES</Heading>
          <Stat>
            <StatNumber color="green">
              ${handleGetTotalWalletIncome(movements).toLocaleString("ES-ar")}
            </StatNumber>
          </Stat>
        </Container>
        <Container
          p="5"
          borderRadius="md"
          maxW="container.xl"
          bg="background.primary"
          shadow="brand_shadow_md"
          mb={{ base: "5", md: "0" }}
          _hover={{ cursor: "pointer" }}
          w={{ base: "100%", md: "25rem" }}
          onClick={() => router.push("/trainer/clients")}
        >
          <Heading size="sm">CLIENTES ACTIVOS</Heading>
          <Stat>
            <StatNumber>{clients.length}</StatNumber>
          </Stat>
        </Container>
      </Container>
      <Container
        pt={{ base: "0", md: "5" }}
        px="0"
        borderRadius="md"
        maxW="container.xl"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Container
          p="5"
          mr="5"
          display="flex"
          borderRadius="md"
          maxW="container.xl"
          alignContent="center"
          flexDirection="column"
          bg="background.primary"
          shadow="brand_shadow_lg"
          justifyContent="flex-start"
          mb={{ base: "5", md: "0" }}
          w={{ base: "100%", md: "70%" }}
        >
          <Heading size="sm">ULTIMOS 5 MOVIMIENTOS DE BILLETERA</Heading>
          <ReusableTable
            columns={lastWalletMovementsColumns}
            data={lastWalletMovementsData(movements.slice(0, 5))}
          />
        </Container>
        <Container
          p="5"
          display="flex"
          borderRadius="md"
          maxW="container.xl"
          alignContent="center"
          flexDirection="column"
          bg="background.primary"
          shadow="brand_shadow_lg"
          justifyContent="flex-start"
          mb={{ base: "5", md: "0" }}
          w={{ base: "100%", md: "30%" }}
        >
          <Heading size="sm" mb="5">
            TOTAL ESTE MES
          </Heading>
          <Pie
            data={dataForChart(
              handleGetTotalWalletIncome(movements),
              handleGetTotalWalletExpenses(movements)
            )}
          />
        </Container>
      </Container>
    </Container>
  );
}
