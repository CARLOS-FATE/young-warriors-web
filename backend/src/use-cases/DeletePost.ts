import { IPostRepository } from "../core/repositories/IPostRepository";

export class DeletePost {
    constructor(private postRepository: IPostRepository) { }

    async execute(id: number): Promise<boolean> {
        return this.postRepository.delete(id);
    }
}
