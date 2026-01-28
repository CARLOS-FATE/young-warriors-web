import { IPostRepository } from "../../core/repositories/IPostRepository";
import { Post } from "../../core/entities/Post";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLPostRepository implements IPostRepository {
    async findAll(): Promise<Post[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM posts ORDER BY id DESC");
        return rows.map((row) => new Post(row.id, row.title, row.content, row.category, row.user_id, row.published_at, row.created_at));
    }

    async findById(id: number): Promise<Post | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM posts WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Post(row.id, row.title, row.content, row.category, row.user_id, row.published_at, row.created_at);
    }

    async create(post: Post): Promise<Post> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO posts (title, content, category, user_id) VALUES (?, ?, ?, ?)",
            [post.title, post.content, post.category, post.authorId]
        );
        post.id = result.insertId;
        return post;
    }

    async update(post: Post): Promise<Post> {
        await pool.query(
            "UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?",
            [post.title, post.content, post.category, post.id]
        );
        return post;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM posts WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
