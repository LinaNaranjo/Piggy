import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Login from './pages/login/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import FormLogin from './pages/login/Login';
import Registro from './pages/Registro/PageRegistro';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<FormLogin/>} />
        <Route path="/registro" element={<Registro/>} />
      </Routes>
    </Router>
  );
}

export default App;