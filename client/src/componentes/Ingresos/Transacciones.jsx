import React, { useState, useEffect } from "react";
import "./Transacciones.scss";

const Transacciones = ({ type }) => {
  const [transacciones, setTransacciones] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaccion, setCurrentTransaccion] = useState({
    nombre: "",
    motivo: "",
    cantidad: 0,
    id: null,
  });

  
  useEffect(() => {
    const storedTransacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    setTransacciones(storedTransacciones);
    setTotal(
      storedTransacciones.reduce((acc, transaccion) => acc + transaccion.cantidad, 0)
    );
  }, []);

 
  useEffect(() => {
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
  }, [transacciones]);

  const handleAgregar = () => {
    setIsModalOpen(true);
    setCurrentTransaccion({ nombre: "", motivo: "", cantidad: 0, id: null });
  };

  const handleSubmit = () => {
    if (currentTransaccion.id === null) {
      
      const newTransaccion = {
        ...currentTransaccion,
        id: Date.now(), 
      };
      setTransacciones([...transacciones, newTransaccion]);
      setTotal(total + currentTransaccion.cantidad);
    } else {
   
      const updatedTransacciones = transacciones.map((transaccion) =>
        transaccion.id === currentTransaccion.id
          ? currentTransaccion
          : transaccion
      );
      setTransacciones(updatedTransacciones);
      setTotal(
        updatedTransacciones.reduce((acc, transaccion) => acc + transaccion.cantidad, 0)
      );
    }

    setIsModalOpen(false);
  };

  const handleEditar = (id) => {
    const transaccionToEdit = transacciones.find((transaccion) => transaccion.id === id);
    setCurrentTransaccion(transaccionToEdit);
    setIsModalOpen(true);
  };

  const handleEliminar = (id) => {
    const transaccionEliminada = transacciones.find((t) => t.id === id);
    setTotal(total - transaccionEliminada.cantidad);
    setTransacciones(transacciones.filter((t) => t.id !== id));
  };

  return (
    <div className="transacciones">
      <div className="transaccionesHeader">
        <div className="transaccionesTitulo">
          {type === "ingresos" ? "Mis Ingresos Totales: $" : "Mis Gastos Totales: $"}
          <span
            className={`transaccionesTotal ${
              type === "gastos" ? "transaccionesTotalGastos" : ""
            }`}
          >
            {total}
          </span>
        </div>
        <button
          className={`transaccionesAgregar ${
            type === "gastos" ? "transaccionesAgregarGastos" : ""
          }`}
          onClick={handleAgregar}
        >
          Agregar
        </button>
      </div>
      <div className="transaccionesLista">
        {transacciones.map((transaccion) => (
          <div className="transaccionCard" key={transaccion.id}>
            <div className="transaccionInfo">
              <div className="transaccionMotivo">
                {transaccion.nombre} - {transaccion.motivo}
              </div>
              <div
                className={`transaccionCantidad ${
                  type === "gastos" ? "transaccionCantidadGastos" : ""
                }`}
              >
                ${transaccion.cantidad}
              </div>
            </div>
            <div className="transaccionAcciones">
              <button
                className="transaccionEditar"
                onClick={() => handleEditar(transaccion.id)}
              >
                ✏️
              </button>
              <button
                className="transaccionEliminar"
                onClick={() => handleEliminar(transaccion.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="transaccionesModal">
          <div className="modalContenido">
            <div className="modalTitulo">
              {currentTransaccion.id ? "Editar Transacción" : "Agregar Transacción"}
            </div>
            <input
              className="modalInput"
              type="text"
              placeholder="Nombre"
              value={currentTransaccion.nombre}
              onChange={(e) =>
                setCurrentTransaccion({
                  ...currentTransaccion,
                  nombre: e.target.value,
                })
              }
            />
            <input
              className="modalInput"
              type="text"
              placeholder="Motivo"
              value={currentTransaccion.motivo}
              onChange={(e) =>
                setCurrentTransaccion({
                  ...currentTransaccion,
                  motivo: e.target.value,
                })
              }
            />
            <input
              className="modalInput"
              type="number"
              placeholder="Cantidad"
              value={currentTransaccion.cantidad}
              onChange={(e) =>
                setCurrentTransaccion({
                  ...currentTransaccion,
                  cantidad: parseFloat(e.target.value),
                })
              }
            />
            <div>
              <button className="modalBoton" onClick={handleSubmit}>
                {currentTransaccion.id ? "Actualizar" : "Agregar"}
              </button>
              <button
                className="modalCancelar modalBoton"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transacciones;


