import React from "react";
import LogoPiggy from "../../assets/Images/ImagesFooter/LogoNombre.png";
import FacebookIcon from "../../assets/Images/ImagesFooter/fb.svg";
import InstagramIcon from "../../assets/Images/ImagesFooter/insta.svg";
import XIcon from "../../assets/Images/ImagesFooter/x.svg";
import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerColumn">
                <img src={LogoPiggy} alt="Logo Nombre" className="footerLogo" />
            </div>
            <div className="footerColumn">
                <nav className="footerLinks">
                    <a href="#">Home</a>
                    <a href="#">Preguntas frecuentes</a>
                    <a href="#">Contacto</a>
                </nav>
            </div>
            <div className="footerColumn">
                <div className="footerSocialIcons">
                    <img src={FacebookIcon} alt="Facebook" />
                    <img src={InstagramIcon} alt="Instagram" />
                    <img src={XIcon} alt="X" />
                </div>
                <p className="footerText">Sigue a Piggy en sus aventuras financieras</p>
            </div>
        </div>
    );
};
 
export default Footer;