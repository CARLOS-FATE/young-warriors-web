import { fetchFromApi } from '@/lib/api';
import { Coach } from './types';

export const getCoaches = async (): Promise<Coach[]> => {
    return fetchFromApi('/coaches');
};

export const getCoach = async (id: number): Promise<Coach> => {
    return fetchFromApi(`/coaches/${id}`);
};

export const createCoach = async (data: Omit<Coach, 'id' | 'createdAt'>): Promise<Coach> => {
    return fetchFromApi('/coaches', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateCoach = async (id: number, data: Partial<Coach>): Promise<Coach> => {
    return fetchFromApi(`/coaches/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const deleteCoach = async (id: number): Promise<void> => {
    return fetchFromApi(`/coaches/${id}`, {
        method: 'DELETE'
    });
}
