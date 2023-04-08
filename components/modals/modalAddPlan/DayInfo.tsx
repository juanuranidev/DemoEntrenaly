import React from "react";
import {
  Button,
  Text,
  HStack,
  Collapse,
  Image,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import downArrowIcon from "assets/icons/downArrowIcon.svg";
import upArrowIcon from "assets/icons/upArrowIcon.svg";
import trashIcon from "assets/icons/trashIcon.svg";

interface DaytInfoProps {
  day: any;
  values: any;
  setFieldValue: any;
}

export default function DayInfo({ day, setFieldValue, values }: DaytInfoProps) {
  const { isOpen, onToggle } = useDisclosure();

  const handleRemoveDayOfPlan = (dayName: string) => {
    const daysOfPlan = values.days;
    const newDays = daysOfPlan.filter((day: any) => day.day.name !== dayName);

    setFieldValue("days", newDays);
  };

  return (
    <VStack alignItems="flex-start" my="2">
      <HStack w="100%">
        <Button w="100%" onClick={onToggle} variant="outlined">
          {day.day.name}
          {!isOpen ? (
            <Image src={downArrowIcon.src} w="5" />
          ) : (
            <Image src={upArrowIcon.src} w="5" />
          )}
        </Button>
        <Image
          src={trashIcon.src}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleRemoveDayOfPlan(day.day.name)}
        />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack alignItems="flex-start">
          {day.day.muscles.map((x: any, index: number) => {
            return (
              <VStack alignItems="flex-start" key={index}>
                <Text pl="5" fontWeight="700">
                  {x.name}
                </Text>
                {x.exercises.map((exercise: any, index: number) => {
                  return (
                    <HStack alignItems="flex-start" key={index}>
                      <Text pl="10" w="18rem">
                        {exercise.name}
                      </Text>
                      <Text pl="2">{exercise.sets} set </Text>
                      <Text pl="2"> {exercise.reps} reps </Text>
                      <Text pl="2">{exercise.isSuperSet ? "+" : null}</Text>
                    </HStack>
                  );
                })}
              </VStack>
            );
          })}
        </VStack>
      </Collapse>
    </VStack>
  );
}
