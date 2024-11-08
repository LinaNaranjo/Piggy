import React from "react";
import "./Registro.scss";
import logo from "../../assets/LogoNombre.png";

const FormularioRegistro = () => {  
  return (
    <div className="formulario-registro-container"> 
      <div className="logo-contenedor"> 
        <img src={logo} alt="Logo" className="logo-imagen" /> 
      </div>
      <div className="formulario-contenedor">  
        <h1>Crear Cuenta</h1>
        <form className="formulario">
          <section className="seccion-input"> 
            <label htmlFor="nombre">Nombre Completo</label>
            <div className="input-con-icono"> 
              <input type="nombre" id="nombre" placeholder="" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="apellido">Apellidos</label>
            <div className="input-con-icono">
              <input type="apellido" id="apellido" placeholder="" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="edad">Edad</label>
            <div className="input-con-icono">
              <input type="edad" id="edad" placeholder="" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="rol">Rol</label>
            <select name="role" id="role">
              <option value="">Elige una opción</option>
              <option value="padre">Padre</option>
              <option value="hijo">Hijo</option>
              <option value="familiar">Familiar</option>
            </select>
          </section>
          <section className="seccion-input">
            <label htmlFor="correo">Correo Electronico</label>
            <div className="input-con-icono">
              <input type="correo" id="correo" placeholder="example@example.com" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="password">Contraseña</label>
            <div className="input-con-icono">
              <input type="password" id="password" placeholder="******" />
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
