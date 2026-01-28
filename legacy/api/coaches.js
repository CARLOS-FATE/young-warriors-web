// api/coaches.js

import { query } from '../lib/db.js';

export default async function handler(req, res) {
  
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const sql = "SELECT id, name, role, img, bio, quote FROM coaches";
    
  
    const coachesData = await query({ query: sql });

    res.status(200).json(coachesData);

  } catch (error) {
    console.error(error); // Es bueno loguear el error en Vercel
    res.status(500).json({ error: error.message });
  }
}