import { IPlayerRepository } from "../../core/repositories/IPlayerRepository";
import { Player } from "../../core/entities/Player";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLPlayerRepository implements IPlayerRepository {
    async findAll(): Promise<Player[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM players ORDER BY id DESC");
        return rows.map((row) => new Player(row.id, row.name, row.position, row.imageUrl, row.height, row.weight, row.ppg, row.rpg, row.apg, row.tactical_stats, row.dni, row.phone, row.emergency_phone, row.created_at));



    }

    async findById(id: number): Promise<Player | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM players WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Player(row.id, row.name, row.position, row.imageUrl, row.height, row.weight, row.ppg, row.rpg, row.apg, row.tactical_stats, row.dni, row.phone, row.emergency_phone, row.created_at);



    }

    async create(player: Player): Promise<Player> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO players (name, position, imageUrl, height, weight, ppg, rpg, apg, tactical_stats, dni, phone, emergency_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [player.name, player.position, player.imageUrl, player.height, player.weight, player.ppg || 0, player.rpg || 0, player.apg || 0, JSON.stringify(player.tacticalStats || {}), player.dni, player.phone, player.emergencyPhone]
        );



        player.id = result.insertId;
        return player;
    }

    async update(player: Player): Promise<Player> {
        await pool.query(
            "UPDATE players SET name = ?, position = ?, imageUrl = ?, height = ?, weight = ?, ppg = ?, rpg = ?, apg = ?, tactical_stats = ?, dni = ?, phone = ?, emergency_phone = ? WHERE id = ?",
            [player.name, player.position, player.imageUrl, player.height, player.weight, player.ppg, player.rpg, player.apg, JSON.stringify(player.tacticalStats || {}), player.dni, player.phone, player.emergencyPhone, player.id]
        );


        return player;
    }


    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM players WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
