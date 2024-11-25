import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./formLoguin.scss";
import logo from "../../assets/LogoNombre.png";
import emailIcon from "../../assets/Correo.png";
import paswordIcon from "../../assets/Candado.png";
import atrasIcon from "../../assets/Images/ImagesNavbar/atras.png"

const BASE_URL = import.meta.env.VITE_API_URL;

const FormLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("Mateito@gmail.com");
  const [password, setPassword] = useState("AccenturLoMejor");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, ingrese un correo electrónico válido.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });

        // Muestra el contenido completo de la respuesta
      console.log("Contenido de response.data:", response.data);

      // Accede a los datos del usuario (si la respuesta es correcta)
      const user = response.data;

      // Verifica si los datos del usuario están presentes
      if (user) {
        console.log("Datos del usuario logueado:", user);
        // Mostrar mensaje en la consola con el correo del usuario (o cualquier otro dato que quieras)
        console.log("Bienvenido", user.email);  // En tu caso, el email es 'Mateito@gmail.com'
      } else {
        console.error("No se encontraron datos de usuario en la respuesta.");
      }

        // Navega a la página de inicio si el login es exitoso
        navigate("/home");
      } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error.message);
        setErrors((prev) => ({
          ...prev,
          email: "Credenciales inválidas.",
        }));
      }
    }
  };

  const redirecionRegistro = () => {
    navigate("/registro");
  };

  const irAtras = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <button onClick={irAtras} className="ir-atras">
          <img className="boton-regresar" src={atrasIcon} alt="regresar" />
          {/* <span className="boton-regresar">Regresar</span> */}
        </button>
      </div>
      <div className="form-container">
        <h1>Iniciar sesión</h1>
        <form className="formulario-login" onSubmit={handleSubmit}>
          <section className="input-section">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <img src={emailIcon} alt="Email Icon" className="icon" />
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <div className="error">{errors.email}</div>}
          </section>
          <section className="input-section">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <img src={paswordIcon} alt="Password Icon" className="icon" />
              <input
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </section>
          <div className="options">
            <p className="forgot-password">¿Olvidaste la contraseña?</p>
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="registrarse">
          ¿No tienes cuenta?{" "}
          <span onClick={redirecionRegistro}>¡Regístrate!</span>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
