import { useEffect, useState } from "react";
import {
  clientsInitialValue,
  trainerInitialValue,
  initialWalletMovements,
  workoutPlansInitialValue,
  nutritionPlansInitialValue,
} from "util/initialValues";
import { WalletMovementModel } from "models/WalletMovement.model";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { hotjarConnect } from "config/hotjar";
import { ClientModel } from "models/Client.model";
import { chakraTheme } from "../assets/chakra/chakraTheme";
import Footer from "components/footer/Footer";
import Head from "next/head";
import "assets/css/base.css";

export default function App({ Component, pageProps }: AppProps) {
  const [plans, setPlans] = useState([workoutPlansInitialValue]);
  const [clients, setClients] = useState<ClientModel[]>([clientsInitialValue]);
  const [trainer, setTrainer] = useState(trainerInitialValue);
  const [movements, setMovements] = useState<WalletMovementModel[]>(
    initialWalletMovements
  );
  const [nutritionPlans, setNutritionPlans] = useState([
    nutritionPlansInitialValue,
  ]);

  useEffect(() => {
    hotjarConnect();
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      <Head>
        <title>Entrenaly Demo</title>
        <meta name="description" content="Haciendo crecer tu clientela" />
        <link rel="icon" href="/dumbell.ico" />
      </Head>
      <Component
        {...pageProps}
        plans={plans}
        trainer={trainer}
        clients={clients}
        setPlans={setPlans}
        movements={movements}
        setTrainer={setTrainer}
        setClients={setClients}
        setMovements={setMovements}
        nutritionPlans={nutritionPlans}
        setNutritionPlans={setNutritionPlans}
      />
      <Footer />
    </ChakraProvider>
  );
}
