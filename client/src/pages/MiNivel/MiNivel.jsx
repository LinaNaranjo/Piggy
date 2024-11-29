import React, { useState } from "react";
import Header from "../../componentes/Header/Header";
import Niveles from "../../componentes/Nivel/Niveles";
import Progresos from "../../componentes/Nivel/Progresos";

const MiNivel = () => {
  const [totalPoints, setTotalPoints] = useState(20);
  return (
    <>
      <Header />
      <Niveles />
      <Progresos totalPoints={totalPoints}/>
    </>
  );
};
export default MiNivel;
