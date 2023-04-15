import React from "react";
import {
  Text,
  Modal,
  Input,
  Select,
  Switch,
  Button,
  VStack,
  HStack,
  Divider,
  Textarea,
  FormLabel,
  ModalBody,
  InputGroup,
  FormControl,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  InputLeftAddon,
  ModalCloseButton,
} from "@chakra-ui/react";
import { WalletMovementModel } from "models/WalletMovement.model";
import { ClientModel } from "models/Client.model";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import moment from "moment";

const walletMovementsSchema = Yup.object().shape({
  type: Yup.number().required("*"),
  amount: Yup.string().required("*"),
  reason: Yup.string().required("*"),
  client: Yup.string().when("clientRelated", {
    is: true,
    then: Yup.string().required("*"),
  }),
});

interface ModalConfirmProps {
  isOpen: any;
  clients: Array<ClientModel>;
  typeOfMovement: number;
  onClose: () => void;
  onSubmit: (movement: WalletMovementModel) => void;
}

export default function ModalWalletMovements({
  typeOfMovement,
  isOpen,
  clients,
  onClose,
  onSubmit,
}: ModalConfirmProps) {
  const toast = useToast();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        amount: "",
        reason: "",
        client: "",
        observation: "",
        type: typeOfMovement,
        clientRelated: false,
      },
      onSubmit: (values) => {
        onSubmit({
          ...values,
          date: moment(new Date()).format("DD/MM/YYYY"),
          type: Number(values.type),
          amount: Number(values.amount),
        });
        toast({
          isClosable: true,
          status: "success",
          position: "bottom-right",
          title: "Movimiento creado con éxito",
        });
        onClose();
      },
      validationSchema: walletMovementsSchema,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Nuevo Movimiento</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <VStack spacing="4">
              <HStack w="100%" pt="5">
                <FormControl
                  isInvalid={Boolean(errors.type && touched.type)}
                  mr="5"
                >
                  <FormLabel display="flex" alignItems="center">
                    Movimiento
                    <Text
                      color={
                        Boolean(errors.type && touched.type) ? "red" : "black"
                      }
                      pl="1"
                    >
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    size="sm"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <option value="0">Gasto</option>
                    <option value="1">Ingreso</option>
                  </Select>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.amount && touched.amount)}
                >
                  <FormLabel display="flex" alignItems="center">
                    Monto
                    <Text
                      color={
                        Boolean(errors.amount && touched.amount)
                          ? "red"
                          : "black"
                      }
                      pl="1"
                    >
                      *
                    </Text>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon h="8">$</InputLeftAddon>
                    <Input
                      type="number"
                      name="amount"
                      maxLength={10}
                      value={values.amount}
                      onBlur={handleBlur}
                      size="sm"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
              </HStack>
              <FormControl isInvalid={Boolean(errors.reason && touched.reason)}>
                <FormLabel display="flex" alignItems="center">
                  Motivo
                  <Text
                    color={
                      Boolean(errors.reason && touched.reason) ? "red" : "black"
                    }
                    pl="1"
                  >
                    *
                  </Text>
                </FormLabel>
                <Input
                  name="reason"
                  maxLength={60}
                  value={values.reason}
                  onBlur={handleBlur}
                  size="sm"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Observación</FormLabel>
                <Textarea
                  minH="4rem"
                  maxH="4rem"
                  maxLength={80}
                  name="observation"
                  value={values.observation}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl display="flex">
                <FormLabel>¿Relacionado a un cliente?</FormLabel>
                <Switch
                  colorScheme="brand"
                  name="clientRelated"
                  value={String(values.clientRelated)}
                  onChange={handleChange}
                />
              </FormControl>
              {values.clientRelated ? (
                <FormControl
                  isInvalid={Boolean(errors.client && touched.client)}
                >
                  <FormLabel display="flex" alignItems="center">
                    Cliente
                    <Text
                      color={
                        Boolean(errors.client && touched.client)
                          ? "red"
                          : "black"
                      }
                      pl="1"
                    >
                      *
                    </Text>
                  </FormLabel>
                  <Select
                    name="client"
                    value={values.client}
                    onBlur={handleBlur}
                    size="sm"
                    onChange={handleChange}
                  >
                    {!clients.length ? (
                      <option value="">No tienes clientes</option>
                    ) : (
                      <option value=""></option>
                    )}
                    {clients.map((client: ClientModel, index: number) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="red" mr="3" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => handleSubmit()}
            >
              Agregar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
