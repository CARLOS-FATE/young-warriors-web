import { IAdVideoRepository } from "../../core/repositories/IAdVideoRepository";
import { AdVideo } from "../../core/entities/AdVideo";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLAdVideoRepository implements IAdVideoRepository {
    async findAll(): Promise<AdVideo[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM ad_videos ORDER BY id DESC");
        return rows.map((row) => new AdVideo(row.id, row.title, row.video_url, Boolean(row.is_active), row.createdAt));
    }

    async create(video: AdVideo): Promise<AdVideo> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO ad_videos (title, video_url, is_active) VALUES (?, ?, ?)",
            [video.title, video.videoUrl, video.isActive]
        );
        video.id = result.insertId;
        return video;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM ad_videos WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
