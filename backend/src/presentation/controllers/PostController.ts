import { Request, Response } from 'express';
import { IPostRepository } from '../../core/repositories/IPostRepository';
// Assuming we'll have a GetAllPosts use case, implementing simply for now
// or importing if I created it. Ideally I should create GetAllPosts.ts

export class PostController {
    constructor(private postRepository: IPostRepository) { }

    async getAll(req: Request, res: Response) {
        // const useCase = new GetAllPosts(this.postRepository);
        try {
            const posts = await this.postRepository.findAll(); // Direct call for simplicity if use case not created yet
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
        }
    }
}
