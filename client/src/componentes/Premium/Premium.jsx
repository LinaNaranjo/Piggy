import React from 'react';
import "./Premium.scss";
import Moneda from "../../assets/Images/ImagesLandingPage/Premium.png";
import Grafico from "../../assets/Images/ImagesLandingPage/1fila.png";
import Campana from "../../assets/Images/ImagesLandingPage/2fila.png";
import Infinito from "../../assets/Images/ImagesLandingPage/3fila.png";
import Padres from "../../assets/Images/ImagesLandingPage/5fila.png";
import Si from "../../assets/Images/ImagesLandingPage/Si.png";
import No from "../../assets/Images/ImagesLandingPage/No.png";

const Premium = () => {
  const scrollToTable = () => {
    const tableElement = document.getElementById("comparisonTable");
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="premiumContainer">
      <div className="premiumHeader">
        <div className="premiumText">
          <h1>Alcanza más rápido tus metas <br />con Premium</h1>
          <button className="btnVerPlan" onClick={scrollToTable}>Ver Plan</button>
        </div>
        <div className="premiumImageContainer">
          <img src={Moneda} alt="Premium Icon" className="premiumImage" />
        </div>
      </div>
      
      <div className="premiumComparison" id="comparisonTable">
        <h2>
          Plan básico vs <span className="highlight">Premium</span>
        </h2>
        
        <div className="comparisonTable">
          <div className="row header">
            <div></div>
            <div className="planTitle">Básico</div>
            <div className="planTitle">Premium</div>
          </div>
          
          <div className="row">
            <div className="descriptionContainer">
              <img src={Grafico} alt="Icon" />
              <div className="description">
                <h3>Reportes y Análisis Detallados</h3>
                <p>Obtén una visión completa de los hábitos de ahorro y gasto con reportes avanzados. Visualiza patrones, identifica oportunidades de mejora y toma decisiones financieras más informadas para toda la familia.</p>
              </div>
            </div>
            <div className="iconColumn">
              <img src={No} alt="No Icon" />
            </div>
            <div className="iconColumn">
              <img src={Si} alt="Sí Icon" />
            </div>
          </div>
          
          <div className="row">
            <div className="descriptionContainer">
              <img src={Campana} alt="Icon" />
              <div className="description">
                <h3>Alertas y Recordatorios Personalizados</h3>
                <p>Recibe notificaciones y recordatorios ajustados a tus metas y objetivos de ahorro. Mantente al día en tu progreso y nunca pierdas una oportunidad de cumplir tus metas financieras.</p>
              </div>
            </div>
            <div className="iconColumn">
              <img src={No} alt="No Icon" />
            </div>
            <div className="iconColumn">
              <img src={Si} alt="Sí Icon" />
            </div>
          </div>
          
          <div className="row">
            <div className="descriptionContainer">
              <img src={Infinito} alt="Icon" />
              <div className="description">
                <h3>Metas Ilimitadas</h3>
                <p>Establece todas las metas que desees sin límites. Con la versión premium, podrás organizar tus objetivos financieros y avanzar en cada uno de ellos a tu propio ritmo.</p>
              </div>
            </div>
            <div className="iconColumn">
            <p>Máximo 3 a la vez</p>
            </div>
            <div className="iconColumn">
              <img src={Si} alt="Sí Icon" />
            </div>
          </div>

          <div className="row">
            <div className="descriptionContainer">
              <img src={Infinito} alt="Icon" />
              <div className="description">
                <h3>Tareas Ilimitadas</h3>
                <p>Crea y asigna tantas tareas como necesites para motivar el ahorro y buenos hábitos financieros. Con la versión premium, no habrá límites para organizar tus objetivos.</p>
              </div>
            </div>
            <div className="iconColumn">
              <p>Máximo 5 a la vez</p>
            </div>
            <div className="iconColumn">
              <img src={Si} alt="Sí Icon" />
            </div>
          </div>
          
          <div className="row">
            <div className="descriptionContainer">
              <img src={Padres} alt="Icon" />
              <div className="description">
                <h3>Control Parental Avanzado</h3>
                <p>Accede a herramientas adicionales para supervisar y guiar a tus hijos en su manejo del dinero. Ajusta límites, revisa su progreso y fomenta hábitos financieros saludables de forma segura y personalizada.</p>
              </div>
            </div>
            <div className="iconColumn">
              <img src={No} alt="No Icon" />
            </div>
            <div className="iconColumn">
              <img src={Si} alt="Sí Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
