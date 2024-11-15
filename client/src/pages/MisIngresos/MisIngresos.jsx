import React from "react";
import Header from "../../componentes/Header/Header";
import IngresosTitulo from "../../componentes/Ingresos/IngresosTitulo";
import IngresosList from "../../componentes/Ingresos/IngresosList";

const MisIngresos = () => {
  return (
    <>
      <Header />
      <IngresosTitulo />
      <IngresosList />
    </>
  );
};
export default MisIngresos;
