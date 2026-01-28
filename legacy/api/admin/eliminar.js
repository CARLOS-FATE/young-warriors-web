// api/admin/eliminar.js

// 1. Importar la conexión a la BD y el validador de JWT
import { query } from '../../lib/db.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
  // 2. Guardia de seguridad (Reemplaza auth.php)
  // Primero, verificamos que el usuario sea un admin
  try {
    const token = req.cookies.admin_auth_token;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    // Si la cookie no existe o es inválida, lo redirigimos al login
    return res.redirect(302, '/admin/login?error=auth');
  }

  // 3. Lógica de Eliminación (Reemplaza el resto del archivo)
  try {
    // 4. Obtener el ID de la URL (reemplaza $_GET['id'])
    const { id } = req.query; 

    if (!id) {
      throw new Error('ID de entrenador no proporcionado.');
    }

    // 5. Consulta SQL (idéntica)
    const sql = "DELETE FROM coaches WHERE id = ?";
    await query({ query: sql, values: [Number(id)] });

    // 6. Redirigir de vuelta a la lista de coaches
    // (Tu PHP redirigía a index.php, que ahora es /admin)
    return res.redirect(302, '/admin');

  } catch (error) {
    console.error(error);
    // Si falla algo, redirigir de vuelta con un error
    return res.redirect(302, '/admin?error=delete');
  }
}