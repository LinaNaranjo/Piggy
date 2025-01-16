import React, { useState, useEffect } from "react";
import axios from "axios";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Movimientos.scss";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newMovement, setNewMovement] = useState({
    name: "",
    date: "",
    amount: "",
    type: "",
    TotalAmount: "",
    
  });
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://localhost:8080/movement/user/1", { headers })
      .then((response) => {
        const data = response.data;
        setMovimientos(data);

        const total = data.reduce(
          (total, item) => total + parseFloat(item.amount),
          0
        );
        setTotalGeneral(total);
      })
      .catch((error) => {
        console.error("Error al cargar movimientos:", error);
        // alert("Error al cargar los movimientos. Por favor, inténtalo de nuevo.");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  const handleAddMovement = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8080/movement/new", newMovement, { headers })
      .then((response) => {
        const addedMovement = response.data;
        setMovimientos([...movimientos, addedMovement]);
        setTotalGeneral((prevTotal) => prevTotal + parseFloat(addedMovement.amount));
        setModalOpen(false);
        setNewMovement({ name: "", date: "", type: "", amount: "" });
      })
      .catch((error) => {
        console.error("Error al agregar movimiento:", error);
        alert("No se pudo agregar el movimiento. Inténtalo de nuevo.");
      });
  };

  const handleDelete = (index) => {
    const movementId = movimientos[index].id;
    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(`http://localhost:8080/movement/${movementId}`, { headers })
      .then(() => {
        setMovimientos(movimientos.filter((_, i) => i !== index));
        setTotalGeneral((prevTotal) => prevTotal - parseFloat(movimientos[index].amount));
      })
      .catch((error) => {
        console.error("Error al eliminar movimiento:", error);
        alert("No se pudo eliminar el movimiento. Inténtalo de nuevo.");
      });
  };

  // Function to format date without time
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('es-CO', options);
  };

  // Function to format amount with "$"
  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="movimientos-container">
      <h1>Resumen de Movimientos</h1>
      <button className="add-button" onClick={() => setModalOpen(true)}>
        Agregar
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeBtn" onClick={() => setModalOpen(false)}>
              &times;
            </button>
            <h2>Agregar un nuevo movimiento</h2>
            <form onSubmit={handleAddMovement}>
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
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="totales">
        <div className="total-general">
          <h2>Total General</h2>
          <p>{formatAmount(totalGeneral)}</p>
        </div>
      </div>

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
                <ModeEditOutlinedIcon
                  onClick={() => handleEdit(index)}
                  className="iconEdit"
                />
                <DeleteOutlinedIcon
                  onClick={() => handleDelete(index)}
                  className="iconDelete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movimientos;
