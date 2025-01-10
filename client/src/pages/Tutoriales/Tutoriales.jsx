import React from "react";
import Header from "../../componentes/Header/Header";
import AprendeConPiggy from "../../componentes/AprendeConPiggy/AprendeConPiggy";

const Tutoriales = () => {

  const videosAprendeCon = [
    {
      url: "https://youtu.be/VZgFa4YgtfY",
      title: "¿Qué es el Ahorro?",
    },
    {
      url: "https://youtu.be/SDfbmsO4iYw",
      title: "¿Qué es el Ingreso?",
    },
    {
      url: "https://youtu.be/YxL-L4kXhCI",
      title: "¿Qué es un Gasto?",
    },
    {
      url: "https://youtu.be/vrx_JBCHfqI",
      title: "¿Qué es una Deuda?",
    },
    {
      url: "https://youtu.be/SNhzRxTvknM",
      title: "¿Qué es una Meta Financiera?",
    },
    {
      url: "https://youtu.be/sSHU8Nh0i_o",
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

export default Tutoriales;