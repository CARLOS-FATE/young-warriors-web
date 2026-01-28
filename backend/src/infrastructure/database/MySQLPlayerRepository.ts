import { IPlayerRepository } from "../../core/repositories/IPlayerRepository";
import { Player } from "../../core/entities/Player";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLPlayerRepository implements IPlayerRepository {
    async findAll(): Promise<Player[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM players ORDER BY id DESC");
        return rows.map((row) => new Player(row.id, row.name, row.position, row.imageUrl, row.created_at));
    }

    async findById(id: number): Promise<Player | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM players WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Player(row.id, row.name, row.position, row.imageUrl, row.created_at);
    }

    async create(player: Player): Promise<Player> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO players (name, position, imageUrl) VALUES (?, ?, ?)",
            [player.name, player.position, player.imageUrl]
        );
        player.id = result.insertId;
        return player;
    }

    async update(player: Player): Promise<Player> {
        await pool.query(
            "UPDATE players SET name = ?, position = ?, imageUrl = ? WHERE id = ?",
            [player.name, player.position, player.imageUrl, player.id]
        );
        return player;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM players WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
