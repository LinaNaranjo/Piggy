import React from "react";
// import "./formLoguin.scss"

const FormLogin = () => {
  return (
    <>
      <h1>Ingresar</h1>
      <div>
        <form action="">
          <section>
            <label htmlFor="">Correo Electrónico</label>
            <figure></figure>
            <input type="text" placeholder="example@example.com" />
          </section>
          <section>
            <label htmlFor="">Contraseña</label>
            <figure></figure>
            <input type="text" placeholder="*******" />
          </section>
          <div>
            <p>Olviaste la contraseña ?</p>
            <button>Iniciar Sesión</button>
          </div>
        </form>
        <p>¿ No tienes cuenta ? ¡Regístrate!</p>
      </div>
    </>
  );
};
export default FormLogin;
