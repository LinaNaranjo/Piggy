import React from 'react';
import Navbar from '../../componentes/Navbar/Navbar';
import Seccion1 from '../../componentes/seccion1Landing/Seccion1';
import Beneficios from '../../componentes/Beneficios/Beneficios';
import Logros from '../../componentes/Logros/Logros';
import Premium from '../../componentes/Premium/Premium';
import Footer from '../../componentes/Footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Seccion1/>
      <Beneficios/>
      <Logros/>
      <Premium/>
      <Footer/>
    </div>
  );
};

export default LandingPage;

