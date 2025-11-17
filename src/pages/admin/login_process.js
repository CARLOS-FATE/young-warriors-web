// api/admin/login_process.js

import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
// (Asegúrate de haber corrido 'npm install jsonwebtoken cookie')

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Obtenemos los datos del formulario
  const { username, password } = req.body;

  // ¡Comparamos con las Variables de Entorno!
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  // ¡Credenciales INCORRECTAS!
  if (username !== validUser || password !== validPass) {
    // (Nota: Si guardas un hash bcrypt en Vercel, deberías usar 'bcrypt.compare' aquí)
    return res.redirect(302, '/admin/login?error=1');
  }

  // ¡Credenciales CORRECTAS!
  // Creamos un token (JWT) solo para el admin
  const payload = {
    isAdmin: true,
    username: validUser
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h' // El admin debe re-loguearse cada hora
  });

  // Creamos la cookie de admin (¡con un nombre diferente a la de los padres!)
  const cookie = serialize('admin_auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/admin', // ¡Esta cookie SOLO es válida para /admin!
    maxAge: 60 * 60 // 1 hora
  });

  res.setHeader('Set-Cookie', cookie);
  
  // Redirigimos al dashboard del admin
  return res.redirect(302, '/admin'); // (Apunta a src/pages/admin/index.astro)
}