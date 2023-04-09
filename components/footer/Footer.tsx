import React from "react";
import { Container, HStack, Image, Link, Text } from "@chakra-ui/react";
import HeartIcon from "assets/icons/HeartIcon.svg";

export default function Footer() {
  return (
    <Container
      p="4"
      maxW="full"
      display="flex"
      justifyContent="center"
      bg="brand.500"
      h="3rem"
    >
      <HStack spacing="1">
        <Text fontWeight="600" fontSize="sm" color="#ffffff">
          made with
        </Text>
        <Image src={HeartIcon.src} w="5" className="heart-icon" />
        <Text fontWeight="600" fontSize="sm" color="#ffffff">
          by{" "}
          <Link
            target="_blank"
            textDecoration="underline"
            href="https://www.linkedin.com/in/juanurani/"
          >
            Juan
          </Link>
        </Text>
      </HStack>
    </Container>
  );
}
