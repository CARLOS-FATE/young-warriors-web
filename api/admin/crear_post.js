// api/admin/crear-post.js
import { query } from '../../lib/db.js';
import { slugify } from '../../lib/slugify.js'; // <-- Importamos nuestra función 'slugify'
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Guardia de seguridad
  try {
    jwt.verify(req.cookies.admin_auth_token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // 2. Reemplazo de la lógica de PHP
  try {
    const { title, description, category, content } = req.body;
    
    // 3. Generar el SLUG (reemplaza preg_replace)
    const slug = slugify(title);
    const image = '/images/blog/placeholder.jpg'; // Imagen por defecto

    // 4. Consulta SQL
    const sql = `
      INSERT INTO posts (slug, title, description, category, content, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [slug, title, description, category, content, image];

    await query({ query: sql, values: params });

    // 5. Redirigir al panel de admin
    return res.redirect(302, '/admin/posts');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}