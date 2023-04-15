import React, { useState } from "react";
import {
  Box,
  Text,
  Modal,
  Image,
  Input,
  Select,
  Switch,
  Button,
  VStack,
  Divider,
  Tooltip,
  Textarea,
  Collapse,
  FormLabel,
  FormControl,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ClientModel } from "models/Client.model";
import { useFormik } from "formik";
import * as Yup from "yup";
import infoIcon from "assets/icons/infoIcon.svg";

interface ModalAddClientProps {
  isOpen: boolean;
  onClose: () => void;
  plans: any;
  onSubmit: (object: ClientModel) => void;
  isEditing: boolean;
  clientSelected: ClientModel;
  handleEditClient: (object: ClientModel) => void;
}

export default function ModalAddClient({
  plans,
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  clientSelected,
  handleEditClient,
}: ModalAddClientProps) {
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  const { isOpen: open, onOpen, onClose: close } = useDisclosure();

  const addClientSchema = Yup.object().shape({
    name: Yup.string().required("*"),
    category: Yup.string().required("*"),
    subCategory: Yup.string().required("*"),
    email: Yup.string().when("login", {
      is: true,
      then: Yup.string().required("*"),
    }),
    password: Yup.string().when("login", {
      is: true,
      then: Yup.string().required("*"),
    }),
  });

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
      name: clientSelected?.name || "",
      lastName: clientSelected?.lastName || "",
      email: clientSelected?.email || "",
      phone: clientSelected?.phone || "",
      notes: clientSelected?.notes || "",
      password: clientSelected?.password || "",
      category: clientSelected?.category || "",
      subCategory: clientSelected?.subCategory || "",
      planAssigned: clientSelected?.planAssigned || "",
      login: clientSelected?.login || false,
      height: clientSelected?.height || "",
      weight: clientSelected?.weight || "",
      goals: clientSelected?.goals || "",
      injuries: clientSelected?.injuries || "",
      medicalConditions: clientSelected?.medicalConditions || "",
      initialDate: clientSelected?.initialDate || new Date(),
    },
    onSubmit: (values: ClientModel) => {
      resetForm();
      if (isEditing) {
        handleEditClient({ ...values, initialDate: new Date() });
      } else {
        onSubmit({ ...values, initialDate: new Date() });
      }
    },
    validationSchema: addClientSchema,
  });

  const handleRenderOptions = (category: string) => {
    if (category === "entrenamiento") {
      return (
        <Select
          name="subCategory"
          value={values.subCategory}
          onChange={handleChange}
          onBlur={handleBlur}
          size="sm"
        >
          <option value=""></option>
          <option value="Musculación">Musculación</option>
          <option value="Tonificación">Tonificación</option>
        </Select>
      );
    } else if (category === "deporte") {
      return (
        <Select
          name="subCategory"
          value={values.subCategory}
          onChange={handleChange}
          onBlur={handleBlur}
          size="sm"
        >
          <option value=""></option>
          <option value="futbol">Fútbol</option>
          <option value="basquet">Básquet</option>
          <option value="rugby">Rugby</option>
          <option value="hockey">Hockey</option>
          <option value="tenis">Tenis</option>
        </Select>
      );
    } else {
      return (
        <Select
          name="subCategory"
          value={values.subCategory}
          onChange={handleChange}
          onBlur={handleBlur}
          size="sm"
        >
          <option value=""></option>
          <option value="Subida de peso">Subida de peso</option>
          <option value="Disminución de peso">Disminución de peso</option>
        </Select>
      );
    }
  };

  const handleRenderPlansOptions = () => {
    if (!plans.length) {
      return <option>Sin planes para asignar</option>;
    } else {
      return plans.map((plan: any) => (
        <option key={plan.id}>{plan.name} </option>
      ));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {isEditing
              ? `Editar Cliente ${clientSelected.name}`
              : "Nuevo Cliente"}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <VStack spacing="2" p="5">
            <FormControl
              display="flex"
              alignItems="center"
              isInvalid={Boolean(touched.name && errors.name)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Nombre completo
                <Text
                  color={Boolean(errors.name && touched.name) ? "red" : "black"}
                  pl="1"
                >
                  *
                </Text>
              </FormLabel>
              <Input
                p="1"
                name="name"
                type="text"
                maxLength={30}
                value={values.name}
                onBlur={handleBlur}
                size="sm"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              isInvalid={Boolean(touched.email && errors.email && values.login)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Email
                {values.login ? (
                  <Text
                    color={
                      Boolean(errors.email && touched.email) ? "red" : "black"
                    }
                    pl="1"
                  >
                    *
                  </Text>
                ) : null}
              </FormLabel>
              <Input
                p="1"
                name="email"
                type="email"
                maxLength={40}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel width="100%">Celular</FormLabel>
              <Input
                p="1"
                name="phone"
                type="number"
                maxLength={20}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              isInvalid={Boolean(touched.category && errors.category)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Categoría
                <Text
                  color={
                    Boolean(errors.category && touched.category)
                      ? "red"
                      : "black"
                  }
                  pl="1"
                >
                  *
                </Text>
              </FormLabel>
              <Select
                width="100%"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              >
                <option value=""></option>
                <option value="entrenamiento">Entrenamiento</option>
                <option value="nutricion">Nutrición</option>
                <option value="deporte">Deporte</option>
                <option value="personalizado">Personalizado</option>
              </Select>
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              isInvalid={Boolean(touched.subCategory && errors.subCategory)}
            >
              <FormLabel width="100%" display="flex" alignItems="center">
                Sub categoria
                <Text
                  color={
                    Boolean(errors.subCategory && touched.subCategory)
                      ? "red"
                      : "black"
                  }
                  pl="1"
                >
                  *
                </Text>
              </FormLabel>
              {handleRenderOptions(values.category)}
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel width="100%">Plan asignado</FormLabel>
              <Select
                name="planAssigned"
                value={values.planAssigned}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              >
                {!plans.length ? null : (
                  <option key={""}>Sin plan asignado</option>
                )}
                {handleRenderPlansOptions()}
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel width="100%">Notas</FormLabel>
              <Textarea
                p="1"
                maxH="5rem"
                name="notes"
                maxLength={100}
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              />
            </FormControl>
            <Box alignItems="flex-start" w="100%">
              <Button
                variant="link"
                textDecoration="underline"
                onClick={open ? close : onOpen}
              >
                Ficha médica {open ? "-" : "+"}
                {/* <Image src={ open ? upArrowIcon.src : downArrowIcon.src}/>  */}
              </Button>
            </Box>
            <Collapse in={open} animateOpacity style={{ width: "100%" }}>
              <VStack spacing="2">
                <FormControl display="flex" alignItems="center">
                  <FormLabel width="100%">Altura</FormLabel>
                  <Input
                    p="1"
                    name="height"
                    type="text"
                    maxLength={20}
                    value={values.height}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel width="100%">Peso</FormLabel>
                  <Input
                    p="1"
                    name="weight"
                    type="text"
                    maxLength={10}
                    value={values.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel width="100%">Objetivos</FormLabel>
                  <Input
                    p="1"
                    name="goals"
                    type="text"
                    maxLength={50}
                    value={values.goals}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel width="100%">Lesiones</FormLabel>
                  <Textarea
                    p="1"
                    maxH="5rem"
                    name="injuries"
                    maxLength={80}
                    value={values.injuries}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel width="100%">Condiciones médicas</FormLabel>
                  <Textarea
                    p="1"
                    maxH="5rem"
                    name="medicalConditions"
                    maxLength={80}
                    value={values.medicalConditions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
              </VStack>
            </Collapse>
            <Divider my="5 !important" />
            <FormControl display="flex" alignItems="center">
              <FormLabel fontSize="lg" mb="0">
                Login a la página
              </FormLabel>
              <Switch
                name="login"
                value={String(values.login)}
                defaultChecked={values.login}
                onChange={handleChange}
                onBlur={handleBlur}
                size="sm"
              />

              <Tooltip
                isOpen={isLabelOpen}
                label="Crea un usuario para que tus clientes puedan iniciar sesión desde tu página personalizada y descargar su plan."
              >
                <Image
                  src={infoIcon.src}
                  w="5"
                  ml="2"
                  alt={
                    "Crea un usuario para que tus clientes puedan iniciar sesión desde tu página personalizada y descargar su plan."
                  }
                  onMouseEnter={() => setIsLabelOpen(true)}
                  onMouseLeave={() => setIsLabelOpen(false)}
                  onClick={() => setIsLabelOpen(true)}
                />
              </Tooltip>
            </FormControl>
            {values.login ? (
              <React.Fragment>
                <FormControl
                  display="flex"
                  alignItems="center"
                  isInvalid={Boolean(
                    touched.email && errors.email && values.login
                  )}
                >
                  <FormLabel width="100%" display="flex" alignItems="center">
                    Email
                    {values.login ? (
                      <Text
                        color={
                          Boolean(errors.email && touched.email)
                            ? "red"
                            : "black"
                        }
                        pl="1"
                      >
                        *
                      </Text>
                    ) : null}
                  </FormLabel>
                  <Input
                    p="1"
                    name="email"
                    type="email"
                    maxLength={40}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
                <FormControl
                  display="flex"
                  alignItems="center"
                  isInvalid={Boolean(touched.password && errors.password)}
                >
                  <FormLabel width="100%" display="flex" alignItems="center">
                    Contraseña
                    <Text
                      color={
                        Boolean(errors.password && touched.password)
                          ? "red"
                          : "black"
                      }
                      pl="1"
                    >
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    p="1"
                    name="password"
                    type="password"
                    maxLength={20}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                  />
                </FormControl>
              </React.Fragment>
            ) : null}
          </VStack>
          <ModalFooter>
            <Button variant="ghost" colorScheme="red" mr="3" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Agregar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
