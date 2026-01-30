import { ICoachRepository } from "../../core/repositories/ICoachRepository";
import { Coach } from "../../core/entities/Coach";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLCoachRepository implements ICoachRepository {
    async findAll(): Promise<Coach[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM coaches ORDER BY id DESC");
        return rows.map((row) => new Coach(row.id, row.name, row.role, row.bio, row.imageUrl, row.created_at));
    }

    async findById(id: number): Promise<Coach | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM coaches WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Coach(row.id, row.name, row.role, row.bio, row.imageUrl, row.created_at);
    }

    async create(coach: Coach): Promise<Coach> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO coaches (name, role, imageUrl) VALUES (?, ?, ?)",
            [coach.name, coach.role, coach.imageUrl]
        );
        coach.id = result.insertId;
        return coach;
    }

    async update(coach: Coach): Promise<Coach> {
        await pool.query(
            "UPDATE coaches SET name = ?, role = ?, imageUrl = ? WHERE id = ?",
            [coach.name, coach.role, coach.imageUrl, coach.id]
        );
        return coach;
    }

    async delete(id: number): Promise<boolean> {
        // Unlink from users first
        await pool.query("UPDATE users SET related_id = NULL WHERE related_id = ? AND role = 'coach'", [id]);

        const [result] = await pool.query<ResultSetHeader>("DELETE FROM coaches WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
