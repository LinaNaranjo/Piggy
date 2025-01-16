import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./modal.scss";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_URL;

const Modal = ({ goal, onClose, onSave, userId }) => {
  const user = useSelector((state) => state.user);
  const [goalData, setGoalData] = useState({
    id: "",
    goalName: "",
    savedAmount: 0,
    goalAmount: "",
  });
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    if (goal) {
      setGoalData({
        id: goal.id,
        goalName: goal.goalName,
        savedAmount: goal.savedAmount,
        goalAmount: goal.goalAmount,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalData.goalAmount) {
      Swal.fire("Error", 'El campo "Valor Total" es obligatorio', "error");
      return;
    }
    goal ? handleEditGoal() : handleAddGoal();
  };

  // Agregar un monto positivo al aporte
  const handleAddAmount = () => {
    const newAmountValue = parseFloat(newAmount);
    if (isNaN(newAmountValue) || newAmountValue <= 0) {
      Swal.fire("Error", "El monto debe ser un número positivo", "error");
      return;
    }

    setGoalData((prevState) => {
      const updateSaveddAmount = prevState.savedAmount + newAmountValue;
      return {
        ...prevState,
        savedAmount: updateSaveddAmount,
      };
    });
    setNewAmount("");
  };

  // Agregar metas
  const handleAddGoal = async () => {
    try {
      const response = await axiosInstance.post(`/goal/new`, {
        user: { id: userId },
        goalName: goalData.goalName,
        savedAmount: goalData.savedAmount,
        goalAmount: parseFloat(goalData.goalAmount),
      });
      Swal.fire("Éxito", response.data.message, "success");
      onSave(response.data.goal); // Actualiza la lista de metas
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error(
        "Error al agregar la meta:",
        error.response ? error.response.data : error
      );
      Swal.fire("Error", "Hubo un problema al agregar la meta", "error");
    }
  };

  // Editar metas
  const handleEditGoal = async () => {
    try {
      const response = await axiosInstance.put(`/goal/${goalData.id}`, {
        goalName: goalData.goalName,
        savedAmount: goalData.savedAmount,
        goalAmount: parseFloat(goalData.goalAmount),
      });
      Swal.fire("Éxito", response.data.message, "success");
      onSave(response.data.goal); // Actualiza la meta editada en la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error(
        "Error al editar la meta:",
        error.response ? error.response.data : error
      );
      Swal.fire("Error", "Hubo un problema al editar la meta", "error");
    }
  };

  return (
    <div className="contenedor-principal-modal-overlay">
      <div className="contenedor-modal">
        <div className="contenedor-close">
          <h2 className="modal-title">
            {goal ? "Editar Meta" : "Agregar Nueva Meta"}
          </h2>
          <button className="close-boton" onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label className="modal-label">Nombre de la Meta:</label>
            <input
              className="modal-input"
              type="text"
              name="goalName"
              value={goalData.goalName}
              onChange={handleChange}
              required
            />
            <label className="modal-label">Valor Total:</label>
            <input
              className="modal-input"
              type="number"
              name="goalAmount"
              value={goalData.goalAmount}
              onChange={handleChange}
              required
            />
            <label className="modal-label">Ingresar Aporte:</label>
            <div className="add-amount">
              <input
                className="modal-input"
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
            <label className="modal-label">Total Ahorrado:</label>
            <input
              className="modal-input"
              type="number"
              name="savedAmount"
              value={goalData.savedAmount}
              onChange={handleChange}
              disabled
            />
            <div className="modal-buttons">
              <button className="boton-guardar" type="submit">
                {goal ? "Actualizar" : "Guardar"}
              </button>
              <button
                type="button"
                className="boton-cancelar"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
