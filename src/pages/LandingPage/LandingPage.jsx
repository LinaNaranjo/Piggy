import React from 'react';
import Navbar from '../../componentes/Navbar/Navbar';
import Seccion1 from '../../componentes/seccion1Landing/Seccion1';
import Ahorro from '../../componentes/seccion2Ahorro/Ahorro';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Seccion1/>
      <Ahorro/>
    </div>
  );
};

export default LandingPage;
