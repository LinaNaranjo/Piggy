import React from "react";
import { Link } from "react-router-dom";
import "./formLoguin.scss";
import logo from "../assets/LogoNombre.png";
import emailIcon from "../assets/Correo.png";
import paswordIcon from "../assets/Candado.png";


const FormLogin = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="form-container">
        <h1>Ingresar</h1>
        <form>
          <section className="input-section">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <img src={emailIcon} alt="Email Icon" className="icon" />
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
              />
            </div>
          </section >
          <section className="input-section">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <img src={paswordIcon} alt="Password Icon" className="icon" />
              <input type="password" id="password" placeholder="*******" />
            </div>
          </section>
          <div className="options">
            <p className="forgot-password">¿Olvidaste la contraseña?</p>
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="register">
          ¿No tienes cuenta? <span>¡Regístrate!</span>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
