import React from 'react';
import "./seccion1.scss";
import Banner from "../../assets/Images/ImagesLandingPage/banner.jpg";

const Seccion1 = () => {
  return (
    <div className='principal'>
      <h1>¡Bienvenido a Piggy!</h1>
      <div className="principalImage"> 
        <img src={Banner} alt="Logo" className="bannerPrincipal" /> 
      </div>
      <div className='contenido'>
        <p>Donde cada centavo cuenta y los sueños de ahorro se hacen realidad. <br>
        </br>¡Aprende a ahorrar de forma divertida y transforma tus metas en oportunidades!</p>
        <button className="btnBanner">Ver más</button>
      </div>
    </div>
  );
};

export default Seccion1;






