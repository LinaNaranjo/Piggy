import React, { useState } from "react";
import "./perfil.scss";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const Perfil = () => {
  const [userData, setUserData] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "3125428564",
    birthdate: "1995-06-15",
    address: "Barrio Ventura",
    nivel: "Bronce",
    metasActivas: 3,
    ingresosTotales: "$12,500",
    gastosTotales: "$8,300",
    ahorrosActuales: "$4,200",
    lastLogin: "2024-11-26",
    profilePicture: usuario,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prevState) => ({
          ...prevState,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img
          src={userData.profilePicture}
          alt="Usuario"
          className="perfil-foto"
        />
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
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
            <strong>Teléfono:</strong> {userData.phone}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {userData.birthdate}
          </p>
          <p>
            <strong>Dirección:</strong> {userData.address}
          </p>
        </div>
        <div className="perfil-section">
          <h2>Progreso en Piggy</h2>
          <p>
            <strong>Nivel:</strong> {userData.nivel}
          </p>
          <p>
            <strong>Metas Activas:</strong> {userData.metasActivas}
          </p>
          <p>
            <strong>Ingresos Totales:</strong> {userData.ingresosTotales}
          </p>
          <p>
            <strong>Gastos Totales:</strong> {userData.gastosTotales}
          </p>
          <p>
            <strong>Ahorros Actuales:</strong> {userData.ahorrosActuales}
          </p>
        </div>
        <div className="perfil-section">
          <h2>Historial</h2>
          <p>
            <strong>Última sesión:</strong> {userData.lastLogin}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
