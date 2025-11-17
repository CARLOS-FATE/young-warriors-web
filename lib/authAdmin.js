// lib/authAdmin.js
import jwt from 'jsonwebtoken';

/**
 * Verifica la cookie de admin.
 * Si es válida, devuelve el payload.
 * Si no, redirige al login.
 */
export function checkAdminAuth(Astro) {
  try {
    const token = Astro.cookies.get('admin_auth_token')?.value;
    if (!token) {
      throw new Error('No auth token');
    }
    
    // Verificamos el token
    const payload = jwt.verify(token, import.meta.env.JWT_SECRET_KEY);
    
    if (!payload.isAdmin) {
      throw new Error('Token no es de Admin');
    }
    
    // Si todo está bien, devolvemos los datos del admin
    return payload;

  } catch (error) {
    // Si falla (expirado, inválido, no existe), redirigimos
    return Astro.redirect('/admin/login?error=auth', 307); // 307 es una redirección temporal
  }
}