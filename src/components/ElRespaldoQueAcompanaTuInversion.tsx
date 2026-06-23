/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, ShieldCheck, Cpu, Check, ArrowRight } from 'lucide-react';

interface ElRespaldoQueAcompanaTuInversionProps {
  onNavigateToForm: () => void;
}

export default function ElRespaldoQueAcompanaTuInversion({ onNavigateToForm }: ElRespaldoQueAcompanaTuInversionProps) {
  const pilares = [
    {
      id: 'red',
      title: 'Red de Distribuidores',
      icon: MapPin,
      desc: 'Soporte continuo y cercanía estratégica para mantener tus camiones rodando.',
      benefits: [
        'Cobertura regional',
        'Atención especializada',
        'Soporte local'
      ]
    },
    {
      id: 'refacciones',
      title: 'Refacciones Originales',
      icon: ShieldCheck,
      desc: 'Componentes legítimos de alta ingeniería que protegen el valor de tu activo.',
      benefits: [
        'Calidad certificada',
        'Disponibilidad',
        'Durabilidad',
        'Rendimiento'
      ]
    },
    {
      id: 'servicios',
      title: 'Servicios Conectados',
      icon: Cpu,
      desc: 'Tecnología de telemática inteligente y analítica predictiva avanzada.',
      benefits: [
        'Monitoreo de flota',
        'Diagnósticos remotos',
        'Mantenimiento preventivo',
        'Alertas operativas',
        'Capacitación especializada'
      ]
    }
  ];

  return (
    <section id="respaldo" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Title Block */}
        <div className="text-center mb-14 md:mb-18 max-w-3xl mx-auto">
          <span className="text-[13px] font-semibold text-gray-400 tracking-widest uppercase mb-2 block">
            Propuesta Integral
          </span>
          <h2 className="text-3xl lg:text-[34px] font-extrabold text-[#272623] tracking-tight uppercase leading-snug">
            El respaldo que acompaña tu Inversión
          </h2>
          <div className="w-16 h-[2.5px] bg-[#EE7624] mx-auto mt-4 mb-4" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Nuestras soluciones integrales aseguran que tu flota permanezca en movimiento, maximizando la rentabilidad de tu negocio en todo momento.
          </p>
        </div>

        {/* 3 Columns Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          {pilares.map((pila) => {
            const IconComponent = pila.icon;
            return (
              <div 
                key={pila.id}
                className="bg-neutral-50 rounded-lg border border-neutral-200 p-8 flex flex-col justify-between hover:border-neutral-300 transition-colors"
              >
                <div>
                  {/* Icon representation */}
                  <div className="w-12 h-12 rounded-lg bg-[#EE7624]/10 flex items-center justify-center text-[#EE7624] mb-6 shadow-xs">
                    <IconComponent size={24} className="stroke-[1.75]" />
                  </div>

                  {/* Title / Name */}
                  <h3 className="text-xl font-bold text-[#272623] uppercase tracking-wide mb-3">
                    {pila.title}
                  </h3>

                  {/* Description text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {pila.desc}
                  </p>

                  <div className="w-full h-[1px] bg-neutral-200 my-4" />

                  {/* Advantage indicators */}
                  <span className="block text-[10px] font-extrabold text-[#272623] uppercase tracking-widest mb-3">
                    Beneficios Clave:
                  </span>
                  <ul className="space-y-2.5">
                    {pila.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                        <Check size={14} className="text-[#EE7624] stroke-[3] mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onNavigateToForm}
            className="inline-flex items-center gap-2 bg-[#272623] hover:bg-[#1a1a1a] text-white font-bold text-xs uppercase tracking-wider px-10 py-4 rounded-sm transition-colors cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Solicitar Asesoría Financiera</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
