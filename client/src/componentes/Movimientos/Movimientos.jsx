import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Movimientos.scss";
import { useSelector } from "react-redux";

const Movimientos = () => {
  const user = useSelector((state) => state.user); // Obtén el usuario logueado
  const [movimientos, setMovimientos] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // Estado para el total
  const [modalOpen, setModalOpen] = useState(false);
  const [newMovement, setNewMovement] = useState({
    name: "",
    date: "",
    type: "",
    amount: "",
  });
  const [editingMovementId, setEditingMovementId] = useState(null);

  // Función para cargar movimientos y calcular el total
  const fetchMovimientos = async () => {
    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
  
    try {
      const response = await axios.get(`http://localhost:8080/movement/user/${user.id}`, {
        headers,
      });
      const data = response.data;
  
      setMovimientos(data);
  
      // Calcular el total sumando ingresos y restando gastos
      const total = data.reduce((acc, curr) => {
        const amount = parseFloat(curr.amount || 0);
        return curr.type === "INCOME" ? acc + amount : acc - amount;
      }, 0);
  
      setTotalAmount(total);
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
    }
  };
  

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  const handleAddOrUpdateMovement = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      if (editingMovementId !== null) {
        // Actualizar movimiento (PUT)
        const response = await axios.put(
          `http://localhost:8080/movement/${editingMovementId}`,
          newMovement,
          { headers }
        );
        const updatedMovement = response.data;
        setMovimientos((prev) =>
          prev.map((mov) => (mov.id === editingMovementId ? updatedMovement : mov))
        );
      } else {
        // Agregar nuevo movimiento (POST)
        const response = await axios.post(
          "http://localhost:8080/movement/new",
          newMovement,
          { headers }
        );
        const addedMovement = response.data;
        setMovimientos((prev) => [...prev, addedMovement]);
      }

      setModalOpen(false);
      setNewMovement({ name: "", date: "", type: "", amount: "" });
      setEditingMovementId(null);
      fetchMovimientos(); // Refrescamos los datos
    } catch (error) {
      console.error("Error al guardar el movimiento:", error);
      alert("Hubo un problema al guardar el movimiento. Inténtalo de nuevo.");
    }
  };

  const handleDelete = async (index) => {
    const movementId = movimientos[index].id;
    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(`http://localhost:8080/movement/${movementId}`, { headers });
      setMovimientos((prev) => prev.filter((_, i) => i !== index));
      fetchMovimientos(); // Refrescamos los datos
    } catch (error) {
      console.error("Error al eliminar movimiento:", error);
      alert("No se pudo eliminar el movimiento. Inténtalo de nuevo.");
    }
  };

  const handleEdit = (index) => {
    const movementToEdit = movimientos[index];
    setNewMovement({
      name: movementToEdit.name,
      date: movementToEdit.date,
      type: movementToEdit.type,
      amount: movementToEdit.amount,
    });
    setEditingMovementId(movementToEdit.id);
    setModalOpen(true);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("es-CO", options);
  };

  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="movimientos-container">
      <h1>Resumen de Movimientos</h1>

      <div className="total-general">
        <h2>Total General</h2>
        <p>{formatAmount(totalAmount)}</p>
      </div>

      <button className="add-button" onClick={() => setModalOpen(true)}>
        Agregar
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeBtn" onClick={() => setModalOpen(false)}>
              &times;
            </button>
            <h2>{editingMovementId ? "Editar movimiento" : "Agregar un nuevo movimiento"}</h2>
            <form onSubmit={handleAddOrUpdateMovement}>
              <label>Nombre del Movimiento:</label>
              <input
                type="text"
                name="name"
                value={newMovement.name}
                onChange={handleInputChange}
                required
              />
              <label>Fecha:</label>
              <input
                type="date"
                name="date"
                value={newMovement.date}
                onChange={handleInputChange}
                required
              />
              <label>Tipo de Movimiento:</label>
              <select
                name="type"
                value={newMovement.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="INCOME">Ingreso</option>
                <option value="EXPENSE">Gasto</option>
              </select>
              <label>Valor:</label>
              <input
                type="number"
                name="amount"
                value={newMovement.amount}
                onChange={handleInputChange}
                required
                placeholder="0"
              />
              <button type="submit" className="submit-button">
                {editingMovementId ? "Actualizar" : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="movimientos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento, index) => (
            <tr key={movimiento.id}>
              <td>{movimiento.name}</td>
              <td>{formatDate(movimiento.date)}</td>
              <td className={movimiento.type === "INCOME" ? "ingreso" : "gasto"}>
                {formatAmount(movimiento.amount)}
              </td>
              <td>{movimiento.type === "INCOME" ? "Ingreso" : "Gasto"}</td>
              <td className="tareaIcons">
                <ModeEditOutlinedIcon onClick={() => handleEdit(index)} className="iconEdit" />
                <DeleteOutlinedIcon onClick={() => handleDelete(index)} className="iconDelete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movimientos;
