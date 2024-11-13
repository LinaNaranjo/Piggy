import React, { useState } from "react";
import "./Registro.scss";
import logo from "../../assets/LogoNombre.png";
import atrasIcon from "../../assets/Images/ImagesNavbar/atras.png"
import { useNavigate } from "react-router-dom";

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    rol: "",
    correo: "",
    contraseña: "",
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formValues.nombre) validationErrors.nombre = "El nombre es requerido";
    if (!formValues.apellido)
      validationErrors.apellido = "El apellido es requerido";
    if (!formValues.edad || isNaN(formValues.edad) || formValues.edad <= 0)
      validationErrors.edad = "Ingresa una edad válida";
    if (!formValues.rol) validationErrors.rol = "Selecciona un rol";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.correo || !emailRegex.test(formValues.correo))
      validationErrors.correo = "Ingresa un correo válido";

    if (!formValues.contraseña || formValues.contraseña.length < 6)
      validationErrors.contraseña =
        "La contraseña debe tener al menos 6 caracteres";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario enviado con éxito:", formValues);
      setFormValues({
        nombre: "",
        apellido: "",
        edad: "",
        rol: "",
        correo: "",
        contraseña: "",
      });
      setTimeout(() => {
        setShowAlert(false);
        navigate("/home");
      }, 2000);
      
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
            <label htmlFor="nombre">Nombre Completo</label>
            <div className="input-con-icono">
              <input
                type="text"
                id="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                placeholder=""
              />
              {errors.nombre && <p className="error">{errors.nombre}</p>}
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="apellido">Apellidos</label>
            <div className="input-con-icono">
              <input
                type="text"
                id="apellido"
                value={formValues.apellido}
                onChange={handleChange}
                placeholder=""
              />
              {errors.apellido && <p className="error">{errors.apellido}</p>}
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="edad">Edad</label>
            <div className="input-con-icono">
              <input
                type="number"
                id="edad"
                value={formValues.edad}
                onChange={handleChange}
                placeholder=""
              />
              {errors.edad && <p className="error">{errors.edad}</p>}
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="rol">Rol</label>
            <select id="rol" value={formValues.rol} onChange={handleChange}>
              <option value="">Elige una opción</option>
              <option value="padre">Padre</option>
              <option value="hijo">Hijo</option>
              <option value="familiar">Familiar</option>
            </select>
            {errors.rol && <p className="error">{errors.rol}</p>}
          </section>
          <section className="seccion-input">
            <label htmlFor="correo">Correo Electronico</label>
            <div className="input-con-icono">
              <input
                type="email"
                id="correo"
                value={formValues.correo}
                onChange={handleChange}
                placeholder="example@example.com"
              />
              {errors.correo && <p className="error">{errors.correo}</p>}
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="password">Contraseña</label>
            <div className="input-con-icono">
              <input
                type="password"
                id="contraseña"
                value={formValues.contraseña}
                onChange={handleChange}
                placeholder="******"
              />
              {errors.contraseña && (
                <p className="error">{errors.contraseña}</p>
              )}
            </div>
          </section>
          <div className="opciones">
            <button type="submit" className="registro-boton">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
