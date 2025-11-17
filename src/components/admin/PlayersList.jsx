// src/components/admin/PlayersList.jsx
import React from 'react';

export default function PlayersList({ players }) {

  const handleDeleteClick = (event, player) => {
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar a ${player.name}?`);
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
          <th>Posición</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {players.length > 0 ? (
          players.map(player => (
            <tr key={player.id}> 
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td className="action-links">
                <a href={`/admin/editar-player?id=${player.id}`}>Editar</a>
                <a 
                  href={`/api/admin/eliminar-player.js?id=${player.id}`} 
                  onClick={(event) => handleDeleteClick(event, player)}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="4">No hay jugadores registrados.</td></tr>
        )}
      </tbody>
    </table>
  );
}