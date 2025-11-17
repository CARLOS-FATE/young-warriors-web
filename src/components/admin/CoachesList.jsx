// src/components/admin/CoachesList.jsx
import React from 'react';

// Este componente recibe la lista de 'coaches' como un prop
export default function CoachesList({ coaches }) {

  // Esta función maneja el clic de 'Eliminar'
  const handleDeleteClick = (event, coach) => {
    // Usamos el 'confirm' de JavaScript
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar a ${coach.name}?`);
    
    // Si el usuario presiona "Cancelar", prevenimos que el enlace se active
    if (!confirmed) {
      event.preventDefault();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {coaches.length > 0 ? (
          coaches.map(coach => (
            // Usamos 'key' para que React sea feliz
            <tr key={coach.id}> 
              <td>{coach.id}</td>
              <td>{coach.name}</td>
              <td>{coach.role}</td>
              <td className="action-links"> {/* 'class' se escribe 'className' en JSX */}
                <a href={`/admin/editar-entrenador?id=${coach.id}`}>Editar</a>
                
                {/* ¡LA SOLUCIÓN!
                  Usamos el 'onClick' (camelCase) de React, que funciona perfecto.
                */}
                <a 
                  href={`/api/admin/eliminar.js?id=${coach.id}`} 
                  onClick={(event) => handleDeleteClick(event, coach)}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="4">No hay entrenadores registrados.</td></tr>
        )}
      </tbody>
    </table>
  );
}