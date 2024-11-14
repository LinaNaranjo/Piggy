import React from "react";
import "./PreguntasFrecuentes.scss";

const PreguntasFrecuentes = () => {
  return (
    <div className="preguntas-frecuentes">
      <h1>Preguntas Frecuentes</h1>
      <div className="pregunta">
        <h2>¿Con cuánto dinero puedo empezar a usar Piggy?</h2>
        <p>
          Piggy no es una aplicación para hacer transacciones de dinero, es una herramienta de educación financiera gratuita, que está disponible a través de la app web y móvil para ofrecerte mayor flexibilidad. Esta aplicación te permite tener una visión general de las decisiones financieras de tu hijo y hacer un seguimiento de sus objetivos de ahorro.
        </p>
      </div>
      <div className="pregunta">
        <h2>¿A qué rango de edad se dirige esta aplicación?</h2>
        <p>
          Piggy está diseñada para niños desde aproximadamente los 6 años (niños que ya saben leer y realizar operaciones básicas de sumas y restas) y va hasta los 17 años.
        </p>
      </div>
      <div className="pregunta">
        <h2>¿Quién debe registrarse en la página?</h2>
        <p>
          Es muy importante tener en cuenta que Piggy no va orientado a un solo usuario de forma individual, es un trabajo en equipo: los padres son los responsables para monitorear la interacción de sus hijos con la aplicación y los niños serán los aprendices. En este orden de ideas debe registrarse el padre de familia.
        </p>
      </div>
      <div className="pregunta">
        <h2>¿Cómo puedo mantener motivado a mi hijo para que adquiera el hábito de realizar un control de gastos y proyección de sus metas a través del ahorro?</h2>
        <p>
          Piggy ha diseñado un sistema de recompensas a través del número de interacciones con la página que le permiten al niño vincular las recompensas a las tareas de ahorro alcanzadas, y con insignias que reconocerán su esfuerzo y aprendizaje en educación financiera, además de juegos que harán que su experiencia sea divertida para mantenerlo motivado a alcanzar sus logros.
        </p>
      </div>
      <div className="pregunta">
        <h2>¿Qué tan segura es la aplicación?</h2>
        <p>
          Una de las prioridades de Piggy es brindar educación financiera de forma interactiva y segura, y buscamos proteger a nuestros usuarios. Por lo tanto, utilizamos filtros de seguridad para que su información esté protegida.
        </p>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
