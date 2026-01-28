import { IAdVideoRepository } from "../core/repositories/IAdVideoRepository";

export class DeleteAdVideo {
    constructor(private adVideoRepository: IAdVideoRepository) { }

    async execute(id: number) {
        return this.adVideoRepository.delete(id);
    }
}
