// api/admin/crear-player.js
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  // 1. Verificar que sea POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Verificar la cookie de admin (¡Seguridad!)
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 3. Reemplazo de la lógica de PHP
  try {
    const {
      name,
      position,
      isMVP,
      skill_dribbling,
      skill_pase,
      skill_lanzamiento,
      teamAchievements
    } = req.body;
    
    // 4. Transformar los datos
    const isMVPBool = isMVP === 'on' ? 1 : 0; // JS recibe 'on' para checkboxes
    const achievementsJSON = JSON.stringify(teamAchievements.split(',').map(s => s.trim()));
    const img = '/images/players/player-placeholder.jpg';

    // 5. Consulta SQL
    const sql = `
      INSERT INTO players 
      (name, position, isMVP, skill_dribbling, skill_pase, skill_lanzamiento, teamAchievements, img) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      position,
      isMVPBool,
      Number(skill_dribbling),
      Number(skill_pase),
      Number(skill_lanzamiento),
      achievementsJSON,
      img
    ];

    await query({ query: sql, values: params });

    // 6. Redirigir al panel de admin
    return res.redirect(302, '/admin/players');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}