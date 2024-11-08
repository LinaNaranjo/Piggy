import React from "react";
import "./Registro.scss"; // Cambié el nombre del archivo SCSS
import logo from "../../assets/LogoNombre.png";
import emailIcon from "../../assets/Correo.png";
import paswordIcon from "../../assets/Candado.png";
//import PersonIcon from '@mui/icons-material/Person';

const FormularioRegistro = () => {  // Cambié el nombre del componente
  return (
    <div className="formulario-registro-container">  {/* Cambié la clase principal */}
      <div className="logo-contenedor">  {/* Cambié el nombre de la clase */}
        <img src={logo} alt="Logo" className="logo-imagen" />  {/* Cambié la clase */}
      </div>
      <div className="formulario-contenedor">  {/* Cambié la clase */}
        <h1>Crear Cuenta</h1>
        <form className="formulario">
          <section className="seccion-input">  {/* Cambié el nombre de la clase */}
            <label htmlFor="nombre">Nombre Completo</label>
            <div className="input-con-icono">  {/* Cambié el nombre de la clase */}
              <img src={emailIcon} alt="Email Icon" className="icono" />  {/* Cambié la clase */}
              <input type="nombre" id="nombre" placeholder="" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="apellido">Apellidos</label>
            <div className="input-con-icono">
              <img src={paswordIcon} alt="Password Icon" className="icono" />
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
              <img src={emailIcon} alt="Email Icon" className="icono" />
              <input type="correo" id="correo" placeholder="example@example.com" />
            </div>
          </section>
          <section className="seccion-input">
            <label htmlFor="password">Contraseña</label>
            <div className="input-con-icono">
              <img src={paswordIcon} alt="Password Icon" className="icono" />
              <input type="password" id="password" placeholder="******" />
            </div>
          </section>
          <div className="opciones">  {/* Cambié la clase */}
            <button type="submit" className="registro-boton">  {/* Cambié la clase */}
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
