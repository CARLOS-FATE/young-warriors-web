import { IPricingRepository } from "../../core/repositories/IPricingRepository";
import { PricingItem } from "../../core/entities/PricingItem";
import pool from "../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class MySQLPricingRepository implements IPricingRepository {
    async getAll(): Promise<PricingItem[]> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM pricing_items ORDER BY createdAt DESC");
        return rows.map(row => this.mapRowToEntity(row));
    }

    async getById(id: number): Promise<PricingItem | null> {
        const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM pricing_items WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        return this.mapRowToEntity(rows[0]);
    }

    async create(item: Omit<PricingItem, 'id' | 'createdAt'>): Promise<PricingItem> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO pricing_items (title, price, period, category, description, features, highlight) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [item.title, item.price, item.period, item.category, item.description, item.features, item.highlight]
        );
        return new PricingItem(
            result.insertId,
            item.title,
            item.price,
            item.period,
            item.category,
            item.description,
            item.features,
            item.highlight,
            new Date() // The DB has the real timestamp, but this is a placeholder for the return object
        );
    }

    async update(item: PricingItem): Promise<void> {
        await pool.query(
            "UPDATE pricing_items SET title = ?, price = ?, period = ?, category = ?, description = ?, features = ?, highlight = ? WHERE id = ?",
            [item.title, item.price, item.period, item.category, item.description, item.features, item.highlight, item.id]
        );
    }

    async delete(id: number): Promise<void> {
        await pool.query("DELETE FROM pricing_items WHERE id = ?", [id]);
    }

    private mapRowToEntity(row: any): PricingItem {
        return new PricingItem(
            row.id,
            row.title,
            row.price,
            row.period,
            row.category,
            row.description,
            row.features,
            Boolean(row.highlight),
            row.createdAt
        );
    }
}
