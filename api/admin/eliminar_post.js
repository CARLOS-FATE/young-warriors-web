// api/admin/eliminar-post.js
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  // 1. Guardia de seguridad
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.redirect(302, '/admin/login?error=auth');
  }

  // 2. Lógica de Eliminación
  try {
    const { id } = req.query; // Obtiene el ID de la URL

    if (!id) {
      throw new Error('ID de post no proporcionado.');
    }

    const sql = "DELETE FROM posts WHERE id = ?";
    await query({ query: sql, values: [Number(id)] });

    // 3. Redirigir de vuelta a la lista
    return res.redirect(302, '/admin/posts');

  } catch (error) {
    console.error(error);
    return res.redirect(302, '/admin/posts?error=delete');
  }
}