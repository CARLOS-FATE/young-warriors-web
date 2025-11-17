// api/admin/crear-entrenador.js
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

  // 3. Reemplazo de la lógica de PHP
  try {
    // 4. Recoger datos (reemplaza $_POST)
    const { name, role, bio, quote } = req.body;
    const img = '/images/coach-placeholder.jpg'; // Imagen por defecto

    // 5. Consulta SQL
    const sql = `
      INSERT INTO coaches (name, role, bio, quote, img) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [name, role, bio, quote, img];

    await query({ query: sql, values: params });

    // 6. Redirigir al panel de admin
    // (Tu PHP redirigía a index.php, la nueva página de lista es /admin/coaches)
    return res.redirect(302, '/admin/coaches');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}