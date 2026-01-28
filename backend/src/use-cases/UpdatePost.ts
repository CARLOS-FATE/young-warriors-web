import { IPostRepository } from "../core/repositories/IPostRepository";
import { Post } from "../core/entities/Post";

export class UpdatePost {
    constructor(private postRepository: IPostRepository) { }

    async execute(id: number, data: Partial<Post>): Promise<Post | null> {
        const existing = await this.postRepository.findById(id);
        if (!existing) return null;

        const updated = new Post(
            id,
            data.title || existing.title,
            data.content || existing.content,
            data.category || existing.category,
            existing.authorId,
            existing.publishedAt,
            existing.createdAt
        );

        return this.postRepository.update(updated);
    }
}
