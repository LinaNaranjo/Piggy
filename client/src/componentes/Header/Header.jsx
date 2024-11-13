import React, { useState } from "react";
import "./header.scss";
import logo from "../../assets/Images/ImagesNavbar/LogoNavbar.png";
import usuario from "../../assets/Images/ImagesNavbar/usuario.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ activeTab, setActiveTab ] = useState("Inicio");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo Piggy" />
      </div>
      <nav className={`header-navbar ${isOpen ? "open" : ""}`}>
      <ul>
          {["Inicio", "Mis metas", "Mis ingresos", "Mis gastos", "Mis patrocinadores", "Mis tareas", "Mi nivel"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
          {isOpen && <li className="user-mobile">Mi Cuenta</li>}
        </ul>
      </nav>
      <div className="header-usuario">
        <img src={usuario} alt="Imagen Usuario" />
        <span className="user-name">Mi Cuenta</span>
        <span className="icono-abajo">▼</span>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
