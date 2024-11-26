import React, { useState } from "react";
import "./misMetas.scss";
import Header from "../../componentes/Header/Header";
import MetasTitulo from "../../componentes/Metas/MetasTitulo";
import MetasCard from "../../componentes/Metas/MetasCard";
import Boceto from "../../componentes/Boceto/Boceto"; // SkeletonCard
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
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

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
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);
      setFilteredGoals(updatedGoals);
    }
  };

  const handleComplete = (id, completed) => {
    alert(`Meta con ID: ${id} ${completed ? "completada" : "desmarcada"}`);
  };

  const handleAddGoal = (newGoal) => {
    const newGoalWithId = { ...newGoal, id: goals.length + 1 };
    const updatedGoals = [...goals, newGoalWithId];
    setGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
  };

  const handleSave = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
    );
    setGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
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
