import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Flex,
  Text,
  Input,
  Modal,
  Alert,
  VStack,
  Button,
  TabList,
  Divider,
  TabPanel,
  Collapse,
  AlertIcon,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import PlanForm from "components/modals/modalAddPlan/PlanForm";
import DayInfo from "./DayInfo";
import moment from "moment";
import * as Yup from "yup";

interface ModalAddPlanProps {
  isModalOpen: any;
  onClose: () => void;
  setPlans: (object: object) => void;
  plans1: any;
  setPlanSelected: any;
  planSelected: any;
}

export default function ModalAddPlan({
  isModalOpen,
  onClose,
  setPlans,
  plans1,
  setPlanSelected,
  planSelected,
}: ModalAddPlanProps) {
  const { isOpen, onToggle } = useDisclosure();
  const [tabView, setTabView] = useState(0);

  const handleTabsChange = (index: any) => setTabView(index);

  const addPlanSchema = Yup.object().shape({
    name: Yup.string().required("*"),
  });

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
    },
    onSubmit: (values: any) => {
      if (planSelected) {
        const arrawWithout = plans1.filter(
          (plann: any) => plann.id !== planSelected.id
        );
        const arrayWith = [...arrawWithout, values];

        setPlans(arrayWith);
      } else {
        setPlans([
          ...plans1,
          {
            ...values,
            file: tabView ? values.file : null,
            hasFile: tabView ? true : false,
            id: moment().format("MMMM Do YYYY, h:mm:ss a"),
          },
        ]);
      }
      setPlanSelected(null);
      onClose();
    },
    validationSchema: addPlanSchema,
  });

  // console.log(values);

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar nuevo plan</ModalHeader>
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
                    <FormControl>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        w="100%"
                      >
                        <FormLabel>Días</FormLabel>
                        <Button onClick={onToggle} variant="primary">
                          {isOpen ? "- Cerrar" : "+ Nuevo Día"}
                        </Button>
                      </Flex>

                      <Collapse
                        in={isOpen}
                        animateOpacity
                        style={{ width: "100%" }}
                      >
                        <PlanForm
                          onToggle={onToggle}
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      </Collapse>
                      {values.days.map((day: any, index: number) => {
                        return (
                          <DayInfo
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
                    </FormControl>
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
