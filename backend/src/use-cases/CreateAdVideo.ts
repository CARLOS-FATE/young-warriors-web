import { IAdVideoRepository } from "../core/repositories/IAdVideoRepository";
import { AdVideo } from "../core/entities/AdVideo";

export class CreateAdVideo {
    constructor(private adVideoRepository: IAdVideoRepository) { }

    async execute(data: { title: string, videoUrl: string }) {
        const newVideo = new AdVideo(0, data.title, data.videoUrl, true);
        return this.adVideoRepository.create(newVideo);
    }
}
