import React, { useState } from "react";
import {
  Box,
  Text,
  Modal,
  Input,
  Flex,
  Image,
  Alert,
  Select,
  HStack,
  Button,
  VStack,
  Avatar,
  Divider,
  FormLabel,
  AlertIcon,
  ModalBody,
  IconButton,
  AlertTitle,
  FormControl,
  ButtonGroup,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  AlertDescription,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { ClientModel } from "models/client.model";
import rightArrow from "assets/icons/rightArrow.svg";
import leftArrow from "assets/icons/leftArrow.svg";
import moment from "moment";

interface ModalSendPlanProps {
  clients: ClientModel[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: ClientModel) => void;
}

export default function ModalSendPlan({
  isOpen,
  onClose,
  clients,
  onSubmit,
}: ModalSendPlanProps) {
  // const [isLoading, setIsLoading] = useState(false);
  const [objectSelected, setObjectSelected] = useState(0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enviar plan a {clients[objectSelected].name}</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <VStack spacing="5">
            {!clients[objectSelected].planAssigned ? (
              <Alert status="error" mt="5" w="100%" justifyContent="center">
                <AlertIcon />
                No tiene un plan asignado.
              </Alert>
            ) : (
              <Alert status="success" mt="5" w="100%" justifyContent="center">
                <AlertIcon />
                Puedes enviar el plan.
              </Alert>
            )}
            <Flex
              w="100%"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              mt="5"
            >
              <Avatar
                mr="5"
                size="xl"
                src="https://bit.ly/broken-link"
                name={`${clients[objectSelected].name} ${clients[objectSelected].lastName}`}
              />
              <VStack
                alignItems="flex-start"
                margin="auto"
                spacing="0"
                w={{ base: "100%", md: "60%" }}
              >
                <Text fontWeight="600" fontSize="2xl">
                  {clients[objectSelected].name}
                  {clients[objectSelected].lastName}
                </Text>
                <HStack>
                  <Text w="11rem" fontWeight="600">
                    Fecha de creación:
                  </Text>
                  <Text>
                    {moment(clients[objectSelected].initialDate).format(
                      "DD/MM/YYYY"
                    )}
                  </Text>
                </HStack>
                <HStack>
                  <Text w="11rem" fontWeight="600">
                    Fecha de vencimiento:
                  </Text>
                  <Text>
                    {moment(clients[objectSelected].expiredDate).format(
                      "DD/MM/YYYY"
                    )}
                  </Text>
                </HStack>
                {/* <HStack>
                  <Text w="11rem" fontWeight="600">
                    Categoría:
                  </Text>
                  <Text>{clients[objectSelected].category}</Text>
                </HStack>
                <HStack>
                  <Text w="11rem" fontWeight="600">
                    Sub categoría:
                  </Text>
                  <Text>{clients[objectSelected].subCategory}</Text>
                </HStack> */}
                <HStack>
                  <Text w="11rem" fontWeight="600">
                    Plan seleccionado:
                  </Text>
                  <Text>
                    {clients[objectSelected].planAssigned
                      ? clients[objectSelected].planAssigned
                      : "---"}
                  </Text>
                </HStack>
              </VStack>
            </Flex>
            <Flex w="100%" justifyContent="flex-start">
              <Text fontSize="lg" fontWeight="600">
                Mensaje a enviar:
              </Text>
            </Flex>
            <Textarea
              mt="1 !important"
              disabled
              minH={{ base: "32", md: "24" }}
              maxH={{ base: "32", md: "24" }}
              value={`¡Hola ${clients[objectSelected].name}! Soy Nico tu entrenador, a continuación te dejo tu plan de ${clients[objectSelected].category} - ${clients[objectSelected].subCategory}. Espero que tengas un excelente entrenamiento, cualquier cosa puedes contactarme a +54 3512900942`}
            />
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent={"space-between"}>
          <ButtonGroup
            width="30%"
            justifyContent={objectSelected === 0 ? "flex-end" : ""}
          >
            {objectSelected !== 0 && (
              <IconButton
                width="45%"
                bg="brand.100"
                _hover={{ bg: "#9cc6fd" }}
                _active={{ bg: "#73aefc" }}
                aria-label="Cliente anterior"
                icon={<Image src={leftArrow.src} />}
                onClick={() => setObjectSelected((prev) => prev - 1)}
              />
            )}
            {objectSelected < clients.length - 1 && (
              <IconButton
                width="45%"
                bg="brand.100"
                _hover={{ bg: "#9cc6fd" }}
                _active={{ bg: "#73aefc" }}
                aria-label="Siguiente cliente"
                icon={<Image src={rightArrow.src} />}
                onClick={() => setObjectSelected((prev) => prev + 1)}
              />
            )}
          </ButtonGroup>
          <ButtonGroup w="70%" justifyContent="flex-end">
            <Button
              variant="ghost"
              colorScheme="red"
              // isLoading={isLoading}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              // isLoading={isLoading}
              onClick={() => onSubmit(clients[objectSelected])}
              disabled={!clients[objectSelected].planAssigned}
            >
              Enviar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
