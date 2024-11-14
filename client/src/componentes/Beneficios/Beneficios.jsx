import React from "react";
import "./Beneficios.scss";
import AhorrarBeneficios from "../../assets/Images/ImagesLandingPage/ahorrarBeneficios.png";

const Beneficios = () => {
  return (
    <div className="beneficiosContainer">
      <h1>Beneficios Clave para Niños y Padres</h1>
      <div className="beneficiosContent">
        <div className="leftSection">
          <div className="benefitBox">
            Fomenta el ahorro responsable y la educación financiera mientras disfrutas momentos divertidos en familia.
          </div>
          <img src={AhorrarBeneficios} alt="Ahorro" className="benefit-image" />
        </div>
        <div className="rightSection">
          <ul>
            <li>
              <span className="title">Aprendizaje Financiero:</span>
              <span className="description">Desarrolla habilidades de gestión de dinero desde edad temprana.</span>
            </li>
            <li>
              <span className="title">Metas de Ahorro:</span>
              <span className="description">Fomenta el trabajo en equipo con objetivos de ahorro conjuntos.</span>
            </li>
            <li>
              <span className="title">Recompensas Divertidas:</span>
              <span className="description">Gana puntos y sube de nivel a través de un sistema de insignias.</span>
            </li>
            <li>
              <span className="title">Control Familiar:</span>
              <span className="description">Establece límites de gasto y supervisa el progreso de tus hijos.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;
