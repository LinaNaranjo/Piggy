import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../componentes/Header/Header";
import Niveles from "../../componentes/Nivel/Niveles";
import Progresos from "../../componentes/Nivel/Progresos";
import axiosInstance from "../../api/axiosInstance";

const MiNivel = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      const fetchPoints = async () => {
        try {
          const response = await axiosInstance.get(`/goal/user/${user.id}`);
          console.log("Metas del usuario:", response.data);
          const points = response.data[0]?.user?.points || 0;
          setTotalPoints(points); // Actualiza los puntos en el estado
        } catch (error) {
          console.error("Error al obtener las metas:", error);
        }
      };

      fetchPoints();
    }
  }, [user?.id, totalPoints]); // Se ejecuta cuando cambia `user?.id` o `totalPoints`

  return (
    <>
      <Header />
      <Niveles />
      <Progresos totalPoints={totalPoints} />
    </>
  );
};

export default MiNivel;
