import React, { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Tareas.scss";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [newTarea, setNewTarea] = useState({ tarea: "", fecha: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddTarea = () => {
    if (newTarea.tarea && newTarea.fecha) {
      setTareas([...tareas, newTarea]);
      setNewTarea({ tarea: "", fecha: "" });
      setModalOpen(false);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleDelete = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setNewTarea(tareas[index]);
    setModalOpen(true);
    setTareas((prevTareas) => prevTareas.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTarea((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="tareas">
      <div className="tareasHeader">
        <h2>Tareas</h2>
        <button onClick={() => setModalOpen(true)} className="btnAgregar">
          Agregar
        </button>
      </div>

      <div className="tareasList">
        {tareas.map((tarea, index) => (
          <div className="tareaCard" key={index}>
            <input type="checkbox" className="checkbox" />
            <div className="tareaInfo">
              <span className="tareaTexto">{tarea.tarea}</span>
              <span className="tareaFecha">{tarea.fecha}</span>
            </div>
            <div className="tareaIcons">
              <ModeEditOutlinedIcon
                onClick={() => handleEdit(index)}
                className="iconEdit"
              />
              <DeleteOutlinedIcon
                onClick={() => handleDelete(index)}
                className="iconDelete"
              />
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeBtn" onClick={() => setModalOpen(false)}>
              X
            </button>
            <h3>Agregar Nueva Tarea</h3>
            <div className="modalForm">
              <label htmlFor="tarea">Tarea</label>
              <input
                type="text"
                id="tarea"
                name="tarea"
                value={newTarea.tarea}
                onChange={handleChange}
                placeholder="Mantener mi Cuarto Ordenado"
              />
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={newTarea.fecha}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleAddTarea} className="btnGuardar">
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tareas;
