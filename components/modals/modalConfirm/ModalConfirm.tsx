import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Divider,
  ModalFooter,
  Button,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface ModalConfirmProps {
  isOpen: any;
  body: string;
  buttons: any;
  onClose: () => void;
  onSubmit: (object: object) => void;
}

export default function ModalConfirm({
  body,
  isOpen,
  buttons,
  onClose,
  onSubmit,
}: ModalConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Eliminar Cliente</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Text fontSize="lg" pt="5">
            {body}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghostCancel" colorScheme="red" mr="3" onClick={onClose}>
            {buttons.cancel}
          </Button>
          <Button type="submit" colorScheme="red" onClick={onSubmit}>
            {buttons.confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
