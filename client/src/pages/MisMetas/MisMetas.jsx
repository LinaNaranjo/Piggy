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
import SuccessMessage from "../../componentes/SuccessMessage/SuccessMessage";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const MisMetas = () => {
  const user = useSelector((state) => state.user); // Obtén el usuario logueado
  const [goals, setGoals] = useState([]); // Inicia un array vacío para las metas
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userPoints, setUserPoints] = useState(0); // Estado para los puntos del usuario

  // Obtener metas del usuario logueado al cargar el componente
  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/goal/user/${user.id}`)
        .then((response) => {
          console.log("Metas del usuario:", response.data);
          if (Array.isArray(response.data) && response.data.length > 0) {
            setGoals(response.data);
            setFilteredGoals(response.data);
            setUserPoints(response.data[0]?.user?.points || 0); // Asignar los puntos del usuario
          } else {
            setGoals([]);
            setFilteredGoals([]);
            setUserPoints(0); // Si no hay metas, los puntos serán 0
          }
        })
        .catch((error) => {
          console.error("Error al obtener las metas:", error);
          if (error.response?.status !== 404) {
            Swal.fire({
              title: "Error",
              text: "No se pudieron cargar las metas.",
              icon: "error",
            });
          }
        });
    }
  }, [user?.id]);

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
        axios
          .delete(`http://localhost:8080/goal/${id}`)
          .then(() => {
            const updatedGoals = goals.filter((goal) => goal.id !== id);
            setGoals(updatedGoals);
            setFilteredGoals(updatedGoals);

            Swal.fire({
              title: "¡Eliminado!",
              text: "La meta ha sido eliminada exitosamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#76d7c4",
            });
          })
          .catch((error) => {
            console.error("Error al eliminar la meta:", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la meta. Por favor, inténtalo de nuevo.",
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#fa0606f6",
            });
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
    // Mostrar el mensaje de éxito cuando se complete la meta
    setShowSuccessMessage(true);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleAddGoal = (newGoal) => {
    const updatedGoals = [...goals, newGoal]; // Agregar la nueva meta al arreglo
    setGoals(updatedGoals); // Actualizar el estado de metas
    setFilteredGoals(updatedGoals); // También actualizar las metas filtradas
  };

  const handleSaveGoal = (newGoal) => {
    if (!newGoal || !newGoal.id) {
      return; // Simplemente retornamos sin hacer nada si newGoal no es válido
    }

    // Actualizar la meta en el arreglo de metas, si existe con el mismo ID
    const updatedGoals = goals.map((goal) =>
      goal.id === newGoal.id ? { ...goal, ...newGoal } : goal
    );

    setGoals(updatedGoals); // Actualizar el estado de las metas
    setFilteredGoals(updatedGoals); // Actualizar las metas filtradas si es necesario
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
        <div className="total-points-importante">
          <h3>
            <strong>IMPORTANTE:</strong> Por cada meta agregada obtienes 5
            puntos y por cada meta completada obtienes 20 puntos.
          </h3>
        </div>
        <div className="total-points">
          <h3>
            <Link to="/nivel">Ver puntos acumulados...</Link>
          </h3>
          {/* <h3>Puntos: {userPoints}</h3> Mostrar los puntos aquí */}
        </div>

        <div className="goal-list">
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) =>
              goal && goal.id ? (
                <MetasCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                />
              ) : (
                <div key={Math.random()}>Meta inválida</div>
              )
            )
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
      {/* Mostrar el mensaje de éxito cuando se complete la meta */}
      {showSuccessMessage && (
        <SuccessMessage
          message="¡Meta completada con éxito!"
          onClose={handleCloseSuccessMessage}
        />
      )}
    </>
  );
};

export default MisMetas;
