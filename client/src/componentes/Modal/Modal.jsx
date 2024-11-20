import React, { useEffect, useState } from "react";
import "./modal.scss";

const Modal = ({ goal, onClose, onSave }) => {
  const [goalData, setGoalData] = useState({
    name: "",
    amountSaved: 0,
    totalAmount: "",
  });
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    if (goal) {
      setGoalData({
        id: goal.id,
        name: goal.name,
        amountSaved: goal.amountSaved,
        totalAmount: goal.totalAmount,
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAmount = () => {
    setGoalData((prevState) => ({
      ...prevState,
      amountSaved: prevState.amountSaved + parseFloat(newAmount), // Sumar a amountSaved
    }));
    setNewAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalData.totalAmount) {
      alert("El campo 'Valor Total' es obligatorio");
      return;
    }
    console.log(goalData);
    onSave(goalData);
    if (goal) {
      alert("Meta editada exitosamente");
    } else {
      alert("Meta agregada exitosamente");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="contenedor-close">
          <h2>{goal ? "Editar Meta" : "Agregar Nueva Meta"}</h2>
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
          <label>Total Ahorrado:</label>
          <input
            type="number"
            name="amountSaved"
            value={goalData.amountSaved}
            onChange={handleChange}
            disabled
          />
          <div className="add-amount">
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder={goal ? "Realizar Aporte" : "Primer Aporte"}
            />
            <button
              type="button"
              onClick={handleAddAmount}
              className="boton-agregar-modal"
            >
              +
            </button>
          </div>
          <button className="boton-guardar" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
