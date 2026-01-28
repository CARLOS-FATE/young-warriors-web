import { Post } from "../entities/Post";

export interface IPostRepository {
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Post | null>;
    create(post: Post): Promise<Post>;
    update(post: Post): Promise<Post>;
    delete(id: number): Promise<boolean>;
}
