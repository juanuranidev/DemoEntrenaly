import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  VStack,
  Divider,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function Index({ trainer }: any) {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (!url) {
      console.log("NO hay url");
    }
  }, []);

  const convertToEmbedUrl = (url: string) => url.replace("watch?v=", "embed/");

  return (
    <Container maxW="full" minH="100vh" bg="background.primary" p="0">
      <Flex w="100%" justifyContent="space-around" alignItems="center" py="20">
        <Container
          borderRadius="md"
          maxW="container.xl"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Flex
            w={{ base: "100%", md: "50%" }}
            justifyContent="center"
            mb={{ base: "20", md: "0" }}
          >
            <Image
              borderRadius="lg"
              shadow="md"
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
          </Flex>
          <VStack w={{ base: "100%", md: "50%" }} spacing="5">
            <Heading>SOBRE MI</Heading>
            <Divider />
            <Text textAlign={{ base: "center", md: "left" }}>
              {trainer?.description}
            </Text>
            <Flex justifyContent="center" w="100%" flexWrap="wrap">
              {trainer?.instagram ? (
                <Button mb="5" mx="5" variant="link">
                  Instagram
                </Button>
              ) : null}
              {trainer?.facebook ? (
                <Button mb="5" mx="5" variant="link">
                  Facebook
                </Button>
              ) : null}
              {trainer?.youtube ? (
                <Button mb="5" mx="5" variant="link">
                  YouTube
                </Button>
              ) : null}
              {trainer?.whatsapp ? (
                <Button mb="5" mx="5" variant="link">
                  WhatsApp
                </Button>
              ) : null}
            </Flex>
          </VStack>
        </Container>
      </Flex>
      {trainer?.videos?.length ? (
        <VStack py="20" w="100%" justifyContent="center">
          <Container
            borderRadius="md"
            maxW="container.xl"
            justifyContent="center"
          >
            <Heading pb="10" textAlign="center">
              VIDEOS
            </Heading>
            <Flex
              w="100%"
              flexDirection={{ base: "column", md: "row" }}
              flexWrap="wrap"
              justifyContent="center"
            >
              {trainer.videos.map((video: any, index: number) => {
                return (
                  <Box
                    display="flex"
                    key={index}
                    width={{ base: "100%", md: "30%" }}
                    height={{ base: "64", md: "52" }}
                    mr="5"
                    mb="5"
                    borderRadius="lg"
                  >
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      title="Youtube player"
                      sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                      src={`${convertToEmbedUrl(video.link)}?autoplay=0`}
                    ></iframe>
                  </Box>
                );
              })}
            </Flex>
          </Container>
        </VStack>
      ) : null}
      {trainer?.testimonials?.length ? (
        <Flex w="100%" py="20" justifyContent="center" bg="brand.500">
          <Container
            // p="5"
            borderRadius="md"
            display="flex"
            justifyContent="center"
            maxW="container.xl"
          >
            <VStack w="100%">
              <Heading pb={{ base: "10", md: "20" }} color="#ffffff">
                TESTIMONIOS
              </Heading>
              <AliceCarousel
                mouseTracking
                disableDotsControls
                autoPlay={true}
                infinite
                disableButtonsControls
                autoPlayInterval={4000}
              >
                {trainer.testimonials.map((testimonial: any, index: number) => {
                  return (
                    <Flex justifyContent="center" key={index}>
                      <Heading
                        color="white"
                        textAlign="center"
                        className="italic"
                        fontWeight="200"
                        pb="5"
                        userSelect="none"
                        cursor="grab"
                      >
                        {`"${testimonial.text}"`}
                      </Heading>
                    </Flex>
                  );
                })}
              </AliceCarousel>
            </VStack>
          </Container>
        </Flex>
      ) : null}
      <Flex w="100%" mb="10" py="20" justifyContent="center">
        <Container
          borderRadius="md"
          maxW="container.xl"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <VStack mb={{ base: "10", md: "0" }}>
            <Heading size={{ base: "lg", md: "xl" }} mb="2">
              ¿{trainer?.name} es tu entrenador?
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Inicia sesión y descargar tu plan
            </Text>
          </VStack>
          <Button variant="outlined" w={{ base: "18rem", md: "12rem" }}>
            Iniciar Sesión
          </Button>
        </Container>
      </Flex>
    </Container>
  );
}
