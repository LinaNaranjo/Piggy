import React from "react";
import Header from "../../componentes/Header/Header";
import GastosTitulo from "../../componentes/Gastos/GastosTitulo";
import GastosList from "../../componentes/Gastos/GastosList";

const MisGastos = () => {
  return (
    <>
      <Header />
      <GastosTitulo />
      <GastosList />
    </>
  );
};
export default MisGastos;
