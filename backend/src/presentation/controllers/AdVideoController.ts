import { Request, Response } from 'express';
import { IAdVideoRepository } from '../../core/repositories/IAdVideoRepository';
import { GetAllAdVideos } from '../../use-cases/GetAllAdVideos';
import { CreateAdVideo } from '../../use-cases/CreateAdVideo';
import { DeleteAdVideo } from '../../use-cases/DeleteAdVideo';

export class AdVideoController {
    constructor(private adVideoRepository: IAdVideoRepository) { }

    async getAll(req: Request, res: Response) {
        try {
            const useCase = new GetAllAdVideos(this.adVideoRepository);
            const videos = await useCase.execute();
            res.json(videos);
        } catch (error) {
            console.error('Error fetching ad videos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const useCase = new CreateAdVideo(this.adVideoRepository);
            const { title, videoUrl } = req.body;

            if (!videoUrl) {
                return res.status(400).json({ error: 'Video URL is required' });
            }

            const video = await useCase.execute({ title, videoUrl });
            res.status(201).json(video);
        } catch (error) {
            console.error('Error creating ad video:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const useCase = new DeleteAdVideo(this.adVideoRepository);
            const id = Number(req.params.id);
            const success = await useCase.execute(id);

            if (!success) {
                return res.status(404).json({ error: 'Video not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting ad video:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
