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
import { ClientModel } from "models/Client.model";
import rightArrow from "assets/icons/rightArrow.svg";
import leftArrow from "assets/icons/leftArrow.svg";
import moment from "moment";
import { PDFViewer } from "@react-pdf/renderer";
import PlanPdf from "components/pdf/PlanPdf";
import NutritionPlanPdf from "components/pdf/NutritionPlanPdf";
interface ModalShowPdfProps {
  plan: any;
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

export default function ModalShowPdf({
  plan,
  isOpen,
  onClose,
  type,
}: ModalShowPdfProps) {
  const handleRenderPdf = () => {
    if (type === "nutrition") {
      return <NutritionPlanPdf plan={plan} />;
    } else if (type === "workout") {
      return <PlanPdf plan={plan} />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{plan.name}</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <PDFViewer style={{ width: "100%", height: "70vh" }}>
            {handleRenderPdf()}
          </PDFViewer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
