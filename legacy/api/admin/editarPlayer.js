// api/admin/editar-player.js
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Guardia de seguridad
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 2. Lógica de Actualización (reemplaza el POST de editar_player.php)
  try {
    const {
      id, name, position, isMVP,
      skill_dribbling, skill_pase, skill_lanzamiento,
      teamAchievements
    } = req.body;
    
    const isMVPBool = isMVP === 'on' ? 1 : 0;
    const achievementsJSON = JSON.stringify(teamAchievements.split(',').map(s => s.trim()));

    const sql = `
      UPDATE players SET 
      name=?, position=?, isMVP=?, 
      skill_dribbling=?, skill_pase=?, skill_lanzamiento=?, 
      teamAchievements=? 
      WHERE id=?
    `;
    const params = [
      name, position, isMVPBool,
      Number(skill_dribbling), Number(skill_pase), Number(skill_lanzamiento),
      achievementsJSON,
      Number(id)
    ];

    await query({ query: sql, values: params });

    return res.redirect(302, '/admin/players');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}