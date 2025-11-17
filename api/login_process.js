// api/login_process.js

import { query } from '../lib/db.js';         
import bcrypt from 'bcryptjs';         
import jwt from 'jsonwebtoken';      
import { serialize } from 'cookie';      

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.redirect(302, '/padres'); }

  const { username, password } = req.body;

  try {
    const sql = "SELECT * FROM parents WHERE username = ?";
    const [parent] = await query({
      query: sql,
      values: [username]
    });

    const passwordMatch = parent ? await bcrypt.compare(password, parent.password_hash) : false;

    if (!parent || !passwordMatch) {
    
      return res.redirect(302, '/padres?error=1');
    }
    const payload = {
      parent_id: parent.id,
      parent_username: parent.username
    };

    // 6b. Firmamos el token con nuestra clave secreta
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d' 
    });

    const cookie = serialize('auth_token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      path: '/',     
      maxAge: 60 * 60 * 24 * 7 
    });

    res.setHeader('Set-Cookie', cookie);
    
    return res.redirect(302, '/api/dashboard_padres.js'); 

  } catch (error) {
    console.error(error);
    return res.redirect(302, '/padres?error=500');
  }
}