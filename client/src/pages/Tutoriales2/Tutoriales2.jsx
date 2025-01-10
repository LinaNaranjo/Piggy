import React from "react";
import Header from "../../componentes/Header/Header";
import AprendeDePiggy from "../../componentes/AprendeDePiggy/AprendeDePiggy";

const Tutoriales2 = () => {

  const videosAprendeDe = [
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo crear una Meta?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo crear un Ingreso?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo crear un Gasto?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómor registro mis Patrocinadores?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo registro mis Tareas?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo funciona mi nivel?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
      title: "¿Cómo editar mi Perfil?",
    },
    {
      url: "https://youtu.be/4o-UJTaEBjw",
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