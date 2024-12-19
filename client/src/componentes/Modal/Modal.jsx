import React, { useEffect, useState } from "react";
import formatoTexto from "../../componentes/FormatoTexto/FormatoTexto";
import "./modal.scss";
import Swal from 'sweetalert2';

const Modal = ({ goal, onClose, onSave }) => {
  const [goalData, setGoalData] = useState({
    id: "",
    name: "",
    amountSaved: 0,
    totalAmount: "",
    points: 0,
  });
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    if (goal) {
      setGoalData({
        id: goal.id,
        name: formatoTexto (goal.name),
        amountSaved: goal.amountSaved,
        totalAmount: goal.totalAmount,
        points: goal.points,
      });
      updatePoints(goal.amountSaved, goal.totalAmount); // Recalcular puntos al editar
    }
  }, [goal]);

  // Función para actualizar los puntos al modificar la cantidad ahorrada
  const updatePoints = (amountSaved, totalAmount) => {
    if (amountSaved >= totalAmount) {
      setGoalData((prevState) => ({
        ...prevState,
        points: 10, // Asignar 10 puntos si la meta se completó
      }));
    } else {
      setGoalData((prevState) => ({
        ...prevState,
        points: 0, // Si no está completada, no asignar puntos
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "amountSaved" || name === "totalAmount") {
      updatePoints(goalData.amountSaved, goalData.totalAmount); // Recalcular puntos si se cambia amountSaved o totalAmount
    }
  };

  const handleAddAmount = () => {
    const newAmountValue = parseFloat(newAmount);
    setGoalData((prevState) => ({
      ...prevState,
      amountSaved: prevState.amountSaved + newAmountValue, // Sumar a amountSaved
    }));
    setNewAmount("");
    updatePoints(goalData.amountSaved + newAmountValue, goalData.totalAmount); // Recalcular los puntos con el nuevo monto ahorrado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalData.totalAmount) {
      Swal.fire({
        title: 'Error',
        text: 'El campo "Valor Total" es obligatorio',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ff5733', 
      });
      return;
    }
    console.log(goalData);
    onSave(goalData);
    if (goal) {
      Swal.fire({
        title: 'Éxito',
        text: 'Meta editada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#76d7c4', 
      });
    } else {
      Swal.fire({
        title: 'Éxito',
        text: 'Meta agregada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#76d7c4',
      });
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
          <label>Ingresar Aporte:</label>
          <div className="add-amount">
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder={goal ? "0" : "0"}
            />
            <button
              type="button"
              onClick={handleAddAmount}
              className="boton-agregar-modal"
            >
              Agregar
            </button>
          </div>
          <label>Total Ahorrado:</label>
          <input
            type="number"
            name="amountSaved"
            value={goalData.amountSaved}
            onChange={handleChange}
            disabled
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
