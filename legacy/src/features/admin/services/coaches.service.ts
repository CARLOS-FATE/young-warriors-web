import { query } from "../../../../lib/db.js";

export interface Coach {
    id: number;
    name: string;
    role: string;
}

export const CoachesService = {
    async getCoaches(): Promise<Coach[]> {
        const sql = "SELECT id, name, role FROM coaches ORDER BY id DESC";
        return (await query({ query: sql })) as Coach[];
    }
};
