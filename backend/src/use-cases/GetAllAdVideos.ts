import { IAdVideoRepository } from "../core/repositories/IAdVideoRepository";

export class GetAllAdVideos {
    constructor(private adVideoRepository: IAdVideoRepository) { }

    async execute() {
        return this.adVideoRepository.findAll();
    }
}
