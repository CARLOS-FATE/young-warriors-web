import { User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUsers = async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/users`, {
        headers: { ...getAuthHeaders() }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};

export const createUser = async (userData: Partial<User> & { password: string }): Promise<User> => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create user');
    }
    return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() }
    });
    if (!res.ok) throw new Error('Failed to delete user');
};
