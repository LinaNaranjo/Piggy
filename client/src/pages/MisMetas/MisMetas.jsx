import React, { useState, useEffect } from "react";
import "./misMetas.scss";
import Header from "../../componentes/Header/Header";
import MetasTitulo from "../../componentes/Metas/MetasTitulo";
import MetasCard from "../../componentes/Metas/MetasCard";
import Boceto from "../../componentes/Boceto/Boceto";
import Modal from "../../componentes/Modal/Modal";

const MisMetas = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Bicicleta",
      totalAmount: 100000,
      amountSaved: 50000,
      points: 0,
    },
    {
      id: 2,
      name: "Viaje de verano",
      totalAmount: 150000,
      amountSaved: 150000,
      points: 10,
    },
    {
      id: 3,
      name: "Viaje a la playa",
      totalAmount: 150000,
      amountSaved: 150000,
      points: 10,
    },
    {
      id: 4,
      name: "Cumpleaños mamá",
      totalAmount: 150000,
      amountSaved: 110000,
      points: 0,
    },
  ]);
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0); // Estado para los puntos acumulados

  // Función para actualizar los puntos acumulados
  const updateTotalPoints = () => {
    const newTotalPoints = goals.reduce(
      (total, goal) => total + goal.points,
      0
    );
    setTotalPoints(newTotalPoints); // Actualiza el estado de totalPoints
  };

  // Calcular puntos acumulados al cargar
  useEffect(() => {
    updateTotalPoints(); // Recalcular los puntos cuando la página cargue
  }, [goals]); // Solo se vuelve a ejecutar cuando goals cambia

  const handleMenuToggle = (isOpen) => setIsMenuOpen(isOpen);

  const handleEdit = (id) => {
    const goalToEdit = goals.find((goal) => goal.id === id);
    setSelectedGoal(goalToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta meta?")) {
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);
      setFilteredGoals(updatedGoals);
      updateTotalPoints(); // Recalcular puntos después de eliminar
    }
  };

  // Función para manejar la finalización de una meta
  const handleComplete = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id && goal.amountSaved >= goal.totalAmount
        ? { ...goal, points: 10 } // Asignamos 10 puntos solo si la meta se ha completado
        : goal
    );
    setGoals(updatedGoals);
    updateTotalPoints(updatedGoals); // Actualiza el total de puntos después de completar la meta
  };

  const handleAddGoal = (newGoal) => {
    const newGoalWithId = { ...newGoal, id: goals.length + 1, points: 0 }; // Aseguramos que las nuevas metas tengan 0 puntos al inicio
    const updatedGoals = [...goals, newGoalWithId];
    setGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
    updateTotalPoints(); // Recalcular puntos después de agregar nueva meta
  };

  const handleSave = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
    );
    setGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
    updateTotalPoints(); // Recalcula los puntos después de editar
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
  };

  return (
    <>
      <Header onMenuToggle={handleMenuToggle} />
      <div
        className="content"
        style={{ marginTop: isMenuOpen ? "30rem" : "0" }}
      >
        <div className="total-points">
          <h3>Puntos Acumulados: {totalPoints}</h3>
        </div>
        <MetasTitulo
          goals={goals}
          setFilteredGoals={setFilteredGoals}
          onAddGoal={handleAddGoal}
        />
        <div className="goal-list">
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) => (
              <MetasCard
                key={goal.id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))
          ) : (
            <div className="skeleton-container">
              {[1, 2, 3].map((_, index) => (
                <Boceto key={index} />
              ))}
            </div>
          )}
        </div>
        {isModalOpen && (
          <Modal
            goal={selectedGoal}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default MisMetas;
