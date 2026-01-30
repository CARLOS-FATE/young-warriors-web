import bcrypt from 'bcryptjs';
import pool from './db';
import { RowDataPacket } from 'mysql2';

export async function ensureAdminExists() {
    const username = 'admin';
    const password = 'password123';

    try {
        // Ensure tables exist (Basic Migration)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS players (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                position VARCHAR(255) NOT NULL,
                imageUrl VARCHAR(2048),
                height VARCHAR(50),
                weight VARCHAR(50),
                ppg DECIMAL(4, 1) DEFAULT 0,
                rpg DECIMAL(4, 1) DEFAULT 0,
                apg DECIMAL(4, 1) DEFAULT 0,
                tactical_stats JSON,
                stats_history JSON,
                dni VARCHAR(20),
                phone VARCHAR(20),
                emergency_phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS coaches (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                bio TEXT,
                imageUrl VARCHAR(2048),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(255) NOT NULL,
                authorId INT,
                publishedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS pricing_items(
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            price VARCHAR(100) NOT NULL,
            period VARCHAR(100),
            category ENUM('matricula', 'mensualidad', 'promo') NOT NULL,
            description TEXT,
            features TEXT,
            highlight BOOLEAN DEFAULT FALSE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
            `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance(
                id INT AUTO_INCREMENT PRIMARY KEY,
                player_id INT,
                coach_id INT,
                date DATE NOT NULL,
                status ENUM('present', 'absent', 'excused', 'late') DEFAULT 'present',
                notes TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE,
                FOREIGN KEY(coach_id) REFERENCES coaches(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS ad_videos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                video_url VARCHAR(2048) NOT NULL,
                platform VARCHAR(50) DEFAULT 'other',
                is_active BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check for admin
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);


        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', [username, hashedPassword, 'admin']);
            console.log(`[Startup] Auto - seeded admin user: ${username}`);
        } else {
            console.log(`[Startup] Admin user already exists.`);

        }
    } catch (error) {
        console.error('[Startup] Error ensuring admin exists:', error);
    }
}
