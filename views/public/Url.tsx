import React, { useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  VStack,
  Divider,
  Heading,
  Container,
} from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import trainerHeader from "assets/images/trainerHeader.png";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { TrainerModel } from "models/Trainer.model";
import "react-alice-carousel/lib/alice-carousel.css";

interface UrlProps {
  trainer: TrainerModel;
}

export default function Url({ trainer }: UrlProps) {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) {
      if (!trainer || !trainer.hasAPage || url !== trainer.url) {
        router.push("/");
      }
    }
  }, [url]);

  return (
    <Container maxW="full" minH="100vh" bg="background.primary" p="0">
      <Flex justifyContent="center" alignItems="center">
        <VStack position="absolute">
          <Heading
            color="#ffffff"
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl", xl: "8xl" }}
          >
            {trainer?.name}
          </Heading>
          <Text
            color="#ffffff"
            fontWeight="600"
            fontSize={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }}
          >
            {trainer?.headline}
          </Text>
        </VStack>
        <Image
          w="100%"
          src={trainerHeader.src}
          h={{ base: "30vh", sm: "40vh", md: "50vh", lg: "80vh", xl: "100vh" }}
        />
      </Flex>
      <Flex
        py="20"
        w="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Heading pb="20" textAlign="center">
          SOBRE MI
        </Heading>
        <Container
          display="flex"
          borderRadius="md"
          maxW="container.xl"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            justifyContent="center"
            mb={{ base: "20", md: "0" }}
            w={{ base: "100%", md: "50%" }}
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
            <Flex
              h="100%"
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text textAlign={{ base: "center", md: "left" }} fontSize="xl">
                {trainer?.description}
              </Text>
              <Divider />
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
            </Flex>
          </VStack>
        </Container>
      </Flex>
      {trainer?.testimonials?.length ? (
        <Flex w="100%" py="20" justifyContent="center" bg="brand.500">
          <Container
            display="flex"
            borderRadius="md"
            maxW="container.xl"
            justifyContent="center"
          >
            <VStack w="100%">
              <AliceCarousel
                infinite
                mouseTracking
                autoPlay={true}
                disableDotsControls
                disableButtonsControls
                autoPlayInterval={4000}
              >
                {trainer.testimonials.map((testimonial: any, index: number) => {
                  return (
                    <Flex justifyContent="center" key={index}>
                      <Heading
                        pb="5"
                        color="white"
                        cursor="grab"
                        fontWeight="200"
                        userSelect="none"
                        textAlign="center"
                        className="italic"
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
      {trainer?.videos?.length ? (
        <VStack py="20" w="100%" justifyContent="center">
          <Container
            borderRadius="md"
            maxW="container.xl"
            justifyContent="center"
          >
            <Heading pb="20" textAlign="center">
              VIDEOS
            </Heading>
            <Flex
              w="100%"
              flexWrap="wrap"
              justifyContent="center"
              flexDirection={{ base: "column", md: "row" }}
            >
              {trainer.videos.map((video: any, index: number) => {
                return (
                  <Container
                    mr="5"
                    mb="5"
                    key={index}
                    display="flex"
                    borderRadius="lg"
                    height={{ base: "64", md: "64" }}
                    width={{ base: "100%", md: "40%" }}
                  >
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls={true}
                      url={video.link}
                    />
                  </Container>
                );
              })}
            </Flex>
          </Container>
        </VStack>
      ) : null}
    </Container>
  );
}
