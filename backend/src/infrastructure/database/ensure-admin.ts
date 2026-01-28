import bcrypt from 'bcryptjs';
import pool from './db';
import { RowDataPacket } from 'mysql2';

export async function ensureAdminExists() {
    const username = 'admin';
    const password = 'password123';

    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM admins WHERE username = ?', [username]);

        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
            console.log(`[Startup] Auto-seeded admin user: ${username}`);
        } else {
            console.log(`[Startup] Admin user already exists.`);
        }
    } catch (error) {
        console.error('[Startup] Error ensuring admin exists:', error);
    }
}
