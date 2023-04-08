import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Flex,
  Text,
  Input,
  Modal,
  VStack,
  Button,
  TabList,
  Divider,
  TabPanel,
  Collapse,
  ModalBody,
  TabPanels,
  FormLabel,
  ModalFooter,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import NutritionPlanForm from "./NutritionPlanForm";
import NutritionDayInfo from "./NutritionDayInfo";

interface ModalAddNutritionPlanProps {
  isOpen: any;
  onClose: () => void;
  setPlanSelected: any;
  planSelected: any;
  nutritionPlans: any;
  setNutritionPlans: any;
}

export default function ModalAddNutritionPlan({
  isOpen,
  onClose,
  planSelected,
  nutritionPlans,
  setNutritionPlans,
}: ModalAddNutritionPlanProps) {
  const [tabView, setTabView] = useState(0);
  const { isOpen: isNutritionPlanFormOpen, onToggle } = useDisclosure();
  const handleTabsChange = (index: any) => setTabView(index);

  const nutritionPlanSchema = Yup.object().shape({
    name: Yup.string().required("*"),
  });
  console.log(planSelected)
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: planSelected ? planSelected.name : "",
      days: planSelected ? planSelected.days : [],
      hasFile: false,
      file: "",
      type: "nutrition",
    },
    onSubmit: (values: any) => {
      if (planSelected) {
        const arrawWithout = nutritionPlans.filter(
          (plann: any) => plann.id !== planSelected.id
        );
        const arrayWith = [...arrawWithout, values];

        setNutritionPlans(arrayWith);
      } else {
        setNutritionPlans([
          ...nutritionPlans,
          {
            ...values,
            file: tabView ? values.file : null,
            hasFile: tabView ? true : false,
            id: moment().format("MMMM Do YYYY, h:mm:ss a"),
          },
        ]);
      }
      onClose();
    },
    validationSchema: nutritionPlanSchema,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Plan Nutricional</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Tabs
              isFitted
              variant="enclosed"
              colorScheme="brand"
              index={tabView}
              onChange={handleTabsChange}
            >
              <TabList>
                <Tab>Crear mi plan</Tab>
                <Tab>Subir mi plan</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px="0">
                  <VStack spacing="5">
                    <Alert status="info" display={{ base: "flex", md: "none" }}>
                      <AlertIcon />
                      El armado de planes es recomendados en computadoras
                    </Alert>
                    <FormControl
                      isInvalid={Boolean(touched.name && errors.name)}
                    >
                      <FormLabel display="flex" alignItems="center">
                        Nombre del plan
                        <Text
                          color={
                            Boolean(touched.name && errors.name)
                              ? "red"
                              : "black"
                          }
                          pl="1"
                        >
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        name="name"
                        value={values.name}
                        size="sm"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      w="100%"
                    >
                      <Button onClick={onToggle} variant="primary" w="100%">
                        {isNutritionPlanFormOpen
                          ? "Cerrar Formulario"
                          : "Agregar Nuevo Día"}
                      </Button>
                    </Flex>
                    <Collapse
                      in={isNutritionPlanFormOpen}
                      animateOpacity
                      style={{ width: "100%" }}
                    >
                      <NutritionPlanForm
                        valuesGeneral={values}
                        onToggle={onToggle}
                        setFieldValue={setFieldValue}
                      />
                    </Collapse>
                    {values.days.map((day: any, index: number) => {
                      return (
                        <NutritionDayInfo
                          key={index}
                          day={day}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      );
                    })}
                    {!values.days.length ? (
                      <Text color="red">Agrega al menos un día</Text>
                    ) : null}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing="5">
                    <FormControl
                      isInvalid={Boolean(touched.name && errors.name)}
                    >
                      <FormLabel display="flex" alignItems="center">
                        Nombre del plan
                        <Text
                          color={
                            Boolean(touched.name && errors.name)
                              ? "red"
                              : "black"
                          }
                          pl="1"
                        >
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        name="name"
                        value={values.name}
                        size="sm"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl
                      p="3"
                      borderRadius="md"
                      border="1px solid lightgrey"
                      bg="background.secondary"
                      isInvalid={Boolean(touched.file && errors.file)}
                    >
                      <FormLabel display="flex" alignItems="center">
                        Selecciona un archivo
                        <FormErrorMessage color="red">
                          {String(errors.file)}
                        </FormErrorMessage>
                      </FormLabel>
                      <Input
                        p="1"
                        type="file"
                        name="file"
                        border="none"
                        size="sm"
                        onChange={handleChange}
                        value={values.file}
                        accept=".pdf,.png"
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="red" mr="3" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!tabView && !values.days.length}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
