import { IPlayerRepository } from "../core/repositories/IPlayerRepository";
import { Player } from "../core/entities/Player";

export class CreatePlayer {
    constructor(private playerRepository: IPlayerRepository) { }

    async execute(playerData: Player) {
        // Add validation logic here if needed
        return this.playerRepository.create(playerData);
    }
}
