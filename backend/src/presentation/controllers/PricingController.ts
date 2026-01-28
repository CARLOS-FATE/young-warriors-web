import { Request, Response } from 'express';
import { IPricingRepository } from '../../core/repositories/IPricingRepository';
import { PricingItem } from '../../core/entities/PricingItem';

export class PricingController {
    constructor(private pricingRepo: IPricingRepository) { }

    async getAll(req: Request, res: Response) {
        try {
            const items = await this.pricingRepo.getAll();
            res.json(items);
        } catch (error) {
            console.error('Error fetching pricing items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, price, period, category, description, features, highlight } = req.body;

            if (!title || !price || !category) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newItem = await this.pricingRepo.create({
                // id and createdAt are omitted as per interface
                title,
                price,
                period: period || null,
                category,
                description: description || null,
                features: features || null,
                highlight: Boolean(highlight),
            } as any);

            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating pricing item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { title, price, period, category, description, features, highlight } = req.body;

            const existing = await this.pricingRepo.getById(id);
            if (!existing) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const updatedItem = new PricingItem(
                id,
                title,
                price,
                period || null,
                category,
                description || null,
                features || null,
                Boolean(highlight),
                existing.createdAt
            );

            await this.pricingRepo.update(updatedItem);
            res.json({ message: 'Updated successfully' });
        } catch (error) {
            console.error('Error updating pricing item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.pricingRepo.delete(id);
            res.json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Error deleting pricing item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
