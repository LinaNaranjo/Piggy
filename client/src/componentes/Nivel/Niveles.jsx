import React from "react";
import "./niveles.scss";
import Bronce from "../../assets/Images/ImagenesNivel/Bronce.png";
import Plata from "../../assets/Images/ImagenesNivel/Plata.png";
import Oro from "../../assets/Images/ImagenesNivel/Oro.png";

const Niveles = () => {
  return (
    <>
      <div className="contenedor-principal">
        <h1>Mi Nivel</h1>
        <div className="contenedor-insignias">
          <div className="insignia">
            <img src={Bronce} alt="Insignia Bronce" />
            <section>
              <h3>Bronce</h3>
              <span>1 a 49 Completadas</span>
            </section>
          </div>
          <div className="insignia">
            <img src={Plata} alt="Insignia Plata" />
            <section>
              <h3>Plata</h3>
              <span>50 a 99 Completadas</span>
            </section>
          </div>
          <div className="insignia">
            <img src={Oro} alt="Insignia Oro" />
            <section>
              <h3>Oro</h3>
              <span>100 Completadas</span>
            </section>
          </div>
        </div>
        <h2 className="titulo-nivel-barras">
          ¡Progresa en el camino hacia tus sueños mientras vas alcanzando tus
          metas!
        </h2>
      </div>
    </>
  );
};
export default Niveles;
