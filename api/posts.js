// api/posts.js

import { query } from '../lib/db.js';

export default async function handler(req, res) {
  
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');

  try {
    const sql = "SELECT * FROM posts";
    
    const postsData = await query({ query: sql });
    
    res.status(200).json(postsData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}