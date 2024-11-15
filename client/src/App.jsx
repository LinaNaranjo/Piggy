import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PreguntasF from "./pages/PreguntasFrecuentes/PreguntasF";
import FormLogin from "./pages/login/Login";
import Registro from "./pages/Registro/PageRegistro";
import Home from "./pages/Home/Home";
import MisMetas from "./pages/MisMetas/MisMetas";
import MisIngresos from "./pages/MisIngresos/MisIngresos";
import MisGastos from "./pages/MisGatos/MisGastos";
import MisPatrocinadores from "./pages/MisPatrocinadores/MisPatrocinadores";
import MisTareas from "./pages/MisTareas/MisTareas";
import MiNivel from "./pages/MiNivel/MiNivel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/preguntas" element={<PreguntasF />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/metas" element={<MisMetas />} />
        <Route path="/ingresos" element={<MisIngresos />} />
        <Route path="/gastos" element={<MisGastos />} />
        <Route path="/patrocinadores" element={<MisPatrocinadores />} />
        <Route path="/tareas" element={<MisTareas />} />
        <Route path="/nivel" element={<MiNivel />} />
      </Routes>
    </Router>
  );
}

export default App;
