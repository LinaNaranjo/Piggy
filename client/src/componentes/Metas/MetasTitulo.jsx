import React, { useState } from "react";
import "./metasTitulo.scss";
import Modal from "../Modal/Modal";

const MetasTitulo = ({ onAddGoal }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="contenedor-titulo">
      <h1>Mis Metas</h1>
      <button className="boton-agregar" onClick={handleOpenModal}>
        Agregar
      </button>
      {showModal && <Modal onClose={handleCloseModal} onSave={onAddGoal} />}  {/* Pasa onSave aquí */}
    </div>
  );
};
export default MetasTitulo;
