import React from 'react';
import "./seccion1.scss";
import Banner from "../../assets/Images/ImagesLandingPage/banner.jpg";

const Seccion1 = () => {
  const handleScroll = () => {
    document.getElementById("logros").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="seccion1-container">
      <div className="content">
        <h1>¡Bienvenido a Piggy!</h1>
        <p>
          Donde cada centavo cuenta y los sueños de ahorro se hacen realidad.
          <br />
          ¡Aprende a ahorrar de forma divertida y transforma tus metas en oportunidades!
        </p>
        <button className="btnBanner" onClick={handleScroll}>Explora más</button>
      </div>
      <div className="image-container">
        <img src={Banner} alt="Logo" className="bannerPrincipal" />
      </div>
    </div>
  );
};

export default Seccion1;






