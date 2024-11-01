import React from "react";
import "./Registro.scss"
import logoRegistro from "../assets/LogoNombre.png"

const Registro = () => {
    return (
   
        <div className="containerRegistro">
            <h1>Registro</h1>
         
            <div className="logoContainer">
        <img src={logoRegistro} alt="Logo" className="logo-image" />
      </div>
       
        
        </div>
      
    );
  };
  
  export default Registro;
  

