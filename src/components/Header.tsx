/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateToForm: () => void;
}

export default function Header({ onNavigateToForm }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; href: string }[] = [];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD] h-[70px] flex items-center transition-all duration-300"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="header-logo"
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="flex items-center select-none group"
        >
          {/* Logo Icon Styling - Real Official International Motors Logo */}
          <div className="h-7 md:h-8 w-auto shrink-0 transition-transform group-hover:scale-105">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/dc/International_Motors_Logo%2C_October_2024.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
              alt="International Motors"
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-gray-700 hover:text-[#272623] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#272623] after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header CTA Button */}
        <div className="flex items-center">
          <button
            id="header-cta-btn"
            onClick={onNavigateToForm}
            className="bg-[#272623] hover:bg-[#1a1a1a] text-white text-[10px] sm:text-xs font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-sm tracking-wide uppercase transition-colors cursor-pointer"
          >
            Solicitar Cotización
          </button>
        </div>
      </div>
    </header>
  );
}
