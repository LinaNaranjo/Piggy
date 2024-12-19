import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./perfil.scss";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const Perfil = () => {
  const user = useSelector((state) => state.user);
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture || usuario
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img src={profilePicture} alt="Usuario" className="perfil-foto" />
        <h1>
          {user.name} {user.lastName}
        </h1>
        <p>{user.email}</p>
        <div className="edit-image">
          <label htmlFor="upload-photo" className="btn-upload">
            Cambiar Imagen
          </label>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="perfil-body">
        <div className="perfil-section">
          <h2>Información Personal</h2>
          <p>
            <strong>Edad:</strong> {user.age}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {user.birthdate}
          </p>
          <p>
            <strong>Dirección:</strong> {user.address}
          </p>
        </div>
        <div className="perfil-section">
          <h2>Progreso en Piggy</h2>
          <p>
            <strong>Nivel:</strong> {user.nivel}
          </p>
          <p>
            <strong>Metas Activas:</strong> {user.metasActivas}
          </p>
          <p>
            <strong>Ingresos Totales:</strong> {user.ingresosTotales}
          </p>
          <p>
            <strong>Gastos Totales:</strong> {user.gastosTotales}
          </p>
          <p>
            <strong>Ahorros Actuales:</strong> {user.ahorrosActuales}
          </p>
        </div>

        <div className="perfil-section">
          <h2>Historial</h2>
          <p>
            <strong>Última sesión:</strong> {user.lastLogin}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
