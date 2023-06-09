import React from "react";
import {
  Box,
  Text,
  Modal,
  HStack,
  Button,
  VStack,
  Divider,
  Collapse,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import moment from "moment";
import { ClientModel } from "models/Client.model";

interface ModalClientDetailProps {
  client: ClientModel | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalClientDetail({
  client,
  isOpen,
  onClose,
}: ModalClientDetailProps) {
  const { isOpen: open, onOpen, onClose: close } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de {client?.name || ""} </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <VStack spacing="4">
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Nombre:
              </Text>
              <Text>{client?.name || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Email:
              </Text>
              <Text>{client?.email || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Teléfono:
              </Text>
              <Text>{client?.phone || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Categoría:
              </Text>
              <Text>{client?.category || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Sub categoría:
              </Text>
              <Text>{client?.subCategory || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Plan asignado:
              </Text>
              <Text>{client?.planAssigned || ""}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Fecha de creación:
              </Text>
              <Text>{moment(client?.initialDate).format("DD/MM/YYYY")}</Text>
            </HStack>
            <HStack w="100%">
              <Text w="50%" fontWeight="600">
                Notas:
              </Text>
              <Text>{client?.notes || ""}</Text>
            </HStack>
            <Box alignItems="flex-start" w="100%">
              <Button
                variant="link"
                textDecoration="underline"
                onClick={open ? close : onOpen}
              >
                {open ? "Cerrar Ficha Médica" : "Ver Ficha Médica"}
              </Button>
            </Box>
            <Collapse in={open} animateOpacity style={{ width: "100%" }}>
              <VStack spacing="4">
                <HStack w="100%">
                  <Text w="50%" fontWeight="600">
                    Altura:
                  </Text>
                  <Text>{client?.height || ""}</Text>
                </HStack>
                <HStack w="100%">
                  <Text w="50%" fontWeight="600">
                    Peso:
                  </Text>
                  <Text>{client?.weight || ""}</Text>
                </HStack>
                <HStack w="100%">
                  <Text w="50%" fontWeight="600">
                    Objetivos:
                  </Text>
                  <Text>{client?.goals || ""}</Text>
                </HStack>
                <HStack w="100%">
                  <Text w="50%" fontWeight="600">
                    Lesiones:
                  </Text>
                  <Text>{client?.injuries || ""}</Text>
                </HStack>
                <HStack w="100%">
                  <Text w="50%" fontWeight="600">
                    Condiciones médicas:
                  </Text>
                  <Text>{client?.medicalConditions || ""}</Text>
                </HStack>
              </VStack>
            </Collapse>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr="3" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
