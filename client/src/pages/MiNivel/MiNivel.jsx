import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../componentes/Header/Header";
import Niveles from "../../componentes/Nivel/Niveles";
import Progresos from "../../componentes/Nivel/Progresos";

const MiNivel = () => {
    const user = useSelector((state) => state.user);
    const [totalPoints, setTotalPoints] = useState(user?.points || 0);

    useEffect(() => {
      setTotalPoints(user?.points || 0);
    }, [user.points]); // Se actualiza cuando cambian los puntos del usuario
  
  return (
    <>
      <Header />
      <Niveles />
      <Progresos totalPoints={totalPoints}/>
    </>
  );
};
export default MiNivel;
