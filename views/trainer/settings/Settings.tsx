import React, { useState } from "react";
import { useToast, Container } from "@chakra-ui/react";
import { TrainerModel } from "models/Trainer.model";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Navbar from "components/navbar/Navbar";
import ModalConfirm from "components/modals/modalConfirm/ModalConfirm";
import SettingsForm from "views/trainer/settings/SettingsForm";

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
    onSubmit: (values: TrainerModel) => {
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
        <SettingsForm
          values={values}
          router={router}
          videos={videos}
          setVideos={setVideos}
          handleBlur={handleBlur}
          testimonials={testimonials}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setTestimonials={setTestimonials}
          handleRemoveVideo={handleRemoveVideo}
          handleRemoveTestimonials={handleRemoveTestimonials}
          handleChangeVideos={handleChangeVideos}
          handleChangeTestimonials={handleChangeTestimonials}
        />
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
