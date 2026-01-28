import bcrypt from 'bcryptjs';
import pool from './db';
import { RowDataPacket } from 'mysql2';

export async function ensureAdminExists() {
    const username = 'admin';
    const password = 'password123';

    try {
        // Ensure tables exist (Basic Migration)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS pricing_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                price VARCHAR(100) NOT NULL,
                period VARCHAR(100),
                category ENUM('matricula', 'mensualidad', 'promo') NOT NULL,
                description TEXT,
                features TEXT,
                highlight BOOLEAN DEFAULT FALSE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                player_id INT,
                coach_id INT,
                date DATE NOT NULL,
                status ENUM('present', 'absent', 'excused', 'late') DEFAULT 'present',
                notes TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
                FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE CASCADE
            );

        `);

        // Check for admin
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
