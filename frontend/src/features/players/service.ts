import { fetchFromApi } from '@/lib/api';
import { Player } from './types';

export const getPlayers = async (): Promise<Player[]> => {
    return fetchFromApi('/players');
};

export const getPlayer = async (id: number): Promise<Player> => {
    return fetchFromApi(`/players/${id}`);
};

export const createPlayer = async (data: Omit<Player, 'id' | 'createdAt'>): Promise<Player> => {
    return fetchFromApi('/players', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updatePlayer = async (id: number, data: Partial<Player>): Promise<Player> => {
    return fetchFromApi(`/players/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const deletePlayer = async (id: number): Promise<void> => {
    return fetchFromApi(`/players/${id}`, {
        method: 'DELETE'
    });
}
