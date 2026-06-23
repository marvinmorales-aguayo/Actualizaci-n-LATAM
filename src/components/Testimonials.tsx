/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  onNavigateToForm: () => void;
}

export default function Testimonials({ onNavigateToForm }: TestimonialsProps) {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: 'Una de las características o tecnología que me gusta mucho del LT S13 es el sistema Widman Fusion ese sistema nos ayuda... nos va indicando algunos parámetros donde vamos fallando en la operación para poner la atención y así mostrar una seguridad en el camino',
      author: 'Adrián Esparza Gallegos',
      position: 'Instructor de operadores',
      company: 'EN-TREGA'
    },
    {
      id: 2,
      quote: 'Lo que más me gusta de conducir el LT S13 es que tiene muy buen despegue, su ahorro de combustible y me gustan mucho los sensores de proximidad, se consideran muy útiles porque pueden salvar las vidas de muchos.',
      author: 'Miguel Ángel Mendoza',
      position: 'Operador',
      company: 'Directo Express'
    },
    {
      id: 3,
      quote: 'El International S13 nos ha dado resultados excepcionales en rendimiento de combustible y disponibilidad de equipo en carretera. El soporte financiero de International Financial ha sido clave para nuestra adquisición rápida de flota.',
      author: 'Gerardo Jiménez',
      position: 'Director General',
      company: 'AUTOTRANSPORTES PILOT'
    }
  ];

  return (
    <section
      id="testimonios"
      className="relative py-16 md:py-24 border-b border-neutral-200 overflow-hidden bg-neutral-900 bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.camionesinternational.com/documents/157231/157566/banner_21-9_SolucionesdeServicio.jpg")`,
      }}
    >
      {/* Premium dark overlay */}
      <div id="testimonios-overlay" className="absolute inset-0 bg-black/75 z-1" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[13px] font-bold text-[#EE7624] tracking-widest uppercase mb-2 block">
            Casos de éxito
          </span>
          <h2 className="text-3xl lg:text-[32px] font-extrabold text-white tracking-tight uppercase">
            Líderes de operaciones, instructores y operadores comparten su experiencia al volante de International
          </h2>
          <div className="w-16 h-[2.5px] bg-[#EE7624] mx-auto mt-4" />
        </div>

        {/* 3 columns grid for the exact testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="relative bg-white rounded-lg border border-neutral-200 shadow-sm p-6 sm:p-8 border-l-[6px] border-l-[#EE7624] flex flex-col justify-between"
            >
              {/* Floating Quote Accent */}
              <div className="absolute right-4 top-4 text-neutral-100 pointer-events-none select-none">
                <Quote size={40} className="stroke-[1] opacity-60" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Quote Text */}
                <p className="text-gray-700 italic text-sm leading-relaxed mb-6">
                  "{test.quote}"
                </p>

                {/* Author Metadata */}
                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="text-sm font-black text-gray-900 tracking-wide">
                    {test.author}
                  </h4>
                  <p className="text-xs text-[#EE7624] font-bold">
                    {test.position}
                  </p>
                  <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mt-1">
                    {test.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="flex flex-col items-center">
          <button
            id="testimonios-cta-btn"
            onClick={onNavigateToForm}
            className="bg-[#EE7624] hover:bg-[#d66216] text-white text-xs md:text-sm font-bold px-8 py-4 rounded-sm tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Iniciar Cotización Comercial</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
