import { IPlayerRepository } from "../core/repositories/IPlayerRepository";

export class GetAllPlayers {
    constructor(private playerRepository: IPlayerRepository) { }

    async execute() {
        return this.playerRepository.findAll();
    }
}
