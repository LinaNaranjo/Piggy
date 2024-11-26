import React, { useState } from "react";
import "./metasTitulo.scss";
import Modal from "../Modal/Modal";
import FiltrosMetas from "../FiltrosMetas/FiltrosMetas";

const MetasTitulo = ({ goals, setFilteredGoals, onAddGoal }) => {
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
      <FiltrosMetas goals={goals} setFilteredGoals={setFilteredGoals} />
      <div className="contenedor-boton-agregar">
        <button className="boton-agregar" onClick={handleOpenModal}>
          Agregar
        </button>
      </div>
      {showModal && <Modal onClose={handleCloseModal} onSave={onAddGoal} />}
    </div>
  );
};

export default MetasTitulo;
