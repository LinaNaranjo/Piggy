import React from "react";
import Header from "../../componentes/Header/Header";
import Transacciones from "../../componentes/Ingresos/Transacciones";

const MisIngresos = () => {
  return (
    <>
      <Header />
      <Transacciones type="ingresos" />
 
    </>
  );
};
export default MisIngresos;
