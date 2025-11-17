// api/admin/editar-post.js
import { query } from '../../lib/db.js';
import { slugify } from '../../lib/slugify.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Guardia de seguridad
  try {
    jwt.verify(req.cookies.admin_auth_token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 2. Lógica de Actualización
  try {
    const { id, title, description, category, content } = req.body;
    
    // 3. Regenerar el slug
    const slug = slugify(title);

    const sql = `
      UPDATE posts SET 
      slug=?, title=?, description=?, category=?, content=? 
      WHERE id=?
    `;
    const params = [
      slug, title, description, category, content, 
      Number(id)
    ];

    await query({ query: sql, values: params });

    return res.redirect(302, '/admin/posts');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}