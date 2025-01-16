import React from "react";
import { useSelector } from "react-redux";
import Bronce from "../../assets/Images/ImagenesNivel/Bronce.png";
import Plata from "../../assets/Images/ImagenesNivel/Plata.png";
import Oro from "../../assets/Images/ImagenesNivel/Oro.png";
import "./progresos.scss";

const BarraDeProgreso = ({ progreso, tipo, total }) => {
  const user = useSelector((state) => state.user);
  const porcentaje = (progreso / total) * 100;

  const obtenerInsignia = () => {
    if (progreso >= 500) return Oro;
    if (progreso >= 200) return Plata;
    if (progreso >= 100) return Bronce;
    return null; 
  };

  const imagenInsignia = obtenerInsignia();

  return (
    <div className="barra-de-progreso-container">
      <h3>{tipo}</h3>
      <div className="progreso-contenedor">
        <div className="barra-de-progreso">
          <div
            className="progreso"
            style={{
              width: `${porcentaje}%`,
            }}
          />
        </div>
      </div>
      <div className="puntos-acumulados">
      {user.points} / {total} puntos
      </div>
      <div className="insignias">
        <img
          src={Bronce}
          alt="Bronce"
          className="insignia"
          style={{
            opacity: progreso >= 100 ? 1 : 0.3,
          }}
        />
        <img
          src={Plata}
          alt="Plata"
          className="insignia"
          style={{
            opacity: progreso >= 200 ? 1 : 0.3,
          }}
        />
        <img
          src={Oro}
          alt="Oro"
          className="insignia"
          style={{
            opacity: progreso >= 500 ? 1 : 0.3,
          }}
        />
      </div>
    </div>
  );
};

const Progresos = ({ totalPoints }) => {
  const totalMetas = 500;

  return (
    <div className="contenedor-principal-barras">
      <BarraDeProgreso
        progreso={totalPoints}
        total={totalMetas}
        tipo="Progreso"
      />
    </div>
  );
};

export default Progresos;
