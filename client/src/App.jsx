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
import Tutoriales from "./pages/Tutoriales/Tutoriales";
import Tutoriales2 from "./pages/Tutoriales2/Tutoriales2";
import MiPerfil from "./pages/MiPerfil/MiPerfil";
import PrivateRoutes from "./router/PrivateRoutes";
function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/preguntas" element={<PreguntasF />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/metas" element={<MisMetas />} />
          <Route path="/ingresos" element={<MisIngresos />} />
          <Route path="/gastos" element={<MisGastos />} />
          <Route path="/patrocinadores" element={<MisPatrocinadores />} />
          <Route path="/tareas" element={<MisTareas />} />
          <Route path="/nivel" element={<MiNivel />} />
          <Route path="/tutoriales" element={<Tutoriales />} />
          <Route path="/tutoriales2" element={<Tutoriales2 />} />
          <Route path="/perfil" element={<MiPerfil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
