/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { label: 'Términos de Uso', href: '#' },
    { label: 'Aviso de Privacidad', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Nuestra Fleet', href: '#' },
  ];

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#272623] text-[#CCCCCC] text-[13px] border-t border-white/10 pt-12 pb-8"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col">
        
        {/* Top Brand & Links Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          {/* Brand Logo inside footer */}
          <div className="flex items-center select-none group">
            <div className="h-7 md:h-8 w-auto shrink-0 transition-transform group-hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/dc/International_Motors_Logo%2C_October_2024.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
                alt="International Motors"
                className="h-full w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Quick links list */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="py-8">
          <div className="flex items-start gap-3 bg-white/5 p-5 md:p-6 rounded-md border border-white/5">
            <ShieldCheck size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <div className="text-[11px] md:text-sm text-gray-400 leading-relaxed font-light">
              <strong className="text-gray-300 font-semibold block mb-1 uppercase tracking-wider text-[11px]">
                Nota descriptiva y propósito de la página
              </strong>
              <p>
                Sección Hero interactiva de alta conversión diseñada para operaciones logísticas, financieras y de transporte integral en Latinoamérica.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-light text-gray-400">
          <div>
            © 2026 International Financial. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span>Soporte Financiero Multirregional para Latinoamérica.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
