import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti"; // Importamos la librería
import "./progresos.scss";
import Bronce from "../../assets/Images/ImagenesNivel/Bronce.png";
import Plata from "../../assets/Images/ImagenesNivel/Plata.png";
import Oro from "../../assets/Images/ImagenesNivel/Oro.png";

const BarraDeProgreso = ({ progreso, tipo, total }) => {
  const [insigniaAlcanzada, setInsigniaAlcanzada] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    if (progreso >= 500 && insigniaAlcanzada !== "Oro") {
      setInsigniaAlcanzada("Oro");
      setMostrarMensaje(true);
      lanzarConfeti(); // Lanzamos el confeti cuando el usuario alcanza el nivel
    } else if (progreso >= 200 && insigniaAlcanzada !== "Plata") {
      setInsigniaAlcanzada("Plata");
      setMostrarMensaje(true);
      lanzarConfeti(); // Lanzamos el confeti cuando el usuario alcanza el nivel
    } else if (progreso >= 100 && insigniaAlcanzada !== "Bronce") {
      setInsigniaAlcanzada("Bronce");
      setMostrarMensaje(true);
      lanzarConfeti(); // Lanzamos el confeti cuando el usuario alcanza el nivel
    }
  }, [progreso]);

  // Función para lanzar el confeti
  const lanzarConfeti = () => {
    confetti({
      particleCount: 300, 
      spread: 90, 
      origin: { y: 0.6 },
      colors: ['#FF6347', '#FFD700', '#32CD32', '#00BFFF'], 
      opacity: 0.8, 
      scalar: 1.2, 
    });
  };

  return (
    <div className="barra-de-progreso-container">
      <h3>{tipo}</h3>
      <div className="progreso-contenedor">
        <div className="barra-de-progreso">
          <div
            className="progreso"
            style={{ width: `${(progreso / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="puntos-acumulados">
        {progreso} / {total} puntos
      </div>
      <div className="insignias">
        <img src={Bronce} alt="Bronce" className="insignia" style={{ opacity: progreso >= 100 ? 1 : 0.3 }} />
        <img src={Plata} alt="Plata" className="insignia" style={{ opacity: progreso >= 200 ? 1 : 0.3 }} />
        <img src={Oro} alt="Oro" className="insignia" style={{ opacity: progreso >= 500 ? 1 : 0.3 }} />
      </div>

      {/* Modal de Insignia Alcanzada */}
      {mostrarMensaje && (
        <div className="modal-insignia">
          <div className="contenido-modal-insignia">
            <h2>¡Felicidades!</h2>
            <p>Has alcanzado el nivel <strong>{insigniaAlcanzada}</strong>.</p>
            <button onClick={() => setMostrarMensaje(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Progresos = ({ totalPoints }) => {
  const totalMetas = 500;
  return (
    <div className="contenedor-principal-barras">
      <BarraDeProgreso progreso={totalPoints} total={totalMetas} tipo="Progreso" />
    </div>
  );
};

export default Progresos;
