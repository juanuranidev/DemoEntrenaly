import React, { useState } from "react";
import {
  Flex,
  Card,
  Link,
  Text,
  Image,
  Input,
  VStack,
  Button,
  Heading,
  Checkbox,
  Container,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import loginImage from "assets/images/loginImage.jpg";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    router.push("/trainer/dashboard");
    setLoading(false);
  };

  return (
    <Container maxW="full" bg="background.tertiary" p="0" h="100vh">
      <Container
        px="0"
        maxW="full"
        display="flex"
        borderRadius="md"
        justifyContent="space-between"
      >
        <Flex w={{ base: "100%", lg: "50%" }}>
          <VStack
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading
              w="100%"
              bg="brand.500"
              p="5"
              textAlign="center"
              color="#ffffff"
              shadow="lg"
              mb={{ base: "20", lg: "0" }}
            >
              ENTRENALY
            </Heading>
            <Card
              bg="background.primary"
              p="5"
              w={{ base: "100%", sm: "96" }}
              margin="auto"
              shadow="xl"
            >
              <VStack spacing="5">
                <FormControl>
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    value={loginCredentials.username}
                    name="username"
                    type="text"
                    onChange={(e: any) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        username: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    value={loginCredentials.password}
                    name="password"
                    type="password"
                    onChange={(e: any) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        password: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Flex alignItems="center">
                    <Checkbox />
                    <Text ml="2">Recordarme</Text>
                  </Flex>
                  <Link
                    href="https://api.whatsapp.com/send/?phone=543512900942&text=%C2%A1Hola%21+Necesito+recuperar+mi+contrase%C3%B1a&type=phone_number&app_absent=0"
                    target="_blank"
                  >
                    <Button
                      variant="link"
                      fontSize="15"
                      pt={{ base: "5", md: "0" }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </Link>
                </Flex>
                <Button
                  w="100%"
                  variant="primary"
                  color="#ffffff"
                  onClick={handleLogin}
                  isLoading={loading}
                  isDisabled={
                    !loginCredentials.username || !loginCredentials.password
                  }
                >
                  Iniciar Sesión
                </Button>
              </VStack>
            </Card>
            <Flex />
          </VStack>
        </Flex>
        <Image
          w="50%"
          h="100vh"
          shadow="md"
          src={loginImage.src}
          display={{ base: "none", lg: "flex" }}
        />
      </Container>
    </Container>
  );
}
