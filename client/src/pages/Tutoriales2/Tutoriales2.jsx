import React from "react";
import Header from "../../componentes/Header/Header";
import AprendeDePiggy from "../../componentes/AprendeDePiggy/AprendeDePiggy";

const Tutoriales2 = () => {

  const videosAprendeDe = [
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo crear una Meta?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo crear un Ingreso?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo crear un Gasto?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómor registro mis Patrocinadores?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo registro mis Tareas?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo funciona mi nivel?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo editar mi Perfil?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Cómo cambiar mi foto de perfil?",
    },

  ];

  return (
    <>
      <Header />
      <AprendeDePiggy videos={videosAprendeDe} />
    </>
  );
};

export default Tutoriales2;