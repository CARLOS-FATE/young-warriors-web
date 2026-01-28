export interface PricingItem {
    id: number;
    title: string;
    price: string;
    period: string | null;
    category: 'matricula' | 'mensualidad' | 'promo';
    description: string | null;
    features: string | null;
    highlight: boolean;
    createdAt: string;
}

export type CreatePricingItemData = Omit<PricingItem, 'id' | 'createdAt'>;
export type UpdatePricingItemData = Omit<PricingItem, 'createdAt'>;
