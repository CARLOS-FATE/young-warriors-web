import { IPlayerRepository } from "../core/repositories/IPlayerRepository";

export class DeletePlayer {
    constructor(private playerRepository: IPlayerRepository) { }

    async execute(id: number): Promise<boolean> {
        return this.playerRepository.delete(id);
    }
}
