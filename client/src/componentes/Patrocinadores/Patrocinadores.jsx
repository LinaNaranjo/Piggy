import { useState } from "react";
import "./Patrocinadores.scss";

const Patrocinadores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [patrocinadores, setPatrocinadores] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (name.trim()) {
      setPatrocinadores([...patrocinadores, { name, contributions: 0 }]);
      setName("");
      handleCloseModal();
    }
  };

  return (
    <div className="contenedorGeneralPatrocinadores">
      <div className="contenedorPatrocinadores">
        <h1>Patrocinadores</h1>
        <button className="btnAgregarpatrocinador" onClick={handleOpenModal}>
          Agregar
        </button>
      </div>

      <div className="contenedorPrincipalPatrocinadores">
        {patrocinadores.map((patrocinador, index) => (
          <section key={index} className="patrocinadorIndividual">
            <span>{patrocinador.name}</span>
            <span>Cantidad de aportes</span>
            <span>{patrocinador.contributions}</span>
          </section>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeButton" onClick={handleCloseModal}>
              ×
            </button>
            <h2>Agregar Patrocinador</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sebastian Mendivelso"
              />
            </label>
            <div className="modalButtons">
              <button className="btnGuardar" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patrocinadores;
