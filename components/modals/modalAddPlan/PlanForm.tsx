import React from "react";
import {
  Text,
  Flex,
  Image,
  Button,
  HStack,
  VStack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
import trashIcon from "assets/icons/trashIcon.svg";
import * as Yup from "yup";

interface PlanFormProps {
  onToggle: any;
  setFieldValue: any;
  values: any;
}

export default function PlanForm({
  onToggle,
  setFieldValue,
  values,
}: PlanFormProps) {
  const signupSchema = Yup.object().shape({
    day: Yup.object().shape({
      name: Yup.string().required("*"),
      muscles: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("*"),
          exercises: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("*"),
              sets: Yup.string().required("*"),
              reps: Yup.string().required("*"),
            })
          ),
        })
      ),
    }),
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
      (day) => !values.days.find((objDay: any) => objDay.day.name === day)
    );

    return missingDays.map((missingDay: any, index: number) => (
      <option key={index} value={missingDay}>
        {missingDay}
      </option>
    ));
  };

  return (
    <Formik
      initialValues={{
        day: {
          name: "",
          muscles: [
            {
              name: "",
              exercises: [
                {
                  name: "",
                  sets: "",
                  reps: "",
                  isSuperSet: false,
                },
              ],
            },
          ],
        },
      }}
      onSubmit={(valuesDay, { resetForm }) => {
        // console.log(valuesDay);
        setFieldValue("days", [...values.days, valuesDay]);
        resetForm();
        onToggle();
      }}
      validationSchema={signupSchema}
    >
      {({ values, handleChange, errors, touched, handleSubmit }) => (
        <Form>
          <Flex justifyContent="center" p="2" w="100%">
            <FormControl
              isInvalid={Boolean(touched.day?.name && errors.day?.name)}
            >
              <FormLabel display="flex" alignItems="center" m="0">
                Nombre del día
                {errors.day?.name && touched.day?.name && (
                  <Text color="red">{errors.day?.name}</Text>
                )}
              </FormLabel>
              <Select
                name="day.name"
                placeholder="Nombre del día"
                onChange={handleChange}
                value={values.day.name}
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
          </Flex>
          <FieldArray name={`day.muscles`}>
            {({ push, remove }) => (
              <VStack
                alignItems="flex-start"
                pl={{ base: "5", md: "10" }}
                w="100%"
              >
                {values.day.muscles.map((muscle: any, muscleIndex: number) => (
                  <VStack key={muscleIndex} w="100%">
                    <HStack w="100%" alignItems="flex-end">
                      <FormControl
                        w="10rem"
                        isInvalid={Boolean(
                          touched.day?.muscles?.[muscleIndex]?.name
                        )}
                      >
                        <FormLabel display="flex" m="0">
                          Músculo *
                          {/* {Boolean(
                            touched.day?.muscles && errors.day?.muscles
                          ) ? (
                            <Text color="red">
                              {errors.day?.muscles?.[muscleIndex]?.name}
                            </Text>
                          ) : (
                            <Text>*</Text>
                          )} */}
                        </FormLabel>
                        <Field
                          name={`day.muscles.${muscleIndex}.name`}
                          placeholder="Ej: Pecho"
                          style={{
                            width: "10rem",
                            padding: "0.3rem",
                            borderRadius: "0.25rem",
                            border: "1px solid grey",
                            height: "2.2rem",
                          }}
                        />
                      </FormControl>
                      <Image
                        pb="2"
                        src={trashIcon.src}
                        _hover={{ cursor: "pointer" }}
                        onClick={() => remove(muscleIndex)}
                      />
                    </HStack>
                    <FieldArray name={`day.muscles.${muscleIndex}.exercises`}>
                      {({ push, remove }) => (
                        <VStack
                          w="100%"
                          alignItems="flex-start"
                          pl={{ base: "5", md: "10" }}
                        >
                          {muscle.exercises.map(
                            (exercise: any, exerciseIndex: number) => (
                              <Flex
                                w="100%"
                                key={exerciseIndex}
                                // justifyContent="flex-start"
                                alignItems={{
                                  base: "flex-start",
                                  md: "flex-end",
                                }}
                                flexDirection={{ base: "column", md: "row" }}
                              >
                                <FormControl
                                  w={{ base: "100%", md: "10rem" }}
                                  mr={{ base: "0", md: "2" }}
                                  mb={{ base: "2", md: "0" }}
                                  isInvalid={Boolean(
                                    touched.day?.muscles?.[muscleIndex]
                                      ?.exercises?.[exerciseIndex]?.name
                                  )}
                                >
                                  <FormLabel
                                    display="flex"
                                    alignItems="flex-end"
                                    m="0"
                                  >
                                    Ejercicio *
                                    {/* {Boolean(
                                      touched.day?.muscles?.[muscleIndex]
                                        ?.exercises?.[exerciseIndex]?.name
                                    ) ? (
                                      <Text color="red">
                                        {
                                          errors.day?.muscles?.[muscleIndex]
                                            ?.exercises?.[exerciseIndex]?.name
                                        }
                                      </Text>
                                    ) : (
                                      <Text> *</Text>
                                    )} */}
                                  </FormLabel>
                                  <Field
                                    name={`day.muscles.${muscleIndex}.exercises.${exerciseIndex}.name`}
                                    placeholder="Ej: Press Banca"
                                    style={{
                                      width: "100%",
                                      padding: "0.3rem",
                                      borderRadius: "0.25rem",
                                      border: "1px solid grey",
                                      height: "2.2rem",
                                    }}
                                  />
                                </FormControl>
                                <Flex w={{ base: "100%", md: "13rem" }}>
                                  <FormControl
                                    w={{ base: "50%", md: "6rem" }}
                                    mr="2"
                                    mb={{ base: "2", md: "0" }}
                                    isInvalid={Boolean(
                                      touched.day?.muscles?.[muscleIndex]
                                        ?.exercises?.[exerciseIndex]?.sets
                                    )}
                                  >
                                    <FormLabel
                                      display="flex"
                                      alignItems="flex-end"
                                      m="0"
                                    >
                                      Sets *
                                      {/* {Boolean(
                                        touched.day?.muscles?.[muscleIndex]
                                          ?.exercises?.[exerciseIndex]?.sets
                                      ) ? (
                                        <Text color="red">
                                          {
                                            errors.day?.muscles?.[muscleIndex]
                                              ?.exercises?.[exerciseIndex]?.sets
                                          }
                                        </Text>
                                      ) : (
                                        <Text>*</Text>
                                      )} */}
                                    </FormLabel>
                                    <Field
                                      name={`day.muscles.${muscleIndex}.exercises.${exerciseIndex}.sets`}
                                      type="text"
                                      placeholder="Ej: 4"
                                      style={{
                                        width: "100%",
                                        padding: "0.3rem",
                                        borderRadius: "0.25rem",
                                        border: "1px solid grey",
                                        height: "2.2rem",
                                      }}
                                    />
                                  </FormControl>
                                  <FormControl
                                    w={{ base: "50%", md: "6rem" }}
                                    mr={{ base: "0", md: "2" }}
                                    mb={{ base: "2", md: "0" }}
                                    isInvalid={Boolean(
                                      touched.day?.muscles?.[muscleIndex]
                                        ?.exercises?.[exerciseIndex]?.sets
                                    )}
                                  >
                                    <FormLabel
                                      display="flex"
                                      alignItems="flex-end"
                                      m="0"
                                    >
                                      Reps *
                                      {/* {Boolean(
                                        touched.day?.muscles?.[muscleIndex]
                                          ?.exercises?.[exerciseIndex]?.reps
                                      ) ? (
                                        <Text color="red">
                                          {
                                            errors.day?.muscles?.[muscleIndex]
                                              ?.exercises?.[exerciseIndex]?.reps
                                          }
                                        </Text>
                                      ) : (
                                        <Text>*</Text>
                                      )} */}
                                    </FormLabel>
                                    <Field
                                      name={`day.muscles.${muscleIndex}.exercises.${exerciseIndex}.reps`}
                                      type="text"
                                      placeholder="Ej: 12"
                                      style={{
                                        width: "100%",
                                        padding: "0.3rem",
                                        borderRadius: "0.25rem",
                                        border: "1px solid grey",
                                        height: "2.2rem",
                                      }}
                                    />
                                  </FormControl>
                                </Flex>
                                <Flex
                                  mt={{ base: "2", md: "0" }}
                                  alignItems="flex-start"
                                >
                                  <HStack mr="2" mb={{ base: "2", md: "0" }}>
                                    <Field
                                      name={`day.muscles.${muscleIndex}.exercises.${exerciseIndex}.isSuperSet`}
                                      type="checkbox"
                                      placeholder="superserie"
                                    />
                                    <Text>Super serie</Text>
                                  </HStack>
                                  <Image
                                    //  pb="2"
                                    mb={{ base: "5", md: "0" }}
                                    src={trashIcon.src}
                                    _hover={{ cursor: "pointer" }}
                                    onClick={() => remove(exerciseIndex)}
                                  />
                                </Flex>
                              </Flex>
                            )
                          )}
                          <Button
                            variant="link"
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                sets: "",
                                reps: "",
                                isSuperSet: false,
                              })
                            }
                          >
                            + Nuevo ejercicio
                          </Button>
                        </VStack>
                      )}
                    </FieldArray>
                  </VStack>
                ))}
                <Button
                  variant="link"
                  type="button"
                  onClick={() =>
                    push({
                      name: "",
                      exercises: [
                        {
                          name: "",
                          sets: "",
                          reps: "",
                          isSuperSet: false,
                        },
                      ],
                    })
                  }
                >
                  + Nuevo músculo
                </Button>
              </VStack>
            )}
          </FieldArray>
          <Flex w="100%" justifyContent="center" p="2">
            <Button
              type="submit"
              w="100%"
              colorScheme="green"
              onClick={(e: any) => handleSubmit(e)}
            >
              Agregar al plan
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
