import React from "react";
import {
  dataForChart,
  lastWalletMovements,
  lastWalletMovementsData,
  lastWalletMovementsColumns,
} from "views/trainer/dashboard/Util";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Stat, Heading, Container, StatNumber } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Pie } from "react-chartjs-2";
import Navbar from "components/navbar/Navbar";
import ReusableTable from "components/reusableTable/ReusableTable";

export default function Dashboard({ clients, trainer }: any) {
  const router = useRouter();
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Container maxW="full" minH="100vh" bg="background.tertiary" p="0">
      <Navbar />
      <Container
        pt="5"
        px="0"
        borderRadius="md"
        maxW="container.xl"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Container
          p="5"
          w="100%"
          mr="5"
          mb={{ base: "5", md: "0" }}
          display="flex"
          alignContent="center"
          justifyContent={{ base: "center", md: "flex-start" }}
          borderRadius="md"
          maxW="container.xl"
          bg="brand.500"
          color="#ffffff"
          shadow="brand_shadow_md"
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
          onClick={() => router.push("/trainer/wallet")}
          _hover={{ cursor: "pointer" }}
          shadow="brand_shadow_md"
          mb={{ base: "5", md: "0" }}
          w={{ base: "100%", md: "25rem" }}
        >
          <Heading size="sm">INGRESOS ESTE MES</Heading>
          <Stat>
            <StatNumber color="green">$35.500</StatNumber>
          </Stat>
        </Container>
        <Container
          p="5"
          borderRadius="md"
          maxW="container.xl"
          bg="background.primary"
          onClick={() => router.push("/trainer/clients")}
          _hover={{ cursor: "pointer" }}
          shadow="brand_shadow_md"
          mb={{ base: "5", md: "0" }}
          w={{ base: "100%", md: "25rem" }}
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
          shadow="brand_shadow_lg"
          w={{ base: "100%", md: "70%" }}
          mr="5"
          mb={{ base: "5", md: "0" }}
          display="flex"
          alignContent="center"
          justifyContent="flex-start"
          borderRadius="md"
          maxW="container.xl"
          bg="background.primary"
          flexDirection="column"
        >
          <Heading size="sm">ULTIMOS MOVIMIENTOS DE BILLETERA</Heading>
          <ReusableTable
            columns={lastWalletMovementsColumns}
            data={lastWalletMovementsData(lastWalletMovements)}
          />
        </Container>
        <Container
          p="5"
          shadow="brand_shadow_lg"
          w={{ base: "100%", md: "30%" }}
          mb={{ base: "5", md: "0" }}
          display="flex"
          alignContent="center"
          justifyContent="flex-start"
          borderRadius="md"
          maxW="container.xl"
          bg="background.primary"
          flexDirection="column"
        >
          <Heading size="sm" mb="5">
            TOTAL ESTE MES
          </Heading>
          <Pie data={dataForChart} />
        </Container>
      </Container>
    </Container>
  );
}
