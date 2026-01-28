import { IPlayerRepository } from "../core/repositories/IPlayerRepository";
import { Player } from "../core/entities/Player";

export class UpdatePlayer {
    constructor(private playerRepository: IPlayerRepository) { }

    async execute(id: number, data: Partial<Player>): Promise<Player | null> {
        const existingPlayer = await this.playerRepository.findById(id);
        if (!existingPlayer) return null;

        const updatedPlayer = new Player(
            id,
            data.name || existingPlayer.name,
            data.position || existingPlayer.position,
            data.imageUrl || existingPlayer.imageUrl,
            existingPlayer.createdAt
        );

        return this.playerRepository.update(updatedPlayer);
    }
}
