import React, { useState } from "react";
import "./modal.scss";

const Modal = ({ onClose, onSave }) => {
  const [goalData, setGoalData] = useState({
    name: "",
    amountSaved: 0,
    totalAmount: 0,
    activitiesDone: 0,
    activitiesTotal: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(goalData);
    onSave(goalData);
    alert("Meta guardada exitosamente");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="contenedor-close">
          <h2>Agregar Nueva Meta</h2>
          <button className="close-boton" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Nombre de la Meta:</label>
          <input
            type="text"
            name="name"
            value={goalData.name}
            onChange={handleChange}
            required
          />
          <label>Valor Total:</label>
          <input
            type="number"
            name="totalAmount"
            value={goalData.totalAmount}
            onChange={handleChange}
            required
          />
          <label>Cantidad Ahorrada:</label>
          <input
            type="number"
            name="amountSaved"
            value={goalData.amountSaved}
            onChange={handleChange}
            required
          />
          <label>Actividades Realizadas:</label>
          <input
            type="number"
            name="activitiesDone"
            value={goalData.activitiesDone}
            onChange={handleChange}
            required
          />
          <label>Actividades Totales:</label>
          <input
            type="number"
            name="activitiesTotal"
            value={goalData.activitiesTotal}
            onChange={handleChange}
            required
          />
          <button className="boton-guardar" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
