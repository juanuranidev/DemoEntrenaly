import React from "react";
import {
  Text,
  Flex,
  Image,
  Button,
  Input,
  HStack,
  VStack,
  Select,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import trashIcon from "assets/icons/trashIcon.svg";
import * as Yup from "yup";

const nutritionPlanSchema = Yup.object().shape({
    name: Yup.string().required("*"),
});

export default function NutritionPlanForm({
  valuesGeneral,
  onToggle,
  setFieldValue,
}) {
  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      meals: {
        lunch: "",
        dinner: "",
        snacks: "",
        breakfast: "",
        afternoonSnack: "",
      },
    },
    onSubmit: (values) => {
      setFieldValue("days", [...valuesGeneral.days, values]);
      resetForm();
      onToggle();
    },
    validationSchema: nutritionPlanSchema,
  });

  const handleGetDays = () => {
    let days = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    const missingDays = days.filter(
      (day) =>
        !valuesGeneral.days.find((objDay) => objDay.name === day)
    );

    return missingDays.map((missingDay, index) => (
      <option key={index} value={missingDay}>
        {missingDay}
      </option>
    ));
  };
  return (
    <form>
      <VStack justifyContent="center" spacing="5" w="100%">
        <FormControl isInvalid={Boolean(touched.name && errors.name)}>
          <FormLabel display="flex" alignItems="center" m="0">
            Nombre del día{" "}
            <Text
              color={
                Boolean(errors.name && touched.name) ? "red" : "black"
              }
              pl="1"
            >
              *
            </Text>
          </FormLabel>
          <Select
            size="sm"
            name="name"
            placeholder="Nombre del día"
            onChange={handleChange}
            value={values.name}
            style={{
              margin: "auto",
              padding: "0.3rem",
              borderRadius: "0.25rem",
              border: "1px solid grey",
              height: "2.2rem",
            }}
          >
            {handleGetDays()}
          </Select>
        </FormControl>
        <FormControl
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <FormLabel w="60%" textAlign="left">
            Desayuno
          </FormLabel>
          <Textarea
            p="1"
            name="meals.breakfast"
            maxLength={120}
            value={values.meals.breakfast}
            onBlur={handleBlur}
            size="sm"
            maxH="1"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <FormLabel w="60%" textAlign="left">
            Almuerzo
          </FormLabel>
          <Textarea
            p="1"
            name="meals.lunch"
            maxLength={120}
            value={values.meals.lunch}
            onBlur={handleBlur}
            size="sm"
            maxH="1"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <FormLabel w="60%" textAlign="left">
            Merienda
          </FormLabel>
          <Textarea
            p="1"
            name="meals.afternoonSnack"
            maxLength={120}
            value={values.meals.afternoonSnack}
            onBlur={handleBlur}
            size="sm"
            maxH="1"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <FormLabel w="60%" textAlign="left">
            Cena
          </FormLabel>
          <Textarea
            p="1"
            name="meals.dinner"
            maxLength={120}
            value={values.meals.dinner}
            onBlur={handleBlur}
            size="sm"
            maxH="1"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <FormLabel w="60%" textAlign="left">
            Snacks {"(agregados)"}
          </FormLabel>
          <Textarea
            p="1"
            name="meals.snacks"
            maxLength={120}
            value={values.meals.snacks}
            onBlur={handleBlur}
            size="sm"
            maxH="1"
            onChange={handleChange}
          />
        </FormControl>
        <Flex w="100%" justifyContent="center" p="2">
          <Button
            type="submit"
            w="100%"
            colorScheme="green"
            onClick={handleSubmit}
          >
            Agregar al plan
          </Button>
        </Flex>
      </VStack>
    </form>
  );
}
