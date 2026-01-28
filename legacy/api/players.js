// api/players.js

import { query } from '../lib/db.js';

export default async function handler(req, res) {
  
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const sql = "SELECT * FROM players";
    
    const playersFromDB = await query({ query: sql });

    const playersData = playersFromDB.map(player => {
      return {
        id: player.id,
        name: player.name,
        img: player.img,
        position: player.position,
        isMVP: Boolean(player.isMVP), // Convierte 1/0 a true/false
        skills: {
          dribbling: Number(player.skill_dribbling), // Convierte a número
          pase: Number(player.skill_pase),
          lanzamiento: Number(player.skill_lanzamiento)
        },
        teamAchievements: (() => {
          try {
            return JSON.parse(player.teamAchievements);
          } catch (e) {
            return []; 
          }
        })()
      };
    });
    
    res.status(200).json(playersData);

  } catch (error) {
    
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
}