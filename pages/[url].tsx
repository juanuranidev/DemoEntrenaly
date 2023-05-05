import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
// import trainerHeader from "assets/images/trainerHeader.png";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrainerModel } from "models/Trainer.model";

interface IndexProps {
  trainer: TrainerModel;
}

export default function Index({ trainer }: IndexProps) {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (!trainer.hasAPage || url !== trainer.url) {
      router.push("/");
    }
  }, []);

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
        {/* <Image
          w="100%"
          src={trainerHeader.src}
          h={{ base: "30vh", sm: "40vh", md: "50vh", lg: "80vh", xl: "100vh" }}
        /> */}
      </Flex>
      <Flex w="100%" justifyContent="space-around" alignItems="center" py="20">
        <Container
          // p="5"
          // mb="10"
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
            {/* <Heading>SOBRE MI</Heading>*/}
            <Flex
              h="100%"
              flexDirection="column"
              alignItems="center"
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
      {/* {trainer?.testimonials?.length ? (
        <Flex w="100%" py="20" justifyContent="center" bg="brand.500">
          <Container
            // p="5"
            borderRadius="md"
            display="flex"
            justifyContent="center"
            maxW="container.xl"
          >
            <VStack w="100%">
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
      {trainer?.videos?.length ? (
        <VStack py="20" w="100%" justifyContent="center">
          <Container
            borderRadius="md"
            maxW="container.xl"
            justifyContent="center"
          >
            {/* <Heading pb="10" textAlign="center">
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
                    width={{ base: "100%", md: "40%" }}
                    height={{ base: "64", md: "64" }}
                    mr="5"
                    mb="5"
                    borderRadius="lg"
                  >
                    {/* <ReactPlayer
                      url={video.link}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  </Box>
                );
              })}
            </Flex>
          </Container>
        </VStack>
      ) : null} */}
    </Container>
  );
}
