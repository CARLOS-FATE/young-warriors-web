// api/admin/eliminar-player.js
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  // 1. Guardia de seguridad
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    // Si falla, redirigir al login
    return res.redirect(302, '/admin/login?error=auth');
  }

  // 2. Lógica de Eliminación (reemplaza eliminar_player.php)
  try {
    const { id } = req.query; // Obtiene el ID de la URL (ej. ...?id=123)

    if (!id) {
      throw new Error('ID de jugador no proporcionado.');
    }

    const sql = "DELETE FROM players WHERE id = ?";
    await query({ query: sql, values: [Number(id)] });

    // 3. Redirigir de vuelta a la lista
    return res.redirect(302, '/admin/players');

  } catch (error) {
    console.error(error);
    // Si falla, redirigir de vuelta con un error
    return res.redirect(302, '/admin/players?error=delete');
  }
}