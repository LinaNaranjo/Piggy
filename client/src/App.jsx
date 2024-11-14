import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import PreguntasF from './pages/PreguntasFrecuentes/PreguntasF';
import FormLogin from './pages/login/Login';
import Registro from './pages/Registro/PageRegistro';
import Home from './pages/Home/Home';
import MisMetas from './pages/MisMetas/MisMetas';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/preguntas' element = {<PreguntasF/>} />
        <Route path="/login" element={<FormLogin/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path='/home' element = {<Home/>} />
        <Route path='/metas' element = {<MisMetas/>} />

      </Routes>
    </Router>
  );
}

export default App;