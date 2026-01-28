import { IAdminRepository } from "../../core/repositories/IAdminRepository";
import { Admin } from "../../core/entities/Admin";
import pool from "./db";
import { RowDataPacket } from "mysql2";

export class MySQLAdminRepository implements IAdminRepository {
    async findByUsername(username: string): Promise<Admin | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM admins WHERE username = ?", [username]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Admin(row.id, row.username, row.password_hash, row.createdAt);
    }
}
