import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  HStack,
  Button,
  VStack,
  Divider,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import downArrowIcon from "assets/icons/downArrowIcon.svg";
import upArrowIcon from "assets/icons/upArrowIcon.svg";
import trashIcon from "assets/icons/trashIcon.svg";

interface NutritionDayInfoProps {
  day: any;
  values: any;
  setFieldValue: any;
}

export default function NutritionDayInfo({
  day,
  values,
  setFieldValue,
}: NutritionDayInfoProps) {
  const { isOpen, onToggle } = useDisclosure();

  const handleRemoveDayOfPlan = (dayName: string) => {
    const daysOfPlan = values.days;
    const newDays = daysOfPlan.filter((day: any) => day.name !== dayName);

    setFieldValue("days", newDays);
  };

  return (
    <VStack my="2" w="100%">
      <HStack w="100%">
        <Button w="100%" onClick={onToggle} variant="outlined">
          {day.name}
          {!isOpen ? (
            <Image src={downArrowIcon.src} w="5" />
          ) : (
            <Image src={upArrowIcon.src} w="5" />
          )}
        </Button>
        <Image
          src={trashIcon.src}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleRemoveDayOfPlan(day.name)}
        />
      </HStack>
      <Box as={Collapse} in={isOpen} w="100%" animateOpacity>
        <VStack alignItems="flex-start" w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontWeight="600"
              fontSize="18"
              w={{ base: "100%", md: "14rem" }}
              // mb={{ base: "2", md: "0" }}
            >
              Desayuno
            </Text>
              <Text w={{base: "100%", md: "80%"}}>

              {day.meals?.breakfast ? day.meals.breakfast : "---"}
              </Text>

          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontWeight="600"
              fontSize="18"
              w={{ base: "100%", md: "14rem" }}
              // mb={{ base: "2", md: "0" }}
            >
              Almuerzo
            </Text>
              <Text w={{base: "100%", md: "80%"}}>

              {day.meals?.lunch ? day.meals.lunch : "---"}
              </Text>

          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontWeight="600"
              fontSize="18"
              w={{ base: "100%", md: "14rem" }}
              // mb={{ base: "2", md: "0" }}
            >
              Merienda
            </Text>
              <Text w={{base: "100%", md: "80%"}}>

              {day.meals?.afternoonSnack ? day.meals.afternoonSnack : "---"}
              </Text>

          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            justifyContent="space-between"

            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontWeight="600"
              fontSize="18"
              w={{ base: "100%", md: "14rem" }}
              // mb={{ base: "2", md: "0" }}
            >
              Cena
            </Text>
              <Text w={{base: "100%", md: "80%"}}>

              {day.meals?.dinner ? day.meals.dinner : "---"}
              </Text>

          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontWeight="600"
              fontSize="18"
              w={{ base: "100%", md: "14rem" }}
              // mb={{ base: "2", md: "0" }}
            >
              Snacks {"(agregados)"}
            </Text>
              <Text w={{base: "100%", md: "80%"}}>

              {day.meals?.snacks ? day.meals.snacks : "---"}
              </Text>

          </Flex>
        </VStack>
      </Box>
    </VStack>
  );
}
