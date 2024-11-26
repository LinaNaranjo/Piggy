import React from "react";
import Header from "../../componentes/Header/Header";
import AprendeConPiggy from "../../componentes/AprendeConPiggy/AprendeConPiggy";

const Tutoriales = () => {

  const videosAprendeCon = [
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es el Ahorro?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es el Ingreso?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es un Gasto?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es una Deuda?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es una Meta Financiera?",
    },
    {
      url: "https://youtu.be/GXF6lxAy-Vs",
      title: "¿Qué es un Presupuesto?",
    },
  ];

  return (
    <>
      <Header />
      <AprendeConPiggy videos={videosAprendeCon} />
    </>
  );
};

export default Tutoriales;

