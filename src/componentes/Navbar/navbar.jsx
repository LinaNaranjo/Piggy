import React from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import LogoNavbar from "../../assets/Images/ImagesNavbar/LogoNavbar.png";

const Navbar = () => {

  const navigate = useNavigate();
  const navegacionLogin = () => {
    navigate("/login");
  };
  const navegacionRegistro = () => {
    navigate("/registro");
  };

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <img src={LogoNavbar} alt="Logo" className="logo-image" />
      </div>
      <div className="navbar__links">
        <a href="#home">Home</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div className="navbar__buttons">
        <button onClick={navegacionLogin} className="login-btn">Iniciar sesión</button>
        <button onClick={navegacionRegistro} className="register-btn">Registrarse</button>
      </div>
    </nav>
  );
};

export default Navbar;
