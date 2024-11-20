import React, { useEffect, useState } from "react";
import "./misMetas.scss";
import Header from "../../componentes/Header/Header";
import MetasTitulo from "../../componentes/Metas/MetasTitulo";
import MetasCard from "../../componentes/Metas/MetasCard";
import Modal from "../../componentes/Modal/Modal";

const MisMetas = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Bicicleta",
      totalAmount: 100000,
      amountSaved: 50000,
    },
    {
      id: 2,
      name: "Viaje de verano",
      totalAmount: 150000,
      amountSaved: 150000,
    },
    {
      id: 3,
      name: "Viaje a la playa",
      totalAmount: 150000,
      amountSaved: 150000,
    },
    {
      id: 4,
      name: "Cumpleaños mamá",
      totalAmount: 150000,
      amountSaved: 110000,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleEdit = (id) => {
    const goalToEdit = goals.find((goal) => goal.id === id);
    setSelectedGoal(goalToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar esta meta?"
    );
    if (isConfirmed) {
      setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  const handleComplete = (id, completed) => {
    alert(`Meta con ID: ${id} ${completed ? "completada" : "desmarcada"}`);
  };

  const handleAddGoal = (newGoal) => {
    const newGoalWithId = { ...newGoal, id: goals.length + 1 };
    setGoals([...goals, newGoalWithId]);
  };

  const handleSave = (updatedGoal) => {
    console.log("Meta actualizada:", updatedGoal);
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
      )
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
  };

  return (
    <>
      <Header />
      <MetasTitulo onAddGoal={handleAddGoal} />
      <div className="goal-list">
        {goals.map((goal) => (
          <MetasCard
            key={goal.id}
            goal={goal} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          goal={selectedGoal}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};
export default MisMetas;
