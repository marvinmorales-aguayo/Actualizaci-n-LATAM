/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, ArrowUpRight } from 'lucide-react';
import { VehicleType } from '../types';

interface ConoceLasSeriesProps {
  onNavigateToForm: (vehicle: VehicleType) => void;
}

export default function ConoceLasSeries({ onNavigateToForm }: ConoceLasSeriesProps) {
  const series = [
    {
      id: 'tractores',
      title: 'Tractocamiones',
      tags: ['Serie LT', 'Serie RH'],
      description: 'Producidos, probados y comprobados en varias aplicaciones en carretera, nuestros tractocamiones, incluidas las series International LT y RH, se encuentran entre los camiones más duraderos, eficientes y centrados en el conductor en la carretera.',
      vehicleType: 'Tractocamiones' as VehicleType,
      image: 'https://www.camionesinternational.com/documents/157231/157566/banner_21-9_Camiones.jpg',
    },
    {
      id: 'servicio-severo',
      title: 'Servicio Severo',
      tags: ['Serie HV', 'Serie HX'],
      description: 'Nuestros camiones de servicio severo están diseñados para afrontar los trabajos más exigentes. Su gran potencia y rendimiento se combinan con una maniobrabilidad precisa.',
      vehicleType: 'Unidades de Servicio Severo' as VehicleType,
      image: 'https://www.camionesinternational.com/o/adaptive-media/image/158198/Preview-1000x0/international-group-factory-workers-inspecting-truck-front-escobedo-231205-2614.jpg',
    },
    {
      id: 'servicio-mediano',
      title: 'Servicio Mediano',
      tags: ['Serie MV', 'Serie eMV'],
      description: 'Nuestros camiones de servicio mediano ofrecen la robustez, confiabilidad and la capacidad de response de nuestros modelos más grandes, a la vez que le brindan la maniobrabilidad que necesita.',
      vehicleType: 'Camiones Medianos' as VehicleType,
      isGreenTech: true,
      image: 'https://www.camionesinternational.com/documents/157231/174386/HX_Beneficio_1.jpg',
    },
  ];

  return (
    <section id="conoce-las-series" className="py-16 md:py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-[#EE7624] text-xs font-black uppercase tracking-widest block mb-2">
            Gama de Vehículos
          </span>
          <h2 className="text-3xl lg:text-[34px] font-extrabold text-[#272623] tracking-tight uppercase">
            Conoce las Series
          </h2>
          <div className="w-16 h-[2.5px] bg-[#EE7624] mx-auto mt-4 mb-4" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Nuestro portafolio de camiones y tractocamiones listos para incorporarse a tu flota comercial.
          </p>
        </div>

        {/* Series Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {series.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Header / Showcase */}
                <div className="relative w-full h-48 bg-neutral-100 overflow-hidden border-b border-neutral-200">
                  <div className="absolute inset-0 bg-neutral-900/10 z-1" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Left Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className={`text-[9px] font-black px-2.5 py-1 uppercase tracking-wider rounded-xs ${
                          tag === 'Serie eMV' 
                            ? 'bg-emerald-600 text-white flex items-center gap-1' 
                            : 'bg-[#272623] text-white'
                        }`}
                      >
                        {tag === 'Serie eMV' && (
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Absolute aligned Green Tech Badge - Fixed location preventing truncation */}
                  {item.isGreenTech && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-2.5 py-1 rounded-xs uppercase tracking-wider animate-pulse flex items-center gap-1">
                        🌿 TECNOLOGÍA VERDE
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 bg-[#EE7624]/10 rounded-sm text-[#EE7624]">
                      <Truck size={16} />
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-[#272623] uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  {/* Tags Detail Row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Disponibles:
                    </span>
                    <div className="flex gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span key={tag} className="text-xs font-semibold text-gray-700">
                          {tag}{idx < item.tags.length - 1 ? ' /' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card description */}
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Section */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-auto">
                <button
                  onClick={() => onNavigateToForm(item.vehicleType)}
                  className="w-full mt-4 bg-white hover:bg-neutral-50 border-2 border-[#272623] hover:border-[#EE7624] text-[#272623] hover:text-[#EE7624] font-bold text-xs tracking-wider uppercase py-3 px-4 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Cotizar</span>
                  <ArrowUpRight size={13} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
