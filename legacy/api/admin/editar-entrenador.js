// api/admin/editar-entrenador.js
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  // 1. Verificar que sea POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Guardia de seguridad (reemplaza auth.php)
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 3. Reemplazo de la lógica POST de PHP
  try {
    // 4. Recoger datos (reemplaza $_POST)
    const { id, name, role, bio, quote } = req.body;

    // 5. Consulta SQL
    const sql = `
      UPDATE coaches SET name = ?, role = ?, bio = ?, quote = ? 
      WHERE id = ?
    `;
    const params = [name, role, bio, quote, Number(id)];

    await query({ query: sql, values: params });

    // 6. Redirigir al panel de admin
    // (Tu PHP redirigía a index.php, la nueva página de lista es /admin/coaches)
    return res.redirect(302, '/admin/coaches');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}