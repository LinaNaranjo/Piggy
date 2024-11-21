import React from "react";
import Header from "../../componentes/Header/Header";
import Transacciones from "../../componentes/Ingresos/Transacciones";
const MisGastos = () => {
  return (
    <>
      <Header />
      <Transacciones type="gastos" />
    </>
  );
};
export default MisGastos;
