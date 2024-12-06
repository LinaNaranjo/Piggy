import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./perfil.scss";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const Perfil = () => {
  const { name, lastName, email, age, phone, birthdate, address, nivel, metasActivas, ingresosTotales, gastosTotales, ahorrosActuales, lastLogin, profilePicture } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    name: name,
    lastName: lastName,
    email: email,
    age: age,
    phone: phone,
    birthdate: birthdate,
    address: address,
    nivel: nivel,
    metasActivas: metasActivas,
    ingresosTotales: ingresosTotales,
    gastosTotales: gastosTotales,
    ahorrosActuales: ahorrosActuales,
    lastLogin: lastLogin,
    profilePicture: profilePicture || usuario,
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

  useEffect(() => {
    setUserData({
      name,
      lastName,
      email,
      age,
      phone,
      birthdate,
      address,
      nivel,
      metasActivas,
      ingresosTotales,
      gastosTotales,
      ahorrosActuales,
      lastLogin,
      profilePicture: profilePicture || usuario,
    });
  }, [name, lastName, email, age, phone, birthdate, address, nivel, metasActivas, ingresosTotales, gastosTotales, ahorrosActuales, lastLogin, profilePicture]);

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img
          src={userData.profilePicture}
          alt="Usuario"
          className="perfil-foto"
        />
        <h1>{userData.name} {userData.lastName}</h1>
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
            <strong>Edad:</strong> {userData.age}
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

