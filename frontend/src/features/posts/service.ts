import { fetchFromApi } from '@/lib/api';
import { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
    return fetchFromApi('/posts');
};

export const getPost = async (id: number): Promise<Post> => {
    return fetchFromApi(`/posts/${id}`);
};

export const createPost = async (data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    return fetchFromApi('/posts', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
    return fetchFromApi(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const deletePost = async (id: number): Promise<void> => {
    return fetchFromApi(`/posts/${id}`, {
        method: 'DELETE'
    });
}
