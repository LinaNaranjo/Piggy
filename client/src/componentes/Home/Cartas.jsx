import React from "react";
import "./cartas.scss"
import misMetas from "../../assets/Images/ImagesInicio/misIngresos.png"
import misIngresos from "../../assets/Images/ImagesInicio/misIngresos.png"
import misGastos from "../../assets/Images/ImagesInicio/misGastos.png"
import misTareas from "../../assets/Images/ImagesInicio/misTareas.png"
import misPatrocinadores from "../../assets/Images/ImagesInicio/misPatrocinadores.png"
import miNivel from "../../assets/Images/ImagesInicio/miNivel.png"


const Cartas = () => {
  const cardData = [
    { id: 1, title: "Mis Metas", image: misMetas },
    { id: 2, title: "Mis Ingresos", image: misIngresos },
    { id: 3, title: "Mis Gastos", image: misGastos },
    { id: 4, title: "Mis Metas", image: misTareas },
    { id: 5, title: "Mis Patrocinadores", image: misPatrocinadores  },
    { id: 6, title: "Mi Nivel", image: miNivel },
  ];
  return (
    <div className="contenedor-principal">
      <h1>Bienvenido Juan Esteban</h1>
      <div className="cards-container">
        {cardData.map((card) => (
          <div key={card.id} className="card">
            <h2 className="card-title">{card.title}</h2>
            <img src={card.image} alt={card.title} className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cartas;
