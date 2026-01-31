import { IPlayerRepository } from "../core/repositories/IPlayerRepository";
import { Player } from "../core/entities/Player";

export class GetPlayerById {
    constructor(private playerRepository: IPlayerRepository) { }

    async execute(id: number): Promise<Player | null> {
        return this.playerRepository.findById(id);
    }
}
