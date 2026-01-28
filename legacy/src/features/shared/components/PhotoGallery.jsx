// src/components/features/PhotoGallery.jsx
import React from 'react';
import './PhotoGallery.css'; // Usaremos un CSS dedicado

export default function PhotoGallery({ events }) {
  // El componente recibe la lista de eventos como una "prop"
  return (
    <>
      {events.map(event => (
        <div className="event-album" key={event.name}>
          <h2>{event.name}</h2>
          <div className="photo-grid">
            {event.photos.map(photo => (
              <div className="photo-card" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}