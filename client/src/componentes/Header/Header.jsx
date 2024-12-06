import React, { useState } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import logo from "../../assets/Images/ImagesNavbar/LogoNavbar.png";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const tabs = [
  { name: "Inicio", path: "/home" },
  { name: "Tutoriales", path: "/home", isDropdown: true },
  { name: "Metas", path: "/metas" },
  { name: "Ingresos", path: "/ingresos" },
  { name: "Gastos", path: "/gastos" },
  { name: "Patrocinadores", path: "/patrocinadores" },
  { name: "Tareas", path: "/tareas" },
  { name: "Nivel", path: "/nivel" },
];

const Header = ({ onMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const user = useSelector((state) => state.user); // Obtener datos del usuario desde Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onMenuToggle) {
      onMenuToggle(!isOpen);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleTabClick = (tab) => {
    if (tab.isDropdown) {
      toggleDropdown(tab.name);
    } else {
      setActiveTab(tab.path);
      navigate(tab.path);
      setActiveDropdown(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/home">
          <img src={logo} alt="Logo Piggy" />
        </Link>
      </div>
      <nav className={`header-navbar ${isOpen ? "open" : ""}`}>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={
                activeTab === tab.path && !tab.isDropdown ? "active" : ""
              }
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
              {tab.isDropdown && (
                <ul
                  className={`dropdown ${
                    activeDropdown === tab.name ? "open" : ""
                  }`}
                >
                  <li onClick={() => navigate("/tutoriales2")}>
                    Aprende de Piggy
                  </li>
                  <li onClick={() => navigate("/tutoriales")}>
                    Aprende con Piggy
                  </li>
                </ul>
              )}
            </li>
          ))}
          {isOpen && (
            <ul>
              <li className="user-mobile-item">
                <span onClick={() => navigate("/perfil")}>Perfil</span>
              </li>
              <li className="user-mobile-item">
                <span onClick={handleLogout}>Salir</span>
              </li>
            </ul>
          )}
        </ul>
      </nav>
      <div className="header-usuario">
        <img src={usuario} alt="Imagen Usuario" />
        <span
          className="icono-abajo"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {isDropdownOpen ? "▲" : "▼"}
        </span>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <span onClick={() => navigate("/perfil")}>Perfil</span>
            <span onClick={handleLogout}>Salir</span>
          </div>
        )}
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
