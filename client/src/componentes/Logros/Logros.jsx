import React from "react";
import "./Logros.scss";
import DivisionBronce from "../../assets/Images/ImagesLandingPage/bronce.png";
import DivisionPlata from "../../assets/Images/ImagesLandingPage/plata.png";
import DivisionOro from "../../assets/Images/ImagesLandingPage/oro.png";

const Logros = () => {
  return (
    <div  id="logros" className="logros">
      <h1>¡Diviértete Ahorrando!</h1>
      <h2>Logros que cuentan</h2>
      <p className="descripcion">
        Cada vez que tus hijos usan la plataforma ganan puntos concursando en la división Bronce, Plata y Oro.
      </p>
      <div className="contenedor">
        <div className="columna">
          <img src={DivisionBronce} alt="División Bronce" className="imagen" />
          <div>
            <h3>División Plata</h3>
            <p>Para quienes muestran un manejo responsable de sus gastos.</p>
          </div>
          <img src={DivisionOro} alt="División Oro" className="imagen" />
        </div>
        
        <div className="columna">
          <div>
            <h3>División Bronce</h3>
            <p>Reconocimiento de tus primeros pasos en la gestión financiera.</p>
          </div>
          <img src={DivisionPlata} alt="División Plata" className="imagen" />
          <div>
            <h3>División Oro</h3>
            <p>El máximo logro, lo alcanzan los usuarios dedicados.</p>
          </div>
        </div>
      </div>
      <h2>¡Hazlo Fácil, Hazlo Divertido!</h2>
      <p className="descripcion">
        Aprende a usar la plataforma en pocos pasos y empieza tu camino hacia la educación financiera.
      </p>

      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4o-UJTaEBjw"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Logros;
