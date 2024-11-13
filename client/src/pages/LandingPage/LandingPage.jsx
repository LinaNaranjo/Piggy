import React from 'react';
import Navbar from '../../componentes/Navbar/Navbar';
import Seccion1 from '../../componentes/seccion1Landing/Seccion1';
import Ahorro from '../../componentes/seccion2Ahorro/Ahorro';
import Beneficios from '../../componentes/Beneficios/Beneficios';
import Logros from '../../componentes/Logros/Logros';
import Footer from '../../componentes/Footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Seccion1/>
      <Beneficios/>
      <Ahorro/>
      <Logros/>
      <Footer/>
    </div>
  );
};

export default LandingPage;

