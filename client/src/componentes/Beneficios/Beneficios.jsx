import React from "react";
import "./Beneficios.scss";
import AhorrarBeneficios from "../../assets/Images/ImagesLandingPage/ahorrarBeneficios.png";

const Beneficios = () => {
  return (
    <div className="beneficios-container">
      <h2>Beneficios Clave para Niños y Padres</h2>
      <div className="beneficios-content">
        <div className="left-section">
          <div className="benefit-box">
            Fomenta el ahorro responsable y la educación financiera mientras disfrutas momentos divertidos en familia.
          </div>
          <img src={AhorrarBeneficios} alt="Ahorro" className="benefit-image" />
        </div>
        <div className="right-section">
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</li>
            <li>Sed nisi. Nulla quis sem at nibh elementum imperdiet.</li>
            <li>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;