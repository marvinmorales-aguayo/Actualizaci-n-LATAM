/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ConoceLasSeries from './components/ConoceLasSeries';
import ElRespaldoQueAcompanaTuInversion from './components/ElRespaldoQueAcompanaTuInversion';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingWidget from './components/FloatingWidget';
import { VehicleType } from './types';

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('');

  const handleNavigateToForm = (vehicleType: VehicleType = '') => {
    setSelectedVehicle(vehicleType);
    
    // Smooth scroll directly to the hero section or to the lead-form container
    const element = document.getElementById('hero');
    if (element) {
      const offset = 70; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Highlight target visual effect
      const formContainer = document.getElementById('lead-form-container');
      if (formContainer) {
        formContainer.classList.add('ring-4', 'ring-[#EE7624]', 'ring-offset-2');
        setTimeout(() => {
          formContainer.classList.remove('ring-4', 'ring-[#EE7624]', 'ring-offset-2');
        }, 2000);
      }
    }
  };

  return (
    <div id="landing-root" className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth antialiased">
      {/* 1. Navbar / Encabezado */}
      <Header onNavigateToForm={() => handleNavigateToForm('')} />

      <main id="main-content">
        {/* 2. Hero Section con formulario interactivo */}
        <Hero
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
        />

        {/* 3. Conoce las Series (Gama de Vehículos) */}
        <ConoceLasSeries onNavigateToForm={(vehicle) => handleNavigateToForm(vehicle)} />

        {/* 4. El Respaldo que acompaña tu Inversión (Propuesta Integral) */}
        <ElRespaldoQueAcompanaTuInversion onNavigateToForm={() => handleNavigateToForm('')} />

        {/* 5. Casos de Éxito (Testimoniales Reales) */}
        <Testimonials onNavigateToForm={() => handleNavigateToForm('')} />
      </main>

      {/* 6. Pie de Página */}
      <Footer />

      {/* 7. Elemento de Acción Flotante */}
      <FloatingWidget onNavigateToForm={() => handleNavigateToForm('')} />
    </div>
  );
}
