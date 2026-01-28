import { query } from "../../../../lib/db.js";

export interface Player {
    id: number;
    name: string;
    position: string;
}

export const PlayersService = {
    async getPlayers(): Promise<Player[]> {
        const sql = "SELECT id, name, position FROM players ORDER BY id DESC";
        return (await query({ query: sql })) as Player[];
    }
};
