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
            data.height || existingPlayer.height,
            data.weight || existingPlayer.weight,
            data.ppg ?? existingPlayer.ppg,
            data.rpg ?? existingPlayer.rpg,
            data.apg ?? existingPlayer.apg,
            existingPlayer.createdAt

        );

        return this.playerRepository.update(updatedPlayer);
    }
}
