import React, { useState } from "react";
import {
  Text,
  Flex,
  Image,
  Input,
  Button,
  Avatar,
  VStack,
  Switch,
  Divider,
  Heading,
  Tooltip,
  useToast,
  Textarea,
  Container,
  FormLabel,
  InputGroup,
  ButtonGroup,
  FormControl,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Navbar from "components/navbar/Navbar";
import infoIcon from "assets/icons/infoIcon.svg";
import trashIcon from "assets/icons/trashIcon.svg";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";

export default function Settings({ trainer, setTrainer }: any) {
  const router = useRouter();
  const toast = useToast();

  const [videos, setVideos] = useState<any>(trainer?.videos || []);
  const [isLabelOpen, setIsLabelOpen] = useState<boolean>(false);
  const [videoSelected, setVideoSelected] = useState<number>();
  const [videoModalConfirm, setVideoModalConfirm] = useState<boolean>(false);
  const [testimonials, setTestimonials] = useState<any>(
    trainer?.testimonials || []
  );

  const handleChangeVideos = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVideos = [...videos];
    newVideos[index].link = event.target.value;
    setVideos(newVideos);
  };

  const handleRemoveVideo = (index: number) => {
    if (!videos[index].link) {
      const updatedVideos = [...videos];
      updatedVideos.splice(index, 1);
      setVideos(updatedVideos);
    } else {
      setVideoModalConfirm(true);
      setVideoSelected(index);
    }
  };

  const handleConfirmRemoveVideo = () => {
    const updatedVideos = [...videos];
    updatedVideos.splice(videoSelected!, 1);
    setVideos(updatedVideos);
    setVideoModalConfirm(false);
  };

  const handleChangeTestimonials = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index].text = event.target.value;
    setTestimonials(newTestimonials);
  };

  const handleRemoveTestimonials = (index: number) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: trainer ? trainer.name : "",
      lastName: trainer ? trainer.lastName : "",
      number: trainer ? trainer.number : "",
      email: trainer ? trainer.email : "",
      url: trainer ? trainer.url : "",
      headline: trainer ? trainer.headline : "",
      description: trainer ? trainer.description : "",
      instagram: trainer ? trainer.instagram : "",
      facebook: trainer ? trainer.facebook : "",
      youtube: trainer ? trainer.youtube : "",
      whatsapp: trainer ? trainer.whatsapp : "",
      hasAPage: trainer ? trainer.hasAPage : "",
    },
    onSubmit: (values: any) => {
      setTrainer({ ...values, videos: videos, testimonials: testimonials });
      toast({
        isClosable: true,
        status: "success",
        position: "bottom-right",
        title: "Perfil actualizado con éxito",
      });
    },
  });

  return (
    <Container
      p="0"
      pb="10"
      maxW="full"
      bg="background.tertiary"
      minH="calc(100vh - 3rem)"
    >
      <Navbar />
      <Container
        p="5"
        mt="10"
        borderRadius="md"
        maxW="container.xl"
        bg="background.primary"
        shadow="brand_shadow_lg"
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Flex
            alignItems="flex-start"
            justifyContent="space-evenly"
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              spacing="5"
              w={{ base: "100%", md: "50%" }}
              mr={{ base: "0", md: "10" }}
              mb={{ base: "5", md: "0" }}
            >
              <Text fontWeight="600" fontSize="xl">
                Foto de perfil
              </Text>
              <Avatar src="" size="2xl" />
              <FormControl>
                <VStack
                  display="flex"
                  spacing="2"
                  alignItems="flex-start"
                  w="100%"
                >
                  <Heading size="sm" m="0">
                    REDES SOCIALES
                  </Heading>
                  <FormControl
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <FormLabel pr="0">Instagram</FormLabel>
                    <InputGroup justifyContent="flex-end">
                      <InputLeftAddon h="8" px="2" fontSize="13">
                        instagram.com/
                      </InputLeftAddon>
                      <Input
                        name="instagram"
                        placeholder="Ej: juan"
                        onChange={handleChange}
                        shadow="sm"
                        size="sm"
                        value={values.instagram}
                        w={{ base: "100%", md: "9rem" }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <FormLabel pr="0">Facebook</FormLabel>
                    <InputGroup justifyContent="flex-end">
                      <InputLeftAddon h="8" px="2" fontSize="13">
                        facebook.com/
                      </InputLeftAddon>
                      <Input
                        name="facebook"
                        placeholder="Ej: juan"
                        value={values.facebook}
                        onChange={handleChange}
                        shadow="sm"
                        size="sm"
                        w={{ base: "100%", md: "9rem" }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <FormLabel pr="0">YouTube</FormLabel>
                    <InputGroup justifyContent="flex-end">
                      <InputLeftAddon h="8" px="2" fontSize="13">
                        youtube.com/
                      </InputLeftAddon>
                      <Input
                        name="youtube"
                        placeholder="Ej: juan"
                        value={values.youtube}
                        onChange={handleChange}
                        shadow="sm"
                        size="sm"
                        w={{ base: "100%", md: "9rem" }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <FormLabel h="8" pr="0">
                      WhatsApp
                    </FormLabel>
                    <Input
                      name="whatsapp"
                      placeholder="Ej: 3512900942"
                      value={values.whatsapp}
                      onChange={handleChange}
                      shadow="sm"
                      size="sm"
                      w={{ base: "100%", md: "9rem" }}
                    />
                  </FormControl>
                </VStack>
              </FormControl>
            </VStack>
            <VStack
              spacing="2"
              w={{ base: "100%", md: "50%" }}
              alignItems="flex-start"
            >
              <Heading size="sm" m="0" mt={{ base: "5", sm: "0" }}>
                INFORMACIÓN PERSONAL
              </Heading>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel>Nombre</FormLabel>
                <Input
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  shadow="sm"
                  size="sm"
                  placeholder="Ej: Juan"
                  w={{ base: "100%", sm: "18rem" }}
                />
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel>Apellido</FormLabel>
                <Input
                  w={{ base: "100%", sm: "18rem" }}
                  name="lastName"
                  type="text"
                  placeholder="Ej: Urani"
                  value={values.lastName}
                  onChange={handleChange}
                  shadow="sm"
                  size="sm"
                />
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel>Número</FormLabel>
                <Input
                  w={{ base: "100%", sm: "18rem" }}
                  name="number"
                  type="number"
                  placeholder="Ej: 3512900942"
                  value={values.number}
                  onChange={handleChange}
                  shadow="sm"
                  size="sm"
                />
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  w={{ base: "100%", sm: "18rem" }}
                  name="email"
                  type="email"
                  placeholder="Ej: juan@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  shadow="sm"
                  size="sm"
                />
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel>Url</FormLabel>
                <InputGroup justifyContent="flex-end">
                  <InputLeftAddon h="8" px="2" py="0" fontSize="14">
                    trainerally.com/
                  </InputLeftAddon>
                  <Input
                    shadow="sm"
                    w={{ base: "100%", sm: "10.5rem" }}
                    name="url"
                    type="text"
                    size="sm"
                    placeholder="Ej: juanurani"
                    value={values.url}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel w="8rem">Titular</FormLabel>
                <Input
                  w={{ base: "100%", sm: "18rem" }}
                  name="headline"
                  type="text"
                  size="sm"
                  placeholder="Ej: Preparador físico"
                  value={values.headline}
                  onChange={handleChange}
                  shadow="sm"
                />
              </FormControl>
              <FormControl
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <FormLabel w="8rem">Descripción Larga</FormLabel>
                <Textarea
                  w={{ base: "100%", sm: "30rem" }}
                  name="description"
                  maxH="6rem"
                  size="sm"
                  placeholder="Ej: Preparador físico con 5 años de experiencia en distintos gimnasios, residente en Córdoba - Argentina."
                  value={values.description}
                  onChange={handleChange}
                  shadow="sm"
                />
              </FormControl>
            </VStack>
          </Flex>
          <Divider mt="5 !important" mb="2 !important" />
          <FormControl display="flex" alignItems="center">
            <FormLabel fontSize="lg" mb="0">
              Página personal
            </FormLabel>
            <Switch
              name="hasAPage"
              value={String(values.hasAPage)}
              onChange={handleChange}
              onBlur={handleBlur}
              size="sm"
              defaultChecked={values.hasAPage}
            />

            <Tooltip
              isOpen={isLabelOpen}
              label="Elige si quieres trener un propia página personal o no."
            >
              <Image
                src={infoIcon.src}
                w="5"
                ml="2"
                alt={"Elige si quieres trener un propia página personal o no."}
                onMouseEnter={() => setIsLabelOpen(true)}
                onMouseLeave={() => setIsLabelOpen(false)}
                onClick={() => setIsLabelOpen(true)}
              />
            </Tooltip>
            {values.hasAPage ? (
              <Button
                ml="2"
                variant="link"
                onClick={() => router.push("/juanura")}
              >
                Ver Página
              </Button>
            ) : null}
          </FormControl>
          {values.hasAPage ? (
            <React.Fragment>
              <Heading
                size="sm"
                mb="5"
                mt={{ base: "5 !important", sm: "2" }}
                justifyContent="flex-start"
                w="100%"
              >
                CONTENIDO PARA TU PÁGINA
              </Heading>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems="flex-start"
              >
                <FormControl
                  w={{ base: "100%", md: "50%" }}
                  mr={{ base: "0", md: "10" }}
                  mb={{ base: "10", md: "0" }}
                >
                  <FormLabel>Videos</FormLabel>
                  <InputGroup>
                    <VStack w="100%" spacing="3" alignItems="flex-start">
                      {videos.length
                        ? videos.map((video: any, index: number) => (
                            <FormControl display="flex" w="100%" key={index}>
                              <Input
                                w="100%"
                                size="sm"
                                placeholder="Link del video"
                                type="text"
                                value={video.link}
                                onChange={(event) =>
                                  handleChangeVideos(index, event)
                                }
                              />
                              <Image
                                ml="2"
                                src={trashIcon.src}
                                cursor="pointer"
                                onClick={() => handleRemoveVideo(index)}
                              />
                            </FormControl>
                          ))
                        : null}
                      {videos.length < 6 ? (
                        <Button
                          variant="link"
                          colorScheme="brand"
                          onClick={() => setVideos([...videos, { link: "" }])}
                        >
                          Agregar Link
                        </Button>
                      ) : null}
                    </VStack>
                  </InputGroup>
                </FormControl>
                <FormControl w={{ base: "100%", md: "50%" }}>
                  <FormLabel>Testimonios</FormLabel>
                  <InputGroup>
                    <VStack w="100%" spacing="3" alignItems="flex-start">
                      {testimonials.length
                        ? testimonials.map(
                            (testimonial: any, index: number) => (
                              <FormControl display="flex" w="100%" key={index}>
                                <Input
                                  w="100%"
                                  size="sm"
                                  placeholder="Frase del testimonio"
                                  type="text"
                                  maxLength={80}
                                  value={testimonial.text}
                                  onChange={(event) =>
                                    handleChangeTestimonials(index, event)
                                  }
                                />
                                <Image
                                  ml="2"
                                  src={trashIcon.src}
                                  cursor="pointer"
                                  onClick={() =>
                                    handleRemoveTestimonials(index)
                                  }
                                />
                              </FormControl>
                            )
                          )
                        : null}
                      {testimonials.length < 5 ? (
                        <Button
                          variant="link"
                          colorScheme="brand"
                          onClick={() =>
                            setTestimonials([...testimonials, { text: "" }])
                          }
                        >
                          Agregar Testimonio
                        </Button>
                      ) : null}
                    </VStack>
                  </InputGroup>
                </FormControl>
              </Flex>
            </React.Fragment>
          ) : null}
          <VStack spacing="2" w="100%" alignItems="flex-end" mt="10">
            <ButtonGroup>
              <Button variant="ghostCancel">Cancelar</Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Container>
      {videoModalConfirm ? (
        <ModalConfirm
          isOpen={videoModalConfirm}
          onClose={() => setVideoModalConfirm(false)}
          body={`¿Está seguro que desea eliminar el video? ${
            videos[videoSelected!].link
          }`}
          onSubmit={handleConfirmRemoveVideo}
          buttons={{ cancel: "Cancelar", confirm: "Eliminar" }}
        />
      ) : null}
    </Container>
  );
}
