import React from "react";
import "./cartas.scss";
import { useNavigate } from "react-router-dom";
import misMetas from "../../assets/Images/ImagesInicio/circulo.png"
import misIngresos from "../../assets/Images/ImagesInicio/misIngresos.png"
import misGastos from "../../assets/Images/ImagesInicio/misGastos.png"
import misTareas from "../../assets/Images/ImagesInicio/misTareas.png"
import misPatrocinadores from "../../assets/Images/ImagesInicio/misPatrocinadores.png"
import miNivel from "../../assets/Images/ImagesInicio/miNivel.png"


const Cartas = () => {
  const navigate = useNavigate();
  const cardData = [
    { id: 1, title: "Mis Metas", image: misMetas, path: "/metas" },
    { id: 2, title: "Mis Ingresos", image: misIngresos, path: "/ingresos" },
    { id: 3, title: "Mis Gastos", image: misGastos, path: "/gastos" },
    { id: 4, title: "Mis Metas", image: misTareas, path: "/tareas" },
    { id: 5, title: "Mis Patrocinadores", image: misPatrocinadores, path: "/patrocinadores"  },
    { id: 6, title: "Mi Nivel", image: miNivel, path: "/nivel" },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="contenedor-principal">
      <h1>Bienvenido Juan Esteban</h1>
      <div className="cards-container">
        {cardData.map((card) => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.path)}>
            <h2 className="card-title">{card.title}</h2>
            <img src={card.image} alt={card.title} className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cartas;
