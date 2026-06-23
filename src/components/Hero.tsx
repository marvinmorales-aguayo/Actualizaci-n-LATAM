/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Truck, MapPin, MessageSquare, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { FormData, FormErrors, VehicleType } from '../types';

interface HeroProps {
  selectedVehicle: VehicleType;
  setSelectedVehicle: (vehicle: VehicleType) => void;
}

const COUNTRIES = [
  { value: 'México', label: 'México (+52)', flag: '🇲🇽', prefix: '+52' },
  { value: 'Colombia', label: 'Colombia (+57)', flag: '🇨🇴', prefix: '+57' },
  { value: 'Chile', label: 'Chile (+56)', flag: '🇨🇱', prefix: '+56' },
  { value: 'Perú', label: 'Perú (+51)', flag: '🇵🇪', prefix: '+51' },
  { value: 'Argentina', label: 'Argentina (+54)', flag: '🇦🇷', prefix: '+54' },
  { value: 'Ecuador', label: 'Ecuador (+593)', flag: '🇪🇨', prefix: '+593' },
  { value: 'Guatemala', label: 'Guatemala (+502)', flag: '🇬🇹', prefix: '+502' },
  { value: 'Costa Rica', label: 'Costa Rica (+506)', flag: '🇨🇷', prefix: '+506' },
  { value: 'Panamá', label: 'Panamá (+507)', flag: '🇵🇦', prefix: '+507' },
  { value: 'Otro País de LatAm', label: 'Otro País de LatAm (Menú genérico sin LADA fija)', flag: '🌎', prefix: '' }
];

