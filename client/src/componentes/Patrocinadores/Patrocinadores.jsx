import "./Patrocinadores.scss";
import padre from "../../assets/Images/ImagesPatrocinadores/padre.svg"
import madre from "../../assets/Images/ImagesPatrocinadores/madre.svg"
import abuelo from "../../assets/Images/ImagesPatrocinadores/abuelo.svg"
import abuela from "../../assets/Images/ImagesPatrocinadores/abuela.svg"
import tio from "../../assets/Images/ImagesPatrocinadores/tio.svg"


const Patrocinadores = () => {
  return (
    <div className="contenedorGeneralPatrocinadores">
      <div className="contenedorPatrocinadores">
        <h1>Patrocinadores</h1>
        <button className="btnAgregarpatrocinador">Agregar</button>
      </div>

      <div className="contenedorPrincipalPatrocinadores">
        <section className="patrocinadorIndividual">
          <img src={padre} alt="" />
          <span>Papa</span>
          <span>Aportes</span>
          <span>10</span>
        </section>
        <section className="patrocinadorIndividual">
          <img src={madre} alt="" />
          <span>Mama</span>
          <span>Aportes</span>
          <span>12</span>
        </section>
        <section className="patrocinadorIndividual">
          <img src={abuela} alt="" />
          <span>Abuela Lola</span>
          <span>Aportes</span>
          <span>5</span>
        </section>
        <section className="patrocinadorIndividual">
          <img src={abuelo}alt="" />
          <span>Abuelo Julio</span>
          <span>Aportes</span>
          <span>3</span>
        </section>
        <section className="patrocinadorIndividual">
          <img src={tio} alt="" />
          <span>Tio Cesar</span>
          <span>Aportes</span>
          <span>2</span>
        </section>
      </div>
    </div>
  );
};
export default Patrocinadores;
