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
    points: 0,
  });
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    if (goal) {
      setGoalData({
        id: goal.id,
        goalName: goal.goalName,
        savedAmount: goal.savedAmount,
        goalAmount: goal.goalAmount,
        points: goal.points,
      });
      updatePoints(goal.savedAmount, goal.goalAmount);
    }
  }, [goal]);

  const updatePoints = (savedAmount, goalAmount) => {
    setGoalData((prevState) => ({
      ...prevState,
      points: savedAmount >= goalAmount ? 10 : 0,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "savedAmount" || name === "goalAmount") {
      updatePoints(goalData.savedAmount, goalData.goalAmount);
    }
  };

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
        points: updateSaveddAmount >= prevState.goalAmount ? 10 : 0,
      };
    });
    setNewAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalData.goalAmount) {
      Swal.fire("Error", 'El campo "Valor Total" es obligatorio', "error");
      return;
    }

    try {
      //const response = await axios.post(`${BASE_URL}/goal/new`, {
      const response = await axiosInstance.post(`/goal/new`, {
        user: { id: userId },
        goalName: goalData.goalName,
        savedAmount: goalData.savedAmount,
        goalAmount: parseFloat(goalData.goalAmount),
      });

      console.log("Meta agregada:", response.data);

      const newGoal = response.data.goal;
      Swal.fire("Éxito", response.data.message, "success");
      onSave(newGoal); // Llamamos a la función de callback
      onClose(); // Cerramos el modal
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Hubo un problema al guardar la meta", "error");
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
                Guardar
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
