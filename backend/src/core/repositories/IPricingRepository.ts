import { PricingItem } from "../entities/PricingItem";

export interface IPricingRepository {
    getAll(): Promise<PricingItem[]>;
    getById(id: number): Promise<PricingItem | null>;
    create(item: Omit<PricingItem, 'id' | 'createdAt'>): Promise<PricingItem>;
    update(item: PricingItem): Promise<void>;
    delete(id: number): Promise<void>;
}
