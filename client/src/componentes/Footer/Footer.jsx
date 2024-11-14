import React from "react";
import { useNavigate } from "react-router-dom";
import LogoPiggy from "../../assets/Images/ImagesFooter/LogoNombre.png";
import XIcon from "../../assets/Images/ImagesFooter/x.svg";
import GmailIcon from "../../assets/Images/ImagesFooter/gmail.svg"; // Logo de Gmail
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  const navegacionHome = () => {
    navigate("/");
  };

  const navegacionPreguntasFrecuentes = () => {
    navigate("/preguntas");
  };

  return (
    <div id="contacto" className="footer">
      <div className="footerColumn">
        <img src={LogoPiggy} alt="Logo Nombre" className="footerLogo" />
      </div>
      <div className="footerColumn">
        <nav className="footerLinks">
          <a onClick={navegacionHome} style={{ cursor: "pointer" }}>Home</a>
          <a onClick={navegacionPreguntasFrecuentes} style={{ cursor: "pointer" }}>
            Preguntas Frecuentes
          </a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
      <div className="footerColumn">
        <div className="footerSocialIcons">
          <a
            href="https://x.com/PiggyAhorrador"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={XIcon} alt="X" />
          </a>

          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ahorrapiggy@gmail.com">
            <img src={GmailIcon} alt="Gmail" />
          </a>
        </div>
        <p className="footerText">Sigue a Piggy en sus aventuras financieras</p>
      </div>
    </div>
  );
};

export default Footer;
