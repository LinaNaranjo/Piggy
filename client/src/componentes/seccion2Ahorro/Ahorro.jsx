import React from "react";
import "./Ahorro.scss";
import ahorro from "../../assets/Images/ImagesLandingPage/seccion2.png";

const Ahorro = () => {
  return (
    <div className="containerAhorro">
      <div>
        <h1>¡Diviértete Ahorrando!</h1>
        </div>
      <div className="containerAhorro">
        <img src={ahorro} alt="Logo" className="AhorroImage" />
      </div>
    </div>
  );
};

export default Ahorro;
