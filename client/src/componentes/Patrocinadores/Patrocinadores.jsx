import { useState, useEffect } from "react";
import axios from "axios";
import "./Patrocinadores.scss";
import { FaPencilAlt, FaTrash } from "react-icons/fa"; // Iconos para editar y eliminar

const Patrocinadores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contributions, setContributions] = useState(0);
  const [editingSponsor, setEditingSponsor] = useState(null); // Estado para el patrocinador en edición
  const [patrocinadores, setPatrocinadores] = useState([]);

  // Cargar patrocinadores al montar el componente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://localhost:8080/sponsors/user/${user.id}`) // Cambia "1" por el ID dinámico del usuario
      .then((response) => setPatrocinadores(response.data))
      .catch((error) =>
        console.error("Error al cargar los patrocinadores:", error)
      );
  }, []);

  const handleOpenModal = (sponsor = null) => {
    if (sponsor) {
      setName(sponsor.name);
      setContributions(sponsor.contributions);
      setEditingSponsor(sponsor);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setName("");
    setContributions(0);
    setEditingSponsor(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (editingSponsor) {
      // Actualización de patrocinador
      axios
        .put(
          `http://localhost:8080/sponsors/${editingSponsor.id}`,
          { name, contributions },
          { headers }
        )
        .then(() => {
          setPatrocinadores(
            patrocinadores.map((sponsor) =>
              sponsor.id === editingSponsor.id
                ? { ...sponsor, name, contributions }
                : sponsor
            )
          );
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error al actualizar el patrocinador:", error);
          alert("No se pudo actualizar el patrocinador. Inténtalo de nuevo.");
        });
    } else {
      // Creación de nuevo patrocinador
      axios
        .post(
          "http://localhost:8080/sponsors/new",
          { name, contributions },
          { headers }
        )
        .then((response) => {
          const createdSponsor = response.data.Sponsor;
          setPatrocinadores([...patrocinadores, createdSponsor]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error al guardar el patrocinador:", error);
          alert("No se pudo guardar el patrocinador. Inténtalo de nuevo.");
        });
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`http://localhost:8080/sponsors/${id}`, { headers })
      .then(() => {
        setPatrocinadores(
          patrocinadores.filter((sponsor) => sponsor.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el patrocinador:", error);
        alert("No se pudo eliminar el patrocinador. Inténtalo de nuevo.");
      });
  };

  return (
    <div className="contenedorGeneralPatrocinadores">
      <div className="contenedorPatrocinadores">
        <h1>Patrocinadores</h1>
        <button
          className="btnAgregarpatrocinador"
          onClick={() => handleOpenModal()}
        >
          Agregar
        </button>
      </div>

      <div className="contenedorPrincipalPatrocinadores">
        {patrocinadores.map((patrocinador) => (
          <section key={patrocinador.id} className="patrocinadorIndividual">
            <span>{patrocinador.name}</span>
            <span>Cantidad de aportes</span>
            <span>{patrocinador.contributions}</span>
            <div className="actions">
              <FaPencilAlt
                className="actionIcon editIcon"
                onClick={() => handleOpenModal(patrocinador)}
              />
              <FaTrash
                className="actionIcon deleteIcon"
                onClick={() => handleDelete(patrocinador.id)}
              />
            </div>
          </section>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeButton" onClick={handleCloseModal}>
              ×
            </button>
            <h2>
              {editingSponsor ? "Editar Patrocinador" : "Agregar Patrocinador"}
            </h2>
            <label>
              Nombre:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa el nombre del patrocinador"
              />
            </label>
            <label>
              Contribuciones:
              <input
                type="number"
                value={contributions}
                onChange={(e) => setContributions(e.target.value)}
                placeholder="0"
                min="0"
              />
            </label>
            <div className="modalButtons">
              <button className="btnGuardar" onClick={handleSave}>
                {editingSponsor ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patrocinadores;
