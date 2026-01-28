import { IPostRepository } from "../core/repositories/IPostRepository";
import { Post } from "../core/entities/Post";

export class CreatePost {
    constructor(private postRepository: IPostRepository) { }

    async execute(post: Post) {
        return this.postRepository.create(post);
    }
}
