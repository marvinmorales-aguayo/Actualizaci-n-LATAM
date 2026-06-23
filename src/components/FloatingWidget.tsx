/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FloatingWidgetProps {
  onNavigateToForm?: () => void;
}

export default function FloatingWidget({ onNavigateToForm }: FloatingWidgetProps) {
  return (
    <div
      id="floating-widget-wrapper"
      className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end"
    >
      {/* Dynamic pulse indicator and notification beacon */}
      <span className="absolute -right-1 -top-1 flex h-3 w-3 z-50">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-350 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EE7624]"></span>
      </span>

      <button
        id="floating-widget-btn"
        onClick={onNavigateToForm}
        className="flex items-center gap-1.5 bg-[#EE7624] hover:bg-[#d66216] text-white px-6 py-3.5 rounded-full shadow-[0_6px_20px_rgba(238,118,36,0.4)] hover:shadow-[0_8px_24px_rgba(238,118,36,0.6)] hover:scale-105 duration-200 text-xs font-black uppercase tracking-widest cursor-pointer"
        aria-label="Cotizar"
      >
        <span>Cotizar</span>
        <ArrowUpRight size={15} className="text-white" />
      </button>
    </div>
  );
}
