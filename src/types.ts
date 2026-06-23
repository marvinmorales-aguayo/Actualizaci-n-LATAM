/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: number;
  author: string;
  position: string;
  company: string;
  quote: string;
}

export type VehicleType =
  | 'Tractocamiones'
  | 'Unidades de Servicio Severo'
  | 'Camiones Medianos'
  | '';

export interface FormData {
  nombre: string;
  email: string;
  whatsapp: string;
  tipoVehiculo: VehicleType;
  pais: string;
  comentarios: string;
  autorizaContacto: boolean;
}

export interface FormErrors {
  nombre?: string;
  email?: string;
  whatsapp?: string;
  tipoVehiculo?: string;
  pais?: string;
  comentarios?: string;
  autorizaContacto?: string;
}
