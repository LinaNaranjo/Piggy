import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa Axios
import "./misMetas.scss";
import Header from "../../componentes/Header/Header";
import MetasTitulo from "../../componentes/Metas/MetasTitulo";
import MetasCard from "../../componentes/Metas/MetasCard";
import Boceto from "../../componentes/Boceto/Boceto";
import Modal from "../../componentes/Modal/Modal";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_URL;

const MisMetas = () => {
  const user = useSelector((state) => state.user); // Obtén el usuario logueado
  const [goals, setGoals] = useState([]); // Inicia un array vacío para las metas
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  // Función para actualizar los puntos acumulados
  const updateTotalPoints = () => {
    const newTotalPoints = goals.reduce(
      (total, goal) => total + goal.points,
      0
    );
    setTotalPoints(newTotalPoints);
  };

  // Obtener metas del usuario logueado al cargar el componente
  useEffect(() => {
    console.log(user);
    if (user?.id) {
      axiosInstance
        .get(`/goal/user/${user.id}`)
        .then((response) => {
          console.log("Metas del usuario:", response.data);
          setGoals(response.data);
          setFilteredGoals(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las metas:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudieron cargar las metas.",
            icon: "error",
          });
        });
    }
  }, [user?.id]);

  // Calcular puntos acumulados al cargar
  useEffect(() => {
    updateTotalPoints();
  }, [goals]);

  const handleMenuToggle = (isOpen) => setIsMenuOpen(isOpen);

  const handleEdit = (id) => {
    const goalToEdit = goals.find((goal) => goal.id === id);
    setSelectedGoal(goalToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta meta después de eliminarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#fa0606f6",
      cancelButtonColor: "#76d7c4",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedGoals = goals.filter((goal) => goal.id !== id);
        setGoals(updatedGoals);
        setFilteredGoals(updatedGoals);
        updateTotalPoints();

        Swal.fire({
          title: "¡Eliminado!",
          text: "La meta ha sido eliminada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#76d7c4",
        });
      }
    });
  };

  const handleComplete = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id && goal.savedAmount >= goal.goalAmount
        ? { ...goal, points: 10 }
        : goal
    );
    setGoals(updatedGoals);
    updateTotalPoints(updatedGoals);
  };

  const handleAddGoal = (newGoal) => {
    const newGoalWithId = { ...newGoal, id: goals.length + 1, points: 0 };
    const updatedGoals = [...goals, newGoalWithId];
    setGoals(updatedGoals);
    setFilteredGoals(updatedGoals);
    updateTotalPoints();
  };

  // const handleSave = (updatedGoal) => {
  //   const updatedGoals = goals.map((goal) =>
  //     goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal
  //   );
  //   setGoals(updatedGoals);
  //   setFilteredGoals(updatedGoals);
  //   updateTotalPoints();
  // };

  const handleSaveGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setFilteredGoals((prevGoals) => [...prevGoals, newGoal]); // También actualiza las metas filtradas
    updateTotalPoints(); // Recalcula los puntos
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
            onSave={handleSaveGoal}
            userId={user?.id}
          />
        )}
      </div>
    </>
  );
};

export default MisMetas;
