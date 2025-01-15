import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Movimientos.scss";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newMovement, setNewMovement] = useState({
    descripcion: "",
    fecha: "",
    tipo: "",
    monto: "",
  });
  const [totalGeneral, setTotalGeneral] = useState(0);

  // Obtener movimientos al cargar el componente
  useEffect(() => {
    axios.get("http://localhost:8080/movement/user/1").then((response) => {
      const data = response.data;
      setMovimientos(data);
      // Calcular el total general
      const total = data.reduce((total, item) => total + item.monto, 0);
      setTotalGeneral(total);
    });
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  // Agregar un nuevo movimiento
  const handleAddMovement = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/movement/new", newMovement)
      .then((response) => {
        const addedMovement = response.data;
        setMovimientos([...movimientos, addedMovement]);
        setTotalGeneral((prevTotal) => prevTotal + parseFloat(addedMovement.monto));
        setModalOpen(false);
        setNewMovement({ descripcion: "", fecha: "", tipo: "", monto: "" });
      })
      .catch((error) => {
        console.error("Error al agregar movimiento:", error);
      });
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
                name="descripcion"
                value={newMovement.descripcion}
                onChange={handleInputChange}
                required
              />
              <label>Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={newMovement.fecha}
                onChange={handleInputChange}
                required
              />
              <label>Tipo de Movimiento:</label>
              <select
                name="tipo"
                value={newMovement.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </select>
              <label>Valor:</label>
              <input
                type="number"
                name="monto"
                value={newMovement.monto}
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
          <p>${totalGeneral}</p>
        </div>
      </div>
    </div>
  );
};

export default Movimientos;
