import { PricingItem, CreatePricingItemData, UpdatePricingItemData } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const pricingService = {
    async getAll(): Promise<PricingItem[]> {
        const res = await fetch(`${API_URL}/pricing`);
        if (!res.ok) throw new Error('Failed to fetch pricing items');
        return res.json();
    },

    async create(data: CreatePricingItemData, token: string): Promise<PricingItem> {
        const res = await fetch(`${API_URL}/pricing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create pricing item');
        return res.json();
    },

    async update(id: number, data: UpdatePricingItemData, token: string): Promise<void> {
        const res = await fetch(`${API_URL}/pricing/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update pricing item');
    },

    async delete(id: number, token: string): Promise<void> {
        const res = await fetch(`${API_URL}/pricing/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to delete pricing item');
    }
};
