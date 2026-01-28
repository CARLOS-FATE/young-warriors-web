export interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId?: number;
    publishedAt?: string;
    createdAt?: string;
}
