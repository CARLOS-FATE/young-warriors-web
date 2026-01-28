import { query } from "../../../../lib/db.js";

export interface Post {
    id: number;
    title: string;
    category: string;
}

export const PostsService = {
    async getPosts(): Promise<Post[]> {
        const sql = "SELECT id, title, category FROM posts ORDER BY id DESC";
        return (await query({ query: sql })) as Post[];
    }
};
