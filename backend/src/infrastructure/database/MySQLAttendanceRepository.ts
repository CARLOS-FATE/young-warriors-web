import { IAttendanceRepository } from "../../core/repositories/IAttendanceRepository";
import { Attendance } from "../../core/entities/Attendance";
import pool from "../database/db";
import { RowDataPacket } from "mysql2";

export class MySQLAttendanceRepository implements IAttendanceRepository {
    async getByDate(date: string): Promise<Attendance[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM attendance WHERE date = ?",
            [date]
        );
        return rows.map(this.mapRowToEntity);
    }

    async getByEntity(entityType: 'player' | 'coach', entityId: number): Promise<Attendance[]> {
        const column = entityType === 'player' ? 'player_id' : 'coach_id';
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM attendance WHERE ${column} = ? ORDER BY date DESC`,
            [entityId]
        );
        return rows.map(this.mapRowToEntity);
    }

    async upsert(attendance: Omit<Attendance, 'id' | 'createdAt'>): Promise<void> {
        // Check if record exists for this entity and date
        let existing = null;
        if (attendance.playerId) {
            const [rows] = await pool.query<RowDataPacket[]>(
                "SELECT id FROM attendance WHERE player_id = ? AND date = ?",
                [attendance.playerId, attendance.date]
            );
            if (rows.length > 0) existing = rows[0];
        } else if (attendance.coachId) {
            const [rows] = await pool.query<RowDataPacket[]>(
                "SELECT id FROM attendance WHERE coach_id = ? AND date = ?",
                [attendance.coachId, attendance.date]
            );
            if (rows.length > 0) existing = rows[0];
        }

        if (existing) {
            await pool.query(
                "UPDATE attendance SET status = ?, notes = ? WHERE id = ?",
                [attendance.status, attendance.notes, existing.id]
            );
        } else {
            await pool.query(
                "INSERT INTO attendance (player_id, coach_id, date, status, notes) VALUES (?, ?, ?, ?, ?)",
                [attendance.playerId, attendance.coachId, attendance.date, attendance.status, attendance.notes]
            );
        }
    }

    private mapRowToEntity(row: any): Attendance {
        return new Attendance(
            row.id,
            row.player_id,
            row.coach_id,
            row.date,
            row.status,
            row.notes,
            row.createdAt
        );
    }
}
