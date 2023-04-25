import React from "react";
import {
  Modal,
  Divider,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import { NutritionPlanModel } from "models/NutritionPlan.model";
import { WorkoutPlanModel } from "models/WorkoutPlan.model";
import { PDFViewer } from "@react-pdf/renderer";
import PlanPdf from "components/pdf/PlanPdf";
import NutritionPlanPdf from "components/pdf/NutritionPlanPdf";
interface ModalShowPdfProps {
  plan: WorkoutPlanModel | NutritionPlanModel | null;
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
        <ModalHeader>{plan!.name}</ModalHeader>
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
