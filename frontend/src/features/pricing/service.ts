import { fetchFromApi } from '@/lib/api';
import { PricingItem, CreatePricingItemData, UpdatePricingItemData } from './types';

export const pricingService = {
    async getAll(): Promise<PricingItem[]> {
        return fetchFromApi('/pricing');
    },

    async create(data: CreatePricingItemData): Promise<PricingItem> {
        return fetchFromApi('/pricing', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id: number, data: UpdatePricingItemData): Promise<void> {
        return fetchFromApi(`/pricing/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id: number): Promise<void> {
        return fetchFromApi(`/pricing/${id}`, {
            method: 'DELETE'
        });
    }
};
