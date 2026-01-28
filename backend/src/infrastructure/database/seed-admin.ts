import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function seedAdmin() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'young_warriors_db',
        port: Number(process.env.DB_PORT) || 3306
    });

    const username = 'admin';
    const password = 'password123'; // Default password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if admin exists
        const [rows] = await connection.query('SELECT * FROM admins WHERE username = ?', [username]) as any;

        if (rows.length === 0) {
            await connection.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
            console.log(`Admin user created: ${username} / ${password}`);
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await connection.end();
    }
}

seedAdmin();
