import React, { useState } from "react";
import {
  Tab,
  Flex,
  Menu,
  Tabs,
  Text,
  Input,
  Image,
  VStack,
  Button,
  TabList,
  TabPanel,
  MenuList,
  MenuItem,
  TabPanels,
  Container,
  MenuButton,
  FormControl,
} from "@chakra-ui/react";
import { NutritionPlanModel } from "models/NutritionPlan.model";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import ModalAddNutritionPlan from "components/modals/modalAddNutritionPlan/ModalAddNutritionPlan";
import ModalAddPlan from "components/modals/modalAddPlan/ModalAddPlan";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";
import ModalShowPdf from "components/modals/modalShowPdf/ModalShowPdf";
import trashIcon from "assets/icons/trashIcon.svg";
import editIcon from "assets/icons/editIcon.svg";
import dotsMenu from "assets/icons/dotsMenu.svg";
import pdfImage from "assets/images/pdfImage.png";
import pdfIcon from "assets/icons/pdfIcon.svg";
import Navbar from "components/navbar/Navbar";

interface PlansProps {
  plans: WorkoutPlanModel[];
  setPlans: (plan: any) => void;
  nutritionPlans: NutritionPlanModel[];
  setNutritionPlans: (plan: any) => void;
}

export default function Plans({
  plans,
  setPlans,
  nutritionPlans,
  setNutritionPlans,
}: PlansProps) {
  const [pdfType, setPdfType] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [modalShowPdf, setModalShowPdf] = useState<boolean>(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [modalAddWorkoutPlan, setModalAddWorkoutPlan] =
    useState<boolean>(false);
  const [modalAddNutritionPlan, setModalAddNutritionPlan] =
    useState<boolean>(false);
  const [planSelected, setPlanSelected] = useState<
    WorkoutPlanModel | NutritionPlanModel | null
  >(null);

  const handleOpenModalShowPdf = (
    plan: WorkoutPlanModel | NutritionPlanModel,
    type: string
  ) => {
    setPdfType(type);
    setPlanSelected(plan);
    setModalShowPdf(true);
  };

  const handleCloseModalShowPdf = () => {
    setPdfType("");
    setPlanSelected(null);
    setModalShowPdf(false);
  };

  const handleOpenModalEditWorkoutPlan = (plan: WorkoutPlanModel) => {
    setPlanSelected(plan);
    setModalAddWorkoutPlan(true);
  };

  const handleOpenModalEditNutritionPlan = (plan: NutritionPlanModel) => {
    setPlanSelected(plan);
    setModalAddNutritionPlan(true);
  };

  const handleOpenModalCofirm = (
    plan: WorkoutPlanModel | NutritionPlanModel
  ) => {
    setPlanSelected(plan);
    setModalConfirm(true);
  };

  const handleDeletePlan = () => {
    if (planSelected!.type === "nutrition") {
      setNutritionPlans(
        nutritionPlans.filter((obj: any) => obj.id !== planSelected!.id)
      );
    } else {
      setPlans(plans.filter((obj: any) => obj.id !== planSelected!.id));
    }
    setModalConfirm(false);
    setPlanSelected(null);
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
            <Tab border="none" onClick={() => setSearchBarValue("")}>
              Entrenamiento
            </Tab>
            <Tab border="none" onClick={() => setSearchBarValue("")}>
              Nutricionales
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <Container
                p="5"
                borderRadius="md"
                maxW="container.xl"
                bg="background.primary"
                shadow="brand_shadow_lg"
              >
                <Flex flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl
                    mr={{ base: "0", sm: "2" }}
                    mb={{ base: "2", sm: "0" }}
                  >
                    <Input
                      bg="background.primary"
                      placeholder="Buscar plan por nombre"
                      value={searchBarValue}
                      onChange={(e) => setSearchBarValue(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    variant="primary"
                    shadow="md"
                    onClick={() => setModalAddWorkoutPlan(true)}
                  >
                    Nuevo plan
                  </Button>
                </Flex>
                <Flex
                  py="5"
                  flexWrap="wrap"
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  {plans
                    ?.filter((plan: WorkoutPlanModel) => {
                      if (!searchBarValue) {
                        return plan;
                      } else {
                        return plan.name
                          .toLowerCase()
                          .includes(searchBarValue.toLowerCase());
                      }
                    })
                    .map((plan: WorkoutPlanModel, index: number) => {
                      return (
                        <VStack
                          p="5"
                          m="5"
                          key={index}
                          w={{
                            base: "100%",
                            sm: "60%",
                            md: "40%",
                            lg: "28%",
                            xl: "20%",
                          }}
                          shadow="lg"
                          spacing="4"
                          borderRadius="sm"
                          alignItems="center"
                          bg="background.secondary"
                          justifyContent="flex-start"
                          onDoubleClick={() =>
                            handleOpenModalShowPdf(plan, "workout")
                          }
                        >
                          <Flex justifyContent="flex-end" w="100%">
                            <Menu>
                              <MenuButton fontSize="2xl">
                                <Image src={dotsMenu.src} />
                              </MenuButton>
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenModalShowPdf(plan, "workout")
                                  }
                                >
                                  <Image src={pdfIcon.src} pr="5" />
                                  Ver
                                </MenuItem>
                                {!plan.hasFile ? (
                                  <MenuItem
                                    onClick={() =>
                                      handleOpenModalEditWorkoutPlan(plan)
                                    }
                                  >
                                    <Image src={editIcon.src} pr="5" />
                                    Editar
                                  </MenuItem>
                                ) : null}

                                <MenuItem
                                  onClick={() => handleOpenModalCofirm(plan)}
                                >
                                  <Image src={trashIcon.src} pr="5" />
                                  Eliminar
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Flex>
                          <Image src={pdfImage.src} width="28" />
                          <Text
                            fontWeight="600"
                            fontSize="lg"
                            textAlign="center"
                          >
                            {plan.name}
                          </Text>
                        </VStack>
                      );
                    })}
                </Flex>
              </Container>
            </TabPanel>
            <TabPanel p="0">
              <Container
                p="5"
                borderRadius="md"
                maxW="container.xl"
                bg="background.primary"
                shadow="brand_shadow_lg"
              >
                <Flex flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl
                    mr={{ base: "0", sm: "2" }}
                    mb={{ base: "2", sm: "0" }}
                  >
                    <Input
                      value={searchBarValue}
                      bg="background.primary"
                      placeholder="Buscar plan por nombre"
                      onChange={(e) => setSearchBarValue(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    shadow="md"
                    variant="primary"
                    onClick={() => setModalAddNutritionPlan(true)}
                  >
                    Nuevo plan
                  </Button>
                </Flex>
                <Flex
                  py="5"
                  flexWrap="wrap"
                  justifyContent={{ base: "center", lg: "flex-start" }}
                >
                  {nutritionPlans
                    ?.filter((plan: NutritionPlanModel) => {
                      if (!searchBarValue) {
                        return plan;
                      } else {
                        return plan.name
                          .toLowerCase()
                          .includes(searchBarValue.toLowerCase());
                      }
                    })
                    .map((plan: NutritionPlanModel, index: number) => {
                      return (
                        <VStack
                          p="5"
                          m="5"
                          key={index}
                          w={{
                            sm: "60%",
                            md: "40%",
                            lg: "28%",
                            xl: "20%",
                            base: "100%",
                          }}
                          shadow="lg"
                          spacing="4"
                          borderRadius="sm"
                          alignItems="center"
                          bg="background.secondary"
                          justifyContent="flex-start"
                          onDoubleClick={() =>
                            handleOpenModalShowPdf(plan, "nutrition")
                          }
                        >
                          <Flex justifyContent="flex-end" w="100%">
                            <Menu>
                              <MenuButton fontSize="2xl">
                                <Image src={dotsMenu.src} />
                              </MenuButton>
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenModalShowPdf(plan, "nutrition")
                                  }
                                >
                                  <Image src={pdfIcon.src} pr="5" />
                                  Ver
                                </MenuItem>
                                {!plan.hasFile ? (
                                  <MenuItem
                                    onClick={() =>
                                      handleOpenModalEditNutritionPlan(plan)
                                    }
                                  >
                                    <Image src={editIcon.src} pr="5" />
                                    Editar
                                  </MenuItem>
                                ) : null}
                                <MenuItem
                                  onClick={() => handleOpenModalCofirm(plan)}
                                >
                                  <Image src={trashIcon.src} pr="5" />
                                  Eliminar
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Flex>
                          <Image src={pdfImage.src} width="28" />
                          <Text
                            fontSize="lg"
                            fontWeight="600"
                            textAlign="center"
                          >
                            {plan.name}
                          </Text>
                        </VStack>
                      );
                    })}
                </Flex>
              </Container>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      {modalAddWorkoutPlan ? (
        <ModalAddPlan
          plans1={plans}
          setPlans={setPlans}
          planSelected={planSelected}
          isModalOpen={modalAddWorkoutPlan}
          setPlanSelected={setPlanSelected}
          onClose={() => {
            setPlanSelected(null);
            setModalAddWorkoutPlan(false);
          }}
        />
      ) : null}
      {modalAddNutritionPlan ? (
        <ModalAddNutritionPlan
          planSelected={planSelected}
          isOpen={modalAddNutritionPlan}
          nutritionPlans={nutritionPlans}
          setPlanSelected={setPlanSelected}
          setNutritionPlans={setNutritionPlans}
          onClose={() => {
            setPlanSelected(null);
            setModalAddNutritionPlan(false);
          }}
        />
      ) : null}
      {modalShowPdf ? (
        <ModalShowPdf
          type={pdfType}
          plan={planSelected}
          isOpen={modalShowPdf}
          onClose={handleCloseModalShowPdf}
        />
      ) : null}
      {modalConfirm ? (
        <ModalConfirm
          isOpen={modalConfirm}
          onSubmit={handleDeletePlan}
          onClose={() => setModalConfirm(false)}
          buttons={{ cancel: "Cancelar", confirm: "Eliminar" }}
          body={`Estás seguro que deseas eliminar el plan ${planSelected?.name}`}
        />
      ) : null}
    </Container>
  );
}
