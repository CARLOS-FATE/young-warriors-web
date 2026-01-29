import { IUserRepository } from "../../core/repositories/IUserRepository";
import { User, UserRole } from "../../core/entities/User";
import pool from "./db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class MySQLUserRepository implements IUserRepository {
    async findByUsername(username: string): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new User(row.id, row.username, row.password_hash, row.role as UserRole, row.related_id, row.createdAt);
    }

    async create(user: User): Promise<User> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (username, password_hash, role, related_id) VALUES (?, ?, ?, ?)",
            [user.username, user.passwordHash, user.role, user.relatedId]
        );
        user.id = result.insertId;
        return user;
    }

    async findAll(): Promise<User[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users ORDER BY username ASC");
        return rows.map(row => new User(row.id, row.username, row.password_hash, row.role as UserRole, row.related_id, row.createdAt));
    }

    async delete(id: number): Promise<void> {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
    }
}
