import { Player } from "../entities/Player";

export interface IPlayerRepository {
    findAll(): Promise<Player[]>;
    findById(id: number): Promise<Player | null>;
    create(player: Player): Promise<Player>;
    update(player: Player): Promise<Player>;
    delete(id: number): Promise<boolean>;
}
