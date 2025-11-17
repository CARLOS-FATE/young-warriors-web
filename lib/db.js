import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const ca_path = path.resolve(process.cwd(), 'api/ca-tidb.crt');

export async function query({ query, values = [] }) {
  
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      ca: fs.readFileSync(ca_path),
    }
  });

  try {
    const [results] = await db.execute(query, values);
    db.end();
    return results;
  } catch (error) {
    db.end();
    throw Error(error.message);
  }
}