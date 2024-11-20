import React, { useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/ImagesNavbar/LogoNavbar.png";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const tabs = [
  { name: "Inicio", path: "/home" },
  { name: "Mis metas", path: "/metas" },
  { name: "Mis ingresos", path: "/ingresos" },
  { name: "Mis gastos", path: "/gastos" },
  { name: "Mis patrocinadores", path: "/patrocinadores" },
  { name: "Mis tareas", path: "/tareas" },
  { name: "Mi nivel", path: "/nivel" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.path);
    navigate(tab.path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo Piggy" />
      </div>
      <nav className={`header-navbar ${isOpen ? "open" : ""}`}>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={activeTab === tab.path ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </li>
          ))}
          {isOpen && <li className="user-mobile">Mi Cuenta</li>}
        </ul>
      </nav>
      <div className="header-usuario">
        <img src={usuario} alt="Imagen Usuario" />
        <span className="icono-abajo" onClick={toggleDropdown}>
          {isDropdownOpen ? "▲" : "▼"}
        </span>
        {isDropdownOpen && (
          <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <span>Mi Perfil</span>
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
