// src/components/features/PlayerCard.jsx
import React, { useState } from 'react';
import './PlayerCard.css'; // Usaremos un archivo CSS separado para este componente

export default function PlayerCard({ player }) {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <div className="player-card">
      <div className="player-photo">
        <img src={player.img} alt={`Foto de ${player.name}`} loading="lazy" />
        <span className="player-position">{player.position}</span>
      </div>
      <div className="player-info">
        <h3>{player.name}</h3>
        <div className="skills-map">
          <h4>Mapa de Evolución</h4>
          {Object.entries(player.skills).map(([skillName, value]) => (
            <div className="skill" key={skillName}>
              <span className="skill-name">{skillName}</span>
              <div className="skill-bar-container">
                <div className="skill-bar" style={{ width: `${value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="toggle-button" 
          onClick={() => setShowAchievements(!showAchievements)}
        >
          {showAchievements ? 'Ocultar Logros' : 'Ver Logros Colectivos'}
        </button>
        {showAchievements && (
          <div className="achievements">
            <ul>
              {player.teamAchievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}