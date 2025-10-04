// src/components/features/WhatsAppButton.jsx
import React from 'react';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  // 👇 ¡IMPORTANTE! Reemplaza con los datos de tu club
  const clubPhoneNumber = '51987654321';
  const defaultMessage = 'Hola, quisiera más información sobre las inscripciones en Young Warriors Club.';

  const whatsappUrl = `https://wa.me/${clubPhoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    </a>
  );
}