export default function Hero({ selectedVehicle, setSelectedVehicle }: HeroProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    whatsapp: '',
    tipoVehiculo: '',
    pais: '',
    comentarios: '',
    autorizaContacto: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [folio, setFolio] = useState('');

  // Sync state if preselected from Conoce Las Series
  useEffect(() => {
    if (selectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        tipoVehiculo: selectedVehicle,
      }));
    }
  }, [selectedVehicle]);

  // Clean only numbers from WhatsApp input
  const handleWhatsappChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, whatsapp: digitsOnly }));
    
    // Validate instantly
    let errorMsg = '';
    if (!digitsOnly) {
      errorMsg = 'El número telefónico de WhatsApp es obligatorio.';
    } else if (digitsOnly.length !== 10) {
      errorMsg = `Debe contener exactamente 10 dígitos (Ingresado: ${digitsOnly.length})`;
    }
    setErrors((prev) => ({ ...prev, whatsapp: errorMsg }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Real-time inline validator on change
    validateField(name as keyof FormData, finalValue);
  };

  const validateField = (name: keyof FormData, value: any) => {
    let errorMsg = '';

    switch (name) {
      case 'nombre':
        if (!value || String(value).trim() === '') {
          errorMsg = 'El nombre completo es requerido.';
        }
        break;
      case 'email':
        if (!value || String(value).trim() === '') {
          errorMsg = 'El correo electrónico es requerido.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(String(value).trim())) {
            errorMsg = 'Por favor ingresa un formato de correo válido.';
          }
        }
        break;
      case 'tipoVehiculo':
        if (!value) {
          errorMsg = 'Selecciona un tipo de vehículo.';
        }
        break;
      case 'pais':
        if (!value) {
          errorMsg = 'Selecciona tu país de operación.';
        }
        break;
      case 'comentarios':
        if (!value || String(value).trim() === '') {
          errorMsg = 'Por favor ingresa comentarios o requerimientos.';
        }
        break;
      case 'autorizaContacto':
        if (!value) {
          errorMsg = 'Debes autorizar el contacto comercial para cotización.';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Validate Name
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es requerido.';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Por favor ingresa un formato de correo válido.';
      }
    }

    // Validate WhatsApp
    if (!formData.whatsapp) {
      newErrors.whatsapp = 'El número telefónico de WhatsApp es obligatorio.';
    } else if (formData.whatsapp.length !== 10) {
      newErrors.whatsapp = `Debe contener exactamente 10 dígitos (Ingresado: ${formData.whatsapp.length})`;
    }

    // Validate Vehicle Type
    if (!formData.tipoVehiculo) {
      newErrors.tipoVehiculo = 'Selecciona un tipo de vehículo.';
    }

    // Validate Country
    if (!formData.pais) {
      newErrors.pais = 'Selecciona tu país de operación.';
    }

    // Validate Comments
    if (!formData.comentarios.trim()) {
      newErrors.comentarios = 'Por favor ingresa comentarios o requerimientos.';
    }

    // Validate Authorization Consent
    if (!formData.autorizaContacto) {
      newErrors.autorizaContacto = 'Debes autorizar el contacto comercial para cotización.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll form container into view
      const container = document.getElementById('lead-form-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Reset errors
    setErrors({});
    setIsSubmitting(true);

    // Simulate transition timer (State B)
    setTimeout(() => {
      // Generate Folio (e.g. IF-583201)
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      setFolio(`IF-${randomDigits}`);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Save submission securely to local storage
      try {
        const history = localStorage.getItem('if_leads') || '[]';
        const parsed = JSON.parse(history);
        parsed.push({
          ...formData,
          folio: `IF-${randomDigits}`,
          id: Date.now(),
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('if_leads', JSON.stringify(parsed));
      } catch (err) {
        console.error('LocalStorage save failed:', err);
      }
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      email: '',
      whatsapp: '',
      tipoVehiculo: '',
      pais: '',
      comentarios: '',
      autorizaContacto: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setSelectedVehicle('');
  };

  // Get selected country details
  const selectedCountry = COUNTRIES.find((c) => c.value === formData.pais);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen lg:min-h-[calc(100vh-70px)] bg-cover bg-center overflow-hidden flex items-center py-12 lg:py-16 bg-neutral-900"
      style={{
        backgroundImage: `url("https://www.camionesinternational.com/documents/157231/157566/banner_21-9_Mexico_Home.jpg")`,
      }}
    >
      {/* Dark overlay */}
      <div id="hero-overlay" className="absolute inset-0 bg-black/65 z-1" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 relative z-2">
        
        {/* Left Column (Commercial Value Proposition) */}
        <div id="hero-left-col" className="w-full lg:w-[48%] text-left text-white">
          <div className="w-16 h-1.5 bg-[#EE7624] mb-6 rounded-xs" />
          
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-tight font-extrabold tracking-tight mb-6 uppercase text-white font-sans">
            Encuentra la solución de transporte que tu operación necesita
          </h1>

          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            Explora nuestra gama de tractocamiones, unidades de servicio severo y camiones medianos para Latinoamérica.
          </p>
        </div>

        {/* Right Column (Interactive Quoting Form) */}
        <div id="hero-right-col" className="w-full lg:w-[46%]">
          <div
            id="lead-form-container"
            className="w-full bg-white rounded-lg p-5 sm:p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] border border-neutral-100 transition-all duration-300"
          >
            {/* STATE B: Submitting Transition State */}
            {isSubmitting && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border-4 border-neutral-250 border-t-[#EE7624] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Truck size={24} className="text-[#EE7624] animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#272623] uppercase tracking-wide">
                  Procesando Solicitud...
                </h3>
                <p className="text-gray-500 text-xs mt-2 max-w-xs leading-relaxed">
                  Estamos validando tus requerimientos con nuestro sistema de asignación de flota. Un momento, por favor...
                </p>
              </div>
            )}

            {/* STATE A: Initial Form State */}
            {!isSubmitting && !isSubmitted && (
              <div id="lead-form-content">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#272623] tracking-tight uppercase mb-1">
                  Solicitar Cotización Complete
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  Completa tus datos para recibir asesoría personalizada.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field: Nombre Completo */}
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <User size={13} className="text-[#EE7624]" />
                      <span>Nombre completo</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Juan Pérez"
                      className={`px-3.5 py-2.5 border rounded-sm text-xs transition-all focus:outline-hidden focus:ring-1 bg-white text-gray-900 ${
                        errors.nombre
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                          : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                      }`}
                    />
                    {errors.nombre && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.nombre}
                      </span>
                    )}
                  </div>

                  {/* Field: Correo Electrónico */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} className="text-[#EE7624]" />
                      <span>Correo electrónico</span>
                    </label>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@operacion.com"
                      className={`px-3.5 py-2.5 border rounded-sm text-xs transition-all focus:outline-hidden focus:ring-1 bg-white text-gray-900 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                          : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Field: WhatsApp (10 dígitos) */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="whatsapp" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest flex items-center gap-1.5">
                        <Phone size={13} className="text-[#EE7624]" />
                        <span>WhatsApp (10 dígitos) *</span>
                      </label>
                      <span className="text-[10px] font-bold text-gray-400 capitalize bg-neutral-100 px-1.5 py-0.5 rounded-xs select-none">
                        Únicamente números
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none select-none text-[#EE7624] text-xs font-bold">
                        <span>WhatsApp</span>
                        <span className="text-gray-300">|</span>
                        <span>{selectedCountry ? selectedCountry.prefix : '+...'}</span>
                      </div>
                      <input
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => handleWhatsappChange(e.target.value)}
                        placeholder="5512345678"
                        className={`w-full pl-36 pr-3.5 py-2.5 border rounded-sm text-xs transition-all focus:outline-hidden focus:ring-1 bg-white text-gray-900 ${
                          errors.whatsapp
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                            : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                        }`}
                      />
                    </div>
                    {/* Live Digits Progress Counter Message */}
                    <div className="mt-1 flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 font-medium">
                        Lleva <strong className="text-gray-600 font-black">{formData.whatsapp.length}</strong> de 10 dígitos obligatorios.
                      </span>
                      {formData.whatsapp.length === 10 && (
                        <span className="text-emerald-600 font-bold">✓ Formato completado</span>
                      )}
                    </div>
                    {errors.whatsapp && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.whatsapp}
                      </span>
                    )}
                  </div>

                  {/* Field: Tipo de Vehículo */}
                  <div className="flex flex-col">
                    <label htmlFor="tipoVehiculo" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Truck size={13} className="text-[#EE7624]" />
                      <span>Tipo de Vehículo</span>
                    </label>
                    <select
                      id="tipoVehiculo"
                      name="tipoVehiculo"
                      value={formData.tipoVehiculo}
                      onChange={handleInputChange}
                      className={`px-3.5 py-2.5 border rounded-sm bg-white text-xs text-gray-900 transition-all focus:outline-hidden focus:ring-1 ${
                        errors.tipoVehiculo
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                          : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                      }`}
                    >
                      <option value="" disabled>Selecciona una opción...</option>
                      <option value="Tractocamiones">
                        Tractocamiones (Tractores de carretera, máxima capacidad de arrastre.)
                      </option>
                      <option value="Unidades de Servicio Severo">
                        Unidades de Servicio Severo (Volquetes, mezcladoras y minería pesada.)
                      </option>
                      <option value="Camiones Medianos">
                        Camiones Medianos (Reparto urbano y logística de última milla.)
                      </option>
                    </select>
                    {errors.tipoVehiculo && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.tipoVehiculo}
                      </span>
                    )}
                  </div>

                  {/* Field: País de operación de la empresa */}
                  <div className="flex flex-col">
                    <label htmlFor="pais" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#EE7624]" />
                      <span>¿En qué país se encuentra tu negocio?</span>
                    </label>
                    <select
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      className={`px-3.5 py-2.5 border rounded-sm bg-white text-xs text-gray-900 transition-all focus:outline-hidden focus:ring-1 ${
                        errors.pais
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                          : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                      }`}
                    >
                      <option value="" disabled>Selecciona tu país...</option>
                      {COUNTRIES.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.flag} {country.label}
                        </option>
                      ))}
                    </select>
                    {errors.pais && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.pais}
                      </span>
                    )}
                  </div>

                  {/* Field: Comentarios y Requerimientos */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="comentarios" className="text-[11px] font-bold text-gray-750 uppercase tracking-widest flex items-center gap-1.5">
                        <MessageSquare size={13} className="text-[#EE7624]" />
                        <span>Comentarios *</span>
                      </label>
                      {/* Character limit and counter */}
                      <span className="text-[10px] font-bold text-gray-400 select-none">
                        {formData.comentarios.length}/350 carácteres
                      </span>
                    </div>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      maxLength={350}
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      placeholder="Ej: Requiero financiar 3 camiones de volteo para obra minera antes de fin de mes..."
                      rows={3}
                      className={`px-3.5 py-2.5 border rounded-sm text-xs bg-white text-gray-900 transition-all focus:outline-hidden focus:ring-1 resize-none ${
                        errors.comentarios
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/5'
                          : 'border-gray-300 focus:border-[#EE7624] focus:ring-[#EE7624]'
                      }`}
                    />
                    {errors.comentarios && (
                      <span className="text-red-500 text-[11px] mt-1 font-semibold flex items-center gap-1">
                        ⚠️ {errors.comentarios}
                      </span>
                    )}
                  </div>

                  {/* Checkbox Consentimiento */}
                  <div className="flex flex-col pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        id="autorizaContacto"
                        type="checkbox"
                        name="autorizaContacto"
                        checked={formData.autorizaContacto}
                        onChange={handleInputChange}
                        className="mt-0.5 h-4.5 w-4.5 rounded-sm border-gray-300 text-[#EE7624] focus:ring-[#EE7624] accent-[#EE7624] shrink-0 cursor-pointer"
                      />
                      <span className="text-[11px] text-gray-500 leading-relaxed font-medium">
                        Autorizo recibir llamadas y mensajes de International Financial para fines de asesoría y cotización comercial
                      </span>
                    </label>
                    {errors.autorizaContacto && (
                      <span className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                        ⚠️ {errors.autorizaContacto}
                      </span>
                    )}
                  </div>

                  {/* Botón Principal de Envío */}
                  <button
                    id="hero-submit-btn"
                    type="submit"
                    className="w-full bg-[#272623] hover:bg-[#EE7624] text-white py-3.5 px-6 rounded-sm font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <span>Enviar información</span>
                    <ArrowRight size={14} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            )}

            {/* STATE C: Success Screen */}
            {isSubmitted && (
              <div id="success-screen" className="flex flex-col py-6">
                {/* Success Checkmark */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 animate-bounce">
                    <CheckCircle2 size={36} className="stroke-[2]" />
                  </div>
                </div>

                {/* Folio Block */}
                <div className="text-center mb-3">
                  <span className="bg-neutral-100 border border-neutral-200 text-neutral-800 text-[11px] font-black px-3.5 py-1.5 uppercase tracking-widest rounded-full select-none inline-block">
                    Folio de Registro: {folio}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-center text-[#272623] uppercase tracking-wide mb-3">
                  ¡Solicitud Recibida!
                </h3>

                {/* Body Message */}
                <p className="text-xs sm:text-sm text-gray-650 text-center leading-relaxed mb-6 font-medium">
                  Hola <strong className="text-gray-900 font-bold">{formData.nombre}</strong>, hemos asignado un experto financiero para tu requerimiento de <strong className="text-[#EE7624] font-bold">{formData.tipoVehiculo}</strong> en <strong className="text-gray-900 font-bold">{formData.pais}</strong>.
                </p>

                {/* Data Summary Card */}
                <div className="bg-neutral-50 rounded-md border border-neutral-200 p-5 mb-5 select-text">
                  <h4 className="text-[10px] font-black uppercase text-[#272623] tracking-wider mb-3.5 border-b border-neutral-200 pb-1.5">
                    Resumen registrado con éxito:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">WhatsApp:</span>
                      <strong className="text-gray-800 font-semibold">
                        {formData.whatsapp}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Correo:</span>
                      <strong className="text-gray-800 font-semibold break-all">
                        {formData.email}
                      </strong>
                    </div>
                    <div className="pt-2 border-t border-dotted border-neutral-200">
                      <span className="text-gray-400 block mb-1">Comentario:</span>
                      <p className="text-gray-700 italic bg-white p-2.5 rounded-sm border border-neutral-200 leading-normal text-[11px]">
                        "{formData.comentarios}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response promise text */}
                <p className="text-[11px] leading-relaxed text-gray-500 text-center mb-6">
                  Un asesor de <strong className="text-gray-800">International Financial</strong> se comunicará contigo vía WhatsApp en los próximos 10 minutos.
                </p>

                {/* Reset button */}
                <button
                  id="success-reset-btn"
                  onClick={handleReset}
                  className="w-full bg-[#272623] hover:bg-[#EE7624] text-white py-3 px-6 rounded-sm font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Solicitar Otra Cotización
                </button>

                {/* Data security signout */}
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-wider text-gray-400 select-none">
                  <Lock size={12} className="text-[#EE7624]" />
                  <span>Datos protegidos con cifrado comercial ssl</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
