// import React from "react";
// // import "./formLoguin.scss"

// const FormLogin = () => {
//   return (
//     <>
//       <h1>Ingresar</h1>
//       <div>
//         <form action="">
//           <section>
//             <label htmlFor="">Correo Electrónico</label>
//             <figure></figure>
//             <input type="text" placeholder="example@example.com" />
//           </section>
//           <section>
//             <label htmlFor="">Contraseña</label>
//             <figure></figure>
//             <input type="text" placeholder="*******" />
//           </section>
//           <div>
//             <p>Olviaste la contraseña ?</p>
//             <button>Iniciar Sesión</button>
//           </div>
//         </form>
//         <p>¿ No tienes cuenta ? ¡Regístrate!</p>
//       </div>
//     </>
//   );
// };
// export default FormLogin;



import React from "react";
import "./formLoguin.scss";
import logo from "../assets/LogoNombre.png"

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
            <input type="email" id="email" placeholder="example@example.com" />
          </section>
          <section className="input-section">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="*******" />
          </section>
          <div className="options">
            <p className="forgot-password">¿Olvidaste la contraseña?</p>
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </div>
        </form>
        <p className="register">¿No tienes cuenta? <span>¡Regístrate!</span></p>
      </div>
    </div>
  );
};

export default FormLogin;
