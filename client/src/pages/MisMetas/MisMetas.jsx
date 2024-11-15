import React, { useState } from "react";
import "./misMetas.scss"
import Header from "../../componentes/Header/Header";
import MetasTitulo from "../../componentes/Metas/MetasTitulo";
import MetasCard from "../../componentes/Metas/MetasCard";

const MisMetas = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Bici', totalAmount: 100000, amountSaved: 50000, activitiesDone: 20, activitiesTotal: 30 },
    { id: 2, name: 'Viaje a la playa', totalAmount: 150000, amountSaved: 100000, activitiesDone: 10, activitiesTotal: 20 },
    { id: 3, name: 'Viaje a la playa', totalAmount: 150000, amountSaved: 100000, activitiesDone: 10, activitiesTotal: 20 },
    { id: 4, name: 'Viaje a la playa', totalAmount: 150000, amountSaved: 100000, activitiesDone: 10, activitiesTotal: 20 },
  ]);

  const handleEdit = (id) => {
    alert(`Editar meta con ID: ${id}`);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar esta meta?');
    if (isConfirmed) {
      setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  const handleComplete = (id, completed) => {
    alert(`Meta con ID: ${id} ${completed ? 'completada' : 'desmarcada'}`);
  };

  const handleAddGoal = (newGoal) => {
    const newGoalWithId = { ...newGoal, id: goals.length + 1 }; 
    setGoals([...goals, newGoalWithId]); 
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
    </>
  );
};
export default MisMetas;
