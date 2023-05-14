import React from "react";
import NextLink from "next/link";
import {
  Box,
  Menu,
  Flex,
  Link,
  Stack,
  Image,
  Avatar,
  HStack,
  Button,
  MenuList,
  Collapse,
  MenuItem,
  Container,
  IconButton,
  MenuButton,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import menuIcon from "assets/icons/menuIcon.svg";
import closeIcon from "assets/icons/closeIcon.svg";
import dumbbellIcon from "assets/icons/dumbbellIcon.svg";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="full" bg="brand.500">
      <Container px="4" maxW="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            m="0"
            icon={
              isOpen ? (
                <Image src={closeIcon.src} w="6" />
              ) : (
                <Image src={menuIcon.src} />
              )
            }
            aria-label={"Open Menu"}
            display={{ base: "flex", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link
              as={NextLink}
              px={2}
              py={3}
              color="white"
              fontWeight="600"
              rounded={"md"}
              _hover={{
                textDecoration: "underline",
              }}
              href="/trainer/dashboard"
            >
              <Image src={dumbbellIcon.src} w="8" />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link
                as={NextLink}
                px={2}
                py={3}
                color="white"
                fontWeight="600"
                rounded={"md"}
                _hover={{
                  textDecoration: "underline",
                }}
                href="/trainer/dashboard"
              >
                Inicio
              </Link>
              <Link
                as={NextLink}
                px={2}
                py={3}
                color="white"
                fontWeight="600"
                rounded={"md"}
                _hover={{
                  textDecoration: "underline",
                }}
                href="/trainer/wallet"
              >
                Billetera
              </Link>
              <Link
                as={NextLink}
                px={2}
                py={3}
                color="white"
                fontWeight="600"
                rounded={"md"}
                _hover={{
                  textDecoration: "underline",
                }}
                href="/trainer/plans"
              >
                Planes
              </Link>
              <Link
                as={NextLink}
                px={2}
                py={3}
                color="white"
                fontWeight="600"
                rounded={"md"}
                _hover={{
                  textDecoration: "underline",
                }}
                href="/trainer/clients"
              >
                Clientes
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={""} />
              </MenuButton>
              <MenuList p={0}>
                <MenuItem>
                  <Link
                    py={2}
                    w="100%"
                    as={NextLink}
                    _hover={{
                      textDecoration: "none",
                    }}
                    href="/trainer/settings"
                  >
                    Configuración
                  </Link>
                </MenuItem>
                <MenuDivider m={0} />
                <MenuItem>
                  <Link
                    as={NextLink}
                    py={2}
                    rounded={"md"}
                    w="100%"
                    _hover={{
                      textDecoration: "none",
                    }}
                    href="/"
                  >
                    Cerrar Sesión
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }} shadow="lg">
          <Stack as={"nav"}>
            <Link
              onClick={onClose}
              px={2}
              py={3}
              as={NextLink}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                background: "#ffffff",
                color: "#000000",
              }}
              href="/trainer/dashboard"
              color="#ffffff"
            >
              Inicio
            </Link>
            <Link
              onClick={onClose}
              px={2}
              py={3}
              as={NextLink}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                background: "#ffffff",
                color: "#000000",
              }}
              href="/trainer/wallet"
              color="#ffffff"
            >
              Billetera
            </Link>
            <Link
              onClick={onClose}
              px={2}
              py={3}
              as={NextLink}
              rounded={"md"}
              _hover={{
                textDecoration: "none",

                background: "#ffffff",
                color: "#000000",
              }}
              href="/trainer/plans"
              color="#ffffff"
            >
              Planes
            </Link>
            <Link
              onClick={onClose}
              px={2}
              py={3}
              as={NextLink}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                background: "#ffffff",
                color: "#000000",
              }}
              href="/trainer/clients"
              color="#ffffff"
            >
              Clientes
            </Link>
            <Link
              onClick={onClose}
              px={2}
              py={3}
              as={NextLink}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                background: "#ffffff",
                color: "#000000",
              }}
              href="/trainer/settings"
              color="#ffffff"
            >
              Configuración
            </Link>
          </Stack>
        </Box>
      </Collapse>
    </Container>
  );
}
