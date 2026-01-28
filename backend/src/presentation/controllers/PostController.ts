import { Request, Response } from 'express';
import { IPostRepository } from '../../core/repositories/IPostRepository';
// Assuming we'll have a GetAllPosts use case, implementing simply for now
// or importing if I created it. Ideally I should create GetAllPosts.ts

import { Post } from '../../core/entities/Post';
import { CreatePost } from '../../use-cases/CreatePost';
import { UpdatePost } from '../../use-cases/UpdatePost';
import { DeletePost } from '../../use-cases/DeletePost';

export class PostController {
    constructor(private postRepository: IPostRepository) { }

    async getAll(req: Request, res: Response) {
        try {
            const posts = await this.postRepository.findAll();
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
        }
    }

    async create(req: Request, res: Response) {
        const useCase = new CreatePost(this.postRepository);
        try {
            const { title, content, category, authorId } = req.body;
            // Assuming authorId comes from token in real protected route, but here passed in body for simplicity or derived
            const newPost = new Post(0, title, content, category, authorId || 1, undefined);
            const created = await useCase.execute(newPost);
            res.status(201).json(created);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        const useCase = new UpdatePost(this.postRepository);
        try {
            const id = Number(req.params.id);
            const updated = await useCase.execute(id, req.body);
            if (!updated) return res.status(404).json({ error: 'Post not found' });
            res.json(updated);
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        const useCase = new DeletePost(this.postRepository);
        try {
            const id = Number(req.params.id);
            const success = await useCase.execute(id);
            if (!success) return res.status(404).json({ error: 'Post not found' });
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
