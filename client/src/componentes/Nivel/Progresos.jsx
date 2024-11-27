import React from "react";
import Bronce from "../../assets/Images/ImagenesNivel/Bronce.png";
import Plata from "../../assets/Images/ImagenesNivel/Plata.png";
import Oro from "../../assets/Images/ImagenesNivel/Oro.png";
import "./progresos.scss";

const BarraDeProgreso = ({ progreso, tipo, total }) => {
  const porcentaje = (progreso / total) * 100;
  let imagenInsignia = Bronce;

  let color = "#76D7C4";

  if (progreso >= 100) {
    imagenInsignia = Oro; // Insignia de Oro si el progreso es 100 o más
  } else if (progreso >= 50) {
    imagenInsignia = Plata; // Insignia de Plata si el progreso está entre 50 y 99
  } else {
    imagenInsignia = Bronce; // Insignia de Bronce si el progreso es menor que 50
  }

  return (
    <div className="barra-de-progreso-container">
      <h3>{tipo}</h3>
      <div className="barra-de-progreso">
        <div
          className="progreso"
          style={{
            width: `${porcentaje}%`,
            backgroundColor: color,
          }}
        />
        {/* <span className="progreso-texto">
          {progreso}/{total}
        </span> */}
      </div>
      <div className="insignias">
        <img
          src={Bronce}
          alt="Bronce"
          className={progreso < 50 ? "bronce" : ""}
        />
        <img
          src={Plata}
          alt="Plata"
          className={progreso >= 50 && progreso < 100 ? "plata" : ""}
        />
        <img src={Oro} alt="Oro" className={progreso >= 100 ? "oro" : ""} />
      </div>
    </div>
  );
};

const Progresos = () => {
  // Simulación de progreso para metas, ahorros y tareas con el total de cada una
  const progresoMetas = 49; 
  const totalMetas = 100;
  const progresoAhorros = 99;
  const totalAhorros = 100;
  const progresoTareas = 100;
  const totalTareas = 100;

  return (
    <div>
      <BarraDeProgreso
        progreso={progresoMetas}
        total={totalMetas}
        tipo="Metas"
      />
      <BarraDeProgreso
        progreso={progresoAhorros}
        total={totalAhorros}
        tipo="Ahorros"
      />
      <BarraDeProgreso
        progreso={progresoTareas}
        total={totalTareas}
        tipo="Tareas"
      />
    </div>
  );
};

export default Progresos;
