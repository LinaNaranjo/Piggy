import React, { useState } from "react";
import "./Registro.scss";
import axios from "axios";
import logo from "../../assets/LogoNombre.png";
import atrasIcon from "../../assets/Images/ImagesNavbar/atras.png";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    age: "",
    roleUser: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formValues.name) validationErrors.name = "El nombre es requerido.";
    if (!formValues.lastName)
      validationErrors.lastName = "El apellido es requerido.";
    if (!formValues.age || isNaN(formValues.age) || formValues.age <= 0)
      validationErrors.age = "Ingresa una edad válida.";
    if (!formValues.roleUser) validationErrors.roleUser = "Selecciona un rol.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email || !emailRegex.test(formValues.email))
      validationErrors.email = "Ingresa un correo válido.";

    if (!formValues.password || formValues.password.length < 6)
      validationErrors.password =
        "La contraseña debe tener al menos 6 caracteres.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const payload = {
        name: formValues.name, // Corregido
        lastName: formValues.lastName, // Corregido
        age: parseInt(formValues.age, 10), // Corregido
        email: formValues.email, // Corregido
        password: formValues.password, // Corregido
        roleUser: formValues.roleUser, // Enviar directamente
      };

      try {
        const response = await axios.post(`${BASE_URL}/register`, payload);
        console.log("Usuario registrado con éxito:", response.data);
        setShowAlert(true);
        setFormValues({
          name: "",
          lastName: "",
          age: "",
          roleUser: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setShowAlert(false);
          navigate("/home");
        }, 2000);
      } catch (error) {
        console.error(
          "Error al registrar usuario:",
          error.response?.data || error.message
        );
        setErrors((prev) => ({
          ...prev,
          general: "No se pudo completar el registro. Intenta de nuevo.",
        }));
      }
    }
  };

  const irAtras = () => {
    navigate("/");
  };

  return (
    <div className="formulario-registro-container">
      <div className="logo-contenedor">
        <img src={logo} alt="Logo" className="logo-imagen" />
        <button onClick={irAtras} className="ir-atras">
          <img className="boton-regresar" src={atrasIcon} alt="regresar" />
        </button>
      </div>
      {showAlert && <div className="alerta-exito">Registro exitoso</div>}
      <div className="formulario-contenedor">
        <h1>Crear Cuenta</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <section className="seccion-input">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={formValues.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              value={formValues.age}
              onChange={handleChange}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="roleUser">Rol</label>
            <select
              id="roleUser"
              value={formValues.roleUser}
              onChange={handleChange}
            >
              <option value="">Elige una opción</option>
              <option value="parent">Padre</option>
              <option value="child">Hijo</option>
              <option value="relative">Familiar</option>
            </select>
            {errors.roleUser && <p className="error">{errors.roleUser}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </section>
          <div className="opciones">
            <button type="submit" className="registro-boton">
              Registrarse
            </button>
          </div>
        </form>
        {errors.general && <p className="error-general">{errors.general}</p>}
      </div>
    </div>
  );
};

export default FormularioRegistro;
